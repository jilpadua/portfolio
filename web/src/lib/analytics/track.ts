'use client'

import { track } from '@vercel/analytics'
import {
  isNotifyEvent,
  type PortfolioEventContext,
  type PortfolioEventName,
} from '@/lib/analytics/events'

export function trackPortfolioEvent(
  event: PortfolioEventName,
  context?: PortfolioEventContext,
) {
  const path = typeof window !== 'undefined' ? window.location.pathname || '/' : '/'

  try {
    const properties: Record<string, string> = { path }
    if (context?.projectSlug) properties.projectSlug = context.projectSlug
    if (context?.projectTitle) properties.projectTitle = context.projectTitle
    track(event, properties)
  } catch {
    // Analytics must never block the UI.
  }

  if (!isNotifyEvent(event)) return

  try {
    const payload: {
      event: PortfolioEventName
      path: string
      context?: PortfolioEventContext
    } = { event, path }

    if (context?.projectSlug || context?.projectTitle) {
      payload.context = {}
      if (context.projectSlug) payload.context.projectSlug = context.projectSlug
      if (context.projectTitle) payload.context.projectTitle = context.projectTitle
    }

    void fetch('/api/portfolio-notify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => {})
  } catch {
    // Notification failure must never block the UI.
  }
}
