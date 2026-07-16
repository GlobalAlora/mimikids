import { createServerClient } from '@/lib/supabase-server'
import ModelsGallery from './ModelsGallery'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Modelos · Mimikids',
  description: 'Explorá todos los modelos de portachupetes disponibles. Elegí el que más te guste y lo personalizamos con el nombre de tu bebé.',
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
