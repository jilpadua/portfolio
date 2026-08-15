import { HomeView } from '@/components/home/HomeView'
import { client } from '@/lib/sanity/client'
import { getSiteUrl } from '@/lib/utils'
import {
  siteSettingsQuery,
  featuredProjectsQuery,
  recruiterProjectsQuery,
  experienceQuery,
  skillGroupsQuery,
  aboutQuery,
} from '@/sanity/queries'

export const revalidate = 60

export default async function HomePage() {
  const [settings, projects, recruiterProjects, experience, skillGroups, about] =
    await Promise.all([
      client.fetch(siteSettingsQuery),
      client.fetch(featuredProjectsQuery),
      client.fetch(recruiterProjectsQuery),
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
      <HomeView
        settings={settings}
        projects={projects}
        recruiterProjects={recruiterProjects}
        experience={experience}
        skillGroups={skillGroups}
        about={about}
      />
    </>
  )
}
