'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { X, Gift } from 'lucide-react'

const EVENT_DATE     = new Date('2026-08-10T00:00:00-03:00')
const ORDER_DEADLINE = new Date('2026-08-05T23:59:59-03:00')
const DISMISS_KEY    = 'mk_ddn26_dismissed'

export default function DiaDelNinoBanner() {
  const [visible, setVisible] = useState(false)
  const [daysLeft, setDaysLeft] = useState(0)
  const [orderDeadlinePassed, setOrderDeadlinePassed] = useState(false)

  useEffect(() => {
    if (localStorage.getItem(DISMISS_KEY)) return
    if (Date.now() >= EVENT_DATE.getTime()) return

    const calc = () => {
      const diff = EVENT_DATE.getTime() - Date.now()
      setDaysLeft(Math.max(0, Math.ceil(diff / 86_400_000)))
      setOrderDeadlinePassed(Date.now() > ORDER_DEADLINE.getTime())
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
    <div className="bg-[#2B1A20] text-white relative z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-5 py-2.5 flex items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm">
        <Gift size={14} className="text-[#f0b8c8] flex-shrink-0" />

        <span className="text-center leading-snug">
          <strong className="text-[#f0b8c8]">🎁 Día del Niño · 10 de agosto</strong>
          {daysLeft > 0 && (
            <span className="text-white/60 mx-1">· Quedan <strong className="text-white">{daysLeft} días</strong></span>
          )}
          {!orderDeadlinePassed ? (
            <span className="text-white/75 mx-1">
              · Pedí antes del <strong className="text-[#f0b8c8]">5/8</strong> para recibirlo a tiempo
            </span>
          ) : (
            <span className="text-white/75 mx-1">· ¡Último momento! Consultá disponibilidad</span>
          )}
        </span>

        <Link
          href="/shop"
          className="hidden sm:inline-flex items-center gap-1 bg-[#C4687D] hover:bg-[#b05870] text-white text-xs font-semibold px-3 py-1.5 rounded-full transition-colors flex-shrink-0"
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
