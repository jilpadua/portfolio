import type { TechnicalChallenge } from '@/lib/sanity/types'

type TechnicalChallengesProps = {
  challenges?: TechnicalChallenge[]
}

export function TechnicalChallenges({ challenges }: TechnicalChallengesProps) {
  if (!challenges?.length) return null

  return (
    <section className="section-padding border-b border-border bg-surface/60">
      <div className="container-main max-w-3xl">
        <h2 className="mono-label mb-8">Engineering challenges</h2>
        <div className="space-y-10">
          {challenges.map((challenge, index) => {
            const hasContent =
              challenge.problem ||
              challenge.investigation ||
              challenge.solution ||
              challenge.result
            if (!hasContent) return null

            return (
              <article key={challenge.title ?? index} className="border-t border-border pt-8">
                {challenge.title && (
                  <h3 className="text-xl font-semibold tracking-tight">{challenge.title}</h3>
                )}
                <div className="mt-5 space-y-5">
                  {challenge.problem && (
                    <div>
                      <p className="mono-label mb-2">The problem</p>
                      <p className="leading-relaxed text-muted">{challenge.problem}</p>
                    </div>
                  )}
                  {challenge.investigation && (
                    <div>
                      <p className="mono-label mb-2">The investigation</p>
                      <p className="leading-relaxed text-muted">{challenge.investigation}</p>
                    </div>
                  )}
                  {challenge.solution && (
                    <div>
                      <p className="mono-label mb-2">The solution</p>
                      <p className="leading-relaxed text-muted">{challenge.solution}</p>
                    </div>
                  )}
                  {challenge.result && (
                    <div>
                      <p className="mono-label mb-2">The result</p>
                      <p className="leading-relaxed text-muted">{challenge.result}</p>
                    </div>
                  )}
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
