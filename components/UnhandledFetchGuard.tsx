'use client';

import { useEffect } from 'react';

function getReasonMessage(reason: unknown): string {
  if (typeof reason === 'string') return reason;
  if (reason && typeof reason === 'object' && 'message' in reason) {
    const message = (reason as { message?: unknown }).message;
    if (typeof message === 'string') return message;
  }
  return '';
}

function getReasonName(reason: unknown): string {
  if (reason && typeof reason === 'object' && 'name' in reason) {
    const name = (reason as { name?: unknown }).name;
    if (typeof name === 'string') return name;
  }
  return '';
}

function isBenignNetworkError(reason: unknown): boolean {
  const message = getReasonMessage(reason).toLowerCase();
  const name = getReasonName(reason);
  if (name === 'AbortError') return true;
  if (message.includes('failed to fetch')) return true;
  if (message.includes('networkerror')) return true;
  return false;
}

export default function UnhandledFetchGuard() {
  useEffect(() => {
    const onUnhandledRejection = (event: PromiseRejectionEvent) => {
      if (!isBenignNetworkError(event.reason)) return;
      event.preventDefault();
    };

    window.addEventListener('unhandledrejection', onUnhandledRejection);
    return () => {
      window.removeEventListener('unhandledrejection', onUnhandledRejection);
    };
  }, []);

  return null;
}
