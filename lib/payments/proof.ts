import crypto from 'node:crypto'

type PaymentProofLevel = 'info' | 'warn' | 'error'

type PaymentProofValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | PaymentProofValue[]
  | { [key: string]: PaymentProofValue }

function hashValue(value: string): string {
  return crypto.createHash('sha256').update(value).digest('hex').slice(0, 12)
}

export function redactEmail(email: string | null | undefined): string | undefined {
  const normalized = typeof email === 'string' ? email.trim().toLowerCase() : ''
  if (!normalized) return undefined

  const domain = normalized.split('@')[1] || 'unknown'
  return `sha256:${hashValue(normalized)}@${domain}`
}

function sanitizeValue(key: string, value: PaymentProofValue, depth = 0): PaymentProofValue {
  if (value === null || value === undefined) return value

  const normalizedKey = key.toLowerCase()
  if (normalizedKey.includes('email') && typeof value === 'string') {
    return redactEmail(value) ?? '[redacted]'
  }

  if (
    normalizedKey.includes('secret') ||
    normalizedKey.includes('signature') ||
    normalizedKey.includes('password') ||
    normalizedKey.includes('token')
  ) {
    return '[redacted]'
  }

  if (typeof value === 'string') {
    return value.length > 300 ? `${value.slice(0, 300)}...` : value
  }

  if (Array.isArray(value)) {
    return depth >= 2 ? `[array:${value.length}]` : value.map((item) => sanitizeValue(key, item, depth + 1))
  }

  if (typeof value === 'object') {
    if (depth >= 2) return '[object]'

    return Object.fromEntries(
      Object.entries(value)
        .map(([childKey, childValue]) => [childKey, sanitizeValue(childKey, childValue, depth + 1)])
        .filter(([, childValue]) => childValue !== undefined)
    )
  }

  return value
}

export function listMissingEnv(requiredKeys: string[]): string[] {
  return requiredKeys.filter((key) => {
    const value = process.env[key]
    return typeof value !== 'string' || value.trim().length === 0
  })
}

export function reportMissingPaymentEnv(area: string, requiredKeys: string[]): string[] {
  const missing = listMissingEnv(requiredKeys)
  if (missing.length > 0) {
    logPaymentProof('error', 'config.missing_env', { area, missing })
  }
  return missing
}

export function logPaymentProof(
  level: PaymentProofLevel,
  event: string,
  details: Record<string, PaymentProofValue> = {}
): void {
  const payload = {
    scope: 'payment-proof',
    event,
    timestamp: new Date().toISOString(),
    ...Object.fromEntries(
      Object.entries(details)
        .map(([key, value]) => [key, sanitizeValue(key, value)])
        .filter(([, value]) => value !== undefined)
    ),
  }

  const logger = level === 'error' ? console.error : level === 'warn' ? console.warn : console.info
  logger('[payment-proof]', JSON.stringify(payload))
}