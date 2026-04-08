'use client'

import { useEffect, useState } from 'react'

import { createClient } from '@/lib/supabase/client'

import {
  AdminBadge,
  AdminButton,
  AdminCard,
  AdminInput,
  AdminKicker,
  AdminLabel,
  AdminSelect,
  AdminStack,
} from '@/components/admin/ui/AdminUI'

const intervalOptions = [
  { value: 'off', label: 'Išjungta' },
  { value: '6h', label: 'Kas 6 val.' },
  { value: '12h', label: 'Kas 12 val.' },
  { value: '24h', label: 'Kas 24 val.' },
  { value: '7d', label: 'Kas 7 dienas' },
]

type BackupCounts = Record<string, number>

type BackupSummary = {
  id: string
  name: string
  createdAt: string
  trigger: 'manual' | 'scheduled'
  createdBy: string | null
  counts: BackupCounts
  warnings: string[]
  fileName: string
}

type BackupDetail = BackupSummary & {
  tables: Record<string, unknown[]>
}

type BackupConfig = {
  interval: string
  updatedAt: string
  lastRunAt: string | null
  lastBackupId: string | null
}

type LoadResponse = {
  backups: BackupSummary[]
  config: BackupConfig
  databaseConfigured: boolean
  scheduler?: {
    started: boolean
    pollMs: number
    lastCheckAt: string | null
    lastError: string | null
  }
  scheduledBackup?: BackupSummary | null
  selectedBackup?: BackupDetail
}

const RESTORE_CONFIRMATION = 'ATSTATYTI'

async function getAdminToken() {
  const supabase = createClient()
  if (!supabase) {
    throw new Error('Supabase klientas nesukonfigūruotas')
  }

  const { data } = await supabase.auth.getSession()
  const token = data.session?.access_token ?? null

  if (!token) {
    throw new Error('Administratoriaus sesija nerasta. Prisijunkite iš naujo.')
  }

  return token
}

async function adminRequest<T>(input: string, init: RequestInit = {}) {
  const token = await getAdminToken()
  const headers = new Headers(init.headers)
  headers.set('Authorization', `Bearer ${token}`)

  if (init.body && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json')
  }

  const response = await fetch(input, {
    ...init,
    headers,
  })

  const payload = (await response.json().catch(() => null)) as { error?: string } | null
  if (!response.ok) {
    throw new Error(payload?.error || `Užklausa nepavyko (${response.status})`)
  }

  return payload as T
}

function formatDate(value: string | null | undefined) {
  if (!value) return 'Nėra'

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value

  return new Intl.DateTimeFormat('lt-LT', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date)
}

function getTotalRows(counts: BackupCounts) {
  return Object.values(counts).reduce((sum, value) => sum + value, 0)
}

