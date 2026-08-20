import { MAX_NOTIFY_BODY_BYTES, validateNotifyPayload } from '@/lib/notifications/validate'
import { allowNotification, getRequestIp } from '@/lib/notifications/rate-limit'
import {
  getCountry,
  isAllowedOrigin,
  isNotificationsEnabled,
  logNotification,
  parseDevice,
} from '@/lib/notifications/request-meta'
import { isSmtpConfigured, sendNotificationEmail } from '@/lib/email/send'
import { buildNotificationEmail } from '@/lib/email/template'

export const runtime = 'nodejs'
export const maxDuration = 10

const GENERIC_OK = { ok: true as const }
const GENERIC_FAIL = { ok: false as const }

function json(body: typeof GENERIC_OK | typeof GENERIC_FAIL, status: number) {
  return Response.json(body, { status })
}

export function GET() {
  return json(GENERIC_FAIL, 405)
}

export async function POST(request: Request) {
  if (!isAllowedOrigin(request)) {
    logNotification('origin_rejected', 403)
    return json(GENERIC_FAIL, 403)
  }

  const contentLength = Number(request.headers.get('content-length') ?? 0)
  if (contentLength > MAX_NOTIFY_BODY_BYTES) {
    logNotification('payload_too_large', 400)
    return json(GENERIC_FAIL, 400)
  }

  let rawBody = ''
  try {
    rawBody = await request.text()
  } catch {
    logNotification('invalid_body', 400)
    return json(GENERIC_FAIL, 400)
  }

  if (rawBody.length > MAX_NOTIFY_BODY_BYTES) {
    logNotification('payload_too_large', 400)
    return json(GENERIC_FAIL, 400)
  }

  let parsed: unknown
  try {
    parsed = JSON.parse(rawBody)
  } catch {
    logNotification('invalid_json', 400)
    return json(GENERIC_FAIL, 400)
  }

  const validated = validateNotifyPayload(parsed)
  if (!validated.ok) {
    logNotification('invalid_event', 400)
    return json(GENERIC_FAIL, 400)
  }

  const { event, path, context } = validated.payload
  const userAgent = request.headers.get('user-agent')
  if (!userAgent) {
    logNotification(event, 200)
    return json(GENERIC_OK, 200)
  }

  if (!isNotificationsEnabled()) {
    logNotification(event, 200)
    return json(GENERIC_OK, 200)
  }

  const ip = getRequestIp(request)
  const contextKey = context.projectSlug ?? ''
  const allowed = await allowNotification({ ip, event, contextKey })
  if (!allowed) {
    logNotification(event, 200)
    return json(GENERIC_OK, 200)
  }

  if (!isSmtpConfigured()) {
    logNotification(event, 200)
    return json(GENERIC_OK, 200)
  }

  const { device, browser } = parseDevice(userAgent)
  const email = buildNotificationEmail({
    event,
    path,
    projectTitle: context.projectTitle,
    projectSlug: context.projectSlug,
    device,
    browser,
    country: getCountry(request),
    occurredAt: new Date(),
  })

  try {
    await sendNotificationEmail(email)
  } catch {
    logNotification(event, 500)
    return json(GENERIC_OK, 200)
  }

  logNotification(event, 200)
  return json(GENERIC_OK, 200)
}
