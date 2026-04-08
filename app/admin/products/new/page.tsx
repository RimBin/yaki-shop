import ProductForm from '@/components/admin/ProductForm';
import { getLocale, getTranslations } from 'next-intl/server';
import { type AppLocale } from '@/i18n/paths';
import { PageLayout } from '@/components/shared/PageLayout';
import { requireAdminPage } from '@/lib/admin/require-admin-page';

async function checkAuth() {
  await requireAdminPage('/admin/products/new', 'products');
}

export default async function NewProductPage() {
  await checkAuth();

  const locale = (await getLocale()) as AppLocale;
  await getTranslations({ locale, namespace: 'admin.products' });

  return (
    <div className="min-h-screen bg-[#E1E1E1]">
      <PageLayout>
        <div className="py-8">
          <ProductForm mode="create" />
        </div>
      </PageLayout>
    </div>
  );
}
