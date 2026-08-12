import type { MetadataRoute } from 'next'
import { client } from '@/lib/sanity/client'
import { allProjectSlugsQuery } from '@/sanity/queries'
import { getSiteUrl } from '@/lib/utils'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl()
  const slugs = await client.fetch<{ slug: string }[]>(allProjectSlugsQuery)

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    ...slugs.map(({ slug }) => ({
      url: `${siteUrl}/projects/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ]
}
