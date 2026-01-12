'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 w-full z-50 bg-gray-900/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="text-white font-bold text-xl">&lt;/&gt;</div>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6">
          <Link href="#hero" className="text-gray-200 hover:text-white">Home</Link>
          <Link href="#about" className="text-gray-200 hover:text-white">About</Link>
          <Link href="#project" className="text-gray-200 hover:text-white">Projects</Link>
          <Link href="#experience" className="text-gray-200 hover:text-white">Experience</Link>
          <Link href="#contact" className="text-gray-200 hover:text-white">Contact</Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-200 focus:outline-none"
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-900 border-t border-gray-800">
          <div className="flex flex-col px-6 py-4 space-y-4">
            <Link href="#hero" onClick={() => setIsOpen(false)} className="text-gray-200 hover:text-white">Home</Link>
            <Link href="#about" onClick={() => setIsOpen(false)} className="text-gray-200 hover:text-white">About</Link>
            <Link href="#projects" onClick={() => setIsOpen(false)} className="text-gray-200 hover:text-white">Projects</Link>
            <Link href="#experience" onClick={() => setIsOpen(false)} className="text-gray-200 hover:text-white">Experience</Link>
            <Link href="#contact" onClick={() => setIsOpen(false)} className="text-gray-200 hover:text-white">Contact</Link>
          </div>
        </div>
      )}
    </nav>
  )
}
