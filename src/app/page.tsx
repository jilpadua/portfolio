import { client } from '@/src/sanity/client'
import {
  heroQuery,
  aboutQuery,
  skillsQuery,
  projectsQuery,
  experienceQuery,
  footerQuery,
} from '@/src/sanity/queries'

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
    <main className="text-white">
      <Navbar />

      {/* Unified background */}
      <div className="bg-black/90">
        <Hero data={hero} />
        <About data={about} />
        <Skills data={skills} />
        <Projects data={projects} />
        <Experience data={experience} />
      </div>

      <Footer data={footer} />
    </main>
  )
}
