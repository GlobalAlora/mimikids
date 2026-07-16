'use client'

import { useEffect, useState, useRef, type ReactNode } from 'react'
import { X, ZoomIn, ZoomOut } from 'lucide-react'

interface Props {
  photo: string
  name: string
  onClose: () => void
  cta: ReactNode
}

const FOOTER_H = 80 // px — height of the footer strip

export default function ModelLightbox({ photo, name, onClose, cta }: Props) {
  const [zoomed, setZoomed] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  function toggleZoom() {
    setZoomed((z) => {
      // When zooming in, reset scroll to top-left
      if (!z && scrollRef.current) {
        scrollRef.current.scrollTop = 0
        scrollRef.current.scrollLeft = 0
      }
      return !z
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" onClick={onClose} />

      <div
        className="relative z-10 bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col"
        style={{ maxHeight: '90vh' }}
      >
        {/* Controls */}
        <div className="absolute top-3 right-3 z-20 flex gap-1.5">
          <button
            onClick={toggleZoom}
            className="w-9 h-9 bg-black/40 hover:bg-black/60 rounded-full flex items-center justify-center cursor-pointer transition-colors"
            title={zoomed ? 'Alejar' : 'Ampliar'}
          >
            {zoomed
              ? <ZoomOut size={16} className="text-white" />
              : <ZoomIn size={16} className="text-white" />}
          </button>
          <button
            onClick={onClose}
            className="w-9 h-9 bg-black/40 hover:bg-black/60 rounded-full flex items-center justify-center cursor-pointer transition-colors"
            title="Cerrar"
          >
            <X size={16} className="text-white" />
          </button>
        </div>

        {/* Image area */}
        <div
          ref={scrollRef}
          className="bg-[#F6EEE9] flex-1"
          style={{
            overflow: zoomed ? 'auto' : 'hidden',
            // Fixed height = viewport minus footer minus outer padding
            maxHeight: `calc(90vh - ${FOOTER_H}px)`,
            display: zoomed ? 'block' : 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onClick={!zoomed ? toggleZoom : undefined}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photo}
            alt={name || 'Modelo Mimikids'}
            onClick={zoomed ? toggleZoom : undefined}
            style={
              zoomed
                ? {
                    // 250% gives enough room to see detail and scroll around
                    width: '250%',
                    display: 'block',
                    cursor: 'zoom-out',
                  }
                : {
                    // object-contain: show full image, never cropped
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    cursor: 'zoom-in',
                  }
            }
          />
        </div>

        {/* Footer */}
        <div
          className="flex items-center gap-3 px-4 border-t border-[#F0E4E9] bg-white flex-shrink-0"
          style={{ height: FOOTER_H }}
        >
          <div className="min-w-0 flex-1">
            {name && (
              <p className="text-sm font-semibold text-[#2B1A20] truncate">{name}</p>
            )}
            <p className="text-[11px] text-[#A58494] mt-0.5">
              {zoomed ? 'Scrolleá para ver · tocá para alejar' : 'Tocá la imagen para ampliar'}
            </p>
          </div>
          {cta}
        </div>
      </div>
    </div>
  )
}
