import { CATEGORY_LABELS } from '@/lib/utils'
import type { Project } from '@/lib/sanity/types'

type ProjectStackProps = {
  project: Project
}

export function ProjectStack({ project }: ProjectStackProps) {
  if (!project.techGroups?.length) return null

  return (
    <section id="technologies" className="case-study-section section-padding border-b border-border">
      <div className="container-main max-w-3xl">
        <h2 className="mono-label mb-6">Technologies</h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {project.techGroups.map((group, index) => (
            <div key={`${group.category}-${index}`}>
              <h3 className="text-sm font-semibold uppercase tracking-wide">
                {CATEGORY_LABELS[group.category] ?? group.category}
              </h3>
              <p className="mt-2 font-mono text-sm text-muted">
                {group.technologies?.join(' · ')}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
