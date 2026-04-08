import ProductsPageClient from '@/components/products/ProductsPageClient';
import { fetchProducts, mergeProductLists, type Product } from '@/lib/products.supabase';
import { compactProductsForList } from '@/lib/products/compact';
import { ensureProductListCoverage } from '@/lib/products/coverage';
import { generateItemListSchema } from '@/lib/schema';
import { getLocale } from 'next-intl/server';
import { toLocalePath } from '@/i18n/paths';
import { absoluteUrl } from '@/lib/seo/site';

export default async function ProductsPage() {
  const locale = await getLocale();
  const currentLocale = locale === 'lt' ? 'lt' : 'en';
  let products: Product[] = [];
  let error: string | null = null;

  try {
    const [activeProducts, stockItems] = await Promise.all([
      fetchProducts({ mode: 'active' }),
      fetchProducts({ mode: 'stock-items' }).catch((stockError) => {
        console.warn('Stock items unavailable, falling back to active products.', stockError);
        return [];
      }),
    ]);

    products = mergeProductLists(stockItems, activeProducts);
  } catch (err) {
    console.error('Error loading products:', err);
    error = err instanceof Error ? err.message : 'Failed to load products';
  }

  const coveredProducts = ensureProductListCoverage(products);
  const compactProducts = compactProductsForList(coveredProducts);
  const totalCount = compactProducts.length;
  const itemListSchema = generateItemListSchema(
    compactProducts.map((product) => ({
      name: currentLocale === 'lt' ? product.name : product.nameEn || product.name,
      url: absoluteUrl(
        toLocalePath(`/products/${currentLocale === 'lt' ? product.slug : product.slugEn || product.slug}`, currentLocale),
        currentLocale
      ),
    }))
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <ProductsPageClient
        initialProducts={compactProducts}
        initialTotalCount={totalCount}
        initialError={error}
      />
    </>
  );
}
