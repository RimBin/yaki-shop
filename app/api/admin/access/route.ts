import { NextRequest, NextResponse } from 'next/server'

import { isAdminSectionKey } from '@/lib/admin/permissions'
import { AdminAuthError, requireAdmin } from '@/lib/supabase/admin'

export async function GET(request: NextRequest) {
  try {
    const sectionParam = request.nextUrl.searchParams.get('section')
    const requiredSection = sectionParam && isAdminSectionKey(sectionParam) ? sectionParam : undefined
    const { access, user } = await requireAdmin(request, requiredSection)

    return NextResponse.json({
      access: {
        role: access.role,
        adminSections: access.adminSections,
        adminPermissions: access.adminPermissions,
        isFallbackAdmin: access.isFallbackAdmin,
        isPrivileged: access.isPrivileged,
      },
      user: {
        id: user.id,
        email: user.email ?? null,
      },
    })
  } catch (error) {
    if (error instanceof AdminAuthError) {
      return NextResponse.json({ error: error.message }, { status: error.status })
    }

    return NextResponse.json({ error: 'Unexpected server error' }, { status: 500 })
  }
}