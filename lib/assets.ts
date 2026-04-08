/**
 * Local asset paths - assets stored under /public/images and /public/icons
 * No more Figma URL dependencies
 */

// Map all assets to local paths
const localAssets = {
  // Project images
  imgProject1: '/images/ui/projects/imgProject1.jpg',
  imgProject2: '/images/ui/projects/imgProject2.jpg',
  imgProject3: '/images/ui/projects/imgProject3.jpg',
  imgProject4: '/images/ui/projects/imgProject4.jpg',
  imgProject5: '/images/ui/projects/imgProject5.jpg',
  imgProject6: '/images/ui/projects/imgProject6.jpg',
  
  // Wood samples
  imgSpruce: '/images/ui/wood/imgSpruce.png',
  imgLarch1: '/images/ui/wood/imgLarch1.png',
  imgLarch2: '/images/ui/wood/imgLarch2.png',
  
  // Colors
  imgColor1: '/images/ui/colors/imgColor1.png',
  imgColor2: '/images/ui/colors/imgColor2.png',
  imgColor3: '/images/ui/colors/imgColor3.png',
  imgColor4: '/images/ui/colors/imgColor4.png',
  imgColor5: '/images/ui/colors/imgColor5.png',
  imgColor6: '/images/ui/colors/imgColor6.png',
  imgColor7: '/images/ui/colors/imgColor7.png',
  imgColor8: '/images/ui/colors/imgColor8.png',
  
  // Backgrounds & masks
  imgMask: '/images/ui/backgrounds/imgMask.jpg',
  imgVector33: '/images/ui/backgrounds/imgVector33.jpg',
  imgVector37: '/images/ui/backgrounds/imgVector37.jpg',
  
  // Category images
  imgFence: '/images/ui/categories/shou-sugi-ban-burnt-wood-fence-horizontal-yakiwood (1).webp',
  imgFacades: '/images/ui/categories/modern-facade-shou-sugi-ban-charred-wood-yakiwood (1).webp',
  imgTerrace: '/images/ui/categories/terrace-decking-shou-sugi-ban-burnt-wood-yakiwood (1).webp',
  imgInterior: '/images/ui/categories/modern-office-with-shou-sugi-ban-charred-wood-wall-yakiwood.webp',
  
  // Logo & UI
  imgLogo: '/images/ui/brand/imgLogo.svg',
  imgCart: '/icons/ui/ShoppingCartSimple.png',
  
  // Icons (white PNG variants for announcement bar)
  imgIconTruck: '/icons/ui/package.png',
  imgIconCoins: '/icons/ui/Coins.png',
  imgIconPlant: '/icons/ui/Plant.png',
  
  // Benefits icons from assets
  imgIconFire: '/assets/icons/FireSimple.svg',
  imgIconWarehouse: '/assets/icons/Warehouse.svg',
  imgIconPlantSvg: '/assets/icons/plant.svg',
  imgIconCube: '/assets/icons/Cube.svg',
  
  // Certifications
  certEpd: '/assets/footer/epd.png',
  certFsc: '/assets/footer/fsc.png',
  certEu: '/assets/footer/ES.png',
  // Additional logo files (exported from Figma) used in the hero certification bar
  cert1: '/icons/ui/logos/fsc.svg',
  cert2: '/icons/ui/logos/accoya.svg',
  cert3: '/icons/ui/logos/pefc.svg',
  cert4: '/icons/ui/logos/epd.svg',
  cert5: '/icons/ui/logos/iso.svg',
  cert6: '/icons/ui/logos/ce.svg',

  // Payments
  imgPayments: '/assets/icons/payments.png',
  paymentMastercard: '/1/205c33e5dbae49d97de4166ff5604e159f509b9d.svg',
  paymentVisa: '/1/621f581ad4d5ce93729090d2c3ff70a7f89e2cf5.svg',
  paymentStripe: '/1/e8c023b19897c4a19a0f49dac0ed7d080783f68b.svg',
  paymentPaypal: '/1/f36080181dff9618504209765129ce341e3d0430.svg',

  // Color swatch icons (overlapping UI)
  colorSwatchBlack: '/assets/icons/color/black-color-1.png',
  colorSwatchBrown: '/assets/icons/color/Brown-color-1.png',
  colorSwatchCarbon: '/assets/icons/color/Carbon-color-1.png',
  colorSwatchLatte: '/assets/icons/color/Latte-color-1.png',
  colorSwatchSilver: '/assets/icons/color/Silver-color-1.png',
  colorSwatchCarbonLight: '/assets/icons/color/carbon-light-color-1.png',
  colorSwatchGraphite: '/assets/icons/color/Graphite-color-1.png',
  colorSwatchNatural: '/assets/icons/color/Natural (2).png',

  // Profile cross-section icons
  profileHalfTaper: '/assets/icons/profiles/Half-taper.svg',
  profileHalfTaper45Deg: '/assets/icons/profiles/Half-taper-45-%C2%B0.svg',
  profileRectangle: '/assets/icons/profiles/Rectangle%20(1).svg',
  profileRhombus: '/assets/icons/profiles/Rhombus%20(1).svg',

  // Hero
  heroVector: '/images/hero/Vector.webp',
  heroPlank: '/images/hero/4b7525119bfe28d75ceb0720e002c38c77eaf8d6.webp',
  ctaBackground: '/images/cta/cta-background.webp',

  // Finishes (preview images)
  finishSpruceBlack: '/assets/finishes/spruce/shou-sugi-ban-spruce-black-facade-terrace-cladding.webp',
  finishSpruceCarbon: '/assets/finishes/spruce/shou-sugi-ban-spruce-carbon-facade-terrace-cladding.webp',
  finishSpruceCarbonLight: '/assets/finishes/spruce/shou-sugi-ban-spruce-carbon-light-facade-terrace-cladding.webp',
  finishSpruceDarkBrown: '/assets/finishes/spruce/shou-sugi-ban-spruce-dark-brown-facade-terrace-cladding.webp',
  finishSpruceGraphite: '/assets/finishes/spruce/shou-sugi-ban-spruce-graphite-facade-terrace-cladding.webp',
  finishSpruceLatte: '/assets/finishes/spruce/shou-sugi-ban-spruce-latte-facade-terrace-cladding.webp',
  finishSpruceNatural: '/assets/finishes/spruce/shou-sugi-ban-spruce-natural-facade-terrace-cladding.webp',
  finishSpruceSilver: '/assets/finishes/spruce/shou-sugi-ban-spruce-silver-facade-terrace-cladding.webp',

  finishLarchBlack: '/assets/finishes/larch/shou-sugi-ban-larch-black-facade-terrace-cladding.webp',
  finishLarchCarbon: '/assets/finishes/larch/shou-sugi-ban-larch-carbon-facade-terrace-cladding.webp',
  finishLarchCarbonLight: '/assets/finishes/larch/shou-sugi-ban-larch-carbon-light-facade-terrace-cladding.webp',
  finishLarchDarkBrown: '/assets/finishes/larch/shou-sugi-ban-larch-dark-brown-facade-terrace-cladding.webp',
  finishLarchGraphite: '/assets/finishes/larch/shou-sugi-ban-larch-graphite-facade-terrace-cladding.webp',
  finishLarchLatte: '/assets/finishes/larch/shou-sugi-ban-larch-latte-facade-terrace-cladding.webp',
  finishLarchNatural: '/assets/finishes/larch/shou-sugi-ban-larch-natural-facade-terrace-cladding.webp',
  finishLarchSilver: '/assets/finishes/larch/shou-sugi-ban-larch-silver-facade-terrace-cladding.webp',

  finishThermoBlack: '/assets/finishes/thermo/shou-sugi-ban-thermo-black-facade-terrace-cladding.webp',
  finishThermoCarbon: '/assets/finishes/thermo/shou-sugi-ban-thermo-carbon-facade-terrace-cladding.webp',
  finishThermoCarbonLight: '/assets/finishes/thermo/shou-sugi-ban-thermo-carbon-light-facade-terrace-cladding.webp',
  finishThermoDarkBrown: '/assets/finishes/thermo/shou-sugi-ban-thermo-dark-brown-facade-terrace-cladding.webp',
  finishThermoGraphite: '/assets/finishes/thermo/shou-sugi-ban-thermo-graphite-facade-terrace-cladding.webp',
  finishThermoSilver: '/assets/finishes/thermo/shou-sugi-ban-thermo-silver-facade-terrace-cladding.webp',

  finishThermoPreviewBlack: '/assets/finishes/thermo-preview/Black.webp',
  finishThermoPreviewCarbon: '/assets/finishes/thermo-preview/Carbon.webp',
  finishThermoPreviewCarbonLight: '/assets/finishes/thermo-preview/Carbon light.webp',
  finishThermoPreviewDarkBrown: '/assets/finishes/thermo-preview/Dark brown.webp',
  finishThermoPreviewGraphite: '/assets/finishes/thermo-preview/Graphite.webp',
  finishThermoPreviewSilver: '/assets/finishes/thermo-preview/Silver.webp',

  // Project images for Solutions page sections
  projectFacadeNordicDriftwood: '/images/ui/projects/nordic-driftwood-serenity-shou-sugi-ban-larch-latte-facade-yakiwood-2-1.webp',
  projectFacadeNordicCoastline: '/images/ui/projects/nordic-coastline-living-palanga-exterior-1.jpg',
  projectInteriorOffice1: '/images/ui/projects/modern-office-shou-sugi-ban-black-1.webp',
  projectInteriorOffice2: '/images/ui/projects/modern-office-shou-sugi-ban-black-3.webp',
  projectTerraceDeck: '/images/ui/solutions/terrace-charred-deck-detail.webp',
  projectTerraceEntry: '/images/ui/solutions/terrace-charred-deck-wide.webp',
} as const;

