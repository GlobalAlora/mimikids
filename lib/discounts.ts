import type { CartItem } from '@/types'

export const PORTACHUPETE_DISCOUNT_PCT = 0.20
export const COMBO_DISCOUNT_PCT = 0.25

export const WELCOME_COUPON_CODE = 'BIENVENIDA10'
export const COUPON_DISCOUNT_PCT = 0.10
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

export function calcDiscount(items: CartItem[]): DiscountInfo {
  const hasPortachupete = items.some(i => i.product.category === 'portachupete')
  const hasFunda = items.some(i => i.product.category === 'funda')
  const hasLlavero = items.some(i => i.product.category === 'llavero')

  const subtotal = items.reduce((acc, i) => acc + i.product.price * i.quantity, 0)

  // Combo: portachupete + funda o llavero → 25% en todo
  if (hasPortachupete && (hasFunda || hasLlavero)) {
    const parts = [hasFunda && 'funda', hasLlavero && 'llavero'].filter(Boolean).join(' + ')
    return {
      amount: Math.round(subtotal * COMBO_DISCOUNT_PCT),
      pct: COMBO_DISCOUNT_PCT,
      type: 'combo',
      label: `Descuento combo ${parts} + portachupete (25%)`,
    }
  }

  // Solo portachupete → 20% sobre portachupetes
  if (hasPortachupete) {
    const portaTotal = items
      .filter(i => i.product.category === 'portachupete')
      .reduce((acc, i) => acc + i.product.price * i.quantity, 0)
    return {
      amount: Math.round(portaTotal * PORTACHUPETE_DISCOUNT_PCT),
      pct: PORTACHUPETE_DISCOUNT_PCT,
      type: 'portachupete',
      label: 'Descuento portachupetes (20%)',
    }
  }

  // Solo llavero → 20% sobre llaveros
  if (hasLlavero) {
    const llaveroTotal = items
      .filter(i => i.product.category === 'llavero')
      .reduce((acc, i) => acc + i.product.price * i.quantity, 0)
    return {
      amount: Math.round(llaveroTotal * PORTACHUPETE_DISCOUNT_PCT),
      pct: PORTACHUPETE_DISCOUNT_PCT,
      type: 'llavero',
      label: 'Descuento llaveros (20%)',
    }
  }

  return { amount: 0, pct: 0, type: null, label: '' }
}
