import type { MetadataRoute } from 'next'
import { MOCK_PRODUCTS } from '@/lib/data'

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://mimikids.com.ar'

export default function sitemap(): MetadataRoute.Sitemap {
  const productRoutes = MOCK_PRODUCTS.map((product) => ({
    url: `${siteUrl}/shop/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${siteUrl}/shop`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    ...productRoutes,
  ]
}
