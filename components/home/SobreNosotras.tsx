'use client'

import { useState, useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

// ── Reemplazá estos placeholders con el contenido real ──────────────────────

const TEXTO = {
  eyebrow: 'Quiénes somos',
  titulo: 'Hecho con amor, desde Trenque Lauquen',
  parrafo1:
    'Somos dos mamás que un día se dieron cuenta de que los portachupetes del mercado no tenían la ternura que merecían los bebés. Así nació Mimikids: desde casa, con hilo, cuentas, y muchísimo amor en cada nudo.',
  parrafo2:
    'Cada portachupete lo armamos a mano, uno por uno, cuando llega tu pedido. Por eso podés elegir cada detalle: el nombre del bebé, los colores, el broche. No hay dos iguales — igual que ellos.',
  firma: '— El equipo Mimikids 🤍',
}

// ── Slides: color de fondo como placeholder hasta tener fotos reales ──────────
const FOTOS: { src: string; alt: string; gradient: string }[] = [
  { src: '/sobre-1.jpg', alt: 'Armando portachupetes a mano', gradient: 'from-[#F9E0E8] to-[#F2C6D4]' },
  { src: '/sobre-2.jpg', alt: 'Cuentas y materiales de colores', gradient: 'from-[#D4EBF8] to-[#B8DFF5]' },
  { src: '/sobre-3.jpg', alt: 'Portachupete terminado con nombre', gradient: 'from-[#D4F0E5] to-[#B0E0CC]' },
  { src: '/sobre-4.jpg', alt: 'Empaquetado listo para enviar',    gradient: 'from-[#F5E6D3] to-[#E8D0B0]' },
]

// Íconos decorativos para cada slide placeholder
const SLIDE_ICONS = ['🧸', '✨', '🤍', '🎀']

// ────────────────────────────────────────────────────────────────────────────

export default function SobreNosotras() {
  const [current, setCurrent] = useState(0)
  const [loaded, setLoaded] = useState<boolean[]>(FOTOS.map(() => false))
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  function goTo(index: number) {
    setCurrent((index + FOTOS.length) % FOTOS.length)
    resetTimer()
  }

  function resetTimer() {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % FOTOS.length)
    }, 4500)
  }

  useEffect(() => {
    resetTimer()
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function markLoaded(i: number) {
    setLoaded((prev) => { const n = [...prev]; n[i] = true; return n })
  }

  return (
    <section className="bg-[#F6EEE9] py-20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ── Slider ─────────────────────────────────────────────────── */}
          <div className="relative order-2 lg:order-1">
            {/* Frame */}
            <div className="relative rounded-3xl overflow-hidden aspect-[4/5] shadow-[0_20px_60px_rgba(43,26,32,0.15)]">

              {/* Slides */}
              {FOTOS.map((foto, i) => (
                <div
                  key={i}
                  className={`absolute inset-0 transition-opacity duration-700 ${
                    i === current ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  {/* Fondo gradiente siempre visible (placeholder o base) */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${foto.gradient} flex items-center justify-center`}>
                    <span className="text-6xl opacity-30 select-none">{SLIDE_ICONS[i]}</span>
                  </div>
                  {/* Imagen real encima, si existe */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={foto.src}
                    alt={foto.alt}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${loaded[i] ? 'opacity-100' : 'opacity-0'}`}
                    onLoad={() => markLoaded(i)}
                    onError={() => {/* imagen no existe aún, muestra gradiente */}}
                  />
                </div>
              ))}

              {/* Overlay gradiente inferior */}
              <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />

              {/* Controles prev/next */}
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

            {/* Dots */}
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

            {/* Decorative blob */}
            <div
              aria-hidden
              className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-[#EDCCD5]/50 blur-2xl pointer-events-none -z-10"
            />
            <div
              aria-hidden
              className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-[#C4687D]/10 blur-2xl pointer-events-none -z-10"
            />
          </div>

          {/* ── Texto ──────────────────────────────────────────────────── */}
          <div className="order-1 lg:order-2">
            <p className="label-caps mb-4">{TEXTO.eyebrow}</p>

            <h2 className="font-playfair text-[2rem] md:text-[2.6rem] font-bold text-[#2B1A20] leading-[1.15] mb-6">
              {TEXTO.titulo}
            </h2>

            <div className="space-y-4 text-[#6D4D5A] text-[15px] leading-relaxed">
              <p>{TEXTO.parrafo1}</p>
              <p>{TEXTO.parrafo2}</p>
            </div>

            {/* Firma */}
            <p className="mt-8 font-playfair italic text-[#C4687D] text-lg">
              {TEXTO.firma}
            </p>

            {/* Stats rápidas */}
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
