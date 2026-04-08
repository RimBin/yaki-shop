'use client';

import { useLocale } from 'next-intl';
import { assets } from '@/lib/assets';
import SeoImage from '@/components/ui/SeoImage';
import { buildUiImageSeo } from '@/lib/seo/images';

type PaymentLogosVariant = 'compact' | 'default' | 'large';

interface PaymentLogosProps {
  variant?: PaymentLogosVariant;
  className?: string;
}

const paymentProviders = [
  {
    name: 'Mastercard',
    href: 'https://www.mastercard.com',
    src: assets.paymentLogos.mastercard,
    width: 36,
    height: 22,
  },
  {
    name: 'Visa',
    href: 'https://www.visa.com',
    src: assets.paymentLogos.visa,
    width: 36,
    height: 12,
  },
  {
    name: 'Stripe',
    href: 'https://stripe.com',
    src: assets.paymentLogos.stripe,
    width: 53,
    height: 25,
    sizeClass: {
      compact: 'h-[24px]',
      default: 'h-[20px]',
      large: 'h-[34px]',
    },
  },
  {
    name: 'PayPal',
    href: 'https://www.paypal.com',
    src: assets.paymentLogos.paypal,
    width: 42,
    height: 14,
  },
] as const;

const variantClasses: Record<PaymentLogosVariant, { container: string; logo: string }> = {
  compact: {
    container: 'gap-[14px]',
    logo: 'h-[14px]',
  },
  default: {
    container: 'gap-[16px]',
    logo: 'h-[18px]',
  },
  large: {
    container: 'gap-[20px]',
    logo: 'h-[22px]',
  },
};

export default function PaymentLogos({ variant = 'default', className = '' }: PaymentLogosProps) {
  const locale = useLocale();
  const currentLocale = locale === 'lt' ? 'lt' : 'en';
  const classes = variantClasses[variant];

  return (
    <div className={`flex flex-wrap items-center ${classes.container} ${className}`.trim()}>
      {paymentProviders.map((provider) => {
        const imageSeo = buildUiImageSeo(currentLocale, {
          name: provider.name,
          context: currentLocale === 'lt' ? 'Apmokėjimo būdas' : 'Payment method',
          description:
            currentLocale === 'lt' ? 'Oficialus mokėjimo partnerio logotipas' : 'Official payment partner logo',
        });

        return (
          <a
            key={provider.name}
            href={provider.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${provider.name} official website`}
            className="opacity-70 transition-opacity hover:opacity-100"
          >
            <SeoImage
              src={provider.src}
              alt={imageSeo.alt}
              title={imageSeo.title}
              description={imageSeo.description}
              width={provider.width}
              height={provider.height}
              className={`w-auto ${'sizeClass' in provider ? provider.sizeClass[variant] : classes.logo}`}
            />
          </a>
        );
      })}
    </div>
  );
}