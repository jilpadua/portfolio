import { client } from '@/src/sanity/client'
import { heroQuery } from '@/src/sanity/queries'
import { aboutQuery } from '@/src/sanity/queries'
import { skillsQuery } from '@/src/sanity/queries'
import { projectsQuery } from '@/src/sanity/queries'
import { experienceQuery } from '@/src/sanity/queries'
import { footerQuery } from '@/src/sanity/queries'

import Hero from '@/src/components/Sections/Hero'
import About from '@/src/components/Sections/About'
import Skills from '@/src/components/Sections/Skill'
import Projects from '@/src/components/Sections/Projects'
import Experience from '@/src/components/Sections/Experience'
import Navbar from '@/src/components/Layout/Navbar'
import Footer from '@/src/components/Layout/Footer'

export default async function HomePage() {
  const hero = await client.fetch(heroQuery)
  const about = await client.fetch(aboutQuery)
  const skills = await client.fetch(skillsQuery)
  const projects = await client.fetch(projectsQuery)
  const experience = await client.fetch(experienceQuery)
  const footer = await client.fetch(footerQuery)

  return (
    <>
      <Navbar />
      <Hero data={hero} />
      <About data={about} />
      <Skills data={skills} />
      <Projects data={projects} />
      <Experience data={experience} />
      <Footer data={footer}/>
    </>
  )
}
