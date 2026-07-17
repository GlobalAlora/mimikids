import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight, Shield, Clock, Truck, Heart } from 'lucide-react'

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://mimikids.com.ar'

export const metadata: Metadata = {
  title: 'Guía de Portachupetes Personalizados · Materiales, Cuidados y Más · Mimikids',
  description: 'Todo lo que necesitás saber sobre portachupetes personalizados: materiales seguros para bebés, cómo elegir el diseño, cómo cuidarlos y cómo hacer tu pedido. Guía completa de Mimikids.',
  keywords: [
    'guía portachupete personalizado',
    'portachupete seguro bebé',
    'materiales portachupete silicona',
    'cómo elegir portachupete',
    'portachupete madera haya',
    'cuidado portachupete',
    'qué es portachupete personalizado',
  ],
  alternates: { canonical: `${SITE_URL}/guia` },
  openGraph: {
    title: 'Guía completa de portachupetes personalizados · Mimikids',
    description: 'Materiales, seguridad, diseños y cómo hacer tu pedido. Todo lo que necesitás saber.',
    url: `${SITE_URL}/guia`,
    images: [{ url: `${SITE_URL}/mimikids.jpg`, width: 1080, height: 1080, alt: 'Guía Mimikids' }],
  },
}

const guiaJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Guía completa de portachupetes personalizados para bebés',
  description: 'Todo lo que necesitás saber sobre portachupetes personalizados: materiales seguros, diseños, cuidados y cómo hacer tu pedido.',
  author: { '@type': 'Organization', name: 'Mimikids', url: SITE_URL },
  publisher: { '@type': 'Organization', name: 'Mimikids', url: SITE_URL, logo: { '@type': 'ImageObject', url: `${SITE_URL}/mimikids.jpg` } },
  url: `${SITE_URL}/guia`,
  mainEntityOfPage: `${SITE_URL}/guia`,
  image: `${SITE_URL}/mimikids.jpg`,
  dateModified: new Date().toISOString(),
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Inicio', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Guía', item: `${SITE_URL}/guia` },
  ],
}

const faqs = [
  {
    q: '¿Qué es un portachupete personalizado?',
    a: 'Un portachupete personalizado es un accesorio artesanal para bebés que lleva el nombre del bebé en letras de silicona o madera. Está compuesto por cuentas de silicona grado alimentario ensartadas a mano con hilo de nylon resistente, y finaliza con un clip o broche para sujetar el chupete del bebé. Cada uno se fabrica a medida según el nombre y los colores elegidos por los padres.',
  },
  {
    q: '¿Los materiales son seguros para bebés?',
    a: 'Sí, todos los materiales que usamos son seguros para bebés. Las cuentas son de silicona grado alimentario, sin BPA, sin ftalatos y sin metales pesados. Las letras son de silicona food-grade o de madera de haya natural certificada. Los clips y broches son de madera de haya, un material duro y resistente ampliamente utilizado en juguetes para bebés. El hilo de nylon es resistente y está especialmente diseñado para accesorios de bebé.',
  },
  {
    q: '¿Cuánto dura un portachupete de silicona?',
    a: 'Con el cuidado adecuado, un portachupete de silicona puede durar años. La silicona es un material muy resistente, que no se decolora fácilmente y mantiene su forma. Recomendamos evitar el contacto prolongado con el sol directo y no sumergir en agua caliente ni hervir.',
  },
  {
    q: '¿Cuál es la diferencia entre letras de silicona y letras de madera?',
    a: 'Las letras de silicona están disponibles en varios colores: blanco, beige, rosa y celeste. Son suaves al tacto, flexibles y muy resistentes. Las letras de madera son de haya natural, tienen un aspecto más rústico y natural, y son perfectas para quienes buscan un estilo más orgánico o neutro. Ambas son igualmente seguras para bebés.',
  },
  {
    q: '¿Qué colores de cuentas están disponibles?',
    a: 'Contamos con una amplia variedad de colores de cuentas de silicona: blancos, beige, rosas, celestes, lila, verde menta, mostaza, gris y más. Podés elegir el modelo que más te guste en nuestra galería de modelos y combinarlo con el estilo de letras que prefieras.',
  },
  {
    q: '¿Puedo pedir un portachupete para varón?',
    a: 'Sí. Tenemos modelos en colores neutros y en tonos típicamente asociados al varón como el celeste, azul y gris. También tenemos modelos que combinan colores neutros como blanco, beige y crema, perfectos para cualquier género.',
  },
  {
    q: '¿Cuánto tarda en llegar mi pedido?',
    a: 'El proceso tiene dos etapas: producción (1 a 2 días hábiles desde la confirmación del pago) y envío por Andreani (2 a 7 días hábiles según la localidad). En total, podés recibir tu pedido en 3 a 9 días hábiles. Para Trenque Lauquen y alrededores también ofrecemos retiro en persona.',
  },
  {
    q: '¿Cómo cuido el portachupete?',
    a: 'Para limpiar el portachupete, usá un paño húmedo. No lo sumerjas en agua, no lo hieras y evitá el contacto prolongado con el sol directo para preservar los colores. Guardalo en la funda guardachupete cuando no esté en uso para protegerlo de la suciedad.',
  },
  {
    q: '¿Es un buen regalo para baby shower?',
    a: 'Sí, es uno de los regalos más especiales para baby shower. Al ser personalizado con el nombre del bebé, es único e irrepetible. Lo preparamos con packaging de regalo incluido. Si todavía no sabés el nombre del bebé, podés regalar la funda guardachupete y agregar el portachupete más adelante.',
  },
  {
    q: '¿Puedo pedir una funda guardachupete sin portachupete?',
    a: 'Sí, la funda guardachupete se vende por separado. Es un estuche artesanal en tela para guardar el chupete cuando no está en uso, ideal para el bolso de la mamá. Si la comprás en combo con un portachupete, obtenés un 25% de descuento en todo el pedido.',
  },
]

