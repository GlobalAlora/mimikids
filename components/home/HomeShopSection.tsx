import { createServerClient } from '@/lib/supabase-server'
import { MOCK_PRODUCTS } from '@/lib/data'
import HomeShopTabs from './HomeShopTabs'

const CATEGORY_ORDER: Record<string, number> = { portachupete: 0, llavero: 1, promo: 2, funda: 3 }

export default async function HomeShopSection() {
  let products = MOCK_PRODUCTS
  try {
    const supabase = createServerClient()
    const { data } = await supabase
      .from('products')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false })
    if (data && data.length > 0) {
      products = data.sort(
        (a: any, b: any) => (CATEGORY_ORDER[a.category] ?? 10) - (CATEGORY_ORDER[b.category] ?? 10)
      )
    }
  } catch {
    // usa MOCK_PRODUCTS como fallback
  }

  return <HomeShopTabs products={products} />
}
