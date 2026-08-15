'use client'

import { useState } from 'react'
import type { ImplementationSection, TechnicalDecision } from '@/lib/sanity/types'

type ProjectImplementationProps = {
  implementation?: ImplementationSection[]
  decisions?: TechnicalDecision[]
}

export function ProjectImplementation({
  implementation,
  decisions,
}: ProjectImplementationProps) {
  const hasImplementation = implementation?.some(
    (section) => section.title || section.summary || section.steps?.length,
  )
  const hasDecisions = decisions?.some((decision) => decision.title || decision.rationale)

  if (!hasImplementation && !hasDecisions) return null

  return (
    <section id="implementation" className="case-study-section section-padding border-b border-border">
      <div className="container-main max-w-3xl">
        <h2 className="mono-label mb-8">Implementation</h2>

        {hasImplementation && (
          <div className="space-y-4">
            {implementation?.map((section, index) => {
              if (!section.title && !section.summary && !section.steps?.length) return null
              return (
                <ImplementationBlock
                  key={section.title ?? index}
                  section={section}
                  index={index}
                />
              )
            })}
          </div>
        )}

        {hasDecisions && (
          <div className={hasImplementation ? 'mt-10 space-y-6' : 'space-y-6'}>
            {decisions?.map((decision, index) => {
              if (!decision.title && !decision.rationale) return null
              return (
                <article key={decision.title ?? index}>
                  {decision.title && (
                    <h3 className="text-lg font-semibold">{decision.title}</h3>
                  )}
                  {decision.rationale && (
                    <p className="mt-2 leading-relaxed text-muted">{decision.rationale}</p>
                  )}
                </article>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}

function ImplementationBlock({
  section,
  index,
}: {
  section: ImplementationSection
  index: number
}) {
  const [expanded, setExpanded] = useState(false)
  const hasSteps = Boolean(section.steps?.length)
  const panelId = `implementation-panel-${index}`

  return (
    <article className="border-t border-border pt-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          {section.title && <h3 className="text-lg font-semibold">{section.title}</h3>}
          {section.summary && (
            <p className="mt-2 leading-relaxed text-muted">{section.summary}</p>
          )}
        </div>
        {hasSteps && (
          <button
            type="button"
            className="rounded-md border border-border bg-surface px-3 py-1.5 text-sm transition-colors hover:bg-background"
            aria-expanded={expanded}
            aria-controls={panelId}
            onClick={() => setExpanded((value) => !value)}
          >
            {expanded ? 'Collapse' : 'Expand'}
          </button>
        )}
      </div>
      {hasSteps && expanded && (
        <ul id={panelId} className="mt-4 space-y-2 text-sm leading-relaxed text-muted">
          {section.steps?.map((step) => (
            <li key={step} className="flex gap-2">
              <span className="text-accent" aria-hidden="true">
                •
              </span>
              <span>{step}</span>
            </li>
          ))}
        </ul>
      )}
    </article>
  )
}
