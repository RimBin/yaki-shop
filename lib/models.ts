/**
 * Product 3D Model Registry
 *
 * Uses index.json exported from Blender as the primary source of truth for
 * slug → GLB mappings.  Falls back to category+woodType combo, then to the
 * generic configurator model.
 *
 * To add a new model:
 * 1. Export from Blender as .glb (see public/models/products/README.md)
 * 2. Place the file + updated index.json in public/models/products/
 * 3. English slug aliases are auto-generated below — extend if the pattern changes
 */

import blenderIndex from '@/public/models/products/index.json';

// ---------------------------------------------------------------------------
// Version stamp appended as cache-buster query string.  Bump when you replace
// a GLB file so browsers refetch it.
// ---------------------------------------------------------------------------
const MODEL_VERSION_BASE = '20260306a';

function getModelVersionStamp(): string {
  const envStamp = (process.env.NEXT_PUBLIC_MODEL_VERSION ?? '').trim();
  if (envStamp) return envStamp;

  // Production must remain deterministic for caching.
  if (process.env.NODE_ENV === 'production') return MODEL_VERSION_BASE;

  // Dev: overwritten GLB files under the same path can be served from cache.
  // Use a per-page stamp so a refresh pulls the latest file.
  const g = globalThis as unknown as Record<string, unknown>;
  const key = '__yakiwoodModelDevStamp';
  const existing = g[key];
  if (typeof existing === 'string' && existing.length > 0) return existing;

  const next = `${MODEL_VERSION_BASE}-dev-${Date.now().toString(36)}`;
  g[key] = next;
  return next;
}

function versioned(path: string): string {
  return `${path}?v=${getModelVersionStamp()}`;
}

// ---------------------------------------------------------------------------
// Generic fallback model (already shipped with the project).
// ---------------------------------------------------------------------------
const FALLBACK_MODEL_URL = versioned('/models/configurator/model.glb');

// ---------------------------------------------------------------------------
// Primary slug → model map built from Blender's index.json (32 entries).
// Each value is a path like "/models/products/spruce-facade.glb".
// ---------------------------------------------------------------------------
const PRODUCT_MODEL_MAP: Record<string, string> = {};
const MODEL_PATH_SET = new Set<string>();

for (const [slug, path] of Object.entries(blenderIndex)) {
  PRODUCT_MODEL_MAP[slug] = versioned(path);
  MODEL_PATH_SET.add(path);
}

function normalizeProfileToken(value?: string): string | null {
  const token = String(value ?? '')
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[_\s]+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

  if (!token) return null;

  const isHalf = token.includes('half') || token.includes('taper') || token.includes('pus') || token.includes('spunto');
  if (isHalf && token.includes('45')) return 'half-taper-45';
  if (isHalf) return 'half-taper';
  if (token.includes('rhomb') || token.includes('romb')) return 'rhombus';
  if (token.includes('rect') || token.includes('staciakamp')) return 'rectangle';
  return token;
}

// ---------------------------------------------------------------------------
// English slug aliases  (Pattern: shou-sugi-ban-for-<type>-<wood>-<color>)
// Auto-derived from the Lithuanian slugs in index.json.
// ---------------------------------------------------------------------------
const LT_TO_EN_PARTS: Record<string, { type: string; wood: string }> = {
  'terasine-lenta-terasai': { type: 'terrace', wood: '' },
  'dailylente-fasadui': { type: 'facade', wood: '' },
};

const WOOD_LT_EN: Record<string, string> = {
  egle: 'spruce',
  maumedis: 'larch',
  termomediena: 'thermo',
  termo: 'thermo',
};

for (const [ltSlug, url] of Object.entries(PRODUCT_MODEL_MAP)) {
  // e.g. "degintos-medienos-terasine-lenta-terasai-egle-natural"
  for (const [ltPart, { type }] of Object.entries(LT_TO_EN_PARTS)) {
    if (!ltSlug.includes(ltPart)) continue;
    for (const [woodLt, woodEn] of Object.entries(WOOD_LT_EN)) {
      if (!ltSlug.includes(`-${woodLt}-`)) continue;
      // extract color from end: everything after the wood
      const colorMatch = ltSlug.match(new RegExp(`-${woodLt}-(.+)$`));
      if (!colorMatch) continue;
      const color = colorMatch[1];
      const enSlug = `shou-sugi-ban-for-${type}-${woodEn}-${color}`;
      if (!(enSlug in PRODUCT_MODEL_MAP)) {
        PRODUCT_MODEL_MAP[enSlug] = url;
      }
    }
  }
}

