import Image from 'next/image'
import Link from 'next/link'
import { TrackedLink } from '@/components/analytics/TrackedLink'
import { urlFor } from '@/lib/sanity/image'
import { flattenTechnologies } from '@/lib/utils'
import type { Project } from '@/lib/sanity/types'

type ProjectHeroProps = {
  project: Project
}

export function ProjectHero({ project }: ProjectHeroProps) {
  const imageUrl = project.heroImage
    ? urlFor(project.heroImage).width(1400).height(800).fit('crop').url()
    : null
  const techLine = flattenTechnologies(project.techGroups)

  return (
    <section className="section-padding border-b border-border pt-24 md:pt-28">
      <div className="container-main">
        <Link href="/#work" className="mono-label mb-6 inline-block hover:text-foreground">
          ← Back to work
        </Link>
        <p className="mono-label mb-3">{project.tagline}</p>
        <h1 className="max-w-4xl text-4xl font-semibold tracking-tight md:text-5xl">
          {project.title}
        </h1>
        {techLine && (
          <p className="mt-4 font-mono text-sm tracking-wide text-meta">{techLine}</p>
        )}
        <div className="mt-6 flex flex-wrap gap-4 text-sm">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              Live site
            </a>
          )}
          {project.githubUrl && (
            <TrackedLink
              event="github_clicked"
              context={{ projectSlug: project.slug, projectTitle: project.title }}
            >
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                GitHub
              </a>
            </TrackedLink>
          )}
        </div>
        <div className="relative mt-10 aspect-[16/9] overflow-hidden border border-border bg-surface">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={`${project.title} hero`}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          ) : (
            <div className="flex h-full items-end p-6">
              <p className="font-mono text-sm uppercase tracking-widest text-muted">
                {project.title}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
