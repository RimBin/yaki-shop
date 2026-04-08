import { getDefaultFinishPreviewImage, getFinishPreviewImage } from '@/lib/assets';
import { seedProducts } from '@/data/seed-products';
import type { Product } from '@/lib/products.supabase';

type NormalizedUsage = 'facade' | 'terrace';
type NormalizedWood = 'spruce' | 'larch' | 'thermo';

type FallbackColor = {
  id: string;
  name: string;
  nameLt: string;
  nameEn: string;
  image: string;
  productImage?: string;
};

type FallbackProfile = {
  id: string;
  code: string;
  name: string;
  nameLt: string;
  nameEn: string;
};

const WIDTH_OPTIONS_MM = [95, 120, 145] as const;
const LENGTH_OPTIONS_MM = [3000, 3300, 3600] as const;

const DEFAULT_COLORS: Record<NormalizedWood, FallbackColor[]> = {
  spruce: [
    { id: 'fallback-spruce-black', name: 'Black', nameLt: 'Juoda', nameEn: 'Black', image: '/assets/finishes/spruce/shou-sugi-ban-spruce-black-facade-terrace-cladding.webp' },
    { id: 'fallback-spruce-carbon', name: 'Carbon', nameLt: 'Anglis', nameEn: 'Carbon', image: '/assets/finishes/spruce/shou-sugi-ban-spruce-carbon-facade-terrace-cladding.webp' },
    { id: 'fallback-spruce-carbon-light', name: 'Carbon Light', nameLt: 'Šviesi anglis', nameEn: 'Carbon Light', image: '/assets/finishes/spruce/shou-sugi-ban-spruce-carbon-light-facade-terrace-cladding.webp' },
    { id: 'fallback-spruce-graphite', name: 'Graphite', nameLt: 'Grafitas', nameEn: 'Graphite', image: '/assets/finishes/spruce/shou-sugi-ban-spruce-graphite-facade-terrace-cladding.webp' },
    { id: 'fallback-spruce-natural', name: 'Natural', nameLt: 'Natūrali', nameEn: 'Natural', image: '/assets/finishes/spruce/shou-sugi-ban-spruce-natural-facade-terrace-cladding.webp' },
    { id: 'fallback-spruce-dark-brown', name: 'Dark Brown', nameLt: 'Tamsiai ruda', nameEn: 'Dark Brown', image: '/assets/finishes/spruce/shou-sugi-ban-spruce-dark-brown-facade-terrace-cladding.webp' },
    { id: 'fallback-spruce-latte', name: 'Latte', nameLt: 'Latte', nameEn: 'Latte', image: '/assets/finishes/spruce/shou-sugi-ban-spruce-latte-facade-terrace-cladding.webp' },
    { id: 'fallback-spruce-silver', name: 'Silver', nameLt: 'Sidabrinė', nameEn: 'Silver', image: '/assets/finishes/spruce/shou-sugi-ban-spruce-silver-facade-terrace-cladding.webp' },
  ],
  larch: [
    { id: 'fallback-larch-black', name: 'Black', nameLt: 'Juoda', nameEn: 'Black', image: '/assets/finishes/larch/shou-sugi-ban-larch-black-facade-terrace-cladding.webp' },
    { id: 'fallback-larch-carbon', name: 'Carbon', nameLt: 'Anglis', nameEn: 'Carbon', image: '/assets/finishes/larch/shou-sugi-ban-larch-carbon-facade-terrace-cladding.webp' },
    { id: 'fallback-larch-carbon-light', name: 'Carbon Light', nameLt: 'Šviesi anglis', nameEn: 'Carbon Light', image: '/assets/finishes/larch/shou-sugi-ban-larch-carbon-light-facade-terrace-cladding.webp' },
    { id: 'fallback-larch-graphite', name: 'Graphite', nameLt: 'Grafitas', nameEn: 'Graphite', image: '/assets/finishes/larch/shou-sugi-ban-larch-graphite-facade-terrace-cladding.webp' },
    { id: 'fallback-larch-natural', name: 'Natural', nameLt: 'Natūrali', nameEn: 'Natural', image: '/assets/finishes/larch/shou-sugi-ban-larch-natural-facade-terrace-cladding.webp' },
    { id: 'fallback-larch-dark-brown', name: 'Dark Brown', nameLt: 'Tamsiai ruda', nameEn: 'Dark Brown', image: '/assets/finishes/larch/shou-sugi-ban-larch-dark-brown-facade-terrace-cladding.webp' },
    { id: 'fallback-larch-latte', name: 'Latte', nameLt: 'Latte', nameEn: 'Latte', image: '/assets/finishes/larch/shou-sugi-ban-larch-latte-facade-terrace-cladding.webp' },
    { id: 'fallback-larch-silver', name: 'Silver', nameLt: 'Sidabrinė', nameEn: 'Silver', image: '/assets/finishes/larch/shou-sugi-ban-larch-silver-facade-terrace-cladding.webp' },
  ],
  thermo: [
    { id: 'fallback-thermo-black', name: 'Black', nameLt: 'Juoda', nameEn: 'Black', image: '/assets/finishes/thermo/shou-sugi-ban-thermo-black-facade-terrace-cladding.webp', productImage: '/assets/finishes/thermo-preview/Black.webp' },
    { id: 'fallback-thermo-carbon', name: 'Carbon', nameLt: 'Anglis', nameEn: 'Carbon', image: '/assets/finishes/thermo/shou-sugi-ban-thermo-carbon-facade-terrace-cladding.webp', productImage: '/assets/finishes/thermo-preview/Carbon.webp' },
    { id: 'fallback-thermo-carbon-light', name: 'Carbon Light', nameLt: 'Šviesi anglis', nameEn: 'Carbon Light', image: '/assets/finishes/thermo/shou-sugi-ban-thermo-carbon-light-facade-terrace-cladding.webp', productImage: '/assets/finishes/thermo-preview/Carbon light.webp' },
    { id: 'fallback-thermo-graphite', name: 'Graphite', nameLt: 'Grafitas', nameEn: 'Graphite', image: '/assets/finishes/thermo/shou-sugi-ban-thermo-graphite-facade-terrace-cladding.webp', productImage: '/assets/finishes/thermo-preview/Graphite.webp' },
    { id: 'fallback-thermo-dark-brown', name: 'Dark Brown', nameLt: 'Tamsiai ruda', nameEn: 'Dark Brown', image: '/assets/finishes/thermo/shou-sugi-ban-thermo-dark-brown-facade-terrace-cladding.webp', productImage: '/assets/finishes/thermo-preview/Dark brown.webp' },
    { id: 'fallback-thermo-silver', name: 'Silver', nameLt: 'Sidabrinė', nameEn: 'Silver', image: '/assets/finishes/thermo/shou-sugi-ban-thermo-silver-facade-terrace-cladding.webp', productImage: '/assets/finishes/thermo-preview/Silver.webp' },
  ],
};

