import { TrendingUp, ShoppingBag, Clock, CheckCircle } from 'lucide-react'
import { formatPrice } from '@/lib/utils'

const MOCK_STATS = {
  total_orders: 48,
  pending_orders: 7,
  monthly_revenue: 185000,
  in_production: 12,
}

const MOCK_RECENT_ORDERS = [
  {
    id: '1',
    order_number: 'MK-ABC123',
    buyer_name: 'Valentina Martínez',
    total: 9300,
    status: 'en_produccion',
    items_count: 2,
    created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '2',
    order_number: 'MK-DEF456',
    buyer_name: 'Lucía Rodríguez',
    total: 7800,
    status: 'pendiente_pago',
    items_count: 1,
    created_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '3',
    order_number: 'MK-GHI789',
    buyer_name: 'Florencia Keller',
    total: 4500,
    status: 'enviado',
    items_count: 1,
    created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  },
]

const STATUS_LABELS: Record<string, { label: string; className: string }> = {
  pendiente_pago: { label: 'Pendiente pago', className: 'bg-yellow-100 text-yellow-700' },
  pago_confirmado: { label: 'Pago confirmado', className: 'bg-blue-100 text-blue-700' },
  en_produccion: { label: 'En producción', className: 'bg-purple-100 text-purple-700' },
  enviado: { label: 'Enviado', className: 'bg-green-100 text-green-700' },
  entregado: { label: 'Entregado', className: 'bg-gray-100 text-gray-700' },
}

export default function AdminDashboard() {
  return (
    <div className="p-8">
      <h1 className="font-playfair text-2xl font-bold text-[#6b3d50] mb-8">
        Dashboard
      </h1>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          {
            label: 'Pedidos totales',
            value: MOCK_STATS.total_orders,
            icon: ShoppingBag,
            color: 'bg-pink-50 text-pink-500',
          },
          {
            label: 'Pendientes de pago',
            value: MOCK_STATS.pending_orders,
            icon: Clock,
            color: 'bg-yellow-50 text-yellow-500',
          },
          {
            label: 'En producción',
            value: MOCK_STATS.in_production,
            icon: TrendingUp,
            color: 'bg-purple-50 text-purple-500',
          },
          {
            label: 'Ingresos del mes',
            value: formatPrice(MOCK_STATS.monthly_revenue),
            icon: CheckCircle,
            color: 'bg-green-50 text-green-500',
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm"
          >
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                {stat.label}
              </p>
              <div className={`w-9 h-9 rounded-xl ${stat.color} flex items-center justify-center`}>
                <stat.icon size={16} />
              </div>
            </div>
            <p className="font-playfair text-2xl font-bold text-gray-800">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Recent orders */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-semibold text-gray-800">Pedidos recientes</h2>
          <a href="/admin/orders" className="text-sm text-[#d4768a] hover:underline">
            Ver todos →
          </a>
        </div>
        <div className="divide-y divide-gray-50">
          {MOCK_RECENT_ORDERS.map((order) => {
            const statusInfo = STATUS_LABELS[order.status] ?? {
              label: order.status,
              className: 'bg-gray-100 text-gray-600',
            }
            return (
              <div key={order.id} className="px-6 py-4 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-sm text-gray-800">{order.buyer_name}</p>
                  <p className="text-xs text-gray-400">
                    {order.order_number} · {order.items_count} producto{order.items_count > 1 ? 's' : ''}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span
                    className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusInfo.className}`}
                  >
                    {statusInfo.label}
                  </span>
                  <p className="font-bold text-[#d4768a] text-sm">{formatPrice(order.total)}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
