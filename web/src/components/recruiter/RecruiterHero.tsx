import Image from 'next/image'
import { Button } from '@/components/ui/Button'
import { TrackedLink } from '@/components/analytics/TrackedLink'
import { urlFor } from '@/lib/sanity/image'
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

  const profileImageUrl = settings.profileImage?.asset?._ref
    ? urlFor(settings.profileImage).width(640).height(640).fit('crop').url()
    : null

  const initials = settings.name
    ? settings.name
        .split(' ')
        .map((part) => part[0])
        .filter(Boolean)
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : 'JP'

  return (
    <section id="hero" className="section-padding pt-24 md:pt-28">
      <div className="container-main">
        <div className="grid items-center gap-10 md:grid-cols-[1fr_auto] md:gap-12 lg:gap-16">
          <div className="max-w-3xl">
            {settings.recruiter?.modeLabel && (
              <p className="mono-label mb-4">{settings.recruiter.modeLabel}</p>
            )}
            <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">
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

          <div className="flex justify-start md:justify-end">
            <div className="group relative">
              <div className="relative h-44 w-44 sm:h-52 sm:w-52 md:h-60 md:w-60 lg:h-68 lg:w-68 overflow-hidden rounded-2xl border border-border bg-surface">
                {profileImageUrl ? (
                  <Image
                    src={profileImageUrl}
                    alt={settings.profileImage?.alt ?? settings.name}
                    fill
                    sizes="(max-width: 640px) 176px, (max-width: 768px) 208px, (max-width: 1024px) 240px, 272px"
                    priority
                    className="object-cover object-center transition duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center bg-surface p-6 text-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-accent/10 font-mono text-2xl font-bold text-accent">
                      {initials}
                    </div>
                    <span className="mt-3 font-mono text-xs uppercase tracking-wider text-meta">
                      {settings.name}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
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
    <section className="section-padding bg-section">
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
