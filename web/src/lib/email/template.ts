import { EVENT_LABELS, EVENT_NOTES } from '@/lib/analytics/events'
import type { NotificationMeta } from '@/lib/notifications/request-meta'

export function sanitizeHeaderValue(value: string): string {
  return value.replace(/[\r\n]+/g, ' ').trim().slice(0, 200)
}

function formatTimestamp(date: Date): string {
  const datePart = date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  })
  const timePart = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    timeZone: 'UTC',
  })
  return `${datePart} — ${timePart} UTC`
}

export function buildNotificationEmail(meta: NotificationMeta): { subject: string; text: string } {
  const label = EVENT_LABELS[meta.event]
  const subject = sanitizeHeaderValue(`Portfolio Activity — ${label}`)
  const note = EVENT_NOTES[meta.event]

  const lines = [
    'Portfolio Activity Detected',
    '',
    `Event: ${label}`,
  ]

  if (meta.projectTitle) {
    lines.push(`Project: ${sanitizeHeaderValue(meta.projectTitle)}`)
  }

  lines.push(
    `Page: ${sanitizeHeaderValue(meta.path)}`,
    `Time: ${formatTimestamp(meta.occurredAt)}`,
    `Device: ${sanitizeHeaderValue(meta.device)}`,
    `Browser: ${sanitizeHeaderValue(meta.browser)}`,
  )

  if (meta.country) {
    lines.push(`Country: ${sanitizeHeaderValue(meta.country)}`)
  }

  if (note) {
    lines.push('', note)
  }

  return { subject, text: lines.join('\n') }
}
