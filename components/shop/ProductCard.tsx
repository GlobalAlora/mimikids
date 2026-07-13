'use client'

import Link from 'next/link'
import { Product } from '@/types'
import { formatPrice } from '@/lib/utils'
import { ArrowUpRight } from 'lucide-react'

interface ProductCardProps {
  product: Product
}

// Letter style → background color for the card image area
const LETTER_STYLE_BG: Record<string, string> = {
  'silicona-blanca':  '#F5F0ED',
  'silicona-beige':   '#F0E6D8',
  'silicona-rosa':    '#FAE8EC',
  'silicona-celeste': '#E5F2F9',
  madera:             '#EDE3D5',
}

export default function ProductCard({ product }: ProductCardProps) {
  const imgBg = (product.letter_style && LETTER_STYLE_BG[product.letter_style]) || '#F6EEE9'

  return (
    <Link href={`/shop/${product.slug}`} className="group block cursor-pointer" aria-label={`Ver ${product.name}`}>
      {/* Image */}
      <div
        className="relative rounded-2xl overflow-hidden mb-4 aspect-[4/5]"
        style={{ backgroundColor: imgBg }}
      >
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Badge */}
        {product.badge && (
          <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-[#2B1A20] text-[0.6875rem] font-semibold px-3 py-1 rounded-full border border-[#EDCCD5]/60">
            {product.badge}
          </span>
        )}

        {/* Hover CTA */}
        <div className="absolute inset-0 bg-[#2B1A20]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <span className="inline-flex items-center gap-1.5 bg-white text-[#2B1A20] text-xs font-semibold px-4 py-2 rounded-full translate-y-3 group-hover:translate-y-0 transition-transform duration-300 shadow-lg">
            Personalizar
            <ArrowUpRight size={13} strokeWidth={2} />
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="px-0.5">
        <h3 className="font-playfair font-bold text-[#2B1A20] text-[1.0625rem] leading-snug mb-2 group-hover:text-[#C4687D] transition-colors duration-200">
          {product.name}
        </h3>
        <div className="flex items-center justify-between">
          <p className="font-playfair text-lg font-bold text-[#C4687D]">
            {formatPrice(product.price)}
          </p>
          <p className="text-xs text-[#A58494]">
            {product.production_days_min}–{product.production_days_max}d hábiles
          </p>
        </div>
      </div>
    </Link>
  )
}
