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
          © {year} {settings?.name ?? 'Jil Padua'}. Built with Next.js and Sanity.
        </p>
        <div className="flex flex-wrap gap-4">
          {settings?.github && (
            <a
              href={settings.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground"
            >
              GitHub
            </a>
          )}
          {settings?.linkedin && (
            <a
              href={settings.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground"
            >
              LinkedIn
            </a>
          )}
          {settings?.email && (
            <a href={`mailto:${settings.email}`} className="hover:text-foreground">
              Email
            </a>
          )}
        </div>
      </div>
    </footer>
  )
}
