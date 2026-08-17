import Link from 'next/link'
import Image from 'next/image'
import { flattenTechnologies } from '@/lib/utils'
import { urlFor } from '@/lib/sanity/image'
import type { ProjectCard as ProjectCardType } from '@/lib/sanity/types'

type ProjectCardProps = {
  project: ProjectCardType
}

export function ProjectCard({ project }: ProjectCardProps) {
  const techLine = flattenTechnologies(project.techGroups)
  const imageUrl = project.heroImage
    ? urlFor(project.heroImage).width(800).height(500).fit('crop').url()
    : null

  return (
    <article className="project-row group">
      <Link
        href={`/projects/${project.slug}`}
        className="grid gap-6 p-8 md:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] md:items-start md:gap-10"
      >
        <div>
          <p className="mono-label mb-2">{project.tagline}</p>
          <h3 className="text-2xl font-semibold tracking-tight transition-colors group-hover:text-accent md:text-3xl">
            {project.title}
          </h3>
          {project.shortDescription && (
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">
              {project.shortDescription}
            </p>
          )}
          {project.contribution?.length ? (
            <div className="mt-5">
              <p className="mono-label mb-2">My contribution</p>
              <ul className="space-y-1.5 text-sm text-muted md:text-base">
                {project.contribution.slice(0, 4).map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-accent" aria-hidden="true">
                      •
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          {techLine && (
            <p className="mt-5 font-mono text-xs tracking-wide text-muted">{techLine}</p>
          )}
          <p className="mt-4 text-sm font-medium text-accent">View case study →</p>
        </div>

        <div className="relative aspect-[16/10] overflow-hidden border border-border bg-surface">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={`${project.title} preview`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 40vw"
            />
          ) : (
            <div className="flex h-full flex-col justify-end p-5">
              <p className="font-mono text-xs uppercase tracking-widest text-muted">
                {project.title}
              </p>
              {techLine && (
                <p className="mt-2 font-mono text-[11px] leading-relaxed text-muted">{techLine}</p>
              )}
            </div>
          )}
        </div>
      </Link>
    </article>
  )
}
