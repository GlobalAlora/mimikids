import { TrendingUp, ShoppingBag, Clock, CheckCircle, ShoppingCart, Mail, BarChart3, Tag } from 'lucide-react'
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
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
    const dayAgo  = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()

    const [
      { count: total_orders },
      { count: pending_orders },
      { count: in_production },
      { data: revenueData },
      { data: recentOrders },
      { count: abandoned_week },
      { count: abandoned_day },
      { count: recovery_sent },
      { data: couponData },
      { data: recentAbandoned },
      { data: statusBreakdown },
    ] = await Promise.all([
      supabase.from('orders').select('*', { count: 'exact', head: true }),
      supabase.from('orders').select('*', { count: 'exact', head: true }).eq('status', 'pendiente_pago'),
      supabase.from('orders').select('*', { count: 'exact', head: true }).eq('status', 'en_produccion'),
      supabase.from('orders').select('total').gte('created_at', monthStart).not('status', 'eq', 'cancelado'),
      supabase.from('orders').select('id, order_number, buyer, total, status, items, created_at').order('created_at', { ascending: false }).limit(5),
      supabase.from('abandoned_carts').select('*', { count: 'exact', head: true }).gte('created_at', weekAgo),
      supabase.from('abandoned_carts').select('*', { count: 'exact', head: true }).gte('created_at', dayAgo),
      supabase.from('abandoned_carts').select('*', { count: 'exact', head: true }).eq('recovery_sent', true).gte('created_at', weekAgo),
      supabase.from('orders').select('coupon_code, coupon_discount').not('coupon_code', 'is', null).gte('created_at', monthStart),
      supabase.from('abandoned_carts').select('email, buyer_name, total, recovery_sent, created_at').order('created_at', { ascending: false }).limit(6),
      supabase.from('orders').select('status').not('status', 'eq', 'cancelado'),
    ])

    const monthly_revenue = revenueData?.reduce((sum, o) => sum + (o.total || 0), 0) ?? 0
    const avg_ticket = (revenueData?.length ?? 0) > 0 ? monthly_revenue / (revenueData?.length ?? 1) : 0

    const coupon_uses = couponData?.length ?? 0
    const coupon_savings = couponData?.reduce((sum, o) => sum + (o.coupon_discount || 0), 0) ?? 0

    const completed = (statusBreakdown ?? []).filter(o =>
      ['pago_confirmado', 'en_produccion', 'enviado', 'entregado'].includes(o.status)
    ).length
    const abandoned_no_recovery = (abandoned_week ?? 0) - (recovery_sent ?? 0)
    const conversion_rate = completed + (abandoned_week ?? 0) > 0
      ? Math.round((completed / (completed + (abandoned_week ?? 0))) * 100)
      : null

    return {
      total_orders: total_orders ?? 0,
      pending_orders: pending_orders ?? 0,
      in_production: in_production ?? 0,
      monthly_revenue,
      avg_ticket,
      abandoned_week: abandoned_week ?? 0,
      abandoned_day: abandoned_day ?? 0,
      recovery_sent: recovery_sent ?? 0,
      abandoned_no_recovery,
      coupon_uses,
      coupon_savings,
      conversion_rate,
      recentOrders: recentOrders ?? [],
      recentAbandoned: recentAbandoned ?? [],
    }
  } catch {
    return {
      total_orders: 0, pending_orders: 0, in_production: 0,
      monthly_revenue: 0, avg_ticket: 0, abandoned_week: 0, abandoned_day: 0,
      recovery_sent: 0, abandoned_no_recovery: 0, coupon_uses: 0, coupon_savings: 0,
      conversion_rate: null, recentOrders: [], recentAbandoned: [],
    }
  }
}

function maskEmail(email: string) {
  const [user, domain] = email.split('@')
  return `${user.slice(0, 2)}***@${domain}`
}

