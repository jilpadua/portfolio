'use client'

import { Hero } from '@/components/home/Hero'
import { SelectedWork } from '@/components/home/SelectedWork'
import { Experience } from '@/components/home/Experience'
import { EngineeringFocus } from '@/components/home/EngineeringFocus'
import { About } from '@/components/home/About'
import { Contact } from '@/components/home/Contact'
import { RecruiterHero, RecruiterQuickProfile } from '@/components/recruiter/RecruiterHero'
import { RecruiterProjects } from '@/components/recruiter/RecruiterProjects'
import { RecruiterCta } from '@/components/recruiter/RecruiterCta'
import { useRecruiterMode } from '@/components/recruiter/RecruiterModeProvider'
import type {
  About as AboutType,
  Experience as ExperienceType,
  ProjectCard,
  SiteSettings,
  SkillGroup,
} from '@/lib/sanity/types'

type HomeViewProps = {
  settings: SiteSettings | null
  projects: ProjectCard[]
  experience: ExperienceType[]
  skillGroups: SkillGroup[]
  about: AboutType | null
  initialUrlMode?: string | null
}

function resolveInitialRecruiterView(initialUrlMode?: string | null): boolean | null {
  if (initialUrlMode === 'recruiter') return true
  if (initialUrlMode !== null && initialUrlMode !== undefined) return false
  return null
}

export function HomeView({
  settings,
  projects,
  experience,
  skillGroups,
  about,
  initialUrlMode,
}: HomeViewProps) {
  const { isRecruiterMode, isReady } = useRecruiterMode()
  const serverRecruiterHint = resolveInitialRecruiterView(initialUrlMode)

  const showRecruiterMode = isReady
    ? isRecruiterMode
    : serverRecruiterHint !== null
      ? serverRecruiterHint
      : false

  if (!isReady && serverRecruiterHint === null) {
    return (
      <div
        className="min-h-[60vh]"
        aria-busy="true"
        aria-label="Loading profile view"
      />
    )
  }

  if (showRecruiterMode) {
    const recruiterProjects = projects.filter((project) => project.featuredForRecruiters)

    return (
      <>
        <RecruiterHero settings={settings} experience={experience} skillGroups={skillGroups} />
        <RecruiterQuickProfile
          settings={settings}
          experience={experience}
          skillGroups={skillGroups}
        />
        <Experience items={experience} />
        <RecruiterProjects projects={recruiterProjects.length ? recruiterProjects : projects} />
        <RecruiterCta settings={settings} />
        <Contact settings={settings} />
      </>
    )
  }

  return (
    <>
      <Hero settings={settings} />
      <SelectedWork
        projects={projects}
        heading={settings?.selectedWork?.heading}
        description={settings?.selectedWork?.description}
      />
      <Experience items={experience} />
      <EngineeringFocus groups={skillGroups} />
      <About about={about} />
      <Contact settings={settings} />
    </>
  )
}
