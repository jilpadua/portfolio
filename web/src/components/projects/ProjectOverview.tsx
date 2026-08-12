import type { Project } from '@/lib/sanity/types'

type ProjectOverviewProps = {
  project: Project
}

export function ProjectOverview({ project }: ProjectOverviewProps) {
  const hasContent = project.overview || project.problem || project.audience
  if (!hasContent) return null

  return (
    <section className="section-padding border-b border-border">
      <div className="container-main max-w-3xl">
        <h2 className="mono-label mb-4">Overview</h2>
        {project.overview && (
          <p className="text-lg leading-relaxed text-muted">{project.overview}</p>
        )}
        {project.problem && (
          <div className="mt-8">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground">
              Problem
            </h3>
            <p className="mt-2 leading-relaxed text-muted">{project.problem}</p>
          </div>
        )}
        {project.audience && (
          <div className="mt-8">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground">
              Who uses it
            </h3>
            <p className="mt-2 leading-relaxed text-muted">{project.audience}</p>
          </div>
        )}
      </div>
    </section>
  )
}
