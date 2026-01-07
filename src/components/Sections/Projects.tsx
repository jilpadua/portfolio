'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

type Project = {
  title: string
  description: string
  techStack?: string[]
  projectType?: 'personal' | 'client' | 'school'
  liveUrl?: string
  githubUrl?: string
}

type ProjectsProps = {
  data: Project[] | null
}

const PROJECT_TYPE_LABELS: Record<string, string> = {
  personal: 'Personal Project',
  client: 'Client Project',
  school: 'School Project',
}

export default function Projects({ data }: ProjectsProps) {
  const sectionRef = useRef<HTMLElement | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (!sectionRef.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )

    observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  if (!data || data.length === 0) return null

  return (
    <section
      ref={sectionRef}
      id="projects"
      className={`
        py-28 md:py-36
        transition-all duration-1000 ease-out
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
      `}
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Section title */}
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center tracking-tight">
          Projects
        </h2>

        <div className="w-16 h-1 bg-blue-500 mx-auto mb-12 rounded-full" />

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {data.map((project, index) => (
            <article
              key={index}
              className="group bg-gray-800/40 backdrop-blur-sm rounded-2xl p-8 flex flex-col border border-white/5 hover:border-blue-500/30 transition-colors"
            >
              {/* Project header */}
              <div className="flex items-center justify-between mb-4 flex-wrap">
                <h3 className="text-xl font-semibold break-words">{project.title}</h3>
                {project.projectType && (
                  <span className="text-xs px-2 py-1 rounded-full bg-gray-700/60 text-gray-300 break-words">
                    {PROJECT_TYPE_LABELS[project.projectType]}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-4 break-words">
                {project.description}
              </p>

              {/* Tech stack */}
              {project.techStack && project.techStack.length > 0 && (
                <ul className="flex flex-wrap gap-2 mb-6">
                  {project.techStack.map((tech) => (
                    <li
                      key={tech}
                      className="text-xs md:text-sm px-2 py-1 rounded-full bg-gray-700/60 text-gray-200 hover:bg-blue-600/80 transition-colors break-words"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              )}

              {/* Links */}
              <div className="mt-auto flex flex-wrap gap-4">
                {project.liveUrl && (
                  <Link
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-400 hover:text-blue-300 break-all"
                  >
                    Live Demo →
                  </Link>
                )}

                {project.githubUrl && (
                  <Link
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-300 hover:text-white break-all"
                  >
                    GitHub →
                  </Link>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
