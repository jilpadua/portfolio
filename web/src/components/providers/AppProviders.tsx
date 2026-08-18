'use client'

import { Suspense } from 'react'
import { ThemeProvider } from 'next-themes'
import {
  RecruiterModeProvider,
  RecruiterModeUrlSync,
} from '@/components/recruiter/RecruiterModeProvider'

type AppProvidersProps = {
  children: React.ReactNode
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <RecruiterModeProvider>
        <Suspense fallback={null}>
          <RecruiterModeUrlSync />
        </Suspense>
        {children}
      </RecruiterModeProvider>
    </ThemeProvider>
  )
}
