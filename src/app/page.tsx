import client from '@/src/lib/sanityClient';
import { HOME_PAGE_QUERY } from '@/src/sanity/queries/page';

import Navbar from '@/src/components/Layout/Navbar';
import Footer from '@/src/components/Layout/Footer';

import Hero from '@/src/components/Sections/Hero';
import Experience from '@/src/components/Sections/Experience';
import Projects from '@/src/components/Sections/Projects';
import Contact from '@/src/components/Sections/Contact';

export default async function HomePage() {
  const page = await client.fetch(HOME_PAGE_QUERY);

  return (
    <>
      <Navbar />

      <main>
  {page?.sections?.length ? (
    page.sections.map((section: any, index: number) => {
      switch (section._type) {
        case 'hero':
          return <Hero key={index} data={section} />;
        case 'experienceSection':
          return <Experience key={index} data={section} />;
        case 'projectsSection':
          return <Projects key={index} data={section} />;
        case 'contactSection':
          return <Contact key={index} data={section} />;
        default:
          return null;
      }
    })
  ) : (
    <p className="flex items-center justify-center h-screen text-center text-gray-500 text-lg">
      🚧 Portfolio in development — content coming soon!
    </p>
  )}
</main>

      <Footer />
    </>
  );
}
