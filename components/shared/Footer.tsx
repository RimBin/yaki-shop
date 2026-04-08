'use client';

import React from 'react';
import Link from 'next/link';
import { assets } from '@/lib/assets';
import { useLocale, useTranslations } from 'next-intl';
import { toLocalePath } from '@/i18n/paths';
import PaymentLogos from '@/components/shared/PaymentLogos';
import NewsletterSignup from '@/components/NewsletterSignup';
import SeoImage from '@/components/ui/SeoImage';
import { buildUiImageSeo } from '@/lib/seo/images';

// Certificate logos with background colors
const certificates = [
  {
    src: assets.certifications.epd,
    key: 'EPD',
    bg: 'bg-white/10',
    mobileSize: 64,
    desktopSize: 88,
    href: 'https://www.environdec.com/library/epd10564',
    external: true,
  },
  {
    src: assets.certifications.fsc,
    key: 'FSC',
    bg: 'bg-white/10',
    mobileSize: 64,
    desktopSize: 88,
    href: 'https://app.powerbi.com/view?r=eyJrIjoiN2U3NGMyNWEtZTAxNS00MzVhLWExNmMtOThhZjdiYjQ4MWNkIiwidCI6IjEyNGU2OWRiLWVmNjUtNDk2Yi05NmE5LTVkNTZiZWMxZDI5MSIsImMiOjl9',
    external: true,
  },
  {
    src: assets.certifications.eu,
    key: 'EU',
    bg: 'bg-white',
    mobileSize: 72,
    desktopSize: 96,
    href: '/eu-projects',
    external: false,
  },
];

