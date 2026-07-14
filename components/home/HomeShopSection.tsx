import { createServerClient } from '@/lib/supabase-server'
import HomeShopTabs from './HomeShopTabs'

export default async function HomeShopSection() {
  let products: any[] = []
  try {
    const supabase = createServerClient()
    const { data } = await supabase
      .from('products')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false })
    products = data ?? []
  } catch {
    // fallback vacío si Supabase no responde
  }

  if (products.length === 0) return null

  return <HomeShopTabs products={products} />
}
