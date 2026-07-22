import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const DDN_DATE = new Date('2026-08-10T00:00:00-03:00')

export default function DiaDelNinoSection() {
  if (new Date() >= DDN_DATE) return null

  return (
    <section
      aria-labelledby="ddn-heading"
      className="bg-gradient-to-b from-[#FDF0F3] to-[#FFFAF7] py-14 md:py-20 border-b border-[#EDCCD5]/40"
    >
      <div className="max-w-6xl mx-auto px-5">

        <div className="text-center mb-10">
          <p className="label-caps text-[#C4687D] mb-3">🎁 Regalo Día del Niño · 10 de agosto</p>
          <h2
            id="ddn-heading"
            className="font-playfair text-[1.875rem] md:text-[2.5rem] font-bold text-[#2B1A20] leading-tight mb-4"
          >
            El mejor regalo para bebés
            <br />
            <span className="text-[#C4687D]">personalizado con su nombre</span>
          </h2>
          <p className="text-[#6D4D5A] max-w-[520px] mx-auto leading-relaxed">
            Regalá un portachupete artesanal personalizado para el Día del Niño.
            Único, seguro y hecho con amor en Argentina — el regalo que toda mamá quiere para su bebé.
          </p>
        </div>

        {/* Beneficios */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {[
            {
              icon: '✨',
              title: 'Con el nombre del bebé',
              desc: 'Cada portachupete se personaliza artesanalmente. Único e irrepetible como tu bebé.',
            },
            {
              icon: '🛡️',
              title: 'Seguro para bebés',
              desc: 'Silicona libre de BPA, materiales certificados y aptos para los más pequeños.',
            },
            {
              icon: '🚚',
              title: 'Lo recibís a tiempo',
              desc: 'Producción en 1-2 días hábiles + envío a todo Argentina. Pedí antes del 5/8.',
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

        {/* CTA */}
        <div className="text-center space-y-3">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 bg-[#C4687D] hover:bg-[#b05870] text-white font-semibold px-7 py-3.5 rounded-full transition-colors text-sm md:text-base"
          >
            Ver portachupetes con 20% OFF
            <ArrowRight size={15} />
          </Link>
          <p className="text-xs text-[#A58494]">
            ⏳ Pedí antes del <strong className="text-[#6D4D5A]">5 de agosto</strong> para recibirlo a tiempo para el Día del Niño
          </p>
        </div>

      </div>
    </section>
  )
}
