'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Model } from '@/types'
import { ArrowRight } from 'lucide-react'
import ModelLightbox from '@/components/modelos/ModelLightbox'

const COLORS: { value: string; label: string; hex: string; border?: boolean }[] = [
  { value: 'blanco',  label: 'Blanco',  hex: '#F5EFEA', border: true },
  { value: 'beige',   label: 'Beige',   hex: '#D4B896' },
  { value: 'celeste', label: 'Celeste', hex: '#8EC9E0' },
  { value: 'rosa',    label: 'Rosa',    hex: '#E8A0B0' },
  { value: 'madera',  label: 'Madera',  hex: '#B8804A' },
]

export default function ModelsGallery({ models, returnTo = '/shop' }: { models: Model[]; returnTo?: string }) {
  const [activeColor, setActiveColor] = useState<string | null>(null)
  const [lightbox, setLightbox] = useState<Model | null>(null)

  const filtered = activeColor
    ? models.filter((m) => m.color === activeColor)
    : models

  const hasColors = models.some((m) => m.color)

  return (
    <div className="min-h-screen bg-[#FFFAF7]">

      {/* Hero */}
      <div className="bg-gradient-to-b from-[#F6EEE9] to-[#FFFAF7] border-b border-[#EDCCD5]/40 py-14">
        <div className="max-w-6xl mx-auto px-5 text-center">
          <p className="label-caps mb-3">Catálogo de modelos</p>
          <h1 className="font-playfair text-[2.5rem] md:text-[3.5rem] font-bold text-[#2B1A20] leading-[1.1] mb-4">
            Elegí tu modelo favorito
          </h1>
          <p className="text-[#6D4D5A] text-sm max-w-md mx-auto leading-relaxed">
            Cada foto es un portachupete real que hicimos. Encontrá el que más te gusta
            y lo usamos de referencia para el tuyo — con el nombre de tu bebé.
          </p>
        </div>
      </div>

      {/* Filtros de color */}
      {hasColors && (
        <div className="border-b border-[#EDCCD5]/40 bg-white sticky top-0 z-30">
          <div className="max-w-6xl mx-auto px-5 py-3 flex items-center gap-2 overflow-x-auto scrollbar-none">
            <button
              onClick={() => setActiveColor(null)}
              className={`flex-shrink-0 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeColor === null
                  ? 'bg-[#2B1A20] text-white'
                  : 'bg-white text-[#6D4D5A] border border-[#EDCCD5] hover:border-[#C4687D]'
              }`}
            >
              Todos
              <span className="opacity-60 text-[10px]">({models.length})</span>
            </button>

            {COLORS.filter((c) => models.some((m) => m.color === c.value)).map((c) => {
              const count = models.filter((m) => m.color === c.value).length
              const isActive = activeColor === c.value
              return (
                <button
                  key={c.value}
                  onClick={() => setActiveColor(isActive ? null : c.value)}
                  className={`flex-shrink-0 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#2B1A20] text-white'
                      : 'bg-white text-[#6D4D5A] border border-[#EDCCD5] hover:border-[#C4687D]'
                  }`}
                >
                  <span
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{
                      background: c.hex,
                      border: c.border ? '1px solid #D4B8C0' : 'none',
                    }}
                  />
                  {c.label}
                  <span className="opacity-60 text-[10px]">({count})</span>
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* Galería */}
      <div className="max-w-6xl mx-auto px-5 py-12">
        {models.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-5xl mb-4">🧸</div>
            <p className="text-[#A58494] font-medium text-lg">Pronto cargamos los modelos</p>
            <p className="text-sm text-[#A58494] mt-1">Mientras tanto, podés comprar y coordinar el diseño por WhatsApp</p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 mt-6 bg-[#C4687D] text-white text-sm font-semibold px-6 py-3 rounded-full hover:bg-[#A8546A] transition-colors"
            >
              Ir a la tienda <ArrowRight size={14} />
            </Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {filtered.map((model) => (
                <button
                  key={model.id}
                  onClick={() => setLightbox(model)}
                  className="group relative rounded-2xl overflow-hidden border-2 border-transparent hover:border-[#EDCCD5] hover:shadow-md transition-all duration-200 cursor-pointer text-left"
                >
                  <div className="aspect-square bg-[#F6EEE9]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={model.photo}
                      alt={model.name || 'Modelo Mimikids'}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  {model.name && (
                    <div className="p-2 bg-white">
                      <p className="text-xs font-medium text-[#6D4D5A] leading-tight line-clamp-2">
                        {model.name}
                      </p>
                    </div>
                  )}
                </button>
              ))}
            </div>

            {filtered.length === 0 && activeColor && (
              <div className="text-center py-16">
                <p className="text-[#A58494]">
                  No hay modelos de color {COLORS.find(c => c.value === activeColor)?.label.toLowerCase()} todavía
                </p>
                <button
                  onClick={() => setActiveColor(null)}
                  className="mt-3 text-sm text-[#C4687D] underline cursor-pointer"
                >
                  Ver todos los modelos
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <ModelLightbox
          photo={lightbox.photo}
          name={lightbox.name}
          onClose={() => setLightbox(null)}
          cta={
            <Link
              href={`${returnTo}?modelo=${lightbox.id}&modeloFoto=${encodeURIComponent(lightbox.photo)}&modeloNombre=${encodeURIComponent(lightbox.name)}`}
              className="flex-shrink-0 bg-[#C4687D] text-white text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-[#A8546A] transition-colors whitespace-nowrap flex items-center gap-1.5"
            >
              Quiero este <ArrowRight size={13} />
            </Link>
          }
        />
      )}
    </div>
  )
}
