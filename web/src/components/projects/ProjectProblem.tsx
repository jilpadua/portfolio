import type { Project } from '@/lib/sanity/types'

type ProjectProblemProps = {
  project: Project
}

export function ProjectProblem({ project }: ProjectProblemProps) {
  if (!project.problem) return null

  return (
    <section id="problem" className="case-study-section section-padding border-b border-border">
      <div className="container-main max-w-3xl">
        <h2 className="mono-label mb-4">Problem</h2>
        <p className="text-lg leading-relaxed text-muted">{project.problem}</p>
      </div>
    </section>
  )
}
