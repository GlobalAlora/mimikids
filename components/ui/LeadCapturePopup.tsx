'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { X, Mail, Check } from 'lucide-react'

const STORAGE_KEY = 'mk_lead_captured'
const DISCOUNT_CODE = 'BIENVENIDA10'

export default function LeadCapturePopup() {
  const [visible, setVisible] = useState(false)
  const [animIn, setAnimIn] = useState(false)
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const shownRef = useRef(false)

  const show = useCallback(() => {
    if (shownRef.current) return
    if (typeof window !== 'undefined' && localStorage.getItem(STORAGE_KEY)) return
    shownRef.current = true
    setVisible(true)
    requestAnimationFrame(() => requestAnimationFrame(() => setAnimIn(true)))
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined' && localStorage.getItem(STORAGE_KEY)) return

    const timer = setTimeout(show, 30000)

    const onMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) show()
    }
    document.addEventListener('mouseleave', onMouseLeave)

    return () => {
      clearTimeout(timer)
      document.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [show])

  function dismiss() {
    setAnimIn(false)
    setTimeout(() => setVisible(false), 280)
    if (typeof window !== 'undefined') localStorage.setItem(STORAGE_KEY, '1')
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    try {
      await fetch('/api/leads/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (typeof window !== 'undefined') localStorage.setItem(STORAGE_KEY, '1')
      setSuccess(true)
    } finally {
      setLoading(false)
    }
  }

  if (!visible) return null

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      style={{ transition: 'opacity 280ms', opacity: animIn ? 1 : 0 }}
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-[#2B1A20]/55 backdrop-blur-[3px]"
        onClick={dismiss}
        aria-hidden="true"
      />

      {/* Card */}
      <div
        className="relative bg-white rounded-3xl shadow-2xl w-full max-w-[360px] overflow-hidden"
        style={{
          transition: 'transform 280ms cubic-bezier(0.34,1.56,0.64,1), opacity 280ms',
          transform: animIn ? 'scale(1) translateY(0)' : 'scale(0.92) translateY(16px)',
          opacity: animIn ? 1 : 0,
        }}
        role="dialog"
        aria-modal="true"
        aria-label="Descuento de bienvenida"
      >
        <button
          onClick={dismiss}
          className="absolute top-3.5 right-3.5 p-1.5 rounded-full hover:bg-[#EDCCD5]/40 transition-colors cursor-pointer z-10"
          aria-label="Cerrar"
        >
          <X size={15} className="text-[#A58494]" />
        </button>

        {/* Header */}
        <div className="bg-gradient-to-br from-[#FAE8EC] via-[#FDF3F5] to-[#F6EEE9] px-6 pt-7 pb-5 text-center">
          <div className="text-4xl mb-3">🎁</div>
          <h2 className="font-playfair text-[1.5rem] font-bold text-[#2B1A20] leading-tight mb-1.5">
            10% OFF en tu<br />primera compra
          </h2>
          <p className="text-[0.8125rem] text-[#6D4D5A] leading-relaxed">
            Dejá tu email y recibís el código al instante.
          </p>
        </div>

        {/* Body */}
        <div className="px-6 py-5">
          {success ? (
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Check size={22} className="text-green-600 stroke-[2.5]" />
              </div>
              <p className="font-playfair font-bold text-[#2B1A20] text-lg mb-1">¡Listo! 🎉</p>
              <p className="text-xs text-[#6D4D5A] mb-3">Tu código de descuento es:</p>
              <div className="bg-[#FAE8EC] border-2 border-dashed border-[#C4687D]/50 rounded-xl px-4 py-2.5 mb-3">
                <p className="font-bold text-[#C4687D] text-xl tracking-[0.15em]">{DISCOUNT_CODE}</p>
              </div>
              <p className="text-[0.7rem] text-[#A58494] leading-relaxed mb-4">
                También te lo enviamos por email.<br />
                Mencionalo al coordinar tu pedido.
              </p>
              <button
                onClick={dismiss}
                className="w-full bg-[#C4687D] hover:bg-[#A8546A] text-white font-semibold text-sm py-3 rounded-full transition-colors cursor-pointer"
              >
                ¡Ver portachupetes!
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-2.5">
              <div className="relative">
                <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A58494]" />
                <input
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-[#EDCCD5]/60 focus:border-[#C4687D] focus:outline-none text-sm text-[#2B1A20] placeholder-[#A58494] transition-colors bg-white"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#C4687D] hover:bg-[#A8546A] disabled:opacity-60 text-white font-semibold text-sm py-3 rounded-full transition-colors cursor-pointer"
              >
                {loading ? 'Enviando...' : '¡Quiero mi 10% OFF!'}
              </button>
              <button
                type="button"
                onClick={dismiss}
                className="w-full text-xs text-[#A58494] hover:text-[#6D4D5A] transition-colors cursor-pointer py-1"
              >
                No, gracias
              </button>
              <p className="text-[0.65rem] text-[#A58494] text-center leading-relaxed">
                Sin spam. Solo novedades y descuentos exclusivos 🤍
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
