'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Product } from '@/types'
import ProductCard from '@/components/shop/ProductCard'
import { ArrowRight } from 'lucide-react'

type Category = 'all' | 'portachupete' | 'llavero' | 'funda' | 'promo'

const TABS: { id: Category; label: string }[] = [
  { id: 'all',          label: 'Todo' },
  { id: 'portachupete', label: 'Portachupetes' },
  { id: 'llavero',      label: '🔑 Llaveros' },
  { id: 'funda',        label: 'Fundas' },
  { id: 'promo',        label: '🔥 Combos' },
]

export default function HomeShopTabs({ products }: { products: Product[] }) {
  const [active, setActive] = useState<Category>('all')

  const filtered = active === 'all'
    ? products.slice(0, 8)
    : products.filter((p) => p.category === active).slice(0, 8)

  return (
    <section className="bg-[#FFFAF7] py-20">
      <div className="max-w-6xl mx-auto px-5">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <p className="label-caps mb-3">Nuestra colección</p>
            <h2 className="font-playfair text-[2rem] md:text-[2.5rem] font-bold text-[#2B1A20] leading-[1.15]">
              Encontrá el tuyo
            </h2>
          </div>
          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#C4687D] hover:text-[#A8546A] transition-colors group shrink-0 pb-1"
          >
            Ver todo
            <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform duration-200" />
          </Link>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 mb-8 flex-wrap">
          {TABS.map((tab) => {
            const count = tab.id === 'all'
              ? products.length
              : products.filter((p) => p.category === tab.id).length
            if (tab.id !== 'all' && count === 0) return null
            const isActive = active === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActive(tab.id)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer border ${
                  isActive
                    ? 'bg-[#C4687D] text-white border-[#C4687D] shadow-sm'
                    : 'bg-white text-[#6D4D5A] border-[#EDCCD5]/60 hover:border-[#C4687D] hover:text-[#C4687D]'
                }`}
              >
                {tab.label}
                {count > 0 && (
                  <span className={`ml-1.5 text-xs ${isActive ? 'opacity-70' : 'text-[#A58494]'}`}>
                    {count}
                  </span>
                )}
              </button>
            )
          })}
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-7">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-[#A58494]">
            <p>Pronto habrá productos en esta categoría.</p>
          </div>
        )}

        {/* CTA */}
        <div className="text-center mt-10">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 bg-[#2B1A20] text-white text-sm font-semibold px-8 py-3.5 rounded-full hover:bg-[#3d2530] transition-colors duration-200 group"
          >
            Ver todos los productos
            <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform duration-200" />
          </Link>
        </div>

      </div>
    </section>
  )
}
