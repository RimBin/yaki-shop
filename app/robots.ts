import { MetadataRoute } from 'next';
import { getDeploymentSiteOrigin } from '@/lib/seo/site';

const BASE_URL = getDeploymentSiteOrigin();

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/*',
          '/admin/*',
          '/administravimas/*',
          '/account/*',
          '/paskyra',
          '/paskyra/*',
          '/checkout',
          '/order-confirmation',
          '/login',
          '/register',
          '/forgot-password',
          '/reset-password',
          '/lt/admin/*',
          '/lt/administravimas/*',
          '/lt/account/*',
          '/lt/paskyra',
          '/lt/paskyra/*',
          '/lt/checkout',
          '/lt/order-confirmation',
          '/lt/login',
          '/lt/register',
          '/lt/forgot-password',
          '/lt/reset-password',
        ],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
