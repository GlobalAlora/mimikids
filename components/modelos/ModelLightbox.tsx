'use client'

import { useEffect, useState, type ReactNode } from 'react'
import { X, ZoomIn, ZoomOut } from 'lucide-react'

interface Props {
  photo: string
  name: string
  onClose: () => void
  cta: ReactNode
}

export default function ModelLightbox({ photo, name, onClose, cta }: Props) {
  const [zoomed, setZoomed] = useState(false)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      <div className="relative z-10 bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">

        {/* Controls */}
        <div className="absolute top-3 right-3 z-20 flex gap-1.5">
          <button
            onClick={() => setZoomed((z) => !z)}
            className="w-8 h-8 bg-black/30 hover:bg-black/50 rounded-full flex items-center justify-center cursor-pointer transition-colors"
            title={zoomed ? 'Alejar' : 'Ampliar'}
          >
            {zoomed
              ? <ZoomOut size={14} className="text-white" />
              : <ZoomIn size={14} className="text-white" />}
          </button>
          <button
            onClick={onClose}
            className="w-8 h-8 bg-black/30 hover:bg-black/50 rounded-full flex items-center justify-center cursor-pointer transition-colors"
            title="Cerrar"
          >
            <X size={15} className="text-white" />
          </button>
        </div>

        {/* Image */}
        <div className="bg-[#F6EEE9] overflow-auto" style={{ maxHeight: '70vh' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photo}
            alt={name || 'Modelo Mimikids'}
            className="block transition-[width] duration-200"
            style={{
              width: zoomed ? '180%' : '100%',
              cursor: zoomed ? 'zoom-out' : 'zoom-in',
            }}
            onClick={() => setZoomed((z) => !z)}
          />
        </div>

        {/* Footer */}
        <div className="p-4 flex items-center gap-3 border-t border-[#F0E4E9]">
          <div className="min-w-0 flex-1">
            {name && (
              <p className="text-sm font-semibold text-[#2B1A20] truncate">{name}</p>
            )}
            <p className="text-[11px] text-[#A58494] mt-0.5">
              {zoomed ? 'Tocá para alejar' : 'Tocá la imagen para ampliar'}
            </p>
          </div>
          {cta}
        </div>
      </div>
    </div>
  )
}
