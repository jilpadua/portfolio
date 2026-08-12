import { groq } from 'next-sanity'

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0]{
    name,
    role,
    focusLine,
    summary,
    email,
    github,
    linkedin,
    cvUrl,
    seoTitle,
    seoDescription
  }
`

export const featuredProjectsQuery = groq`
  *[_type == "project" && featured == true] | order(order asc, _createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    tagline,
    shortDescription,
    contribution,
    techGroups[]{
      category,
      technologies
    },
    heroImage
  }
`

export const allProjectSlugsQuery = groq`
  *[_type == "project" && defined(slug.current)]{
    "slug": slug.current
  }
`

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    tagline,
    shortDescription,
    overview,
    problem,
    audience,
    role,
    contribution,
    techGroups[]{
      category,
      technologies
    },
    architecture,
    technicalChallenges[]{
      title,
      problem,
      investigation,
      solution,
      result
    },
    technicalDecisions[]{
      title,
      rationale
    },
    heroImage,
    gallery,
    githubUrl,
    liveUrl
  }
`

export const featuredProjectNavQuery = groq`
  *[_type == "project" && featured == true] | order(order asc, _createdAt desc) {
    title,
    "slug": slug.current
  }
`

export const experienceQuery = groq`
  *[_type == "experience"] | order(startDate desc) {
    _id,
    company,
    role,
    startDate,
    endDate,
    isCurrent,
    bullets
  }
`

export const skillGroupsQuery = groq`
  *[_type == "skillGroup"] | order(order asc, category asc) {
    _id,
    category,
    label,
    technologies,
    order
  }
`

export const aboutQuery = groq`
  *[_type == "about"][0]{
    headline,
    summary,
    focusPoints
  }
`
