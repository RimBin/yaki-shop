import { unstable_cache } from 'next/cache';

import { projects as seedProjects } from '@/data/projects';
import { getProjectSlug } from '@/lib/projects/i18n';
import { createPublicClient } from '@/lib/supabase/public';
import type { Project, ProjectLocale } from '@/types/project';

function withTimeout<T>(promise: PromiseLike<T>, ms: number, label: string): Promise<T> {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  const timeout = new Promise<never>((_, reject) => {
    timeoutId = setTimeout(() => {
      reject(new Error(`${label} timed out after ${ms}ms`));
    }, ms);
  });

  return Promise.race([promise, timeout]).finally(() => {
    if (timeoutId) clearTimeout(timeoutId);
  });
}

const CMS_QUERY_TIMEOUT_MS = 4000;

function isRemoteImageUrl(value: unknown): boolean {
  if (typeof value !== 'string') return false;
  return value.startsWith('http://') || value.startsWith('https://');
}

function isManagedStorageImageUrl(value: unknown): boolean {
  if (typeof value !== 'string') return false;
  return value.includes('/storage/v1/object/public/');
}

function isLocalImageUrl(value: unknown): boolean {
  if (typeof value !== 'string') return false;
  return value.startsWith('/');
}

function getSeedLocalImages(seed: Project): string[] {
  if (!Array.isArray(seed.images)) return [];
  return seed.images.filter((img) => isLocalImageUrl(img));
}

function findSeedProjectMatch(project: Project): Project | undefined {
  const candidates = new Set<string>();

  if (typeof project.id === 'string' && project.id.trim()) candidates.add(project.id.trim());
  if (typeof project.slug === 'string' && project.slug.trim()) candidates.add(project.slug.trim());

  const ltSlug = getProjectSlug(project, 'lt');
  const enSlug = getProjectSlug(project, 'en');
  if (ltSlug) candidates.add(ltSlug);
  if (enSlug) candidates.add(enSlug);

  return seedProjects.find((seed) => {
    if (candidates.has(seed.id)) return true;
    if (candidates.has(seed.slug)) return true;
    const seedLt = getProjectSlug(seed, 'lt');
    const seedEn = getProjectSlug(seed, 'en');
    return Boolean((seedLt && candidates.has(seedLt)) || (seedEn && candidates.has(seedEn)));
  });
}

function mergeProjectWithSeedImages(project: Project): Project {
  const seed = findSeedProjectMatch(project);
  if (!seed) return project;

  const seedLocalImages = getSeedLocalImages(seed);
  const seedFeaturedCandidate =
    (typeof seed.featuredImage === 'string' && isLocalImageUrl(seed.featuredImage) ? seed.featuredImage : undefined) ||
    seedLocalImages[0];

  // If seed has no local images, don't touch CMS values.
  if (!seedFeaturedCandidate && seedLocalImages.length === 0) return project;

  const cmsFeatured = typeof project.featuredImage === 'string' ? project.featuredImage : undefined;
  const cmsImages = Array.isArray(project.images) ? project.images : [];

  const cmsFirst = typeof cmsImages[0] === 'string' ? cmsImages[0] : undefined;
  const cmsFirstIsRemote = Boolean(cmsFirst && isRemoteImageUrl(cmsFirst) && !isManagedStorageImageUrl(cmsFirst));
  const cmsFeaturedIsRemote = Boolean(
    cmsFeatured && isRemoteImageUrl(cmsFeatured) && !isManagedStorageImageUrl(cmsFeatured)
  );

  const nextFeaturedImage =
    cmsFeatured && !cmsFeaturedIsRemote
      ? cmsFeatured
      : seedFeaturedCandidate || cmsFeatured;

  // If the first displayed image is remote, replace the gallery with seed images to avoid Unsplash.
  const nextImages = cmsImages.length === 0 || cmsFirstIsRemote ? (seed.images ?? cmsImages) : cmsImages;

  // If we still ended up with a remote first image but seed has local images, force local-only list.
  const finalImages =
    Array.isArray(nextImages) &&
    nextImages.length > 0 &&
    isRemoteImageUrl(nextImages[0]) &&
    !isManagedStorageImageUrl(nextImages[0]) &&
    seedLocalImages.length > 0
      ? seedLocalImages
      : nextImages;

  const finalFeatured =
    nextFeaturedImage &&
    isRemoteImageUrl(nextFeaturedImage) &&
    !isManagedStorageImageUrl(nextFeaturedImage) &&
    seedFeaturedCandidate
      ? seedFeaturedCandidate
      : nextFeaturedImage;

  return {
    ...project,
    featuredImage: finalFeatured,
    images: finalImages,
  };
}

