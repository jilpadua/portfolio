import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ProjectHero } from '@/components/projects/ProjectHero'
import { ProjectOverview } from '@/components/projects/ProjectOverview'
import { ProjectContribution } from '@/components/projects/ProjectContribution'
import { ProjectStack } from '@/components/projects/ProjectStack'
import { ArchitectureDiagram } from '@/components/projects/ArchitectureDiagram'
import { TechnicalChallenges } from '@/components/projects/TechnicalChallenges'
import { TechnicalDecisions } from '@/components/projects/TechnicalDecisions'
import { ProjectNavigation } from '@/components/projects/ProjectNavigation'
import { client } from '@/lib/sanity/client'
import { getSiteUrl } from '@/lib/utils'
import {
  projectBySlugQuery,
  featuredProjectNavQuery,
  allProjectSlugsQuery,
} from '@/sanity/queries'

export const revalidate = 60

type PageProps = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  try {
    const slugs = await client.fetch<{ slug: string }[]>(allProjectSlugsQuery)
    return slugs.map(({ slug }) => ({ slug }))
  } catch {
    return [
      { slug: 'smart-parking-system' },
      { slug: 'travel-ordering-system' },
      { slug: 'north-green' },
    ]
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const project = await client.fetch(projectBySlugQuery, { slug })

  if (!project) {
    return { title: 'Project not found' }
  }

  const title = `${project.title} — Case Study`
  const description = project.shortDescription ?? project.overview
  const siteUrl = getSiteUrl()

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${siteUrl}/projects/${slug}`,
      type: 'article',
    },
    alternates: {
      canonical: `${siteUrl}/projects/${slug}`,
    },
  }
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params
  const [project, navProjects] = await Promise.all([
    client.fetch(projectBySlugQuery, { slug }),
    client.fetch(featuredProjectNavQuery),
  ])

  if (!project) notFound()

  return (
    <>
      <ProjectHero project={project} />
      <ProjectOverview project={project} />
      <ProjectContribution project={project} />
      <ProjectStack project={project} />
      <ArchitectureDiagram steps={project.architecture} />
      <TechnicalChallenges challenges={project.technicalChallenges} />
      <TechnicalDecisions decisions={project.technicalDecisions} />
      <ProjectNavigation currentSlug={slug} projects={navProjects} />
    </>
  )
}
