import { createServerClient } from '@/lib/supabase-server'
import ProductCard from '@/components/shop/ProductCard'
import Link from 'next/link'
import type { Metadata } from 'next'
import type { Product } from '@/types'

export const revalidate = 3600

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://mimikids.com.ar'

export const metadata: Metadata = {
  title: { absolute: 'Portachupetes Personalizados con Nombre | 20% OFF | Mimikids' },
  description: 'Portachupetes artesanales 100% personalizados con el nombre de tu bebé. Silicona grado alimentario, letras en silicona o madera de haya. 20% OFF · Envíos a todo Argentina desde Trenque Lauquen.',
  keywords: [
    'portachupete personalizado',
    'portachupete con nombre',
    'portachupete artesanal argentina',
    'portachupete silicona grado alimentario',
    'portachupete letras madera',
    'portachupete bebé argentina',
    'comprar portachupete personalizado',
    'portachupete regalo baby shower',
  ],
  alternates: { canonical: `${SITE_URL}/portachupetes` },
  openGraph: {
    title: 'Portachupetes Personalizados con Nombre | 20% OFF | Mimikids',
    description: 'Portachupetes artesanales personalizados con el nombre de tu bebé. 20% OFF. Envíos a todo Argentina.',
    url: `${SITE_URL}/portachupetes`,
    images: [{ url: `${SITE_URL}/mimikids.jpg`, width: 1080, height: 1080, alt: 'Portachupetes personalizados Mimikids' }],
  },
}

export default async function PortachupetesPage() {
  const supabase = createServerClient()
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .eq('category', 'portachupete')
    .eq('is_active', true)
    .order('created_at', { ascending: false })

  const productList = (products ?? []) as Product[]

  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Portachupetes personalizados Mimikids',
    url: `${SITE_URL}/portachupetes`,
    numberOfItems: productList.length,
    itemListElement: productList.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${SITE_URL}/shop/${p.slug}`,
      name: p.name,
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />
      <div className="min-h-screen bg-[#FFFAF7]">

        {/* Hero */}
        <div className="bg-gradient-to-b from-[#F6EEE9] to-[#FFFAF7] border-b border-[#EDCCD5]/40 pt-14 pb-10 text-center">
          <div className="max-w-6xl mx-auto px-5">
            <nav aria-label="Breadcrumb" className="flex items-center justify-center gap-1.5 text-xs text-[#A58494] mb-6">
              <Link href="/" className="hover:text-[#C4687D] transition-colors">Inicio</Link>
              <span>/</span>
              <span className="text-[#6D4D5A] font-medium">Portachupetes</span>
            </nav>
            <p className="label-caps mb-3">Personalizados con el nombre de tu bebé</p>
            <h1 className="font-playfair text-4xl md:text-5xl font-bold text-[#2B1A20] leading-tight mb-4">
              Portachupetes Personalizados
            </h1>
            <p className="text-[#6D4D5A] max-w-xl mx-auto text-sm leading-relaxed mb-6">
              Cada portachupete se fabrica artesanalmente con cuentas de silicona grado alimentario
              y letras con el nombre de tu bebé. Producción en 1–2 días hábiles.
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              <span className="inline-block bg-[#C4687D] text-white text-xs font-bold px-4 py-1.5 rounded-full">
                🏷️ 20% OFF en todos los portachupetes
              </span>
              <span className="inline-block bg-white border border-[#EDCCD5] text-[#6D4D5A] text-xs font-semibold px-4 py-1.5 rounded-full">
                🚚 Andreani a todo el país
              </span>
            </div>
          </div>
        </div>

        {/* Products grid */}
        <div className="max-w-6xl mx-auto px-5 py-12">
          {productList.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-7">
              {productList.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <p className="text-center text-[#A58494] py-16">Cargando portachupetes...</p>
          )}

          <div className="mt-10 text-center">
            <Link href="/shop" className="text-sm text-[#C4687D] font-semibold hover:underline">
              Ver todos los productos →
            </Link>
          </div>
        </div>

        {/* SEO content */}
        <section className="bg-[#F6EEE9]/40 border-t border-[#EDCCD5]/30 py-16">
          <div className="max-w-3xl mx-auto px-5">
            <h2 className="font-playfair text-2xl font-bold text-[#2B1A20] mb-5">
              ¿Qué es un portachupete personalizado?
            </h2>
            <div className="space-y-4 text-[#6D4D5A] text-sm leading-relaxed">
              <p>
                Un <strong>portachupete personalizado</strong> es un accesorio artesanal para bebés que lleva el nombre del bebé en letras de silicona o madera. Se compone de cuentas de silicona grado alimentario ensartadas a mano, unidas con hilo de nylon resistente, y finaliza con un clip o broche para sujetar el chupete al babero o ropa del bebé.
              </p>
              <p>
                En Mimikids fabricamos cada portachupete de forma artesanal desde Trenque Lauquen, Buenos Aires. Podés elegir el estilo de letras — <strong>silicona blanca, beige, rosa o celeste</strong>, o <strong>madera de haya natural</strong> —, el tipo de broche, y el nombre que quieras (hasta 10 letras aproximadamente).
              </p>
              <p>
                Son el regalo perfecto para un <strong>baby shower</strong>, para el cumpleaños del bebé, o simplemente para tener un accesorio único y seguro en el día a día. Todos nuestros portachupetes se fabrican con <strong>materiales 100% seguros y sin BPA</strong>.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              {[
                { num: '100%', label: 'artesanal' },
                { num: '1–2', label: 'días hábiles' },
                { num: 'Sin BPA', label: 'silicona segura' },
                { num: 'Todo AR', label: 'enviamos por Andreani' },
              ].map((s) => (
                <div key={s.label} className="bg-white rounded-2xl p-4 border border-[#EDCCD5]/60">
                  <p className="font-playfair text-lg font-bold text-[#C4687D]">{s.num}</p>
                  <p className="text-xs text-[#A58494] mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>
    </>
  )
}
