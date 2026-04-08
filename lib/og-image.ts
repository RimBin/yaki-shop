/**
 * Open Graph Image Helper
 * Uses existing content images for OG metadata
 */

import { getAsset } from './assets';
import { getDeploymentSiteOrigin } from './seo/site';

/**
 * Get Open Graph image for a page
 * Uses existing content images - no need to create new ones.
 */
export function getOgImage(page: 'home' | 'products' | 'projects' | 'solutions' | 'about' | 'contact' | 'faq'): string {
  const baseUrl = getDeploymentSiteOrigin();

  const ogImages: Record<string, string> = {
    home: getAsset('imgProject1'),
    products: getAsset('imgFacades'),
    projects: getAsset('imgProject2'),
    solutions: getAsset('imgTerrace'),
    about: getAsset('imgProject3'),
    contact: getAsset('imgInterior'),
    faq: getAsset('imgProject1'),
  };

  const imagePath = ogImages[page] || ogImages.home;

  if (imagePath.startsWith('http')) {
    return imagePath;
  }

  return `${baseUrl}${imagePath}`;
}

/**
 * Get OG image for dynamic product page.
 */
export function getProductOgImage(imageUrl?: string): string {
  const baseUrl = getDeploymentSiteOrigin();

  if (imageUrl) {
    if (imageUrl.startsWith('http')) {
      return imageUrl;
    }

    return `${baseUrl}${imageUrl}`;
  }

  return getOgImage('products');
}

/**
 * Get OG image for dynamic project page.
 */
export function getProjectOgImage(imageUrl?: string): string {
  const baseUrl = getDeploymentSiteOrigin();

  if (imageUrl) {
    if (imageUrl.startsWith('http')) {
      return imageUrl;
    }

    return `${baseUrl}${imageUrl}`;
  }

  return getOgImage('projects');
}
