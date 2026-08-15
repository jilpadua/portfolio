'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { FOCUS_AREA_LABELS } from '@/lib/case-study'
import { flattenTechnologies } from '@/lib/utils'
import type { FocusArea, ProjectCard } from '@/lib/sanity/types'

const FILTER_OPTIONS: Array<{ id: 'all' | FocusArea; label: string }> = [
  { id: 'all', label: 'All' },
  { id: 'backend', label: 'Backend' },
  { id: 'api', label: 'APIs' },
  { id: 'database', label: 'Databases' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'mobile', label: 'Mobile' },
]

type RecruiterProjectsProps = {
  projects: ProjectCard[]
}

export function RecruiterProjects({ projects }: RecruiterProjectsProps) {
  const [activeFilter, setActiveFilter] = useState<'all' | FocusArea>('all')

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'all') return projects
    return projects.filter((project) => project.focusAreas?.includes(activeFilter))
  }, [activeFilter, projects])

  if (!projects.length) return null

  return (
    <section id="recruiter-projects" className="section-padding border-b border-border">
      <div className="container-main">
        <h2 className="mono-label mb-2">Best projects</h2>
        <p className="max-w-2xl text-base text-muted">
          Projects selected for backend, API, and integration work.
        </p>

        <div
          className="mt-6 flex flex-wrap gap-2"
          role="toolbar"
          aria-label="Filter projects by technical focus"
        >
          {FILTER_OPTIONS.map((filter) => {
            const isActive = activeFilter === filter.id
            return (
              <button
                key={filter.id}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActiveFilter(filter.id)}
                className={`rounded-md border px-3 py-1.5 text-sm transition-colors duration-200 motion-reduce:transition-none ${
                  isActive
                    ? 'border-accent bg-accent text-white'
                    : 'border-border bg-surface text-muted hover:text-foreground'
                }`}
              >
                {filter.label}
              </button>
            )
          })}
        </div>

        <div className="mt-8 border-t border-border">
          {filteredProjects.length === 0 ? (
            <p className="py-10 text-sm text-muted">
              No projects match this filter yet.
            </p>
          ) : (
            filteredProjects.map((project) => (
              <RecruiterProjectCard key={project._id} project={project} />
            ))
          )}
        </div>
      </div>
    </section>
  )
}

function RecruiterProjectCard({ project }: { project: ProjectCard }) {
  const techLine = flattenTechnologies(project.techGroups)
  const focusLine = project.focusAreas
    ?.map((area) => FOCUS_AREA_LABELS[area] ?? area)
    .join(' · ')

  return (
    <article className="project-row border-t border-border first:border-t-0">
      <div className="grid gap-4 py-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-start">
        <div>
          <p className="mono-label mb-2">{project.tagline}</p>
          <h3 className="text-2xl font-semibold tracking-tight">{project.title}</h3>
          {project.shortDescription && (
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">
              {project.shortDescription}
            </p>
          )}
          {focusLine && (
            <div className="mt-4">
              <p className="mono-label mb-2">Demonstrates</p>
              <p className="text-sm text-muted">{focusLine}</p>
            </div>
          )}
          {techLine && (
            <div className="mt-4">
              <p className="mono-label mb-2">Technologies</p>
              <p className="font-mono text-xs tracking-wide text-muted">{techLine}</p>
            </div>
          )}
        </div>
        <Link
          href={`/projects/${project.slug}`}
          className="inline-flex items-center text-sm font-medium text-accent hover:underline"
        >
          View case study →
        </Link>
      </div>
    </article>
  )
}
