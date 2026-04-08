import crypto from 'crypto'

const SECRET_CANDIDATE_ENV_KEYS = [
  'PRICING_QUOTE_TOKEN_SECRET',
  'SUPABASE_SERVICE_ROLE_KEY',
] as const

function getSecret(): string | null {
  for (const key of SECRET_CANDIDATE_ENV_KEYS) {
    const value = process.env[key]
    if (typeof value === 'string' && value.trim().length > 0) {
      return value.trim()
    }
  }

  return null
}

export function hasQuoteTokenSecret(): boolean {
  return getSecret() !== null
}

export function hashQuoteToken(token: string): string {
  const secret = getSecret()
  if (!secret) {
    throw new Error('PRICING_QUOTE_TOKEN_SECRET is required')
  }
  return crypto.createHmac('sha256', secret).update(token).digest('hex')
}

export function generateQuoteToken(): string {
  const raw = crypto.randomBytes(32)
  return raw.toString('base64url')
}

export function getQuoteTtlMinutes(): number {
  const raw = process.env.PRICING_QUOTE_TTL_MINUTES
  const parsed = raw ? Number(raw) : NaN
  if (Number.isFinite(parsed) && parsed > 0 && parsed <= 180) return Math.round(parsed)
  return 30
}
