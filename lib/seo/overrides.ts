import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import type { Metadata } from 'next'
import { cache } from 'react'
import { canonicalUrl } from '@/lib/seo/canonical'
import { getAlternateLanguageUrls } from '@/lib/seo/site'

export type SeoOverride = {
  canonical_path: string
  locale: 'en' | 'lt'
  enabled: boolean
  title: string | null
  description: string | null
  canonical_url: string | null
  robots_index: boolean | null
  robots_follow: boolean | null
  og_title: string | null
  og_description: string | null
  og_image: string | null
  twitter_title: string | null
  twitter_description: string | null
  twitter_image: string | null
}

function ensureServiceRoleClient(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !key) {
    return null
  }

  return createClient(url, key, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}

const getServiceClient = cache(() => ensureServiceRoleClient())

const fetchSeoOverride = cache(async (canonicalPath: string, locale: 'en' | 'lt'): Promise<SeoOverride | null> => {
  const supabase = getServiceClient()
  if (!supabase) return null

  const { data, error } = await supabase
    .from('seo_overrides')
    .select(
      'canonical_path,locale,enabled,title,description,canonical_url,robots_index,robots_follow,og_title,og_description,og_image,twitter_title,twitter_description,twitter_image'
    )
    .eq('canonical_path', canonicalPath)
    .eq('locale', locale)
    .eq('enabled', true)
    .maybeSingle()

  if (error) {
    // Fail-open: if Supabase is misconfigured or unavailable, don't break metadata generation.
    return null
  }

  return (data ?? null) as SeoOverride | null
})

function mergeRobots(base: Metadata['robots'], override: SeoOverride): Metadata['robots'] {
  const hasIndex = typeof override.robots_index === 'boolean'
  const hasFollow = typeof override.robots_follow === 'boolean'

  if (!hasIndex && !hasFollow) return base

  const baseObj = (typeof base === 'object' && base) ? base : {}
  return {
    ...baseObj,
    ...(hasIndex ? { index: override.robots_index as boolean } : null),
    ...(hasFollow ? { follow: override.robots_follow as boolean } : null),
  }
}

export async function applySeoOverride(metadata: Metadata, canonicalPath: string, locale: 'en' | 'lt'): Promise<Metadata> {
  if (!canonicalPath) return metadata

  const override = await fetchSeoOverride(canonicalPath, locale)
  const baseAlternates = metadata.alternates ?? {}
  const resolvedCanonical =
    override?.canonical_url ||
    (typeof baseAlternates === 'object' ? baseAlternates.canonical : undefined) ||
    canonicalUrl(canonicalPath, locale)

  const nextMetadata: Metadata = {
    ...metadata,
    alternates: {
      ...baseAlternates,
      canonical: resolvedCanonical,
      languages: {
        ...(typeof baseAlternates === 'object' ? baseAlternates.languages ?? {} : {}),
        ...getAlternateLanguageUrls(canonicalPath),
      },
    },
  }

  const openGraphBase = (metadata.openGraph ?? {}) as any
  nextMetadata.openGraph = {
    ...openGraphBase,
    url: resolvedCanonical,
  }

  if (!override) return nextMetadata

  if (override.title) nextMetadata.title = override.title
  if (override.description) nextMetadata.description = override.description

  const canonicalOverrideUrl = override.canonical_url || undefined
  if (canonicalOverrideUrl) {
    nextMetadata.alternates = {
      ...(nextMetadata.alternates ?? {}),
      canonical: canonicalOverrideUrl,
    }
  }

  nextMetadata.robots = mergeRobots(metadata.robots, override)

  const nextOpenGraph: any = { ...openGraphBase }

  if (override.og_title) nextOpenGraph.title = override.og_title
  if (override.og_description) nextOpenGraph.description = override.og_description
  if (canonicalOverrideUrl) nextOpenGraph.url = canonicalOverrideUrl

  if (override.og_image) {
    const alt = override.og_title || (typeof nextOpenGraph.title === 'string' ? nextOpenGraph.title : null) || 'Open Graph image'
    nextOpenGraph.images = [
      {
        url: override.og_image,
        width: 1200,
        height: 630,
        alt,
      },
    ]
  }

  nextMetadata.openGraph = nextOpenGraph

  const twitterBase = (metadata.twitter ?? {}) as any
  const nextTwitter: any = { ...twitterBase }

  if (override.twitter_title) nextTwitter.title = override.twitter_title
  if (override.twitter_description) nextTwitter.description = override.twitter_description

  if (override.twitter_image) {
    nextTwitter.images = [override.twitter_image]
  }

  nextMetadata.twitter = nextTwitter

  return nextMetadata
}
