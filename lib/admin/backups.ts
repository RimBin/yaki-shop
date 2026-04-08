import { supabaseAdmin } from '@/lib/supabase-admin'

export const BACKUP_INTERVALS = ['off', '6h', '12h', '24h', '7d'] as const

export type BackupInterval = (typeof BACKUP_INTERVALS)[number]
export type BackupTrigger = 'manual' | 'scheduled'

type BackupTableConfig = {
  name: string
  onConflict: string
  deleteKey: string
}

function isMissingTableError(message: string | null | undefined) {
  const normalized = String(message || '').toLowerCase()

  return (
    normalized.includes('could not find the table') ||
    normalized.includes('relation') && normalized.includes('does not exist')
  )
}

type BackupConfig = {
  interval: BackupInterval
  updatedAt: string
  lastRunAt: string | null
  lastBackupId: string | null
}

export type BackupSnapshot = {
  id: string
  name: string
  createdAt: string
  trigger: BackupTrigger
  createdBy: string | null
  counts: Record<string, number>
  tables: Record<string, unknown[]>
  warnings: string[]
}

export type BackupSummary = {
  id: string
  name: string
  createdAt: string
  trigger: BackupTrigger
  createdBy: string | null
  counts: Record<string, number>
  warnings: string[]
  fileName: string
}

type RuntimeFsModule = {
  mkdir: (path: string, options?: { recursive?: boolean }) => Promise<unknown>
  readFile: (path: string, encoding: string) => Promise<string>
  readdir: (path: string, options: { withFileTypes: true }) => Promise<Array<{ isFile: () => boolean; name: string }>>
  writeFile: (path: string, data: string, encoding: string) => Promise<unknown>
}

type RuntimePathModule = {
  join: (...parts: string[]) => string
}

let runtimeFsPromise: Promise<RuntimeFsModule> | null = null
let runtimePathPromise: Promise<RuntimePathModule> | null = null

function loadRuntimeModule<T>(specifier: string): Promise<T> {
  return Function('specifier', 'return import(specifier)')(specifier) as Promise<T>
}

async function getRuntimeFs() {
  runtimeFsPromise ??= loadRuntimeModule<RuntimeFsModule>('fs/promises')
  return runtimeFsPromise
}

async function getRuntimePath() {
  runtimePathPromise ??= loadRuntimeModule<{ default?: RuntimePathModule } & RuntimePathModule>('path').then((module) => module.default ?? module)
  return runtimePathPromise
}

async function getBackupDir() {
  const path = await getRuntimePath()
  return path.join(process.cwd(), 'tmp', 'admin-backups')
}

async function getConfigPath() {
  const path = await getRuntimePath()
  const backupDir = await getBackupDir()
  return path.join(backupDir, 'config.json')
}

const DEFAULT_CONFIG: BackupConfig = {
  interval: '24h',
  updatedAt: new Date(0).toISOString(),
  lastRunAt: null,
  lastBackupId: null,
}

const INTERVAL_TO_MS: Record<BackupInterval, number> = {
  off: 0,
  '6h': 6 * 60 * 60 * 1000,
  '12h': 12 * 60 * 60 * 1000,
  '24h': 24 * 60 * 60 * 1000,
  '7d': 7 * 24 * 60 * 60 * 1000,
}

const BACKUP_TABLES: BackupTableConfig[] = [
  { name: 'products', onConflict: 'id', deleteKey: 'id' },
  { name: 'catalog_options', onConflict: 'id', deleteKey: 'id' },
  { name: 'product_variants', onConflict: 'id', deleteKey: 'id' },
  { name: 'product_assets', onConflict: 'id', deleteKey: 'id' },
  { name: 'product_3d_models', onConflict: 'id', deleteKey: 'id' },
  { name: 'product_configuration_prices', onConflict: 'id', deleteKey: 'id' },
  { name: 'inventory_items', onConflict: 'id', deleteKey: 'id' },
  { name: 'email_templates', onConflict: 'template_id', deleteKey: 'template_id' },
  { name: 'chatbot_settings', onConflict: 'id', deleteKey: 'id' },
  { name: 'chatbot_faq_entries', onConflict: 'id', deleteKey: 'id' },
  { name: 'seo_overrides', onConflict: 'canonical_path,locale', deleteKey: 'id' },
  { name: 'role_discounts', onConflict: 'role', deleteKey: 'role' },
  { name: 'cms_posts', onConflict: 'id', deleteKey: 'id' },
  { name: 'cms_projects', onConflict: 'id', deleteKey: 'id' },
]

