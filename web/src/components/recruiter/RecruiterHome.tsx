'use client'

import { Experience } from '@/components/home/Experience'
import { Contact } from '@/components/home/Contact'
import { RecruiterHero, RecruiterQuickProfile } from '@/components/recruiter/RecruiterHero'
import { RecruiterProjects } from '@/components/recruiter/RecruiterProjects'
import { RecruiterCta } from '@/components/recruiter/RecruiterCta'
import type { About, Experience as ExperienceType, RecruiterProject, SiteSettings, SkillGroup } from '@/lib/sanity/types'

type RecruiterHomeProps = {
  settings: SiteSettings | null
  projects: RecruiterProject[]
  experience: ExperienceType[]
  skillGroups: SkillGroup[]
  about: About | null
}

export function RecruiterHome({
  settings,
  projects,
  experience,
  skillGroups,
}: RecruiterHomeProps) {
  return (
    <>
      <RecruiterHero settings={settings} experience={experience} skillGroups={skillGroups} />
      <RecruiterQuickProfile
        settings={settings}
        experience={experience}
        skillGroups={skillGroups}
      />
      <Experience items={experience} />
      <RecruiterProjects projects={projects} />
      <RecruiterCta settings={settings} />
      <Contact settings={settings} />
    </>
  )
}
