'use client';

import React from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { toLocalePath, type AppLocale } from '@/i18n/paths';
import type { Project } from '@/types/project';

interface ProjectInfoProps {
  title: string;
  subtitle?: string;
  location: string;
  productsUsed: Project['productsUsed'];
}

export default function ProjectInfo({
  title,
  subtitle,
  location,
  productsUsed,
}: ProjectInfoProps) {
  const locale = useLocale();
  const currentLocale: AppLocale = locale === 'lt' ? 'lt' : 'en';
  const labels =
    locale === 'lt'
      ? {
          title: 'Pavadinimas',
          location: 'Vieta',
          productsUsed: 'Naudoti produktai',
        }
      : {
          title: 'Title',
          location: 'Location',
          productsUsed: 'Products used',
        };

  return (
    <div className="w-full max-w-[670px] mx-auto px-4 lg:px-0">
      <div className="flex flex-col gap-4">
        {/* Divider */}
        <div className="w-full h-px bg-[#BBBBBB]" />

        {/* Title */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[329px_minmax(0,1fr)] lg:items-start">
          <p className="font-['Outfit'] font-normal text-[#7C7C7C] text-xs uppercase tracking-[0.6px] leading-[1.3] w-full">
            {labels.title}
          </p>
          <p className="min-w-0 break-words font-['Outfit'] font-normal text-[#161616] text-xs uppercase tracking-[0.6px] leading-[1.3]">
            {title}
            {subtitle && `, ${subtitle}`}
          </p>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-[#BBBBBB]" />

        {/* Location */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[329px_minmax(0,1fr)] lg:items-start">
          <p className="font-['Outfit'] font-normal text-[#7C7C7C] text-xs uppercase tracking-[0.6px] leading-[1.3] w-full">
            {labels.location}
          </p>
          <p className="min-w-0 break-words font-['Outfit'] font-normal text-[#161616] text-xs uppercase tracking-[0.6px] leading-[1.3]">
            {location}
          </p>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-[#BBBBBB]" />

        {/* Products Used */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[329px_minmax(0,1fr)] lg:items-start">
          <p className="font-['Outfit'] font-normal text-[#7C7C7C] text-xs uppercase tracking-[0.6px] leading-[1.3] w-full">
            {labels.productsUsed}
          </p>
          <div className="min-w-0 flex flex-wrap gap-1">
            {productsUsed.map((product, index) => {
              const href =
                currentLocale === 'en'
                  ? (product.hrefEn ?? toLocalePath(`/products/${product.slugEn ?? product.slug}`, currentLocale))
                  : (product.hrefLt ?? toLocalePath(`/products/${product.slug}`, currentLocale));

              return (
              <React.Fragment key={`${product.slug}-${index}`}>
                <Link
                  href={href}
                  className="break-words font-['Outfit'] font-normal text-[#161616] text-xs uppercase tracking-[0.6px] leading-[1.3] underline hover:no-underline transition-all"
                >
                  {product.name}
                </Link>
                {index < productsUsed.length - 1 && (
                  <span className="font-['Outfit'] font-normal text-[#161616] text-xs">,</span>
                )}
              </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-[#BBBBBB]" />
      </div>
    </div>
  );
}

