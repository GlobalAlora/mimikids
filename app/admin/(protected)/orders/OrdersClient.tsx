'use client'

import { useState } from 'react'
import { formatPrice } from '@/lib/utils'
import { ChevronDown, RefreshCw } from 'lucide-react'
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
  const router = useRouter()

  async function updateStatus(orderId: string, newStatus: string) {
    setUpdating(orderId)
    try {
      const res = await fetch(`/api/admin/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })
      if (res.ok) {
        setOrders((prev) =>
          prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
        )
      }
    } finally {
      setUpdating(null)
    }
  }

  if (orders.length === 0) {
    return (
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-playfair text-2xl font-bold text-[#6b3d50]">Gestión de pedidos</h1>
          <button onClick={() => router.refresh()} className="p-2 rounded-lg hover:bg-gray-100 cursor-pointer">
            <RefreshCw size={16} className="text-gray-400" />
          </button>
        </div>
        <div className="text-center py-16 text-gray-400">
          <p className="text-lg">No hay pedidos todavía</p>
          <p className="text-sm mt-1">Los pedidos aparecerán aquí cuando los clientes compren.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-playfair text-2xl font-bold text-[#6b3d50]">
          Gestión de pedidos <span className="text-base font-normal text-gray-400">({orders.length})</span>
        </h1>
        <button
          onClick={() => router.refresh()}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
          title="Actualizar"
        >
          <RefreshCw size={16} className="text-gray-400" />
        </button>
      </div>

      <div className="space-y-3">
        {orders.map((order) => {
          const statusInfo = STATUS_OPTIONS.find((s) => s.value === order.status)
          const isExpanded = expandedId === order.id

          return (
            <div
              key={order.id}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
            >
              <div
                className="px-6 py-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => setExpandedId(isExpanded ? null : order.id)}
              >
                <div className="flex items-center gap-4">
                  <div>
                    <p className="font-semibold text-sm text-gray-800">{order.buyer?.name}</p>
                    <p className="text-xs text-gray-400">
                      {order.order_number} · {new Date(order.created_at).toLocaleDateString('es-AR')}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusInfo?.color}`}>
                    {statusInfo?.label}
                  </span>
                  <p className="font-bold text-[#d4768a] text-sm">{formatPrice(order.total)}</p>
                  <ChevronDown
                    size={16}
                    className={`text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                  />
                </div>
              </div>

              {isExpanded && (
                <div className="px-6 pb-6 border-t border-gray-50">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-5">
                    <div>
                      <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                        Comprador
                      </h4>
                      <p className="text-sm text-gray-700">{order.buyer?.name}</p>
                      <p className="text-xs text-gray-400">{order.buyer?.email}</p>
                      <p className="text-xs text-gray-400">{order.buyer?.phone}</p>
                      <div className="mt-3">
                        <p className="text-xs text-gray-500">
                          Envío: {order.shipping_method?.name} ({formatPrice(order.shipping_method?.price || 0)})
                        </p>
                        <p className="text-xs text-gray-500">Pago: Transferencia bancaria</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                        Productos
                      </h4>
                      {(order.items || []).map((item, i) => (
                        <div key={i} className="mb-3 p-3 bg-gray-50 rounded-xl">
                          <p className="text-sm font-medium text-gray-700">
                            {item.product_name} x{item.quantity}
                          </p>
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

                  <div className="mt-5 pt-4 border-t border-gray-50 flex items-center gap-3 flex-wrap">
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
    </div>
  )
}
