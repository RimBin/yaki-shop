import type { SupabaseClient, User } from '@supabase/supabase-js'

export const ADMIN_SECTION_KEYS = [
  'dashboard',
  'products',
  'projects',
  'posts',
  'orders',
  'inventory',
  'options',
  'backups',
  'users',
  'chatbot',
  'seo',
  'email-templates',
] as const

export const ASSIGNABLE_ADMIN_SECTION_KEYS = [
  'products',
  'projects',
  'posts',
  'seo',
  'inventory',
  'email-templates',
] as const satisfies ReadonlyArray<Exclude<AdminSectionKey, 'dashboard' | 'orders' | 'options' | 'backups' | 'users' | 'chatbot'>>

export type AdminSectionKey = (typeof ADMIN_SECTION_KEYS)[number]
export type AdminPermissionLevel = 'none' | 'view' | 'manage'
export type AdminPermissionAction = 'view' | 'manage'
export type AdminPermissionMap = Partial<Record<AdminSectionKey, AdminPermissionLevel>>

export type AdminCandidate = Pick<User, 'id' | 'email' | 'user_metadata'> | null

export interface AdminAccessProfile {
  role: string
  adminSections: AdminSectionKey[]
  adminPermissions: AdminPermissionMap
  isFallbackAdmin: boolean
  isPrivileged: boolean
}

export function isAdminSectionKey(value: unknown): value is AdminSectionKey {
  return typeof value === 'string' && ADMIN_SECTION_KEYS.includes(value as AdminSectionKey)
}

export function normalizeAdminSections(value: unknown): AdminSectionKey[] {
  if (!Array.isArray(value)) return []

  return Array.from(new Set(value.filter(isAdminSectionKey)))
}

export function isAdminPermissionLevel(value: unknown): value is AdminPermissionLevel {
  return value === 'none' || value === 'view' || value === 'manage'
}

export function normalizeAdminPermissions(value: unknown): AdminPermissionMap {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {}

  const entries = Object.entries(value as Record<string, unknown>)
    .filter(([section, level]) => isAdminSectionKey(section) && isAdminPermissionLevel(level) && level !== 'none')
    .map(([section, level]) => [section as AdminSectionKey, level as AdminPermissionLevel])

  return Object.fromEntries(entries)
}

export function adminPermissionsToSections(permissions: AdminPermissionMap): AdminSectionKey[] {
  return Object.entries(permissions)
    .filter(([, level]) => level === 'view' || level === 'manage')
    .map(([section]) => section as AdminSectionKey)
}

export function adminSectionsToPermissions(sections: AdminSectionKey[]): AdminPermissionMap {
  return Object.fromEntries(sections.map((section) => [section, 'manage' satisfies AdminPermissionLevel]))
}

export function isPrivilegedRole(role: string | null | undefined): boolean {
  return role === 'admin' || role === 'manager'
}

export function isFullAdminRole(role: string | null | undefined): boolean {
  return role === 'admin'
}

function getPermissionLevel(access: AdminAccessProfile, section: AdminSectionKey): AdminPermissionLevel {
  const explicitLevel = access.adminPermissions[section]
  if (explicitLevel) return explicitLevel
  if (access.adminSections.includes(section)) return 'manage'
  return 'none'
}

function getAdminEmails(): string[] {
  return (process.env.ADMIN_EMAILS || '')
    .split(',')
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean)
}

function isFallbackAdminUser(user: AdminCandidate): boolean {
  if (!user) return false
  if (user.user_metadata?.role === 'admin') return true
  return getAdminEmails().includes(user.email?.toLowerCase() || '')
}

export function canAccessAdminSection(
  access: AdminAccessProfile | null | undefined,
  section?: AdminSectionKey | null,
  action: AdminPermissionAction = 'view'
): boolean {
  if (!access?.isPrivileged) return false
  if (!section || section === 'dashboard') return true
  if (access.isFallbackAdmin || isFullAdminRole(access.role)) return true

  const level = getPermissionLevel(access, section)
  if (action === 'view') return level === 'view' || level === 'manage'
  return level === 'manage'
}

export function getDefaultAdminLandingSection(access: AdminAccessProfile): AdminSectionKey {
  const preferredSections: AdminSectionKey[] = [
    'dashboard',
    'products',
    'projects',
    'posts',
    'seo',
    'inventory',
    'email-templates',
    'orders',
    'options',
    'backups',
    'users',
    'chatbot',
  ]

  return preferredSections.find((section) => canAccessAdminSection(access, section)) ?? 'dashboard'
}

