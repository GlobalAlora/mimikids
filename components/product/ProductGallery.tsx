'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Badge from '@/components/ui/Badge'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

export default function ProductGallery({
  images,
  name,
  badge,
}: {
  images: string[]
  name: string
  badge?: string
}) {
  const [active, setActive] = useState(0)
  const [lightbox, setLightbox] = useState(false)

  // Cerrar lightbox con Escape o flechas
  useEffect(() => {
    if (!lightbox) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setLightbox(false)
      if (e.key === 'ArrowRight') setActive((i) => (i + 1) % images.length)
      if (e.key === 'ArrowLeft') setActive((i) => (i - 1 + images.length) % images.length)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightbox, images.length])

  return (
    <>
      <div className="space-y-3">
        {/* Imagen principal */}
        <div
          className="relative bg-[#F6EEE9] rounded-2xl overflow-hidden aspect-[4/5] cursor-zoom-in"
          onClick={() => setLightbox(true)}
        >
          <Image
            src={images[active]}
            alt={`${name} — portachupete personalizado Mimikids`}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
            className="object-cover transition-opacity duration-200"
          />
          {badge && (
            <div className="absolute top-4 left-4">
              <Badge>{badge}</Badge>
            </div>
          )}
          {images.length > 1 && (
            <div className="absolute bottom-3 right-3 bg-black/40 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
              {active + 1} / {images.length}
            </div>
          )}
        </div>

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="flex gap-2.5 overflow-x-auto pb-1">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`relative w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden border-2 transition-all duration-200 cursor-pointer ${
                  i === active
                    ? 'border-[#C4687D] shadow-md scale-[1.04]'
                    : 'border-[#EDCCD5] hover:border-[#C4687D]/60'
                }`}
              >
                  <Image src={img} alt="" fill sizes="80px" className="object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightbox(false)}
        >
          {/* Cerrar */}
          <button
            onClick={() => setLightbox(false)}
            className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>

          {/* Imagen */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={images[active]}
            alt={name}
            className="max-h-[90vh] max-w-[90vw] object-contain rounded-xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Navegación si hay más de 1 */}
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); setActive((i) => (i - 1 + images.length) % images.length) }}
                className="absolute left-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors cursor-pointer"
              >
                <ChevronLeft size={22} />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); setActive((i) => (i + 1) % images.length) }}
                className="absolute right-16 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors cursor-pointer"
              >
                <ChevronRight size={22} />
              </button>
              <div className="absolute bottom-4 text-white/60 text-sm">
                {active + 1} / {images.length}
              </div>
            </>
          )}
        </div>
      )}
    </>
  )
}
