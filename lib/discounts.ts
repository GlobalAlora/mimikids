import type { CartItem } from '@/types'

export const PORTACHUPETE_DISCOUNT_PCT = 0.20
export const COMBO_DISCOUNT_PCT = 0.25

export const WELCOME_COUPON_CODE = 'NAVIDAD15'
export const COUPON_DISCOUNT_PCT = 0.15
export const COUPON_STORAGE_KEY = 'mk_coupon_used'
// Toggle desde Vercel env vars — sin redespliegue cuando se desactiva
export const COUPON_ACTIVE = process.env.NEXT_PUBLIC_COUPON_ACTIVE === 'true'

/** Descuento del cupón aplicado sobre el neto después del descuento de producto */
export function calcCouponDiscount(subtotal: number, productDiscountAmount: number): number {
  const net = subtotal - productDiscountAmount
  return Math.round(net * COUPON_DISCOUNT_PCT)
}

export interface DiscountInfo {
  amount: number
  pct: number
  type: 'portachupete' | 'llavero' | 'combo' | null
  label: string
}

export function calcDiscount(_items: CartItem[]): DiscountInfo {
  return { amount: 0, pct: 0, type: null, label: '' }
}
