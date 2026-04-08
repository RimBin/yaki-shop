const BACKUP_SCHEDULER_POLL_MS = 60 * 1000
const RESTORE_CONFIRMATION_PHRASE = 'ATSTATYTI'

type BackupSchedulerState = {
  started: boolean
  timer: NodeJS.Timeout | null
  lastCheckAt: string | null
  lastError: string | null
}

declare global {
  var __yakiwoodBackupScheduler: BackupSchedulerState | undefined
}

function getSchedulerState(): BackupSchedulerState {
  if (!globalThis.__yakiwoodBackupScheduler) {
    globalThis.__yakiwoodBackupScheduler = {
      started: false,
      timer: null,
      lastCheckAt: null,
      lastError: null,
    }
  }

  return globalThis.__yakiwoodBackupScheduler
}

async function runScheduledBackupCheck() {
  const state = getSchedulerState()

  try {
    const { maybeRunScheduledBackup } = await import('@/lib/admin/backups')
    await maybeRunScheduledBackup()
    state.lastCheckAt = new Date().toISOString()
    state.lastError = null
  } catch (error) {
    state.lastCheckAt = new Date().toISOString()
    state.lastError = error instanceof Error ? error.message : 'Unknown scheduler error'
  }
}

export function registerBackupScheduler() {
  if (process.env.NEXT_RUNTIME && process.env.NEXT_RUNTIME !== 'nodejs') {
    return
  }

  const state = getSchedulerState()
  if (state.started) {
    return
  }

  state.started = true
  state.timer = setInterval(() => {
    void runScheduledBackupCheck()
  }, BACKUP_SCHEDULER_POLL_MS)
  state.timer.unref?.()

  void runScheduledBackupCheck()
}

export function getRestoreConfirmationPhrase() {
  return RESTORE_CONFIRMATION_PHRASE
}

export function isRestoreConfirmationValid(value: string | null | undefined) {
  return String(value || '').trim().toUpperCase() === RESTORE_CONFIRMATION_PHRASE
}

export function getBackupSchedulerStatus() {
  const state = getSchedulerState()

  return {
    started: state.started,
    pollMs: BACKUP_SCHEDULER_POLL_MS,
    lastCheckAt: state.lastCheckAt,
    lastError: state.lastError,
  }
}