export default function GuiaPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(guiaJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <div className="min-h-screen bg-[#FFFAF7]">
        {/* Breadcrumb */}
        <div className="max-w-3xl mx-auto px-5 pt-6">
          <nav className="flex items-center gap-1.5 text-xs text-[#A58494]" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-[#C4687D] transition-colors">Inicio</Link>
            <ChevronRight size={12} />
            <span className="text-[#2B1A20]">Guía de portachupetes</span>
          </nav>
        </div>

        <div className="max-w-3xl mx-auto px-5 py-10 md:py-14">

          {/* Hero de la página */}
          <header className="mb-12">
            <p className="text-xs font-semibold text-[#C4687D] uppercase tracking-widest mb-3">Guía completa</p>
            <h1 className="font-playfair text-[2rem] md:text-[2.75rem] font-bold text-[#2B1A20] leading-[1.15] mb-4">
              Todo sobre los portachupetes personalizados
            </h1>
            <p className="text-[#6D4D5A] leading-relaxed text-base max-w-2xl">
              Materiales, seguridad, cómo elegir el diseño y cómo hacer tu pedido. Una guía completa para padres que quieren lo mejor para su bebé.
            </p>
          </header>

          {/* Pills de beneficios */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12">
            {[
              { icon: Shield, label: 'Sin BPA', sub: 'Silicona grado alimentario' },
              { icon: Clock, label: '1–2 días', sub: 'Tiempo de producción' },
              { icon: Truck, label: 'Todo el país', sub: 'Envíos por Andreani' },
              { icon: Heart, label: '100% artesanal', sub: 'Hecho a mano' },
            ].map(({ icon: Icon, label, sub }) => (
              <div key={label} className="bg-white rounded-2xl p-4 border border-[#EDCCD5]/40 text-center">
                <Icon size={20} className="text-[#C4687D] mx-auto mb-2" strokeWidth={1.75} />
                <p className="font-semibold text-[#2B1A20] text-sm">{label}</p>
                <p className="text-xs text-[#A58494]">{sub}</p>
              </div>
            ))}
          </div>

          {/* Sección materiales */}
          <section className="mb-12" aria-labelledby="materiales-heading">
            <h2 id="materiales-heading" className="font-playfair text-2xl font-bold text-[#2B1A20] mb-4">
              Materiales seguros para bebés
            </h2>
            <p className="text-[#6D4D5A] leading-relaxed mb-6">
              En Mimikids usamos exclusivamente materiales certificados y seguros para bebés. Cada componente fue elegido pensando en la seguridad y el confort de tu hijo.
            </p>
            <div className="space-y-4">
              {[
                {
                  title: 'Cuentas de silicona grado alimentario',
                  desc: 'Libres de BPA, ftalatos y metales pesados. La silicona grado alimentario es el mismo material usado en los chupetes y mordillos. Es suave, flexible, duradera y fácil de limpiar.',
                },
                {
                  title: 'Letras de silicona',
                  desc: 'Las letras de silicona están disponibles en blanco, beige, rosa y celeste. Son del mismo material que las cuentas, completamente seguras y con acabado suave al tacto.',
                },
                {
                  title: 'Letras de madera de haya natural',
                  desc: 'La madera de haya es una madera dura, densa y resistente, muy utilizada en juguetes para bebés por su durabilidad y seguridad. Está lijada y tratada para tener un acabado suave, sin astillas.',
                },
                {
                  title: 'Clip de madera de haya',
                  desc: 'El broche que sujeta el chupete es de madera de haya. Es resistente, liviano y no tiene piezas metálicas que puedan irritar la piel del bebé.',
                },
                {
                  title: 'Hilo de nylon resistente',
                  desc: 'Las cuentas están ensartadas con hilo de nylon especialmente diseñado para accesorios de bebé. Es resistente a la tracción y a la humedad.',
                },
              ].map(({ title, desc }) => (
                <div key={title} className="bg-white rounded-2xl p-5 border border-[#EDCCD5]/30">
                  <h3 className="font-semibold text-[#2B1A20] mb-1.5 text-sm">{title}</h3>
                  <p className="text-sm text-[#6D4D5A] leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Cómo elegir */}
          <section className="mb-12" aria-labelledby="como-elegir-heading">
            <h2 id="como-elegir-heading" className="font-playfair text-2xl font-bold text-[#2B1A20] mb-4">
              Cómo elegir el diseño ideal
            </h2>
            <p className="text-[#6D4D5A] leading-relaxed mb-6">
              Hay tres cosas a decidir: el modelo (combinación de colores de las cuentas), el estilo de letras y el nombre. Así lo pensamos nosotros:
            </p>
            <div className="space-y-3">
              {[
                { paso: '1', title: 'Explorá los modelos', desc: 'Visitá nuestra galería de modelos para ver las distintas combinaciones de colores disponibles. Podés filtrar por color predominante.' },
                { paso: '2', title: 'Elegí el estilo de letras', desc: 'Letras de madera para un look natural y rústico. Letras de silicona para un estilo más colorido y moderno. Ambas son igual de seguras.' },
                { paso: '3', title: 'Pensá en los colores del cuarto', desc: 'Muchas mamás eligen colores que combinen con la decoración del cuarto del bebé. Neutros como blanco y beige funcionan en cualquier entorno.' },
                { paso: '4', title: 'Considerá el género (o no)', desc: 'Los tonos celestes y azules son clásicos para varón, los rosas para nena, y los neutros para cualquier género. Pero podés elegir cualquier combinación que te guste.' },
              ].map(({ paso, title, desc }) => (
                <div key={paso} className="flex gap-4 bg-white rounded-2xl p-5 border border-[#EDCCD5]/30">
                  <span className="font-playfair font-bold text-2xl text-[#C4687D]/40 flex-shrink-0 leading-none mt-0.5">{paso}</span>
                  <div>
                    <h3 className="font-semibold text-[#2B1A20] mb-1 text-sm">{title}</h3>
                    <p className="text-sm text-[#6D4D5A] leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Cuidados */}
          <section className="mb-12" aria-labelledby="cuidados-heading">
            <h2 id="cuidados-heading" className="font-playfair text-2xl font-bold text-[#2B1A20] mb-4">
              Cómo cuidar tu portachupete
            </h2>
            <div className="bg-white rounded-2xl p-6 border border-[#EDCCD5]/30">
              <ul className="space-y-3">
                {[
                  'Limpiar con un paño húmedo, sin productos químicos agresivos.',
                  'No sumergir en agua ni poner en lavavajillas.',
                  'No hervir ni esterilizar con vapor directo.',
                  'Evitar el contacto prolongado con el sol directo para preservar los colores.',
                  'Guardar en la funda guardachupete cuando no esté en uso.',
                  'Revisar periódicamente el estado del hilo y reemplazar si hay desgaste.',
                ].map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-[#6D4D5A]">
                    <span className="text-[#C4687D] flex-shrink-0">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-12" aria-labelledby="faq-heading">
            <h2 id="faq-heading" className="font-playfair text-2xl font-bold text-[#2B1A20] mb-6">
              Preguntas frecuentes
            </h2>
            <div className="space-y-4">
              {faqs.map(({ q, a }) => (
                <div key={q} className="bg-white rounded-2xl p-5 border border-[#EDCCD5]/30">
                  <h3 className="font-semibold text-[#2B1A20] mb-2 text-sm">{q}</h3>
                  <p className="text-sm text-[#6D4D5A] leading-relaxed">{a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <div className="bg-gradient-to-br from-[#FAE8EC] to-[#FFF0F5] rounded-3xl p-8 text-center border border-[#EDCCD5]/50">
            <h2 className="font-playfair text-2xl font-bold text-[#2B1A20] mb-3">
              ¿Lista para hacer tu pedido?
            </h2>
            <p className="text-[#6D4D5A] text-sm mb-6 leading-relaxed">
              Hacemos cada portachupete a mano, con el nombre de tu bebé. Entregamos en todo Argentina.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/shop"
                className="inline-flex items-center justify-center gap-2 bg-[#C4687D] hover:bg-[#A8546A] text-white font-semibold text-sm px-8 py-3.5 rounded-full transition-colors"
              >
                Ver portachupetes
              </Link>
              <Link
                href="/modelos"
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-[#FFF0F3] text-[#C4687D] font-semibold text-sm px-8 py-3.5 rounded-full border border-[#C4687D]/40 transition-colors"
              >
                Explorar modelos
              </Link>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}
