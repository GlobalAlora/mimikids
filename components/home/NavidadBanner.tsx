'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { X } from 'lucide-react'

const NAVIDAD_DATE   = new Date('2026-12-25T00:00:00-03:00')
const ORDER_DEADLINE = new Date('2026-12-20T23:59:59-03:00')
const DISMISS_KEY    = 'mk_nav26_dismissed'

export default function NavidadBanner() {
  const [visible, setVisible] = useState(false)
  const [daysLeft, setDaysLeft] = useState(0)
  const [deadlinePassed, setDeadlinePassed] = useState(false)

  useEffect(() => {
    if (localStorage.getItem(DISMISS_KEY)) return
    if (Date.now() >= NAVIDAD_DATE.getTime()) return

    const calc = () => {
      const diff = ORDER_DEADLINE.getTime() - Date.now()
      setDaysLeft(Math.max(0, Math.ceil(diff / 86_400_000)))
      setDeadlinePassed(Date.now() > ORDER_DEADLINE.getTime())
    }
    calc()
    setVisible(true)
    const id = setInterval(calc, 60_000)
    return () => clearInterval(id)
  }, [])

  const dismiss = () => {
    localStorage.setItem(DISMISS_KEY, '1')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="bg-[#1C2B1E] text-white relative z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-5 py-2.5 flex items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm">
        <span className="text-base flex-shrink-0" aria-hidden="true">🎄</span>

        <span className="text-center leading-snug">
          {!deadlinePassed ? (
            <>
              <strong className="text-[#a8e0b0]">🎁 15% OFF</strong>
              <span className="text-white/60 mx-1">con el código</span>
              <strong className="text-white bg-white/10 px-1.5 py-0.5 rounded font-mono tracking-wide">NAVIDAD15</strong>
              {daysLeft > 0 && (
                <span className="text-white/60 mx-1">
                  · <strong className="text-white">{daysLeft} días</strong> para pedirlo a tiempo
                </span>
              )}
            </>
          ) : (
            <>
              <strong className="text-[#a8e0b0]">🎁 15% OFF</strong>
              <span className="text-white/60 mx-1">con el código</span>
              <strong className="text-white bg-white/10 px-1.5 py-0.5 rounded font-mono tracking-wide">NAVIDAD15</strong>
              <span className="text-white/75 mx-1">· ¡Último momento! Consultá disponibilidad</span>
            </>
          )}
        </span>

        <Link
          href="/shop"
          className="hidden sm:inline-flex items-center gap-1 bg-[#4a8c56] hover:bg-[#3d7a48] text-white text-xs font-semibold px-3 py-1.5 rounded-full transition-colors flex-shrink-0"
        >
          Ver regalos →
        </Link>

        <button
          onClick={dismiss}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 opacity-50 hover:opacity-100 transition-opacity cursor-pointer"
          aria-label="Cerrar anuncio"
        >
          <X size={13} />
        </button>
      </div>
    </div>
  )
}
