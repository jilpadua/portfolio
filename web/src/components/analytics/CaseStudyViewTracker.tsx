'use client'

import { useEffect } from 'react'
import { trackPortfolioEvent } from '@/lib/analytics/track'

type CaseStudyViewTrackerProps = {
  projectTitle: string
  projectSlug: string
}

export function CaseStudyViewTracker({
  projectTitle,
  projectSlug,
}: CaseStudyViewTrackerProps) {
  useEffect(() => {
    trackPortfolioEvent('case_study_viewed', { projectTitle, projectSlug })
  }, [projectTitle, projectSlug])

  return null
}
