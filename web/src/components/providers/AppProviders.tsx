'use client'

import { RecruiterModeProvider } from '@/components/recruiter/RecruiterModeProvider'

export function AppProviders({ children }: { children: React.ReactNode }) {
  return <RecruiterModeProvider>{children}</RecruiterModeProvider>
}
