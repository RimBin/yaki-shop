import { getLocale } from 'next-intl/server';
import { redirect } from 'next/navigation';
import { toLocalePath } from '@/i18n/paths';

export default async function CreateInvoicePage() {
  const locale = await getLocale();
  redirect(toLocalePath('/account', locale === 'lt' ? 'lt' : 'en'));
}
