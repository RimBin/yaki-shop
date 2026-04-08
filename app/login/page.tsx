'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { createClient } from '@/lib/supabase/client';
import { toLocalePath, type AppLocale } from '@/i18n/paths';
import { PageCover, PageSection } from '@/components/shared/PageLayout';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const supabase = useMemo(() => createClient(), []);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const t = useTranslations('account');
  const currentLocale: AppLocale = pathname.startsWith('/lt') ? 'lt' : 'en';
  const tr = (lt: string, en: string) => (currentLocale === 'en' ? en : lt);
  const defaultRedirect = toLocalePath('/account', currentLocale);
  const redirectPath = searchParams.get('redirect') || defaultRedirect;

  useEffect(() => {
    const oauthError = searchParams.get('error');
    if (oauthError) setError(oauthError);
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (!supabase) {
        throw new Error(tr('Supabase nesukonfigūruotas.', 'Supabase is not configured.'));
      }

      const { error: authError } = await supabase.auth.signInWithPassword({ email, password });

      if (authError) {
        throw new Error(authError.message);
      }

      router.push(redirectPath);
      router.refresh();
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : tr('Nepavyko prisijungti.', 'Failed to sign in.');
      setError(msg);
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError(null);
    setLoading(true);
    try {
      if (!supabase) {
        throw new Error(tr('Supabase nesukonfigūruotas.', 'Supabase is not configured.'));
      }
      const callbackUrl = new URL('/auth/callback', window.location.origin);
      callbackUrl.searchParams.set('next', redirectPath);
      const { error: oauthError } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: callbackUrl.toString() },
      });
      if (oauthError) {
        throw new Error(oauthError.message || tr('Nepavyko prisijungti su Google', 'Failed to sign in with Google'));
      }
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : tr('Nepavyko prisijungti su Google', 'Failed to sign in with Google');
      setError(msg);
      setLoading(false);
    }
  };

  return (
    <main className="w-full bg-[#E1E1E1]">
      <PageCover>
        <h1
          className="font-['DM_Sans'] font-light text-[56px] md:text-[128px] leading-[0.95] tracking-[-2.8px] md:tracking-[-6.4px] text-[#161616]"
          style={{ fontVariationSettings: "'opsz' 14" }}
        >
          {t('signIn')}
        </h1>
      </PageCover>
      <PageSection className="pt-[40px] md:pt-[56px] pb-[80px]">
        <div className="w-full max-w-[478px] mx-auto flex flex-col gap-[24px]">
          {error && (
            <div className="w-full p-[12px] bg-red-50 border border-red-200 rounded">
              <p className="font-['Outfit'] text-[12px] text-red-600">{error}</p>
            </div>
          )}
          <form onSubmit={handleSubmit} className="bg-[#E1E1E1] rounded-[16px] p-[32px] border border-[#BBBBBB] flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="font-['Outfit'] font-normal text-xs text-[#7C7C7C] uppercase tracking-[0.6px] leading-[1.3]">
                {t('emailAddress')} <span className="text-[#F63333]">*</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="yw-input h-12 border border-[#BBBBBB] bg-[#E1E1E1] px-4 font-['Outfit'] text-xs uppercase tracking-[0.6px] text-[#161616] focus:outline-none focus:border-[#161616]"
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-['Outfit'] font-normal text-xs text-[#7C7C7C] uppercase tracking-[0.6px] leading-[1.3]">
                {t('password')} <span className="text-[#F63333]">*</span>
              </label>
              <div className="relative h-12 border border-[#BBBBBB] flex items-center bg-[#E1E1E1]">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="flex-1 h-full px-4 bg-transparent font-['Outfit'] text-xs uppercase tracking-[0.6px] text-[#161616] focus:outline-none"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((current) => !current)}
                  className="px-4 h-full flex items-center justify-center"
                  aria-label={showPassword ? t('hidePassword') : t('showPassword')}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M2 12C2 12 5 5 12 5C19 5 22 12 22 12C22 12 19 19 12 19C5 19 2 12 2 12Z" stroke="#161616" strokeWidth="1.5"/>
                    <circle cx="12" cy="12" r="3" stroke="#161616" strokeWidth="1.5"/>
                  </svg>
                </button>
              </div>
            </div>

            <Link
              href={toLocalePath('/forgot-password', currentLocale)}
              className="text-left font-['Outfit'] font-normal text-xs text-[#161616] uppercase tracking-[0.6px] hover:underline"
            >
              {t('forgotPassword')}
            </Link>

            <button
              type="submit"
              disabled={loading}
              data-testid="login-submit"
              className="w-full h-12 bg-[#161616] rounded-[100px] flex items-center justify-center hover:bg-[#2a2a2a] transition-colors disabled:opacity-60"
            >
              <span className="font-['Outfit'] font-normal text-xs text-white uppercase tracking-[0.6px]">
                {loading ? t('loggingIn') : t('login')}
              </span>
            </button>

            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={loading}
              data-testid="login-google"
              className="w-full h-[56px] border border-[#161616] rounded-[100px] font-['Outfit'] font-normal text-[12px] leading-[1.2] tracking-[0.6px] uppercase text-[#161616] hover:bg-[#161616] hover:text-white transition-colors disabled:opacity-60 flex items-center justify-center gap-[10px]"
            >
              <svg width="18" height="18" viewBox="0 0 48 48">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                <path fill="#FBBC05" d="M10.53 28.59a14.5 14.5 0 0 1 0-9.18l-7.98-6.19a24.01 24.01 0 0 0 0 21.56l7.98-6.19z"/>
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
              </svg>
              {loading ? tr('Jungiamasi...', 'Connecting...') : t('continueWithGoogle')}
            </button>

            <div className="text-center font-['Outfit'] text-xs text-[#535353]">
              <span>{t('dontHaveAccount')} </span>
              <Link href={toLocalePath('/register', currentLocale)} className="text-[#161616] uppercase tracking-[0.6px] hover:underline">
                {t('register')}
              </Link>
            </div>
          </form>
        </div>
      </PageSection>
    </main>
  );
}
