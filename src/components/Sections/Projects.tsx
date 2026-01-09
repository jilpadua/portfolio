'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

type Project = {
  title: string
  summary: string
  projectType: 'personal' | 'client' | 'school'
  techStack?: string[]
  liveUrl?: string
  githubUrl?: string
  imageUrl?: string
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
  const scrollRef = useRef<HTMLDivElement | null>(null)
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

  const isScrollable = data.length > 3

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return
    const amount = direction === 'left' ? -360 : 360
    scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' })
  }

  return (
    <section ref={sectionRef} className="my-16">
      {/* Section title */}
      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center tracking-tight">
        Projects
      </h2>
      <div className="w-16 h-1 bg-blue-500 mx-auto mb-10 rounded-full" />

      {/* Scroll buttons (only if needed) */}
      {isScrollable && (
        <div className="flex justify-end gap-2 mb-4">
          <button
            onClick={() => scroll('left')}
            className="px-3 py-1.5 rounded-lg bg-gray-700/60 text-white hover:bg-gray-600"
          >
            ←
          </button>
          <button
            onClick={() => scroll('right')}
            className="px-3 py-1.5 rounded-lg bg-gray-700/60 text-white hover:bg-gray-600"
          >
            →
          </button>
        </div>
      )}

      {/* Projects container */}
      <div
        ref={scrollRef}
        className={
          isScrollable
            ? 'flex gap-6 overflow-x-auto pb-4 scroll-smooth'
            : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center'
        }
      >
        {data.map((project, index) => (
          <article
            key={index}
            className={`group bg-gray-800/30 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-blue-500/40 transition
              ${isScrollable ? 'min-w-[340px]' : ''}`}
          >
            {/* Image */}
            {project.imageUrl && (
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={project.imageUrl}
                  alt={`${project.title} screenshot`}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            )}

            {/* Content */}
            <div className="p-5 flex flex-col h-full">
              {/* Header */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <h3 className="text-lg font-semibold leading-snug">
                  {project.title}
                </h3>

                <span className="text-sm px-3 py-1 rounded-full bg-gray-700/60 text-gray-200 whitespace-nowrap">
                  {PROJECT_TYPE_LABELS[project.projectType]}
                </span>
              </div>

              {/* Summary */}
              <p className="text-gray-200 text-sm leading-relaxed mb-4 line-clamp-3">
                {project.summary}
              </p>

              {/* Tech stack */}
              {project.techStack && (
                <ul className="flex flex-wrap gap-2 mb-5">
                  {project.techStack.map((tech) => (
                    <li
                      key={tech}
                      className="text-sm px-3 py-1 rounded-full bg-gray-700/60 text-gray-200"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              )}

              {/* Links */}
              <div className="flex gap-5 mt-auto">
                {project.liveUrl && (
                  <Link
                    href={project.liveUrl}
                    target="_blank"
                    className="text-sm font-medium text-blue-400 hover:text-blue-300"
                  >
                    Live Demo →
                  </Link>
                )}
                {project.githubUrl && (
                  <Link
                    href={project.githubUrl}
                    target="_blank"
                    className="text-sm font-medium text-gray-200 hover:text-white"
                  >
                    GitHub →
                  </Link>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
