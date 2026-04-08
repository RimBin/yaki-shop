import type { SupabaseClient, User } from '@supabase/supabase-js'

import {
  canAccessAdminSection,
  getAdminAccessProfile,
  isPrivilegedRole,
  type AdminAccessProfile,
  type AdminCandidate,
  type AdminSectionKey,
} from '@/lib/admin/permissions'

export function isAdminUser(user: AdminCandidate): boolean {
  if (!user) return false
  if (user.user_metadata?.role === 'admin') return true

  const adminEmails = (process.env.ADMIN_EMAILS || '')
    .split(',')
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean)

  return adminEmails.includes(user.email?.toLowerCase() || '')
}

export async function getResolvedAdminAccess(
  supabase: Pick<SupabaseClient, 'from'>,
  user: AdminCandidate
): Promise<AdminAccessProfile> {
  return getAdminAccessProfile(supabase, user)
}

export async function hasAdminAccess(supabase: Pick<SupabaseClient, 'from'>, user: AdminCandidate): Promise<boolean> {
  const access = await getResolvedAdminAccess(supabase, user)
  return access.isPrivileged || isPrivilegedRole(access.role)
}

export async function hasAdminSectionAccess(
  supabase: Pick<SupabaseClient, 'from'>,
  user: Pick<User, 'id' | 'email' | 'user_metadata'> | null,
  section: AdminSectionKey
): Promise<boolean> {
  const access = await getResolvedAdminAccess(supabase, user)
  return canAccessAdminSection(access, section)
}