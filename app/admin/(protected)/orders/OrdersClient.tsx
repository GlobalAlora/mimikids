'use client'

import { useState, useMemo } from 'react'
import { formatPrice } from '@/lib/utils'
import { ChevronDown, RefreshCw, Trash2, TrendingUp, DollarSign, ShoppingBag, Clock } from 'lucide-react'
import { useRouter } from 'next/navigation'

const STATUS_OPTIONS = [
  { value: 'pendiente_pago',  label: 'Pendiente pago',  color: 'bg-yellow-100 text-yellow-700' },
  { value: 'pago_confirmado', label: 'Pago confirmado', color: 'bg-blue-100 text-blue-700' },
  { value: 'en_produccion',   label: 'En producción',   color: 'bg-purple-100 text-purple-700' },
  { value: 'enviado',         label: 'Enviado',         color: 'bg-green-100 text-green-700' },
  { value: 'entregado',       label: 'Entregado',       color: 'bg-gray-100 text-gray-700' },
  { value: 'cancelado',       label: 'Cancelado',       color: 'bg-red-100 text-red-700' },
]

interface OrderItem {
  product_name: string
  quantity: number
  unit_price: number
  personalization?: { nombre?: string; brocheName?: string; modelNombre?: string; modelRef?: string }
}

interface Order {
  id: string
  order_number: string
  buyer: { name: string; email: string; phone: string }
  total: number
  subtotal?: number
  discount_amount?: number
  discount_label?: string
  status: string
  payment_method: string
  items: OrderItem[]
  shipping_method: { name: string; price: number }
  created_at: string
}

