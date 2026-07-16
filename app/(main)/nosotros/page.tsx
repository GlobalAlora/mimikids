'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'

const PHOTOS = ['/nosotros-1.jpg', '/nosotros-2.jpg']

function PhotoCarousel() {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)

  const next = useCallback(() => setCurrent((i) => (i + 1) % PHOTOS.length), [])
  const prev = useCallback(() => setCurrent((i) => (i - 1 + PHOTOS.length) % PHOTOS.length), [])

  useEffect(() => {
    if (paused) return
    const t = setInterval(next, 4000)
    return () => clearInterval(t)
  }, [paused, next])

  return (
    <div
      className="relative w-full rounded-3xl overflow-hidden bg-[#F6EEE9] shadow-lg"
      style={{ aspectRatio: '3/4' }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {PHOTOS.map((src, i) => (
        <div
          key={src}
          className="absolute inset-0 transition-opacity duration-700"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          <Image
            src={src}
            alt={`Cami Mimikids ${i + 1}`}
            fill
            className="object-cover object-top"
            priority={i === 0}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      ))}

      {/* Arrows */}
      <button
        onClick={prev}
        className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/70 hover:bg-white rounded-full flex items-center justify-center shadow cursor-pointer transition-all"
        aria-label="Anterior"
      >
        <ChevronLeft size={18} className="text-[#6D4D5A]" />
      </button>
      <button
        onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/70 hover:bg-white rounded-full flex items-center justify-center shadow cursor-pointer transition-all"
        aria-label="Siguiente"
      >
        <ChevronRight size={18} className="text-[#6D4D5A]" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 inset-x-0 flex justify-center gap-2">
        {PHOTOS.map((_, i) => (
          <button
            key={i}
            onClick={() => { setCurrent(i); setPaused(true) }}
            className={`h-1.5 rounded-full transition-all cursor-pointer ${
              i === current ? 'bg-white w-5' : 'bg-white/50 w-1.5'
            }`}
            aria-label={`Foto ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export default function NosotrosPage() {
  return (
    <main className="min-h-screen bg-[#FFFAF7]">

      {/* Hero band */}
      <div className="bg-gradient-to-b from-[#F6EEE9] to-[#FFFAF7] border-b border-[#EDCCD5]/40 py-12">
        <div className="max-w-6xl mx-auto px-5 text-center">
          <p className="label-caps mb-3">Nuestra historia</p>
          <h1 className="font-playfair text-[2.5rem] md:text-[3.5rem] font-bold text-[#2B1A20] leading-[1.1]">
            Quiénes somos
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-5 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">

          {/* Carousel */}
          <div className="w-full max-w-sm mx-auto md:max-w-none">
            <PhotoCarousel />
          </div>

          {/* Text */}
          <div className="flex flex-col gap-6">

            {/* Signature accent */}
            <div className="inline-flex items-center gap-2 self-start">
              <div className="w-8 h-px bg-[#C4687D]" />
              <span className="text-[#C4687D] text-sm font-semibold tracking-wide">Cami, fundadora</span>
            </div>

            <h2 className="font-playfair text-[1.75rem] md:text-[2.25rem] font-bold text-[#2B1A20] leading-[1.15]">
              Soy Cami, mamá de Caetana y Conrado
            </h2>

            <div className="space-y-4 text-[#6D4D5A] leading-relaxed text-[0.9375rem]">
              <p>
                Este emprendimiento nació en 2022 con el deseo de crear portachupetes personalizados que combinaran
                calidad, funcionalidad y diseño para acompañar los primeros momentos de cada bebé.
              </p>
              <p>
                Desde Trenque Lauquen elaboro cada pieza de manera artesanal, cuidando cada detalle para que llegue
                a tu familia con el mismo amor con el que fue creada.
              </p>
            </div>

            {/* Quote highlight */}
            <blockquote className="border-l-2 border-[#C4687D] pl-4 py-1 text-[#6b3d50] italic text-[0.9375rem] leading-relaxed">
              "Gracias por elegir y acompañar a Mimi Kids."
            </blockquote>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 bg-[#C4687D] text-white text-sm font-semibold px-6 py-3 rounded-full hover:bg-[#A8546A] transition-colors"
              >
                Ver productos <ArrowRight size={14} />
              </Link>
              <Link
                href="/modelos"
                className="inline-flex items-center gap-2 border border-[#EDCCD5] text-[#6D4D5A] text-sm font-semibold px-6 py-3 rounded-full hover:border-[#C4687D] hover:text-[#C4687D] transition-colors"
              >
                Ver modelos
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