export default function BackupsAdminClient() {
  const [backupName, setBackupName] = useState('')
  const [interval, setInterval] = useState('24h')
  const [selectedBackup, setSelectedBackup] = useState('')
  const [restoreConfirmation, setRestoreConfirmation] = useState('')
  const [backups, setBackups] = useState<BackupSummary[]>([])
  const [selectedBackupInfo, setSelectedBackupInfo] = useState<BackupDetail | null>(null)
  const [databaseConfigured, setDatabaseConfigured] = useState(true)
  const [schedulerStatus, setSchedulerStatus] = useState<LoadResponse['scheduler'] | null>(null)
  const [statusMessage, setStatusMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isCreating, setIsCreating] = useState(false)
  const [isSavingInterval, setIsSavingInterval] = useState(false)
  const [isInspecting, setIsInspecting] = useState(false)
  const [isRestoring, setIsRestoring] = useState(false)

  async function loadBackups(options?: { backupId?: string; scheduled?: boolean }) {
    const query = new URLSearchParams()
    if (options?.backupId) query.set('backupId', options.backupId)
    if (options?.scheduled === false) query.set('scheduled', '0')

    const suffix = query.toString()
    const response = await adminRequest<LoadResponse>(`/api/admin/backups${suffix ? `?${suffix}` : ''}`)

    setBackups(response.backups)
    setInterval(response.config.interval)
    setDatabaseConfigured(response.databaseConfigured)
    setSchedulerStatus(response.scheduler ?? null)

    if (response.selectedBackup) {
      setSelectedBackupInfo(response.selectedBackup)
    }

    if (!selectedBackup && response.backups[0]?.id) {
      setSelectedBackup(response.backups[0].id)
    }

    if (response.scheduledBackup) {
      setStatusMessage(`Automatinė kopija sukurta: ${response.scheduledBackup.name}`)
    }

    return response
  }

  useEffect(() => {
    let active = true

    void (async () => {
      try {
        const response = await loadBackups()
        if (!active) return

        const preferredBackup = response.backups[0]?.id || ''
        setSelectedBackup((current) => current || preferredBackup)
      } catch (error) {
        if (!active) return
        setErrorMessage(error instanceof Error ? error.message : 'Nepavyko užkrauti kopijų')
      } finally {
        if (active) setIsLoading(false)
      }
    })()

    return () => {
      active = false
    }
  }, [])

  const selectedBackupSummary = backups.find((backup) => backup.id === selectedBackup) || null

  async function handleCreateBackup() {
    setIsCreating(true)
    setErrorMessage('')
    setStatusMessage('')

    try {
      const response = await adminRequest<{ backup: BackupSummary }>(`/api/admin/backups`, {
        method: 'POST',
        body: JSON.stringify({ name: backupName }),
      })

      setBackupName('')
      setSelectedBackup(response.backup.id)
      setSelectedBackupInfo(null)
      setStatusMessage(`Atsarginė kopija sukurta: ${response.backup.name}`)
      await loadBackups({ scheduled: false })
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Nepavyko sukurti kopijos')
    } finally {
      setIsCreating(false)
    }
  }

  async function handleSaveInterval() {
    setIsSavingInterval(true)
    setErrorMessage('')
    setStatusMessage('')

    try {
      await adminRequest<{ config: BackupConfig }>(`/api/admin/backups`, {
        method: 'PUT',
        body: JSON.stringify({ interval }),
      })

      setStatusMessage('Backup intervalas išsaugotas')
      await loadBackups({ scheduled: false })
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Nepavyko išsaugoti intervalo')
    } finally {
      setIsSavingInterval(false)
    }
  }

  async function handleInspectBackup() {
    if (!selectedBackup) {
      setErrorMessage('Pasirinkite atsarginę kopiją')
      return
    }

    setIsInspecting(true)
    setErrorMessage('')
    setStatusMessage('')

    try {
      await loadBackups({ backupId: selectedBackup, scheduled: false })
      setStatusMessage('Kopijos informacija užkrauta')
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Nepavyko užkrauti kopijos informacijos')
    } finally {
      setIsInspecting(false)
    }
  }

  async function handleRestoreBackup() {
    if (!selectedBackup) {
      setErrorMessage('Pasirinkite atsarginę kopiją')
      return
    }

    if (restoreConfirmation.trim().toUpperCase() !== RESTORE_CONFIRMATION) {
      setErrorMessage(`Įveskite „${RESTORE_CONFIRMATION}“, kad patvirtintumėte atkūrimą`)
      return
    }

    setIsRestoring(true)
    setErrorMessage('')
    setStatusMessage('')

    try {
      const response = await adminRequest<{ backup: BackupSummary }>(`/api/admin/backups`, {
        method: 'POST',
        body: JSON.stringify({
          action: 'restore',
          backupId: selectedBackup,
          confirmation: restoreConfirmation,
        }),
      })

      setRestoreConfirmation('')
      setSelectedBackupInfo(null)
      setStatusMessage(`Kopija atstatyta: ${response.backup.name}`)
      await loadBackups({ scheduled: false })
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Nepavyko atstatyti kopijos')
    } finally {
      setIsRestoring(false)
    }
  }

  return (
    <AdminStack>
      <div className="grid grid-cols-1 gap-[16px] xl:grid-cols-3">
        <AdminCard className="h-full">
          <AdminKicker>Kopijos kūrimas</AdminKicker>
          <h3 className="mt-[8px] font-['DM_Sans'] text-[28px] font-light leading-none tracking-[-1.12px] text-[#161616]">
            Sukurti atsarginę kopiją
          </h3>
          <p className="mt-[10px] font-['Outfit'] text-[14px] leading-[1.6] text-[#535353]">
            Paleiskite rankinį duomenų backup kūrimą ir išsaugokite momentinę projekto duomenų kopiją.
          </p>

          <div className="mt-[18px] space-y-[12px]">
            <div>
              <AdminLabel className="mb-[6px]">Kopijos pavadinimas</AdminLabel>
              <AdminInput
                value={backupName}
                onChange={(event) => setBackupName(event.target.value)}
                placeholder="pvz. pries-katalogo-atnaujinima"
              />
            </div>

            <div className="flex flex-wrap items-center gap-[10px]">
              <AdminButton disabled={!databaseConfigured || isCreating} onClick={handleCreateBackup}>
                {isCreating ? 'Kuriama...' : 'Sukurti atsarginę kopiją'}
              </AdminButton>
              <AdminBadge>Rankinis paleidimas</AdminBadge>
            </div>
          </div>
        </AdminCard>

        <AdminCard className="h-full">
          <AdminKicker>Automatika</AdminKicker>
          <h3 className="mt-[8px] font-['DM_Sans'] text-[28px] font-light leading-none tracking-[-1.12px] text-[#161616]">
            Atsarginių kopijų kūrimo intervalas
          </h3>
          <p className="mt-[10px] font-['Outfit'] text-[14px] leading-[1.6] text-[#535353]">
            Nustatykite, kas kiek laiko sistema turi automatiškai kurti naują atsarginę kopiją.
          </p>

          <div className="mt-[18px] space-y-[12px]">
            <div>
              <AdminLabel className="mb-[6px]">Intervalas</AdminLabel>
              <AdminSelect value={interval} onChange={(event) => setInterval(event.target.value)}>
                {intervalOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </AdminSelect>
            </div>

            <div className="flex flex-wrap items-center gap-[10px]">
              <AdminButton
                disabled={!databaseConfigured || isSavingInterval}
                onClick={handleSaveInterval}
              >
                {isSavingInterval ? 'Saugoma...' : 'Išsaugoti intervalą'}
              </AdminButton>
              <AdminBadge>Automatinis backup</AdminBadge>
            </div>
          </div>
        </AdminCard>

        <AdminCard className="h-full">
          <AdminKicker>Atkūrimas</AdminKicker>
          <h3 className="mt-[8px] font-['DM_Sans'] text-[28px] font-light leading-none tracking-[-1.12px] text-[#161616]">
            Atstatyti kopiją
          </h3>
          <p className="mt-[10px] font-['Outfit'] text-[14px] leading-[1.6] text-[#535353]">
            Pasirinkite anksčiau sukurtą atsarginę kopiją ir paleiskite atkūrimo veiksmą.
          </p>

          <div className="mt-[18px] space-y-[12px]">
            <div>
              <AdminLabel className="mb-[6px]">Atsarginė kopija</AdminLabel>
              <AdminSelect
                value={selectedBackup}
                onChange={(event) => setSelectedBackup(event.target.value)}
              >
                <option value="">Pasirinkite atsarginę kopiją</option>
                {backups.map((backup) => (
                  <option key={backup.id} value={backup.id}>
                    {backup.name} · {formatDate(backup.createdAt)}
                  </option>
                ))}
              </AdminSelect>
            </div>

            <div className="flex flex-wrap items-center gap-[10px]">
              <AdminButton
                variant="outline"
                disabled={isInspecting || !selectedBackup}
                onClick={handleInspectBackup}
              >
                {isInspecting ? 'Kraunama...' : 'Peržiūrėti kopijos informaciją'}
              </AdminButton>
              <AdminButton
                variant="danger"
                disabled={!databaseConfigured || isRestoring || !selectedBackup}
                onClick={handleRestoreBackup}
              >
                {isRestoring ? 'Atstatoma...' : 'Atstatyti kopiją'}
              </AdminButton>
            </div>

            <div>
              <AdminLabel className="mb-[6px]">Patvirtinimas</AdminLabel>
              <AdminInput
                value={restoreConfirmation}
                onChange={(event) => setRestoreConfirmation(event.target.value)}
                placeholder={`Įveskite ${RESTORE_CONFIRMATION}`}
              />
            </div>
          </div>
        </AdminCard>
      </div>

      <AdminCard>
        <div className="flex flex-col gap-[10px] lg:flex-row lg:items-center lg:justify-between">
          <div>
            <AdminKicker>Statusas</AdminKicker>
            <p className="mt-[8px] font-['Outfit'] text-[14px] leading-[1.6] text-[#535353]">
              {isLoading
                ? 'Įkeliama backup informacija...'
                : statusMessage ||
                  (databaseConfigured
                    ? 'Šiame ekrane galite kurti backup, nustatyti intervalą ir atkurti pasirinktą kopiją.'
                    : 'Duomenų bazės service-role prieiga nesukonfigūruota, todėl backup veiksmai šiuo metu neveiks.')}
            </p>
            {errorMessage ? (
              <p className="mt-[8px] font-['Outfit'] text-[14px] leading-[1.6] text-[#B42318]">
                {errorMessage}
              </p>
            ) : null}
            {schedulerStatus ? (
              <p className="mt-[8px] font-['Outfit'] text-[14px] leading-[1.6] text-[#535353]">
                Vidinis planuoklis: {schedulerStatus.started ? 'aktyvus' : 'neaktyvus'} · paskutinis patikrinimas: {formatDate(schedulerStatus.lastCheckAt)}
                {schedulerStatus.lastError ? ` · klaida: ${schedulerStatus.lastError}` : ''}
              </p>
            ) : null}
          </div>
          <div className="flex flex-wrap gap-[8px]">
            <AdminBadge>Backup kūrimas</AdminBadge>
            <AdminBadge>Intervalas</AdminBadge>
            <AdminBadge>Restore</AdminBadge>
          </div>
        </div>
      </AdminCard>

      <AdminCard>
        <AdminKicker>Kopijos suvestinė</AdminKicker>
        <div className="mt-[12px] grid gap-[12px] lg:grid-cols-2">
          <div className="rounded-[24px] border border-[#BBBBBB] p-[20px]">
            <h4 className="font-['DM_Sans'] text-[22px] font-light tracking-[-0.88px] text-[#161616]">
              Naujausia būsena
            </h4>
            <div className="mt-[12px] space-y-[6px] font-['Outfit'] text-[14px] leading-[1.6] text-[#535353]">
              <p>Kopijų skaičius: {backups.length}</p>
              <p>Paskutinis paleidimas: {formatDate(selectedBackupSummary?.createdAt || null)}</p>
              <p>Aktyvus intervalas: {intervalOptions.find((option) => option.value === interval)?.label || interval}</p>
              <p>
                Paskutinės kopijos apimtis:{' '}
                {selectedBackupSummary ? `${getTotalRows(selectedBackupSummary.counts)} įrašų` : 'Nėra duomenų'}
              </p>
            </div>
          </div>

          <div className="rounded-[24px] border border-[#BBBBBB] p-[20px]">
            <h4 className="font-['DM_Sans'] text-[22px] font-light tracking-[-0.88px] text-[#161616]">
              Pasirinktos kopijos informacija
            </h4>
            {selectedBackupInfo ? (
              <div className="mt-[12px] space-y-[6px] font-['Outfit'] text-[14px] leading-[1.6] text-[#535353]">
                <p>Pavadinimas: {selectedBackupInfo.name}</p>
                <p>Sukurta: {formatDate(selectedBackupInfo.createdAt)}</p>
                <p>Tipas: {selectedBackupInfo.trigger === 'scheduled' ? 'Automatinė' : 'Rankinė'}</p>
                <p>Autorius: {selectedBackupInfo.createdBy || 'Sistema'}</p>
                <p>Įrašų skaičius: {getTotalRows(selectedBackupInfo.counts)}</p>
                <p>Lentelės: {Object.keys(selectedBackupInfo.counts).length}</p>
                <p>
                  Perspėjimai:{' '}
                  {selectedBackupInfo.warnings.length > 0
                    ? selectedBackupInfo.warnings.length
                    : 'Nėra'}
                </p>
              </div>
            ) : (
              <p className="mt-[12px] font-['Outfit'] text-[14px] leading-[1.6] text-[#535353]">
                Pasirinkite kopiją ir spauskite „Peržiūrėti kopijos informaciją“.
              </p>
            )}
          </div>
        </div>
      </AdminCard>
    </AdminStack>
  )
}