// ---------------------------------------------------------------------------
// Category + woodType combos → model path.
// Used when the slug doesn't have a direct mapping but we know the product's
// category and wood type (e.g. from Supabase product data).
// ---------------------------------------------------------------------------
const CATEGORY_WOOD_MODEL_MAP: Record<string, string> = {
  // Terrace uses one geometry per wood; finish changes happen via texture swap.
  'terrace-spruce': versioned('/models/products/spruce-terrace-rectangular-natural.glb'),
  'terrace-spruce-rectangle': versioned('/models/products/spruce-terrace-rectangular-natural.glb'),
  'terrace-larch': versioned('/models/products/larch-terrace-rectangular-natural.glb'),
  'terrace-larch-rectangle': versioned('/models/products/larch-terrace-rectangular-natural.glb'),
  'terrace-thermo': versioned('/models/products/thermo-terrace-carbon.glb'),
  'terrace-thermo-rectangle': versioned('/models/products/thermo-terrace-carbon.glb'),

  // Facade geometry varies by profile.
  'facade-spruce': versioned('/models/products/spruce-facade-half-tenon-natural.glb'),
  'facade-spruce-half-taper': versioned('/models/products/spruce-facade-half-tenon-natural.glb'),
  'facade-spruce-half-taper-45': versioned('/models/products/spruce-facade-half-tenon-45-natural.glb'),
  'facade-spruce-rhombus': versioned('/models/products/spruce-facade-rhombus-natural.glb'),

  'facade-larch': versioned('/models/products/larch-facade-half-tenon-natural.glb'),
  'facade-larch-half-taper': versioned('/models/products/larch-facade-half-tenon-natural.glb'),
  'facade-larch-half-taper-45': versioned('/models/products/larch-facade-half-tenon-45-natural.glb'),
  'facade-larch-rhombus': versioned('/models/products/larch-facade-rhombus-natural.glb'),

  // Thermo facade-specific geometry is not exported yet.
  // Use thermo facade exports; fall back to carbon when "natural/latte" isn't available.
  'facade-thermo': versioned('/models/products/thermo-facade-half-tongue-carbon.glb'),
  'facade-thermo-half-taper': versioned('/models/products/thermo-facade-half-tongue-carbon.glb'),
  'facade-thermo-half-taper-45': versioned('/models/products/thermo-facade-half-tongue-45-carbon.glb'),
  'facade-thermo-rhombus': versioned('/models/products/thermo-facade-rhombus-carbon.glb'),
};

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export interface ProductModelOptions {
  /** Product slug (LT or EN). */
  slug?: string;
  /** Product category, e.g. "facade" | "terrace". */
  category?: string;
  /** Wood type, e.g. "spruce" | "larch". */
  woodType?: string;
  /** Profile label or code, e.g. "rectangle" | "rhombus" | "half_taper_45_deg". */
  profile?: string;
  /** Color key or label, e.g. "carbon_light" | "carbon-light" | "Natural". */
  color?: string;
}

function normalizeWoodToken(value?: string): string | null {
  const token = String(value ?? '')
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[^\p{Letter}\p{Number}_\s-]/gu, '')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[_\s]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

  if (!token) return null;

  if (token === 'egle') return 'spruce';
  if (token === 'maumedis') return 'larch';
  if (token === 'termo' || token === 'termomediena') return 'thermo';

  return token;
}

function normalizeColorToken(value?: string): string | null {
  const token = String(value ?? '')
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[_\s]+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

  if (!token) return null;

  // Common Lithuanian labels (best-effort).
  if (token.startsWith('juod')) return 'black';
  if (token.startsWith('angl') || token.includes('carbon')) return token.includes('light') ? 'carbon-light' : 'carbon';
  if (token.includes('svies') && token.includes('angl')) return 'carbon-light';
  if (token.startsWith('graf')) return 'graphite';
  if (token.includes('tams') && token.includes('rud')) return 'dark-brown';
  if (token.includes('sidabr')) return 'silver';
  if (token.includes('nat')) return 'natural';

  // Already in our canonical set, or close enough.
  return token;
}

function getTerraceFileTokens(normalizedProfile: string | null): string[] {
  if (!normalizedProfile) return ['terrace-rectangular', 'terrace'];
  if (normalizedProfile === 'rectangle') return ['terrace-rectangular', 'terrace'];
  return ['terrace'];
}

function getFacadeFileTokens(normalizedProfile: string | null): string[] {
  // Prefer the new naming (half-tenon) but keep legacy fallbacks.
  if (!normalizedProfile || normalizedProfile === 'half-taper') return ['half-tenon', 'half-tongue'];
  if (normalizedProfile === 'half-taper-45') return ['half-tenon-45', 'half-tongue-45'];
  if (normalizedProfile === 'half-tongue') return ['half-tenon', 'half-tongue'];
  if (normalizedProfile === 'half-tongue-45') return ['half-tenon-45', 'half-tongue-45'];
  return [normalizedProfile];
}

/**
 * Resolve the best 3D model URL for a given product.
 *
 * Resolution order:
 * 1. Exact slug match in PRODUCT_MODEL_MAP
 * 2. Category + woodType combo match
 * 3. Generic fallback model
 */
