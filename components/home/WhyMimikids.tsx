import { Heart, Palette, Truck, ShieldCheck } from 'lucide-react'

const pillars = [
  {
    icon: Heart,
    title: '100% Artesanal',
    description: 'Cada portachupete es hecho a mano, uno por uno. No existen dos iguales.',
    accent: '#C4687D',
    bg: '#FAF0F3',
  },
  {
    icon: Palette,
    title: 'Totalmente personalizado',
    description: 'El nombre de tu bebé y los colores que más te gusten. Coordinamos el diseño por WhatsApp.',
    accent: '#8B68C4',
    bg: '#F4EEFF',
  },
  {
    icon: ShieldCheck,
    title: 'Materiales seguros',
    description: 'Silicona alimentaria libre de BPA y madera de haya certificada. Tu bebé merece lo mejor.',
    accent: '#2D8A6A',
    bg: '#EDFAF5',
  },
  {
    icon: Truck,
    title: 'Envíos a todo el país',
    description: 'Despachamos por Andreani y Correo Argentino. Tu pedido llega seguro donde estés.',
    accent: '#C07A35',
    bg: '#FEF5E8',
  },
]

export default function WhyMimikids() {
  return (
    <section className="bg-white py-24">
      <div className="max-w-6xl mx-auto px-5">

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20 items-start">
          {/* Left: heading */}
          <div className="lg:pt-2">
            <p className="label-caps mb-4">Por qué elegirnos</p>
            <h2 className="font-playfair text-[2rem] md:text-[2.5rem] font-bold text-[#2B1A20] leading-[1.15]">
              Hecho con amor, pensado para ellos.
            </h2>
          </div>

          {/* Right: 2×2 grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {pillars.map((p) => (
              <div
                key={p.title}
                className="group p-6 rounded-2xl border border-[#EDCCD5]/30 hover:border-[#EDCCD5]/80 hover:shadow-[0_4px_24px_rgba(43,26,32,0.07)] transition-all duration-300 bg-white cursor-default"
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: p.bg }}
                >
                  <p.icon size={20} style={{ color: p.accent }} strokeWidth={1.75} />
                </div>
                <h3 className="font-semibold text-[#2B1A20] text-[0.9375rem] mb-2 leading-snug">
                  {p.title}
                </h3>
                <p className="text-sm text-[#6D4D5A] leading-relaxed">{p.description}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
