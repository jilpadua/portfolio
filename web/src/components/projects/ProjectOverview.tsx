import type { Project } from '@/lib/sanity/types'

type ProjectOverviewProps = {
  project: Project
}

export function ProjectOverview({ project }: ProjectOverviewProps) {
  if (!project.overview && !project.audience) return null

  return (
    <section id="overview" className="case-study-section section-padding border-b border-border">
      <div className="container-main max-w-3xl">
        <h2 className="mono-label mb-4">Overview</h2>
        {project.overview && (
          <p className="text-lg leading-relaxed text-muted">{project.overview}</p>
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
