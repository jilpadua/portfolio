import { groq } from 'next-sanity'

export const heroQuery = groq`
  *[_type == "hero"][0]{
    name,
    role,
    profileSummary,
    cvUrl
  }
`
export const aboutQuery = groq`
  *[_type == "about"][0]{
    headline,
    summary,
    focus,
    careerGoal
  }
`
export const skillsQuery = groq`
  *[_type == "skill"] | order(category asc, name asc) {
    name,
    category
  }
`
export const projectsQuery = groq`
  *[_type == "project"] | order(order asc, _createdAt desc) {
    title,
    summary,
    projectType,
    techStack,
    liveUrl,
    githubUrl,
    "imageUrl": image.asset->url
  }
`
export const experienceQuery = groq`
  *[_type == "experience"] | order(startDate desc) {
    company,
    role,
    startDate,
    endDate,
    description
  }
`
export const footerQuery = `
  *[_type == "contact"][0]{
    email,
    linkedin,
    github
  }
`

