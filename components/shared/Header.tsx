'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';
import { getAsset } from '@/lib/assets';
import { useCartStore } from '@/lib/cart/store';
import { getCartBadgeText } from '@/lib/cart/display';
import { toLocalePath } from '@/i18n/paths';
import SeoImage from '@/components/ui/SeoImage';
import { buildUiImageSeo } from '@/lib/seo/images';

const LanguageSwitcher = dynamic(() => import('@/components/LanguageSwitcher'), {
  ssr: false,
  loading: () => <div className="h-[40px] w-[68px] rounded-[100px] border border-[#535353] md:h-[48px]" aria-hidden="true" />,
});

const MobileMenu = dynamic(() => import('./MobileMenu'), {
  ssr: false,
  loading: () => null,
});

const CartSidebar = dynamic(() => import('./CartSidebar'), {
  ssr: false,
  loading: () => null,
});

export default function Header() {
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const items = useCartStore((state) => state.items);
  const isHydrated = useCartStore((state) => state.isHydrated);
  const normalizedPathname = (pathname || '/').replace(/^\/(lt|en)(?=\/|$)/, '');
  const isHome = normalizedPathname === '' || normalizedPathname === '';
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);
  
  const currentLocale = locale === 'lt' ? 'lt' : 'en';
  const hydratedItems = isHydrated ? items : [];
  const cartBadgeText = getCartBadgeText(hydratedItems, currentLocale);
  const logoSeo = buildUiImageSeo(currentLocale, {
    name: 'Yakiwood',
    context: currentLocale === 'lt' ? 'Svetainės logotipas' : 'Website logo',
    description: currentLocale === 'lt' ? 'Pagrindinis Yakiwood logotipas antraštėje' : 'Primary Yakiwood logo in the header',
  });
  const cartSeo = buildUiImageSeo(currentLocale, {
    name: currentLocale === 'lt' ? 'Krepšelis' : 'Cart',
    context: currentLocale === 'lt' ? 'Pirkinių krepšelio piktograma' : 'Shopping cart icon',
    description: currentLocale === 'lt' ? 'Yakiwood pirkinių krepšelio piktograma' : 'Yakiwood shopping cart icon',
  });
  const fastDeliverySeo = buildUiImageSeo(currentLocale, {
    name: t(locale === 'lt' ? 'header.fastDelivery' : 'header.fastDelivery'),
    context: currentLocale === 'lt' ? 'Pristatymo piktograma' : 'Delivery icon',
  });
  const moneyBackSeo = buildUiImageSeo(currentLocale, {
    name: t(locale === 'lt' ? 'header.moneyBack' : 'header.moneyBack'),
    context: currentLocale === 'lt' ? 'Garantijos piktograma' : 'Guarantee icon',
  });
  const ecoSeo = buildUiImageSeo(currentLocale, {
    name: t(locale === 'lt' ? 'header.ecoFriendly' : 'header.ecoFriendly'),
    context: currentLocale === 'lt' ? 'Ekologijos piktograma' : 'Eco icon',
  });
  const navItems = [
    {
      href: toLocalePath('/configurator3d', currentLocale),
      label: t(locale === 'lt' ? 'nav.konfiguratorius3d' : 'nav.configurator3d'),
    },
    {
      href: toLocalePath('/products', currentLocale),
      label: t(locale === 'lt' ? 'nav.produktai' : 'nav.products'),
    },
    {
      href: toLocalePath('/solutions', currentLocale),
      label: t(locale === 'lt' ? 'nav.sprendimai' : 'nav.solutions'),
    },
    {
      href: toLocalePath('/projects', currentLocale),
      label: t(locale === 'lt' ? 'nav.projektai' : 'nav.projects'),
    },
    {
      href: toLocalePath('/eu-projects', currentLocale),
      label: t(locale === 'lt' ? 'nav.euProjektai' : 'nav.euProjects'),
    },
    {
      href: toLocalePath('/blog', currentLocale),
      label: t(locale === 'lt' ? 'nav.straipsniai' : 'nav.blog'),
    },
    {
      href: toLocalePath('/about', currentLocale),
      label: t(locale === 'lt' ? 'nav.apie' : 'nav.about'),
    },
    {
      href: toLocalePath('/contact', currentLocale),
      label: t(locale === 'lt' ? 'nav.kontaktai' : 'nav.contact'),
    },
  ];
  
  return (
    <header className="w-full fixed top-0 z-50 overflow-x-clip">
      {/* Black Announcement Bar */}
      <div className="bg-[#161616] w-full py-[8px] px-[clamp(12px,4vw,40px)]">
        <div className="max-w-[1440px] mx-auto flex items-center w-full gap-[clamp(12px,5vw,200px)] justify-center">
          {/* Fast Delivery */}
          <div className="flex items-center gap-[8px]">
            <div className="relative w-[24px] h-[24px] shrink-0">
              <SeoImage
                src={getAsset('imgIconTruck')}
                alt={fastDeliverySeo.alt}
                title={fastDeliverySeo.title}
                description={fastDeliverySeo.description}
                width={24}
                height={24}
              />
            </div>
            <p
              className="font-['Outfit'] font-normal leading-[1.2] uppercase tracking-[0.6px] text-white whitespace-nowrap"
              style={{ fontSize: 'clamp(10px, 1.2vw, 12px)' }}
            >
              {t('header.fastDelivery')}
            </p>
          </div>

          {/* Money Back Guarantee */}
          <div className="hidden min-[640px]:flex items-center gap-[8px]">
            <div className="relative w-[24px] h-[24px] shrink-0">
              <SeoImage
                src={getAsset('imgIconCoins')}
                alt={moneyBackSeo.alt}
                title={moneyBackSeo.title}
                description={moneyBackSeo.description}
                width={24}
                height={24}
              />
            </div>
            <p
              className="font-['Outfit'] font-normal leading-[1.2] uppercase tracking-[0.6px] text-white whitespace-nowrap"
              style={{ fontSize: 'clamp(10px, 1.2vw, 12px)' }}
            >
              {t('header.moneyBack')}
            </p>
          </div>

          {/* Eco-Friendly */}
          <div className="hidden min-[1280px]:flex items-center gap-[8px]">
            <div className="relative w-[24px] h-[24px] shrink-0">
              <SeoImage
                src={getAsset('imgIconPlant')}
                alt={ecoSeo.alt}
                title={ecoSeo.title}
                description={ecoSeo.description}
                width={24}
                height={24}
              />
            </div>
            <p
              className="font-['Outfit'] font-normal leading-[1.2] uppercase tracking-[0.6px] text-white whitespace-nowrap"
              style={{ fontSize: 'clamp(10px, 1.2vw, 12px)' }}
            >
              {t('header.ecoFriendly')}
            </p>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className={`transition-all duration-300 border-b border-solid ${
        isScrolled
          ? 'bg-[#E1E1E1]/80 backdrop-blur-md border-[#bbbbbb]/30 shadow-sm'
          : isHome
            ? 'bg-transparent border-transparent shadow-none backdrop-blur-none'
            : 'bg-transparent border-[#bbbbbb] shadow-none backdrop-blur-none'
      }`}>
        <div className="max-w-[1440px] mx-auto px-[16px] sm:px-[24px] lg:px-[40px] py-[16px]">
          <div className="flex items-center gap-[16px]">
            {/* Logo - exact 126x48px */}
            <Link
              href={toLocalePath('/', currentLocale)}
              aria-label="Yakiwood homepage"
              className="h-[48px] w-[126px] relative shrink-0"
            >
              <SeoImage
                src={getAsset('imgLogo')}
                alt={logoSeo.alt}
                title={logoSeo.title}
                description={logoSeo.description}
                fill
                sizes="126px"
                priority
                style={{ objectFit: 'contain' }}
              />
            </Link>

            {/* Navigation - hidden on mobile/tablet, shown on large screens */}
            <nav className="hidden xl:flex flex-1 justify-center gap-[18px] min-[1500px]:gap-[22px] 2xl:gap-[24px]">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="font-['Outfit'] font-normal text-[11px] min-[1400px]:text-[12px] leading-[1.2] text-center tracking-[0.6px] uppercase text-[#161616] hover:opacity-70 transition-opacity whitespace-nowrap"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Cart button + language toggle + mobile menu */}
            <div className="ml-auto flex items-center gap-[8px] md:gap-[12px]">
              {/* Language Switcher - hidden on mobile, shown on desktop */}
              <div className="hidden md:block">
                <LanguageSwitcher />
              </div>
              
              <button 
                onClick={() => setIsCartOpen(true)}
                data-testid="open-cart-button"
                aria-label={currentLocale === 'lt' ? 'Atidaryti krepšelį' : 'Open cart'}
                className="border border-[#535353] border-solid rounded-[100px] flex gap-[0px] md:gap-[8px] h-[40px] md:h-[48px] items-center justify-center px-[12px] md:px-[20px] min-[1400px]:px-[24px] py-[10px] bg-transparent hover:bg-[#161616] hover:border-white hover:text-white transition-colors group relative"
              >
                <div className="relative h-[24px] w-[32px] shrink-0 flex items-center justify-center">
                  <SeoImage
                    src={getAsset('imgCart')}
                    alt={cartSeo.alt}
                    width={24}
                    height={24}
                    className="transition-colors group-hover:invert"
                    title={cartSeo.title}
                    description={cartSeo.description}
                  />
                </div>
                {cartBadgeText && (
                  <span className="absolute -top-[6px] right-[8px] md:right-[12px] min-w-[18px] h-[18px] px-[5px] rounded-full bg-[#161616] border border-[#E1E1E1] flex items-center justify-center font-['Outfit'] text-[10px] leading-none text-white whitespace-nowrap">
                    {cartBadgeText}
                  </span>
                )}
                <span className="hidden min-[1400px]:inline font-['Outfit'] font-normal text-[12px] leading-[1.2] tracking-[0.6px] uppercase text-[#161616] group-hover:text-white shrink-0">
                  {t(locale === 'lt' ? 'header.krepselis' : 'header.cart')}
                </span>
              </button>

              {/* Mobile Menu Button - visible only on mobile/tablet */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="xl:hidden border border-[#535353] border-solid rounded-[100px] h-[40px] md:h-[48px] px-[16px] md:px-[24px] flex items-center justify-center bg-transparent hover:bg-[#161616] hover:border-white transition-colors group"
                aria-label={t(locale === 'lt' ? 'header.atidarykMenu' : 'header.openMenu')}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:stroke-white transition-colors">
                  <path d="M3 12H21M3 6H21M3 18H21" stroke="#161616" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:stroke-white"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen ? <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} /> : null}
      
      {/* Cart Sidebar */}
      {isCartOpen ? <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} /> : null}
    </header>
  );
}
