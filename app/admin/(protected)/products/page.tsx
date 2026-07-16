import { createServerClient } from '@/lib/supabase-server'
import ProductsClient from './ProductsClient'

export const dynamic = 'force-dynamic'

export default async function AdminProductsPage() {
  let products = []

  try {
    const supabase = createServerClient()
    const { data, error } = await supabase
      .from('products')
      .select('id, slug, name, price, images, badge, category, letter_style, production_days_min, production_days_max, stock, is_active')
      .order('created_at', { ascending: false })

    if (!error && data) products = data
  } catch {
    // DB not configured yet — show empty state
  }

  return <ProductsClient initialProducts={products} />
}
