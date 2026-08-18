import type { Project } from '@/lib/sanity/types'

type ProjectContributionProps = {
  project: Project
}

export function ProjectContribution({ project }: ProjectContributionProps) {
  const hasGroups = project.contributionGroups?.some((group) => group.items?.length)
  const hasFlat = Boolean(project.contribution?.length)

  if (!project.role && !hasFlat && !hasGroups) return null

  return (
    <section
      id="contribution"
      className="case-study-section section-padding border-b border-border bg-section"
    >
      <div className="container-main max-w-3xl">
        <h2 className="mono-label mb-4">My contribution</h2>
        {project.role && (
          <p className="mb-4 text-base text-muted">
            Role: <span className="text-foreground">{project.role}</span>
          </p>
        )}

        {hasGroups ? (
          <div className="space-y-6">
            {project.contributionGroups?.map((group, index) => {
              if (!group.items?.length) return null
              return (
                <div key={group.category ?? index}>
                  {group.category && (
                    <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground">
                      {group.category}
                    </h3>
                  )}
                  <ul className="mt-2 space-y-2 text-base leading-relaxed text-muted">
                    {group.items.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="text-accent" aria-hidden="true">
                          •
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        ) : hasFlat ? (
          <ul className="space-y-2 text-base leading-relaxed text-muted">
            {project.contribution?.map((item) => (
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
