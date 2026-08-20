'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRecruiterMode } from '@/components/recruiter/RecruiterModeProvider'
import { ThemeToggle } from '@/components/layout/ThemeToggle'
import { TrackedLink } from '@/components/analytics/TrackedLink'
import type { SiteSettings } from '@/lib/sanity/types'

const NAV_ITEMS = [
  { href: '#work', label: 'Work' },
  { href: '#experience', label: 'Experience' },
  { href: '#engineering', label: 'Skills' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
]

const RECRUITER_NAV_ITEMS = [
  { href: '/#recruiter-projects', label: 'Projects' },
  { href: '/#experience', label: 'Experience' },
  { href: '/#contact', label: 'Contact' },
]

type HeaderProps = {
  settings: SiteSettings | null
}

export function Header({ settings }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { isRecruiterMode, isReady, toggleRecruiterMode } = useRecruiterMode()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navItems = isReady && isRecruiterMode ? RECRUITER_NAV_ITEMS : NAV_ITEMS
  const recruiterToggleLabel = !isReady
    ? 'Recruiter Mode'
    : isRecruiterMode
      ? 'Exit Recruiter Mode'
      : 'Recruiter Mode'
  const mobileToggleLabel = !isReady ? 'Recruiter' : isRecruiterMode ? 'Exit' : 'Recruiter'

  return (
    <header
      className={`sticky top-0 z-50 border-b border-transparent transition-colors duration-200 ${scrolled ? 'header-scrolled' : ''}`}
    >
      <div className="container-main flex h-16 items-center justify-between gap-3">
        <Link
          href="/"
          className="font-mono text-sm font-medium tracking-tight text-foreground"
        >
          {settings?.name ?? 'Jil Padua'}
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-muted transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
          <button
            type="button"
            onClick={toggleRecruiterMode}
            aria-pressed={isReady ? isRecruiterMode : false}
            className={`rounded-md border px-3 py-1.5 text-sm transition-colors ${
              isReady && isRecruiterMode
                ? 'border-accent bg-accent text-accent-foreground'
                : 'border-border bg-surface text-muted hover:text-foreground'
            }`}
          >
            {recruiterToggleLabel}
          </button>
          <ThemeToggle />
          {settings?.github && (
            <TrackedLink event="github_clicked">
              <a
                href={settings.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted transition-colors hover:text-foreground"
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
                className="text-sm text-muted transition-colors hover:text-foreground"
              >
                LinkedIn
              </a>
            </TrackedLink>
          )}
        </nav>

        <div className="flex items-center gap-2 lg:hidden">
          <button
            type="button"
            onClick={toggleRecruiterMode}
            aria-pressed={isReady ? isRecruiterMode : false}
            className={`rounded-md border px-2.5 py-2 text-xs transition-colors ${
              isReady && isRecruiterMode
                ? 'border-accent bg-accent text-accent-foreground'
                : 'border-border bg-surface text-muted'
            }`}
          >
            {mobileToggleLabel}
          </button>
          <ThemeToggle />
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-border bg-surface px-3 py-2 text-sm"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? 'Close' : 'Menu'}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav
          id="mobile-nav"
          className="border-t border-border bg-surface lg:hidden"
          aria-label="Mobile"
        >
          <div className="container-main flex flex-col gap-1 py-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-2 py-2 text-sm text-foreground hover:bg-background"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            {settings?.github && (
              <TrackedLink event="github_clicked">
                <a
                  href={settings.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-md px-2 py-2 text-sm text-foreground hover:bg-background"
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
                  className="rounded-md px-2 py-2 text-sm text-foreground hover:bg-background"
                >
                  LinkedIn
                </a>
              </TrackedLink>
            )}
          </div>
        </nav>
      )}
    </header>
  )
}
