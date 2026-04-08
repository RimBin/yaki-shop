import { NextRequest } from 'next/server'
import { decodePayseraData, signPayseraDataMd5, timingSafeEqualHex } from '@/lib/paysera/checkout'
import { getOrderById, saveInvoiceToDatabase, supabaseAdmin, updateOrderStatus } from '@/lib/supabase-admin'
import { InvoicePDFGenerator } from '@/lib/invoice/pdf-generator'
import { createInvoice } from '@/lib/invoice/utils'
import type { InvoiceGenerateRequest } from '@/types/invoice'
import { sendOrderConfirmation } from '@/lib/email'
import { finalizePaidOrderInventory, type PaidOrderItem } from '@/lib/inventory/finalize-paid-order'
import { logPaymentProof, reportMissingPaymentEnv } from '@/lib/payments/proof'

function getPassword(): string | null {
  const pw = process.env.PAYSERA_SIGN_PASSWORD
  return typeof pw === 'string' && pw.trim().length > 0 ? pw.trim() : null
}

function parseMoneyMajorUnits(value: string | undefined): number {
  if (!value) return NaN
  const n = Number(String(value).replace(',', '.'))
  return Number.isFinite(n) ? n : NaN
}

function approxEqual(a: number, b: number, eps = 0.01): boolean {
  return Number.isFinite(a) && Number.isFinite(b) && Math.abs(a - b) <= eps
}

