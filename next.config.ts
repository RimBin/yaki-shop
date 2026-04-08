import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const ANALYZE = process.env.ANALYZE === 'true';
const isDev = process.env.NODE_ENV !== 'production';

const contentSecurityPolicyValue = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://js.stripe.com",
  "worker-src 'self' blob:",
  "child-src 'self' blob:",
  "style-src 'self' 'unsafe-inline'",
  `img-src 'self' data: blob: https://*.figma.com https://*.unsplash.com https://*.supabase.co https://www.google-analytics.com https://shop.yakiwood.co.uk${isDev ? ' http://localhost:3000 http://127.0.0.1:3000' : ''}`,
  "font-src 'self' data:",
  "connect-src 'self' blob: https://www.google-analytics.com https://www.googletagmanager.com https://api.stripe.com https://*.supabase.co wss://*.supabase.co https://registry.npmjs.org",
  "frame-src 'self' https://www.googletagmanager.com https://js.stripe.com https://hooks.stripe.com https://www.youtube.com https://www.youtube-nocookie.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  isDev ? "frame-ancestors *" : "frame-ancestors 'self'",
  ...(!isDev ? ['upgrade-insecure-requests'] : []),
].join('; ');

const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  ...(isDev
    ? []
    : [
        {
          key: 'Strict-Transport-Security',
          value: 'max-age=63072000; includeSubDomains; preload',
        },
      ]),
  // VS Code Simple Browser embeds the page; allow it in development by omitting X-Frame-Options.
  ...(isDev
    ? []
    : [
        {
          key: 'X-Frame-Options',
          value: 'SAMEORIGIN',
        },
      ]),
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
  {
    key: 'Content-Security-Policy',
    value: contentSecurityPolicyValue,
  },
];

const cacheHeaders = [
  {
    source: '/assets/evaluator/:path*',
    headers: [
      {
        key: 'Cache-Control',
        value: 'public, max-age=3600, must-revalidate',
      },
    ],
  },
  {
    source: '/assets/:path*',
    headers: [
      {
        key: 'Cache-Control',
        value: 'public, max-age=31536000, immutable',
      },
    ],
  },
  {
    source: '/icons/:path*',
    headers: [
      {
        key: 'Cache-Control',
        value: 'public, max-age=31536000, immutable',
      },
    ],
  },
  {
    source: '/images/:path*',
    headers: [
      {
        key: 'Cache-Control',
        value: 'public, max-age=31536000, immutable',
      },
    ],
  },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'www.figma.com', pathname: '/**' },
      { protocol: 'https', hostname: 'figma.com', pathname: '/**' },
      { protocol: 'https', hostname: 'images.unsplash.com', pathname: '/**' },
      { protocol: 'https', hostname: '*.supabase.co', pathname: '/**' },
    ],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  experimental: {
    optimizePackageImports: ['lucide-react', '@react-three/fiber', '@react-three/drei'],
  },
  async redirects() {
    return [
      {
        source: '/products/black',
        destination: '/products/black-larch',
        permanent: true,
      },
      {
        source: '/products/carbon-light',
        destination: '/products/carbon-light-larch',
        permanent: true,
      },
      {
        source: '/products/carbon',
        destination: '/products/carbon-larch',
        permanent: true,
      },
      {
        source: '/products/dark-brown',
        destination: '/products/dark-brown-larch',
        permanent: true,
      },
      {
        source: '/products/graphite',
        destination: '/products/graphite-larch',
        permanent: true,
      },
      {
        source: '/products/latte',
        destination: '/products/latte-larch',
        permanent: true,
      },
      {
        source: '/products/natural',
        destination: '/products/natural-larch',
        permanent: true,
      },
      {
        source: '/products/silver',
        destination: '/products/silver-larch',
        permanent: true,
      },
      {
        source: '/produktai',
        destination: '/lt/produktai',
        permanent: true,
      },
      {
        source: '/produktai/:path*',
        destination: '/lt/produktai/:path*',
        permanent: true,
      },
      {
        source: '/product/:path*',
        destination: '/products/:path*',
        permanent: true,
      },
      {
        source: '/apie',
        destination: '/lt/apie',
        permanent: true,
      },
      {
        source: '/kontaktai',
        destination: '/lt/kontaktai',
        permanent: true,
      },
      {
        source: '/duk',
        destination: '/lt/duk',
        permanent: true,
      },
      {
        source: '/sprendimai',
        destination: '/lt/sprendimai',
        permanent: true,
      },
      {
        source: '/sprendimai/:path*',
        destination: '/lt/sprendimai/:path*',
        permanent: true,
      },
      {
        source: '/projektai',
        destination: '/lt/projektai',
        permanent: true,
      },
      {
        source: '/projektai/:path*',
        destination: '/lt/projektai/:path*',
        permanent: true,
      },
      {
        source: '/konfiguratorius3d',
        destination: '/lt/konfiguratorius3d',
        permanent: true,
      },
      {
        source: '/svetaines-zemelapis',
        destination: '/lt/svetaines-zemelapis',
        permanent: true,
      },
      {
        source: '/konfiguratorius3d/:path*',
        destination: '/lt/konfiguratorius3d/:path*',
        permanent: true,
      },
      {
        source: '/administravimas',
        destination: '/lt/administravimas',
        permanent: true,
      },
      {
        source: '/administravimas/:path*',
        destination: '/lt/administravimas/:path*',
        permanent: true,
      },
      {
        source: '/lt/admin',
        destination: '/lt/administravimas',
        permanent: true,
      },
      {
        source: '/lt/admin/:path*',
        destination: '/lt/administravimas/:path*',
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/checkout',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },
      {
        source: '/lt/checkout',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },
      {
        source: '/order-confirmation',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },
      {
        source: '/lt/order-confirmation',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },
      {
        source: '/login',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },
      {
        source: '/lt/login',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },
      {
        source: '/register',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },
      {
        source: '/lt/register',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },
      {
        source: '/forgot-password',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },
      {
        source: '/lt/forgot-password',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },
      {
        source: '/reset-password',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },
      {
        source: '/lt/reset-password',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },
      {
        source: '/account/:path*',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },
      {
        source: '/lt/account/:path*',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },
      {
        source: '/lt/paskyra/:path*',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },
      {
        source: '/admin/:path*',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },
      {
        source: '/lt/admin/:path*',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },
      {
        source: '/lt/administravimas/:path*',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
      ...cacheHeaders,
    ];
  },
  webpack: (config, { isServer }) => {
    if (ANALYZE) {
      const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'static',
          reportFilename: isServer
            ? '../analyze/server.html'
            : './analyze/client.html',
          openAnalyzer: false,
        })
      );
    }
    return config;
  },
};

export default withNextIntl(nextConfig);
