import type { TechnicalChallenge } from '@/lib/sanity/types'

type TechnicalChallengesProps = {
  challenges?: TechnicalChallenge[]
}

export function TechnicalChallenges({ challenges }: TechnicalChallengesProps) {
  if (!challenges?.length) return null

  const visibleChallenges = challenges.filter(
    (challenge) =>
      challenge.problem ||
      challenge.investigation ||
      challenge.solution ||
      challenge.result,
  )

  if (!visibleChallenges.length) return null

  return (
    <section
      id="challenges"
      className="case-study-section section-padding border-b border-border bg-section"
    >
      <div className="container-main max-w-3xl">
        <h2 className="mono-label mb-8">Engineering challenges</h2>
        <div className="space-y-10">
          {visibleChallenges.map((challenge, index) => (
            <article key={challenge.title ?? index} className="border-t border-border pt-8">
              {challenge.title && (
                <h3 className="text-xl font-semibold tracking-tight">{challenge.title}</h3>
              )}
              <div className="mt-5 space-y-5">
                {challenge.problem && (
                  <div>
                    <p className="mono-label mb-2">Challenge</p>
                    <p className="leading-relaxed text-muted">{challenge.problem}</p>
                  </div>
                )}
                {challenge.investigation && (
                  <div>
                    <p className="mono-label mb-2">Investigation</p>
                    <p className="leading-relaxed text-muted">{challenge.investigation}</p>
                  </div>
                )}
                {challenge.solution && (
                  <div>
                    <p className="mono-label mb-2">Solution</p>
                    <p className="leading-relaxed text-muted">{challenge.solution}</p>
                  </div>
                )}
                {challenge.result && (
                  <div>
                    <p className="mono-label mb-2">Result</p>
                    <p className="leading-relaxed text-muted">{challenge.result}</p>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
