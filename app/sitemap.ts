import type { MetadataRoute } from 'next'
import { createServerClient } from '@/lib/supabase-server'

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://mimikids.com.ar'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let products: { slug: string; updated_at: string }[] = []
  try {
    const supabase = createServerClient()
    const { data } = await supabase
      .from('products')
      .select('slug, updated_at')
      .eq('is_active', true)
    products = data ?? []
  } catch {
    // si Supabase no está disponible, el sitemap sigue siendo válido sin productos
  }

  const productRoutes: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${siteUrl}/shop/${p.slug}`,
    lastModified: p.updated_at ? new Date(p.updated_at) : new Date(),
    changeFrequency: 'weekly',
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
