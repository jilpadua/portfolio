import type { NotifyEventName } from '@/lib/analytics/events'

export function logNotification(event: string, statusCode: number) {
  if (statusCode >= 400) {
    console.error(JSON.stringify({ event, statusCode }))
  }
}

export function isNotificationsEnabled(): boolean {
  return process.env.NOTIFICATIONS_ENABLED === 'true'
}

export function getAllowedOrigin(): string | null {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  if (!siteUrl) return null
  try {
    return new URL(siteUrl).origin
  } catch {
    return null
  }
}

function isDevelopmentHost(hostname: string): boolean {
  if (hostname === 'localhost' || hostname === '127.0.0.1') return true
  if (/^192\.168\.\d{1,3}\.\d{1,3}$/.test(hostname)) return true
  if (/^10\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(hostname)) return true
  if (/^172\.(1[6-9]|2\d|3[0-1])\.\d{1,3}\.\d{1,3}$/.test(hostname)) return true
  return false
}

export function isAllowedOrigin(request: Request): boolean {
  const origin = request.headers.get('origin')
  const referer = request.headers.get('referer')
  const allowed = getAllowedOrigin()
  const candidates = [origin, referer].filter((value): value is string => Boolean(value))

  if (process.env.NODE_ENV !== 'production') {
    if (candidates.length === 0) return true
    return candidates.some((candidate) => {
      try {
        return isDevelopmentHost(new URL(candidate).hostname)
      } catch {
        return false
      }
    })
  }

  if (!allowed || candidates.length === 0) return false

  return candidates.some((candidate) => {
    try {
      return new URL(candidate).origin === allowed
    } catch {
      return false
    }
  })
}

export function parseDevice(userAgent: string | null): { device: string; browser: string } {
  const ua = userAgent ?? ''
  const device = /Mobi|Android|iPhone|iPad|iPod/i.test(ua) ? 'Mobile' : 'Desktop'

  let browser = 'Other'
  if (/Edg\//i.test(ua)) browser = 'Edge'
  else if (/Chrome\//i.test(ua) && !/Chromium/i.test(ua)) browser = 'Chrome'
  else if (/Firefox\//i.test(ua)) browser = 'Firefox'
  else if (/Safari\//i.test(ua) && !/Chrome\//i.test(ua)) browser = 'Safari'

  return { device, browser }
}

export function getCountry(request: Request): string | undefined {
  const country = request.headers.get('x-vercel-ip-country')?.trim()
  if (!country || country.length > 8) return undefined
  if (!/^[A-Z]{2}$/i.test(country)) return undefined
  return country.toUpperCase()
}

export type NotificationMeta = {
  event: NotifyEventName
  path: string
  projectTitle?: string
  projectSlug?: string
  device: string
  browser: string
  country?: string
  occurredAt: Date
}
