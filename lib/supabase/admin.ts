import { createClient, type SupabaseClient, type User } from '@supabase/supabase-js'
import type { NextRequest } from 'next/server'

import { getResolvedAdminAccess } from '@/lib/admin/is-admin-user'
import {
  canAccessAdminSection,
  type AdminAccessProfile,
  type AdminPermissionAction,
  type AdminSectionKey,
} from '@/lib/admin/permissions'

export interface AdminContext {
  supabase: SupabaseClient
  user: User
  access: AdminAccessProfile
}

export class AdminAuthError extends Error {
  status: number

  constructor(message = 'Unauthorized', status = 401) {
    super(message)
    this.status = status
  }
}

function ensureServiceRoleClient(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !key) {
    throw new Error('Supabase service role credentials are not configured')
  }

  return createClient(url, key, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}

function extractBearerToken(request: NextRequest): string | null {
  const header = request.headers.get('authorization')
  if (!header) return null

  const [, token] = header.split(' ')
  return token || null
}

/**
 * Validates Supabase auth token and ensures the user is an admin.
 * Accepts Authorization: Bearer <access_token>.
 */
export async function requireAdmin(
  request: NextRequest,
  requiredSection?: AdminSectionKey,
  requiredAction?: AdminPermissionAction
): Promise<AdminContext> {
  const token = extractBearerToken(request)
  if (!token) {
    throw new AdminAuthError('Missing admin token', 401)
  }

  const supabase = ensureServiceRoleClient()
  const { data, error } = await supabase.auth.getUser(token)

  if (error || !data.user) {
    throw new AdminAuthError('Invalid or expired session', 401)
  }

  const access = await getResolvedAdminAccess(supabase, data.user)
  if (!access.isPrivileged) {
    throw new AdminAuthError('User is not allowed to access admin APIs', 403)
  }

  const resolvedAction = requiredAction ?? (request.method === 'GET' || request.method === 'HEAD' ? 'view' : 'manage')

  if (requiredSection && !canAccessAdminSection(access, requiredSection, resolvedAction)) {
    throw new AdminAuthError('User is not allowed to access this admin section', 403)
  }

  return { supabase, user: data.user, access }
}
