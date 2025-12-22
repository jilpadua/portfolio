'use client';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="fixed w-full z-50 bg-gray-900 bg-opacity-80 backdrop-blur-md px-6 py-4 flex justify-between items-center">
      <div className="text-white font-bold text-xl">&lt;/&gt;</div>
      <div className="space-x-6">
        <Link href="#hero" className="text-gray-200 hover:text-white">Home</Link>
        <Link href="#experience" className="text-gray-200 hover:text-white">Experience</Link>
        <Link href="#projects" className="text-gray-200 hover:text-white">Projects</Link>
        <Link href="#contact" className="text-gray-200 hover:text-white">Contact</Link>
      </div>
    </nav>
  );
}