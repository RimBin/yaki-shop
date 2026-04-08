import { redirect } from 'next/navigation'
import { getLocale } from 'next-intl/server'

import { toLocalePath, type AppLocale } from '@/i18n/paths'
import { getResolvedAdminAccess } from '@/lib/admin/is-admin-user'
import {
  adminSectionToPath,
  canAccessAdminSection,
  getDefaultAdminLandingSection,
  type AdminPermissionAction,
  type AdminSectionKey,
} from '@/lib/admin/permissions'
import { createClient } from '@/lib/supabase/server'

export async function requireAdminPage(
  redirectTarget = '/admin/dashboard',
  requiredSection?: AdminSectionKey,
  requiredAction: AdminPermissionAction = 'view'
) {
  const locale = (await getLocale()) as AppLocale
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    const redirectTo = toLocalePath(redirectTarget, locale)
    redirect(`${toLocalePath('/login', locale)}?redirect=${encodeURIComponent(redirectTo)}`)
  }

  const access = await getResolvedAdminAccess(supabase, user)

  if (!access.isPrivileged) {
    redirect(toLocalePath('/', locale))
  }

  if (requiredSection && !canAccessAdminSection(access, requiredSection, requiredAction)) {
    const landingSection = getDefaultAdminLandingSection(access)
    redirect(toLocalePath(adminSectionToPath(landingSection), locale))
  }

  return { locale, supabase, user, access }
}