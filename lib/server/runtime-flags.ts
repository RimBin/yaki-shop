import type { NextRequest } from 'next/server';

export function isProductionEnvironment(): boolean {
  return process.env.NODE_ENV === 'production';
}

export function isDevelopmentEnvironment(): boolean {
  return !isProductionEnvironment();
}

export function isForcedDemoRequest(request: NextRequest | URL): boolean {
  const url = request instanceof URL ? request : new URL(request.url);
  return url.searchParams.get('demo') === '1';
}

export function isDevelopmentDemoRequest(request: NextRequest | URL): boolean {
  return isDevelopmentEnvironment() && isForcedDemoRequest(request);
}

export function canUseDevelopmentFallback(request?: NextRequest | URL): boolean {
  if (isDevelopmentEnvironment()) return true;
  if (!request) return false;
  return isForcedDemoRequest(request);
}

export function isNewsletterDemoModeEnabled(request?: NextRequest | URL): boolean {
  if (process.env.NEWSLETTER_DEMO_MODE === 'true') {
    return true;
  }

  return canUseDevelopmentFallback(request);
}