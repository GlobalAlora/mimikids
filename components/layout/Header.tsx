'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ShoppingBag, Menu, X } from 'lucide-react'
import { useCartStore } from '@/store/cart'
import { useState, useEffect } from 'react'

const NAVIDAD_DATE  = new Date('2026-12-25T00:00:00-03:00')
const LIGHT_COLORS  = ['#E84040', '#F5D020', '#3DAA5C', '#4A88D9', '#F07820', '#C050C8']
const LIGHTS = Array.from({ length: 20 }, (_, i) => ({
  id:       i,
  color:    LIGHT_COLORS[i % LIGHT_COLORS.length],
  left:     (i * 5.3 + 1.5) % 100,
  delay:    (i * 0.27)       % 2.4,
  duration: 1.2 + (i * 0.21) % 1.5,
}))

const NAV = [
  { href: '/',               label: 'Inicio' },
  { href: '/shop',           label: 'Tienda' },
  { href: '/modelos',        label: 'Modelos' },
  { href: '/nosotros',       label: 'Nosotros' },
  { href: '/#como-funciona', label: 'Cómo funciona' },
  { href: '/#contacto',      label: 'Contacto' },
]

export default function Header() {
  const itemCount = useCartStore((s) => s.itemCount())
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#FFFAF7]/95 backdrop-blur-md border-b border-[#EDCCD5]/60 shadow-[0_1px_12px_rgba(43,26,32,0.06)]'
          : 'bg-[#FFFAF7]/80 backdrop-blur-sm border-b border-transparent'
      }`}
      style={{ overflow: 'visible' }}
    >
      <div className="max-w-6xl mx-auto px-5 h-[68px] flex items-center justify-between gap-6">

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center flex-shrink-0"
          aria-label="Mimikids — inicio"
        >
          <Image
            src="/mimikids.jpg"
            alt="Mimikids"
            width={84}
            height={84}
            className="rounded-full object-cover"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7" aria-label="Navegación principal">
          {NAV.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative text-[0.8125rem] font-medium text-[#6D4D5A] hover:text-[#2B1A20] transition-colors duration-200 after:absolute after:bottom-[-3px] after:left-0 after:h-px after:w-0 after:bg-[#C4687D] after:transition-all after:duration-200 hover:after:w-full"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-1">
          {/* Cart */}
          <Link
            href="/cart"
            className="relative p-2.5 rounded-full hover:bg-[#F9EDF1] transition-colors duration-200 cursor-pointer"
            aria-label={`Carrito${itemCount > 0 ? ` (${itemCount} productos)` : ''}`}
          >
            <ShoppingBag size={20} className="text-[#6D4D5A]" strokeWidth={1.75} />
            {itemCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 min-w-[18px] min-h-[18px] bg-[#C4687D] text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-bounce-once">
                {itemCount > 9 ? '9+' : itemCount}
              </span>
            )}
          </Link>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-2.5 rounded-full hover:bg-[#F9EDF1] transition-colors duration-200 cursor-pointer"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen
              ? <X size={20} className="text-[#6D4D5A]" strokeWidth={1.75} />
              : <Menu size={20} className="text-[#6D4D5A]" strokeWidth={1.75} />
            }
          </button>
        </div>
      </div>

      {/* Luces de Navidad — cuelgan del borde inferior del header */}
      {new Date() < NAVIDAD_DATE && (
        <>
          <style>{`
            @keyframes mk-luz-glow {
              0%, 100% { opacity: 0.75; filter: brightness(0.85); }
              50%       { opacity: 1;    filter: brightness(1.4);  }
            }
            @media (prefers-reduced-motion: reduce) {
              .mk-luz { animation: none !important; }
            }
          `}</style>
          <div
            className="absolute left-0 right-0 pointer-events-none"
            style={{ bottom: -18, zIndex: 48, height: 20 }}
            aria-hidden="true"
          >
            {/* Hilo */}
            <div
              className="absolute left-0 right-0"
              style={{ top: 0, height: 2, background: 'rgba(40,24,8,0.35)' }}
            />
            {LIGHTS.map((l) => (
              <div key={l.id} className="absolute" style={{ left: `${l.left}%`, top: 0 }}>
                {/* Capuchón */}
                <div style={{
                  width: 4, height: 5,
                  background: 'rgba(40,24,8,0.4)',
                  margin: '0 auto',
                  borderRadius: '1px 1px 0 0',
                }} />
                {/* Bulbo */}
                <div
                  className="mk-luz"
                  style={{
                    width: 10, height: 14,
                    background: l.color,
                    borderRadius: '50% 50% 45% 45%',
                    boxShadow: `0 0 7px 3px ${l.color}70`,
                    animation: `mk-luz-glow ${l.duration}s ${l.delay}s ease-in-out infinite`,
                  }}
                />
              </div>
            ))}
          </div>
        </>
      )}

      {/* Mobile nav */}
      {mobileOpen && (
        <nav
          className="md:hidden bg-[#FFFAF7] border-t border-[#EDCCD5]/50 px-5 pt-4 pb-5 flex flex-col gap-1"
          aria-label="Navegación móvil"
        >
          {NAV.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="py-2.5 text-sm font-medium text-[#6D4D5A] hover:text-[#C4687D] border-b border-[#EDCCD5]/40 last:border-0 transition-colors duration-200"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}