function isPublished(project: Project): boolean {
  const value = (project as any)?.published;
  if (typeof value === 'boolean') return value;
  return true;
}

async function fetchAllPublishedProjects(): Promise<Project[]> {
  const supabase = createPublicClient();
  if (!supabase) {
    return seedProjects.filter((p) => isPublished(p));
  }

  try {
    const { data, error } = await withTimeout(
      supabase
        .from('cms_projects')
        .select('doc')
        .eq('published', true)
        .order('updated_at', { ascending: false }),
      CMS_QUERY_TIMEOUT_MS,
      'cms_projects:fetchAllPublishedProjects'
    );

    if (error) {
      // Graceful fallback (avoid hard failures in pages when CMS is temporarily unavailable)
      return seedProjects.filter((p) => isPublished(p));
    }

    return (data ?? [])
      .map((row: any) => row.doc)
      .filter(Boolean)
      .map((project: Project) => mergeProjectWithSeedImages(project)) as Project[];
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('[projects] CMS query failed; falling back to seed.', String((error as any)?.message ?? error));
    }
    return seedProjects.filter((p) => isPublished(p));
  }
}

async function fetchPublishedProjectBySlug(locale: ProjectLocale, slug: string): Promise<Project | null> {
  const normalizedSlug = slug.trim();
  if (!normalizedSlug) return null;

  const supabase = createPublicClient();
  if (!supabase) {
    const published = seedProjects.filter((p) => isPublished(p));
    return published.find((p) => getProjectSlug(p, locale) === normalizedSlug) ?? null;
  }

  const column = locale === 'lt' ? 'slug_lt' : 'slug_en';
  try {
    const { data, error } = await withTimeout(
      supabase
        .from('cms_projects')
        .select('doc')
        .eq('published', true)
        .eq(column, normalizedSlug)
        .maybeSingle(),
      CMS_QUERY_TIMEOUT_MS,
      'cms_projects:fetchPublishedProjectBySlug'
    );

    if (error) {
      const published = seedProjects.filter((p) => isPublished(p));
      return published.find((p) => getProjectSlug(p, locale) === normalizedSlug) ?? null;
    }

    const doc = (data?.doc ?? null) as Project | null;
    if (!doc) return null;
    return mergeProjectWithSeedImages(doc);
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('[projects] CMS query failed; falling back to seed.', String((error as any)?.message ?? error));
    }
    const published = seedProjects.filter((p) => isPublished(p));
    return published.find((p) => getProjectSlug(p, locale) === normalizedSlug) ?? null;
  }
}

const getAllPublishedProjectsCached:
  | (() => Promise<Project[]>)
  | ((...args: any[]) => Promise<Project[]>) =
  process.env.NODE_ENV === 'development'
    ? async () => fetchAllPublishedProjects()
    : unstable_cache(async () => fetchAllPublishedProjects(), ['cms-projects', 'published-all'], { revalidate: 300 });

const getPublishedProjectBySlugCached:
  | ((locale: ProjectLocale, slug: string) => Promise<Project | null>)
  | ((...args: any[]) => Promise<Project | null>) =
  process.env.NODE_ENV === 'development'
    ? async (locale: ProjectLocale, slug: string) => fetchPublishedProjectBySlug(locale, slug)
    : unstable_cache(async (locale: ProjectLocale, slug: string) => fetchPublishedProjectBySlug(locale, slug), ['cms-projects', 'published-by-slug'], { revalidate: 300 });

export async function getPublishedProjects(locale: ProjectLocale): Promise<Project[]> {
  const projects = await getAllPublishedProjectsCached();
  // Locale doesn’t change which projects exist, but slugs/titles can be per-locale.
  // Keep filtering stable here for potential future locale-based publishing rules.
  void locale;
  return projects;
}

export async function getProjectBySlug(locale: ProjectLocale, slug: string): Promise<Project | null> {
  return getPublishedProjectBySlugCached(locale, slug);
}
