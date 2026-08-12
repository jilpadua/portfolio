import { Hero } from '@/components/home/Hero'
import { SelectedWork } from '@/components/home/SelectedWork'
import { Experience } from '@/components/home/Experience'
import { EngineeringFocus } from '@/components/home/EngineeringFocus'
import { About } from '@/components/home/About'
import { Contact } from '@/components/home/Contact'
import { client } from '@/lib/sanity/client'
import { getSiteUrl } from '@/lib/utils'
import {
  siteSettingsQuery,
  featuredProjectsQuery,
  experienceQuery,
  skillGroupsQuery,
  aboutQuery,
} from '@/sanity/queries'

export const revalidate = 60

export default async function HomePage() {
  const [settings, projects, experience, skillGroups, about] = await Promise.all([
    client.fetch(siteSettingsQuery),
    client.fetch(featuredProjectsQuery),
    client.fetch(experienceQuery),
    client.fetch(skillGroupsQuery),
    client.fetch(aboutQuery),
  ])

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: settings?.name ?? 'Jil Padua',
    jobTitle: settings?.role ?? 'Software Developer',
    url: getSiteUrl(),
    sameAs: [settings?.github, settings?.linkedin].filter(Boolean),
    email: settings?.email,
    description: settings?.summary,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero settings={settings} />
      <SelectedWork projects={projects} />
      <Experience items={experience} />
      <EngineeringFocus groups={skillGroups} />
      <About about={about} />
      <Contact settings={settings} />
    </>
  )
}
