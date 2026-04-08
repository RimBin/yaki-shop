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

async function loadProfilesWithPermissionFallback(supabase: Awaited<ReturnType<typeof requireAdmin>>['supabase'], ids: string[]) {
  if (ids.length === 0) return []

  const attempts = [
    'id,email,full_name,role,admin_sections,admin_permissions,created_at,updated_at',
    'id,email,full_name,role,admin_sections,created_at,updated_at',
    'id,email,full_name,role,created_at,updated_at',
  ]

  for (const selectClause of attempts) {
    const { data, error } = await supabase.from('user_profiles').select(selectClause).in('id', ids)
    if (!error) return data ?? []
    if (!isMissingColumnError(error.message)) {
      throw new Error(error.message || 'Failed to load user profiles')
    }
  }

  return []
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
      throw new Error(error.message || 'Failed to update role')
    }
  }
}

export async function GET(request: NextRequest) {
  try {
    const { supabase } = await requireAdmin(request, 'users')

    const { data: usersData, error: usersError } = await supabase.auth.admin.listUsers({ perPage: 1000 })
    if (usersError) {
      return jsonError(usersError.message || 'Failed to list users', 500)
    }

    const users = usersData?.users ?? []
    const ids = users.map((u) => u.id)

    const profiles = await loadProfilesWithPermissionFallback(supabase, ids)

    const profileById = new Map((profiles ?? []).map((p: any) => [p.id, p]))

    const merged = users.map((u) => {
      const p = profileById.get(u.id)
      const role = p?.role ?? (typeof (u.user_metadata as Record<string, unknown> | undefined)?.role === 'string'
        ? (u.user_metadata as Record<string, unknown>).role as string
        : 'user')
      const adminPermissions = normalizeStoredAdminPermissions(
        role,
        p?.admin_permissions ?? (u.user_metadata as Record<string, unknown> | undefined)?.admin_permissions,
        p?.admin_sections ?? (u.user_metadata as Record<string, unknown> | undefined)?.admin_sections
      )
      const adminSections = normalizeStoredAdminSections(
        role,
        p?.admin_sections ?? (u.user_metadata as Record<string, unknown> | undefined)?.admin_sections
      )

      return {
        id: u.id,
        email: u.email ?? p?.email ?? null,
        fullName: p?.full_name ?? (u.user_metadata as any)?.full_name ?? null,
        role,
        adminSections: adminSections.length > 0 ? adminSections : adminPermissionsToSections(adminPermissions),
        adminPermissions,
        createdAt: p?.created_at ?? u.created_at,
        lastSignInAt: u.last_sign_in_at ?? null,
      }
    })

    merged.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))

    return NextResponse.json({ users: merged })
  } catch (e: any) {
    const status = typeof e?.status === 'number' ? e.status : 500
    return jsonError(e?.message || 'Admin auth failed', status)
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { supabase } = await requireAdmin(request, 'users')

    const body = (await request.json()) as {
      userId?: string
      role?: string
      adminSections?: unknown
      adminPermissions?: unknown
    }
    const userId = typeof body.userId === 'string' ? body.userId.trim() : ''
    const role = typeof body.role === 'string' ? body.role.trim() : ''
    const adminSections = normalizeStoredAdminSections(role, body.adminSections)
    const adminPermissions = normalizeStoredAdminPermissions(role, body.adminPermissions, adminSections)

    if (!userId) return jsonError('Missing userId', 400)
    if (!role) return jsonError('Missing role', 400)

    const { data: authUser, error: getUserError } = await supabase.auth.admin.getUserById(userId)
    if (getUserError || !authUser?.user) {
      return jsonError(getUserError?.message || 'User not found', 404)
    }

    const email = authUser.user.email ?? ''

    const nextMetadata = {
      ...(authUser.user.user_metadata ?? {}),
      role,
      admin_sections: adminPermissionsToSections(adminPermissions),
      admin_permissions: adminPermissions,
    }

    const { error: updateMetadataError } = await supabase.auth.admin.updateUserById(userId, {
      user_metadata: nextMetadata,
    })

    if (updateMetadataError) {
      return jsonError(updateMetadataError.message || 'Failed to update user metadata', 500)
    }

    try {
      await upsertUserProfileWithPermissionFallback(supabase, {
        id: userId,
        email,
        role,
        admin_sections: adminPermissionsToSections(adminPermissions),
        admin_permissions: adminPermissions,
        full_name: (authUser.user.user_metadata as any)?.full_name ?? null,
      })
    } catch (error) {
      return jsonError(error instanceof Error ? error.message : 'Failed to update role', 500)
    }

    return NextResponse.json({
      ok: true,
      role,
      adminSections: adminPermissionsToSections(adminPermissions),
      adminPermissions,
    })
  } catch (e: any) {
    const status = typeof e?.status === 'number' ? e.status : 500
    return jsonError(e?.message || 'Admin auth failed', status)
  }
}
