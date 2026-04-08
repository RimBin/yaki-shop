import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { hasAdminSectionAccess } from '@/lib/admin/is-admin-user';
import { InventoryManager } from '@/lib/inventory/manager';

function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) return false;
  return /^[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/.test(anonKey.trim());
}

// POST /api/inventory/restock - Restock inventory item
export async function POST(request: Request) {
  try {
    if (!isSupabaseConfigured()) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 503 });
    }

    const supabase = await createClient();
    
    // Check if user is admin
    const { data } = await supabase.auth.getUser();
    const user = data.user;
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    if (!(await hasAdminSectionAccess(supabase, user, 'inventory'))) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const body = await request.json();
    const { sku, quantity, reason, location, notes } = body;
    
    // Validate required fields
    if (!sku || !quantity || quantity <= 0) {
      return NextResponse.json(
        { error: 'Valid SKU and positive quantity are required' },
        { status: 400 }
      );
    }
    
    // Restock the item
    await InventoryManager.restockItem(
      { sku, quantity, reason, location, notes },
      user.id
    );
    
    // Get updated inventory item
    const item = await InventoryManager.getItemBySku(sku);
    
    return NextResponse.json({
      success: true,
      message: `Successfully restocked ${quantity} units`,
      item,
    });
  } catch (error) {
    console.error('Restock error:', error);
    const message = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