export default function OrdersClient({ initialOrders }: { initialOrders: Order[] }) {
  const [orders, setOrders] = useState<Order[]>(initialOrders)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [updating, setUpdating] = useState<string | null>(null)
  const [deleting, setDeleting] = useState<string | null>(null)
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const router = useRouter()

  const stats = useMemo(() => {
    const active = orders.filter((o) => o.status !== 'cancelado')
    const now = new Date()
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)
    const thisMonth = active.filter((o) => new Date(o.created_at) >= monthStart)
    const totalRevenue = active.reduce((s, o) => s + (o.total || 0), 0)
    const monthRevenue = thisMonth.reduce((s, o) => s + (o.total || 0), 0)
    const avgOrder = active.length ? Math.round(totalRevenue / active.length) : 0
    const pending = orders.filter((o) => o.status === 'pendiente_pago').length
    return { total: orders.length, totalRevenue, monthRevenue, avgOrder, pending, thisMonthCount: thisMonth.length }
  }, [orders])

  const filtered = filterStatus === 'all' ? orders : orders.filter((o) => o.status === filterStatus)

  async function updateStatus(orderId: string, newStatus: string) {
    setUpdating(orderId)
    try {
      const res = await fetch(`/api/admin/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })
      if (res.ok) {
        setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o)))
      }
    } finally {
      setUpdating(null)
    }
  }

  async function deleteOrder(orderId: string, orderNumber: string) {
    if (!confirm(`¿Borrar el pedido #${orderNumber}? Esta acción no se puede deshacer.`)) return
    setDeleting(orderId)
    try {
      const res = await fetch(`/api/admin/orders/${orderId}`, { method: 'DELETE' })
      if (res.ok) {
        setOrders((prev) => prev.filter((o) => o.id !== orderId))
        if (expandedId === orderId) setExpandedId(null)
      }
    } finally {
      setDeleting(null)
    }
  }

  return (
    <div className="p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-playfair text-2xl font-bold text-[#6b3d50]">
          Pedidos <span className="text-base font-normal text-gray-400">({orders.length})</span>
        </h1>
        <button
          onClick={() => router.refresh()}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
          title="Actualizar"
        >
          <RefreshCw size={16} className="text-gray-400" />
        </button>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {[
          { label: 'Ventas del mes', value: formatPrice(stats.monthRevenue), sub: `${stats.thisMonthCount} pedidos`, icon: DollarSign, color: 'text-green-500 bg-green-50' },
          { label: 'Ingresos totales', value: formatPrice(stats.totalRevenue), sub: `Ticket promedio: ${formatPrice(stats.avgOrder)}`, icon: TrendingUp, color: 'text-pink-500 bg-pink-50' },
          { label: 'Total pedidos', value: String(stats.total), sub: 'Todos los estados', icon: ShoppingBag, color: 'text-purple-500 bg-purple-50' },
          { label: 'Pendientes pago', value: String(stats.pending), sub: 'Esperando transferencia', icon: Clock, color: 'text-yellow-500 bg-yellow-50' },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[0.65rem] font-semibold text-gray-400 uppercase tracking-wider leading-tight">{s.label}</p>
              <div className={`w-8 h-8 rounded-xl ${s.color} flex items-center justify-center flex-shrink-0`}>
                <s.icon size={14} />
              </div>
            </div>
            <p className="font-playfair text-xl font-bold text-gray-800">{s.value}</p>
            <p className="text-[0.65rem] text-gray-400 mt-0.5">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Status breakdown */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 mb-6">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Por estado</p>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
          {STATUS_OPTIONS.map((opt) => {
            const count = orders.filter((o) => o.status === opt.value).length
            return (
              <button
                key={opt.value}
                onClick={() => setFilterStatus(filterStatus === opt.value ? 'all' : opt.value)}
                className={`text-center p-2.5 rounded-xl border-2 transition-all cursor-pointer ${
                  filterStatus === opt.value ? 'border-[#C4687D] bg-[#FAE8EC]' : 'border-transparent hover:border-gray-200'
                }`}
              >
                <p className="font-bold text-lg text-gray-800">{count}</p>
                <p className={`text-[0.6rem] font-semibold px-1.5 py-0.5 rounded-full mt-1 ${opt.color}`}>{opt.label}</p>
              </button>
            )
          })}
        </div>
      </div>

      {/* Orders list */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <p className="text-lg">No hay pedidos con este estado</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((order) => {
            const statusInfo = STATUS_OPTIONS.find((s) => s.value === order.status)
            const isExpanded = expandedId === order.id

            return (
              <div key={order.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div
                  className="px-5 py-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => setExpandedId(isExpanded ? null : order.id)}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="min-w-0">
                      <p className="font-semibold text-sm text-gray-800 truncate">{order.buyer?.name}</p>
                      <p className="text-xs text-gray-400">
                        {order.order_number} · {new Date(order.created_at).toLocaleDateString('es-AR')}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
                    <span className={`hidden sm:inline text-xs font-medium px-2.5 py-1 rounded-full ${statusInfo?.color}`}>
                      {statusInfo?.label}
                    </span>
                    <p className="font-bold text-[#d4768a] text-sm">{formatPrice(order.total)}</p>
                    <button
                      onClick={(e) => { e.stopPropagation(); deleteOrder(order.id, order.order_number) }}
                      disabled={deleting === order.id}
                      className="p-1.5 rounded-lg text-gray-300 hover:text-red-400 hover:bg-red-50 transition-colors cursor-pointer disabled:opacity-50"
                      title="Borrar pedido"
                    >
                      <Trash2 size={14} />
                    </button>
                    <ChevronDown
                      size={16}
                      className={`text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                    />
                  </div>
                </div>

                {isExpanded && (
                  <div className="px-5 pb-5 border-t border-gray-50">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-4">
                      <div>
                        <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Comprador</h4>
                        <p className="text-sm text-gray-700">{order.buyer?.name}</p>
                        <p className="text-xs text-gray-400">{order.buyer?.email}</p>
                        <p className="text-xs text-gray-400">{order.buyer?.phone}</p>
                        <div className="mt-3 space-y-1">
                          <p className="text-xs text-gray-500">Envío: {order.shipping_method?.name} ({formatPrice(order.shipping_method?.price || 0)})</p>
                          <p className="text-xs text-gray-500">Pago: Transferencia bancaria</p>
                          {order.discount_amount ? (
                            <p className="text-xs text-green-600 font-medium">Descuento: -{formatPrice(order.discount_amount)} ({order.discount_label})</p>
                          ) : null}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Productos</h4>
                        {(order.items || []).map((item, i) => (
                          <div key={i} className="mb-2 p-3 bg-gray-50 rounded-xl">
                            <p className="text-sm font-medium text-gray-700">{item.product_name} x{item.quantity}</p>
                            {item.personalization?.nombre && (
                              <p className="text-xs text-gray-400 mt-0.5">
                                Nombre: <span className="font-semibold text-gray-600">{item.personalization.nombre}</span>
                              </p>
                            )}
                            {item.personalization?.brocheName && (
                              <p className="text-xs text-gray-400">
                                Broche: <span className="font-semibold text-gray-600">{item.personalization.brocheName}</span>
                              </p>
                            )}
                            {item.personalization?.modelRef && (
                              <div className="flex items-center gap-2 mt-1">
                                <img
                                  src={item.personalization.modelRef}
                                  alt="Modelo"
                                  className="w-10 h-10 rounded-lg object-cover border border-gray-200 flex-shrink-0"
                                />
                                <p className="text-xs text-gray-400">
                                  Modelo: <span className="font-semibold text-gray-600">{item.personalization.modelNombre || '—'}</span>
                                </p>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-50 flex items-center gap-3 flex-wrap">
                      <p className="text-xs font-semibold text-gray-500">Cambiar estado:</p>
                      <div className="flex flex-wrap gap-2">
                        {STATUS_OPTIONS.map((opt) => (
                          <button
                            key={opt.value}
                            onClick={() => updateStatus(order.id, opt.value)}
                            disabled={updating === order.id}
                            className={`text-xs font-medium px-3 py-1.5 rounded-full transition-all cursor-pointer disabled:opacity-50 ${
                              order.status === opt.value
                                ? opt.color + ' ring-2 ring-offset-1 ring-gray-300'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
