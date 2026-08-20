'use client'

import type { ReactNode } from 'react'
import { trackPortfolioEvent } from '@/lib/analytics/track'
import type { PortfolioEventContext, PortfolioEventName } from '@/lib/analytics/events'

type TrackedLinkProps = {
  event: PortfolioEventName
  context?: PortfolioEventContext
  children: ReactNode
}

export function TrackedLink({ event, context, children }: TrackedLinkProps) {
  return (
    <span
      onClick={() => {
        trackPortfolioEvent(event, context)
      }}
    >
      {children}
    </span>
  )
}
