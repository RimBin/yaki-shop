import { redirect } from 'next/navigation'

import { toLocalePath } from '@/i18n/paths'
import { adminSectionToPath, getDefaultAdminLandingSection } from '@/lib/admin/permissions'
import { requireAdminPage } from '@/lib/admin/require-admin-page'

type SearchParams = Promise<Record<string, string | string[] | undefined>>

function readTabParam(value: string | string[] | undefined): string | null {
  if (Array.isArray(value)) return value[0] ?? null
  return typeof value === 'string' ? value : null
}

export default async function AdminPage({ searchParams }: { searchParams: SearchParams }) {
  const resolvedSearchParams = await searchParams
  const requestedTab = readTabParam(resolvedSearchParams.tab)
  const requestedPath =
    requestedTab === 'projects'
      ? '/admin/projects'
      : requestedTab === 'posts'
        ? '/admin/posts'
        : requestedTab === 'products'
          ? '/admin/products'
          : requestedTab === 'seo'
            ? '/admin/seo'
            : requestedTab === 'email-templates'
              ? '/admin/email-templates'
              : '/admin/dashboard'

  const { access, locale } = await requireAdminPage(requestedPath)
  const landingPath = adminSectionToPath(getDefaultAdminLandingSection(access))

  redirect(toLocalePath(landingPath, locale))
}

