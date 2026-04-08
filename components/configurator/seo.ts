import type { Metadata } from 'next';
import type { AppLocale } from '@/i18n/paths';
import { canonicalUrl } from '@/lib/seo/canonical';

export function getCanonicalProductPath(productSlug: string, locale: AppLocale = 'en') {
  return canonicalUrl(`/products/${productSlug}`, locale);
}

export function getPresetRobotsMeta(presetSlug: string | undefined | null): Metadata['robots'] | undefined {
  if (!presetSlug) return undefined;
  return {
    index: false,
    follow: true,
  };
}
