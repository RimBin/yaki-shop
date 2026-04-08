'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { trackEvent } from '@/lib/analytics';

interface NewsletterSignupProps {
  variant?: 'inline' | 'modal' | 'footer' | 'compact';
  showTitle?: boolean;
  className?: string;
}

export default function NewsletterSignup({
  variant = 'footer',
  showTitle = true,
  className = '',
}: NewsletterSignupProps) {
  const locale = useLocale();
  const isEn = locale === 'en';
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    trackEvent('newsletter_subscribe_attempt', {
      source: variant,
      has_name: Boolean(name?.trim()),
    });

    if (!email || !validateEmail(email)) {
      setMessage({ type: 'error', text: isEn ? 'Please enter a valid email address' : 'Prašome įvesti galiojantį el. pašto adresą' });
      return;
    }

    if (!consent) {
      setMessage({ type: 'error', text: isEn ? 'Please agree to receive updates' : 'Prašome sutikti gauti naujienas' });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          ...(name && { name }),
          consent,
          source: variant,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        trackEvent('sign_up', {
          method: 'newsletter',
          source: variant,
        });

        setMessage({ type: 'success', text: isEn ? 'Successfully subscribed to updates!' : 'Sėkmingai užsiprenumeravote naujienas!' });
        setEmail('');
        setName('');
        setConsent(false);
      } else {
        trackEvent('newsletter_subscribe_error', {
          source: variant,
          status: response.status,
        });

        setMessage({ 
          type: 'error', 
          text: data.error || (isEn ? 'Something went wrong. Please try again.' : 'Įvyko klaida. Bandykite dar kartą.') 
        });
      }
    } catch (error) {
      trackEvent('newsletter_subscribe_error', {
        source: variant,
        status: 'network_error',
      });
      setMessage({ type: 'error', text: isEn ? 'Something went wrong. Please try again.' : 'Įvyko klaida. Bandykite dar kartą.' });
    } finally {
      setLoading(false);
    }
  };

  const variantStyles = {
    footer: 'w-full max-w-md',
    inline: 'w-full',
    modal: 'w-full max-w-lg mx-auto p-6 bg-white rounded-[24px] shadow-lg',
    compact: 'w-full',
  };

  const isCompact = variant === 'compact';

  return (
    <div className={`${variantStyles[variant]} ${className}`}>
      {showTitle && !isCompact && (
        <div className="mb-4">
          <h3 className="text-2xl font-['DM_Sans'] font-medium tracking-[-0.96px] text-[#161616] mb-2">
            {isEn ? 'Get updates' : 'Gaukite naujienas'}
          </h3>
          <p className="text-sm font-['DM_Sans'] text-[#535353]">
            {isEn ? 'Be the first to hear about new products and offers' : 'Sužinokite apie naujus produktus ir pasiūlymus'}
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className={isCompact ? 'space-y-2' : 'space-y-4'}>
        {/* Name field (optional) */}
        {!isCompact && <div>
          <label htmlFor="newsletter-name" className="sr-only">
            {isEn ? 'Name' : 'Vardas'}
          </label>
          <input
            type="text"
            id="newsletter-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={isEn ? 'Name (optional)' : 'Vardas (neprivaloma)'}
            className="w-full px-4 py-3 border border-[#E1E1E1] rounded-[12px] font-['DM_Sans'] text-[#161616] placeholder:text-[#BBBBBB] focus:outline-none focus:ring-2 focus:ring-[#161616] focus:border-transparent"
          />
        </div>}

        {isCompact ? (
          <div className="flex items-center gap-2 rounded-[20px] border border-[#A6ABB4] bg-[#EAEAEA] p-[6px] shadow-[0_0_0_1px_rgba(22,22,22,0.05)]">
            <label htmlFor="newsletter-email" className="sr-only">
              {isEn ? 'Email' : 'El. paštas'}
            </label>
            <input
              type="email"
              id="newsletter-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={isEn ? 'Newsletter' : 'Naujienlaiškis'}
              required
              className="min-w-0 flex-1 rounded-[14px] border border-[#D1D5DB] bg-[#F5F5F5] px-4 py-3 font-['DM_Sans'] text-[14px] text-[#161616] placeholder:text-[#8C8F96] focus:outline-none focus:ring-2 focus:ring-[#161616] focus:border-transparent"
            />
            <button
              type="submit"
              disabled={loading}
              className="shrink-0 rounded-[12px] bg-[#2E3138] px-5 py-3 font-['DM_Sans'] text-[12px] font-medium uppercase tracking-[0.48px] text-white transition-colors hover:bg-[#1f2329] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (isEn ? 'Loading...' : 'Vykdoma...') : (isEn ? 'Subscribe' : 'Prenumeruoti')}
            </button>
          </div>
        ) : (
          <div>
            <label htmlFor="newsletter-email" className="sr-only">
              {isEn ? 'Email' : 'El. paštas'}
            </label>
            <input
              type="email"
              id="newsletter-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={isEn ? 'Your email' : 'Jūsų el. paštas'}
              required
              className="w-full px-4 py-3 border border-[#E1E1E1] rounded-[12px] font-['DM_Sans'] text-[#161616] placeholder:text-[#BBBBBB] focus:outline-none focus:ring-2 focus:ring-[#161616] focus:border-transparent"
            />
          </div>
        )}

        {/* GDPR consent checkbox */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="newsletter-consent"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            required
            className="h-4 w-4 shrink-0 border border-[#D4D7DC] rounded text-[#161616] focus:ring-2 focus:ring-[#161616]"
          />
          <label
            htmlFor="newsletter-consent"
            className="text-sm font-['DM_Sans'] text-[#A6ABB4] leading-[1.35]"
          >
            {isEn ? 'I agree to receive updates and accept the ' : 'Sutinku gauti naujienas ir sutinku su '}
            <Link
              href="/policies"
              className="text-[#D7DBE0] underline hover:no-underline"
            >
              {isEn ? 'privacy policy' : 'privatumo politika'}
            </Link>
          </label>
        </div>

        {/* Submit button */}
        {!isCompact && (
          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-3 bg-[#161616] text-white rounded-[100px] font-['DM_Sans'] font-medium hover:bg-[#2a2a2a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (isEn ? 'Subscribing...' : 'Prenumeruojama...') : (isEn ? 'Subscribe' : 'Prenumeruoti')}
          </button>
        )}

        {/* Message display */}
        {message && (
          <div
            className={`p-3 rounded-[12px] text-sm font-['DM_Sans'] ${
              message.type === 'success'
                ? 'bg-green-50 text-green-800 border border-green-200'
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}
          >
            {message.text}
          </div>
        )}
      </form>
    </div>
  );
}
