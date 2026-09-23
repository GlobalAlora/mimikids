import { createServerClient } from '@/lib/supabase-server'
import ProductCard from '@/components/shop/ProductCard'
import Link from 'next/link'
import type { Metadata } from 'next'
import type { Product } from '@/types'

export const revalidate = 3600

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://mimikids.com.ar'

export const metadata: Metadata = {
  title: { absolute: 'Fundas Guardachupete Artesanales | Protegé el chupete de tu bebé | Mimikids' },
  description: 'Fundas guardachupete artesanales en tela para proteger y guardar el chupete. Van a juego con todos los portachupetes Mimikids. Comprá en combo y ahorrá un 25% OFF. Envíos a todo Argentina.',
  keywords: [
    'funda guardachupete',
    'guardachupete artesanal',
    'estuche chupete bebé',
    'funda portachupete',
    'guardachupete tela',
    'funda chupete argentina',
    'comprar funda guardachupete',
  ],
  alternates: { canonical: `${SITE_URL}/guardachupetes` },
  openGraph: {
    title: 'Fundas Guardachupete Artesanales | 25% OFF en combo | Mimikids',
    description: 'Fundas guardachupete en tela, artesanales. 25% OFF en combo con portachupete. Envíos a todo Argentina.',
    url: `${SITE_URL}/guardachupetes`,
    images: [{ url: `${SITE_URL}/mimikids.jpg`, width: 1080, height: 1080, alt: 'Fundas guardachupete Mimikids' }],
  },
}

export default async function GuardachupetesPage() {
  const supabase = createServerClient()
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .eq('category', 'funda')
    .eq('is_active', true)
    .order('created_at', { ascending: false })

  const productList = (products ?? []) as Product[]

  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Fundas guardachupete Mimikids',
    url: `${SITE_URL}/guardachupetes`,
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
              <span className="text-[#6D4D5A] font-medium">Fundas Guardachupete</span>
            </nav>
            <p className="label-caps mb-3">Para proteger el chupete de tu bebé</p>
            <h1 className="font-playfair text-4xl md:text-5xl font-bold text-[#2B1A20] leading-tight mb-4">
              Fundas Guardachupete
            </h1>
            <p className="text-[#6D4D5A] max-w-xl mx-auto text-sm leading-relaxed mb-6">
              Estuches artesanales en tela para proteger el chupete cuando no está en uso. Van a juego con todos los portachupetes Mimikids y son perfectas para el bolso.
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              <span className="inline-block bg-[#F5CC7A] text-[#7A5200] text-xs font-bold px-4 py-1.5 rounded-full">
                🎉 25% OFF en combo con portachupete
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
            <p className="text-center text-[#A58494] py-16">Cargando fundas guardachupete...</p>
          )}

          <div className="mt-10 text-center">
            <Link href="/shop" className="text-sm text-[#C4687D] font-semibold hover:underline">
              Ver todos los productos →
            </Link>
          </div>
        </div>

        {/* Combo CTA */}
        <section className="max-w-6xl mx-auto px-5 pb-12">
          <div className="rounded-2xl bg-gradient-to-r from-[#FFF8EC] to-[#FFF0E8] border-2 border-[#F5CC7A]/60 p-6 md:p-8 text-center">
            <p className="text-2xl mb-3">🎁</p>
            <h2 className="font-playfair text-xl font-bold text-[#2B1A20] mb-2">
              Comprá en combo y ahorrá 25% OFF
            </h2>
            <p className="text-sm text-[#6D4D5A] mb-6 max-w-md mx-auto">
              Cuando comprás una funda guardachupete junto con un portachupete personalizado, el descuento del 25% se aplica automáticamente en el carrito.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-[#C4687D] text-white text-sm font-semibold px-6 py-3 rounded-full hover:bg-[#A8546A] transition-colors"
            >
              Ver combos disponibles →
            </Link>
          </div>
        </section>

        {/* SEO content */}
        <section className="bg-[#F6EEE9]/40 border-t border-[#EDCCD5]/30 py-16">
          <div className="max-w-3xl mx-auto px-5">
            <h2 className="font-playfair text-2xl font-bold text-[#2B1A20] mb-5">
              ¿Qué es una funda guardachupete?
            </h2>
            <div className="space-y-4 text-[#6D4D5A] text-sm leading-relaxed">
              <p>
                La <strong>funda guardachupete</strong> es un estuche artesanal en tela diseñado para guardar el chupete de tu bebé de forma segura e higiénica cuando no está en uso. Es perfecta para llevarlo en el bolso de la mamá, en la pañalera, o para tener siempre un chupete limpio a mano.
              </p>
              <p>
                En Mimikids fabricamos las fundas guardachupetes a mano, combinando telas de distintos diseños y estilos para que vayan a juego con el portachupete personalizado de tu bebé. Comprándola en combo con el portachupete obtenés un <strong>25% de descuento</strong> en todo el pedido.
              </p>
            </div>
          </div>
        </section>

      </div>
    </>
  )
}
