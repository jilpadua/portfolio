export const PORTFOLIO_EVENTS = [
  'recruiter_mode_entered',
  'recruiter_mode_exited',
  'case_study_viewed',
  'resume_clicked',
  'github_clicked',
  'linkedin_clicked',
  'contact_clicked',
] as const

export type PortfolioEventName = (typeof PORTFOLIO_EVENTS)[number]

export const NOTIFY_EVENT_NAMES = [
  'recruiter_mode_entered',
  'resume_clicked',
  'case_study_viewed',
  'contact_clicked',
] as const

export type NotifyEventName = (typeof NOTIFY_EVENT_NAMES)[number]

export const EVENT_LABELS: Record<PortfolioEventName, string> = {
  recruiter_mode_entered: 'Recruiter Mode Entered',
  recruiter_mode_exited: 'Recruiter Mode Exited',
  case_study_viewed: 'Case Study Viewed',
  resume_clicked: 'Resume Clicked',
  github_clicked: 'GitHub Clicked',
  linkedin_clicked: 'LinkedIn Clicked',
  contact_clicked: 'Contact Clicked',
}

export const EVENT_NOTES: Partial<Record<NotifyEventName, string>> = {
  recruiter_mode_entered: 'Recruiter Mode was activated.',
  resume_clicked: 'A visitor opened the resume.',
  case_study_viewed: 'A visitor viewed this case study.',
  contact_clicked: 'A visitor opened the contact email link.',
}

export type PortfolioEventContext = {
  projectTitle?: string
  projectSlug?: string
}

export function isPortfolioEvent(value: string): value is PortfolioEventName {
  return (PORTFOLIO_EVENTS as readonly string[]).includes(value)
}

export function isNotifyEvent(value: string): value is NotifyEventName {
  return (NOTIFY_EVENT_NAMES as readonly string[]).includes(value)
}
