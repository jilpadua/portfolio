export type SectionCopy = {
  eyebrow?: string
  heading?: string
  description?: string
}

export type RecruiterCopy = {
  modeLabel?: string
  quickProfileHeading?: string
  projects?: {
    heading?: string
    description?: string
  }
  ctaHeading?: string
}

export type FooterCopy = {
  credit?: string
}

export type SiteSettings = {
  name: string
  role: string
  focusLine?: string
  summary?: string
  email?: string
  github?: string
  linkedin?: string
  cvUrl?: string
  seoTitle?: string
  seoDescription?: string
  selectedWork?: SectionCopy
  experience?: SectionCopy
  engineering?: SectionCopy
  contact?: SectionCopy
  recruiter?: RecruiterCopy
  footer?: FooterCopy
}

export type TechGroup = {
  category: string
  technologies?: string[]
}

export type TechnicalChallenge = {
  title?: string
  problem?: string
  investigation?: string
  solution?: string
  result?: string
}

export type TechnicalDecision = {
  title?: string
  rationale?: string
}

export type ImplementationSection = {
  title?: string
  summary?: string
  steps?: string[]
}

export type ContributionGroup = {
  category?: string
  items?: string[]
}

export type ArchitectureNodeType =
  | 'client'
  | 'gateway'
  | 'service'
  | 'database'
  | 'external'

export type ArchitectureNodeLogo =
  | 'none'
  | 'flutter'
  | 'graphql'
  | 'nodejs'
  | 'database'
  | 'api-gateway'
  | 'service'
  | 'hardware'
  | 'parking-device'

export type ArchitectureNode = {
  id: string
  label: string
  type: ArchitectureNodeType
  logo?: ArchitectureNodeLogo
  purpose?: string
  technology?: string
  responsibilities?: string[]
  relatedApis?: string[]
}

export type ArchitectureConnection = {
  from: string
  to: string
}

export type ArchitectureGraph = {
  description?: string
  nodes?: ArchitectureNode[]
  connections?: ArchitectureConnection[]
}

export type FocusArea = 'backend' | 'api' | 'database' | 'frontend' | 'mobile'

export type SanityImage = {
  asset?: { _ref: string }
  alt?: string
}

export type Project = {
  _id: string
  title: string
  slug: string
  featured?: boolean
  featuredForRecruiters?: boolean
  focusAreas?: FocusArea[]
  order?: number
  duration?: string
  tagline?: string
  shortDescription?: string
  overview?: string
  problem?: string
  audience?: string
  role?: string
  contribution?: string[]
  contributionGroups?: ContributionGroup[]
  techGroups?: TechGroup[]
  architecture?: string[]
  architectureGraph?: ArchitectureGraph
  implementation?: ImplementationSection[]
  technicalChallenges?: TechnicalChallenge[]
  technicalDecisions?: TechnicalDecision[]
  outcomes?: string[]
  heroImage?: SanityImage
  gallery?: SanityImage[]
  githubUrl?: string
  liveUrl?: string
}

export type Experience = {
  _id: string
  company: string
  role: string
  startDate?: string
  endDate?: string
  isCurrent?: boolean
  bullets?: string[]
}

export type SkillGroup = {
  _id: string
  category: string
  label?: string
  technologies?: string[]
  order?: number
}

export type About = {
  eyebrow?: string
  headline?: string
  summary?: string
  focusPoints?: string[]
}

export type ProjectCard = Pick<
  Project,
  | '_id'
  | 'title'
  | 'slug'
  | 'tagline'
  | 'shortDescription'
  | 'contribution'
  | 'techGroups'
  | 'heroImage'
  | 'featuredForRecruiters'
  | 'focusAreas'
>

export type CaseStudySectionId =
  | 'overview'
  | 'problem'
  | 'architecture'
  | 'implementation'
  | 'challenges'
  | 'contribution'
  | 'outcome'
  | 'technologies'
