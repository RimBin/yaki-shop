import type { Product } from '@/lib/products.supabase';

export function compactProductsForList(products: Product[]): Product[] {
  return products.map((p) => ({
    id: p.id,
    slug: p.slug,
    slugEn: p.slugEn,
    name: p.name,
    nameEn: p.nameEn,
    price: p.price,
    salePrice: p.salePrice,
    image: p.image,
    category: p.category,
    woodType: p.woodType,
    inStock: p.inStock,
    colors: p.colors?.map((c) => ({
      id: c.id,
      name: c.name,
      nameLt: c.nameLt,
      nameEn: c.nameEn,
    })),
    profiles: p.profiles?.map((profile) => ({
      id: profile.id,
      name: profile.name,
      nameLt: profile.nameLt,
      nameEn: profile.nameEn,
      code: profile.code,
    })),
  }));
}
