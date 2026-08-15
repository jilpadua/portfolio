import type { Project } from '@/lib/sanity/types'

type ProjectOutcomeProps = {
  project: Project
}

export function ProjectOutcome({ project }: ProjectOutcomeProps) {
  if (!project.outcomes?.length) return null

  return (
    <section id="outcome" className="case-study-section section-padding border-b border-border">
      <div className="container-main max-w-3xl">
        <h2 className="mono-label mb-4">Outcome</h2>
        <ul className="space-y-2 text-base leading-relaxed text-muted">
          {project.outcomes.map((outcome) => (
            <li key={outcome} className="flex gap-2">
              <span className="text-accent" aria-hidden="true">
                •
              </span>
              <span>{outcome}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
