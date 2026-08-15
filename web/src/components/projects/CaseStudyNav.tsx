'use client'

import { useEffect, useState } from 'react'
import {
  CASE_STUDY_SECTION_LABELS,
} from '@/lib/case-study'
import type { CaseStudySectionId } from '@/lib/sanity/types'

type CaseStudyNavProps = {
  sections: CaseStudySectionId[]
}

const HEADER_OFFSET = 128

export function CaseStudyNav({ sections }: CaseStudyNavProps) {
  const [activeSection, setActiveSection] = useState<CaseStudySectionId | null>(
    sections[0] ?? null,
  )

  useEffect(() => {
    if (!sections.length) return

    const elements = sections
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => Boolean(element))

    if (!elements.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visible[0]?.target.id) {
          setActiveSection(visible[0].target.id as CaseStudySectionId)
        }
      },
      {
        rootMargin: `-${HEADER_OFFSET}px 0px -55% 0px`,
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    )

    for (const element of elements) {
      observer.observe(element)
    }

    return () => observer.disconnect()
  }, [sections])

  useEffect(() => {
    if (!window.location.hash) return
    const id = window.location.hash.replace('#', '') as CaseStudySectionId
    if (!sections.includes(id)) return

    const element = document.getElementById(id)
    if (!element) return

    window.requestAnimationFrame(() => {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setActiveSection(id)
    })
  }, [sections])

  if (!sections.length) return null

  return (
    <nav
      aria-label="Case study sections"
      className="sticky top-16 z-40 border-b border-border bg-background/95 backdrop-blur-sm"
    >
      <div className="container-main">
        <ul className="flex gap-1 overflow-x-auto py-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {sections.map((section) => {
            const isActive = activeSection === section
            return (
              <li key={section} className="shrink-0">
                <a
                  href={`#${section}`}
                  aria-current={isActive ? 'true' : undefined}
                  className={`inline-flex rounded-md px-3 py-1.5 text-sm whitespace-nowrap transition-colors ${
                    isActive
                      ? 'bg-surface text-foreground ring-1 ring-border'
                      : 'text-muted hover:text-foreground'
                  }`}
                  onClick={() => setActiveSection(section)}
                >
                  {CASE_STUDY_SECTION_LABELS[section]}
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}
