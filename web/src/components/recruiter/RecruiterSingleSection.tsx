'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { TrackedLink } from '@/components/analytics/TrackedLink'
import { urlFor } from '@/lib/sanity/image'
import { CATEGORY_LABELS, formatDateRange, flattenTechnologies } from '@/lib/utils'
import { FOCUS_AREA_LABELS } from '@/lib/case-study'
import { useRecruiterMode } from './RecruiterModeProvider'
import type { Experience, ProjectCard, SiteSettings, SkillGroup } from '@/lib/sanity/types'

type RecruiterSingleSectionProps = {
  settings: SiteSettings | null
  experience: Experience[]
  skillGroups: SkillGroup[]
  projects: ProjectCard[]
}

export function RecruiterSingleSection({
  settings,
  experience,
  skillGroups,
  projects,
}: RecruiterSingleSectionProps) {
  const { toggleRecruiterMode } = useRecruiterMode()

  if (!settings) return null

  const currentRole = experience.find((item) => item.isCurrent)
  const profileImageUrl = settings.profileImage?.asset?._ref
    ? urlFor(settings.profileImage).width(400).height(400).fit('crop').url()
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

  // Top 3 projects highlighted for fast scanning
  const topProjects = projects.slice(0, 3)

  return (
    <section id="hero" className="section-padding pt-20 md:pt-24 lg:pt-28">
      <div className="container-main space-y-6">
        {/* Top Header Card: Candidate identity, photo, and primary CTAs */}
        <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm md:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-4 sm:gap-6">
              {/* Profile Photo */}
              <div className="relative shrink-0">
                <div className="relative h-20 w-20 overflow-hidden rounded-2xl border border-border bg-background sm:h-24 sm:w-24">
                  {profileImageUrl ? (
                    <Image
                      src={profileImageUrl}
                      alt={settings.profileImage?.alt ?? settings.name}
                      fill
                      sizes="96px"
                      priority
                      className="object-cover object-center"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center font-mono text-xl font-bold text-accent">
                      {initials}
                    </div>
                  )}
                </div>
                {/* Active status indicator */}
                <span
                  className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-surface"
                  title="Available for opportunities"
                >
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
                </span>
              </div>

              {/* Bio & Details */}
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="mono-label rounded bg-accent/10 px-2 py-0.5 text-accent font-semibold">
                    {settings.recruiter?.modeLabel ?? 'Recruiter Skim Mode'}
                  </span>
                  {currentRole && (
                    <span className="font-mono text-xs text-muted">
                      {currentRole.role} @ {currentRole.company}
                    </span>
                  )}
                </div>

                <h1 className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl">
                  {settings.name}
                </h1>
                <p className="mt-1 text-base font-medium text-muted sm:text-lg">
                  {settings.role}
                </p>
                {settings.focusLine && (
                  <p className="mt-1 font-mono text-xs tracking-wide text-accent sm:text-sm">
                    {settings.focusLine}
                  </p>
                )}
              </div>
            </div>

            {/* Fast Action Buttons */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3" id="contact">
              {settings.cvUrl && (
                <TrackedLink event="resume_clicked">
                  <Button href={settings.cvUrl} variant="primary" className="shadow-sm">
                    View Resume
                  </Button>
                </TrackedLink>
              )}
              {settings.email && (
                <TrackedLink event="contact_clicked">
                  <Button href={`mailto:${settings.email}`} variant="secondary">
                    Email
                  </Button>
                </TrackedLink>
              )}
              {settings.linkedin && (
                <TrackedLink event="linkedin_clicked">
                  <Button href={settings.linkedin} variant="ghost" target="_blank" rel="noopener noreferrer">
                    LinkedIn
                  </Button>
                </TrackedLink>
              )}
              {settings.github && (
                <TrackedLink event="github_clicked">
                  <Button href={settings.github} variant="ghost" target="_blank" rel="noopener noreferrer">
                    GitHub
                  </Button>
                </TrackedLink>
              )}
            </div>
          </div>
        </div>

        {/* 2-Column Dashboard Grid: Everything in 1 screen view */}
        <div className="grid gap-6 lg:grid-cols-12">
          {/* Left Column (5 cols): Skills Matrix & Compact Experience */}
          <div className="space-y-6 lg:col-span-5">
            {/* Skills Matrix */}
            <div
              id="recruiter-skills"
              className="rounded-2xl border border-border bg-surface p-5 shadow-sm sm:p-6"
            >
              <h2 className="mono-label mb-4 flex items-center justify-between text-foreground">
                <span>Core Technical Skills</span>
                <span className="text-[10px] text-muted font-normal lowercase">at a glance</span>
              </h2>

              <div className="space-y-4">
                {skillGroups.map((group) => (
                  <div key={group._id} className="border-t border-border/60 pt-3 first:border-t-0 first:pt-0">
                    <dt className="text-xs font-semibold uppercase tracking-wider text-muted">
                      {group.label ?? CATEGORY_LABELS[group.category] ?? group.category}
                    </dt>
                    <dd className="mt-2 flex flex-wrap gap-1.5">
                      {group.technologies?.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-md border border-border bg-background px-2.5 py-1 font-mono text-xs text-foreground"
                        >
                          {tech}
                        </span>
                      ))}
                    </dd>
                  </div>
                ))}
              </div>
            </div>

            {/* Compact Career Timeline */}
            <div
              id="experience"
              className="rounded-2xl border border-border bg-surface p-5 shadow-sm sm:p-6"
            >
              <h2 className="mono-label mb-4 text-foreground">
                Career History
              </h2>

              <div className="space-y-4">
                {experience.map((item) => (
                  <div
                    key={item._id}
                    className="border-t border-border/60 pt-3 first:border-t-0 first:pt-0"
                  >
                    <div className="flex items-baseline justify-between gap-2">
                      <h3 className="text-sm font-semibold text-foreground">
                        {item.role}
                      </h3>
                      <span className="font-mono text-[11px] text-meta shrink-0">
                        {formatDateRange(item.startDate, item.endDate, item.isCurrent)}
                      </span>
                    </div>
                    <p className="mt-0.5 text-xs text-muted font-medium">{item.company}</p>
                    {item.bullets?.[0] && (
                      <p className="mt-1.5 text-xs leading-relaxed text-muted">
                        • {item.bullets[0]}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column (7 cols): Best Projects with Direct Evidence */}
          <div className="space-y-6 lg:col-span-7">
            <div
              id="recruiter-projects"
              className="rounded-2xl border border-border bg-surface p-5 shadow-sm sm:p-6"
            >
              <div className="mb-4 flex items-center justify-between">
                <h2 className="mono-label text-foreground">
                  {settings.recruiter?.projects?.heading ?? 'Featured Projects'}
                </h2>
                <span className="text-xs text-muted">Selected for technical depth</span>
              </div>

              <div className="space-y-4">
                {topProjects.map((project) => {
                  const techLine = flattenTechnologies(project.techGroups)
                  const focusLine = project.focusAreas
                    ?.map((area) => FOCUS_AREA_LABELS[area] ?? area)
                    .join(' · ')

                  return (
                    <article
                      key={project._id}
                      className="rounded-xl border border-border bg-background/50 p-4 transition-colors hover:border-accent/40 hover:bg-background"
                    >
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          {project.tagline && (
                            <p className="mono-label text-[10px] text-meta mb-1">
                              {project.tagline}
                            </p>
                          )}
                          <h3 className="text-lg font-semibold tracking-tight text-foreground">
                            {project.title}
                          </h3>
                        </div>
                        <Link
                          href={`/projects/${project.slug}`}
                          className="inline-flex items-center text-xs font-medium text-accent hover:underline shrink-0"
                        >
                          View case study →
                        </Link>
                      </div>

                      {project.shortDescription && (
                        <p className="mt-2 text-xs leading-relaxed text-muted">
                          {project.shortDescription}
                        </p>
                      )}

                      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
                        {focusLine && (
                          <span className="text-muted">
                            <strong className="font-medium text-foreground">Focus:</strong>{' '}
                            {focusLine}
                          </span>
                        )}
                        {techLine && (
                          <span className="font-mono text-[11px] text-meta">
                            {techLine}
                          </span>
                        )}
                      </div>
                    </article>
                  )
                })}
              </div>
            </div>

            {/* Quick Profile Summary & Mode Switch Notice */}
            <div className="rounded-2xl border border-dashed border-border bg-surface/60 p-5 sm:p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-foreground">
                    Looking for detailed architecture diagrams?
                  </h3>
                  <p className="mt-1 text-xs text-muted">
                    Switch to the full portfolio to explore complete system design schematics, challenges, and code walk-throughs.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={toggleRecruiterMode}
                  className="inline-flex items-center justify-center rounded-md border border-border bg-surface px-3.5 py-2 text-xs font-medium text-foreground transition-colors hover:border-accent hover:text-accent shrink-0"
                >
                  Exit to Full Portfolio →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
