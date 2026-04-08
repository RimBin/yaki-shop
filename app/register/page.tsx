'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Checkbox } from '@/components/ui/Checkbox';
import { createClient } from '@/lib/supabase/client';
import { toLocalePath, type AppLocale } from '@/i18n/paths';
import { PageCover, PageSection } from '@/components/shared/PageLayout';

export default function RegisterPage() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = useMemo(() => createClient(), []);
  const currentLocale: AppLocale = pathname.startsWith('/lt') ? 'lt' : 'en';
  const t = useTranslations('account');
  const tr = (lt: string, en: string) => (currentLocale === 'en' ? en : lt);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const isCompleteMode = searchParams.get('complete') === '1';

  const defaultRedirect = toLocalePath('/account', currentLocale);
  const nextRaw = searchParams.get('next');
  const nextPath = nextRaw && nextRaw.startsWith('/') && !nextRaw.startsWith('//') ? nextRaw : defaultRedirect;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!agreeTerms) {
      setError(t('registerForm.termsRequired'));
      return;
    }

    if (password !== confirmPassword) {
      setError(t('registerForm.passwordMismatch'));
      return;
    }

    if (!supabase) {
      setError(t('forgotPasswordForm.errorSupabase'));
      return;
    }

    setIsSubmitting(true);

    try {
      const [firstName, ...rest] = fullName.trim().split(/\s+/);
      const lastName = rest.join(' ');
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { firstName: firstName || fullName, lastName },
        },
      });

      if (signUpError) {
        setError(signUpError.message);
        return;
      }

      if (data.session && data.user) {
        const { error: profileError } = await supabase.from('user_profiles').upsert(
          {
            id: data.user.id,
            email: data.user.email || email,
            full_name: fullName.trim() || null,
            terms_accepted_at: new Date().toISOString(),
          },
          { onConflict: 'id' }
        );

        if (profileError) {
          setError(profileError.message || t('forgotPasswordForm.errorGeneric'));
          return;
        }

        router.push(nextPath);
        router.refresh();
        return;
      }

      setSuccess(tr('Patikrinkite el. paštą ir patvirtinkite registraciją.', 'Check your email to confirm registration.'));
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : t('forgotPasswordForm.errorGeneric'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError(null);
    setSuccess(null);
    if (!agreeTerms) {
      setError(t('registerForm.termsRequired'));
      return;
    }
    if (!supabase) {
      setError(t('forgotPasswordForm.errorSupabase'));
      return;
    }
    setIsSubmitting(true);
    try {
      const callbackUrl = new URL('/auth/callback', window.location.origin);
      callbackUrl.searchParams.set('next', nextPath);
      callbackUrl.searchParams.set('consent', '1');
      const { error: oauthError } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: callbackUrl.toString() },
      });
      if (oauthError) {
        setError(oauthError.message || t('oauthErrorGeneric'));
        setIsSubmitting(false);
      }
    } catch (err: any) {
      setError(err?.message || t('oauthErrorGeneric'));
      setIsSubmitting(false);
    }
  };

  const handleCompleteConsent = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    if (!agreeTerms) {
      setError(t('registerForm.termsRequired'));
      return;
    }
    if (!supabase) {
      setError(t('forgotPasswordForm.errorSupabase'));
      return;
    }
    setIsSubmitting(true);
    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) {
        setError(userError?.message || t('loginRequired'));
        setIsSubmitting(false);
        router.push(toLocalePath('/login', currentLocale));
        return;
      }
      const fullName =
        typeof user.user_metadata?.full_name === 'string'
          ? user.user_metadata.full_name
          : `${user.user_metadata?.firstName || ''} ${user.user_metadata?.lastName || ''}`.trim() || null;
      const { error: profileError } = await supabase.from('user_profiles').upsert(
        { id: user.id, email: user.email || '', full_name: fullName, terms_accepted_at: new Date().toISOString() },
        { onConflict: 'id' }
      );
      if (profileError) {
        setError(profileError.message || t('forgotPasswordForm.errorGeneric'));
        return;
      }
      setSuccess(t('completeRegistrationSuccess'));
      router.push(nextPath);
    } catch (err: any) {
      setError(err?.message || t('forgotPasswordForm.errorGeneric'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="w-full bg-[#E1E1E1]">
      <PageCover>
        <h1
          className="font-['DM_Sans'] font-light text-[56px] md:text-[128px] leading-[0.95] tracking-[-2.8px] md:tracking-[-6.4px] text-[#161616]"
          style={{ fontVariationSettings: "'opsz' 14" }}
        >
          {t('registerForm.title')}
        </h1>
      </PageCover>

      <PageSection className="pt-[40px] md:pt-[56px] pb-[80px]">
        <div className="w-full max-w-[478px] mx-auto flex flex-col gap-[24px]">

          {error && (
            <p className="font-['Outfit'] text-[12px] leading-[1.4] text-[#F63333]">{error}</p>
          )}
          {success && (
            <p className="font-['Outfit'] text-[12px] leading-[1.4] text-[#161616]">{success}</p>
          )}

          {isCompleteMode ? (
            <form onSubmit={handleCompleteConsent} className="flex flex-col gap-[24px]" data-testid="register-form">
              <p className="font-['Outfit'] font-light text-[14px] leading-[1.5] text-[#535353]">
                {t('completeRegistrationDescription')}
              </p>
              <Checkbox
                id="agreeTerms"
                checked={agreeTerms}
                onChange={setAgreeTerms}
                label={
                  <span className="font-['Outfit'] font-light text-[12px] leading-[1.5] text-[#161616]">
                    {t('registerForm.termsPrefix')}{' '}
                    <Link href={toLocalePath('/policies', currentLocale)} className="underline hover:opacity-70">
                      {t('registerForm.termsLink')}
                    </Link>{' '}
                    {t('registerForm.termsMiddle')}{' '}
                    <Link href={toLocalePath('/policies', currentLocale)} className="underline hover:opacity-70">
                      {t('registerForm.privacyLink')}
                    </Link>
                  </span>
                }
              />
              <button
                type="submit"
                disabled={isSubmitting}
                data-testid="register-submit"
                className="w-full h-[48px] rounded-[100px] bg-[#161616] font-['Outfit'] font-normal text-[12px] leading-[1.2] tracking-[0.6px] uppercase text-white hover:bg-[#535353] transition-colors disabled:opacity-60"
              >
                {isSubmitting ? t('creatingAccount') : t('completeRegistrationCta')}
              </button>
            </form>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-[24px]" data-testid="register-form">
              <div className="flex flex-col gap-1 w-full">
                <label className="font-['Outfit'] font-normal text-xs text-[#7C7C7C] uppercase tracking-[0.6px] leading-[1.3]">
                  {t('fullName')} <span className="text-[#F63333]">*</span>
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="h-12 border border-[#BBBBBB] p-4 bg-transparent font-['Outfit'] text-xs uppercase tracking-[0.6px] text-[#161616] focus:outline-none focus:border-[#161616]"
                  required
                />
              </div>

              <div className="flex flex-col gap-1 w-full">
                <label className="font-['Outfit'] font-normal text-xs text-[#7C7C7C] uppercase tracking-[0.6px] leading-[1.3]">
                  {t('emailAddress')} <span className="text-[#F63333]">*</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 border border-[#BBBBBB] p-4 bg-transparent font-['Outfit'] text-xs uppercase tracking-[0.6px] text-[#161616] focus:outline-none focus:border-[#161616]"
                  required
                />
              </div>

              <div className="flex flex-col gap-1 w-full">
                <label className="font-['Outfit'] font-normal text-xs text-[#7C7C7C] uppercase tracking-[0.6px] leading-[1.3]">
                  {t('password')} <span className="text-[#F63333]">*</span>
                </label>
                <div className="relative h-12 border border-[#BBBBBB] flex items-center bg-transparent">
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

              <div className="flex flex-col gap-1 w-full">
                <label className="font-['Outfit'] font-normal text-xs text-[#7C7C7C] uppercase tracking-[0.6px] leading-[1.3]">
                  {t('confirmPassword')} <span className="text-[#F63333]">*</span>
                </label>
                <div className="relative h-12 border border-[#BBBBBB] flex items-center bg-transparent">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="flex-1 h-full px-4 bg-transparent font-['Outfit'] text-xs uppercase tracking-[0.6px] text-[#161616] focus:outline-none"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((current) => !current)}
                    className="px-4 h-full flex items-center justify-center"
                    aria-label={showConfirmPassword ? t('hidePassword') : t('showPassword')}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M2 12C2 12 5 5 12 5C19 5 22 12 22 12C22 12 19 19 12 19C5 19 2 12 2 12Z" stroke="#161616" strokeWidth="1.5"/>
                      <circle cx="12" cy="12" r="3" stroke="#161616" strokeWidth="1.5"/>
                    </svg>
                  </button>
                </div>
              </div>

              <Checkbox
                id="agreeTerms"
                checked={agreeTerms}
                onChange={setAgreeTerms}
                label={
                  <span className="font-['Outfit'] font-light text-[12px] leading-[1.5] text-[#161616]">
                    {t('registerForm.termsPrefix')}{' '}
                    <Link href={toLocalePath('/policies', currentLocale)} className="underline hover:opacity-70">
                      {t('registerForm.termsLink')}
                    </Link>{' '}
                    {t('registerForm.termsMiddle')}{' '}
                    <Link href={toLocalePath('/policies', currentLocale)} className="underline hover:opacity-70">
                      {t('registerForm.privacyLink')}
                    </Link>
                  </span>
                }
              />
              <button
                type="submit"
                disabled={isSubmitting}
                data-testid="register-submit"
                className="w-full h-[48px] rounded-[100px] bg-[#161616] font-['Outfit'] font-normal text-[12px] leading-[1.2] tracking-[0.6px] uppercase text-white hover:bg-[#535353] transition-colors disabled:opacity-60"
              >
                {isSubmitting ? t('creatingAccount') : t('register')}
              </button>
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={!agreeTerms || isSubmitting}
                data-testid="register-google"
                className="w-full h-[56px] border border-[#161616] rounded-[100px] font-['Outfit'] font-normal text-[12px] leading-[1.2] tracking-[0.6px] uppercase text-[#161616] hover:bg-[#161616] hover:text-white transition-colors disabled:opacity-60 flex items-center justify-center gap-[10px]"
              >
                <svg width="18" height="18" viewBox="0 0 48 48">
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                  <path fill="#FBBC05" d="M10.53 28.59a14.5 14.5 0 0 1 0-9.18l-7.98-6.19a24.01 24.01 0 0 0 0 21.56l7.98-6.19z"/>
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                </svg>
                {isSubmitting ? t('creatingAccount') : t('continueWithGoogle')}
              </button>

              <div className="text-center">
                <Link
                  href={toLocalePath('/login', currentLocale)}
                  className="font-['Outfit'] font-normal text-[12px] leading-[1.2] tracking-[0.6px] uppercase text-[#161616] hover:underline"
                >
                  {t('login')}
                </Link>
              </div>
            </form>
          )}
        </div>
      </PageSection>
    </main>
  );
}
