'use client'

import { useEffect, useMemo, useState } from 'react'
import { useTranslations } from 'next-intl'
import {
  ASSIGNABLE_ADMIN_SECTION_KEYS,
  normalizeAdminPermissions,
  type AdminPermissionLevel,
  type AdminPermissionMap,
  type AdminSectionKey,
} from '@/lib/admin/permissions'
import { createClient } from '@/lib/supabase/client'
import {
  AdminButton,
  AdminInput,
  AdminLabel,
  AdminSectionTitle,
  AdminSelect,
  AdminStack,
} from '@/components/admin/ui/AdminUI'

type AdminUserRow = {
  id: string
  email: string | null
  fullName: string | null
  role: string
  adminSections: AdminSectionKey[]
  adminPermissions: AdminPermissionMap
  createdAt: string
  lastSignInAt: string | null
}

type DiscountRow = {
  role: string
  discount_type: 'percent' | 'fixed'
  discount_value: number
  is_active: boolean
  currency?: string
}

async function getAdminToken(): Promise<string | null> {
  const supabase = createClient()
  if (!supabase) return null
  const { data } = await supabase.auth.getSession()
  return data.session?.access_token ?? null
}

export default function UsersAdminClient() {
  const t = useTranslations('adminUsers')
  const tAdmin = useTranslations('admin')
  const supabase = createClient()

  function getErrorMessage(error: unknown, fallback: string) {
    if (error instanceof Error && error.message) return error.message
    if (typeof error === 'string' && error) return error
    return fallback
  }

  const [users, setUsers] = useState<AdminUserRow[]>([])
  const [discounts, setDiscounts] = useState<DiscountRow[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [newUserEmail, setNewUserEmail] = useState('')
  const [newUserPassword, setNewUserPassword] = useState('')
  const [newUserFullName, setNewUserFullName] = useState('')
  const [newUserRole, setNewUserRole] = useState('user')
  const [newUserAdminPermissions, setNewUserAdminPermissions] = useState<AdminPermissionMap>({})
  const [userSearch, setUserSearch] = useState('')
  const [userRoleFilter, setUserRoleFilter] = useState('__all')

  const [selectedRole, setSelectedRole] = useState('user')
  const [discountType, setDiscountType] = useState<'percent' | 'fixed'>('percent')
  const [discountValue, setDiscountValue] = useState<string>('0')
  const [discountActive, setDiscountActive] = useState(true)
  const [newRoleName, setNewRoleName] = useState('')
  const [createRoleError, setCreateRoleError] = useState<string | null>(null)
  const [createRoleInfo, setCreateRoleInfo] = useState<string | null>(null)
  const [isCreatingRole, setIsCreatingRole] = useState(false)

  function normalizeRoleName(value: string) {
    return value.trim().replace(/\s+/g, ' ')
  }

  function normalizeRoleKey(value: string) {
    return normalizeRoleName(value).toLowerCase()
  }

  function getCanonicalRoleValue(role: string) {
    const normalizedKey = normalizeRoleKey(role)

    switch (normalizedKey) {
      case 'admin':
      case 'manager':
      case 'partner':
      case 'user':
        return normalizedKey
      default:
        return normalizeRoleName(role)
    }
  }

  function isRole(role: string, expectedRole: string) {
    return normalizeRoleKey(role) === expectedRole
  }

  function getRolePriority(role: string) {
    switch (normalizeRoleKey(role)) {
      case 'admin':
        return 0
      case 'manager':
        return 1
      case 'partner':
        return 2
      case 'user':
        return 99
      default:
        return 10
    }
  }

  function sortRoleNames(roleNames: string[]) {
    return [...roleNames].sort((left, right) => {
      const priorityDiff = getRolePriority(left) - getRolePriority(right)
      if (priorityDiff !== 0) return priorityDiff
      return getRoleLabel(left).localeCompare(getRoleLabel(right), 'lt')
    })
  }

  function sortUsersByPriority(items: AdminUserRow[]) {
    return [...items].sort((left, right) => {
      const priorityDiff = getRolePriority(left.role) - getRolePriority(right.role)
      if (priorityDiff !== 0) return priorityDiff

      const leftName = (left.fullName || left.email || '').trim()
      const rightName = (right.fullName || right.email || '').trim()
      return leftName.localeCompare(rightName, 'lt')
    })
  }

  function isValidRoleName(value: string) {
    if (!value) return false
    if (value.length > 64) return false
    return /^[A-Za-z0-9_-]+(?: [A-Za-z0-9_-]+)*$/.test(value)
  }

  function normalizeManagedPermissions(role: string, permissions: unknown): AdminPermissionMap {
    return role === 'manager' ? normalizeAdminPermissions(permissions) : {}
  }

  function getSectionLabel(section: AdminSectionKey): string {
    switch (section) {
      case 'products':
        return tAdmin('tabs.products')
      case 'projects':
        return tAdmin('tabs.projects')
      case 'posts':
        return tAdmin('tabs.posts')
      case 'seo':
        return tAdmin('tabs.seo')
      case 'inventory':
        return tAdmin('tabs.inventory')
      case 'email-templates':
        return tAdmin('tabs.emailTemplates')
      default:
        return section
    }
  }

  function getRoleLabel(role: string): string {
    switch (normalizeRoleKey(role)) {
      case 'user':
        return t('roles.user')
      case 'manager':
        return t('roles.manager')
      case 'admin':
        return t('roles.admin')
      case 'partner':
        return t('roles.partner')
      default:
        return role
    }
  }

  const sectionOptions = useMemo(
    () => ASSIGNABLE_ADMIN_SECTION_KEYS.map((section) => ({ key: section, label: getSectionLabel(section) })),
    [tAdmin]
  )

  function getPermissionLabel(level: AdminPermissionLevel) {
    switch (level) {
      case 'view':
        return t('permissions.levels.view')
      case 'manage':
        return t('permissions.levels.manage')
      case 'none':
      default:
        return t('permissions.levels.none')
    }
  }

  function isVisiblePermission(level: AdminPermissionLevel) {
    return level === 'view' || level === 'manage'
  }

  function getActionPermissionLevel(level: AdminPermissionLevel): Exclude<AdminPermissionLevel, 'none'> {
    return level === 'manage' ? 'manage' : 'view'
  }

  function getUserPermissionLevel(user: AdminUserRow, section: AdminSectionKey): AdminPermissionLevel {
    return user.adminPermissions[section] ?? (user.adminSections.includes(section) ? 'manage' : 'none')
  }

  function getNewUserPermissionLevel(section: AdminSectionKey): AdminPermissionLevel {
    return newUserAdminPermissions[section] ?? 'none'
  }

  function countManagedSections(permissions: AdminPermissionMap) {
    return Object.values(permissions).filter((level) => level === 'view' || level === 'manage').length
  }

  function matchesUserRoleFilter(user: AdminUserRow, filterValue: string) {
    if (filterValue === '__all') return true
    if (filterValue === '__staff') return !isRole(user.role, 'user')
    if (filterValue === '__buyers') return isRole(user.role, 'user')
    return getCanonicalRoleValue(user.role) === filterValue
  }

  function matchesUserSearch(user: AdminUserRow, searchValue: string) {
    const normalizedSearch = searchValue.trim().toLowerCase()
    if (!normalizedSearch) return true

    return [user.email, user.fullName, getRoleLabel(user.role)]
      .filter(Boolean)
      .some((value) => String(value).toLowerCase().includes(normalizedSearch))
  }

  const roles = useMemo(() => {
    const set = new Set<string>(['admin', 'manager', 'partner', 'user'])
    users.forEach((u) => set.add(getCanonicalRoleValue(u.role)))
    discounts.forEach((d) => set.add(getCanonicalRoleValue(d.role)))
    return sortRoleNames(Array.from(set))
  }, [users, discounts])

  const filteredUsers = useMemo(
    () => users.filter((user) => matchesUserRoleFilter(user, userRoleFilter) && matchesUserSearch(user, userSearch)),
    [userRoleFilter, userSearch, users]
  )

  const staffAndPartners = useMemo(
    () => filteredUsers.filter((user) => !isRole(user.role, 'user')),
    [filteredUsers]
  )

  const buyers = useMemo(
    () => filteredUsers.filter((user) => isRole(user.role, 'user')),
    [filteredUsers]
  )

  useEffect(() => {
    const current = discounts.find((d) => d.role === selectedRole)
    if (current) {
      setDiscountType(current.discount_type)
      setDiscountValue(String(current.discount_value ?? 0))
      setDiscountActive(current.is_active !== false)
    } else {
      setDiscountType('percent')
      setDiscountValue('0')
      setDiscountActive(true)
    }
  }, [selectedRole, discounts])

  async function loadAll() {
    setIsLoading(true)
    setError(null)

    try {
      const token = await getAdminToken()
      if (!token) throw new Error(t('errors.noSession'))

      const [usersRes, discountsRes] = await Promise.all([
        fetch('/api/admin/users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
        fetch('/api/admin/role-discounts', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
      ])

      const usersJson = await usersRes.json()
      const discountsJson = await discountsRes.json()

      if (!usersRes.ok) throw new Error(usersJson?.error || t('errors.loadUsers'))
      if (!discountsRes.ok) throw new Error(discountsJson?.error || t('errors.loadDiscounts'))

      setUsers(sortUsersByPriority((usersJson?.users ?? []) as AdminUserRow[]))
      setDiscounts((discountsJson?.discounts ?? []) as DiscountRow[])
    } catch (error: unknown) {
      setError(getErrorMessage(error, t('errors.generic')))
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadAll()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function updateUserAccess(userId: string, role: string, adminPermissions: AdminPermissionMap) {
    try {
      const token = await getAdminToken()
      if (!token) throw new Error(t('errors.noSession'))

      const normalizedPermissions = normalizeManagedPermissions(role, adminPermissions)

      const res = await fetch('/api/admin/users', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId, role, adminPermissions: normalizedPermissions }),
      })

      const json = await res.json()
      if (!res.ok) throw new Error(json?.error || t('errors.updateRole'))

      setUsers((prev) =>
        sortUsersByPriority(
          prev.map((u) =>
            u.id === userId
              ? {
                  ...u,
                  role,
                  adminSections: json?.adminSections ?? [],
                  adminPermissions: json?.adminPermissions ?? normalizedPermissions,
                }
              : u
          )
        )
      )
    } catch (error: unknown) {
      alert(getErrorMessage(error, t('errors.updateRole')))
    }
  }

  function updateUserPermissionLevel(user: AdminUserRow, section: AdminSectionKey, level: AdminPermissionLevel) {
    const nextPermissions: AdminPermissionMap = { ...user.adminPermissions }
    if (level === 'none') {
      delete nextPermissions[section]
    } else {
      nextPermissions[section] = level
    }

    void updateUserAccess(user.id, user.role, nextPermissions)
  }

  function updateUserVisibility(user: AdminUserRow, section: AdminSectionKey, visible: boolean) {
    const currentLevel = getUserPermissionLevel(user, section)
    const nextLevel = visible ? getActionPermissionLevel(currentLevel) : 'none'
    updateUserPermissionLevel(user, section, nextLevel)
  }

  function updateUserAction(user: AdminUserRow, section: AdminSectionKey, level: Exclude<AdminPermissionLevel, 'none'>) {
    updateUserPermissionLevel(user, section, level)
  }

  function updateNewUserPermissionLevel(section: AdminSectionKey, level: AdminPermissionLevel) {
    setNewUserAdminPermissions((prev) => {
      const next = { ...prev }
      if (level === 'none') {
        delete next[section]
      } else {
        next[section] = level
      }

      return next
    })
  }

  function updateNewUserVisibility(section: AdminSectionKey, visible: boolean) {
    const currentLevel = getNewUserPermissionLevel(section)
    const nextLevel = visible ? getActionPermissionLevel(currentLevel) : 'none'
    updateNewUserPermissionLevel(section, nextLevel)
  }

  function updateNewUserAction(section: AdminSectionKey, level: Exclude<AdminPermissionLevel, 'none'>) {
    updateNewUserPermissionLevel(section, level)
  }

  async function createUser() {
    try {
      const token = await getAdminToken()
      if (!token) throw new Error(t('errors.noSession'))

      const res = await fetch('/api/admin/users/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          email: newUserEmail,
          password: newUserPassword,
          fullName: newUserFullName,
          role: newUserRole,
          adminPermissions: normalizeManagedPermissions(newUserRole, newUserAdminPermissions),
        }),
      })

      const json = await res.json()
      if (!res.ok) throw new Error(json?.error || t('errors.createUser'))

      setNewUserEmail('')
      setNewUserPassword('')
      setNewUserFullName('')
      setNewUserRole('user')
      setNewUserAdminPermissions({})

      await loadAll()
    } catch (error: unknown) {
      alert(getErrorMessage(error, t('errors.createUser')))
    }
  }

  async function saveDiscount() {
    try {
      const token = await getAdminToken()
      if (!token) throw new Error(t('errors.noSession'))

      const value = Number(discountValue)
      if (!Number.isFinite(value) || value < 0) throw new Error(t('errors.invalidDiscount'))
      if (discountType === 'percent' && value > 100) throw new Error(t('errors.invalidPercent'))

      const res = await fetch('/api/admin/role-discounts', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          role: selectedRole,
          discountType,
          discountValue: value,
          isActive: discountActive,
        }),
      })

      const json = await res.json()
      if (!res.ok) throw new Error(json?.error || t('errors.saveDiscount'))

      await loadAll()
    } catch (error: unknown) {
      alert(getErrorMessage(error, t('errors.saveDiscount')))
    }
  }

  async function createRole() {
    setCreateRoleError(null)
    setCreateRoleInfo(null)

    const normalizedRole = normalizeRoleName(newRoleName)
    if (!isValidRoleName(normalizedRole)) {
      setCreateRoleError(t('discounts.createRole.errors.invalidRole'))
      return
    }

    const canonicalNewRole = getCanonicalRoleValue(normalizedRole)

    if (roles.some((role) => normalizeRoleKey(role) === normalizeRoleKey(canonicalNewRole))) {
      setSelectedRole(canonicalNewRole)
      setCreateRoleInfo(t('discounts.createRole.errors.roleExists'))
      return
    }

    setIsCreatingRole(true)
    try {
      const token = await getAdminToken()
      if (!token) throw new Error(t('errors.noSession'))

      let value = Number(discountValue)
      if (!Number.isFinite(value) || value < 0) value = 0
      if (discountType === 'percent' && value > 100) value = 0

      const res = await fetch('/api/admin/role-discounts', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          role: canonicalNewRole,
          discountType,
          discountValue: value,
          isActive: discountActive,
        }),
      })

      type ApiErrorResponse = { error?: unknown }
      const json = (await res.json().catch(() => ({}))) as ApiErrorResponse
      if (!res.ok) {
        const apiError = typeof json?.error === 'string' ? json.error : undefined
        const maybeExists = res.status === 409 || (apiError && /exists|duplicate/i.test(apiError))
        if (maybeExists) {
          setSelectedRole(canonicalNewRole)
          setCreateRoleInfo(t('discounts.createRole.errors.roleExists'))
          return
        }

        throw new Error(apiError || t('errors.saveDiscount'))
      }

      setNewRoleName('')
      setSelectedRole(canonicalNewRole)
      await loadAll()
    } catch (error: unknown) {
      setCreateRoleError(getErrorMessage(error, t('errors.saveDiscount')))
    } finally {
      setIsCreatingRole(false)
    }
  }

  if (!supabase) {
    return (
      <div>
        <AdminSectionTitle>{t('notConfigured.title')}</AdminSectionTitle>
        <p className="mt-[8px] font-['Outfit'] text-[14px] text-[#535353]">{t('notConfigured.body')}</p>
      </div>
    )
  }

  return (
    <AdminStack>
      {error && (
        <div className="border border-red-200 bg-[#EAEAEA] text-red-700 rounded-[16px] px-[16px] py-[12px] font-['Outfit'] text-[13px]">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[clamp(16px,2vw,24px)]">
        {/* Users */}
        <div className="border border-[#E1E1E1] rounded-[24px] p-[clamp(16px,2vw,24px)] bg-[#EAEAEA]">
          <AdminSectionTitle>{t('users.title')}</AdminSectionTitle>

          <div className="mt-4 grid grid-cols-1 gap-3 lg:grid-cols-2">
            <div className="rounded-[18px] border border-[#E1E1E1] bg-white px-4 py-4">
              <div className="font-['DM_Sans'] text-[15px] font-medium text-[#161616]">{t('help.rolesTitle')}</div>
              <div className="mt-3 grid grid-cols-1 gap-2 font-['Outfit'] text-[13px] text-[#535353]">
                <div>
                  <span className="font-['DM_Sans'] text-[#161616]">{t('roles.user')}:</span> {t('help.roles.user')}
                </div>
                <div>
                  <span className="font-['DM_Sans'] text-[#161616]">{t('roles.manager')}:</span> {t('help.roles.manager')}
                </div>
                <div>
                  <span className="font-['DM_Sans'] text-[#161616]">{t('roles.admin')}:</span> {t('help.roles.admin')}
                </div>
              </div>
            </div>

            <div className="rounded-[18px] border border-[#E1E1E1] bg-white px-4 py-4">
              <div className="font-['DM_Sans'] text-[15px] font-medium text-[#161616]">{t('help.permissionsTitle')}</div>
              <div className="mt-3 grid grid-cols-1 gap-2 font-['Outfit'] text-[13px] text-[#535353]">
                <div>
                  <span className="font-['DM_Sans'] text-[#161616]">{t('permissions.levels.none')}:</span> {t('help.permissions.none')}
                </div>
                <div>
                  <span className="font-['DM_Sans'] text-[#161616]">{t('permissions.levels.view')}:</span> {t('help.permissions.view')}
                </div>
                <div>
                  <span className="font-['DM_Sans'] text-[#161616]">{t('permissions.levels.manage')}:</span> {t('help.permissions.manage')}
                </div>
                <div className="pt-1 text-[12px] text-[#7A7A7A]">{t('help.enforcementNote')}</div>
              </div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-[minmax(0,1fr)_220px]">
            <div>
              <AdminLabel className="mb-[6px]">{t('filters.searchLabel')}</AdminLabel>
              <AdminInput
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
                placeholder={t('filters.searchPlaceholder')}
              />
            </div>
            <div>
              <AdminLabel className="mb-[6px]">{t('filters.roleLabel')}</AdminLabel>
              <AdminSelect value={userRoleFilter} onChange={(e) => setUserRoleFilter(e.target.value)}>
                <option value="__all">{t('filters.options.all')}</option>
                <option value="__staff">{t('filters.options.partnersAndStaff')}</option>
                <option value="__buyers">{t('filters.options.buyers')}</option>
                {roles.map((role) => (
                  <option key={role} value={role}>
                    {getRoleLabel(role)}
                  </option>
                ))}
              </AdminSelect>
            </div>
          </div>

          <div className="mt-4 overflow-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#E1E1E1]">
                  <th className="py-2 pr-3 font-['Outfit'] text-[12px] tracking-[0.6px] uppercase text-[#535353]">{t('users.email')}</th>
                  <th className="py-2 pr-3 font-['Outfit'] text-[12px] tracking-[0.6px] uppercase text-[#535353]">{t('users.role')}</th>
                  <th className="py-2 pr-3 font-['Outfit'] text-[12px] tracking-[0.6px] uppercase text-[#535353]">{t('users.permissions')}</th>
                  <th className="py-2 font-['Outfit'] text-[12px] tracking-[0.6px] uppercase text-[#535353]">{t('users.actions')}</th>
                </tr>
              </thead>
              <tbody>
                {(() => {
                  const renderUserRow = (u: AdminUserRow) => (
                    <tr key={u.id} className="border-b border-[#F0F0F0]">
                      <td className="py-3 pr-3 font-['DM_Sans'] text-[#161616] text-sm">
                        <div>{u.email || '-'}</div>
                        {u.fullName && <div className="mt-1 text-[#535353]">{u.fullName}</div>}
                      </td>
                      <td className="py-3 pr-3">
                        <div className="min-w-[180px]">
                          <AdminSelect
                            value={getCanonicalRoleValue(u.role)}
                            onChange={(e) => updateUserAccess(u.id, e.target.value, u.adminPermissions)}
                          >
                          {roles.map((r) => (
                            <option key={r} value={r}>
                              {getRoleLabel(r)}
                            </option>
                          ))}
                          </AdminSelect>
                        </div>
                      </td>
                      <td className="py-3 pr-3">
                        {isRole(u.role, 'admin') ? (
                          <div className="font-['DM_Sans'] text-sm text-[#161616]">{t('permissions.fullAccess')}</div>
                        ) : isRole(u.role, 'manager') ? (
                          <div>
                            <div className="mb-2 font-['Outfit'] text-[12px] text-[#535353]">{t('permissions.visibilityHelp')}</div>
                            <div className="grid grid-cols-1 gap-2">
                              {sectionOptions.map((section) => (
                                <div
                                  key={section.key}
                                  className="flex items-center gap-3 rounded-[18px] border border-[#D1D1D1] bg-white px-3 py-2"
                                >
                                  <input
                                    type="checkbox"
                                    checked={isVisiblePermission(getUserPermissionLevel(u, section.key))}
                                    onChange={(e) => updateUserVisibility(u, section.key, e.target.checked)}
                                  />
                                  <span className="font-['DM_Sans'] text-[13px] text-[#161616]">{section.label}</span>
                                </div>
                              ))}
                            </div>
                            <div className="mt-2 font-['Outfit'] text-[12px] text-[#535353]">
                              {countManagedSections(u.adminPermissions) > 0
                                ? t('permissions.managerSelected')
                                : t('permissions.managerEmpty')}
                            </div>
                          </div>
                        ) : (
                          <div className="font-['DM_Sans'] text-sm text-[#535353]">{t('permissions.noAdminAccess')}</div>
                        )}
                      </td>
                      <td className="py-3">
                        {isRole(u.role, 'admin') ? (
                          <div className="font-['DM_Sans'] text-sm text-[#161616]">{t('permissions.fullAccess')}</div>
                        ) : isRole(u.role, 'manager') ? (
                          <div>
                            <div className="mb-2 font-['Outfit'] text-[12px] text-[#535353]">{t('permissions.actionsHelp')}</div>
                            <div className="grid grid-cols-1 gap-2">
                              {sectionOptions.map((section) => {
                                const permissionLevel = getUserPermissionLevel(u, section.key)
                                const isVisible = isVisiblePermission(permissionLevel)

                                return (
                                  <div
                                    key={section.key}
                                    className="grid grid-cols-[minmax(0,1fr)_160px] items-center gap-3 rounded-[18px] border border-[#D1D1D1] bg-white px-3 py-2"
                                  >
                                    <span className={`font-['DM_Sans'] text-[13px] ${isVisible ? 'text-[#161616]' : 'text-[#9A9A9A]'}`}>
                                      {section.label}
                                    </span>
                                    <AdminSelect
                                      value={getActionPermissionLevel(permissionLevel)}
                                      disabled={!isVisible}
                                      onChange={(e) =>
                                        updateUserAction(
                                          u,
                                          section.key,
                                          ((e.target.value as Exclude<AdminPermissionLevel, 'none'>) || 'view')
                                        )
                                      }
                                    >
                                      <option value="view">{getPermissionLabel('view')}</option>
                                      <option value="manage">{getPermissionLabel('manage')}</option>
                                    </AdminSelect>
                                  </div>
                                )
                              })}
                            </div>
                            <div className="mt-2 font-['DM_Sans'] text-sm text-[#535353]">{t('users.autoSave')}</div>
                          </div>
                        ) : (
                          <div className="font-['DM_Sans'] text-sm text-[#535353]">{t('permissions.noAdminAccess')}</div>
                        )}
                      </td>
                    </tr>
                  )

                  const renderGroupHeader = (title: string, description: string) => (
                    <tr>
                      <td colSpan={4} className="pt-5 pb-2">
                        <div className="font-['DM_Sans'] text-[14px] font-medium text-[#161616]">{title}</div>
                        <div className="mt-1 font-['Outfit'] text-[12px] text-[#535353]">{description}</div>
                      </td>
                    </tr>
                  )

                  if (isLoading) {
                    return (
                      <tr>
                        <td colSpan={4} className="py-6 font-['DM_Sans'] text-[#535353]">{t('loading')}</td>
                      </tr>
                    )
                  }

                  if (filteredUsers.length === 0) {
                    return (
                      <tr>
                        <td colSpan={4} className="py-6 font-['DM_Sans'] text-[#535353]">{t('users.emptyFiltered')}</td>
                      </tr>
                    )
                  }

                  return (
                    <>
                      {staffAndPartners.length > 0 && renderGroupHeader(t('users.groups.partnersAndStaff'), t('users.groups.partnersAndStaffHelp'))}
                      {staffAndPartners.map(renderUserRow)}
                      {buyers.length > 0 && renderGroupHeader(t('users.groups.buyers'), t('users.groups.buyersHelp'))}
                      {buyers.map(renderUserRow)}
                    </>
                  )
                })()}
              </tbody>
            </table>
          </div>

          <div className="mt-6 pt-6 border-t border-[#E1E1E1]">
            <div className="font-['DM_Sans'] text-[18px] font-medium text-[#161616]">{t('create.title')}</div>
            <div className="mt-4 grid grid-cols-1 gap-3">
              <AdminInput
                value={newUserEmail}
                onChange={(e) => setNewUserEmail(e.target.value)}
                placeholder={t('create.email')}
              />
              <AdminInput
                type="password"
                value={newUserPassword}
                onChange={(e) => setNewUserPassword(e.target.value)}
                placeholder={t('create.password')}
              />
              <AdminInput
                value={newUserFullName}
                onChange={(e) => setNewUserFullName(e.target.value)}
                placeholder={t('create.fullName')}
              />
              <AdminSelect data-testid="create-user-role" value={newUserRole} onChange={(e) => setNewUserRole(e.target.value)}>
                {roles.map((r) => (
                  <option key={r} value={r}>
                    {getRoleLabel(r)}
                  </option>
                ))}
              </AdminSelect>
              {newUserRole === 'manager' && (
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                  <div>
                    <AdminLabel className="mb-[10px]">{t('create.permissionsLabel')}</AdminLabel>
                    <p className="mb-2 font-['Outfit'] text-[12px] text-[#535353]">{t('create.visibilityHelp')}</p>
                    <div className="grid grid-cols-1 gap-2">
                      {sectionOptions.map((section) => (
                        <div
                          key={section.key}
                          className="flex items-center gap-3 rounded-[18px] border border-[#D1D1D1] bg-white px-3 py-2"
                        >
                          <input
                            type="checkbox"
                            data-testid={`create-user-visible-${section.key}`}
                            checked={isVisiblePermission(getNewUserPermissionLevel(section.key))}
                            onChange={(e) => updateNewUserVisibility(section.key, e.target.checked)}
                          />
                          <span className="font-['DM_Sans'] text-[13px] text-[#161616]">{section.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <AdminLabel className="mb-[10px]">{t('create.actionsLabel')}</AdminLabel>
                    <p className="mb-2 font-['Outfit'] text-[12px] text-[#535353]">{t('create.actionsHelp')}</p>
                    <div className="grid grid-cols-1 gap-2">
                      {sectionOptions.map((section) => {
                        const permissionLevel = getNewUserPermissionLevel(section.key)
                        const isVisible = isVisiblePermission(permissionLevel)

                        return (
                          <div
                            key={section.key}
                            className="grid grid-cols-[minmax(0,1fr)_160px] items-center gap-3 rounded-[18px] border border-[#D1D1D1] bg-white px-3 py-2"
                          >
                            <span className={`font-['DM_Sans'] text-[13px] ${isVisible ? 'text-[#161616]' : 'text-[#9A9A9A]'}`}>
                              {section.label}
                            </span>
                            <AdminSelect
                              data-testid={`create-user-action-${section.key}`}
                              value={getActionPermissionLevel(permissionLevel)}
                              disabled={!isVisible}
                              onChange={(e) =>
                                updateNewUserAction(
                                  section.key,
                                  ((e.target.value as Exclude<AdminPermissionLevel, 'none'>) || 'view')
                                )
                              }
                            >
                              <option value="view">{getPermissionLabel('view')}</option>
                              <option value="manage">{getPermissionLabel('manage')}</option>
                            </AdminSelect>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                  <p className="lg:col-span-2 mt-2 font-['Outfit'] text-[12px] text-[#535353]">{t('create.permissionsHelp')}</p>
                </div>
              )}
              <AdminButton onClick={createUser}>
                {t('create.submit')}
              </AdminButton>
            </div>
          </div>
        </div>

        {/* Discounts */}
        <div className="border border-[#E1E1E1] rounded-[24px] p-[clamp(16px,2vw,24px)] bg-[#EAEAEA]">
          <AdminSectionTitle>{t('discounts.title')}</AdminSectionTitle>
          <p className="mt-[8px] font-['Outfit'] text-[14px] text-[#535353]">{t('discounts.help')}</p>

          <div className="mt-4 grid grid-cols-1 gap-3">
            <div>
              <AdminLabel className="mb-[6px]">{t('discounts.role')}</AdminLabel>
              <AdminSelect value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)}>
              {roles.map((r) => (
                <option key={r} value={r}>
                  {getRoleLabel(r)}
                </option>
              ))}
              </AdminSelect>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <AdminLabel className="mb-[6px]">{t('discounts.type')}</AdminLabel>
                <AdminSelect
                  value={discountType}
                  onChange={(e) => setDiscountType(e.target.value === 'fixed' ? 'fixed' : 'percent')}
                >
                  <option value="percent">{t('discounts.types.percent')}</option>
                  <option value="fixed">{t('discounts.types.fixed')}</option>
                </AdminSelect>
              </div>
              <div>
                <AdminLabel className="mb-[6px]">
                  {discountType === 'percent' ? t('discounts.valuePercent') : t('discounts.valueFixed')}
                </AdminLabel>
                <AdminInput
                  value={discountValue}
                  onChange={(e) => setDiscountValue(e.target.value)}
                  inputMode="decimal"
                />
              </div>
            </div>

            <label className="flex items-center gap-2 font-['DM_Sans'] text-sm text-[#161616]">
              <input
                type="checkbox"
                checked={discountActive}
                onChange={(e) => setDiscountActive(e.target.checked)}
              />
              {t('discounts.active')}
            </label>

            <div className="mt-3 pt-4 border-t border-[#E1E1E1]">
              <div className="font-['DM_Sans'] text-[18px] font-medium text-[#161616]">{t('discounts.createRole.title')}</div>

              <div className="mt-3 grid grid-cols-1 gap-3">
                <AdminLabel>{t('discounts.createRole.label')}</AdminLabel>

                <div className="flex flex-col sm:flex-row gap-3">
                  <AdminInput
                    value={newRoleName}
                    onChange={(e) => {
                      setNewRoleName(e.target.value)
                      setCreateRoleError(null)
                      setCreateRoleInfo(null)
                    }}
                    placeholder={t('discounts.createRole.placeholder')}
                  />

                  <AdminButton
                    type="button"
                    size="md"
                    onClick={createRole}
                    disabled={isCreatingRole || !isValidRoleName(normalizeRoleName(newRoleName))}
                  >
                    {t('discounts.createRole.button')}
                  </AdminButton>
                </div>

                {createRoleError && (
                  <div className="font-['DM_Sans'] text-sm text-red-700">{createRoleError}</div>
                )}
                {createRoleInfo && (
                  <div className="font-['DM_Sans'] text-sm text-[#535353]">{createRoleInfo}</div>
                )}
              </div>
            </div>

            <AdminButton type="button" onClick={saveDiscount}>
              {t('discounts.save')}
            </AdminButton>

            <AdminButton type="button" variant="outline" onClick={loadAll}>
              {t('refresh')}
            </AdminButton>
          </div>
        </div>
      </div>
    </AdminStack>
  )
}