function ensureAdminDatabase() {
  if (!supabaseAdmin) {
    throw new Error('Supabase service role credentials are not configured')
  }

  return supabaseAdmin
}

function isBackupInterval(value: string): value is BackupInterval {
  return (BACKUP_INTERVALS as readonly string[]).includes(value)
}

function chunkRows<T>(items: T[], size = 200): T[][] {
  const chunks: T[][] = []

  for (let index = 0; index < items.length; index += size) {
    chunks.push(items.slice(index, index + size))
  }

  return chunks
}

function normalizeName(value: string | null | undefined) {
  const cleaned = String(value || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60)

  return cleaned || 'backup'
}

function timestampForFile(date = new Date()) {
  return date.toISOString().replace(/[:.]/g, '-').replace(/Z$/, 'Z')
}

async function backupFilePath(id: string) {
  const path = await getRuntimePath()
  const backupDir = await getBackupDir()
  return path.join(backupDir, `${id}.json`)
}

async function ensureBackupDir() {
  const fs = await getRuntimeFs()
  const backupDir = await getBackupDir()
  await fs.mkdir(backupDir, { recursive: true })
}

async function readJsonFile<T>(filePath: string): Promise<T | null> {
  try {
    const fs = await getRuntimeFs()
    const content = await fs.readFile(filePath, 'utf8')
    return JSON.parse(content) as T
  } catch (error) {
    const code = (error as NodeJS.ErrnoException).code
    if (code === 'ENOENT') return null
    throw error
  }
}

async function writeJsonFile(filePath: string, value: unknown) {
  const fs = await getRuntimeFs()
  await fs.writeFile(filePath, JSON.stringify(value, null, 2), 'utf8')
}

export async function readBackupConfig(): Promise<BackupConfig> {
  await ensureBackupDir()

  const configPath = await getConfigPath()
  const stored = await readJsonFile<Partial<BackupConfig>>(configPath)
  const interval = isBackupInterval(String(stored?.interval || ''))
    ? (stored?.interval as BackupInterval)
    : DEFAULT_CONFIG.interval

  return {
    interval,
    updatedAt: typeof stored?.updatedAt === 'string' ? stored.updatedAt : DEFAULT_CONFIG.updatedAt,
    lastRunAt: typeof stored?.lastRunAt === 'string' ? stored.lastRunAt : null,
    lastBackupId: typeof stored?.lastBackupId === 'string' ? stored.lastBackupId : null,
  }
}

export async function updateBackupConfig(interval: BackupInterval) {
  await ensureBackupDir()

  const current = await readBackupConfig()
  const configPath = await getConfigPath()
  const nextConfig: BackupConfig = {
    ...current,
    interval,
    updatedAt: new Date().toISOString(),
  }

  await writeJsonFile(configPath, nextConfig)
  return nextConfig
}

function mapSnapshotToSummary(snapshot: BackupSnapshot): BackupSummary {
  return {
    id: snapshot.id,
    name: snapshot.name,
    createdAt: snapshot.createdAt,
    trigger: snapshot.trigger,
    createdBy: snapshot.createdBy,
    counts: snapshot.counts,
    warnings: snapshot.warnings,
    fileName: `${snapshot.id}.json`,
  }
}

export async function listBackups() {
  await ensureBackupDir()

  const fs = await getRuntimeFs()
  const path = await getRuntimePath()
  const backupDir = await getBackupDir()
  const entries = await fs.readdir(backupDir, { withFileTypes: true })
  const snapshots = await Promise.all(
    entries
      .filter((entry) => entry.isFile() && entry.name.endsWith('.json') && entry.name !== 'config.json')
      .map(async (entry) => {
        const snapshot = await readJsonFile<BackupSnapshot>(path.join(backupDir, entry.name))
        return snapshot ? mapSnapshotToSummary(snapshot) : null
      })
  )

  return snapshots
    .filter((value): value is BackupSummary => Boolean(value))
    .sort((left, right) => right.createdAt.localeCompare(left.createdAt))
}

