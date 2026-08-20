import { createHash } from 'node:crypto'
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'
import type { NotifyEventName } from '@/lib/analytics/events'

const THIRTY_MINUTES_MS = 30 * 60 * 1000
const SIX_HOURS_MS = 6 * 60 * 60 * 1000
const ONE_HOUR_MS = 60 * 60 * 1000
const ONE_DAY_MS = 24 * 60 * 60 * 1000

type RateLimitCheck = {
  key: string
  max: number
  windowMs: number
}

type MemoryEntry = {
  timestamps: number[]
}

const memoryStore = new Map<string, MemoryEntry>()

function hashIdentifier(value: string): string {
  const secret = process.env.NOTIFICATION_RATE_LIMIT_SECRET || 'dev-rate-limit-secret'
  return createHash('sha256').update(`${secret}:${value}`).digest('hex').slice(0, 16)
}

export function getRequestIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) {
    const first = forwarded.split(',')[0]?.trim()
    if (first) return first
  }
  const realIp = request.headers.get('x-real-ip')?.trim()
  if (realIp) return realIp
  return 'unknown'
}

export function hashIp(ip: string): string {
  return hashIdentifier(ip)
}

function buildChecks(hashedIp: string, event: NotifyEventName, contextKey: string): RateLimitCheck[] {
  const eventWindowMs = event === 'recruiter_mode_entered' ? SIX_HOURS_MS : THIRTY_MINUTES_MS

  return [
    {
      key: `evt:${hashedIp}:${event}:${contextKey}`,
      max: 1,
      windowMs: eventWindowMs,
    },
    {
      key: `ip-hour:${hashedIp}`,
      max: 5,
      windowMs: ONE_HOUR_MS,
    },
    {
      key: `ip-day:${hashedIp}`,
      max: 12,
      windowMs: ONE_DAY_MS,
    },
    {
      key: 'global-hour',
      max: 20,
      windowMs: ONE_HOUR_MS,
    },
    {
      key: 'global-day',
      max: 60,
      windowMs: ONE_DAY_MS,
    },
  ]
}

function windowLabel(windowMs: number): `${number} ${'s' | 'm' | 'h' | 'd'}` {
  if (windowMs === SIX_HOURS_MS) return '6 h'
  if (windowMs === THIRTY_MINUTES_MS) return '30 m'
  if (windowMs === ONE_HOUR_MS) return '1 h'
  if (windowMs === ONE_DAY_MS) return '1 d'
  return `${Math.max(1, Math.ceil(windowMs / 1000))} s`
}

function allowMemory(check: RateLimitCheck): boolean {
  const now = Date.now()
  const entry = memoryStore.get(check.key) ?? { timestamps: [] }
  entry.timestamps = entry.timestamps.filter((timestamp) => now - timestamp < check.windowMs)
  if (entry.timestamps.length >= check.max) {
    memoryStore.set(check.key, entry)
    return false
  }
  entry.timestamps.push(now)
  memoryStore.set(check.key, entry)
  return true
}

function hasUpstash(): boolean {
  return Boolean(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN)
}

let redis: Redis | null | undefined

function getRedis(): Redis | null {
  if (redis !== undefined) return redis
  if (!hasUpstash()) {
    redis = null
    return null
  }
  redis = Redis.fromEnv()
  return redis
}

const upstashLimiters = new Map<string, Ratelimit>()

function getUpstashLimiter(check: RateLimitCheck): Ratelimit | null {
  const client = getRedis()
  if (!client) return null

  const limiterKey = `${check.max}:${check.windowMs}`
  const existing = upstashLimiters.get(limiterKey)
  if (existing) return existing

  const limiter = new Ratelimit({
    redis: client,
    limiter: Ratelimit.slidingWindow(check.max, windowLabel(check.windowMs)),
    prefix: 'portfolio-notify',
    analytics: false,
  })
  upstashLimiters.set(limiterKey, limiter)
  return limiter
}

async function allowUpstash(check: RateLimitCheck): Promise<boolean> {
  const limiter = getUpstashLimiter(check)
  if (!limiter) return allowMemory(check)
  const result = await limiter.limit(check.key)
  return result.success
}

export async function allowNotification(options: {
  ip: string
  event: NotifyEventName
  contextKey: string
}): Promise<boolean> {
  const hashedIp = hashIp(options.ip)
  const checks = buildChecks(hashedIp, options.event, options.contextKey)
  const useUpstash = hasUpstash()

  for (const check of checks) {
  try {
    const allowed = useUpstash ? await allowUpstash(check) : allowMemory(check)
    if (!allowed) return false
  } catch {
    return false
  }
  }

  return true
}
