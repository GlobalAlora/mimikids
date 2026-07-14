import { createServerClient } from '@/lib/supabase-server'
import ShopClient from './ShopClient'

export const metadata = {
  title: 'Tienda · Mimikids',
  description: 'Portachupetes, fundas y combos artesanales personalizables para tu bebé',
}

export default async function ShopPage() {
  const supabase = createServerClient()
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false })

  return <ShopClient initialProducts={products ?? []} />
}
