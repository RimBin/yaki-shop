import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { applyRoleDiscount } from '@/lib/pricing/roleDiscounts';
import { quoteConfigurationPricing, type UsageType } from '@/lib/pricing/configuration';
import { getOrderById } from '@/lib/supabase-admin';
import { getAuthenticatedRoleDiscount } from '@/lib/server/authenticated-role-discount';
import { isDevelopmentDemoRequest } from '@/lib/server/runtime-flags';

type CheckoutItemConfiguration = {
  usageType?: UsageType;
  sku?: string;
  profileVariantId?: string;
  colorVariantId?: string;
  thicknessOptionId?: string;
  widthMm?: number;
  lengthMm?: number;
};

type CheckoutPricingSnapshot = {
  totalAreaM2?: number;
  unitPrice?: number;
};

type CheckoutItem = {
  id: string;
  name: string;
  slug?: string;
  quantity: number;
  basePrice: number;
  color?: string;
  finish?: string;
  configuration?: CheckoutItemConfiguration;
  pricingSnapshot?: CheckoutPricingSnapshot;
};

function getStripeClient() {
  if (!process.env.STRIPE_SECRET_KEY) return null;
  return new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2025-11-17.clover',
  });
}

export async function POST(req: NextRequest) {
  try {
    const forceDevelopmentDemo = isDevelopmentDemoRequest(req);

    const body = await req.json().catch(() => null);
    const {
      orderId,
      items,
      customerEmail: customerEmailRaw,
      customerName: customerNameRaw,
      customerPhone: customerPhoneRaw,
      customerAddress: customerAddressRaw,
      customer,
    } = (body || {}) as {
      orderId?: string;
      items: CheckoutItem[];
      customerEmail?: string;
      customerName?: string;
      customerPhone?: string;
      customerAddress?: string;
      customer?: {
        email?: string;
        name?: string;
        phone?: string;
        address?: string;
        city?: string;
        postalCode?: string;
        country?: string;
      };
    };

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
    const resolvedSiteUrl =
      (typeof siteUrl === 'string' && siteUrl.trim().length > 0 ? siteUrl.trim().replace(/\/$/, '') : '') ||
      'https://shop.yakiwood.co.uk';

    const stripe = getStripeClient();
    if (!stripe || forceDevelopmentDemo) {
      if (!stripe && process.env.NODE_ENV === 'production') {
        return NextResponse.json({ error: 'Stripe konfigūracija nerasta' }, { status: 503 });
      }

      if (!items || items.length === 0) {
        if (!orderId || typeof orderId !== 'string' || orderId.trim().length === 0) {
          return NextResponse.json({ error: 'Tuščias krepšelis' }, { status: 400 });
        }
      }

      const demoSessionId = `demo_${(typeof orderId === 'string' && orderId.trim()) || Date.now()}`;
      return NextResponse.json({
        demo: true,
        url: `${resolvedSiteUrl}/order-confirmation?session_id=${encodeURIComponent(demoSessionId)}`,
      });
    }

    const customerEmail = customerEmailRaw || customer?.email;
    const customerName = customerNameRaw || customer?.name;
    const customerPhone = customerPhoneRaw || customer?.phone;

    const customerCity = customer?.city || '';
    const customerPostalCode = customer?.postalCode || '';
    const customerCountry = customer?.country || '';
    const customerStreetAddress = customerAddressRaw || customer?.address || '';
    const customerAddress = [
      customerStreetAddress,
      customerCity,
      customerPostalCode,
      customerCountry,
    ]
      .map((value) => (typeof value === 'string' ? value.trim() : ''))
      .filter(Boolean)
      .join(', ');

    if (!items || items.length === 0) {
      if (!orderId || typeof orderId !== 'string' || orderId.trim().length === 0) {
        return NextResponse.json({ error: 'Tuščias krepšelis' }, { status: 400 });
      }
    }

    let resolvedItems = items;
    if (orderId && typeof orderId === 'string' && orderId.trim().length > 0) {
      const order = await getOrderById(orderId.trim());
      if (!order) {
        return NextResponse.json({ error: 'Užsakymas nerastas' }, { status: 404 });
      }
      if (!Array.isArray(order.items) || order.items.length === 0) {
        return NextResponse.json({ error: 'Užsakymo prekės nerastos' }, { status: 400 });
      }
      resolvedItems = order.items as CheckoutItem[];
    }

    const roleDiscount = await getAuthenticatedRoleDiscount(req);

    const discountedItems = roleDiscount
      ? resolvedItems.map((item) => {
          if (item.id === 'shipping') return item;
          return {
            ...item,
            basePrice: applyRoleDiscount(item.basePrice, roleDiscount),
          };
        })
      : resolvedItems;

    const cartTotalAreaM2 = discountedItems.reduce((sum, item) => {
      if (item.id === 'shipping') return sum;

      const snapArea = item.pricingSnapshot?.totalAreaM2;
      if (typeof snapArea === 'number' && Number.isFinite(snapArea) && snapArea > 0) return sum + snapArea;

      const cfg = item.configuration;
      if (
        cfg &&
        typeof cfg.widthMm === 'number' &&
        typeof cfg.lengthMm === 'number' &&
        typeof item.quantity === 'number' &&
        item.quantity > 0
      ) {
        return sum + (cfg.widthMm / 1000) * (cfg.lengthMm / 1000) * item.quantity;
      }

      return sum;
    }, 0);

    const lineItemsResolved = await Promise.all(
      discountedItems.map(async (item) => {
        const sku = typeof item.configuration?.sku === 'string' && item.configuration.sku.trim().length > 0
          ? item.configuration.sku
          : null;

        if (item.id === 'shipping') {
          return {
            quantity: item.quantity,
            unitAmountCents: Math.round(item.basePrice * 100),
            displayName: item.name,
            sku,
          };
        }

        const cfg = item.configuration;
        const hasConfigPricingInputs =
          cfg &&
          typeof cfg.widthMm === 'number' &&
          typeof cfg.lengthMm === 'number' &&
          typeof item.quantity === 'number' &&
          item.quantity > 0;

        if (!hasConfigPricingInputs) {
          return {
            quantity: item.quantity,
            unitAmountCents: Math.round(item.basePrice * 100),
            displayName: item.name,
            sku,
          };
        }

        const snapshotUnitPrice = item.pricingSnapshot?.unitPrice;
        if (typeof snapshotUnitPrice === 'number' && Number.isFinite(snapshotUnitPrice) && snapshotUnitPrice > 0) {
          const discountedUnit = roleDiscount ? applyRoleDiscount(snapshotUnitPrice, roleDiscount) : snapshotUnitPrice;
          return {
            quantity: item.quantity,
            unitAmountCents: Math.round(discountedUnit * 100),
            displayName: item.name,
            sku,
          };
        }

        const quote = await quoteConfigurationPricing({
          productId: item.id,
          usageType: cfg.usageType,
          profileVariantId: cfg.profileVariantId,
          colorVariantId: cfg.colorVariantId,
          thicknessOptionId: cfg.thicknessOptionId,
          widthMm: cfg.widthMm as number,
          lengthMm: cfg.lengthMm as number,
          quantityBoards: 1,
          cartTotalAreaM2,
        });

        if (!quote) {
          return {
            quantity: item.quantity,
            unitAmountCents: Math.round(item.basePrice * 100),
            displayName: item.name,
            sku,
          };
        }

        const quotedUnit = quote.unitPricePerBoard;
        const discountedUnit = roleDiscount ? applyRoleDiscount(quotedUnit, roleDiscount) : quotedUnit;
        const unitAmountCents = Math.round(discountedUnit * 100);
        return {
          quantity: item.quantity,
          unitAmountCents,
          displayName: item.name,
          sku,
        };
      })
    );

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = lineItemsResolved.map((i) => ({
      quantity: i.quantity,
      price_data: {
        currency: 'eur',
        unit_amount: i.unitAmountCents,
        product_data: {
          name: i.displayName,
          metadata: i.sku ? { sku: i.sku } : undefined,
        },
      },
    }));

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items,
      customer_email: customerEmail,
      metadata: {
        orderId: orderId || '',
        customerName: customerName || '',
        customerPhone: customerPhone || '',
        customerAddress: customerAddress || '',
        customerCity,
        customerPostalCode,
        customerCountry,
        items: orderId ? '' : JSON.stringify(discountedItems),
      },
      success_url: `${resolvedSiteUrl}/order-confirmation?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${resolvedSiteUrl}/checkout`
    });

    return NextResponse.json({ url: session.url });
  } catch (e: unknown) {
    console.error('Stripe checkout error', e);
    return NextResponse.json({ error: 'Nepavyko sukurti atsiskaitymo sesijos' }, { status: 500 });
  }
}
