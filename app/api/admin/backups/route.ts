import { NextRequest, NextResponse } from 'next/server'

import { getBackupSchedulerStatus, isRestoreConfirmationValid } from '@/lib/admin/backup-scheduler'
import { AdminAuthError, requireAdmin } from '@/lib/supabase/admin'
import {
  BACKUP_INTERVALS,
  createBackup,
  getBackupSnapshot,
  listBackups,
  maybeRunScheduledBackup,
  readBackupConfig,
  restoreBackup,
  updateBackupConfig,
} from '@/lib/admin/backups'
import { supabaseAdmin } from '@/lib/supabase-admin'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

function jsonError(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status })
}

function getErrorMessage(error: unknown, fallback: string) {
  if (error instanceof Error && error.message) return error.message
  return fallback
}

export async function GET(request: NextRequest) {
  try {
    await requireAdmin(request, 'backups')

    const shouldRunScheduled = request.nextUrl.searchParams.get('scheduled') !== '0'
    const backupId = request.nextUrl.searchParams.get('backupId')

    const scheduledResult = shouldRunScheduled ? await maybeRunScheduledBackup() : null
    const [config, backups] = await Promise.all([readBackupConfig(), listBackups()])

    if (backupId) {
      const backup = await getBackupSnapshot(backupId)
      return NextResponse.json({
        backups,
        config,
        databaseConfigured: Boolean(supabaseAdmin),
        scheduler: getBackupSchedulerStatus(),
        scheduledBackup: scheduledResult?.backup ?? null,
        selectedBackup: backup,
      })
    }

    return NextResponse.json({
      backups,
      config,
      databaseConfigured: Boolean(supabaseAdmin),
      scheduler: getBackupSchedulerStatus(),
      scheduledBackup: scheduledResult?.backup ?? null,
    })
  } catch (error) {
    if (error instanceof AdminAuthError) {
      return jsonError(error.message, error.status)
    }

    return jsonError(getErrorMessage(error, 'Failed to load backups'), 500)
  }
}

export async function POST(request: NextRequest) {
  try {
    const { user } = await requireAdmin(request, 'backups')
    const body = (await request.json().catch(() => ({}))) as {
      name?: string
      action?: string
      backupId?: string
      confirmation?: string
    }

    if (body.action === 'restore') {
      const backupId = typeof body.backupId === 'string' ? body.backupId : ''
      if (!backupId) return jsonError('backupId is required', 400)
      if (!isRestoreConfirmationValid(body.confirmation)) {
        return jsonError('Restore confirmation is required', 400)
      }

      const result = await restoreBackup(backupId)
      return NextResponse.json({ ok: true, ...result })
    }

    const created = await createBackup({
      name: typeof body.name === 'string' ? body.name : '',
      trigger: 'manual',
      createdBy: user.email ?? user.id,
    })

    return NextResponse.json({ ok: true, ...created }, { status: 201 })
  } catch (error) {
    if (error instanceof AdminAuthError) {
      return jsonError(error.message, error.status)
    }

    return jsonError(getErrorMessage(error, 'Failed to create backup'), 500)
  }
}

export async function PUT(request: NextRequest) {
  try {
    await requireAdmin(request, 'backups')

    const body = (await request.json().catch(() => ({}))) as { interval?: string }
    const interval = typeof body.interval === 'string' ? body.interval : ''

    if (!BACKUP_INTERVALS.includes(interval as (typeof BACKUP_INTERVALS)[number])) {
      return jsonError('Invalid interval', 400)
    }

    const config = await updateBackupConfig(interval as (typeof BACKUP_INTERVALS)[number])
    return NextResponse.json({ ok: true, config })
  } catch (error) {
    if (error instanceof AdminAuthError) {
      return jsonError(error.message, error.status)
    }

    return jsonError(getErrorMessage(error, 'Failed to update backup interval'), 500)
  }
}