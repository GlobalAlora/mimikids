import type { Metadata } from 'next'
import Link from 'next/link'
import SobreNosotras from '@/components/home/SobreNosotras'
import { Heart, Shield, Star, Truck } from 'lucide-react'

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://mimikids.com.ar'

export const metadata: Metadata = {
  title: { absolute: 'Nosotros — La historia de Mimikids | Portachupetes Personalizados' },
  description: 'Conocé a Cami, la mamá artesana detrás de Mimikids. Desde Trenque Lauquen fabricamos portachupetes personalizados con amor, materiales seguros y atención artesanal desde 2022.',
  keywords: [
    'sobre mimikids',
    'quiénes somos mimikids',
    'emprendimiento portachupetes argentina',
    'artesana trenque lauquen',
    'portachupetes hechos a mano',
    'bebés argentina artesanal',
  ],
  alternates: { canonical: `${SITE_URL}/nosotros` },
  openGraph: {
    title: 'La historia de Mimikids — Portachupetes con amor desde Trenque Lauquen',
    description: 'Conocé a Cami, la mamá artesana que fabrica cada portachupete personalizado a mano desde Trenque Lauquen, Buenos Aires.',
    url: `${SITE_URL}/nosotros`,
    images: [{ url: `${SITE_URL}/nosotros-1.jpg`, width: 800, height: 1067, alt: 'Cami — Mimikids' }],
  },
}

const VALUES = [
  {
    icon: Heart,
    title: 'Hecho con amor',
    desc: 'Cada pieza es fabricada artesanalmente, una por una, con la dedicación de quien sabe que va a acompañar los primeros meses de un bebé.',
  },
  {
    icon: Shield,
    title: 'Materiales seguros',
    desc: 'Usamos exclusivamente silicona grado alimentario, madera de haya natural certificada y hilo de nylon resistente. Sin BPA, sin tóxicos.',
  },
  {
    icon: Star,
    title: '100% personalizado',
    desc: 'No hay dos portachupetes iguales. Cada uno lleva el nombre del bebé y los colores elegidos por la familia.',
  },
  {
    icon: Truck,
    title: 'A todo el país',
    desc: 'Enviamos por Andreani a domicilio o a sucursal en todo Argentina. También hacemos retiro en persona en Trenque Lauquen.',
  },
]

export default function NosotrosPage() {
  return (
    <div className="min-h-screen bg-[#FFFAF7]">

      {/* Breadcrumb */}
      <div className="max-w-6xl mx-auto px-5 pt-6 pb-0">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-[#A58494]">
          <Link href="/" className="hover:text-[#C4687D] transition-colors">Inicio</Link>
          <span>/</span>
          <span className="text-[#6D4D5A] font-medium">Nosotros</span>
        </nav>
      </div>

      {/* Historia — reutilizamos el componente del home */}
      <SobreNosotras />

      {/* Valores */}
      <section className="bg-[#FFFAF7] py-20">
        <div className="max-w-6xl mx-auto px-5">
          <div className="text-center mb-12">
            <p className="label-caps mb-3">Por qué elegir Mimikids</p>
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-[#2B1A20]">
              Nuestros valores
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {VALUES.map((v) => (
              <div key={v.title} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#FAE8EC] mb-4">
                  <v.icon size={22} className="text-[#C4687D]" strokeWidth={1.75} />
                </div>
                <h3 className="font-playfair font-bold text-[#2B1A20] mb-2">{v.title}</h3>
                <p className="text-sm text-[#6D4D5A] leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nuestra historia — texto largo para SEO */}
      <section className="bg-[#F6EEE9]/50 py-16">
        <div className="max-w-3xl mx-auto px-5">
          <h2 className="font-playfair text-2xl md:text-3xl font-bold text-[#2B1A20] mb-6">
            Nuestra historia
          </h2>
          <div className="space-y-4 text-[#6D4D5A] text-[15px] leading-relaxed">
            <p>
              Mimikids nació en 2022 en Trenque Lauquen, Buenos Aires, cuando Cami — mamá de Caetana y Conrado — quiso crear algo especial para su bebé: un portachupete personalizado que fuera bonito, seguro y con el nombre del bebé. Lo que comenzó como un proyecto personal se convirtió en un emprendimiento que hoy llega a familias en todo el país.
            </p>
            <p>
              Cada portachupete se fabrica de manera artesanal, uno a uno, con cuentas de silicona grado alimentario, letras de silicona o madera de haya natural, y un broche de madera. No hay robots ni producción en serie: cada pieza pasa por las manos de Cami antes de llegar a tu familia.
            </p>
            <p>
              El proceso es simple: elegís el modelo, nos decís el nombre del bebé y los colores que más te gustan, y en 1 a 2 días hábiles tu portachupete personalizado está listo para despachar. Lo enviamos por Andreani a cualquier punto del país, o lo retirás en persona si estás en Trenque Lauquen.
            </p>
            <p>
              Gracias por confiar en Mimikids para acompañar a tu bebé en sus primeros meses. Cada portachupete que hacemos lleva consigo el amor y la dedicación de quien sabe que está creando algo especial para una familia.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#FFFAF7] py-16 text-center">
        <div className="max-w-lg mx-auto px-5">
          <h2 className="font-playfair text-2xl font-bold text-[#2B1A20] mb-3">
            ¿Querés un portachupete personalizado?
          </h2>
          <p className="text-[#6D4D5A] text-sm mb-8">
            Explorá nuestra tienda y personalizá el tuyo con el nombre de tu bebé. Envíos a todo Argentina.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-[#C4687D] text-white text-sm font-semibold px-6 py-3 rounded-full hover:bg-[#A8546A] transition-colors"
            >
              Ver portachupetes
            </Link>
            <Link
              href="/modelos"
              className="inline-flex items-center gap-2 border border-[#EDCCD5] text-[#6D4D5A] text-sm font-semibold px-6 py-3 rounded-full hover:border-[#C4687D] hover:text-[#C4687D] transition-colors"
            >
              Ver modelos
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
