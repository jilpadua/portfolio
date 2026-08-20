import { TrackedLink } from '@/components/analytics/TrackedLink'
import type { SiteSettings } from '@/lib/sanity/types'

type FooterProps = {
  settings: SiteSettings | null
}

export function Footer({ settings }: FooterProps) {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border">
      <div className="container-main flex flex-col gap-3 py-8 text-sm text-muted md:flex-row md:items-center md:justify-between">
        <p>
          © {year} {settings?.name ?? 'Jil Padua'}.
          {settings?.footer?.credit ? ` ${settings.footer.credit}` : ''}
        </p>
        <div className="flex flex-wrap gap-4">
          {settings?.github && (
            <TrackedLink event="github_clicked">
              <a
                href={settings.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground"
              >
                GitHub
              </a>
            </TrackedLink>
          )}
          {settings?.linkedin && (
            <TrackedLink event="linkedin_clicked">
              <a
                href={settings.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground"
              >
                LinkedIn
              </a>
            </TrackedLink>
          )}
          {settings?.email && (
            <TrackedLink event="contact_clicked">
              <a href={`mailto:${settings.email}`} className="hover:text-foreground">
                Email
              </a>
            </TrackedLink>
          )}
        </div>
      </div>
    </footer>
  )
}
