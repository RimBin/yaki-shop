import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin, getAllOrders, updateOrderStatus } from '@/lib/supabase-admin';
import { getDevelopmentOrdersAndInvoices } from '@/lib/dev/order-fixtures';
import { canUseDevelopmentFallback } from '@/lib/server/runtime-flags';
import { AdminAuthError, requireAdmin } from '@/lib/supabase/admin';

export async function GET(request: NextRequest) {
  try {
    await requireAdmin(request, 'orders');

    if (!supabaseAdmin) {
      if (canUseDevelopmentFallback(new URL(request.url))) {
        const { orders } = getDevelopmentOrdersAndInvoices();
        return NextResponse.json({ orders, demo: true });
      }
      return NextResponse.json({ error: 'Database not configured' }, { status: 503 });
    }
    const orders = await getAllOrders(200);
    return NextResponse.json({ orders });
  } catch (error) {
    if (error instanceof AdminAuthError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    console.error('Error fetching orders:', error);
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    await requireAdmin(request, 'orders');

    if (!supabaseAdmin) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 503 });
    }
    const { orderId, status } = await request.json();
    
    if (!orderId || !status) {
      return NextResponse.json({ error: 'Missing orderId or status' }, { status: 400 });
    }

    const validStatuses = ['pending', 'processing', 'completed', 'cancelled', 'refunded'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
    }

    const updated = await updateOrderStatus(orderId, status);
    
    if (!updated) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, order: updated });
  } catch (error) {
    if (error instanceof AdminAuthError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    console.error('Error updating order:', error);
    return NextResponse.json({ error: 'Failed to update order' }, { status: 500 });
  }
}
