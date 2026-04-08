import type { Metadata } from 'next';
import { getLocale, getTranslations } from 'next-intl/server';
import { canonicalUrl } from '@/lib/seo/canonical';
import { applySeoOverride } from '@/lib/seo/overrides';
import { getOgImage } from '@/lib/og-image';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('metadata.resetPassword');
  const locale = await getLocale();
  const currentLocale = locale === 'lt' ? 'lt' : 'en';
  const canonical = canonicalUrl('/reset-password', currentLocale);
  const ogImage = getOgImage('faq');

  const metadata: Metadata = {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical,
    },
    openGraph: {
      title: t('ogTitle'),
      description: t('description'),
      url: canonical,
      type: 'website',
      siteName: 'Yakiwood',
      images: [{ url: ogImage, width: 1200, height: 630, alt: t('ogTitle') }],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('ogTitle'),
      description: t('description'),
      images: [ogImage],
    },
    robots: {
      index: false,
      follow: false,
    },
  };

  return applySeoOverride(metadata, new URL(canonical).pathname, currentLocale);
}

export default function ResetPasswordLayout({ children }: { children: React.ReactNode }) {
  return children;
}