'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCartStore } from '@/store/cart'
import { formatPrice, generateOrderNumber } from '@/lib/utils'
import { PROVINCES } from '@/lib/data'
import Button from '@/components/ui/Button'
import Link from 'next/link'
import { Building2, ShieldCheck, ArrowLeft } from 'lucide-react'
import type { BuyerInfo, ShippingAddress, PaymentMethod } from '@/types'

const INPUT_CLS =
  'w-full px-4 py-2.5 rounded-xl border-2 border-[#EDCCD5]/50 focus:border-[#C4687D] focus:outline-none text-sm text-[#2B1A20] placeholder-[#A58494] transition-colors bg-white'

const LABEL_CLS =
  'text-xs font-semibold text-[#A58494] uppercase tracking-wider mb-1.5 block'

export default function CheckoutPage() {
  const router = useRouter()
  const { items, shippingMethod, total, clearCart } = useCartStore()

  const [paymentMethod] = useState<PaymentMethod>('transferencia')
  const [loading, setLoading] = useState(false)

  const [buyer, setBuyer] = useState<BuyerInfo>({
    name: '',
    email: '',
    phone: '',
  })

  const [address, setAddress] = useState<ShippingAddress>({
    street: '',
    number: '',
    floor: '',
    city: '',
    province: '',
    postal_code: '',
    country: 'Argentina',
  })

  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0)

  function updateBuyer(field: keyof BuyerInfo, value: string) {
    setBuyer((prev) => ({ ...prev, [field]: value }))
  }

  function updateAddress(field: keyof ShippingAddress, value: string) {
    setAddress((prev) => ({ ...prev, [field]: value }))
  }

  const isFormValid =
    buyer.name.trim() &&
    buyer.email.trim() &&
    buyer.phone.trim() &&
    address.street.trim() &&
    address.number.trim() &&
    address.city.trim() &&
    address.province.trim() &&
    address.postal_code.trim()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!isFormValid || !shippingMethod) return

    setLoading(true)

    try {
      const orderData = {
        order_number: generateOrderNumber(),
        items,
        buyer,
        shipping_address: address,
        shipping_method: shippingMethod,
        payment_method: paymentMethod,
        subtotal,
        shipping_cost: shippingMethod.price,
        total: total(),
      }

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      })

      const data = await res.json()

      if (!data.success) throw new Error(data.error || 'Error al crear el pedido')

      clearCart()
      router.push(`/order/${data.order_id}`)
    } catch (err) {
      console.error(err)
      alert('Hubo un error al procesar tu pedido. Por favor intentá de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#FFFAF7] flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#A58494] mb-4">No tenés productos en el carrito.</p>
          <Link href="/shop">
            <Button>Ir a la tienda</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FFFAF7]">
      <div className="max-w-5xl mx-auto px-5 py-10 md:py-16">
        <Link
          href="/cart"
          className="inline-flex items-center gap-2 text-[#A58494] hover:text-[#C4687D] text-sm mb-8 transition-colors"
        >
          <ArrowLeft size={16} />
          Volver al carrito
        </Link>

        <h1 className="font-playfair text-3xl font-bold text-[#2B1A20] mb-8">
          Finalizar compra
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form left */}
            <div className="lg:col-span-2 space-y-6">

              {/* Buyer info */}
              <div className="bg-white rounded-2xl p-6 border border-[#EDCCD5]/30 shadow-[0_2px_12px_rgba(43,26,32,0.05)]">
                <h2 className="font-playfair font-bold text-[#2B1A20] mb-5">Tus datos</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className={LABEL_CLS}>Nombre completo *</label>
                    <input
                      type="text"
                      required
                      value={buyer.name}
                      onChange={(e) => updateBuyer('name', e.target.value)}
                      className={INPUT_CLS}
                      placeholder="María González"
                    />
                  </div>
                  <div>
                    <label className={LABEL_CLS}>Email *</label>
                    <input
                      type="email"
                      required
                      value={buyer.email}
                      onChange={(e) => updateBuyer('email', e.target.value)}
                      className={INPUT_CLS}
                      placeholder="maria@ejemplo.com"
                    />
                  </div>
                  <div>
                    <label className={LABEL_CLS}>Teléfono *</label>
                    <input
                      type="tel"
                      required
                      value={buyer.phone}
                      onChange={(e) => updateBuyer('phone', e.target.value)}
                      className={INPUT_CLS}
                      placeholder="+54 11 1234-5678"
                    />
                  </div>
                </div>
              </div>

              {/* Shipping address */}
              <div className="bg-white rounded-2xl p-6 border border-[#EDCCD5]/30 shadow-[0_2px_12px_rgba(43,26,32,0.05)]">
                <h2 className="font-playfair font-bold text-[#2B1A20] mb-5">
                  Dirección de envío
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className={LABEL_CLS}>Calle *</label>
                    <input
                      type="text"
                      required
                      value={address.street}
                      onChange={(e) => updateAddress('street', e.target.value)}
                      className={INPUT_CLS}
                      placeholder="Av. Corrientes"
                    />
                  </div>
                  <div>
                    <label className={LABEL_CLS}>Número *</label>
                    <input
                      type="text"
                      required
                      value={address.number}
                      onChange={(e) => updateAddress('number', e.target.value)}
                      className={INPUT_CLS}
                      placeholder="1234"
                    />
                  </div>
                  <div>
                    <label className={LABEL_CLS}>Piso / Depto</label>
                    <input
                      type="text"
                      value={address.floor}
                      onChange={(e) => updateAddress('floor', e.target.value)}
                      className={INPUT_CLS}
                      placeholder="3°B (opcional)"
                    />
                  </div>
                  <div>
                    <label className={LABEL_CLS}>Ciudad *</label>
                    <input
                      type="text"
                      required
                      value={address.city}
                      onChange={(e) => updateAddress('city', e.target.value)}
                      className={INPUT_CLS}
                      placeholder="Buenos Aires"
                    />
                  </div>
                  <div>
                    <label className={LABEL_CLS}>Código postal *</label>
                    <input
                      type="text"
                      required
                      value={address.postal_code}
                      onChange={(e) => updateAddress('postal_code', e.target.value)}
                      className={INPUT_CLS}
                      placeholder="1043"
                      maxLength={6}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className={LABEL_CLS}>Provincia *</label>
                    <select
                      required
                      value={address.province}
                      onChange={(e) => updateAddress('province', e.target.value)}
                      className={INPUT_CLS}
                    >
                      <option value="">Seleccioná una provincia</option>
                      {PROVINCES.map((p) => (
                        <option key={p} value={p}>
                          {p}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Payment method */}
              <div className="bg-white rounded-2xl p-6 border border-[#EDCCD5]/30 shadow-[0_2px_12px_rgba(43,26,32,0.05)]">
                <h2 className="font-playfair font-bold text-[#2B1A20] mb-5">
                  Método de pago
                </h2>
                <div className="flex items-center gap-4 p-4 rounded-xl border-2 border-[#C4687D] bg-[#C4687D]/5">
                  <Building2 size={20} className="text-[#4caf50] flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-sm text-[#2B1A20]">Transferencia bancaria</p>
                    <p className="text-xs text-[#A58494]">
                      Te enviamos los datos por email. Producción inicia al confirmar el pago.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-5 border border-[#EDCCD5]/30 shadow-[0_2px_12px_rgba(43,26,32,0.05)] sticky top-24">
                <h3 className="font-playfair font-bold text-[#2B1A20] mb-4">
                  Resumen del pedido
                </h3>

                <div className="space-y-3 mb-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-3 text-sm">
                      <img
                        src={item.product.images[0]}
                        alt=""
                        className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-[#2B1A20] truncate">{item.product.name}</p>
                        <p className="text-xs text-[#A58494]">
                          {item.personalization.nombre} · {item.personalization.brocheName}
                        </p>
                        <p className="text-xs text-[#A58494]">x{item.quantity}</p>
                      </div>
                      <p className="font-bold text-[#C4687D] text-xs flex-shrink-0">
                        {formatPrice(item.product.price * item.quantity)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="border-t border-[#EDCCD5]/40 pt-4 space-y-2 text-sm">
                  <div className="flex justify-between text-[#A58494]">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-[#A58494]">
                    <span>Envío</span>
                    <span>
                      {shippingMethod
                        ? shippingMethod.price === 0
                          ? 'Gratis'
                          : formatPrice(shippingMethod.price)
                        : '-'}
                    </span>
                  </div>
                  <div className="flex justify-between font-bold text-[#2B1A20] pt-1 border-t border-[#EDCCD5]/40">
                    <span>Total</span>
                    <span className="text-[#C4687D] font-playfair text-lg">
                      {formatPrice(total())}
                    </span>
                  </div>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full mt-5"
                  disabled={!isFormValid || loading}
                >
                  {loading ? 'Procesando...' : 'Confirmar pedido'}
                </Button>

                <div className="flex items-center gap-2 justify-center mt-3">
                  <ShieldCheck size={14} className="text-[#3d9e78]" />
                  <p className="text-xs text-[#A58494]">Compra 100% segura</p>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
