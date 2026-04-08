import { toLocalePath, type AppLocale } from '@/i18n/paths'
import { absoluteUrl } from '@/lib/seo/site'

export function canonicalUrl(path: string, locale: AppLocale): string {
  const normalized = path.startsWith('/') ? path : `/${path}`
  return absoluteUrl(toLocalePath(normalized, locale), locale)
}
