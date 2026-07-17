'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useCartStore } from '@/store/cart'
import { formatPrice } from '@/lib/utils'
import { calcDiscount, COUPON_ACTIVE, COUPON_STORAGE_KEY } from '@/lib/discounts'
import Button from '@/components/ui/Button'
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Truck, Tag, Gift, X, Check } from 'lucide-react'
import { ShippingMethod } from '@/types'

const SHIPPING_OPTIONS: ShippingMethod[] = [
  { id: 'andreani', name: 'Andreani · Envío a domicilio', price: 12000, days_min: 2, days_max: 4 },
  { id: 'andreani_sucursal', name: 'Andreani · Envío a sucursal', price: 8000, days_min: 2, days_max: 4 },
  { id: 'pickup', name: 'Retiro en persona (Trenque Lauquen)', price: 0, days_min: 0, days_max: 0 },
]

export default function CartPage() {
  const { items, removeItem, updateQuantity, setShippingMethod, shippingMethod, total, itemCount,
    coupon, applyCoupon, removeCoupon, couponAmount } = useCartStore()

  const [couponInput, setCouponInput] = useState('')
  const [couponError, setCouponError] = useState('')
  const [couponUsed, setCouponUsed] = useState(false)

  useEffect(() => {
    setCouponUsed(localStorage.getItem(COUPON_STORAGE_KEY) === '1')
  }, [])

  function handleApplyCoupon() {
    setCouponError('')
    const result = applyCoupon(couponInput, couponUsed)
    if (!result.success) setCouponError(result.error ?? 'Código inválido')
    else setCouponInput('')
  }

  function handleRemoveCoupon() {
    removeCoupon()
    setCouponError('')
  }

  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0)
  const discountInfo = calcDiscount(items)
  const couponDiscount = couponAmount()
  const hasPortachupete = items.some(i => i.product.category === 'portachupete')
  const hasFunda = items.some(i => i.product.category === 'funda')
  const showComboUpsell = hasPortachupete && !hasFunda
  const showFundaUpsell = hasFunda && !hasPortachupete

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#FFFAF7] flex items-center justify-center">
        <div className="text-center max-w-sm mx-auto px-5 py-20">
          <div className="w-24 h-24 bg-[#EDCCD5]/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag size={40} className="text-[#C4687D]" />
          </div>
          <h1 className="font-playfair text-2xl font-bold text-[#2B1A20] mb-3">
            Tu carrito está vacío
          </h1>
          <p className="text-[#A58494] mb-6">
            Explorá nuestra tienda y encontrá el portachupete perfecto para tu bebé.
          </p>
          <Link href="/shop">
            <Button size="lg">Ver la tienda</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FFFAF7]">
      <div className="max-w-5xl mx-auto px-5 py-10 md:py-16">
        <h1 className="font-playfair text-3xl font-bold text-[#2B1A20] mb-8">
          Tu carrito ({itemCount()} {itemCount() === 1 ? 'producto' : 'productos'})
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Items list */}
          <div className="lg:col-span-2 space-y-4">

            {/* Upsell: solo funda → agregar portachupete */}
            {showFundaUpsell && (
              <div className="bg-gradient-to-r from-[#FFF0F3] to-[#FFF8F5] border border-[#EDCCD5] rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#C4687D]/15 flex items-center justify-center flex-shrink-0">
                  <Gift size={20} className="text-[#C4687D]" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-[#2B1A20]">¡Sumá un portachupete y ahorrá 25%!</p>
                  <p className="text-xs text-[#6D4D5A] mt-0.5">
                    Al agregar un portachupete personalizado se activa el combo y obtenés <strong>25% de descuento en todo el pedido</strong>.
                  </p>
                </div>
                <Link
                  href="/shop?cat=portachupete"
                  className="flex-shrink-0 inline-flex items-center gap-1.5 bg-[#C4687D] text-white text-xs font-semibold px-4 py-2 rounded-full hover:bg-[#A8546A] transition-colors whitespace-nowrap"
                >
                  Ver portachupetes <ArrowRight size={12} />
                </Link>
              </div>
            )}

            {/* Combo upsell: portachupete sin funda */}
            {showComboUpsell && (
              <div className="bg-gradient-to-r from-[#FFF0F3] to-[#FFF8F5] border border-[#EDCCD5] rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#C4687D]/15 flex items-center justify-center flex-shrink-0">
                  <Gift size={20} className="text-[#C4687D]" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-[#2B1A20]">¡Armá el combo y ahorrá 25%!</p>
                  <p className="text-xs text-[#6D4D5A] mt-0.5">
                    Tenés 20% de desc. en portachupetes. Agregá una funda y el descuento sube al <strong>25% en todo el pedido</strong>.
                  </p>
                </div>
                <Link
                  href="/shop"
                  className="flex-shrink-0 inline-flex items-center gap-1.5 bg-[#C4687D] text-white text-xs font-semibold px-4 py-2 rounded-full hover:bg-[#A8546A] transition-colors whitespace-nowrap"
                >
                  Ver fundas <ArrowRight size={12} />
                </Link>
              </div>
            )}

            {/* Combo active badge */}
            {discountInfo.type === 'combo' && (
              <div className="bg-green-50 border border-green-200 rounded-2xl px-4 py-3 flex items-center gap-2.5">
                <Gift size={16} className="text-green-600 flex-shrink-0" />
                <p className="text-sm font-semibold text-green-700">
                  ¡Combo activado! Descuento del 25% aplicado en todo el pedido 🎉
                </p>
              </div>
            )}

            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-5 border border-[#EDCCD5]/30 shadow-[0_2px_12px_rgba(43,26,32,0.05)] flex gap-4"
              >
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  className="w-20 h-20 object-cover rounded-xl flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-playfair font-bold text-[#2B1A20] text-sm">
                        {item.product.name}
                      </h3>
                      <div className="mt-1 space-y-0.5">
                        {item.personalization.nombre && (
                          <p className="text-xs text-[#A58494]">
                            Nombre:{' '}
                            <span className="font-semibold text-[#6D4D5A]">
                              {item.personalization.nombre}
                            </span>
                          </p>
                        )}
                        {item.personalization.brocheName && (
                          <p className="text-xs text-[#A58494]">
                            Broche:{' '}
                            <span className="font-semibold text-[#6D4D5A]">
                              {item.personalization.brocheName}
                            </span>
                          </p>
                        )}
                        {item.personalization.modelRef && (
                          <div className="flex items-center gap-1.5 mt-1">
                            <img
                              src={item.personalization.modelRef}
                              alt="Modelo"
                              className="w-7 h-7 rounded-md object-cover border border-[#EDCCD5]"
                            />
                            <p className="text-xs text-[#A58494]">
                              Modelo:{' '}
                              <span className="font-semibold text-[#6D4D5A]">
                                {item.personalization.modelNombre || 'Seleccionado'}
                              </span>
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-1.5 rounded-full hover:bg-red-50 text-[#A58494] hover:text-red-400 transition-colors flex-shrink-0 cursor-pointer"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-7 h-7 rounded-full bg-[#EDCCD5]/30 hover:bg-[#EDCCD5]/60 flex items-center justify-center transition-colors cursor-pointer"
                      >
                        <Minus size={12} className="text-[#6D4D5A]" />
                      </button>
                      <span className="w-6 text-center text-sm font-semibold text-[#2B1A20]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-7 h-7 rounded-full bg-[#EDCCD5]/30 hover:bg-[#EDCCD5]/60 flex items-center justify-center transition-colors cursor-pointer"
                      >
                        <Plus size={12} className="text-[#6D4D5A]" />
                      </button>
                    </div>
                    <p className="font-playfair font-bold text-[#C4687D]">
                      {formatPrice(item.product.price * item.quantity)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order summary */}
          <div className="lg:col-span-1 space-y-4">
            {/* Shipping */}
            <div className="bg-white rounded-2xl p-5 border border-[#EDCCD5]/30 shadow-[0_2px_12px_rgba(43,26,32,0.05)]">
              <h3 className="font-semibold text-[#2B1A20] mb-4 flex items-center gap-2">
                <Truck size={16} className="text-[#C4687D]" />
                Método de envío
              </h3>

              <div className="space-y-2">
                {SHIPPING_OPTIONS.map((option) => (
                  <label
                    key={option.id}
                    className="flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all hover:border-[#EDCCD5]"
                    style={{
                      borderColor:
                        shippingMethod?.id === option.id ? '#C4687D' : 'rgba(196,104,125,0.2)',
                      backgroundColor:
                        shippingMethod?.id === option.id ? 'rgba(196,104,125,0.05)' : 'transparent',
                    }}
                  >
                    <input
                      type="radio"
                      name="shipping"
                      value={option.id}
                      checked={shippingMethod?.id === option.id}
                      onChange={() => setShippingMethod(option)}
                      className="accent-[#C4687D]"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-[#2B1A20]">{option.name}</p>
                      {option.days_min > 0 && (
                        <p className="text-xs text-[#A58494]">
                          {option.days_min}–{option.days_max} días hábiles
                        </p>
                      )}
                    </div>
                    <p className="text-sm font-bold text-[#C4687D]">
                      {option.price === 0 ? 'Gratis' : formatPrice(option.price)}
                    </p>
                  </label>
                ))}
              </div>
            </div>

            {/* Summary */}
            <div className="bg-white rounded-2xl p-5 border border-[#EDCCD5]/30 shadow-[0_2px_12px_rgba(43,26,32,0.05)]">
              <h3 className="font-semibold text-[#2B1A20] mb-4">Resumen</h3>

              {/* Cupón de descuento — visible solo si NEXT_PUBLIC_COUPON_ACTIVE=true y no fue usado */}
              {COUPON_ACTIVE && !couponUsed && (
                <div className="mb-4">
                  {coupon ? (
                    <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-xl px-3 py-2.5">
                      <Check size={14} className="text-green-600 flex-shrink-0" />
                      <span className="text-sm font-semibold text-green-700 flex-1">
                        {coupon} · 10% OFF aplicado
                      </span>
                      <button
                        onClick={handleRemoveCoupon}
                        className="text-green-500 hover:text-green-700 transition-colors cursor-pointer"
                        aria-label="Quitar cupón"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-1.5">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={couponInput}
                          onChange={(e) => { setCouponInput(e.target.value.toUpperCase()); setCouponError('') }}
                          onKeyDown={(e) => e.key === 'Enter' && handleApplyCoupon()}
                          placeholder="Cupón de descuento"
                          className="flex-1 px-3 py-2 text-sm border-2 border-[#EDCCD5]/60 focus:border-[#C4687D] rounded-xl outline-none text-[#2B1A20] placeholder-[#A58494] transition-colors"
                        />
                        <button
                          onClick={handleApplyCoupon}
                          disabled={!couponInput.trim()}
                          className="px-3 py-2 text-xs font-bold bg-[#2B1A20] text-white rounded-xl hover:bg-[#3d2530] transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer whitespace-nowrap"
                        >
                          Aplicar
                        </button>
                      </div>
                      {couponError && (
                        <p className="text-xs text-red-500 flex items-center gap-1">
                          <X size={11} /> {couponError}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              )}

              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-[#A58494]">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                {discountInfo.amount > 0 && (
                  <div className="flex justify-between items-start text-green-600 font-medium">
                    <span className="flex items-center gap-1">
                      <Tag size={12} />
                      {discountInfo.type === 'combo' ? 'Descuento combo (25%)' : 'Desc. portachupetes (20%)'}
                    </span>
                    <span>-{formatPrice(discountInfo.amount)}</span>
                  </div>
                )}
                {couponDiscount > 0 && (
                  <div className="flex justify-between items-center text-green-600 font-medium">
                    <span className="flex items-center gap-1">
                      <Tag size={12} />
                      Cupón {coupon} (10%)
                    </span>
                    <span>-{formatPrice(couponDiscount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-[#A58494]">
                  <span>Envío</span>
                  <span>
                    {shippingMethod
                      ? shippingMethod.price === 0
                        ? 'Gratis'
                        : formatPrice(shippingMethod.price)
                      : 'Seleccionar'}
                  </span>
                </div>
                <div className="border-t border-[#EDCCD5]/40 pt-2 flex justify-between font-bold text-[#2B1A20]">
                  <span>Total</span>
                  <span className="text-[#C4687D] font-playfair text-lg">
                    {formatPrice(total())}
                  </span>
                </div>
              </div>

              <Link href="/checkout">
                <Button
                  className="w-full mt-4 group"
                  disabled={!shippingMethod}
                >
                  Ir a pagar
                  <ArrowRight
                    size={16}
                    className="ml-2 group-hover:translate-x-1 transition-transform"
                  />
                </Button>
              </Link>

              {!shippingMethod && (
                <p className="text-xs text-[#C4687D] text-center mt-2">
                  Seleccioná un método de envío para continuar
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
