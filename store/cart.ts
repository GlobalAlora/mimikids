'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { CartItem, CartItemPersonalization, Product, ShippingMethod } from '@/types'
import { calcDiscount, DiscountInfo } from '@/lib/discounts'

interface CartState {
  items: CartItem[]
  shippingMethod: ShippingMethod | null
  addItem: (product: Product, personalization: CartItemPersonalization, quantity?: number) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  setShippingMethod: (method: ShippingMethod) => void
  clearCart: () => void
  discount: () => DiscountInfo
  total: () => number
  itemCount: () => number
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      shippingMethod: null,

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
        set({ items: [], shippingMethod: null })
      },

      discount: () => calcDiscount(get().items),

      total: () => {
        const { items, shippingMethod } = get()
        const subtotal = items.reduce(
          (acc, item) => acc + item.product.price * item.quantity,
          0
        )
        const discountAmount = calcDiscount(items).amount
        return subtotal - discountAmount + (shippingMethod?.price ?? 0)
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
