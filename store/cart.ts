'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { CartItem, CartItemPersonalization, Product, ShippingMethod } from '@/types'
import { calcDiscount, calcCouponDiscount, DiscountInfo, WELCOME_COUPON_CODE, COUPON_ACTIVE } from '@/lib/discounts'

interface CartState {
  items: CartItem[]
  shippingMethod: ShippingMethod | null
  coupon: string | null
  addItem: (product: Product, personalization: CartItemPersonalization, quantity?: number) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  setShippingMethod: (method: ShippingMethod) => void
  clearCart: () => void
  applyCoupon: (code: string, alreadyUsed: boolean) => { success: boolean; error?: string }
  removeCoupon: () => void
  discount: () => DiscountInfo
  couponAmount: () => number
  total: () => number
  itemCount: () => number
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      shippingMethod: null,
      coupon: null,

      addItem: (product, personalization, quantity = 1) => {
        const id = `${product.id}-${Date.now()}`
        set((state) => ({
          items: [...state.items, { id, product, personalization, quantity }],
        }))
      },

      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }))
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id)
          return
        }
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity } : item
          ),
        }))
      },

      setShippingMethod: (method) => {
        set({ shippingMethod: method })
      },

      clearCart: () => {
        set({ items: [], shippingMethod: null, coupon: null })
      },

      applyCoupon: (code, alreadyUsed) => {
        if (!COUPON_ACTIVE) return { success: false, error: 'Cupón no disponible en este momento' }
        if (alreadyUsed) return { success: false, error: 'Ya usaste este cupón anteriormente' }
        if (code.trim().toUpperCase() !== WELCOME_COUPON_CODE) {
          return { success: false, error: 'Código de cupón inválido' }
        }
        set({ coupon: WELCOME_COUPON_CODE })
        return { success: true }
      },

      removeCoupon: () => set({ coupon: null }),

      discount: () => calcDiscount(get().items),

      couponAmount: () => {
        const { items, coupon } = get()
        if (!coupon) return 0
        const subtotal = items.reduce((acc, i) => acc + i.product.price * i.quantity, 0)
        const productDiscount = calcDiscount(items).amount
        return calcCouponDiscount(subtotal, productDiscount)
      },

      total: () => {
        const { items, shippingMethod } = get()
        const subtotal = items.reduce(
          (acc, item) => acc + item.product.price * item.quantity,
          0
        )
        const productDiscount = calcDiscount(items).amount
        const couponDiscount = get().couponAmount()
        return subtotal - productDiscount - couponDiscount + (shippingMethod?.price ?? 0)
      },

      itemCount: () => {
        return get().items.reduce((acc, item) => acc + item.quantity, 0)
      },
    }),
    {
      name: 'mimikids-cart',
    }
  )
)
