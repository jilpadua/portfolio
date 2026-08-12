'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import type { SiteSettings } from '@/lib/sanity/types'

const NAV_ITEMS = [
  { href: '#work', label: 'Work' },
  { href: '#experience', label: 'Experience' },
  { href: '#engineering', label: 'Engineering' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
]

type HeaderProps = {
  settings: SiteSettings | null
}

export function Header({ settings }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 border-b border-transparent transition-colors duration-200 ${scrolled ? 'header-scrolled' : ''}`}
    >
      <div className="container-main flex h-16 items-center justify-between">
        <Link
          href="/"
          className="font-mono text-sm font-medium tracking-tight text-foreground"
        >
          {settings?.name ?? 'Jil Padua'}
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-muted transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
          {settings?.github && (
            <a
              href={settings.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted transition-colors hover:text-foreground"
            >
              GitHub
            </a>
          )}
          {settings?.linkedin && (
            <a
              href={settings.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted transition-colors hover:text-foreground"
            >
              LinkedIn
            </a>
          )}
        </nav>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md border border-border bg-surface px-3 py-2 text-sm md:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? 'Close' : 'Menu'}
        </button>
      </div>

      {menuOpen && (
        <nav
          id="mobile-nav"
          className="border-t border-border bg-surface md:hidden"
          aria-label="Mobile"
        >
          <div className="container-main flex flex-col gap-1 py-3">
            {NAV_ITEMS.map((item) => (
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
              <a
                href={settings.github}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md px-2 py-2 text-sm text-foreground hover:bg-background"
              >
                GitHub
              </a>
            )}
            {settings?.linkedin && (
              <a
                href={settings.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md px-2 py-2 text-sm text-foreground hover:bg-background"
              >
                LinkedIn
              </a>
            )}
          </div>
        </nav>
      )}
    </header>
  )
}
