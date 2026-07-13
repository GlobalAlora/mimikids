'use client'

import { useState } from 'react'
import { formatPrice } from '@/lib/utils'
import { ChevronDown } from 'lucide-react'

const STATUS_OPTIONS = [
  { value: 'pendiente_pago', label: 'Pendiente pago', color: 'bg-yellow-100 text-yellow-700' },
  { value: 'pago_confirmado', label: 'Pago confirmado', color: 'bg-blue-100 text-blue-700' },
  { value: 'en_produccion', label: 'En producción', color: 'bg-purple-100 text-purple-700' },
  { value: 'enviado', label: 'Enviado', color: 'bg-green-100 text-green-700' },
  { value: 'entregado', label: 'Entregado', color: 'bg-gray-100 text-gray-700' },
]

const MOCK_ORDERS = [
  {
    id: '1',
    order_number: 'MK-ABC123',
    buyer: { name: 'Valentina Martínez', email: 'vale@mail.com', phone: '11 1234-5678' },
    total: 9300,
    status: 'en_produccion',
    payment_method: 'transferencia',
    items: [
      {
        product_name: 'Portachupete Clásico',
        quantity: 2,
        personalization: { nombre: 'Sofía', brocheName: 'Plástico Rosa' },
        unit_price: 4500,
      },
    ],
    shipping_method: { name: 'Andreani', price: 3500 },
    created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '2',
    order_number: 'MK-DEF456',
    buyer: { name: 'Lucía Rodríguez', email: 'lu@mail.com', phone: '11 9876-5432' },
    total: 7800,
    status: 'pendiente_pago',
    payment_method: 'transferencia',
    items: [
      {
        product_name: 'Set Portachupete + Pulsera',
        quantity: 1,
        personalization: { nombre: 'Mateo', brocheName: 'Madera Redondo' },
        unit_price: 7800,
      },
    ],
    shipping_method: { name: 'Correo Argentino', price: 2800 },
    created_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
  },
]

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState(MOCK_ORDERS)
  const [expandedId, setExpandedId] = useState<string | null>(null)

  function updateStatus(orderId: string, newStatus: string) {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    )
  }

  return (
    <div className="p-8">
      <h1 className="font-playfair text-2xl font-bold text-[#6b3d50] mb-8">
        Gestión de pedidos
      </h1>

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
                    <p className="font-semibold text-sm text-gray-800">{order.buyer.name}</p>
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
                    {/* Buyer & shipping */}
                    <div>
                      <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                        Comprador
                      </h4>
                      <p className="text-sm text-gray-700">{order.buyer.name}</p>
                      <p className="text-xs text-gray-400">{order.buyer.email}</p>
                      <p className="text-xs text-gray-400">{order.buyer.phone}</p>
                      <div className="mt-3">
                        <p className="text-xs text-gray-500">
                          Envío: {order.shipping_method.name} ({formatPrice(order.shipping_method.price)})
                        </p>
                        <p className="text-xs text-gray-500">
                          Pago: Transferencia bancaria
                        </p>
                      </div>
                    </div>

                    {/* Items */}
                    <div>
                      <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                        Productos
                      </h4>
                      {order.items.map((item, i) => (
                        <div key={i} className="mb-3 p-3 bg-gray-50 rounded-xl">
                          <p className="text-sm font-medium text-gray-700">{item.product_name} x{item.quantity}</p>
                          <p className="text-xs text-gray-400 mt-0.5">
                            Nombre: <span className="font-semibold text-gray-600">{item.personalization.nombre}</span>
                          </p>
                          <p className="text-xs text-gray-400">
                            Broche: <span className="font-semibold text-gray-600">{item.personalization.brocheName}</span>
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Status change */}
                  <div className="mt-5 pt-4 border-t border-gray-50 flex items-center gap-3">
                    <p className="text-xs font-semibold text-gray-500">Cambiar estado:</p>
                    <div className="flex flex-wrap gap-2">
                      {STATUS_OPTIONS.map((opt) => (
                        <button
                          key={opt.value}
                          onClick={() => updateStatus(order.id, opt.value)}
                          className={`text-xs font-medium px-3 py-1.5 rounded-full transition-all cursor-pointer ${
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
