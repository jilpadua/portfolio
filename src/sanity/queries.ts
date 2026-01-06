import { groq } from 'next-sanity'

export const heroQuery = groq`
  *[_type == "hero"][0]{
    name,
    role,
    profileSummary,
    cvUrl
  }
`

// export const experienceQuery = groq`
//   *[_type == "experience"] | order(startDate desc){
//     organization,
//     role,
//     startDate,
//     endDate,
//     isPresent
//   }
// `

// export const projectsQuery = groq`
//   *[_type == "project"]{
//     name,
//     description,
//     techStack,
//     projectType
//   }
// `

// export const certificatesQuery = groq`
//   *[_type == "certificate"] | order(date desc){
//     title,
//     issuer,
//     date,
//     link,
//     type
//   }
// `

// export const contactQuery = groq`
//   *[_type == "contact"][0]{
//     email,
//     phone,
//     location,
//     contactMessage
//   }
// `

export const footerQuery = groq`
  *[_type == "footer"][0]{
    socialLinks[]{
      label,
      url
    }
  }
`
