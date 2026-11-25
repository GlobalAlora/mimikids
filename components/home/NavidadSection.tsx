import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const NAVIDAD_DATE = new Date('2026-12-25T00:00:00-03:00')
const ORDER_DEADLINE = new Date('2026-12-20T23:59:59-03:00')

export default function NavidadSection() {
  const now = new Date()
  if (now >= NAVIDAD_DATE) return null

  const beforeDeadline = now < ORDER_DEADLINE
  const daysLeft = Math.ceil((ORDER_DEADLINE.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))

  return (
    <section
      aria-labelledby="navidad-heading"
      className="bg-gradient-to-b from-[#FDF0F3] to-[#FFFAF7] py-14 md:py-20 border-b border-[#EDCCD5]/40"
    >
      <div className="max-w-6xl mx-auto px-5">

        <div className="text-center mb-10">
          <p className="label-caps text-[#C4687D] mb-3">🎄 Regalo de Navidad · 25 de diciembre</p>
          <h2
            id="navidad-heading"
            className="font-playfair text-[1.875rem] md:text-[2.5rem] font-bold text-[#2B1A20] leading-tight mb-4"
          >
            El regalo de Navidad más especial
            <br />
            <span className="text-[#C4687D]">personalizado con el nombre del bebé</span>
          </h2>
          <p className="text-[#6D4D5A] max-w-[520px] mx-auto leading-relaxed">
            Regalá un portachupete artesanal personalizado esta Navidad.
            Único, hecho a mano y seguro para bebés — el regalo que toda mamá va a adorar.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {[
            {
              icon: '🎁',
              title: 'Regalo personalizado',
              desc: 'Con el nombre del bebé en letras de silicona o madera de haya. Incluye packaging de regalo.',
            },
            {
              icon: '🛡️',
              title: 'Seguro para bebés',
              desc: 'Silicona libre de BPA, materiales certificados y aptos para los más pequeños desde el primer día.',
            },
            {
              icon: '🚚',
              title: beforeDeadline ? `${daysLeft} días para pedirlo a tiempo` : 'Envíos a todo el país',
              desc: beforeDeadline
                ? 'Producción en 1-2 días hábiles + envío por Andreani. Pedí antes del 20/12 y llegás para Navidad.'
                : 'Producción en 1-2 días hábiles + envío a domicilio o sucursal Andreani en todo Argentina.',
            },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-white rounded-2xl p-6 text-center border border-[#EDCCD5]/50 shadow-sm"
            >
              <div className="text-3xl mb-3" aria-hidden="true">{item.icon}</div>
              <h3 className="font-semibold text-[#2B1A20] mb-2 text-sm">{item.title}</h3>
              <p className="text-sm text-[#6D4D5A] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center space-y-3">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 bg-[#C4687D] hover:bg-[#b05870] text-white font-semibold px-7 py-3.5 rounded-full transition-colors text-sm md:text-base"
          >
            Ver portachupetes con 20% OFF
            <ArrowRight size={15} />
          </Link>
          {beforeDeadline && (
            <p className="text-xs text-[#A58494]">
              ⏳ Pedí antes del{' '}
              <strong className="text-[#6D4D5A]">20 de diciembre</strong>{' '}
              para recibirlo a tiempo para Navidad
            </p>
          )}
        </div>

      </div>
    </section>
  )
}
