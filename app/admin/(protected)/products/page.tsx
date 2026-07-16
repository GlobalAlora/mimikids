import { createServerClient } from '@/lib/supabase-server'
import ProductsClient from './ProductsClient'

export const dynamic = 'force-dynamic'

export default async function AdminProductsPage() {
  let products = []

  try {
    const supabase = createServerClient()
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })

    if (!error && data) products = data
  } catch {
    // DB not configured yet — show empty state
  }

  return <ProductsClient initialProducts={products} />
}
