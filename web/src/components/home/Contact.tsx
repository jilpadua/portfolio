import { Button } from '@/components/ui/Button'
import type { SiteSettings } from '@/lib/sanity/types'

type ContactProps = {
  settings: SiteSettings | null
}

export function Contact({ settings }: ContactProps) {
  const copy = settings?.contact

  return (
    <section id="contact" className="section-padding border-t border-border">
      <div className="container-main">
        {copy?.eyebrow && <p className="mono-label mb-3">{copy.eyebrow}</p>}
        <h2 className="max-w-2xl text-3xl font-semibold tracking-tight md:text-4xl">
          {copy?.heading ?? "Let's build something useful."}
        </h2>
        {copy?.description && (
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted md:text-lg">
            {copy.description}
          </p>
        )}
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
