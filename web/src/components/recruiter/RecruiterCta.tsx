import { Button } from '@/components/ui/Button'
import type { SiteSettings } from '@/lib/sanity/types'

type RecruiterCtaProps = {
  settings: SiteSettings | null
}

export function RecruiterCta({ settings }: RecruiterCtaProps) {
  if (!settings?.cvUrl && !settings?.github && !settings?.email) return null

  return (
    <section className="section-padding border-t border-border">
      <div className="container-main max-w-3xl">
        <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
          Interested in working together?
        </h2>
        <div className="mt-6 flex flex-wrap gap-3">
          {settings.cvUrl && (
            <Button href={settings.cvUrl} variant="primary">
              Download Resume
            </Button>
          )}
          {settings.github && (
            <Button href={settings.github} variant="secondary">
              View GitHub
            </Button>
          )}
          {settings.email && (
            <Button href={`mailto:${settings.email}`} variant="ghost">
              Contact Me
            </Button>
          )}
        </div>
      </div>
    </section>
  )
}