export default function Footer() {
  const locale = useLocale();
  const t = useTranslations('footer.shared');
  const currentLocale = locale === 'lt' ? 'lt' : 'en';
  const year = new Date().getFullYear();

  const socialColumnTitle = t('columns.social');

  const navColumns = [
    {
      title: t('columns.information'),
      links: [
        { label: t('links.about'), href: '/about' },
        { label: t('links.contacts'), href: '/contact' },
        { label: t('links.projects'), href: '/projects' },
        { label: t('links.blog'), href: '/blog' },
      ],
    },
    {
      title: t('columns.clientCare'),
      links: [
        { label: t('links.faqs'), href: '/faq' },
        { label: t('links.policies'), href: '/policies' },
        { label: t('links.terms'), href: '/policies/terms' },
        { label: t('links.cookiePolicy'), href: '/cookie-policy' },
      ],
    },
    {
      title: t('columns.social'),
      links: [
        { label: t('links.facebook'), href: 'https://www.facebook.com/yakiwood.europe' },
        { label: t('links.instagram'), href: 'https://www.instagram.com/yakiwood.eu' },
        { label: t('links.linkedin'), href: 'https://www.linkedin.com/company/yakiwood/' },
      ],
    },
    {
      title: t('columns.account'),
      links: [
        { label: t('links.myAccount'), href: '/account' },
        { label: t('links.shipping'), href: '/policies/shipping' },
        { label: t('links.refundPolicy'), href: '/policies/refund' },
      ],
    },
  ];

  const desktopNavColumns = navColumns;
  const mobileNavColumns = navColumns.filter((column) => column.title !== socialColumnTitle);

  return (
    <footer className="w-full bg-[#161616] overflow-x-clip">
      {/* ===== MOBILE LAYOUT (< 1024px) - Figma 780:13408 ===== */}
      <div className="lg:hidden px-[16px] pt-[48px] pb-[32px]">
        {/* Navigation Columns - Mobile: Stacked */}
        <div className="flex flex-col gap-[32px] mb-[32px]">
          {mobileNavColumns.map((column) => (
            <div key={column.title}>
              <h4 className="font-['DM_Sans'] font-normal text-[20px] leading-[1.1] tracking-[-0.8px] text-[#E1E1E1] mb-[12px]">
                {column.title}
              </h4>
              <nav className="flex flex-col gap-[8px]">
                {column.links.map((item) => {
                  const isExternal = item.href.startsWith('http');
                  const content = (
                    <span className="font-['Outfit'] font-light text-[14px] leading-[1.3] tracking-[0.14px] text-[#BBBBBB]">
                      {item.label}
                    </span>
                  );

                  if (isExternal) {
                    return (
                      <a
                        key={item.label}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-fit"
                      >
                        {content}
                      </a>
                    );
                  }

                  return (
                    <Link key={item.label} href={toLocalePath(item.href, currentLocale)} className="w-fit">
                      {content}
                    </Link>
                  );
                })}
              </nav>
            </div>
          ))}
        </div>

        {/* Certificates - Mobile: Horizontal row */}
        <div className="flex gap-[10px] mb-[32px]">
          {certificates.map((logo) => {
            const imageSeo = buildUiImageSeo(currentLocale, {
              name: logo.key,
              context: currentLocale === 'lt' ? 'Sertifikatas' : 'Certification',
              description: currentLocale === 'lt' ? 'Yakiwood sertifikato logotipas' : 'Yakiwood certification logo',
            });
            const card = (
              <div
                className={`w-[76px] h-[76px] rounded-[8px] flex items-center justify-center ${logo.bg}`}
              >
                <div className="relative" style={{ width: logo.mobileSize, height: logo.mobileSize }}>
                  <SeoImage
                    src={logo.src}
                    alt={imageSeo.alt}
                    title={imageSeo.title}
                    description={imageSeo.description}
                    fill
                    sizes={`${logo.mobileSize}px`}
                    className="object-contain"
                  />
                </div>
              </div>
            );

            if (logo.external) {
              return (
                <a
                  key={logo.src}
                  href={logo.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={imageSeo.alt}
                >
                  {card}
                </a>
              );
            }

            return (
              <Link key={logo.src} href={toLocalePath(logo.href, currentLocale)} aria-label={imageSeo.alt}>
                {card}
              </Link>
            );
          })}
        </div>

        <div className="mb-[24px]">
          <NewsletterSignup variant="compact" showTitle={false} />
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-[#535353] mb-[16px]" />

        {/* Copyright & Payment - Mobile */}
        <div className="flex flex-col gap-[16px]">
          <p className="font-['DM_Sans'] font-medium text-[14px] leading-[1.2] tracking-[-0.56px] text-[#E1E1E1]">
            {t('copyright', { year })}
          </p>
          <PaymentLogos variant="compact" className="opacity-70" />
        </div>
      </div>

      {/* ===== DESKTOP LAYOUT (>= 1024px) ===== */}
      <div className="hidden lg:block max-w-[1440px] mx-auto px-[40px] pt-[48px] pb-0">
        <div className="flex flex-col gap-[24px]">
          <div className="flex flex-wrap items-start justify-between gap-y-[32px]">
            {/* Navigation Columns - Desktop */}
            <div className="flex flex-wrap items-start gap-x-[40px] xl:gap-x-[110px] gap-y-[24px]">
              {desktopNavColumns.map((column) => (
                <div key={column.title}>
                  <h4
                    className={`font-['DM_Sans'] font-normal text-[24px] leading-[1.1] tracking-[-0.96px] text-[#E1E1E1] ${
                      column.title === 'Information' ? 'mb-[16px]' : 'mb-[24px]'
                    }`}
                  >
                    {column.title}
                  </h4>
                  <nav className="flex flex-col gap-[8px]">
                    {column.links.map((item) => {
                      const isExternal = item.href.startsWith('http');
                      const content = (
                        <span className="font-['Outfit'] font-light text-[14px] leading-[1.3] tracking-[0.14px] text-[#BBBBBB] hover:text-white transition-colors">
                          {item.label}
                        </span>
                      );

                      if (isExternal) {
                        return (
                          <a
                            key={item.label}
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-fit"
                          >
                            {content}
                          </a>
                        );
                      }

                      return (
                        <Link key={item.label} href={toLocalePath(item.href, currentLocale)} className="w-fit">
                          {content}
                        </Link>
                      );
                    })}
                  </nav>
                </div>
              ))}
            </div>

            {/* Certificates - Desktop */}
            <div className="flex flex-wrap gap-[12px] items-center justify-end">
              {certificates.map((logo) => {
                const imageSeo = buildUiImageSeo(currentLocale, {
                  name: logo.key,
                  context: currentLocale === 'lt' ? 'Sertifikatas' : 'Certification',
                  description: currentLocale === 'lt' ? 'Yakiwood sertifikato logotipas' : 'Yakiwood certification logo',
                });
                const card = (
                  <div
                    className={`w-[96px] h-[96px] rounded-[8px] flex items-center justify-center ${logo.bg}`}
                  >
                    <div className="relative" style={{ width: logo.desktopSize, height: logo.desktopSize }}>
                      <SeoImage
                        src={logo.src}
                        alt={imageSeo.alt}
                        title={imageSeo.title}
                        description={imageSeo.description}
                        fill
                        sizes={`${logo.desktopSize}px`}
                        className="object-contain"
                      />
                    </div>
                  </div>
                );

                if (logo.external) {
                  return (
                    <a
                      key={logo.src}
                      href={logo.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={imageSeo.alt}
                    >
                      {card}
                    </a>
                  );
                }

                return (
                  <Link key={logo.src} href={toLocalePath(logo.href, currentLocale)} aria-label={imageSeo.alt}>
                    {card}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="max-w-[520px]">
            <NewsletterSignup variant="compact" showTitle={false} />
          </div>

          {/* Copyright & Payment - Desktop (same row) */}
          <div className="flex items-center justify-between">
            <p className="font-['DM_Sans'] font-medium text-[16px] leading-[1.2] tracking-[-0.64px] text-[#E1E1E1]">
              {t('copyright', { year })}
            </p>
            <PaymentLogos variant="large" className="justify-end" />
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-[#535353]" />

          {/* Brand image - Desktop only (content width) */}
          <div className="w-full pt-[8px]">
            <SeoImage
              src="/assets/footer/Logotipas-baltas-half.png"
              alt={buildUiImageSeo(currentLocale, {
                name: 'Yakiwood',
                context: currentLocale === 'lt' ? 'Poraštės logotipas' : 'Footer logo',
                description: currentLocale === 'lt' ? 'Baltas Yakiwood logotipas poraštėje' : 'White Yakiwood logo in the footer',
              }).alt}
              title={buildUiImageSeo(currentLocale, {
                name: 'Yakiwood',
                context: currentLocale === 'lt' ? 'Poraštės logotipas' : 'Footer logo',
                description: currentLocale === 'lt' ? 'Baltas Yakiwood logotipas poraštėje' : 'White Yakiwood logo in the footer',
              }).title}
              description={buildUiImageSeo(currentLocale, {
                name: 'Yakiwood',
                context: currentLocale === 'lt' ? 'Poraštės logotipas' : 'Footer logo',
                description: currentLocale === 'lt' ? 'Baltas Yakiwood logotipas poraštėje' : 'White Yakiwood logo in the footer',
              }).description}
              width={1440}
              height={520}
              sizes="(min-width: 1024px) 1440px, 100vw"
              className="w-full h-auto object-contain object-bottom"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
