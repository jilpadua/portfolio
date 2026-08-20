import { Button } from '@/components/ui/Button'
import { TrackedLink } from '@/components/analytics/TrackedLink'
import type { SiteSettings } from '@/lib/sanity/types'

type RecruiterCtaProps = {
  settings: SiteSettings | null
}

export function RecruiterCta({ settings }: RecruiterCtaProps) {
  if (!settings?.cvUrl && !settings?.github && !settings?.email) return null

  return (
    <section id="contact" className="section-padding border-t border-border">
      <div className="container-main max-w-3xl">
        <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
          {settings.recruiter?.ctaHeading ?? 'Interested in working together?'}
        </h2>
        <div className="mt-6 flex flex-wrap gap-3">
          {settings.cvUrl && (
            <TrackedLink event="resume_clicked">
              <Button href={settings.cvUrl} variant="primary">
                Download Resume
              </Button>
            </TrackedLink>
          )}
          {settings.github && (
            <TrackedLink event="github_clicked">
              <Button href={settings.github} variant="secondary">
                View GitHub
              </Button>
            </TrackedLink>
          )}
          {settings.email && (
            <TrackedLink event="contact_clicked">
              <Button href={`mailto:${settings.email}`} variant="ghost">
                Contact Me
              </Button>
            </TrackedLink>
          )}
        </div>
      </div>
    </section>
  )
}
