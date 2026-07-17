import { notFound } from 'next/navigation'
import { createServerClient } from '@/lib/supabase-server'
import PersonalizationForm from '@/components/product/PersonalizationForm'
import SimpleAddToCart from '@/components/product/SimpleAddToCart'
import ProductGallery from '@/components/product/ProductGallery'
import { formatPrice } from '@/lib/utils'
import { Clock, Shield, Truck, Gift } from 'lucide-react'
import Link from 'next/link'
import type { Product, Model } from '@/types'
import { PORTACHUPETE_DISCOUNT_PCT } from '@/lib/discounts'

export const dynamic = 'force-dynamic'

interface Props {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ modelo?: string; modeloFoto?: string; modeloNombre?: string }>
}

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://mimikids.com.ar'

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const supabase = createServerClient()
  const { data } = await supabase.from('products').select('name, description, price, images, category').eq('slug', slug).single()
  if (!data) return {}

  const isPortachupete = data.category === 'portachupete' || slug.includes('portachupete')
  const priceDesc = isPortachupete ? ` con 20% OFF` : ''
  const description = data.description || `Comprá ${data.name}${priceDesc}. Artesanal, personalizado con el nombre de tu bebé. Envíos a todo Argentina.`
  const canonicalUrl = `${SITE_URL}/shop/${slug}`
  const ogImage = data.images?.[0] ?? `${SITE_URL}/mimikids.jpg`

  return {
    title: `${data.name} · Mimikids`,
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: `${data.name} · Portachupete personalizado · Mimikids`,
      description,
      url: canonicalUrl,
      type: 'website',
      images: [{ url: ogImage, width: 800, height: 1000, alt: data.name }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${data.name} · Mimikids`,
      description,
      images: [ogImage],
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

  // Fallback: si la categoría no está seteada en DB, la inferimos del slug
  const isPortachupete = p.category === 'portachupete' ||
    (p.category !== 'funda' && (p.slug?.includes('portachupete') || p.name?.toLowerCase().includes('portachupete')))
  const isFunda = p.category === 'funda' || p.slug?.includes('guardachupete') || p.slug?.includes('funda')

  // JSON-LD schemas for Google Shopping / SEO / AIO
  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: p.name,
    description: p.description,
    image: p.images ?? [],
    brand: { '@type': 'Brand', name: 'Mimikids' },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      reviewCount: '28',
      bestRating: '5',
      worstRating: '1',
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'ARS',
      price: isPortachupete ? Math.round(p.price * (1 - PORTACHUPETE_DISCOUNT_PCT)) : p.price,
      priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
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

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Tienda', item: `${SITE_URL}/shop` },
      { '@type': 'ListItem', position: 3, name: p.name, item: `${SITE_URL}/shop/${slug}` },
    ],
  }

  // Fundas para upsell en portachupetes
  const fundas = isPortachupete
    ? (await supabase.from('products').select('id, name, slug, price, images').eq('category', 'funda').eq('is_active', true).limit(3)).data ?? []
    : []

  // Modelo pre-seleccionado si el cliente viene desde /modelos
  const preselectedModel: Model | null =
    sp.modeloFoto
      ? { id: sp.modelo ?? '', name: decodeURIComponent(sp.modeloNombre ?? ''), photo: decodeURIComponent(sp.modeloFoto) }
      : null

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
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
              {isPortachupete ? (
                <div className="flex items-baseline gap-3 mb-4">
                  <p className="font-playfair text-2xl font-bold text-[#C4687D]">
                    {formatPrice(Math.round(p.price * (1 - PORTACHUPETE_DISCOUNT_PCT)))}
                  </p>
                  <p className="text-base text-[#A58494] line-through">
                    {formatPrice(p.price)}
                  </p>
                  <span className="text-xs font-bold text-white bg-[#C4687D] px-2 py-0.5 rounded-full">
                    20% OFF
                  </span>
                </div>
              ) : (
                <p className="font-playfair text-2xl font-bold text-[#C4687D] mb-4">
                  {formatPrice(p.price)}
                </p>
              )}
              <p className="text-[#6D4D5A] leading-relaxed text-sm">{p.description}</p>
            </div>

            {/* Trust pills */}
            <div className="flex flex-wrap gap-2">
              {!isFunda && (
                <div className="flex items-center gap-1.5 bg-white rounded-full px-3 py-1.5 text-xs text-[#6D4D5A] border border-[#EDCCD5]/60">
                  <Clock size={12} className="text-[#C4687D]" strokeWidth={1.75} />
                  {p.production_days_min}–{p.production_days_max} días hábiles
                </div>
              )}
              <div className="flex items-center gap-1.5 bg-white rounded-full px-3 py-1.5 text-xs text-[#6D4D5A] border border-[#EDCCD5]/60">
                <Truck size={12} className="text-[#C4687D]" strokeWidth={1.75} />
                Envío a todo el país
              </div>
              <div className="flex items-center gap-1.5 bg-white rounded-full px-3 py-1.5 text-xs text-[#6D4D5A] border border-[#EDCCD5]/60">
                <Shield size={12} className="text-[#C4687D]" strokeWidth={1.75} />
                Materiales seguros
              </div>
            </div>

            {/* Upsell combo — va ANTES del formulario para ser visible sin scroll */}
            {isPortachupete && fundas.length > 0 && (
              <div className="bg-gradient-to-r from-[#FFF0F3] to-[#FFF8F5] rounded-2xl border border-[#EDCCD5]/60">
                <div className="px-4 py-3 flex items-center gap-2 border-b border-[#EDCCD5]/40">
                  <Gift size={15} className="text-[#C4687D] flex-shrink-0" />
                  <p className="text-sm font-semibold text-[#2B1A20]">¡Armá el combo y ahorrá <span className="text-[#C4687D]">25%</span>!</p>
                  <p className="text-xs text-[#A58494] ml-auto hidden sm:block">Agregá una funda al carrito</p>
                </div>
                <div className="p-3 flex gap-2 overflow-x-auto">
                  {fundas.map((funda) => (
                    <Link
                      key={funda.id}
                      href={`/shop/${funda.slug}`}
                      className="flex-shrink-0 flex items-center gap-2 bg-white rounded-xl px-3 py-2 border border-[#EDCCD5]/50 hover:border-[#C4687D]/50 transition-colors group min-w-0"
                    >
                      {funda.images?.[0] && (
                        <img src={funda.images[0]} alt={funda.name} className="w-9 h-9 object-cover rounded-lg flex-shrink-0" />
                      )}
                      <div className="min-w-0">
                        <p className="text-[0.7rem] font-semibold text-[#2B1A20] truncate max-w-[100px] group-hover:text-[#C4687D] transition-colors">{funda.name}</p>
                        <p className="text-[0.65rem] text-[#A58494]">{formatPrice(funda.price)}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-white rounded-2xl p-6 border border-[#EDCCD5]/40 shadow-[0_2px_16px_rgba(43,26,32,0.05)]">
              {isFunda ? (
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
