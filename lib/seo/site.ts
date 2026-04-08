import { toLocalePath, type AppLocale } from '@/i18n/paths'

const DEFAULT_SITE_ORIGINS: Record<AppLocale, string> = {
  en: 'https://shop.yakiwood.co.uk',
  lt: 'https://shop.yakiwood.co.uk',
}

function sanitizeOrigin(value: string | undefined | null): string | null {
  const raw = value?.trim()
  if (!raw) return null

  try {
    const url = new URL(raw)
    if (!/^https?:$/.test(url.protocol)) return null
    url.pathname = ''
    url.search = ''
    url.hash = ''
    return url.toString().replace(/\/$/, '')
  } catch {
    return null
  }
}

function inferLocaleFromOrigin(origin: string | null): AppLocale | null {
  if (!origin) return null

  try {
    const hostname = new URL(origin).hostname.toLowerCase()
    if (hostname.endsWith('.lt')) return 'lt'
    if (hostname.endsWith('.eu')) return 'en'
    if (hostname.endsWith('.co.uk')) return 'en'
  } catch {
    return null
  }

  return null
}

function normalizePath(input: string): string {
  const raw = input?.trim() || '/'

  try {
    if (raw.startsWith('http://') || raw.startsWith('https://')) {
      const url = new URL(raw)
      return `${url.pathname || '/'}${url.search}${url.hash}`
    }
  } catch {
    return '/'
  }

  return raw.startsWith('/') ? raw : `/${raw}`
}

export function getDeploymentSiteOrigin(): string {
  return sanitizeOrigin(process.env.NEXT_PUBLIC_SITE_URL) ?? DEFAULT_SITE_ORIGINS.en
}

export function getSiteOrigin(locale: AppLocale): string {
  const localeSpecific = locale === 'lt'
    ? sanitizeOrigin(process.env.NEXT_PUBLIC_SITE_URL_LT)
    : sanitizeOrigin(process.env.NEXT_PUBLIC_SITE_URL_EN)

  if (localeSpecific) return localeSpecific

  const deploymentOrigin = sanitizeOrigin(process.env.NEXT_PUBLIC_SITE_URL)
  if (inferLocaleFromOrigin(deploymentOrigin) === locale && deploymentOrigin) {
    return deploymentOrigin
  }

  return DEFAULT_SITE_ORIGINS[locale]
}

export function inferLocaleFromPath(path: string): AppLocale {
  const normalized = normalizePath(path)
  return normalized === '/lt' || normalized.startsWith('/lt/') ? 'lt' : 'en'
}

export function absoluteUrl(path: string, locale?: AppLocale): string {
  const normalized = normalizePath(path)
  const resolvedLocale = locale ?? inferLocaleFromPath(normalized)
  return new URL(normalized, `${getSiteOrigin(resolvedLocale)}/`).toString()
}

export function localizedAbsoluteUrl(path: string, locale: AppLocale): string {
  return absoluteUrl(toLocalePath(normalizePath(path), locale), locale)
}

export function getAlternateLanguageUrls(path: string): Record<'en' | 'lt' | 'x-default', string> {
  const normalized = normalizePath(path)
  const internalEnPath = toLocalePath(normalized, 'en')
  const enPath = toLocalePath(internalEnPath, 'en')
  const ltPath = toLocalePath(internalEnPath, 'lt')

  return {
    en: absoluteUrl(enPath, 'en'),
    lt: absoluteUrl(ltPath, 'lt'),
    'x-default': absoluteUrl(enPath, 'en'),
  }
}