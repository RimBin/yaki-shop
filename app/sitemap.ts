import { MetadataRoute } from 'next';
import { projects } from '@/data/projects';
import { toLocalePath } from '@/i18n/paths';
import { absoluteUrl, getAlternateLanguageUrls } from '@/lib/seo/site';
import { getProjectSlug } from '@/lib/projects/i18n';

const SHOU_SUGI_BAN_VARIANT_SLUGS: string[] = [];

const fallbackProducts = [
  { slug: 'burnt-spruce-cladding', slugEn: 'burnt-spruce-cladding', updatedAt: new Date() },
  { slug: 'burnt-larch-decking', slugEn: 'burnt-larch-decking', updatedAt: new Date() },
  { slug: 'burnt-pine-panels', slugEn: 'burnt-pine-panels', updatedAt: new Date() },
  { slug: 'black-larch', slugEn: 'black-larch', updatedAt: new Date() },
  { slug: 'brown-larch', slugEn: 'brown-larch', updatedAt: new Date() },
  { slug: 'carbon-larch', slugEn: 'carbon-larch', updatedAt: new Date() },
];

async function getProducts(): Promise<{ slug: string; slugEn: string; updatedAt: Date }[]> {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseKey) {
      const { createClient } = await import('@supabase/supabase-js');
      const supabase = createClient(supabaseUrl, supabaseKey);

      const { data, error } = await supabase
        .from('products')
        .select('slug, slug_en, updated_at')
        .eq('is_active', true);

      if (!error && data && data.length > 0) {
        return data.map((product) => ({
          slug: product.slug,
          slugEn: product.slug_en || product.slug,
          updatedAt: new Date(product.updated_at || Date.now()),
        }));
      }
    }
  } catch {
    console.warn('Supabase not available, using fallback products for sitemap');
  }

  return fallbackProducts;
}

function createEntry(
  path: string,
  locale: 'en' | 'lt',
  lastModified: Date,
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'],
  priority: number
): MetadataRoute.Sitemap[number] {
  return {
    url: absoluteUrl(path, locale),
    lastModified,
    changeFrequency,
    priority,
    alternates: {
      languages: getAlternateLanguageUrls(path),
    },
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getProducts();
  const now = new Date();

  const staticRoutes = [
    { path: '/', changeFrequency: 'weekly' as const, priority: 1.0 },
    { path: '/products', changeFrequency: 'weekly' as const, priority: 0.9 },
    { path: '/projects', changeFrequency: 'weekly' as const, priority: 0.8 },
    { path: '/solutions', changeFrequency: 'monthly' as const, priority: 0.7 },
    { path: '/about', changeFrequency: 'monthly' as const, priority: 0.6 },
    { path: '/contact', changeFrequency: 'monthly' as const, priority: 0.5 },
    { path: '/faq', changeFrequency: 'monthly' as const, priority: 0.45 },
    { path: '/configurator3d', changeFrequency: 'monthly' as const, priority: 0.5 },
    { path: '/blog', changeFrequency: 'weekly' as const, priority: 0.5 },
    { path: '/eu-projects', changeFrequency: 'monthly' as const, priority: 0.4 },
    { path: '/svetaines-zemelapis', changeFrequency: 'monthly' as const, priority: 0.3 },
  ];

  const staticPages: MetadataRoute.Sitemap = staticRoutes.flatMap((route) => [
    createEntry(toLocalePath(route.path, 'en'), 'en', now, route.changeFrequency, route.priority),
    createEntry(toLocalePath(route.path, 'lt'), 'lt', now, route.changeFrequency, route.priority),
  ]);

  const productPages: MetadataRoute.Sitemap = products.flatMap((product) => [
    createEntry(toLocalePath(`/products/${product.slugEn || product.slug}`, 'en'), 'en', product.updatedAt, 'weekly', 0.8),
    createEntry(toLocalePath(`/products/${product.slug}`, 'lt'), 'lt', product.updatedAt, 'weekly', 0.8),
  ]);

  const projectPages: MetadataRoute.Sitemap = projects.flatMap((project) => [
    createEntry(toLocalePath(`/projects/${getProjectSlug(project, 'en')}`, 'en'), 'en', now, 'monthly', 0.6),
    createEntry(toLocalePath(`/projects/${getProjectSlug(project, 'lt')}`, 'lt'), 'lt', now, 'monthly', 0.6),
  ]);

  const variantLandingPages: MetadataRoute.Sitemap = SHOU_SUGI_BAN_VARIANT_SLUGS.flatMap((slug) => [
    createEntry(toLocalePath(`/shou-sugi-ban/${slug}`, 'en'), 'en', now, 'monthly', 0.6),
    createEntry(toLocalePath(`/shou-sugi-ban/${slug}`, 'lt'), 'lt', now, 'monthly', 0.6),
  ]);

  return [...staticPages, ...productPages, ...variantLandingPages, ...projectPages];
}
