import { SectionHeading } from '@/components/ui/SectionHeading'
import { formatDateRange } from '@/lib/utils'
import type { Experience as ExperienceType } from '@/lib/sanity/types'

type ExperienceProps = {
  items: ExperienceType[]
}

export function Experience({ items }: ExperienceProps) {
  if (!items.length) return null

  return (
    <section id="experience" className="section-padding border-t border-border">
      <div className="container-main">
        <SectionHeading
          eyebrow="Career"
          title="Experience"
          description="Professional roles with engineering context beyond a resume listing."
        />
        <div className="space-y-8">
          {items.map((item) => (
            <article key={item._id} className="grid gap-3 border-t border-border pt-8 md:grid-cols-[220px_1fr] md:gap-8">
              <div>
                <p className="font-mono text-xs uppercase tracking-wide text-muted">
                  {formatDateRange(item.startDate, item.endDate, item.isCurrent)}
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold">{item.role}</h3>
                <p className="mt-1 text-muted">{item.company}</p>
                {item.bullets?.length ? (
                  <ul className="mt-4 space-y-2 text-sm leading-relaxed text-muted md:text-base">
                    {item.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-2">
                        <span className="text-accent" aria-hidden="true">
                          —
                        </span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
