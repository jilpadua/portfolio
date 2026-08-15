'use client'

import { Hero } from '@/components/home/Hero'
import { SelectedWork } from '@/components/home/SelectedWork'
import { Experience } from '@/components/home/Experience'
import { EngineeringFocus } from '@/components/home/EngineeringFocus'
import { About } from '@/components/home/About'
import { Contact } from '@/components/home/Contact'
import { RecruiterHome } from '@/components/recruiter/RecruiterHome'
import { useRecruiterMode } from '@/components/recruiter/RecruiterModeProvider'
import type {
  About as AboutType,
  Experience as ExperienceType,
  ProjectCard,
  RecruiterProject,
  SiteSettings,
  SkillGroup,
} from '@/lib/sanity/types'

type HomeViewProps = {
  settings: SiteSettings | null
  projects: ProjectCard[]
  recruiterProjects: RecruiterProject[]
  experience: ExperienceType[]
  skillGroups: SkillGroup[]
  about: AboutType | null
}

export function HomeView({
  settings,
  projects,
  recruiterProjects,
  experience,
  skillGroups,
  about,
}: HomeViewProps) {
  const { isRecruiterMode } = useRecruiterMode()

  if (isRecruiterMode) {
    return (
      <RecruiterHome
        settings={settings}
        projects={recruiterProjects}
        experience={experience}
        skillGroups={skillGroups}
        about={about}
      />
    )
  }

  return (
    <>
      <Hero settings={settings} />
      <SelectedWork projects={projects} />
      <Experience items={experience} />
      <EngineeringFocus groups={skillGroups} />
      <About about={about} />
      <Contact settings={settings} />
    </>
  )
}
