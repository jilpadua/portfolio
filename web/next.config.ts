import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Allow LAN devices to load Next.js dev assets/HMR (not just localhost)
  allowedDevOrigins: ['192.168.0.15', '127.0.0.1'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
}

export default nextConfig
