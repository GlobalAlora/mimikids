'use client'

import { useState } from 'react'
import { MOCK_PRODUCTS } from '@/lib/data'
import { formatPrice } from '@/lib/utils'
import { Product } from '@/types'
import { Plus, Edit2, Trash2, Eye, EyeOff } from 'lucide-react'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS)

  function toggleActive(id: string) {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, is_active: !p.is_active } : p))
    )
  }

  function deleteProduct(id: string) {
    if (!confirm('¿Estás segura de que querés eliminar este producto?')) return
    setProducts((prev) => prev.filter((p) => p.id !== id))
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-playfair text-2xl font-bold text-[#6b3d50]">
          Productos
        </h1>
        <Button size="sm" className="flex items-center gap-2">
          <Plus size={15} />
          Nuevo producto
        </Button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Producto
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Precio
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Estado
              </th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50/50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-12 h-12 rounded-xl object-cover flex-shrink-0"
                    />
                    <div>
                      <p className="font-medium text-sm text-gray-800">{product.name}</p>
                      <p className="text-xs text-gray-400">/shop/{product.slug}</p>
                      {product.badge && <Badge className="mt-1">{product.badge}</Badge>}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="font-bold text-[#d4768a]">{formatPrice(product.price)}</p>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                      product.is_active
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-500'
                    }`}
                  >
                    {product.is_active ? 'Activo' : 'Inactivo'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => toggleActive(product.id)}
                      className="p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer text-gray-400 hover:text-gray-600"
                      title={product.is_active ? 'Desactivar' : 'Activar'}
                    >
                      {product.is_active ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                    <button
                      className="p-2 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer text-gray-400 hover:text-blue-500"
                      title="Editar"
                    >
                      <Edit2 size={15} />
                    </button>
                    <button
                      onClick={() => deleteProduct(product.id)}
                      className="p-2 rounded-lg hover:bg-red-50 transition-colors cursor-pointer text-gray-400 hover:text-red-500"
                      title="Eliminar"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