export function adminSectionToPath(section: AdminSectionKey): string {
  switch (section) {
    case 'products':
      return '/admin/products'
    case 'projects':
      return '/admin/projects'
    case 'posts':
      return '/admin/posts'
    case 'orders':
      return '/admin/orders'
    case 'inventory':
      return '/admin/inventory'
    case 'options':
      return '/admin/options'
    case 'backups':
      return '/admin/backups'
    case 'users':
      return '/admin/users'
    case 'chatbot':
      return '/admin/chatbot'
    case 'seo':
      return '/admin/seo'
    case 'email-templates':
      return '/admin/email-templates'
    case 'dashboard':
    default:
      return '/admin/dashboard'
  }
}

export function adminSectionFromPath(pathname: string): AdminSectionKey {
  const normalizedPath = pathname.split('?')[0].split('#')[0]

  if (normalizedPath.startsWith('/admin/products')) return 'products'
  if (normalizedPath.startsWith('/admin/projects')) return 'projects'
  if (normalizedPath.startsWith('/admin/posts')) return 'posts'
  if (normalizedPath.startsWith('/admin/orders')) return 'orders'
  if (normalizedPath.startsWith('/admin/inventory')) return 'inventory'
  if (normalizedPath.startsWith('/admin/options')) return 'options'
  if (normalizedPath.startsWith('/admin/backups')) return 'backups'
  if (normalizedPath.startsWith('/admin/users')) return 'users'
  if (normalizedPath.startsWith('/admin/chatbot')) return 'chatbot'
  if (normalizedPath.startsWith('/admin/seo')) return 'seo'
  if (normalizedPath.startsWith('/admin/email-templates')) return 'email-templates'
  return 'dashboard'
}

export async function getAdminAccessProfile(
  supabase: Pick<SupabaseClient, 'from'>,
  user: AdminCandidate
): Promise<AdminAccessProfile> {
  if (isFallbackAdminUser(user)) {
    return {
      role: 'admin',
      adminSections: [...ADMIN_SECTION_KEYS],
      adminPermissions: adminSectionsToPermissions([...ADMIN_SECTION_KEYS]),
      isFallbackAdmin: true,
      isPrivileged: true,
    }
  }

  const metaRole = typeof user?.user_metadata?.role === 'string' ? user.user_metadata.role : null
  const metaSections = normalizeAdminSections(user?.user_metadata?.admin_sections)
  const metaPermissions = normalizeAdminPermissions(user?.user_metadata?.admin_permissions)

  if (!user?.id) {
    return {
      role: metaRole ?? 'user',
      adminSections: metaSections.length > 0 ? metaSections : adminPermissionsToSections(metaPermissions),
      adminPermissions: Object.keys(metaPermissions).length > 0 ? metaPermissions : adminSectionsToPermissions(metaSections),
      isFallbackAdmin: false,
      isPrivileged: isPrivilegedRole(metaRole),
    }
  }

  const userId = user.id

  async function selectProfile(selectClause: string) {
    return supabase.from('user_profiles').select(selectClause).eq('id', userId).maybeSingle()
  }

  let profileData: { role?: unknown; admin_sections?: unknown; admin_permissions?: unknown } | null = null
  let error: { message?: string } | null = null

  const attempts = ['role, admin_sections, admin_permissions', 'role, admin_sections', 'role']

  for (const selectClause of attempts) {
    const result = await selectProfile(selectClause)
    if (!result.error) {
      profileData = result.data
        ? (result.data as { role?: unknown; admin_sections?: unknown; admin_permissions?: unknown })
        : null
      error = null
      break
    }

    error = result.error ? { message: result.error.message } : null
    if (!/does not exist|column/i.test(result.error.message || '')) {
      break
    }
  }

  if (error || !profileData) {
    return {
      role: metaRole ?? 'user',
      adminSections: metaSections.length > 0 ? metaSections : adminPermissionsToSections(metaPermissions),
      adminPermissions: Object.keys(metaPermissions).length > 0 ? metaPermissions : adminSectionsToPermissions(metaSections),
      isFallbackAdmin: false,
      isPrivileged: isPrivilegedRole(metaRole),
    }
  }

  const resolvedRole = typeof profileData.role === 'string' ? profileData.role : metaRole ?? 'user'
  const resolvedSections = normalizeAdminSections(profileData.admin_sections)
  const resolvedPermissions = normalizeAdminPermissions(profileData.admin_permissions)
  const finalPermissions =
    Object.keys(resolvedPermissions).length > 0
      ? resolvedPermissions
      : Object.keys(metaPermissions).length > 0
        ? metaPermissions
        : adminSectionsToPermissions(resolvedSections.length > 0 ? resolvedSections : metaSections)
  const finalSections =
    resolvedSections.length > 0
      ? resolvedSections
      : metaSections.length > 0
        ? metaSections
        : adminPermissionsToSections(finalPermissions)

  return {
    role: resolvedRole,
    adminSections: finalSections,
    adminPermissions: finalPermissions,
    isFallbackAdmin: false,
    isPrivileged: isPrivilegedRole(resolvedRole),
  }
}