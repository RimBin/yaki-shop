import { NextRequest, NextResponse } from 'next/server';
import {
  consumePricingQuote,
  createOrder,
  generateOrderNumber,
  getOrderByQuoteId,
  getPricingQuoteByTokenHash,
  supabaseAdmin,
} from '@/lib/supabase-admin';
import { applyRoleDiscount } from '@/lib/pricing/roleDiscounts';
import { hashQuoteToken } from '@/lib/pricing/quote-token';
import { logPaymentProof } from '@/lib/payments/proof';
import { getAuthenticatedRoleDiscount } from '@/lib/server/authenticated-role-discount';
import { isDevelopmentEnvironment } from '@/lib/server/runtime-flags';

const VAT_RATE = 0.21;
const VALID_PAYMENT_PROVIDERS: PaymentProvider[] = ['stripe', 'paypal', 'paysera', 'manual'];

type IncomingItem = {
  id: string;
  name: string;
  slug?: string;
  quantity: number;
  basePrice: number;
  color?: string;
  finish?: string;
  configuration?: {
    usageType?: string;
    profileVariantId?: string;
    colorVariantId?: string;
    thicknessOptionId?: string;
    thicknessMm?: number;
    widthMm?: number;
    lengthMm?: number;
  };
};

type PaymentProvider = 'stripe' | 'paypal' | 'paysera' | 'manual';

type CreateOrderBody = {
  items: IncomingItem[];
  quoteToken?: string;
  customer: {
    email: string;
    name: string;
    phone?: string;
    address?: string;
    city?: string;
    postalCode?: string;
    country?: string;
  };
  deliveryNotes?: string;
  couponCode?: string;
  paymentProvider?: PaymentProvider;
};

type QuoteSnapshotItem = {
  id?: unknown;
  name?: unknown;
  slug?: unknown;
  quantity?: unknown;
  basePrice?: unknown;
  unitPriceCents?: unknown;
  color?: unknown;
  finish?: unknown;
  configuration?: IncomingItem['configuration'];
};

function isPaymentProvider(value: unknown): value is PaymentProvider {
  return typeof value === 'string' && VALID_PAYMENT_PROVIDERS.includes(value as PaymentProvider);
}

function eurFromCents(cents: number): number {
  return Math.round(Number(cents) || 0) / 100;
}

function normalizeItems(items: IncomingItem[]): IncomingItem[] {
  return items
    .map((i) => {
      const rawConfiguration = typeof i.configuration === 'object' && i.configuration !== null ? i.configuration : undefined;

      return {
        ...i,
        quantity: Number(i.quantity) || 0,
        basePrice: Number(i.basePrice) || 0,
        name: String(i.name || '').trim(),
        id: String(i.id || '').trim(),
        slug: typeof i.slug === 'string' ? i.slug : undefined,
        color: typeof i.color === 'string' ? i.color : undefined,
        finish: typeof i.finish === 'string' ? i.finish : undefined,
        configuration: rawConfiguration
          ? {
              usageType: typeof rawConfiguration.usageType === 'string' ? rawConfiguration.usageType : undefined,
              profileVariantId: typeof rawConfiguration.profileVariantId === 'string' ? rawConfiguration.profileVariantId : undefined,
              colorVariantId: typeof rawConfiguration.colorVariantId === 'string' ? rawConfiguration.colorVariantId : undefined,
              thicknessOptionId: typeof rawConfiguration.thicknessOptionId === 'string' ? rawConfiguration.thicknessOptionId : undefined,
              thicknessMm: typeof rawConfiguration.thicknessMm === 'number' ? rawConfiguration.thicknessMm : undefined,
              widthMm: typeof rawConfiguration.widthMm === 'number' ? rawConfiguration.widthMm : undefined,
              lengthMm: typeof rawConfiguration.lengthMm === 'number' ? rawConfiguration.lengthMm : undefined,
            }
          : undefined,
      };
    })
    .filter((i) => i.id.length > 0 && i.name.length > 0 && i.quantity > 0 && i.basePrice >= 0);
}

function computeShippingGross(itemsGrossSubtotal: number): number {
  // Keep in sync with checkout UI.
  return itemsGrossSubtotal > 500 ? 0 : 15;
}

function computeTotalsFromGross(grossTotal: number): { subtotalNet: number; vatAmount: number; totalGross: number } {
  if (grossTotal <= 0) {
    return { subtotalNet: 0, vatAmount: 0, totalGross: 0 };
  }
  const vatAmount = grossTotal * (VAT_RATE / (1 + VAT_RATE));
  const subtotalNet = grossTotal - vatAmount;
  return { subtotalNet, vatAmount, totalGross: grossTotal };
}

