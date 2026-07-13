import { createServerClient } from '@/lib/supabase-server'
import OrdersClient from './OrdersClient'

export const dynamic = 'force-dynamic'

export default async function AdminOrdersPage() {
  let orders = []

  try {
    const supabase = createServerClient()
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false })

    if (!error && data) orders = data
  } catch {
    // DB not configured yet — show empty state
  }

  return <OrdersClient initialOrders={orders} />
}
