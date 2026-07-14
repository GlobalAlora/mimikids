'use client'

import Link from 'next/link'
import Button from '@/components/ui/Button'
import { ArrowRight, Star } from 'lucide-react'
import { useState, useEffect, useCallback } from 'react'

const SLIDES = [
  { src: '/hero1.jpeg', alt: 'Portachupete personalizado Mimikids' },
  { src: '/hero2.jpeg', alt: 'Portachupete artesanal para bebé' },
  { src: '/hero3.jpeg', alt: 'Portachupete con nombre personalizado' },
]

const stats = [
  { value: '+500', label: 'familias felices' },
  { value: '4.9',  label: 'estrellas promedio' },
  { value: '1-2d', label: 'producción' },
]

export default function Hero() {
  const [current, setCurrent] = useState(0)

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % SLIDES.length)
  }, [])

  useEffect(() => {
    const id = setInterval(next, 4000)
    return () => clearInterval(id)
  }, [next])

  return (
    <section className="relative bg-[#FFFAF7] overflow-hidden">
      <div className="max-w-6xl mx-auto px-5 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[calc(100vh-68px)]">

        {/* ── Text ─────────────────────────────────────────────────── */}
        <div className="order-2 lg:order-1 flex flex-col justify-center">
          <p className="label-caps mb-5">
            Artesanal · 100% personalizado · Argentina
          </p>

          <h1 className="font-playfair text-[2.75rem] md:text-[3.5rem] lg:text-[4.25rem] font-bold text-[#2B1A20] leading-[1.08] tracking-tight mb-6">
            El portachupete
            <br />
            <em className="not-italic text-[#C4687D]">de tu bebé,</em>
            <br />
            único.
          </h1>

          <p className="text-[1.0625rem] text-[#6D4D5A] leading-relaxed max-w-[440px] mb-9">
            Portachupetes artesanales personalizados con el nombre de tu bebé.
            Materiales seguros, diseño único, hecho con amor en Argentina.
          </p>

          <div className="flex flex-wrap gap-3 mb-12">
            <Link href="/shop">
              <Button size="lg" className="group">
                Ver la tienda
                <ArrowRight
                  size={16}
                  className="ml-2 group-hover:translate-x-1 transition-transform duration-200"
                />
              </Button>
            </Link>
            <Link href="/#como-funciona">
              <Button variant="outline" size="lg">
                Cómo funciona
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-6 pt-6 border-t border-[#EDCCD5]/60">
            {stats.map((s, i) => (
              <div key={s.label} className="flex items-center gap-6">
                <div>
                  <p className="font-playfair text-[1.625rem] font-bold text-[#2B1A20] leading-none flex items-center gap-1">
                    {s.value}
                    {s.label === 'estrellas promedio' && (
                      <Star size={14} className="fill-[#C4687D] text-[#C4687D] mb-0.5" />
                    )}
                  </p>
                  <p className="text-xs text-[#A58494] mt-0.5">{s.label}</p>
                </div>
                {i < stats.length - 1 && (
                  <div className="w-px h-8 bg-[#EDCCD5]" aria-hidden="true" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ── Slider ───────────────────────────────────────────────── */}
        <div className="order-1 lg:order-2 flex items-center justify-center lg:justify-end">
          <div className="relative w-full max-w-[480px]">

            {/* Slides */}
            <div className="relative rounded-[2.5rem] overflow-hidden bg-[#F6EEE9] shadow-[0_24px_80px_rgba(43,26,32,0.12)]" style={{ aspectRatio: '4/5' }}>
              {SLIDES.map((slide, i) => (
                <img
                  key={slide.src}
                  src={slide.src}
                  alt={slide.alt}
                  className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
                  style={{ opacity: i === current ? 1 : 0 }}
                  loading={i === 0 ? 'eager' : 'lazy'}
                  aria-hidden={i !== current}
                />
              ))}
              {/* Gradient overlay */}
              <div
                className="absolute inset-0 bg-gradient-to-t from-[#2B1A20]/20 via-transparent to-transparent pointer-events-none"
                aria-hidden="true"
              />
            </div>

            {/* Dots */}
            <div className="flex items-center justify-center gap-2 mt-4" role="tablist" aria-label="Slider de imágenes">
              {SLIDES.map((_, i) => (
                <button
                  key={i}
                  role="tab"
                  aria-selected={i === current}
                  aria-label={`Imagen ${i + 1}`}
                  onClick={() => setCurrent(i)}
                  className={`rounded-full transition-all duration-300 cursor-pointer border-0 outline-none ${
                    i === current
                      ? 'w-6 h-2.5 bg-[#C4687D]'
                      : 'w-2.5 h-2.5 bg-[#EDCCD5] hover:bg-[#d4a5b0]'
                  }`}
                />
              ))}
            </div>

            {/* Floating name card */}
            <div className="absolute -bottom-5 -left-5 bg-white rounded-2xl shadow-[0_8px_32px_rgba(43,26,32,0.12)] px-5 py-3.5 border border-[#EDCCD5]/40">
              <p className="text-[0.6875rem] font-medium text-[#A58494] uppercase tracking-wide mb-0.5">Para</p>
              <p className="font-playfair font-bold text-[#2B1A20] text-xl leading-none">Conrado</p>
            </div>

            {/* BPA badge */}
            <div className="absolute -top-4 -right-4 bg-[#BDE8D6] text-[#1A5C42] rounded-full px-4 py-2 text-[0.6875rem] font-semibold shadow-md border border-white/60">
              Libre de BPA
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
