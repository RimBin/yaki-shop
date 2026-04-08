'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import AccountLayout from '@/components/account/AccountLayout';
import { createClient } from '@/lib/supabase/client';
import { toLocalePath } from '@/i18n/paths';
import type { Invoice } from '@/types/invoice';

type InvoiceView = {
  id: string;
  invoiceNumber: string;
  issueDate: string;
  status: string;
  total: number;
};

type InvoiceLocale = 'lt' | 'en';

const invoiceLocales: InvoiceLocale[] = ['lt', 'en'];

function formatMoneyEUR(amount: number): string {
  return `€${amount.toFixed(2)}`;
}

function formatDate(value?: string | null): string {
  if (!value) return '-';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '-';
  return date.toLocaleDateString('lt-LT');
}

export default function InvoicesPage() {
  const locale = useLocale();
  const currentLocale = locale === 'lt' ? 'lt' : 'en';
  const t = useTranslations('account');
  const tCommon = useTranslations('common');
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);

  const [isLoading, setIsLoading] = useState(true);
  const [invoices, setInvoices] = useState<InvoiceView[]>([]);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    let isCancelled = false;

    const loadInvoices = async () => {
      setLoadError(null);
      try {
        const res = await fetch('/api/account/invoices');
        if (res.status === 401) {
          if (!isCancelled) router.push(`${toLocalePath('/login', currentLocale)}?redirect=${encodeURIComponent(toLocalePath('/account/invoices', currentLocale))}`);
          return;
        }

        if (!res.ok) {
          throw new Error('Failed to load invoices');
        }

        const payload = (await res.json()) as { invoices?: Invoice[] };
        const statusLabels: Record<string, string> = {
          draft: t('status.draft'),
          issued: t('status.issued'),
          paid: t('status.paid'),
          cancelled: t('status.cancelled'),
          overdue: t('status.overdue'),
        };

        const nextInvoices: InvoiceView[] = (payload.invoices || []).map((invoice) => ({
          id: invoice.id,
          invoiceNumber: invoice.invoiceNumber,
          issueDate: formatDate(invoice.issueDate),
          status: statusLabels[invoice.status] || invoice.status,
          total: Number(invoice.total || 0),
        }));

        if (!isCancelled) {
          setInvoices(nextInvoices);
          setIsLoading(false);
        }
      } catch {
        if (!isCancelled) {
          setLoadError(tCommon('klaida'));
          setIsLoading(false);
        }
      }
    };

    void loadInvoices();

    return () => {
      isCancelled = true;
    };
  }, [currentLocale, router, t, tCommon]);

  const handleLogout = async () => {
    try {
      localStorage.removeItem('user');
      localStorage.removeItem('yakiwood_auth');
    } catch {
    }

    const supabaseClient = supabase;
    if (supabaseClient) {
      try {
        await supabaseClient.auth.signOut();
      } catch {
      }
    }

    router.push(toLocalePath('/login', currentLocale));
  };

  const handleDownload = (invoiceId: string, invoiceLocale: InvoiceLocale) => {
    window.open(
      `/api/account/invoices/${invoiceId}/pdf?lang=${invoiceLocale}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  const renderInvoiceActions = (invoice: InvoiceView, align: 'start' | 'end') => {
    const alignClass = align === 'end' ? 'items-end text-right' : 'items-start text-left';

    return (
      <div className={`flex flex-col gap-3 ${alignClass}`}>
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-['Outfit'] text-[12px] uppercase tracking-[0.6px] text-[#535353]">
            {t('invoiceActions.download')}
          </span>
          {invoiceLocales.map((invoiceLocale) => (
            <button
              key={`${invoice.id}:${invoiceLocale}:download`}
              type="button"
              onClick={() => handleDownload(invoice.id, invoiceLocale)}
              className="min-w-[42px] cursor-pointer rounded-[100px] border border-[#BBBBBB] px-3 py-1 text-center font-['Outfit'] text-[11px] uppercase tracking-[0.6px] text-[#161616] transition-colors hover:border-[#161616]"
            >
              {t(`invoiceActions.languages.${invoiceLocale}`)}
            </button>
          ))}
        </div>
      </div>
    );
  };



  if (isLoading) return null;

  return (
    <AccountLayout active="invoices" onLogout={handleLogout}>
      {loadError ? (
        <div className="font-['Outfit'] text-[12px] uppercase tracking-[0.6px] text-[#F63333]">
          {loadError}
        </div>
      ) : null}

      {invoices.length === 0 ? (
        <div className="font-['Outfit'] text-[12px] uppercase tracking-[0.6px] text-[#535353]">
          {t('invoicesEmpty')}
        </div>
      ) : null}

      {invoices.length > 0 ? (
        <div className="hidden md:block">
          <div className="grid grid-cols-[1.2fr_1fr_1fr_1fr_1.4fr] gap-4 border-b border-[#BBBBBB] pb-4">
            <div className="font-['Outfit'] text-[12px] font-normal uppercase tracking-[0.6px] text-[#535353]">
              {t('invoicesTable.invoice')}
            </div>
            <div className="font-['Outfit'] text-[12px] font-normal uppercase tracking-[0.6px] text-[#535353]">
              {t('invoicesTable.date')}
            </div>
            <div className="font-['Outfit'] text-[12px] font-normal uppercase tracking-[0.6px] text-[#535353]">
              {t('invoicesTable.status')}
            </div>
            <div className="text-right font-['Outfit'] text-[12px] font-normal uppercase tracking-[0.6px] text-[#535353]">
              {t('invoicesTable.totalCost')}
            </div>
            <div className="text-right font-['Outfit'] text-[12px] font-normal uppercase tracking-[0.6px] text-[#535353]">
              {t('invoicesTable.actions')}
            </div>
          </div>

          <div className="divide-y divide-[#BBBBBB]">
            {invoices.map((invoice) => (
              <div key={invoice.id} className="grid grid-cols-[1.2fr_1fr_1fr_1fr_1.4fr] items-center gap-4 py-4">
                <div className="font-['DM_Sans'] text-[16px] font-normal text-[#161616]">
                  {invoice.invoiceNumber}
                </div>
                <div className="font-['DM_Sans'] text-[16px] font-normal text-[#161616]">
                  {invoice.issueDate}
                </div>
                <div className="font-['DM_Sans'] text-[16px] font-normal text-[#161616]">
                  {invoice.status}
                </div>
                <div className="text-right font-['DM_Sans'] text-[16px] font-normal text-[#161616]">
                  {formatMoneyEUR(invoice.total)}
                </div>
                <div className="flex justify-end">
                  {renderInvoiceActions(invoice, 'end')}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {invoices.length > 0 ? (
        <div className="md:hidden">
          <div className="space-y-4">
            {invoices.map((invoice) => (
              <div key={invoice.id} className="rounded-[16px] bg-[#EAEAEA] p-4">
                <div className="font-['DM_Sans'] text-[16px] font-normal text-[#161616]">
                  {invoice.invoiceNumber}
                </div>
                <div className="mt-1 font-['DM_Sans'] text-[14px] font-light text-[#535353]">
                  {invoice.issueDate} · {invoice.status}
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <div className="font-['Outfit'] text-[12px] font-normal uppercase tracking-[0.6px] text-[#535353]">
                    {t('invoicesTable.totalCost')}
                  </div>
                  <div className="font-['DM_Sans'] text-[16px] font-normal text-[#161616]">
                    {formatMoneyEUR(invoice.total)}
                  </div>
                </div>
                <div className="mt-4">
                  {renderInvoiceActions(invoice, 'start')}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </AccountLayout>
  );
}
