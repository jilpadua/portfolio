'use client'

import { Suspense } from 'react'
import {
  RecruiterModeProvider,
  RecruiterModeUrlSync,
} from '@/components/recruiter/RecruiterModeProvider'

type AppProvidersProps = {
  children: React.ReactNode
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <RecruiterModeProvider>
      <Suspense fallback={null}>
        <RecruiterModeUrlSync />
      </Suspense>
      {children}
    </RecruiterModeProvider>
  )
}
