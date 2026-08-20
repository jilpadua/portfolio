import { Button } from '@/components/ui/Button'
import { TrackedLink } from '@/components/analytics/TrackedLink'
import { CATEGORY_LABELS } from '@/lib/utils'
import type { Experience, SiteSettings, SkillGroup } from '@/lib/sanity/types'

type RecruiterHeroProps = {
  settings: SiteSettings | null
  experience: Experience[]
  skillGroups: SkillGroup[]
}

export function RecruiterHero({ settings, experience, skillGroups }: RecruiterHeroProps) {
  if (!settings) return null

  const currentRole = experience.find((item) => item.isCurrent)?.role
  const coreTech = skillGroups
    .filter((group) => ['backend', 'api', 'database'].includes(group.category))
    .flatMap((group) => group.technologies ?? [])
    .slice(0, 8)

  return (
    <section id="hero" className="section-padding border-b border-border pt-24 md:pt-28">
      <div className="container-main">
        {settings.recruiter?.modeLabel && (
          <p className="mono-label mb-4">{settings.recruiter.modeLabel}</p>
        )}
        <h1 className="max-w-4xl text-4xl font-semibold tracking-tight md:text-6xl">
          {settings.name}
        </h1>
        <p className="mt-3 text-xl text-muted md:text-2xl">{settings.role}</p>
        {settings.focusLine && (
          <p className="mt-4 font-mono text-sm tracking-wide text-muted">{settings.focusLine}</p>
        )}

        {coreTech.length > 0 && (
          <p className="mt-5 max-w-3xl font-mono text-sm leading-relaxed text-muted">
            {coreTech.join(' · ')}
          </p>
        )}

        {currentRole && (
          <p className="mt-4 text-base text-muted">
            {currentRole}
            {experience.find((item) => item.isCurrent)?.company
              ? ` · ${experience.find((item) => item.isCurrent)?.company}`
              : ''}
          </p>
        )}

        <div className="mt-8 flex flex-wrap gap-3">
          {settings.cvUrl && (
            <TrackedLink event="resume_clicked">
              <Button href={settings.cvUrl} variant="primary">
                View Resume
              </Button>
            </TrackedLink>
          )}
          <Button href="#recruiter-projects" variant="secondary">
            View Projects
          </Button>
          <Button href="#contact" variant="ghost">
            Contact
          </Button>
        </div>
      </div>
    </section>
  )
}

export function RecruiterQuickProfile({
  settings,
  skillGroups,
  experience,
}: RecruiterHeroProps) {
  if (!settings) return null

  const currentRole = experience.find((item) => item.isCurrent)

  return (
    <section className="section-padding border-b border-border bg-section">
      <div className="container-main max-w-4xl">
        <h2 className="mono-label mb-6">
          {settings.recruiter?.quickProfileHeading ?? 'Quick profile'}
        </h2>
        <dl className="grid gap-6 sm:grid-cols-2">
          <div>
            <dt className="text-sm font-semibold uppercase tracking-wide">Primary focus</dt>
            <dd className="mt-2 text-muted">{settings.focusLine ?? settings.role}</dd>
          </div>
          {currentRole && (
            <div>
              <dt className="text-sm font-semibold uppercase tracking-wide">Current role</dt>
              <dd className="mt-2 text-muted">
                {currentRole.role}
                {currentRole.company ? ` · ${currentRole.company}` : ''}
              </dd>
            </div>
          )}
          {skillGroups.map((group) => (
            <div key={group._id}>
              <dt className="text-sm font-semibold uppercase tracking-wide">
                {group.label ?? CATEGORY_LABELS[group.category] ?? group.category}
              </dt>
              <dd className="mt-2 font-mono text-sm text-muted">
                {group.technologies?.join(' · ')}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
