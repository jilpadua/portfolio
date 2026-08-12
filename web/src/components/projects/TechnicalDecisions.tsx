import type { TechnicalDecision } from '@/lib/sanity/types'

type TechnicalDecisionsProps = {
  decisions?: TechnicalDecision[]
}

export function TechnicalDecisions({ decisions }: TechnicalDecisionsProps) {
  if (!decisions?.length) return null

  return (
    <section className="section-padding border-b border-border">
      <div className="container-main max-w-3xl">
        <h2 className="mono-label mb-8">Technical decisions</h2>
        <div className="space-y-6">
          {decisions.map((decision, index) => {
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
      </div>
    </section>
  )
}
