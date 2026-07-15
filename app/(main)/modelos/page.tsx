import { createServerClient } from '@/lib/supabase-server'
import ModelsGallery from './ModelsGallery'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Modelos · Mimikids',
  description: 'Explorá todos los modelos de portachupetes disponibles. Elegí el que más te guste y lo personalizamos con el nombre de tu bebé.',
}

interface Props {
  searchParams: Promise<{ returnTo?: string }>
}

export default async function ModelosPage({ searchParams }: Props) {
  const { returnTo } = await searchParams
  const supabase = createServerClient()
  const { data: models } = await supabase
    .from('models')
    .select('id, name, photo')
    .eq('is_active', true)
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false })

  // Solo aceptar returnTo relativas al dominio para evitar open redirect
  const safeReturnTo = returnTo?.startsWith('/') ? returnTo : '/shop'

  return <ModelsGallery models={models ?? []} returnTo={safeReturnTo} />
}
