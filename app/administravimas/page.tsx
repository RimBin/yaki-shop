import { redirect } from 'next/navigation'

import { toLocalePath } from '@/i18n/paths'

export default function AdministravimasPage() {
  redirect(toLocalePath('/administravimas', 'en'))
}
