'use client'

import { useState } from 'react'
import { Product } from '@/types'
import ProductCard from '@/components/shop/ProductCard'
import { Sparkles, Package, Gift } from 'lucide-react'

type Category = 'all' | 'portachupete' | 'funda' | 'promo'

interface Tab {
  id: Category
  label: string
  icon: React.ReactNode
  description: string
  badge?: string
}

const TABS: Tab[] = [
  {
    id: 'all',
    label: 'Todo',
    icon: <Sparkles size={15} />,
    description: 'Todos nuestros productos personalizados para el bebé',
  },
  {
    id: 'portachupete',
    label: 'Portachupetes',
    icon: <Package size={15} />,
    description: 'El portachupete de letras más personalizable del mercado. Con nombre, broche y colores a tu elección.',
  },
  {
    id: 'funda',
    label: 'Fundas',
    icon: <span className="text-[13px] leading-none">🍼</span>,
    description: 'Fundas artesanales para proteger y decorar el portachupete. Van a juego con todos los modelos.',
  },
  {
    id: 'promo',
    label: 'Combos',
    icon: <Gift size={15} />,
    description: '',
    badge: '🔥',
  },
]

export default function ShopClient({ initialProducts }: { initialProducts: Product[] }) {
  const [activeTab, setActiveTab] = useState<Category>('all')

  const filtered = activeTab === 'all'
    ? initialProducts
    : initialProducts.filter((p) => p.category === activeTab)

  const activeTabData = TABS.find((t) => t.id === activeTab)!

  return (
    <div className="min-h-screen bg-[#FFFAF7]">

      {/* Page header */}
      <div className="bg-gradient-to-b from-[#F6EEE9] to-[#FFFAF7] border-b border-[#EDCCD5]/40 pt-12 pb-0">
        <div className="max-w-6xl mx-auto px-5">
          <div className="text-center mb-8">
            <p className="label-caps mb-3">Colección Mimikids</p>
            <h1 className="font-playfair text-[2.25rem] md:text-[3rem] font-bold text-[#2B1A20] leading-[1.1] mb-3">
              Hecho con amor, listo en 1–2 días
            </h1>
            <p className="text-[#6D4D5A] text-sm leading-relaxed max-w-xs mx-auto">
              Cada pieza se fabrica artesanalmente cuando la comprás. Sin stock genérico.
            </p>
          </div>

          {/* Category tabs */}
          <div className="flex items-center justify-center gap-1.5 flex-wrap pb-0">
            {TABS.map((tab) => {
              const isActive = tab.id === activeTab
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 px-4 py-2.5 rounded-t-xl text-sm font-semibold transition-all duration-200 cursor-pointer border-b-2 ${
                    isActive
                      ? 'bg-white text-[#C4687D] border-[#C4687D] shadow-[0_-2px_8px_rgba(196,104,125,0.08)]'
                      : 'text-[#6D4D5A] border-transparent hover:text-[#C4687D] hover:bg-white/60'
                  }`}
                >
                  {tab.icon}
                  {tab.badge && <span>{tab.badge}</span>}
                  {tab.label}
                  {tab.id !== 'all' && (
                    <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                      isActive ? 'bg-[#FAE8EC] text-[#C4687D]' : 'bg-[#F6EEE9] text-[#A58494]'
                    }`}>
                      {initialProducts.filter((p) => p.category === tab.id).length}
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-5 py-10">

        {/* Category description */}
        {activeTab === 'promo' ? (
          <div className="mb-8 rounded-2xl bg-gradient-to-r from-[#FFF3E0] to-[#FFF8EC] border border-[#F5CC7A]/40 p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="text-3xl">🎁</div>
            <div className="flex-1">
              <h2 className="font-playfair font-bold text-[#7A5200] text-lg mb-0.5">
                Combos · Funda + Portachupete
              </h2>
              <p className="text-sm text-[#9A6A00]">
                El regalo perfecto a precio de combo. Ambas piezas personalizadas juntas, listas para regalar.
              </p>
            </div>
            <div className="shrink-0 bg-[#F5CC7A]/30 text-[#7A5200] font-bold text-sm px-4 py-2 rounded-xl border border-[#F5CC7A]/50">
              Mejor precio
            </div>
          </div>
        ) : activeTabData.description ? (
          <p className="text-[#6D4D5A] text-sm mb-8 max-w-lg">{activeTabData.description}</p>
        ) : null}

        {/* Products grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-7">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <div className="text-4xl mb-4">🧸</div>
            <p className="text-[#A58494] font-medium">Pronto habrá productos en esta categoría.</p>
            <button
              onClick={() => setActiveTab('all')}
              className="mt-4 text-sm text-[#C4687D] font-semibold hover:underline cursor-pointer"
            >
              Ver todos los productos
            </button>
          </div>
        )}

      </div>

      {/* Bottom trust strip */}
      <div className="border-t border-[#EDCCD5]/30 bg-[#F6EEE9]/50 py-8 mt-4">
        <div className="max-w-6xl mx-auto px-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { emoji: '🎨', label: '100% personalizado', sub: 'Elegís cada detalle' },
              { emoji: '⚡', label: '1–2 días hábiles', sub: 'Producción express' },
              { emoji: '💎', label: 'Materiales premium', sub: 'Silicona sin BPA' },
              { emoji: '🚚', label: 'Andreani a todo el país', sub: 'O retiro en Trenque Lauquen' },
            ].map((item) => (
              <div key={item.label}>
                <div className="text-2xl mb-1">{item.emoji}</div>
                <p className="text-xs font-bold text-[#2B1A20]">{item.label}</p>
                <p className="text-xs text-[#A58494]">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
