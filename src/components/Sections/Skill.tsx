'use client'

import { useEffect, useRef, useState } from 'react'

type Skill = {
  name: string
  category: 'frontend' | 'backend' | 'database' | 'tools'
}

type SkillsProps = {
  data: Skill[] | null
}

const CATEGORY_LABELS: Record<Skill['category'], string> = {
  frontend: 'Frontend',
  backend: 'Backend',
  database: 'Database',
  tools: 'Tools',
}

export default function Skills({ data }: SkillsProps) {
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

  const groupedSkills = data.reduce<Record<string, Skill[]>>((acc, skill) => {
    acc[skill.category] = acc[skill.category] || []
    acc[skill.category].push(skill)
    return acc
  }, {})

  return (
    <section
      ref={sectionRef}
      id="skills"
      className={`
        py-28 md:py-36
        transition-all duration-1000 ease-out
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
      `}
    >
      <div className="max-w-5xl mx-auto px-6">
        {/* Section title */}
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center tracking-tight">
          Skills
        </h2>

        <div className="w-16 h-1 bg-blue-500 mx-auto mb-12 rounded-full" />

        {/* Skills grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {Object.entries(groupedSkills).map(([category, skills]) => (
            <div
              key={category}
              className="group bg-gray-800/40 rounded-2xl p-8 backdrop-blur-sm border border-white/5 hover:border-blue-500/30 transition-colors"
            >
              <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500" />
                {CATEGORY_LABELS[category as Skill['category']]}
              </h3>

              <ul className="flex flex-wrap gap-3">
                {skills.map((skill) => (
                  <li
                    key={skill.name}
                    className="px-4 py-2 text-sm rounded-full bg-gray-700/60 text-gray-200 hover:bg-blue-600/80 transition-colors"
                  >
                    {skill.name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
