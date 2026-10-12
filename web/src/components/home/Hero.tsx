import Image from 'next/image'
import { Button } from '@/components/ui/Button'
import { TrackedLink } from '@/components/analytics/TrackedLink'
import { urlFor } from '@/lib/sanity/image'
import type { SiteSettings } from '@/lib/sanity/types'

type HeroProps = {
  settings: SiteSettings | null
}

export function Hero({ settings }: HeroProps) {
  if (!settings) return null

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
            <p className="mono-label mb-4">{settings.focusLine ?? 'Backend · APIs · Databases'}</p>
            <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">
              {settings.name}
            </h1>
            <p className="mt-3 text-xl text-muted md:text-2xl">{settings.role}</p>
            {settings.summary && (
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
                {settings.summary}
              </p>
            )}
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="#work" variant="primary">
                View Projects
              </Button>
              {settings.github && (
                <TrackedLink event="github_clicked">
                  <Button href={settings.github} variant="secondary">
                    GitHub
                  </Button>
                </TrackedLink>
              )}
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