export function getProductModelUrl(options: ProductModelOptions = {}): string {
  const { slug, category, woodType, profile, color } = options;

  const normalizedCategory = String(category ?? '').trim().toLowerCase();
  const normalizedWood = normalizeWoodToken(woodType);
  const normalizedProfile = normalizeProfileToken(profile);
  const normalizedColor = normalizeColorToken(color) ?? 'natural';

  // 1. If we have category + wood, prefer a deterministic file name.
  // This enables per-profile switching for facade AND per-color switching when files exist.
  if (normalizedCategory && normalizedWood) {
    if (normalizedCategory === 'terrace') {
      if (normalizedWood === 'thermo') {
        // Thermo terrace exports are partial; natural/latte share the base file.
        const thermoPath =
          normalizedColor === 'natural' || normalizedColor === 'latte'
            ? '/models/products/thermo-terrace.glb'
            : `/models/products/thermo-terrace-${normalizedColor}.glb`;

        if (!MODEL_PATH_SET.size || MODEL_PATH_SET.has(thermoPath)) {
          return versioned(thermoPath);
        }
      } else {
        const tokens = getTerraceFileTokens(normalizedProfile);
        for (const token of tokens) {
          const terracePath = `/models/products/${normalizedWood}-${token}-${normalizedColor}.glb`;
          if (!MODEL_PATH_SET.size || MODEL_PATH_SET.has(terracePath)) {
            return versioned(terracePath);
          }
        }
      }
    }

    if (normalizedCategory === 'facade') {
      // Thermo facade exports may be partial (often no natural/latte). Prefer thermo if present;
      // otherwise fall back to an existing facade set.
      const facadeColor =
        normalizedWood === 'thermo' && (normalizedColor === 'natural' || normalizedColor === 'latte')
          ? 'carbon'
          : normalizedColor;

      const facadeTokens = getFacadeFileTokens(normalizedProfile);

      // IMPORTANT: thermo facade files currently use `half-tongue*` naming,
      // while spruce/larch use `half-tenon*`. Our token list includes both,
      // but we must not immediately fall back to spruce when the first token
      // (half-tenon) isn't available for thermo.
      if (normalizedWood === 'thermo') {
        for (const facadeProfileToken of facadeTokens) {
          const thermoCandidate = `/models/products/thermo-facade-${facadeProfileToken}-${facadeColor}.glb`;
          if (!MODEL_PATH_SET.size || MODEL_PATH_SET.has(thermoCandidate)) {
            return versioned(thermoCandidate);
          }
        }

        // If no thermo facade file exists for any token, fall back to spruce.
        for (const facadeProfileToken of facadeTokens) {
          const spruceCandidate = `/models/products/spruce-facade-${facadeProfileToken}-${facadeColor}.glb`;
          if (!MODEL_PATH_SET.size || MODEL_PATH_SET.has(spruceCandidate)) {
            return versioned(spruceCandidate);
          }
        }
      } else {
        for (const facadeProfileToken of facadeTokens) {
          const facadePath = `/models/products/${normalizedWood}-facade-${facadeProfileToken}-${facadeColor}.glb`;
          if (!MODEL_PATH_SET.size || MODEL_PATH_SET.has(facadePath)) {
            return versioned(facadePath);
          }
        }
      }
    }
  }

  // 1. Prefer category + wood + profile when we know the active profile.
  if (category && woodType) {
    const baseKey = `${category.toLowerCase()}-${woodType.toLowerCase()}`;

    if (normalizedProfile) {
      const profileKey = `${baseKey}-${normalizedProfile}`;
      if (CATEGORY_WOOD_MODEL_MAP[profileKey]) {
        return CATEGORY_WOOD_MODEL_MAP[profileKey];
      }
    }

    if (CATEGORY_WOOD_MODEL_MAP[baseKey]) {
      return CATEGORY_WOOD_MODEL_MAP[baseKey];
    }
  }

  // 2. Try exact slug match
  if (slug && PRODUCT_MODEL_MAP[slug]) {
    return PRODUCT_MODEL_MAP[slug];
  }

  // 3. Fallback
  return FALLBACK_MODEL_URL;
}

/**
 * Get the fallback/generic model URL (used when no product context is available).
 */
export function getGenericModelUrl(): string {
  return FALLBACK_MODEL_URL;
}

/**
 * Check whether a per-product model is registered for the given slug.
 * Does NOT verify the file actually exists on disk (use HEAD check for that).
 */
export function hasProductModel(slug: string): boolean {
  return slug in PRODUCT_MODEL_MAP;
}

export function hasModelPath(path: string): boolean {
  return MODEL_PATH_SET.has(path);
}

export function getVersionedModelUrl(path: string): string {
  return versioned(path);
}

/**
 * Model version stamp — expose for preload link tags / cache headers.
 */
export const MODEL_CACHE_VERSION = getModelVersionStamp();
