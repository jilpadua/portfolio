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
    <section
      id="hero"
      className="w-full lg:h-[calc(100dvh-4rem)] lg:max-h-[calc(100dvh-4rem)] lg:overflow-hidden py-3 sm:py-3.5 flex flex-col justify-between"
    >
      <div className="container-main max-w-7xl flex flex-col flex-1 min-h-0 gap-3 h-full">
        {/* Top Header Card: Candidate identity, photo, and primary CTAs */}
        <div className="flex-none rounded-xl border border-border bg-surface px-4 py-2.5 sm:px-5 sm:py-3 shadow-sm">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3 sm:gap-4 min-w-0">
              {/* Profile Photo */}
              <div className="relative shrink-0">
                <div className="relative h-12 w-12 sm:h-14 sm:w-14 overflow-hidden rounded-xl border border-border bg-background">
                  {profileImageUrl ? (
                    <Image
                      src={profileImageUrl}
                      alt={settings.profileImage?.alt ?? settings.name}
                      fill
                      sizes="56px"
                      priority
                      className="object-cover object-center"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center font-mono text-base font-bold text-accent">
                      {initials}
                    </div>
                  )}
                </div>
                {/* Active status indicator */}
                <span
                  className="absolute -bottom-0.5 -right-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-surface"
                  title="Available for opportunities"
                >
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                </span>
              </div>

              {/* Bio & Details */}
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="mono-label rounded bg-accent/10 px-1.5 py-0.5 text-[10px] font-semibold text-accent">
                    {settings.recruiter?.modeLabel ?? 'Recruiter Skim Mode'}
                  </span>
                  {currentRole && (
                    <span className="font-mono text-[11px] text-muted truncate">
                      {currentRole.role} @ {currentRole.company}
                    </span>
                  )}
                </div>

                <div className="mt-0.5 flex flex-wrap items-baseline gap-x-2.5">
                  <h1 className="text-lg sm:text-xl font-bold tracking-tight text-foreground">
                    {settings.name}
                  </h1>
                  <span className="text-xs sm:text-sm font-medium text-muted">
                    {settings.role}
                  </span>
                </div>

                {settings.focusLine && (
                  <p className="font-mono text-[11px] tracking-wide text-accent truncate">
                    {settings.focusLine}
                  </p>
                )}
              </div>
            </div>

            {/* Fast Action Buttons */}
            <div className="flex flex-wrap items-center gap-2 shrink-0" id="contact">
              {settings.cvUrl && (
                <TrackedLink event="resume_clicked">
                  <Button href={settings.cvUrl} variant="primary" size="sm" className="shadow-sm">
                    View Resume
                  </Button>
                </TrackedLink>
              )}
              {settings.email && (
                <TrackedLink event="contact_clicked">
                  <Button href={`mailto:${settings.email}`} variant="secondary" size="sm">
                    Email
                  </Button>
                </TrackedLink>
              )}
              {settings.linkedin && (
                <TrackedLink event="linkedin_clicked">
                  <Button href={settings.linkedin} variant="ghost" size="sm" target="_blank" rel="noopener noreferrer">
                    LinkedIn
                  </Button>
                </TrackedLink>
              )}
              {settings.github && (
                <TrackedLink event="github_clicked">
                  <Button href={settings.github} variant="ghost" size="sm" target="_blank" rel="noopener noreferrer">
                    GitHub
                  </Button>
                </TrackedLink>
              )}
            </div>
          </div>
        </div>

        {/* 2-Column Dashboard Grid: Everything in 1 screen view */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 flex-1 min-h-0">
          {/* Left Column (5 cols): Skills Matrix & Compact Experience */}
          <div className="flex flex-col gap-3 lg:col-span-5 min-h-0 h-full">
            {/* Skills Matrix */}
            <div
              id="recruiter-skills"
              className="flex-1 min-h-0 flex flex-col rounded-xl border border-border bg-surface p-3.5 sm:p-4 shadow-sm"
            >
              <div className="flex-none pb-2 border-b border-border/60 flex items-center justify-between">
                <h2 className="mono-label text-foreground">
                  Core Technical Skills
                </h2>
                <span className="text-[10px] text-muted font-normal lowercase">at a glance</span>
              </div>

              <div className="flex-1 min-h-0 overflow-y-auto pr-1 pt-2.5 space-y-2.5 custom-scrollbar">
                {skillGroups.map((group) => (
                  <div key={group._id} className="border-t border-border/40 pt-2 first:border-t-0 first:pt-0">
                    <dt className="text-[11px] font-semibold uppercase tracking-wider text-muted">
                      {group.label ?? CATEGORY_LABELS[group.category] ?? group.category}
                    </dt>
                    <dd className="mt-1 flex flex-wrap gap-1">
                      {group.technologies?.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-md border border-border bg-background px-2 py-0.5 font-mono text-[11px] text-foreground"
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
              className="flex-1 min-h-0 flex flex-col rounded-xl border border-border bg-surface p-3.5 sm:p-4 shadow-sm"
            >
              <div className="flex-none pb-2 border-b border-border/60 flex items-center justify-between">
                <h2 className="mono-label text-foreground">
                  Career History
                </h2>
                <span className="text-[10px] text-muted font-normal lowercase">timeline</span>
              </div>

              <div className="flex-1 min-h-0 overflow-y-auto pr-1 pt-2 space-y-2.5 custom-scrollbar">
                {experience.map((item) => (
                  <div
                    key={item._id}
                    className="border-t border-border/40 pt-2 first:border-t-0 first:pt-0"
                  >
                    <div className="flex items-baseline justify-between gap-2">
                      <h3 className="text-xs font-semibold text-foreground">
                        {item.role}
                      </h3>
                      <span className="font-mono text-[10px] text-meta shrink-0">
                        {formatDateRange(item.startDate, item.endDate, item.isCurrent)}
                      </span>
                    </div>
                    <p className="text-[11px] text-muted font-medium">{item.company}</p>
                    {item.bullets?.[0] && (
                      <p className="mt-1 text-xs leading-relaxed text-muted">
                        • {item.bullets[0]}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column (7 cols): Best Projects with Direct Evidence */}
          <div className="flex flex-col lg:col-span-7 min-h-0 h-full">
            <div
              id="recruiter-projects"
              className="h-full min-h-0 flex flex-col rounded-xl border border-border bg-surface p-3.5 sm:p-4 shadow-sm"
            >
              <div className="flex-none pb-2 border-b border-border/60 flex items-center justify-between">
                <h2 className="mono-label text-foreground">
                  {settings.recruiter?.projects?.heading ?? 'Featured Projects'}
                </h2>
                <span className="text-[11px] text-muted">Technical depth & direct proof</span>
              </div>

              <div className="flex-1 min-h-0 overflow-y-auto pr-1 pt-2.5 space-y-2.5 custom-scrollbar">
                {topProjects.map((project) => {
                  const techLine = flattenTechnologies(project.techGroups)
                  const focusLine = project.focusAreas
                    ?.map((area) => FOCUS_AREA_LABELS[area] ?? area)
                    .join(' · ')

                  return (
                    <article
                      key={project._id}
                      className="rounded-lg border border-border bg-background/50 p-3 transition-colors hover:border-accent/40 hover:bg-background"
                    >
                      <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          {project.tagline && (
                            <p className="mono-label text-[10px] text-meta mb-0.5">
                              {project.tagline}
                            </p>
                          )}
                          <h3 className="text-sm sm:text-base font-semibold tracking-tight text-foreground">
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
                        <p className="mt-1.5 text-xs leading-relaxed text-muted line-clamp-2">
                          {project.shortDescription}
                        </p>
                      )}

                      <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
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
          </div>
        </div>

        {/* Bottom Strip: Mode Switch & Architecture Note */}
        <div className="flex-none rounded-xl border border-dashed border-border bg-surface/80 px-4 py-2 sm:px-5 sm:py-2.5 shadow-sm">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              <p className="text-xs text-muted">
                <strong className="font-semibold text-foreground">Need complete architecture schematics?</strong>{' '}
                Switch to full portfolio mode for comprehensive system designs and code walk-throughs.
              </p>
            </div>
            <button
              type="button"
              onClick={toggleRecruiterMode}
              className="inline-flex items-center justify-center rounded-md border border-border bg-surface px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-accent hover:text-accent shrink-0"
            >
              Exit to Full Portfolio →
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