export type AssetKey = keyof typeof localAssets;

// Get single asset
export function getAsset(key: AssetKey): string {
  return localAssets[key];
}

// Get multiple assets
export function getAssets(keys: AssetKey[]): Record<string, string> {
  return keys.reduce<Record<string, string>>((acc, k) => {
    acc[k] = localAssets[k];
    return acc;
  }, {});
}

// Grouped exports for convenience
export const assets = {
  projects: [
    localAssets.imgProject1,
    localAssets.imgProject2,
    localAssets.imgProject3,
    localAssets.imgProject4,
    localAssets.imgProject5,
    localAssets.imgProject6,
  ],
  wood: {
    spruce: localAssets.imgSpruce,
    larch1: localAssets.imgLarch1,
    larch2: localAssets.imgLarch2,
  },
  colors: [
    localAssets.imgColor1,
    localAssets.imgColor2,
    localAssets.imgColor3,
    localAssets.imgColor4,
    localAssets.imgColor5,
    localAssets.imgColor6,
    localAssets.imgColor7,
    localAssets.imgColor8,
  ],
  categories: {
    fence: localAssets.imgFence,
    facades: localAssets.imgFacades,
    terrace: localAssets.imgTerrace,
    interior: localAssets.imgInterior,
  },
  icons: {
    truck: localAssets.imgIconTruck,
    coins: localAssets.imgIconCoins,
    plant: localAssets.imgIconPlant,
    fire: localAssets.imgIconFire,
    warehouse: localAssets.imgIconWarehouse,
    plantSvg: localAssets.imgIconPlantSvg,
    cube: localAssets.imgIconCube,
    colors: '/assets/icons/Colors.png',
  },
  profiles: {
    halfTaper: localAssets.profileHalfTaper,
    halfTaper45Deg: localAssets.profileHalfTaper45Deg,
    rectangle: localAssets.profileRectangle,
    rhombus: localAssets.profileRhombus,
  },
  // Individual color swatches (for overlap UI)
  colorSwatches: [
    localAssets.colorSwatchBlack,
    localAssets.colorSwatchBrown,
    localAssets.colorSwatchCarbon,
    localAssets.colorSwatchLatte,
    localAssets.colorSwatchSilver,
    localAssets.colorSwatchCarbonLight,
    localAssets.colorSwatchGraphite,
    localAssets.colorSwatchNatural,
  ],
  // Color swatch mapping for product detail pages
  colorSwatchMap: [
    { tokens: ['black', 'juoda'], assetKey: 'colorSwatchBlack' as const },
    { tokens: ['brown', 'ruda'], assetKey: 'colorSwatchBrown' as const },
    { tokens: ['carbon light', 'carbon-light', 'sviesi anglis', 'sviesi', 'light'], assetKey: 'colorSwatchCarbonLight' as const },
    { tokens: ['carbon', 'anglis'], assetKey: 'colorSwatchCarbon' as const },
    { tokens: ['graphite', 'grafit'], assetKey: 'colorSwatchGraphite' as const },
    { tokens: ['latte'], assetKey: 'colorSwatchLatte' as const },
    { tokens: ['silver', 'sidabr'], assetKey: 'colorSwatchSilver' as const },
    { tokens: ['natural', 'naturali', 'natur'], assetKey: 'colorSwatchNatural' as const },
  ],
  certifications: {
    epd: localAssets.certEpd,
    fsc: localAssets.certFsc,
    eu: localAssets.certEu,
  },
  // Flattened list for hero / footer-like displays
  certificationsList: [
    localAssets.cert1,
    localAssets.cert2,
    localAssets.cert3,
    localAssets.cert4,
    localAssets.cert5,
    localAssets.cert6,
  ],
  ui: {
    logo: localAssets.imgLogo,
    cart: localAssets.imgCart,
  },
  payments: localAssets.imgPayments,
  paymentLogos: {
    mastercard: localAssets.paymentMastercard,
    visa: localAssets.paymentVisa,
    stripe: localAssets.paymentStripe,
    paypal: localAssets.paymentPaypal,
  },
  // Hero assets
  heroVector: localAssets.heroVector,
  heroPlank: localAssets.heroPlank,
  ctaBackground: localAssets.ctaBackground,

  finishes: {
    spruce: {
      black: localAssets.finishSpruceBlack,
      carbon: localAssets.finishSpruceCarbon,
      carbonLight: localAssets.finishSpruceCarbonLight,
      darkBrown: localAssets.finishSpruceDarkBrown,
      graphite: localAssets.finishSpruceGraphite,
      latte: localAssets.finishSpruceLatte,
      natural: localAssets.finishSpruceNatural,
      silver: localAssets.finishSpruceSilver,
    },
    larch: {
      black: localAssets.finishLarchBlack,
      carbon: localAssets.finishLarchCarbon,
      carbonLight: localAssets.finishLarchCarbonLight,
      darkBrown: localAssets.finishLarchDarkBrown,
      graphite: localAssets.finishLarchGraphite,
      latte: localAssets.finishLarchLatte,
      natural: localAssets.finishLarchNatural,
      silver: localAssets.finishLarchSilver,
    },
    thermo: {
      black: localAssets.finishThermoBlack,
      carbon: localAssets.finishThermoCarbon,
      carbonLight: localAssets.finishThermoCarbonLight,
      darkBrown: localAssets.finishThermoDarkBrown,
      graphite: localAssets.finishThermoGraphite,
      silver: localAssets.finishThermoSilver,
    },
  },

  finishesPreview: {
    spruce: {
      black: localAssets.finishSpruceBlack,
      carbon: localAssets.finishSpruceCarbon,
      carbonLight: localAssets.finishSpruceCarbonLight,
      darkBrown: localAssets.finishSpruceDarkBrown,
      graphite: localAssets.finishSpruceGraphite,
      latte: localAssets.finishSpruceLatte,
      natural: localAssets.finishSpruceNatural,
      silver: localAssets.finishSpruceSilver,
    },
    larch: {
      black: localAssets.finishLarchBlack,
      carbon: localAssets.finishLarchCarbon,
      carbonLight: localAssets.finishLarchCarbonLight,
      darkBrown: localAssets.finishLarchDarkBrown,
      graphite: localAssets.finishLarchGraphite,
      latte: localAssets.finishLarchLatte,
      natural: localAssets.finishLarchNatural,
      silver: localAssets.finishLarchSilver,
    },
    thermo: {
      black: localAssets.finishThermoPreviewBlack,
      carbon: localAssets.finishThermoPreviewCarbon,
      carbonLight: localAssets.finishThermoPreviewCarbonLight,
      darkBrown: localAssets.finishThermoPreviewDarkBrown,
      graphite: localAssets.finishThermoPreviewGraphite,
      silver: localAssets.finishThermoPreviewSilver,
    },
  },
};