async function handleCallback(raw: { data: string; ss1: string }) {
  const password = getPassword()
  if (!password || !supabaseAdmin) {
    reportMissingPaymentEnv('paysera.webhook', ['PAYSERA_SIGN_PASSWORD'])
    logPaymentProof('error', 'paysera.webhook.not_configured', {
      hasDatabase: Boolean(supabaseAdmin),
    })
    return new Response('Service not configured', { status: 503 })
  }

  const data = raw.data || ''
  const ss1 = raw.ss1 || ''

  if (!data) {
    return new Response('Missing data', { status: 400 })
  }

  if (!ss1) {
    logPaymentProof('warn', 'paysera.webhook.missing_signature')
    return new Response('Missing signature', { status: 400 })
  }

  const expected = signPayseraDataMd5(data, password)
  if (!timingSafeEqualHex(expected, ss1)) {
    logPaymentProof('warn', 'paysera.webhook.invalid_signature')
    return new Response('Invalid signature', { status: 400 })
  }

  let params: Record<string, string>
  try {
    params = decodePayseraData(data)
  } catch (e) {
    logPaymentProof('warn', 'paysera.webhook.decode_failed', {
      message: e instanceof Error ? e.message : 'decode_failed',
    })
    console.error('Paysera callback decode failed', e)
    return new Response('Bad data', { status: 400 })
  }

  const status = String(params.status || '').trim()
  const orderId = String(params.orderid || '').trim()
  const isTest = String(params.test || '').trim() === '1'

  if (status !== '1') {
    return new Response('OK', { status: 200 })
  }

  if (isTest && process.env.PAYSERA_ALLOW_TEST_PAYMENTS !== 'true') {
    logPaymentProof('warn', 'paysera.webhook.test_ignored', {
      orderId,
    })
    console.warn('Paysera test callback ignored for order', orderId)
    return new Response('OK', { status: 200 })
  }

  if (!orderId) {
    return new Response('OK', { status: 200 })
  }

  const order = await getOrderById(orderId)
  if (!order) {
    logPaymentProof('warn', 'paysera.webhook.order_not_found', {
      orderId,
    })
    console.error('Paysera callback: order not found', orderId)
    return new Response('OK', { status: 200 })
  }

  const payCurrency = (params.pay_currency || params.request_currency || '').toUpperCase()
  const payAmount = parseMoneyMajorUnits(params.pay_amount || params.request_amount)

  if (payCurrency && payCurrency !== (order.currency || 'EUR').toUpperCase()) {
    logPaymentProof('error', 'paysera.webhook.currency_mismatch', {
      orderId,
      payCurrency,
      orderCurrency: order.currency,
    })
    console.error('Paysera currency mismatch', { orderId, payCurrency, orderCurrency: order.currency })
    return new Response('OK', { status: 200 })
  }

  if (Number.isFinite(payAmount) && !approxEqual(payAmount, Number(order.total))) {
    logPaymentProof('error', 'paysera.webhook.amount_mismatch', {
      orderId,
      payAmount,
      orderTotal: order.total,
    })
    console.error('Paysera amount mismatch', { orderId, payAmount, orderTotal: order.total })
    return new Response('OK', { status: 200 })
  }

  if (order.payment_status === 'paid') {
    logPaymentProof('info', 'paysera.webhook.already_paid', {
      orderId,
      orderNumber: order.order_number,
    })
    return new Response('OK', { status: 200 })
  }

  await updateOrderStatus(order.id, 'processing', 'paid')
  try {
    const items = (Array.isArray(order.items) ? order.items : []) as PaidOrderItem[]
    await finalizePaidOrderInventory({ orderId: order.id, items })
  } catch (e) {
    console.error('Paysera inventory update skipped', e)
  }

  try {
    const requestId = params.requestid ? String(params.requestid) : ''
    const payment = params.payment ? String(params.payment) : ''
    const noteLine = `Paysera mokėjimas${requestId ? ` requestid=${requestId}` : ''}${payment ? ` payment=${payment}` : ''}`
    const existingNotes = typeof order.notes === 'string' ? order.notes : ''
    const nextNotes = existingNotes.trim() ? `${existingNotes.trim()}\n${noteLine}` : noteLine

    await supabaseAdmin.from('orders').update({ notes: nextNotes }).eq('id', order.id)
  } catch (e) {
    console.error('Paysera note append skipped', e)
  }

  let invoiceNumber: string | undefined
  let emailSent = false
  try {
    const buyerAddress = order.customer_address || 'Nenurodyta'
    const invoiceRequest: InvoiceGenerateRequest = {
      buyer: {
        name: order.customer_name,
        email: order.customer_email,
        phone: order.customer_phone || undefined,
        address: buyerAddress,
        city: '',
        postalCode: '',
        country: 'Lietuva',
      },
      items: (Array.isArray(order.items) ? order.items : []).map((item: any, index: number) => ({
        id: item.id || `item-${index}`,
        name: item.name,
        quantity: item.quantity,

        unitPrice: item.basePrice,
        vatRate: 0.21,
        unit: item.unit || undefined,
      })),

      paymentMethod: 'bank_transfer',
      pricesIncludeVat: true,
      dueInDays: 0,
      orderId: order.id,
      orderNumber: order.order_number,
      documentTitle: 'Production - Shou sugi ban',
      notes: `Order ${order.order_number}. Paid via Paysera.`,
    }

    const invoice = createInvoice(invoiceRequest)
    invoice.status = 'paid'
    invoice.paymentDate = new Date().toISOString()
    invoiceNumber = invoice.invoiceNumber

    await saveInvoiceToDatabase(invoice, order.id)

    const pdfGenerator = new InvoicePDFGenerator(invoice)
    const pdfBuffer = pdfGenerator.generate()

    const emailResult = await sendOrderConfirmation(
      order.customer_email,
      order.order_number,
      Buffer.from(pdfBuffer)
    )

    if (!emailResult.success) {
      logPaymentProof('warn', 'paysera.webhook.email_failed', {
        orderId: order.id,
        orderNumber: order.order_number,
        customerEmail: order.customer_email,
        invoiceNumber,
        error: emailResult.error,
      })
      console.error('Paysera email failed', emailResult.error)
    } else {
      emailSent = true
    }
  } catch (e) {
    logPaymentProof('error', 'paysera.webhook.invoice_email_failed', {
      orderId: order.id,
      orderNumber: order.order_number,
      message: e instanceof Error ? e.message : 'invoice_email_failed',
    })
    console.error('Paysera invoice/email processing failed', e)
  }

  logPaymentProof('info', 'paysera.webhook.fulfilled', {
    orderId: order.id,
    orderNumber: order.order_number,
    customerEmail: order.customer_email,
    invoiceNumber,
    emailSent,
    amount: order.total,
    currency: order.currency,
  })

  return new Response('OK', { status: 200 })
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url)
  return handleCallback({
    data: url.searchParams.get('data') || '',
    ss1: url.searchParams.get('ss1') || '',
  })
}

export async function POST(req: NextRequest) {
  const contentType = req.headers.get('content-type') || ''

  if (contentType.includes('application/x-www-form-urlencoded') || contentType.includes('multipart/form-data')) {
    const form = await req.formData()
    return handleCallback({
      data: String(form.get('data') || ''),
      ss1: String(form.get('ss1') || ''),
    })
  }


  try {
    const body = (await req.json()) as any
    return handleCallback({
      data: String(body?.data || ''),
      ss1: String(body?.ss1 || ''),
    })
  } catch {
    return new Response('Unsupported content type', { status: 415 })
  }
}

export const runtime = 'nodejs'
