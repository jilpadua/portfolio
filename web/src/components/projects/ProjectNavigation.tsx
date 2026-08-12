import Link from 'next/link'

type NavProject = {
  title: string
  slug: string
}

type ProjectNavigationProps = {
  currentSlug: string
  projects: NavProject[]
}

export function ProjectNavigation({ currentSlug, projects }: ProjectNavigationProps) {
  const index = projects.findIndex((p) => p.slug === currentSlug)
  if (index === -1 || projects.length < 2) return null

  const prev = projects[index - 1]
  const next = projects[index + 1]

  return (
    <nav
      className="section-padding border-t border-border"
      aria-label="Project navigation"
    >
      <div className="container-main grid gap-6 md:grid-cols-2">
        {prev ? (
          <Link href={`/projects/${prev.slug}`} className="group border border-border p-5">
            <p className="mono-label mb-2">Previous</p>
            <p className="text-lg font-medium group-hover:text-accent">{prev.title}</p>
          </Link>
        ) : (
          <div />
        )}
        {next ? (
          <Link
            href={`/projects/${next.slug}`}
            className="group border border-border p-5 md:text-right"
          >
            <p className="mono-label mb-2">Next</p>
            <p className="text-lg font-medium group-hover:text-accent">{next.title}</p>
          </Link>
        ) : null}
      </div>
    </nav>
  )
}
