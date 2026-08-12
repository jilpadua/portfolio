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

export type SanityImage = {
  asset?: { _ref: string }
  alt?: string
}

export type Project = {
  _id: string
  title: string
  slug: string
  featured?: boolean
  order?: number
  tagline?: string
  shortDescription?: string
  overview?: string
  problem?: string
  audience?: string
  role?: string
  contribution?: string[]
  techGroups?: TechGroup[]
  architecture?: string[]
  technicalChallenges?: TechnicalChallenge[]
  technicalDecisions?: TechnicalDecision[]
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
>
