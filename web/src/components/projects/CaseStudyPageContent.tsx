import { CaseStudyNav } from '@/components/projects/CaseStudyNav'
import { ProjectHero } from '@/components/projects/ProjectHero'
import { ProjectOverview } from '@/components/projects/ProjectOverview'
import { ProjectProblem } from '@/components/projects/ProjectProblem'
import { ProjectContribution } from '@/components/projects/ProjectContribution'
import { ProjectStack } from '@/components/projects/ProjectStack'
import { ArchitectureSection } from '@/components/projects/ArchitectureSection'
import { ProjectImplementation } from '@/components/projects/ProjectImplementation'
import { TechnicalChallenges } from '@/components/projects/TechnicalChallenges'
import { ProjectOutcome } from '@/components/projects/ProjectOutcome'
import { ProjectNavigation } from '@/components/projects/ProjectNavigation'
import { CaseStudyViewTracker } from '@/components/analytics/CaseStudyViewTracker'
import { getCaseStudySections } from '@/lib/case-study'
import type { Project } from '@/lib/sanity/types'

type CaseStudyPageContentProps = {
  project: Project
  navProjects: { title: string; slug: string }[]
  currentSlug: string
}

export function CaseStudyPageContent({
  project,
  navProjects,
  currentSlug,
}: CaseStudyPageContentProps) {
  const sections = getCaseStudySections(project)

  return (
    <>
      <CaseStudyViewTracker projectTitle={project.title} projectSlug={currentSlug} />
      <ProjectHero project={project} />
      <CaseStudyNav sections={sections} />
      <ProjectOverview project={project} />
      <ProjectProblem project={project} />
      <ProjectContribution project={project} />
      <ProjectStack project={project} />
      <ArchitectureSection project={project} />
      <ProjectImplementation
        implementation={project.implementation}
        decisions={project.technicalDecisions}
      />
      <TechnicalChallenges challenges={project.technicalChallenges} />
      <ProjectOutcome project={project} />
      <ProjectNavigation currentSlug={currentSlug} projects={navProjects} />
    </>
  )
}
