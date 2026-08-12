import { ProjectCard } from '@/components/projects/ProjectCard'
import { SectionHeading } from '@/components/ui/SectionHeading'
import type { ProjectCard as ProjectCardType } from '@/lib/sanity/types'

type SelectedWorkProps = {
  projects: ProjectCardType[]
}

export function SelectedWork({ projects }: SelectedWorkProps) {
  if (!projects.length) return null

  return (
    <section id="work" className="section-padding border-t border-border">
      <div className="container-main">
        <SectionHeading
          eyebrow="Portfolio"
          title="Selected Work"
          description="Projects where I contributed to real systems, applications, APIs, or product functionality."
        />
        <div className="border-b border-border">
          {projects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}