export async function getBackupSnapshot(backupId: string) {
  const backups = await listBackups()
  const resolvedId = backupId === 'latest' ? backups[0]?.id : backupId

  if (!resolvedId) {
    throw new Error('No backup found')
  }

  const snapshot = await readJsonFile<BackupSnapshot>(await backupFilePath(resolvedId))
  if (!snapshot) {
    throw new Error('Backup file was not found')
  }

  return snapshot
}

async function updateLastRun(snapshot: BackupSnapshot) {
  const current = await readBackupConfig()
  const configPath = await getConfigPath()
  const nextConfig: BackupConfig = {
    ...current,
    updatedAt: new Date().toISOString(),
    lastRunAt: snapshot.createdAt,
    lastBackupId: snapshot.id,
  }

  await writeJsonFile(configPath, nextConfig)
  return nextConfig
}

export async function createBackup(options?: { name?: string; trigger?: BackupTrigger; createdBy?: string | null }) {
  const supabase = ensureAdminDatabase()
  await ensureBackupDir()

  const createdAt = new Date().toISOString()
  const trigger = options?.trigger || 'manual'
  const safeName = normalizeName(options?.name || trigger)
  const id = `${timestampForFile(new Date(createdAt))}__${safeName}`
  const warnings: string[] = []
  const counts: Record<string, number> = {}
  const tables: Record<string, unknown[]> = {}

  for (const table of BACKUP_TABLES) {
    const { data, error } = await supabase.from(table.name).select('*')

    if (error) {
      warnings.push(`${table.name}: ${error.message}`)
      tables[table.name] = []
      counts[table.name] = 0
      continue
    }

    const rows = (data || []) as unknown[]
    tables[table.name] = rows
    counts[table.name] = rows.length
  }

  const snapshot: BackupSnapshot = {
    id,
    name: options?.name?.trim() || safeName,
    createdAt,
    trigger,
    createdBy: options?.createdBy || null,
    counts,
    tables,
    warnings,
  }

  await writeJsonFile(await backupFilePath(id), snapshot)
  const config = await updateLastRun(snapshot)

  return {
    backup: mapSnapshotToSummary(snapshot),
    config,
  }
}

export async function restoreBackup(backupId: string) {
  const supabase = ensureAdminDatabase()
  const snapshot = await getBackupSnapshot(backupId)
  const warnings = [...snapshot.warnings]

  for (const table of [...BACKUP_TABLES].reverse()) {
    const { error } = await supabase.from(table.name).delete().not(table.deleteKey, 'is', null)
    if (error) {
      if (isMissingTableError(error.message)) {
        warnings.push(`${table.name}: ${error.message}`)
        continue
      }

      throw new Error(`Failed to clear ${table.name}: ${error.message}`)
    }
  }

  for (const table of BACKUP_TABLES) {
    const rows = Array.isArray(snapshot.tables[table.name]) ? snapshot.tables[table.name] : []
    if (rows.length === 0) continue

    for (const chunk of chunkRows(rows)) {
      const { error } = await supabase.from(table.name).upsert(chunk as never[], {
        onConflict: table.onConflict,
      })

      if (error) {
        if (isMissingTableError(error.message)) {
          warnings.push(`${table.name}: ${error.message}`)
          break
        }

        throw new Error(`Failed to restore ${table.name}: ${error.message}`)
      }
    }
  }

  return {
    backup: {
      ...mapSnapshotToSummary(snapshot),
      warnings,
    },
    restoredAt: new Date().toISOString(),
  }
}

export async function maybeRunScheduledBackup() {
  const config = await readBackupConfig()
  const intervalMs = INTERVAL_TO_MS[config.interval]

  if (!supabaseAdmin || intervalMs === 0) {
    return null
  }

  const lastRunAtMs = config.lastRunAt ? Date.parse(config.lastRunAt) : 0
  const now = Date.now()

  if (lastRunAtMs && now - lastRunAtMs < intervalMs) {
    return null
  }

  return createBackup({
    name: `auto-${config.interval}`,
    trigger: 'scheduled',
    createdBy: 'system',
  })
}