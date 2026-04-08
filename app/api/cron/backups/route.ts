import { NextRequest, NextResponse } from 'next/server'

import { maybeRunScheduledBackup, readBackupConfig } from '@/lib/admin/backups'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

function unauthorized() {
  return NextResponse.json({ error: 'Unauthorized cron request' }, { status: 401 })
}

export async function GET(request: NextRequest) {
  const secret = process.env.BACKUP_CRON_SECRET || process.env.CRON_SECRET || ''
  if (!secret) {
    return NextResponse.json({ error: 'BACKUP_CRON_SECRET is not configured' }, { status: 503 })
  }

  const headerSecret = request.headers.get('x-backup-cron-secret') || ''
  const querySecret = request.nextUrl.searchParams.get('secret') || ''

  if (headerSecret !== secret && querySecret !== secret) {
    return unauthorized()
  }

  const result = await maybeRunScheduledBackup()
  const config = await readBackupConfig()

  return NextResponse.json({
    ok: true,
    ran: Boolean(result),
    backup: result?.backup ?? null,
    config,
  })
}