'use client'

import Link from 'next/link'

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
  if (!data || data.length === 0) return null

  return (
    <section id="projects" className="bg-gray-900 text-white py-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section title */}
        <h2 className="text-3xl md:text-4xl font-bold mb-12">
          Projects
        </h2>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {data.map((project, index) => (
            <article
              key={index}
              className="bg-gray-800/60 backdrop-blur-sm rounded-lg p-6 flex flex-col"
            >
              {/* Project header */}
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xl font-semibold">
                  {project.title}
                </h3>

                {project.projectType && (
                  <span className="text-xs px-2 py-1 rounded-full bg-gray-700 text-gray-300">
                    {PROJECT_TYPE_LABELS[project.projectType]}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                {project.description}
              </p>

              {/* Tech stack */}
              {project.techStack && project.techStack.length > 0 && (
                <ul className="flex flex-wrap gap-2 mb-6">
                  {project.techStack.map((tech) => (
                    <li
                      key={tech}
                      className="text-xs px-2 py-1 rounded bg-gray-700 text-gray-200"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              )}

              {/* Links */}
              <div className="mt-auto flex gap-4">
                {project.liveUrl && (
                  <Link
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-400 hover:text-blue-300"
                  >
                    Live Demo →
                  </Link>
                )}

                {project.githubUrl && (
                  <Link
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-300 hover:text-white"
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
