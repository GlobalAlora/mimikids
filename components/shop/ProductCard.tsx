'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Product } from '@/types'
import { formatPrice } from '@/lib/utils'
import { PORTACHUPETE_DISCOUNT_PCT } from '@/lib/discounts'
import { ArrowUpRight } from 'lucide-react'

interface ModelParams {
  modelo: string
  modeloFoto: string
  modeloNombre: string
}

interface ProductCardProps {
  product: Product
  modelParams?: ModelParams
}

const LETTER_STYLE_BG: Record<string, string> = {
  'silicona-blanca':  '#F5F0ED',
  'silicona-beige':   '#F0E6D8',
  'silicona-rosa':    '#FAE8EC',
  'silicona-celeste': '#E5F2F9',
  madera:             '#EDE3D5',
}

export default function ProductCard({ product, modelParams }: ProductCardProps) {
  const isPromo = product.category === 'promo'
  const isPortachupete = product.category === 'portachupete' ||
    (!isPromo && product.category !== 'funda' &&
      (product.slug?.includes('portachupete') || product.name?.toLowerCase().includes('portachupete')))
  const imgBg = (product.letter_style && LETTER_STYLE_BG[product.letter_style]) || (isPromo ? '#FFF8EC' : '#F6EEE9')

  const canUseModel = product.category !== 'funda' && modelParams?.modeloFoto
  const modelQuery = canUseModel
    ? `?modelo=${modelParams!.modelo}&modeloFoto=${encodeURIComponent(modelParams!.modeloFoto)}&modeloNombre=${encodeURIComponent(modelParams!.modeloNombre)}`
    : ''

  return (
    <Link
      href={`/shop/${product.slug}${modelQuery}`}
      className={`group block cursor-pointer ${isPromo ? 'ring-2 ring-[#F5CC7A]/60 rounded-2xl' : ''}`}
      aria-label={`Ver ${product.name}`}
    >
      {/* Image */}
      <div
        className={`relative overflow-hidden mb-3 aspect-[4/5] ${isPromo ? 'rounded-t-2xl' : 'rounded-2xl'}`}
        style={{ backgroundColor: imgBg }}
      >
        {product.images?.[0] ? (
          <Image
            src={product.images[0]}
            alt={`${product.name} — portachupete personalizado Mimikids`}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover group-hover:scale-[1.04] transition-transform duration-500 ease-out"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl opacity-20">🧸</div>
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {isPromo && (
            <span className="bg-[#F5CC7A] text-[#7A5200] text-[0.625rem] font-black px-2.5 py-1 rounded-full tracking-wide uppercase shadow-sm">
              🔥 COMBO
            </span>
          )}
          {isPortachupete && (
            <span className="bg-[#C4687D] text-white text-[0.625rem] font-black px-2.5 py-1 rounded-full tracking-wide uppercase shadow-sm">
              20% OFF
            </span>
          )}
          {product.badge && (
            <span className="bg-white/90 backdrop-blur-sm text-[#2B1A20] text-[0.6875rem] font-semibold px-3 py-1 rounded-full border border-[#EDCCD5]/60">
              {product.badge}
            </span>
          )}
        </div>

        {/* Hover CTA */}
        <div className="absolute inset-0 bg-[#2B1A20]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <span className="inline-flex items-center gap-1.5 bg-white text-[#2B1A20] text-xs font-semibold px-4 py-2 rounded-full translate-y-3 group-hover:translate-y-0 transition-transform duration-300 shadow-lg">
            {product.category === 'funda' ? 'Agregar al carrito' : 'Personalizar'}
            <ArrowUpRight size={13} strokeWidth={2} />
          </span>
        </div>
      </div>

      {/* Promo bottom strip */}
      {isPromo && (
        <div className="bg-[#FFF8EC] border-x-2 border-[#F5CC7A]/60 px-3 py-1.5 text-center">
          <p className="text-[0.65rem] font-bold text-[#9A6A00] uppercase tracking-wider">
            Funda + Portachupete · Combo
          </p>
        </div>
      )}

      {/* Info */}
      <div className={`px-0.5 pt-1 ${isPromo ? 'bg-white border-x-2 border-b-2 border-[#F5CC7A]/60 rounded-b-2xl px-3 pb-3' : ''}`}>
        <h3 className={`font-playfair font-bold text-[#2B1A20] text-[0.875rem] md:text-[1.0625rem] leading-snug mb-1.5 group-hover:text-[#C4687D] transition-colors duration-200 ${isPromo ? 'pt-2' : ''}`}>
          {product.name}
        </h3>
        <div className="flex items-center justify-between gap-2">
          {isPortachupete ? (
            <div className="flex items-baseline gap-1.5">
              <p className="font-playfair text-lg font-bold text-[#C4687D]">
                {formatPrice(Math.round(product.price * (1 - PORTACHUPETE_DISCOUNT_PCT)))}
              </p>
              <p className="text-xs text-[#A58494] line-through">
                {formatPrice(product.price)}
              </p>
            </div>
          ) : (
            <p className={`font-playfair text-lg font-bold ${isPromo ? 'text-[#D4850A]' : 'text-[#C4687D]'}`}>
              {formatPrice(product.price)}
            </p>
          )}
          {product.category !== 'funda' && (
            <p className="text-xs text-[#A58494]">
              {product.production_days_min}–{product.production_days_max}d hábiles
            </p>
          )}
        </div>
      </div>
    </Link>
  )
}