type UnionKeys<T> = T extends T ? keyof T : never;

type FinishTextureWood = keyof typeof assets.finishes;
type FinishPreviewWood = keyof typeof assets.finishesPreview;
type FinishTextureKey = UnionKeys<(typeof assets.finishes)[FinishTextureWood]>;
type FinishPreviewKey = UnionKeys<(typeof assets.finishesPreview)[FinishPreviewWood]>;

function normalizeFinishWood(value?: string | null): FinishPreviewWood | null {
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
  if (token === 'spruce' || token.includes('egle') || token.includes('egl')) return 'spruce';
  if (token === 'larch' || token.includes('maumed')) return 'larch';
  if (token === 'thermo' || token.includes('termo') || token.includes('termomed')) return 'thermo';
  return null;
}

function normalizeFinishColor(value?: string | null): FinishPreviewKey | null {
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
  if (token.includes('black') || token.includes('juod')) return 'black';
  if (token.includes('carbon-light') || token.includes('carbonlight') || (token.includes('svies') && token.includes('angl'))) return 'carbonLight';
  if (token.includes('carbon') || token.includes('angl')) return 'carbon';
  if (token.includes('graphite') || token.includes('grafit')) return 'graphite';
  if (token.includes('dark-brown') || token.includes('darkbrown') || (token.includes('tams') && token.includes('rud')) || token === 'brown' || token.includes('ruda')) return 'darkBrown';
  if (token.includes('silver') || token.includes('sidabr')) return 'silver';
  if (token.includes('latte')) return 'latte';
  if (token.includes('natural') || token.includes('natur')) return 'natural';
  return null;
}

export function getFinishTextureImage(woodType?: string | null, colorLabel?: string | null): string | null {
  const wood = normalizeFinishWood(woodType);
  const color = normalizeFinishColor(colorLabel);
  if (!wood || !color) return null;

  const woodTextures = assets.finishes[wood] as Partial<Record<FinishTextureKey, string>>;
  return woodTextures[color as FinishTextureKey] ?? null;
}

export function getFinishPreviewImage(woodType?: string | null, colorLabel?: string | null): string | null {
  const wood = normalizeFinishWood(woodType);
  const color = normalizeFinishColor(colorLabel);
  if (!wood || !color) return null;

  const woodPreviews = assets.finishesPreview[wood] as Partial<Record<FinishPreviewKey, string>>;
  return woodPreviews[color] ?? null;
}

export function getDefaultFinishPreviewImage(woodType?: string | null): string | null {
  const wood = normalizeFinishWood(woodType);
  if (!wood) return null;

  if (wood === 'thermo') return assets.finishesPreview.thermo.carbon;
  if (wood === 'larch') return assets.finishesPreview.larch.natural;
  return assets.finishesPreview.spruce.natural;
}
