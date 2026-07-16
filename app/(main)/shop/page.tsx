import { createServerClient } from '@/lib/supabase-server'
import ShopClient from './ShopClient'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Tienda · Mimikids',
  description: 'Portachupetes, fundas y combos artesanales personalizables para tu bebé',
}

interface Props {
  searchParams: Promise<{ modelo?: string; modeloFoto?: string; modeloNombre?: string }>
}

export default async function ShopPage({ searchParams }: Props) {
  const sp = await searchParams
  const supabase = createServerClient()
  const { data: products, error } = await supabase
    .from('products')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false })

  if (error) console.error('[shop] Supabase error:', error.message)

  return (
    <ShopClient
      initialProducts={products ?? []}
      modelParams={sp.modeloFoto ? {
        modelo: sp.modelo ?? '',
        modeloFoto: sp.modeloFoto,
        modeloNombre: sp.modeloNombre ?? '',
      } : undefined}
    />
  )
}
