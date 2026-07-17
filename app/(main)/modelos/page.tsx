import { createServerClient } from '@/lib/supabase-server'
import ModelsGallery from './ModelsGallery'

export const dynamic = 'force-dynamic'

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://mimikids.com.ar'

export const metadata = {
  title: 'Modelos de Portachupetes · Inspirate · Mimikids',
  description: 'Explorá todos los modelos y combinaciones de colores disponibles. Elegí el diseño de portachupete que más te guste y lo personalizamos con el nombre de tu bebé.',
  keywords: [
    'modelos portachupete',
    'colores portachupete personalizado',
    'diseños portachupete bebé',
    'portachupete celeste niño',
    'portachupete rosa niña',
    'portachupete neutro',
  ],
  alternates: { canonical: `${SITE_URL}/modelos` },
  openGraph: {
    title: 'Modelos de Portachupetes · Mimikids',
    description: 'Explorá combinaciones y elegí el diseño perfecto. Personalizamos con el nombre de tu bebé.',
    url: `${SITE_URL}/modelos`,
    images: [{ url: `${SITE_URL}/mimikids.jpg`, width: 1080, height: 1080, alt: 'Modelos Mimikids' }],
  },
}

export default async function ModelosPage() {
  const supabase = createServerClient()

  const [modelsResult, productsResult] = await Promise.all([
    supabase
      .from('models')
      .select('id, name, photo, color')
      .eq('is_active', true)
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: false }),
    supabase
      .from('products')
      .select('slug, letter_style')
      .eq('is_active', true)
      .eq('category', 'portachupete'),
  ])

  return (
    <ModelsGallery
      models={modelsResult.data ?? []}
      products={productsResult.data ?? []}
    />
  )
}
