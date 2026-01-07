'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

type HeroProps = {
  data: {
    name: string
    role: string
    profileSummary: string
    cvUrl?: string
  } | null
  className?: string
}

export default function Hero({ data, className = '' }: HeroProps) {
  const [sanitizedSummary, setSanitizedSummary] = useState('')

  useEffect(() => {
    if (!data) return

    import('dompurify').then((DOMPurify) => {
      const clean = DOMPurify.default.sanitize(data.profileSummary, {
        ALLOWED_TAGS: ['strong', 'em', 'br'],
        ALLOWED_ATTR: [],
      })
      setSanitizedSummary(clean)
    })
  }, [data])

  if (!data) return null

  return (
    <section
      id="hero"
      className={`relative min-h-screen py-24 md:py-32 flex items-center justify-center text-white overflow-hidden ${className}`}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-black/40" />

      <div className="container mx-auto px-6 relative z-10 text-center">
        {/* Role pill */}
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-gray-800/80 backdrop-blur-sm mb-6">
          <span className="w-2 h-2 rounded-full bg-blue-500 mr-2" />
          <span className="text-sm font-medium">{data.role}</span>
        </div>

        {/* Name */}
        <h1 className="font-inter font-semibold tracking-tight text-[2rem] sm:text-5xl md:text-6xl whitespace-nowrap mb-6">
          {data.name}
        </h1>

        {/* Profile summary */}
        {sanitizedSummary && (
          <p
            className="text-gray-200 text-md mb-8 max-w-2xl leading-relaxed mx-auto"
            dangerouslySetInnerHTML={{ __html: sanitizedSummary }}
          />
        )}

        {/* CTA */}
        {data.cvUrl && (
          <div className="flex justify-center">
            <Link
              href={data.cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 text-base font-medium rounded-md text-white bg-blue-900 hover:bg-blue-800 transition-colors duration-200"
            >
              Download CV
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