const DEFAULT_PROFILES: Record<NormalizedUsage, FallbackProfile[]> = {
  facade: [
    { id: 'fallback-half-taper', code: 'half-taper', name: 'Half Taper', nameLt: 'Pusė špunto', nameEn: 'Half Taper' },
    { id: 'fallback-half-taper-45', code: 'half-taper-45', name: 'Half Taper 45°', nameLt: 'Pusė špunto 45°', nameEn: 'Half Taper 45°' },
    { id: 'fallback-rhombus', code: 'rhombus', name: 'Rhombus', nameLt: 'Rombas', nameEn: 'Rhombus' },
  ],
  terrace: [
    { id: 'fallback-rectangle', code: 'rectangle', name: 'Rectangle', nameLt: 'Stačiakampis', nameEn: 'Rectangle' },
  ],
};

function normalizeToken(value: string | undefined | null): string {
  return String(value ?? '')
    .trim()
    .toLowerCase()
    .replace(/[_\s]+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function normalizeUsageId(value: string | undefined | null): NormalizedUsage | null {
  const token = normalizeToken(value);
  if (!token) return null;
  if (token === 'facade' || token === 'terrace') return token;
  if (token.includes('facade') || token.includes('fasad')) return 'facade';
  if (token.includes('terrace') || token.includes('teras') || token.includes('deck')) return 'terrace';
  return null;
}

function normalizeWoodId(value: string | undefined | null): NormalizedWood | null {
  const token = normalizeToken(value);
  if (!token) return null;
  if (token === 'spruce' || token === 'larch' || token === 'thermo') return token;
  if (token.includes('spruce') || token.includes('egle') || token.includes('egl')) return 'spruce';
  if (token.includes('larch') || token.includes('maumed') || token.includes('maum')) return 'larch';
  if (token.includes('thermo') || token.includes('termo') || token.includes('termomed')) return 'thermo';
  return null;
}

function transformSeedProduct(seed: (typeof seedProducts)[number]): Product {
  return {
    id: seed.id,
    slug: seed.slug,
    slugEn: seed.slugEn,
    name: seed.name,
    price: seed.basePrice,
    image: seed.images?.[0] ?? '/images/ui/wood/imgSpruce.png',
    images: seed.images ?? [],
    category: seed.category,
    woodType: seed.woodType,
    description: seed.description,
    inStock: seed.inStock,
  };
}

function dedupeByKey<T>(items: T[], getKey: (item: T) => string): T[] {
  const seen = new Set<string>();
  const result: T[] = [];
  for (const item of items) {
    const key = getKey(item);
    if (!key || seen.has(key)) continue;
    seen.add(key);
    result.push(item);
  }
  return result;
}

function resolveColors(product: Product, wood: NormalizedWood): FallbackColor[] {
  const fromProduct = (product.colors ?? [])
    .map((color, index) => {
      const name = color.nameEn ?? color.name ?? color.nameLt ?? '';
      const token = normalizeToken(name);
      if (!token) return null;
      return {
        id: color.id || `${product.id}-color-${index}`,
        name,
        nameLt: color.nameLt ?? color.name ?? name,
        nameEn: color.nameEn ?? color.name ?? name,
        image: color.image ?? product.image,
        productImage:
          color.productImage ??
          getFinishPreviewImage(product.woodType, color.nameEn ?? color.nameLt ?? color.name ?? name) ??
          color.image ??
          product.image,
      } satisfies FallbackColor;
    })
    .filter(Boolean) as FallbackColor[];

  return dedupeByKey(fromProduct.length > 0 ? fromProduct : DEFAULT_COLORS[wood], (item) => normalizeToken(item.name));
}

function resolveProfiles(product: Product, usage: NormalizedUsage): FallbackProfile[] {
  const fromProduct = (product.profiles ?? [])
    .map((profile, index) => {
      const code = normalizeToken(profile.code ?? profile.nameEn ?? profile.name ?? profile.nameLt ?? '');
      if (!code) return null;
      return {
        id: profile.id || `${product.id}-profile-${index}`,
        code,
        name: profile.nameEn ?? profile.name ?? code,
        nameLt: profile.nameLt ?? profile.name ?? code,
        nameEn: profile.nameEn ?? profile.name ?? code,
      } satisfies FallbackProfile;
    })
    .filter(Boolean) as FallbackProfile[];

  const filtered = usage === 'terrace'
    ? fromProduct.filter((profile) => profile.code === 'rectangle')
    : fromProduct.filter((profile) => profile.code !== 'rectangle');

  return dedupeByKey(filtered.length > 0 ? filtered : DEFAULT_PROFILES[usage], (item) => item.code);
}

function buildStockSlug(baseSlug: string, profileCode: string, colorName: string, widthMm: number, lengthMm: number): string {
  return `${baseSlug}--${normalizeToken(profileCode)}--${normalizeToken(colorName)}--${widthMm}x${lengthMm}`;
}

export function ensureProductListCoverage(products: Product[]): Product[] {
  const withMissingBases = (() => {
    const existingCombos = new Set(
      products
        .map((product) => {
          const usage = normalizeUsageId(product.category);
          const wood = normalizeWoodId(product.woodType);
          return usage && wood ? `${usage}:${wood}` : null;
        })
        .filter(Boolean) as string[]
    );

    const missingSeedProducts = seedProducts
      .map(transformSeedProduct)
      .map((product) => {
        const usage = normalizeUsageId(product.category);
        const wood = normalizeWoodId(product.woodType);
        return usage && wood && !existingCombos.has(`${usage}:${wood}`) ? product : null;
      })
      .filter(Boolean) as Product[];

    return missingSeedProducts.length > 0 ? [...products, ...missingSeedProducts] : products;
  })();

  const existingSlugs = new Set(withMissingBases.map((product) => product.slug).filter(Boolean));
  const realStockItems = withMissingBases.filter((product) => String(product.slug || '').includes('--'));

  if (realStockItems.length > 0) {
    const baseSlugsWithRealVariants = new Set(
      realStockItems
        .map((product) => String(product.slug || '').split('--')[0])
        .filter(Boolean)
    );

    return withMissingBases.filter((product) => {
      const slug = String(product.slug || '');
      if (!slug) return false;
      if (slug.includes('--')) return true;
      return !baseSlugsWithRealVariants.has(slug);
    });
  }

  const generatedVariants: Product[] = [];

  for (const product of withMissingBases) {
    if (String(product.slug || '').includes('--')) continue;

    const usage = normalizeUsageId(product.category);
    const wood = normalizeWoodId(product.woodType);
    if (!usage || !wood) continue;

    const colors = resolveColors(product, wood);
    const profiles = resolveProfiles(product, usage);
    const baseSlugLt = product.slug;
    const baseSlugEn = product.slugEn;

    for (const color of colors) {
      for (const profile of profiles) {
        for (const widthMm of WIDTH_OPTIONS_MM) {
          for (const lengthMm of LENGTH_OPTIONS_MM) {
            const slug = buildStockSlug(baseSlugLt, profile.code, color.nameEn || color.name, widthMm, lengthMm);
            if (existingSlugs.has(slug)) continue;

            const slugEn = baseSlugEn
              ? buildStockSlug(baseSlugEn, profile.code, color.nameEn || color.name, widthMm, lengthMm)
              : undefined;

            generatedVariants.push({
              id: `fallback-stock-${product.id}-${profile.code}-${normalizeToken(color.name)}-${widthMm}x${lengthMm}`,
              slug,
              slugEn,
              name: product.name,
              nameEn: product.nameEn,
              price: product.price,
              salePrice: product.salePrice,
              image: color.productImage || color.image || product.image || getDefaultFinishPreviewImage(product.woodType) || '/images/ui/wood/imgSpruce.png',
              images: color.productImage ? [color.productImage] : color.image ? [color.image] : product.images,
              category: product.category,
              woodType: product.woodType,
              description: product.description,
              descriptionEn: product.descriptionEn,
              colors: [
                {
                  id: color.id,
                  name: color.name,
                  nameLt: color.nameLt,
                  nameEn: color.nameEn,
                  image: color.image,
                  productImage: color.productImage,
                },
              ],
              profiles: [
                {
                  id: profile.id,
                  name: profile.name,
                  nameLt: profile.nameLt,
                  nameEn: profile.nameEn,
                  code: profile.code,
                },
              ],
              inStock: true,
            });
            existingSlugs.add(slug);
          }
        }
      }
    }
  }

  const withGenerated = generatedVariants.length > 0 ? [...withMissingBases, ...generatedVariants] : withMissingBases;

  const baseSlugsWithVariants = new Set(
    withGenerated
      .map((product) => String(product.slug || ''))
      .filter((slug) => slug.includes('--'))
      .map((slug) => slug.split('--')[0])
      .filter(Boolean)
  );

  return withGenerated.filter((product) => {
    const slug = String(product.slug || '');
    if (!slug || slug.includes('--')) return true;
    return !baseSlugsWithVariants.has(slug);
  });
}