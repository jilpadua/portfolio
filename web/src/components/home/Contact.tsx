import { Button } from '@/components/ui/Button'
import type { SiteSettings } from '@/lib/sanity/types'

type ContactProps = {
  settings: SiteSettings | null
}

export function Contact({ settings }: ContactProps) {
  return (
    <section id="contact" className="section-padding border-t border-border">
      <div className="container-main">
        <p className="mono-label mb-3">Contact</p>
        <h2 className="max-w-2xl text-3xl font-semibold tracking-tight md:text-4xl">
          Let&apos;s build something useful.
        </h2>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-muted md:text-lg">
          Available for junior software development opportunities and interesting engineering
          projects.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          {settings?.email && (
            <Button href={`mailto:${settings.email}`} variant="primary">
              Email
            </Button>
          )}
          {settings?.github && (
            <Button href={settings.github} variant="secondary">
              GitHub
            </Button>
          )}
          {settings?.linkedin && (
            <Button href={settings.linkedin} variant="secondary">
              LinkedIn
            </Button>
          )}
        </div>
      </div>
    </section>
  )
}
