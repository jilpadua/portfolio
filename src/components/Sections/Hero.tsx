'use client';

import Image from 'next/image';
import Link from 'next/link';
import { urlForImage } from '@/src/lib/image';

export default function Hero({ data }: any) {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center text-white bg-gray-900 overflow-hidden">
      {data.backgroundImage && (
        <div className="absolute inset-0 z-0">
          <Image
            src={urlForImage(data.backgroundImage).url()}
            alt={data.title || 'Hero background'}
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/30" />
        </div>
      )}
      <div className="container mx-auto px-6 relative z-10 text-center">
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-gray-800/80 backdrop-blur-sm mb-6">
          <span className="w-2 h-2 rounded-full bg-blue-500 mr-2"></span>
          <span className="text-sm font-medium">{data.role}</span>
        </div>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">{data.title}</h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10">{data.description}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {data.primaryButton && (
            <Link
              href={data.primaryButton.link || '#'}
              className="inline-flex items-center justify-center px-6 py-3 text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
            >
              {data.primaryButton.text}
            </Link>
          )}
          {data.secondaryButton && (
            <Link
              href={data.secondaryButton.link || '#'}
              className="inline-flex items-center justify-center px-6 py-3 text-base font-medium rounded-md text-white bg-transparent border border-gray-600 hover:bg-gray-800 transition-colors duration-200"
            >
              {data.secondaryButton.text}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}