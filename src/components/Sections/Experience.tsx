'use client'

import { useEffect, useRef, useState } from 'react'

type Experience = {
  company: string
  role: string
  startDate?: string
  endDate?: string
  description?: string
}

type ExperienceProps = {
  data: Experience[] | null
}

function formatDate(date?: string) {
  if (!date) return ''
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  })
}

export default function Experience({ data }: ExperienceProps) {
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
      id="experience"
      className={`
        py-28 md:py-36
        transition-all duration-1000 ease-out
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
      `}
    >
      <div className="max-w-5xl mx-auto px-6">
        {/* Section title */}
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center tracking-tight">
          Experience
        </h2>

        <div className="w-16 h-1 bg-blue-500 mx-auto mb-12 rounded-full" />

        {/* Timeline */}
        <div className="relative border-l border-gray-700">
          {data.map((item, index) => (
            <div key={index} className="relative pl-8 pb-10">
              {/* Dot */}
              <span className="absolute left-[-6px] top-1 w-3 h-3 rounded-full bg-blue-500" />

              {/* Content Card */}
              <div className="group bg-gray-800/40 backdrop-blur-sm rounded-2xl p-6 border border-white/5 hover:border-blue-500/30 transition-colors break-words">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 flex-wrap">
                  <h3 className="text-lg font-semibold break-words">{item.role}</h3>
                  {(item.startDate || item.endDate) && (
                    <span className="text-sm text-gray-400 break-words">
                      {formatDate(item.startDate)}{' '}
                      {item.endDate ? `– ${formatDate(item.endDate)}` : '– Present'}
                    </span>
                  )}
                </div>

                <p className="text-sm text-gray-300 mb-2 font-medium break-words">{item.company}</p>

                {item.description && (
                  <p className="text-sm text-gray-300 leading-relaxed break-words">{item.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
