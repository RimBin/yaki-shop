import type { CartItem } from '@/lib/cart/store'

type CartLocale = string

function getNumberLocale(locale: CartLocale): string {
  return locale === 'en' ? 'en-US' : 'lt-LT'
}

function formatNumber(value: number, locale: CartLocale, minimumFractionDigits = 0, maximumFractionDigits = 2): string {
  return new Intl.NumberFormat(getNumberLocale(locale), {
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(value)
}

function isFinitePositiveNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value) && value > 0
}

export function getCartItemAreaM2(item: CartItem): number | null {
  if (item.inputMode !== 'area') return null

  if (isFinitePositiveNumber(item.pricingSnapshot?.totalAreaM2)) {
    return item.pricingSnapshot.totalAreaM2
  }

  if (isFinitePositiveNumber(item.targetAreaM2)) {
    return item.targetAreaM2
  }

  return isFinitePositiveNumber(item.quantity) ? item.quantity : null
}

export function getCartItemBoardCount(item: CartItem): number | null {
  if (item.inputMode !== 'area') {
    return isFinitePositiveNumber(item.quantity) ? Math.max(1, Math.round(item.quantity)) : null
  }

  if (isFinitePositiveNumber(item.pricingSnapshot?.unitAreaM2) && isFinitePositiveNumber(item.pricingSnapshot?.totalAreaM2)) {
    return Math.max(1, Math.round(item.pricingSnapshot.totalAreaM2 / item.pricingSnapshot.unitAreaM2))
  }

  return null
}

export function formatAreaM2(value: number, locale: CartLocale, compact = false): string {
  return `${formatNumber(value, locale, 0, 2)}${compact ? '' : ' '}m²`
}

export function formatBoardCount(value: number, locale: CartLocale): string {
  const unit = locale === 'en' ? 'pcs' : 'vnt.'
  return `${formatNumber(value, locale, 0, 0)} ${unit}`
}

export function formatCartItemQuantity(item: CartItem, locale: CartLocale): string {
  const areaM2 = getCartItemAreaM2(item)
  if (areaM2 !== null) {
    return formatAreaM2(areaM2, locale)
  }

  return formatBoardCount(Math.max(1, Math.round(item.quantity)), locale)
}

export function formatCartItemQuantityWithBoards(item: CartItem, locale: CartLocale): string {
  const areaM2 = getCartItemAreaM2(item)
  if (areaM2 === null) {
    return formatBoardCount(Math.max(1, Math.round(item.quantity)), locale)
  }

  const boards = getCartItemBoardCount(item)
  if (boards === null) {
    return formatAreaM2(areaM2, locale)
  }

  return `${formatAreaM2(areaM2, locale)} (${formatBoardCount(boards, locale)})`
}

export function getCartBadgeText(items: CartItem[], locale: CartLocale): string | null {
  if (items.length === 0) return null

  const allArea = items.every((item) => item.inputMode === 'area')
  if (allArea) {
    const totalArea = items.reduce((sum, item) => sum + (getCartItemAreaM2(item) ?? 0), 0)
    if (totalArea > 0) {
      return formatAreaM2(totalArea, locale, true)
    }
  }

  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0)
  const maximumFractionDigits = Number.isInteger(totalQuantity) ? 0 : 2
  return formatNumber(totalQuantity, locale, 0, maximumFractionDigits)
}