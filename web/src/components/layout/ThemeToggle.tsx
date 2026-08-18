'use client'

import { useSyncExternalStore } from 'react'
import { useTheme } from 'next-themes'

const emptySubscribe = () => () => {}

function useHasMounted() {
  return useSyncExternalStore(emptySubscribe, () => true, () => false)
}

function SunIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 3v1.5M12 19.5V21M4.9 4.9l1.1 1.1M18 18l1.1 1.1M3 12h1.5M19.5 12H21M4.9 19.1 6 18M18 6l1.1-1.1" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4 7 7 0 0 0 20 14.5Z" />
    </svg>
  )
}

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const mounted = useHasMounted()

  const isDark = mounted && resolvedTheme === 'dark'
  const label = !mounted
    ? 'Toggle dark mode'
    : isDark
      ? 'Switch to light mode'
      : 'Switch to dark mode'

  return (
    <button
      type="button"
      onClick={() => {
        if (!mounted) return
        setTheme(isDark ? 'light' : 'dark')
      }}
      aria-label={label}
      aria-pressed={mounted ? isDark : undefined}
      title={label}
      className="inline-flex size-9 items-center justify-center rounded-md border border-border bg-surface text-foreground transition-colors hover:bg-surface-hover"
    >
      <span className="inline-flex h-4 w-4 items-center justify-center" aria-hidden="true">
        {mounted ? isDark ? <SunIcon /> : <MoonIcon /> : null}
      </span>
    </button>
  )
}