export async function POST(req: NextRequest) {
  try {
    if (!supabaseAdmin) {
      // Local/dev fallback: allow checkout UI + E2E flows to proceed without Supabase.
      if (isDevelopmentEnvironment()) {
        const body = (await req.json().catch(() => null)) as CreateOrderBody | null;

        const items = normalizeItems(body?.items || []);
        if (!items.length) {
          return NextResponse.json({ error: 'Tuščias krepšelis' }, { status: 400 });
        }

        const customerEmail = String(body?.customer?.email || '').trim();
        const customerName = String(body?.customer?.name || '').trim();
        if (!customerEmail || !customerName) {
          return NextResponse.json({ error: 'Trūksta pirkėjo duomenų' }, { status: 400 });
        }

        const itemsGrossSubtotal = items.reduce((sum, i) => sum + i.basePrice * i.quantity, 0);
        const shippingGross = computeShippingGross(itemsGrossSubtotal);
        const enrichedItems = shippingGross > 0
          ? [
              ...items,
              {
                id: 'shipping',
                name: 'Pristatymas',
                slug: 'shipping',
                quantity: 1,
                basePrice: shippingGross,
              },
            ]
          : items;
        const grossTotal = enrichedItems.reduce((sum, i) => sum + i.basePrice * i.quantity, 0);
        const totals = computeTotalsFromGross(grossTotal);

        const now = new Date();
        const year = now.getFullYear();
        const orderId = `demo-order-${now.getTime()}`;
        const orderNumber = `DEMO-${year}-${String(Math.floor(Math.random() * 100000)).padStart(5, '0')}`;

        logPaymentProof('warn', 'orders.create.demo_mode', {
          orderId,
          orderNumber,
          total: totals.totalGross,
        });

        return NextResponse.json({
          demo: true,
          order: {
            id: orderId,
            orderNumber,
            status: 'pending',
            paymentStatus: 'pending',
            total: totals.totalGross,
            currency: 'EUR',
          },
        });
      }

      logPaymentProof('error', 'orders.create.database_not_configured', {
        environment: process.env.NODE_ENV || 'unknown',
      });
      return NextResponse.json({ error: 'Database not configured' }, { status: 503 });
    }

    const body = (await req.json().catch(() => null)) as CreateOrderBody | null;
    if (!body) {
      return NextResponse.json({ error: 'Netinkamas užklausos formatas' }, { status: 400 });
    }

    if (typeof body.paymentProvider !== 'undefined' && !isPaymentProvider(body.paymentProvider)) {
      logPaymentProof('warn', 'orders.create.invalid_payment_provider', {
        paymentProvider: String(body.paymentProvider),
      });
      return NextResponse.json({ error: 'Neteisingas mokėjimo būdas' }, { status: 400 });
    }

    const quoteToken = typeof body.quoteToken === 'string' ? body.quoteToken.trim() : '';

    let enrichedItems: IncomingItem[] = [];
    let totals: { subtotalNet: number; vatAmount: number; totalGross: number } = { subtotalNet: 0, vatAmount: 0, totalGross: 0 };
    let quoteId: string | undefined;

    if (quoteToken) {
      let tokenHash: string;
      try {
        tokenHash = hashQuoteToken(quoteToken);
      } catch (e) {
        return NextResponse.json({ error: 'Quote not configured' }, { status: 503 });
      }

      const quote = await getPricingQuoteByTokenHash(tokenHash);
      if (!quote) {
        return NextResponse.json({ error: 'Kainos pasiūlymas nerastas' }, { status: 404 });
      }

      if (quote.status !== 'active') {
        // Idempotency: if already consumed, return existing order if present.
        const existingOrder = await getOrderByQuoteId(quote.id);
        if (existingOrder) {
          return NextResponse.json({
            order: {
              id: existingOrder.id,
              orderNumber: existingOrder.order_number,
              status: existingOrder.status,
              paymentStatus: existingOrder.payment_status,
              total: existingOrder.total,
              currency: existingOrder.currency,
            },
          });
        }
        return NextResponse.json({ error: 'Kainos pasiūlymas nebegalioja' }, { status: 400 });
      }

      const expiresAt = new Date(quote.expires_at).getTime();
      if (!Number.isFinite(expiresAt) || expiresAt <= Date.now()) {
        return NextResponse.json({ error: 'Kainos pasiūlymas pasibaigė' }, { status: 400 });
      }

      quoteId = quote.id;

      const snapshot = Array.isArray(quote.items_snapshot) ? (quote.items_snapshot as QuoteSnapshotItem[]) : [];
      enrichedItems = snapshot.map((item) => ({
        id: String(item.id || '').trim(),
        name: String(item.name || '').trim(),
        slug: typeof item.slug === 'string' ? item.slug : undefined,
        quantity: Number(item.quantity) || 0,
        basePrice: typeof item.basePrice === 'number' ? item.basePrice : eurFromCents(Number(item.unitPriceCents) || 0),
        color: typeof item.color === 'string' ? item.color : undefined,
        finish: typeof item.finish === 'string' ? item.finish : undefined,
        configuration: typeof item.configuration === 'object' && item.configuration !== null ? item.configuration : undefined,
      })).filter((i) => i.id.length > 0 && i.name.length > 0 && i.quantity > 0 && i.basePrice >= 0);

      totals = {
        subtotalNet: eurFromCents(quote.subtotal_net_cents),
        vatAmount: eurFromCents(quote.vat_cents),
        totalGross: eurFromCents(quote.total_gross_cents),
      };
    } else {
      const items = normalizeItems(body.items || []);
      if (!items.length) {
        return NextResponse.json({ error: 'Tuščias krepšelis' }, { status: 400 });
      }

      // Apply role discount only for authenticated users.
      const roleDiscount = await getAuthenticatedRoleDiscount(req);
      const discountedItems = roleDiscount
        ? items.map((item) => {
            if (item.id === 'shipping') return item;
            return {
              ...item,
              basePrice: applyRoleDiscount(item.basePrice, roleDiscount),
            };
          })
        : items;

      const itemsGrossSubtotal = discountedItems.reduce((sum, i) => sum + i.basePrice * i.quantity, 0);
      const shippingGross = computeShippingGross(itemsGrossSubtotal);

      enrichedItems = shippingGross > 0
        ? [
            ...discountedItems,
            {
              id: 'shipping',
              name: 'Pristatymas',
              slug: 'shipping',
              quantity: 1,
              basePrice: shippingGross,
            },
          ]
        : discountedItems;

      const grossTotal = enrichedItems.reduce((sum, i) => sum + i.basePrice * i.quantity, 0);
      totals = computeTotalsFromGross(grossTotal);
    }

    const customerEmail = String(body.customer?.email || '').trim();
    const customerName = String(body.customer?.name || '').trim();
    if (!customerEmail || !customerName) {
      return NextResponse.json({ error: 'Trūksta pirkėjo duomenų' }, { status: 400 });
    }

    const customerPhone = typeof body.customer?.phone === 'string' ? body.customer.phone.trim() : undefined;
    const customerStreet = typeof body.customer?.address === 'string' ? body.customer.address.trim() : '';
    const customerCity = typeof body.customer?.city === 'string' ? body.customer.city.trim() : '';
    const customerPostal = typeof body.customer?.postalCode === 'string' ? body.customer.postalCode.trim() : '';
    const customerCountry = typeof body.customer?.country === 'string' ? body.customer.country.trim() : '';

    const customerAddress = [customerStreet, customerCity, customerPostal, customerCountry]
      .map((v) => (typeof v === 'string' ? v.trim() : ''))
      .filter(Boolean)
      .join(', ');

    const orderNumber = generateOrderNumber();
    const paymentProvider: PaymentProvider =
      body.paymentProvider === 'stripe'
        ? 'stripe'
        : body.paymentProvider === 'paypal'
          ? 'paypal'
          : body.paymentProvider === 'paysera'
            ? 'paysera'
            : 'manual';

    const notesParts: string[] = [];
    if (paymentProvider === 'paypal') notesParts.push('Mokėjimas: PayPal.');
    if (paymentProvider === 'paysera') notesParts.push('Mokėjimas: Paysera.');
    if (paymentProvider === 'manual') notesParts.push('Mokėjimas: rankinis (be Stripe).');
    if (body.couponCode) notesParts.push(`Nuolaidos kodas: ${String(body.couponCode).trim()}`);
    if (body.deliveryNotes) notesParts.push(`Pastabos: ${String(body.deliveryNotes).trim()}`);

    const order = await createOrder({
      orderNumber,
      customerEmail,
      customerName,
      customerPhone,
      customerAddress,
      items: enrichedItems,
      subtotal: totals.subtotalNet,
      vatAmount: totals.vatAmount,
      total: totals.totalGross,
      currency: 'EUR',
      notes: notesParts.length ? notesParts.join('\n') : undefined,
      quoteId,
    });

    if (!order) {
      logPaymentProof('error', 'orders.create.failed', {
        paymentProvider,
        quoteId,
        total: totals.totalGross,
      });
      return NextResponse.json({ error: 'Nepavyko sukurti užsakymo' }, { status: 500 });
    }

    // If created from a quote, consume it (best-effort). Order creation already has quote_id.
    if (quoteId) {
      await consumePricingQuote(quoteId, order.id);
    }

    logPaymentProof('info', 'orders.create.created', {
      orderId: order.id,
      orderNumber: order.order_number,
      paymentProvider,
      quoteId,
      total: order.total,
      currency: order.currency,
      customerEmail,
    });

    return NextResponse.json({
      order: {
        id: order.id,
        orderNumber: order.order_number,
        status: order.status,
        paymentStatus: order.payment_status,
        total: order.total,
        currency: order.currency,
      },
    });
  } catch (e: unknown) {
    logPaymentProof('error', 'orders.create.exception', {
      message: e instanceof Error ? e.message : 'unknown_error',
    });
    console.error('Create order error:', e);
    return NextResponse.json({ error: 'Nepavyko sukurti užsakymo' }, { status: 500 });
  }
}
