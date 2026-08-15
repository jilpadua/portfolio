import type { Metadata } from 'next'
import { IBM_Plex_Mono, IBM_Plex_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { AppProviders } from '@/components/providers/AppProviders'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { client } from '@/lib/sanity/client'
import { siteSettingsQuery } from '@/sanity/queries'
import { getSiteUrl } from '@/lib/utils'
import './globals.css'

const plexSans = IBM_Plex_Sans({
  variable: '--font-plex-sans',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
})

const plexMono = IBM_Plex_Mono({
  variable: '--font-plex-mono',
  subsets: ['latin'],
  weight: ['400', '500'],
})

export async function generateMetadata(): Promise<Metadata> {
  const settings = await client.fetch(siteSettingsQuery)
  const title =
    settings?.seoTitle ??
    `${settings?.name ?? 'Jil Padua'} — ${settings?.role ?? 'Software Developer'}`
  const description =
    settings?.seoDescription ??
    settings?.summary ??
    'Backend-focused software developer portfolio.'

  const siteUrl = getSiteUrl()

  return {
    title,
    description,
    metadataBase: new URL(siteUrl),
    openGraph: {
      title,
      description,
      url: siteUrl,
      siteName: settings?.name ?? 'Jil Padua',
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: siteUrl,
    },
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const settings = await client.fetch(siteSettingsQuery)

  return (
    <html lang="en" className={`${plexSans.variable} ${plexMono.variable} h-full`}>
      <body className="min-h-full antialiased">
        <AppProviders>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-surface focus:px-4 focus:py-2 focus:text-sm focus:shadow"
          >
            Skip to content
          </a>
          <Header settings={settings} />
          <main id="main-content">{children}</main>
          <Footer settings={settings} />
        </AppProviders>
        <Analytics />
      </body>
    </html>
  )
}
