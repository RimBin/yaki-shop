export async function register() {
  if (process.env.NEXT_RUNTIME && process.env.NEXT_RUNTIME !== 'nodejs') {
    return
  }

  const { registerBackupScheduler } = await import('@/lib/admin/backup-scheduler')
  registerBackupScheduler()
}