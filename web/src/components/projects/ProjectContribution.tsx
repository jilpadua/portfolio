import type { Project } from '@/lib/sanity/types'

type ProjectContributionProps = {
  project: Project
}

export function ProjectContribution({ project }: ProjectContributionProps) {
  if (!project.contribution?.length && !project.role) return null

  return (
    <section className="section-padding border-b border-border bg-surface/60">
      <div className="container-main max-w-3xl">
        <h2 className="mono-label mb-4">My contribution</h2>
        {project.role && (
          <p className="mb-4 text-base text-muted">
            Role: <span className="text-foreground">{project.role}</span>
          </p>
        )}
        {project.contribution?.length ? (
          <ul className="space-y-2 text-base leading-relaxed text-muted">
            {project.contribution.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="text-accent" aria-hidden="true">
                  •
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  )
}
