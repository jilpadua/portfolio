'use client'

import { Suspense } from 'react'
import { RecruiterModeProvider } from '@/components/recruiter/RecruiterModeProvider'

type AppProvidersProps = {
  children: React.ReactNode
  initialUrlMode?: string | null
}

export function AppProviders({ children, initialUrlMode = null }: AppProvidersProps) {
  return (
    <Suspense fallback={children}>
      <RecruiterModeProvider initialUrlMode={initialUrlMode}>{children}</RecruiterModeProvider>
    </Suspense>
  )
}
