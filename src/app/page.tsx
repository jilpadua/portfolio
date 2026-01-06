import { client } from '@/src/sanity/client'
import { heroQuery } from '@/src/sanity/queries'
import Hero from '@/src/components/Sections/Hero'
import Navbar from '@/src/components/Layout/Navbar'
import Footer from '@/src/components/Layout/Footer'

export default async function HomePage() {
  const hero = await client.fetch(heroQuery)

  return (
    <>
      <Navbar />
      <Hero data={hero} />
      <Footer />
    </>
  )
}
