import ProductsAdminClient from '@/components/admin/ProductsAdminClient';
import { AdminBody, AdminCard } from '@/components/admin/ui/AdminUI';
import { requireAdminPage } from '@/lib/admin/require-admin-page';

async function getProducts() {
  const { supabase } = await requireAdminPage('/admin/products', 'products');

  // Fetch products with variants
  const { data: products, error } = await supabase
    .from('products')
    .select(
      `
      *,
      variants:product_variants(*)
    `
    )
    // Hide generated stock-item products (slug contains "--") from the main products admin list.
    // These are managed via the Inventory page instead.
    .not('slug', 'like', '%--%')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching products:', error);
    return [];
  }

  return products || [];
}

export default async function AdminProductsPage() {
  const products = await getProducts();
  return (
    <AdminBody className="pt-[clamp(16px,2vw,24px)]">
      <AdminCard>
        <ProductsAdminClient initialProducts={products} />
      </AdminCard>
    </AdminBody>
  );
}
