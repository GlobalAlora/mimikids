'use client'

import { useState } from 'react'
import { formatPrice } from '@/lib/utils'
import { Plus, Edit2, Trash2, Eye, EyeOff, RefreshCw, X } from 'lucide-react'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import { useRouter } from 'next/navigation'

interface Product {
  id: string
  slug: string
  name: string
  price: number
  images: string[]
  badge?: string
  is_active: boolean
}

interface ProductForm {
  name: string
  slug: string
  description: string
  price: string
  image_url: string
  badge: string
  materials: string
  care_instructions: string
  production_days_min: string
  production_days_max: string
  is_active: boolean
}

const EMPTY_FORM: ProductForm = {
  name: '', slug: '', description: '', price: '',
  image_url: '', badge: '', materials: '', care_instructions: '',
  production_days_min: '3', production_days_max: '5', is_active: true,
}

function slugify(str: string) {
  return str
    .toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim().replace(/\s+/g, '-')
}

export default function ProductsClient({ initialProducts }: { initialProducts: Product[] }) {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [showModal, setShowModal] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState<ProductForm>(EMPTY_FORM)
  const [saving, setSaving] = useState(false)
  const router = useRouter()

  function openCreate() {
    setForm(EMPTY_FORM)
    setEditingId(null)
    setShowModal(true)
  }

  function openEdit(product: Product) {
    setForm({
      name: product.name,
      slug: product.slug,
      description: '',
      price: String(product.price),
      image_url: product.images?.[0] || '',
      badge: product.badge || '',
      materials: '',
      care_instructions: '',
      production_days_min: '3',
      production_days_max: '5',
      is_active: product.is_active,
    })
    setEditingId(product.id)
    setShowModal(true)
  }

  function updateField(key: keyof ProductForm, value: string | boolean) {
    setForm((prev) => {
      const next = { ...prev, [key]: value }
      if (key === 'name' && typeof value === 'string' && !editingId) {
        next.slug = slugify(value)
      }
      return next
    })
  }

  async function handleSave() {
    if (!form.name || !form.price || !form.slug) return
    setSaving(true)

    const payload = {
      name: form.name,
      slug: form.slug,
      description: form.description,
      price: form.price,
      images: form.image_url ? [form.image_url] : [],
      badge: form.badge || null,
      materials: form.materials || null,
      care_instructions: form.care_instructions || null,
      production_days_min: form.production_days_min,
      production_days_max: form.production_days_max,
      is_active: form.is_active,
    }

    try {
      if (editingId) {
        const res = await fetch(`/api/admin/products/${editingId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        if (res.ok) {
          setProducts((prev) => prev.map((p) =>
            p.id === editingId
              ? { ...p, name: form.name, slug: form.slug, price: Number(form.price), images: payload.images, badge: form.badge || undefined, is_active: form.is_active }
              : p
          ))
        }
      } else {
        const res = await fetch('/api/admin/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        const data = await res.json()
        if (data.success && data.data) {
          setProducts((prev) => [data.data, ...prev])
        }
      }
      setShowModal(false)
    } finally {
      setSaving(false)
    }
  }

  async function toggleActive(id: string) {
    const product = products.find((p) => p.id === id)
    if (!product) return
    const newValue = !product.is_active
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, is_active: newValue } : p)))
    await fetch(`/api/admin/products/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ is_active: newValue }),
    })
  }

  async function deleteProduct(id: string) {
    if (!confirm('¿Eliminar este producto?')) return
    setProducts((prev) => prev.filter((p) => p.id !== id))
    await fetch(`/api/admin/products/${id}`, { method: 'DELETE' })
  }

  const INPUT = 'w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-[#d4768a] transition-colors'
  const LABEL = 'text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block'

  return (
    <>
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-playfair text-2xl font-bold text-[#6b3d50]">
            Productos <span className="text-base font-normal text-gray-400">({products.length})</span>
          </h1>
          <div className="flex items-center gap-2">
            <button onClick={() => router.refresh()} className="p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer" title="Actualizar">
              <RefreshCw size={16} className="text-gray-400" />
            </button>
            <Button size="sm" onClick={openCreate} className="flex items-center gap-2">
              <Plus size={15} /> Nuevo producto
            </Button>
          </div>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <p className="text-lg">No hay productos</p>
            <p className="text-sm mt-1">Agregá el primero con el botón de arriba.</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Producto</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Precio</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Estado</th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-gray-400 uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50/50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {product.images?.[0] && (
                          <img src={product.images[0]} alt={product.name} className="w-12 h-12 rounded-xl object-cover flex-shrink-0" />
                        )}
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
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${product.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                        {product.is_active ? 'Activo' : 'Inactivo'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => toggleActive(product.id)} className="p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer text-gray-400 hover:text-gray-600" title={product.is_active ? 'Desactivar' : 'Activar'}>
                          {product.is_active ? <EyeOff size={15} /> : <Eye size={15} />}
                        </button>
                        <button onClick={() => openEdit(product)} className="p-2 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer text-gray-400 hover:text-blue-500" title="Editar">
                          <Edit2 size={15} />
                        </button>
                        <button onClick={() => deleteProduct(product.id)} className="p-2 rounded-lg hover:bg-red-50 transition-colors cursor-pointer text-gray-400 hover:text-red-500" title="Eliminar">
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal crear/editar */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowModal(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-playfair font-bold text-[#6b3d50]">
                {editingId ? 'Editar producto' : 'Nuevo producto'}
              </h2>
              <button onClick={() => setShowModal(false)} className="p-1.5 rounded-lg hover:bg-gray-100 cursor-pointer">
                <X size={18} className="text-gray-400" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className={LABEL}>Nombre *</label>
                <input className={INPUT} value={form.name} onChange={(e) => updateField('name', e.target.value)} placeholder="Portachupete · Letras Blancas" />
              </div>

              <div>
                <label className={LABEL}>Slug (URL) *</label>
                <input className={INPUT} value={form.slug} onChange={(e) => updateField('slug', e.target.value)} placeholder="portachupete-letras-blancas" />
                <p className="text-xs text-gray-400 mt-1">/shop/{form.slug || '...'}</p>
              </div>

              <div>
                <label className={LABEL}>Descripción</label>
                <textarea className={INPUT + ' resize-none'} rows={3} value={form.description} onChange={(e) => updateField('description', e.target.value)} placeholder="Describí el producto..." />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={LABEL}>Precio (ARS) *</label>
                  <input className={INPUT} type="number" value={form.price} onChange={(e) => updateField('price', e.target.value)} placeholder="4500" />
                </div>
                <div>
                  <label className={LABEL}>Badge</label>
                  <input className={INPUT} value={form.badge} onChange={(e) => updateField('badge', e.target.value)} placeholder="Más vendido" />
                </div>
              </div>

              <div>
                <label className={LABEL}>URL de imagen</label>
                <input className={INPUT} value={form.image_url} onChange={(e) => updateField('image_url', e.target.value)} placeholder="https://images.unsplash.com/..." />
                {form.image_url && (
                  <img src={form.image_url} alt="preview" className="mt-2 w-20 h-20 rounded-xl object-cover border border-gray-200" />
                )}
              </div>

              <div>
                <label className={LABEL}>Materiales</label>
                <input className={INPUT} value={form.materials} onChange={(e) => updateField('materials', e.target.value)} placeholder="Silicona grado alimentario, madera de haya..." />
              </div>

              <div>
                <label className={LABEL}>Instrucciones de cuidado</label>
                <input className={INPUT} value={form.care_instructions} onChange={(e) => updateField('care_instructions', e.target.value)} placeholder="Limpiar con paño húmedo..." />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={LABEL}>Días producción mín.</label>
                  <input className={INPUT} type="number" value={form.production_days_min} onChange={(e) => updateField('production_days_min', e.target.value)} />
                </div>
                <div>
                  <label className={LABEL}>Días producción máx.</label>
                  <input className={INPUT} type="number" value={form.production_days_max} onChange={(e) => updateField('production_days_max', e.target.value)} />
                </div>
              </div>

              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.is_active} onChange={(e) => updateField('is_active', e.target.checked)} className="accent-[#d4768a]" />
                <span className="text-sm text-gray-700">Producto activo (visible en la tienda)</span>
              </label>
            </div>

            <div className="sticky bottom-0 bg-white px-6 py-4 border-t border-gray-100 flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => setShowModal(false)}>
                Cancelar
              </Button>
              <Button
                className="flex-1"
                onClick={handleSave}
                disabled={saving || !form.name || !form.price || !form.slug}
              >
                {saving ? 'Guardando...' : editingId ? 'Guardar cambios' : 'Crear producto'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
