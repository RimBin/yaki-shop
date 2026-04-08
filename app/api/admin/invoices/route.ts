import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin, getAllInvoices } from '@/lib/supabase-admin';
import { getDevelopmentOrdersAndInvoices } from '@/lib/dev/order-fixtures';
import { canUseDevelopmentFallback } from '@/lib/server/runtime-flags';
import { AdminAuthError, requireAdmin } from '@/lib/supabase/admin';

export async function GET(request: NextRequest) {
  try {
    await requireAdmin(request, 'orders');

    if (!supabaseAdmin) {
      if (canUseDevelopmentFallback(new URL(request.url))) {
        const { invoices } = getDevelopmentOrdersAndInvoices();
        return NextResponse.json({ invoices, demo: true });
      }
      return NextResponse.json({ error: 'Database not configured' }, { status: 503 });
    }
    const invoices = await getAllInvoices(200);
    return NextResponse.json({ invoices });
  } catch (error) {
    if (error instanceof AdminAuthError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    console.error('Error fetching invoices:', error);
    return NextResponse.json({ error: 'Failed to fetch invoices' }, { status: 500 });
  }
}
