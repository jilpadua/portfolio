import { Button } from '@/components/ui/Button'
import { TrackedLink } from '@/components/analytics/TrackedLink'
import type { SiteSettings } from '@/lib/sanity/types'

type HeroProps = {
  settings: SiteSettings | null
}

export function Hero({ settings }: HeroProps) {
  if (!settings) return null

  return (
    <section id="hero" className="section-padding pt-24 md:pt-28">
      <div className="container-main">
        <p className="mono-label mb-4">{settings.focusLine ?? 'Backend · APIs · Databases'}</p>
        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl">
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
    </section>
  )
}
