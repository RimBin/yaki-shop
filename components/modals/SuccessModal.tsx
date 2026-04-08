'use client';

import React from 'react';
import { useLocale } from 'next-intl';
import SeoImage from '@/components/ui/SeoImage';
import { getAsset } from '@/lib/assets';
import { buildUiImageSeo } from '@/lib/seo/images';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

export default function SuccessModal({ 
  isOpen, 
  onClose,
  message 
}: SuccessModalProps) {
  const locale = useLocale();
  const currentLocale = locale === 'lt' ? 'lt' : 'en';
  const logoSeo = buildUiImageSeo(currentLocale, {
    name: 'Yakiwood',
    context: currentLocale === 'lt' ? 'Sėkmės pranešimo lango logotipas' : 'Success modal logo',
    description: currentLocale === 'lt' ? 'Yakiwood sėkmės pranešimo logotipas' : 'Yakiwood success message logo',
  });

  if (!isOpen) return null;

  return (
    <div className="relative w-[479px] h-[249px] bg-[#E1E1E1] p-10 flex flex-col gap-6 items-center">
      {/* Close button */}
      <div className="w-full flex justify-end">
        <button 
          onClick={onClose}
          className="w-6 h-6 flex items-center justify-center hover:opacity-70 transition-opacity"
          aria-label="Close"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6L18 18" stroke="#161616" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      {/* Logo */}
      <div className="w-[126px] h-12 relative">
        <SeoImage src={getAsset('imgLogo')} alt={logoSeo.alt} title={logoSeo.title} description={logoSeo.description} fill sizes="126px" style={{ objectFit: 'contain' }} />
      </div>

      {/* Message */}
      <p className="font-['Outfit'] font-normal text-xs text-[#161616] text-center uppercase tracking-[0.6px] leading-[1.2] w-[283px]">
        {message}
      </p>
    </div>
  );
}
