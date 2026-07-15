'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Product } from '@/types'
import { useCartStore } from '@/store/cart'
import { formatPrice } from '@/lib/utils'
import Button from '@/components/ui/Button'
import { ShoppingBag, Minus, Plus, Check } from 'lucide-react'

export default function SimpleAddToCart({ product }: { product: Product }) {
  const router = useRouter()
  const addItem = useCartStore((s) => s.addItem)
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  function handleAdd() {
    addItem(product, {}, quantity)
    setAdded(true)
    setTimeout(() => router.push('/cart'), 700)
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-9 h-9 rounded-full bg-[#EDCCD5]/30 hover:bg-[#EDCCD5]/60 flex items-center justify-center transition-colors cursor-pointer"
          >
            <Minus size={15} className="text-[#6D4D5A]" />
          </button>
          <span className="font-playfair text-xl font-bold text-[#2B1A20] w-7 text-center">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="w-9 h-9 rounded-full bg-[#EDCCD5]/30 hover:bg-[#EDCCD5]/60 flex items-center justify-center transition-colors cursor-pointer"
          >
            <Plus size={15} className="text-[#6D4D5A]" />
          </button>
        </div>
        <p className="font-playfair text-2xl font-bold text-[#C4687D]">
          {formatPrice(product.price * quantity)}
        </p>
      </div>

      <Button onClick={handleAdd} disabled={added} size="lg" className="w-full">
        {added ? (
          <>
            <Check size={18} className="mr-2" />
            ¡Agregado!
          </>
        ) : (
          <>
            <ShoppingBag size={18} className="mr-2" />
            Agregar al carrito
          </>
        )}
      </Button>
    </div>
  )
}
