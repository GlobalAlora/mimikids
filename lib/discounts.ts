import type { CartItem } from '@/types'

export const PORTACHUPETE_DISCOUNT_PCT = 0.20
export const COMBO_DISCOUNT_PCT = 0.25

export interface DiscountInfo {
  amount: number
  pct: number
  type: 'portachupete' | 'combo' | null
  label: string
}

export function calcDiscount(items: CartItem[]): DiscountInfo {
  const hasPortachupete = items.some(i => i.product.category === 'portachupete')
  const hasFunda = items.some(i => i.product.category === 'funda')

  if (!hasPortachupete) return { amount: 0, pct: 0, type: null, label: '' }

  const subtotal = items.reduce((acc, i) => acc + i.product.price * i.quantity, 0)

  if (hasFunda) {
    return {
      amount: Math.round(subtotal * COMBO_DISCOUNT_PCT),
      pct: COMBO_DISCOUNT_PCT,
      type: 'combo',
      label: 'Descuento combo funda + portachupete (25%)',
    }
  }

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
