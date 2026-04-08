import { NextRequest, NextResponse } from 'next/server'
import {
  adminPermissionsToSections,
  adminSectionsToPermissions,
  normalizeAdminPermissions,
  normalizeAdminSections,
  type AdminPermissionMap,
} from '@/lib/admin/permissions'
import { requireAdmin } from '@/lib/supabase/admin'

function jsonError(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status })
}

function normalizeStoredAdminSections(role: string, value: unknown) {
  return role === 'manager' ? normalizeAdminSections(value) : []
}

function normalizeStoredAdminPermissions(role: string, value: unknown, sections: unknown): AdminPermissionMap {
  if (role !== 'manager') return {}

  const normalized = normalizeAdminPermissions(value)
  if (Object.keys(normalized).length > 0) return normalized
  return adminSectionsToPermissions(normalizeAdminSections(sections))
}

function isMissingColumnError(message: string | undefined) {
  return /does not exist|column/i.test(message || '')
}

async function upsertUserProfileWithPermissionFallback(
  supabase: Awaited<ReturnType<typeof requireAdmin>>['supabase'],
  payload: {
    id: string
    email: string
    role: string
    full_name: string | null
    admin_sections: string[]
    admin_permissions: AdminPermissionMap
  }
) {
  const attempts = [
    payload,
    {
      id: payload.id,
      email: payload.email,
      role: payload.role,
      full_name: payload.full_name,
      admin_sections: payload.admin_sections,
    },
    {
      id: payload.id,
      email: payload.email,
      role: payload.role,
      full_name: payload.full_name,
    },
  ]

  for (const candidate of attempts) {
    const { error } = await supabase.from('user_profiles').upsert(candidate, { onConflict: 'id' })
    if (!error) return
    if (!isMissingColumnError(error.message)) {
      throw new Error(error.message || 'Failed to create user profile')
    }
  }
}

export async function POST(request: NextRequest) {
  try {
    const { supabase } = await requireAdmin(request, 'users')

    const body = (await request.json()) as {
      email?: string
      password?: string
      fullName?: string
      role?: string
      adminSections?: unknown
      adminPermissions?: unknown
    }

    const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : ''
    const password = typeof body.password === 'string' ? body.password : ''
    const fullName = typeof body.fullName === 'string' ? body.fullName.trim() : ''
    const role = typeof body.role === 'string' ? body.role.trim() : 'user'
    const adminSections = normalizeStoredAdminSections(role, body.adminSections)
    const adminPermissions = normalizeStoredAdminPermissions(role, body.adminPermissions, adminSections)

    if (!email) return jsonError('Missing email', 400)
    if (!password || password.length < 6) return jsonError('Password must be at least 6 characters', 400)

    const { data: created, error: createError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        full_name: fullName || undefined,
        role,
        admin_sections: adminPermissionsToSections(adminPermissions),
        admin_permissions: adminPermissions,
      },
    })

    if (createError || !created?.user) {
      return jsonError(createError?.message || 'Failed to create user', 500)
    }

    const userId = created.user.id

    try {
      await upsertUserProfileWithPermissionFallback(supabase, {
        id: userId,
        email,
        full_name: fullName || null,
        role,
        admin_sections: adminPermissionsToSections(adminPermissions),
        admin_permissions: adminPermissions,
      })
    } catch (error) {
      return jsonError(error instanceof Error ? error.message : 'Failed to create user profile', 500)
    }

    return NextResponse.json({
      user: {
        id: userId,
        email,
        fullName: fullName || null,
        role,
        adminSections: adminPermissionsToSections(adminPermissions),
        adminPermissions,
      },
    })
  } catch (e: any) {
    const status = typeof e?.status === 'number' ? e.status : 500
    return jsonError(e?.message || 'Admin auth failed', status)
  }
}
