import { SectionHeading } from '@/components/ui/SectionHeading'
import type { About as AboutType } from '@/lib/sanity/types'

type AboutProps = {
  about: AboutType | null
}

export function About({ about }: AboutProps) {
  if (!about) return null

  return (
    <section id="about" className="section-padding border-t border-border">
      <div className="container-main">
        <SectionHeading
          eyebrow="Background"
          title={about.headline ?? 'About'}
          description={about.summary}
        />
        {about.focusPoints?.length ? (
          <ul className="max-w-2xl space-y-2 text-base leading-relaxed text-muted">
            {about.focusPoints.map((point) => (
              <li key={point} className="flex gap-2">
                <span className="text-accent" aria-hidden="true">
                  —
                </span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  )
}
