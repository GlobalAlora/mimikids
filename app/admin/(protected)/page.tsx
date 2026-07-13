import { TrendingUp, ShoppingBag, Clock, CheckCircle } from 'lucide-react'
import { formatPrice } from '@/lib/utils'
import { createServerClient } from '@/lib/supabase-server'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

const STATUS_LABELS: Record<string, { label: string; className: string }> = {
  pendiente_pago:  { label: 'Pendiente pago',  className: 'bg-yellow-100 text-yellow-700' },
  pago_confirmado: { label: 'Pago confirmado', className: 'bg-blue-100 text-blue-700' },
  en_produccion:   { label: 'En producción',   className: 'bg-purple-100 text-purple-700' },
  enviado:         { label: 'Enviado',          className: 'bg-green-100 text-green-700' },
  entregado:       { label: 'Entregado',        className: 'bg-gray-100 text-gray-700' },
  cancelado:       { label: 'Cancelado',        className: 'bg-red-100 text-red-700' },
}

async function getStats() {
  try {
    const supabase = createServerClient()
    const now = new Date()
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString()

    const [
      { count: total_orders },
      { count: pending_orders },
      { count: in_production },
      { data: revenueData },
      { data: recentOrders },
    ] = await Promise.all([
      supabase.from('orders').select('*', { count: 'exact', head: true }),
      supabase.from('orders').select('*', { count: 'exact', head: true }).eq('status', 'pendiente_pago'),
      supabase.from('orders').select('*', { count: 'exact', head: true }).eq('status', 'en_produccion'),
      supabase.from('orders').select('total').gte('created_at', monthStart).not('status', 'eq', 'cancelado'),
      supabase.from('orders').select('id, order_number, buyer, total, status, items, created_at').order('created_at', { ascending: false }).limit(5),
    ])

    const monthly_revenue = revenueData?.reduce((sum, o) => sum + (o.total || 0), 0) ?? 0

    return {
      total_orders: total_orders ?? 0,
      pending_orders: pending_orders ?? 0,
      in_production: in_production ?? 0,
      monthly_revenue,
      recentOrders: recentOrders ?? [],
    }
  } catch {
    return { total_orders: 0, pending_orders: 0, in_production: 0, monthly_revenue: 0, recentOrders: [] }
  }
}

export default async function AdminDashboard() {
  const stats = await getStats()

  const statCards = [
    { label: 'Pedidos totales',    value: stats.total_orders,               icon: ShoppingBag, color: 'bg-pink-50 text-pink-500' },
    { label: 'Pendientes de pago', value: stats.pending_orders,             icon: Clock,       color: 'bg-yellow-50 text-yellow-500' },
    { label: 'En producción',      value: stats.in_production,              icon: TrendingUp,  color: 'bg-purple-50 text-purple-500' },
    { label: 'Ingresos del mes',   value: formatPrice(stats.monthly_revenue), icon: CheckCircle, color: 'bg-green-50 text-green-500' },
  ]

  return (
    <div className="p-8">
      <h1 className="font-playfair text-2xl font-bold text-[#6b3d50] mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{stat.label}</p>
              <div className={`w-9 h-9 rounded-xl ${stat.color} flex items-center justify-center`}>
                <stat.icon size={16} />
              </div>
            </div>
            <p className="font-playfair text-2xl font-bold text-gray-800">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-semibold text-gray-800">Pedidos recientes</h2>
          <Link href="/admin/orders" className="text-sm text-[#d4768a] hover:underline">
            Ver todos →
          </Link>
        </div>

        {stats.recentOrders.length === 0 ? (
          <div className="px-6 py-10 text-center text-gray-400 text-sm">
            Todavía no hay pedidos.
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {stats.recentOrders.map((order: {
              id: string
              order_number: string
              buyer: { name: string }
              total: number
              status: string
              items: unknown[]
            }) => {
              const statusInfo = STATUS_LABELS[order.status] ?? { label: order.status, className: 'bg-gray-100 text-gray-600' }
              const itemCount = Array.isArray(order.items) ? order.items.length : 0
              return (
                <div key={order.id} className="px-6 py-4 flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-sm text-gray-800">{order.buyer?.name}</p>
                    <p className="text-xs text-gray-400">
                      {order.order_number} · {itemCount} producto{itemCount !== 1 ? 's' : ''}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusInfo.className}`}>
                      {statusInfo.label}
                    </span>
                    <p className="font-bold text-[#d4768a] text-sm">{formatPrice(order.total)}</p>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
