'use client'

import { useEffect, useRef, useState } from 'react'

type AboutProps = {
  data: {
    headline: string
    summary: string
    focus?: string[]
    careerGoal?: string
  } | null
}

export default function About({ data }: AboutProps) {
  const sectionRef = useRef<HTMLElement | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (!sectionRef.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect() // animate once
        }
      },
      { threshold: 0.2 }
    )

    observer.observe(sectionRef.current)

    return () => observer.disconnect()
  }, [])

  if (!data) return null

  return (
    <section
      ref={sectionRef}
      id="about"
      className={`
        py-28 md:py-36
        transition-all duration-1000 ease-out
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
      `}
    >
      <div className="max-w-5xl mx-auto px-6">
        {/* Section title */}
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center tracking-tight">
          {data.headline || 'About Me'}
        </h2>

        {/* Accent divider */}
        <div className="w-16 h-1 bg-blue-500 mx-auto mb-8 rounded-full" />

        {/* Summary */}
        <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-14 text-center max-w-3xl mx-auto">
          {data.summary}
        </p>

        {/* Focus + Goal */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Current Focus */}
          {data.focus && data.focus.length > 0 && (
            <div className="group bg-gray-800/40 rounded-2xl p-8 backdrop-blur-sm border border-white/5 hover:border-blue-500/30 transition-colors">
              <h3 className="text-lg font-semibold mb-5 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500" />
                Current Focus
              </h3>

              <ul className="space-y-4 text-gray-300">
                {data.focus.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-blue-500 mr-3 mt-1 text-lg">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Career Goal */}
          {data.careerGoal && (
            <div className="group bg-gray-800/40 rounded-2xl p-8 backdrop-blur-sm border border-white/5 hover:border-blue-500/30 transition-colors">
              <h3 className="text-lg font-semibold mb-5 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500" />
                Career Goal
              </h3>

              <p className="text-gray-300 leading-relaxed">
                {data.careerGoal}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
