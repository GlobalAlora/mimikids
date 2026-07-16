'use client'

import { useState, useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

const FOTOS = [
  { src: '/nosotros-1.jpg', alt: 'Cami con su familia', gradient: 'from-[#F9E0E8] to-[#F2C6D4]' },
  { src: '/nosotros-2.jpg', alt: 'Cami con Caetana y Conrado', gradient: 'from-[#D4EBF8] to-[#B8DFF5]' },
]

export default function SobreNosotras() {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  function goTo(index: number) {
    setCurrent((index + FOTOS.length) % FOTOS.length)
  }

  useEffect(() => {
    if (paused) return
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % FOTOS.length)
    }, 4500)
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [paused])

  return (
    <section id="nosotros" className="bg-[#F6EEE9] py-20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ── Slider ─────────────────────────────────────────────────── */}
          <div
            className="relative order-2 lg:order-1"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div className="relative rounded-3xl overflow-hidden aspect-[3/4] shadow-[0_20px_60px_rgba(43,26,32,0.15)]">

              {FOTOS.map((foto, i) => (
                <div
                  key={i}
                  className={`absolute inset-0 transition-opacity duration-700 ${
                    i === current ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${foto.gradient}`} />
                  <Image
                    src={foto.src}
                    alt={foto.alt}
                    fill
                    className="object-cover object-top"
                    priority={i === 0}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              ))}

              <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />

              <button
                onClick={() => goTo(current - 1)}
                aria-label="Foto anterior"
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-md hover:bg-white transition-colors cursor-pointer"
              >
                <ChevronLeft size={18} className="text-[#6b3d50]" />
              </button>
              <button
                onClick={() => goTo(current + 1)}
                aria-label="Foto siguiente"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-md hover:bg-white transition-colors cursor-pointer"
              >
                <ChevronRight size={18} className="text-[#6b3d50]" />
              </button>
            </div>

            <div className="flex items-center justify-center gap-2 mt-5">
              {FOTOS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Foto ${i + 1}`}
                  className={`rounded-full transition-all duration-300 cursor-pointer ${
                    i === current
                      ? 'w-6 h-2 bg-[#C4687D]'
                      : 'w-2 h-2 bg-[#EDCCD5] hover:bg-[#C4687D]/50'
                  }`}
                />
              ))}
            </div>

            <div aria-hidden className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-[#EDCCD5]/50 blur-2xl pointer-events-none -z-10" />
            <div aria-hidden className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-[#C4687D]/10 blur-2xl pointer-events-none -z-10" />
          </div>

          {/* ── Texto ──────────────────────────────────────────────────── */}
          <div className="order-1 lg:order-2">
            <p className="label-caps mb-4">Quiénes somos</p>

            <h2 className="font-playfair text-[2rem] md:text-[2.6rem] font-bold text-[#2B1A20] leading-[1.15] mb-6">
              Soy Cami, mamá de Caetana y Conrado
            </h2>

            <div className="space-y-4 text-[#6D4D5A] text-[15px] leading-relaxed">
              <p>
                Este emprendimiento nació en 2022 con el deseo de crear portachupetes personalizados
                que combinaran calidad, funcionalidad y diseño para acompañar los primeros momentos de cada bebé.
              </p>
              <p>
                Desde Trenque Lauquen elaboro cada pieza de manera artesanal, cuidando cada detalle
                para que llegue a tu familia con el mismo amor con el que fue creada.
              </p>
            </div>

            <blockquote className="mt-6 border-l-2 border-[#C4687D] pl-4 py-1 font-playfair italic text-[#6b3d50] text-[0.9375rem] leading-relaxed">
              &ldquo;Gracias por elegir y acompañar a Mimi Kids.&rdquo;
            </blockquote>

            <div className="flex flex-wrap gap-3 mt-8">
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

            <div className="mt-10 grid grid-cols-3 gap-4">
              {[
                { num: '100%', label: 'artesanal' },
                { num: '1–2', label: 'días de producción' },
                { num: '🤍', label: 'sin BPA' },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <p className="font-playfair text-2xl font-bold text-[#C4687D]">{s.num}</p>
                  <p className="text-xs text-[#A58494] mt-0.5 leading-tight">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
