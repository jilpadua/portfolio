import { isNotifyEvent, type NotifyEventName, type PortfolioEventContext } from '@/lib/analytics/events'

export const MAX_NOTIFY_BODY_BYTES = 2048
export const MAX_PATH_LENGTH = 200
export const MAX_SLUG_LENGTH = 80
export const MAX_TITLE_LENGTH = 120

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/i

export type ValidatedNotifyPayload = {
  event: NotifyEventName
  path: string
  context: PortfolioEventContext
}

export type ValidateResult =
  | { ok: true; payload: ValidatedNotifyPayload }
  | { ok: false }

function stripControlChars(value: string): string {
  return value.replace(/[\u0000-\u001F\u007F]/g, '').trim()
}

function sanitizePath(value: unknown): string | null {
  if (typeof value !== 'string') return null
  const path = stripControlChars(value)
  if (!path.startsWith('/')) return null
  if (path.length > MAX_PATH_LENGTH) return null
  if (path.includes('://') || path.includes('\\')) return null
  return path
}

function sanitizeSlug(value: unknown): string | undefined {
  if (typeof value !== 'string' || value.length === 0) return undefined
  const slug = stripControlChars(value)
  if (slug.length > MAX_SLUG_LENGTH) return undefined
  if (!SLUG_PATTERN.test(slug)) return undefined
  return slug
}

function sanitizeTitle(value: unknown): string | undefined {
  if (typeof value !== 'string' || value.length === 0) return undefined
  const title = stripControlChars(value)
  if (!title) return undefined
  return title.slice(0, MAX_TITLE_LENGTH)
}

export function validateNotifyPayload(input: unknown): ValidateResult {
  if (!input || typeof input !== 'object') return { ok: false }

  const record = input as Record<string, unknown>
  if (typeof record.event !== 'string' || !isNotifyEvent(record.event)) {
    return { ok: false }
  }

  const path = sanitizePath(record.path)
  if (!path) return { ok: false }

  const rawContext =
    record.context && typeof record.context === 'object'
      ? (record.context as Record<string, unknown>)
      : {}

  const context: PortfolioEventContext = {}
  const projectSlug = sanitizeSlug(rawContext.projectSlug)
  const projectTitle = sanitizeTitle(rawContext.projectTitle)
  if (projectSlug) context.projectSlug = projectSlug
  if (projectTitle) context.projectTitle = projectTitle

  return {
    ok: true,
    payload: {
      event: record.event,
      path,
      context,
    },
  }
}