export default async function AdminDashboard() {
  const s = await getStats()

  return (
    <div className="p-6 md:p-8 space-y-8">
      <h1 className="font-playfair text-2xl font-bold text-[#6b3d50]">Dashboard</h1>

      {/* KPIs principales */}
      <section>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Pedidos y revenue</p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Pedidos totales',    value: s.total_orders,                 icon: ShoppingBag,  color: 'bg-pink-50 text-pink-500' },
            { label: 'Ingresos del mes',   value: formatPrice(s.monthly_revenue),  icon: TrendingUp,   color: 'bg-green-50 text-green-500' },
            { label: 'Ticket promedio',    value: s.avg_ticket > 0 ? formatPrice(Math.round(s.avg_ticket)) : '—', icon: BarChart3, color: 'bg-blue-50 text-blue-500' },
            { label: 'En producción',      value: s.in_production,                icon: Clock,        color: 'bg-purple-50 text-purple-500' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider leading-tight">{stat.label}</p>
                <div className={`w-9 h-9 rounded-xl ${stat.color} flex items-center justify-center flex-shrink-0`}>
                  <stat.icon size={16} />
                </div>
              </div>
              <p className="font-playfair text-2xl font-bold text-gray-800">{stat.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Carritos abandonados */}
      <section>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Carritos abandonados</p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              label: 'Últimas 24h',
              value: s.abandoned_day,
              icon: ShoppingCart,
              color: s.abandoned_day > 0 ? 'bg-orange-50 text-orange-500' : 'bg-gray-50 text-gray-400',
              note: null,
            },
            {
              label: 'Esta semana',
              value: s.abandoned_week,
              icon: ShoppingCart,
              color: 'bg-orange-50 text-orange-400',
              note: null,
            },
            {
              label: 'Emails enviados',
              value: s.recovery_sent,
              icon: Mail,
              color: 'bg-blue-50 text-blue-500',
              note: `de ${s.abandoned_week} esta semana`,
            },
            {
              label: 'Sin recuperar',
              value: s.abandoned_no_recovery,
              icon: ShoppingCart,
              color: s.abandoned_no_recovery > 0 ? 'bg-red-50 text-red-400' : 'bg-green-50 text-green-400',
              note: s.conversion_rate !== null ? `Conversión ~${s.conversion_rate}%` : null,
            },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider leading-tight">{stat.label}</p>
                <div className={`w-9 h-9 rounded-xl ${stat.color} flex items-center justify-center flex-shrink-0`}>
                  <stat.icon size={16} />
                </div>
              </div>
              <p className="font-playfair text-2xl font-bold text-gray-800">{stat.value}</p>
              {stat.note && <p className="text-xs text-gray-400 mt-1">{stat.note}</p>}
            </div>
          ))}
        </div>
      </section>

      {/* Cupones + pendientes */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Cupón BIENVENIDA10 */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center">
              <Tag size={15} />
            </div>
            <p className="font-semibold text-gray-800 text-sm">Cupón BIENVENIDA10 — este mes</p>
          </div>
          <div className="flex gap-8">
            <div>
              <p className="text-xs text-gray-400 mb-1">Usos</p>
              <p className="font-playfair text-2xl font-bold text-gray-800">{s.coupon_uses}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">Descuento total dado</p>
              <p className="font-playfair text-2xl font-bold text-[#d4768a]">
                {s.coupon_savings > 0 ? formatPrice(s.coupon_savings) : '—'}
              </p>
            </div>
          </div>
        </div>

        {/* Pendientes de pago */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-xl bg-yellow-50 text-yellow-500 flex items-center justify-center">
              <CheckCircle size={15} />
            </div>
            <p className="font-semibold text-gray-800 text-sm">Pendientes de confirmación</p>
          </div>
          <p className="font-playfair text-2xl font-bold text-gray-800 mb-1">{s.pending_orders}</p>
          <p className="text-xs text-gray-400">
            {s.pending_orders === 0
              ? 'Todo al día 🎉'
              : `${s.pending_orders} pedido${s.pending_orders > 1 ? 's' : ''} esperando confirmación de pago`}
          </p>
          {s.pending_orders > 0 && (
            <Link href="/admin/orders" className="inline-block mt-3 text-xs text-[#d4768a] hover:underline font-medium">
              Ver pedidos →
            </Link>
          )}
        </div>
      </section>

      {/* Tablas */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pedidos recientes */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-semibold text-gray-800 text-sm">Pedidos recientes</h2>
            <Link href="/admin/orders" className="text-xs text-[#d4768a] hover:underline">Ver todos →</Link>
          </div>
          {s.recentOrders.length === 0 ? (
            <div className="px-6 py-10 text-center text-gray-400 text-sm">Todavía no hay pedidos.</div>
          ) : (
            <div className="divide-y divide-gray-50">
              {s.recentOrders.map((order: {
                id: string; order_number: string; buyer: { name: string }
                total: number; status: string; items: unknown[]
              }) => {
                const statusInfo = STATUS_LABELS[order.status] ?? { label: order.status, className: 'bg-gray-100 text-gray-600' }
                const itemCount = Array.isArray(order.items) ? order.items.length : 0
                return (
                  <div key={order.id} className="px-6 py-3.5 flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-sm text-gray-800">{order.buyer?.name}</p>
                      <p className="text-xs text-gray-400">{order.order_number} · {itemCount} prod.</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${statusInfo.className}`}>
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

        {/* Carritos abandonados recientes */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-semibold text-gray-800 text-sm">Carritos abandonados recientes</h2>
          </div>
          {s.recentAbandoned.length === 0 ? (
            <div className="px-6 py-10 text-center text-gray-400 text-sm">No hay carritos abandonados.</div>
          ) : (
            <div className="divide-y divide-gray-50">
              {s.recentAbandoned.map((cart: {
                email: string; buyer_name: string; total: number
                recovery_sent: boolean; created_at: string
              }, i: number) => {
                const hoursAgo = Math.round((Date.now() - new Date(cart.created_at).getTime()) / 3600000)
                return (
                  <div key={i} className="px-6 py-3.5 flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm text-gray-800">
                        {cart.buyer_name || maskEmail(cart.email)}
                      </p>
                      <p className="text-xs text-gray-400">
                        {maskEmail(cart.email)} · hace {hoursAgo}h
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                        cart.recovery_sent
                          ? 'bg-green-100 text-green-700'
                          : 'bg-orange-100 text-orange-700'
                      }`}>
                        {cart.recovery_sent ? 'Email enviado' : 'Sin contactar'}
                      </span>
                      <p className="font-bold text-gray-700 text-sm">{formatPrice(cart.total)}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
