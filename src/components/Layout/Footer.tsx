'use client'

import { Mail, Linkedin, Github } from 'lucide-react'

type ContactData = {
  email?: string
  linkedin?: string
  github?: string
}

type FooterProps = {
  data: ContactData | null
}

export default function Footer({ data }: FooterProps) {
  const currentYear = new Date().getFullYear()

  if (!data) return null

  return (
    <footer
      id="contact"
      aria-labelledby="footer-title"
      className="bg-gray-900 border-t border-white/10"
    >
      <div className="max-w-6xl mx-auto px-6 py-20 text-center">
        {/* Contact heading */}
        <h2
          id="footer-title"
          className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-4"
        >
          Let’s Work Together
        </h2>

        <p className="text-gray-400 mb-10 max-w-xl mx-auto">
          Open to opportunities, collaborations, and conversations.
        </p>

        {/* Email (primary CTA) */}
        {data.email && (
          <a
            href={`mailto:${data.email}`}
            className="inline-flex items-center gap-3 text-lg md:text-xl font-medium underline underline-offset-4 decoration-blue-500 hover:text-blue-400 transition-colors mb-12"
            aria-label="Send an email"
          >
            <Mail className="w-5 h-5" aria-hidden="true" />
            {data.email}
          </a>
        )}

        {/* Social links */}
        <div className="flex justify-center gap-6 mb-12">
          {data.linkedin && (
            <a
              href={data.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit LinkedIn profile"
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/10 text-sm text-gray-300 hover:border-blue-500/40 hover:text-blue-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              <Linkedin className="w-4 h-4" aria-hidden="true" />
              LinkedIn
            </a>
          )}

          {data.github && (
            <a
              href={data.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit GitHub profile"
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/10 text-sm text-gray-300 hover:border-blue-500/40 hover:text-blue-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              <Github className="w-4 h-4" aria-hidden="true" />
              GitHub
            </a>
          )}
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-white/10 mb-6" />

        {/* Copyright */}
        <p className="text-sm text-gray-500">
          © {currentYear} Jilmer Padua. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
