import { createServerClient } from '@/lib/supabase-server'
import ProductCard from '@/components/shop/ProductCard'
import Link from 'next/link'
import type { Metadata } from 'next'
import type { Product } from '@/types'

export const revalidate = 3600

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://mimikids.com.ar'

export const metadata: Metadata = {
  title: { absolute: 'Llaveros Personalizados con Nombre | Artesanales | Mimikids' },
  description: 'Llaveros personalizados artesanales con el nombre o palabra que quieras. Cuentas de silicona, letras de silicona o madera. Regalo único para cualquier ocasión. Envíos a todo Argentina.',
  keywords: [
    'llavero personalizado',
    'llavero con nombre',
    'llavero artesanal argentina',
    'llavero silicona personalizado',
    'llavero regalo personalizado',
    'llavero bebe argentina',
    'comprar llavero personalizado',
  ],
  alternates: { canonical: `${SITE_URL}/llaveros` },
  openGraph: {
    title: 'Llaveros Personalizados con Nombre | Mimikids',
    description: 'Llaveros artesanales personalizados con el nombre que quieras. Envíos a todo Argentina.',
    url: `${SITE_URL}/llaveros`,
    images: [{ url: `${SITE_URL}/mimikids.jpg`, width: 1080, height: 1080, alt: 'Llaveros personalizados Mimikids' }],
  },
}

export default async function LlaverosPage() {
  const supabase = createServerClient()
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .eq('category', 'llavero')
    .eq('is_active', true)
    .order('created_at', { ascending: false })

  const productList = (products ?? []) as Product[]

  return (
    <div className="min-h-screen bg-[#FFFAF7]">

      {/* Hero */}
      <div className="bg-gradient-to-b from-[#F6EEE9] to-[#FFFAF7] border-b border-[#EDCCD5]/40 pt-14 pb-10 text-center">
        <div className="max-w-6xl mx-auto px-5">
          <nav aria-label="Breadcrumb" className="flex items-center justify-center gap-1.5 text-xs text-[#A58494] mb-6">
            <Link href="/" className="hover:text-[#C4687D] transition-colors">Inicio</Link>
            <span>/</span>
            <span className="text-[#6D4D5A] font-medium">Llaveros</span>
          </nav>
          <p className="label-caps mb-3">El regalo que siempre acompañará</p>
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-[#2B1A20] leading-tight mb-4">
            Llaveros Personalizados
          </h1>
          <p className="text-[#6D4D5A] max-w-xl mx-auto text-sm leading-relaxed mb-6">
            Cada llavero se fabrica artesanalmente con cuentas de silicona y letras con el nombre o palabra que elijas. El modelo y colores se coordinan por WhatsApp.
          </p>
          <span className="inline-block bg-white border border-[#EDCCD5] text-[#6D4D5A] text-xs font-semibold px-4 py-1.5 rounded-full">
            🚚 Andreani a todo el país
          </span>
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
          <div className="text-center py-16">
            <div className="text-4xl mb-4">🔑</div>
            <p className="text-[#A58494] font-medium">Pronto habrá llaveros en esta categoría.</p>
            <Link href="/shop" className="mt-4 inline-block text-sm text-[#C4687D] font-semibold hover:underline">
              Ver todos los productos
            </Link>
          </div>
        )}

        {productList.length > 0 && (
          <div className="mt-10 text-center">
            <Link href="/shop" className="text-sm text-[#C4687D] font-semibold hover:underline">
              Ver todos los productos →
            </Link>
          </div>
        )}
      </div>

      {/* SEO content */}
      <section className="bg-[#F6EEE9]/40 border-t border-[#EDCCD5]/30 py-16">
        <div className="max-w-3xl mx-auto px-5">
          <h2 className="font-playfair text-2xl font-bold text-[#2B1A20] mb-5">
            Llaveros personalizados artesanales
          </h2>
          <div className="space-y-4 text-[#6D4D5A] text-sm leading-relaxed">
            <p>
              Nuestros <strong>llaveros personalizados</strong> se fabrican artesanalmente con cuentas de silicona y letras con el nombre o palabra que elijas. Son el regalo perfecto para cumpleaños, baby shower, o para tener un recuerdo único.
            </p>
            <p>
              El modelo y los colores de cada llavero se coordinan directamente por WhatsApp para que el resultado sea exactamente lo que imaginaste. Una vez confirmado el diseño, el llavero está listo en 1 a 2 días hábiles.
            </p>
          </div>

          <div className="mt-8">
            <a
              href="https://wa.me/543388673629?text=Hola!%20Quiero%20un%20llavero%20personalizado"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] text-white text-sm font-semibold px-6 py-3 rounded-full hover:bg-[#1DAF54] transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Consultar por WhatsApp
            </a>
          </div>
        </div>
      </section>

    </div>
  )
}
