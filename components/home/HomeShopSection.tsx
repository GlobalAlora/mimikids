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
    const CATEGORY_ORDER: Record<string, number> = { portachupete: 0, llavero: 1, promo: 2, funda: 3 }
    products = (data ?? []).sort(
      (a: any, b: any) => (CATEGORY_ORDER[a.category] ?? 10) - (CATEGORY_ORDER[b.category] ?? 10)
    )
  } catch {
    // fallback vacío si Supabase no responde
  }

  if (products.length === 0) return null

  return <HomeShopTabs products={products} />
}
