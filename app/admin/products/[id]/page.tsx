import ProductForm from '@/components/admin/ProductForm';
import { notFound } from 'next/navigation';
import { getLocale, getTranslations } from 'next-intl/server';
import { type AppLocale } from '@/i18n/paths';
import { PageLayout } from '@/components/shared/PageLayout';
import { requireAdminPage } from '@/lib/admin/require-admin-page';

async function getProduct(id: string) {
  const { supabase } = await requireAdminPage(`/admin/products/${id}`, 'products');

  // Fetch product with variants
  const { data: product, error } = await supabase
    .from('products')
    .select(`
      *,
      variants:product_variants(*)
    `)
    .eq('id', id)
    .single();

  if (error || !product) {
    notFound();
  }

  return product;
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProductPage({ params }: PageProps) {
  const { id } = await params;
  const product = await getProduct(id);

  const locale = (await getLocale()) as AppLocale;
  await getTranslations({ locale, namespace: 'admin.products' });

  return (
    <div className="min-h-screen bg-[#E1E1E1]">
      <PageLayout>
        <div className="py-8">
          <ProductForm mode="edit" product={product} />
        </div>
      </PageLayout>
    </div>
  );
}
