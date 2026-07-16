import { notFound } from 'next/navigation'
import { createServerClient } from '@/lib/supabase-server'
import PersonalizationForm from '@/components/product/PersonalizationForm'
import SimpleAddToCart from '@/components/product/SimpleAddToCart'
import ProductGallery from '@/components/product/ProductGallery'
import { formatPrice } from '@/lib/utils'
import { Clock, Shield, Truck } from 'lucide-react'
import type { Product, Model } from '@/types'

export const dynamic = 'force-dynamic'

interface Props {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ modelo?: string; modeloFoto?: string; modeloNombre?: string }>
}

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://mimikids.com.ar'

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const supabase = createServerClient()
  const { data } = await supabase.from('products').select('name, description, price, images').eq('slug', slug).single()
  if (!data) return {}
  return {
    title: `${data.name} · Mimikids`,
    description: data.description,
    openGraph: {
      title: `${data.name} · Mimikids`,
      description: data.description,
      images: data.images?.[0] ? [{ url: data.images[0] }] : [],
    },
  }
}

export default async function ProductPage({ params, searchParams }: Props) {
  const { slug } = await params
  const sp = await searchParams

  const supabase = createServerClient()
  const { data: product } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .single()

  if (!product) notFound()

  const p = product as Product

  // JSON-LD Product schema for Google Shopping / SEO
  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: p.name,
    description: p.description,
    image: p.images ?? [],
    brand: { '@type': 'Brand', name: 'Mimikids' },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'ARS',
      price: p.price,
      availability: 'https://schema.org/InStock',
      seller: { '@type': 'Organization', name: 'Mimikids' },
      url: `${SITE_URL}/shop/${slug}`,
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingRate: { '@type': 'MonetaryAmount', currency: 'ARS' },
        deliveryTime: {
          '@type': 'ShippingDeliveryTime',
          businessDays: {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          },
          cutoffTime: '18:00:00-03:00',
          handlingTime: { '@type': 'QuantitativeValue', minValue: 1, maxValue: 2, unitCode: 'DAY' },
          transitTime: { '@type': 'QuantitativeValue', minValue: 2, maxValue: 7, unitCode: 'DAY' },
        },
        shippingDestination: { '@type': 'DefinedRegion', addressCountry: 'AR' },
      },
    },
  }

  // Modelo pre-seleccionado si el cliente viene desde /modelos
  const preselectedModel: Model | null =
    sp.modeloFoto
      ? { id: sp.modelo ?? '', name: decodeURIComponent(sp.modeloNombre ?? ''), photo: decodeURIComponent(sp.modeloFoto) }
      : null

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
    <div className="min-h-screen bg-[#FFFAF7]">
      <div className="max-w-6xl mx-auto px-5 py-10 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">

          {/* Galería de imágenes */}
          <ProductGallery images={p.images} name={p.name} badge={p.badge} />

          {/* Info + formulario */}
          <div className="space-y-6">
            <div>
              <h1 className="font-playfair text-[2rem] md:text-[2.5rem] font-bold text-[#2B1A20] leading-[1.15] mb-3">
                {p.name}
              </h1>
              <p className="font-playfair text-2xl font-bold text-[#C4687D] mb-4">
                {formatPrice(p.price)}
              </p>
              <p className="text-[#6D4D5A] leading-relaxed text-sm">{p.description}</p>
            </div>

            {/* Trust pills */}
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center gap-1.5 bg-white rounded-full px-3 py-1.5 text-xs text-[#6D4D5A] border border-[#EDCCD5]/60">
                <Clock size={12} className="text-[#C4687D]" strokeWidth={1.75} />
                {p.production_days_min}–{p.production_days_max} días hábiles
              </div>
              <div className="flex items-center gap-1.5 bg-white rounded-full px-3 py-1.5 text-xs text-[#6D4D5A] border border-[#EDCCD5]/60">
                <Truck size={12} className="text-[#C4687D]" strokeWidth={1.75} />
                Envío a todo el país
              </div>
              <div className="flex items-center gap-1.5 bg-white rounded-full px-3 py-1.5 text-xs text-[#6D4D5A] border border-[#EDCCD5]/60">
                <Shield size={12} className="text-[#C4687D]" strokeWidth={1.75} />
                Materiales seguros
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-[#EDCCD5]/40 shadow-[0_2px_16px_rgba(43,26,32,0.05)]">
              {p.category === 'funda' ? (
                <>
                  <h2 className="font-playfair text-lg font-bold text-[#2B1A20] mb-5">
                    Agregar al carrito
                  </h2>
                  <SimpleAddToCart product={p} />
                </>
              ) : (
                <>
                  <h2 className="font-playfair text-lg font-bold text-[#2B1A20] mb-5">
                    Personalizar tu pedido
                  </h2>
                  <PersonalizationForm
                    product={p}
                    preselectedModel={preselectedModel}
                  />
                </>
              )}
            </div>

            {p.materials && (
              <div className="bg-[#FFFAF7] rounded-xl p-5 border border-[#EDCCD5]/30">
                <h3 className="font-semibold text-[#2B1A20] mb-1.5 text-sm">Materiales</h3>
                <p className="text-sm text-[#A58494]">{p.materials}</p>
              </div>
            )}
            {p.care_instructions && (
              <div className="bg-[#FFFAF7] rounded-xl p-5 border border-[#EDCCD5]/30">
                <h3 className="font-semibold text-[#2B1A20] mb-1.5 text-sm">Cuidados</h3>
                <p className="text-sm text-[#A58494]">{p.care_instructions}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
