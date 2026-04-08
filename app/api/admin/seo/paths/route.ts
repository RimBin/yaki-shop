import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/supabase/admin'
import { getIndexablePaths } from '@/lib/seo/runtime-scanner'

function jsonError(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status })
}

export const runtime = 'nodejs'

function resolveOrigin(request: NextRequest): string {
  const override = request.nextUrl.searchParams.get('origin')

  if (override) {
    try {
      return new URL(override).origin
    } catch {
      // ignore invalid override and fall back
    }
  }

  return process.env.NEXT_PUBLIC_SITE_URL || 'https://shop.yakiwood.co.uk'
}

export async function GET(request: NextRequest) {
  try {
    await requireAdmin(request, 'seo')

    const origin = resolveOrigin(request)
    const paths = await getIndexablePaths({ origin })

    return NextResponse.json({ paths, origin, generatedAt: new Date().toISOString() })
  } catch (e: any) {
    const status = typeof e?.status === 'number' ? e.status : 500
    return jsonError(e?.message || 'Admin auth failed', status)
  }
}
