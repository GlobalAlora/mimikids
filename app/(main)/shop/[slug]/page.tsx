import { notFound } from 'next/navigation'
import { MOCK_PRODUCTS } from '@/lib/data'
import PersonalizationForm from '@/components/product/PersonalizationForm'
import Badge from '@/components/ui/Badge'
import { formatPrice } from '@/lib/utils'
import { Clock, Shield, Truck } from 'lucide-react'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return MOCK_PRODUCTS.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const product = MOCK_PRODUCTS.find((p) => p.slug === slug)
  if (!product) return {}
  return {
    title: `${product.name} · Mimikids`,
    description: product.description,
  }
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params
  const product = MOCK_PRODUCTS.find((p) => p.slug === slug)

  if (!product) notFound()

  return (
    <div className="min-h-screen bg-[#FFFAF7]">
      <div className="max-w-6xl mx-auto px-5 py-10 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">

          {/* Image gallery */}
          <div className="space-y-3">
            <div className="relative bg-[#F6EEE9] rounded-2xl overflow-hidden aspect-[4/5]">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.badge && (
                <div className="absolute top-4 left-4">
                  <Badge>{product.badge}</Badge>
                </div>
              )}
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-2.5 overflow-x-auto pb-1">
                {product.images.map((img, i) => (
                  <div
                    key={i}
                    className="w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden border-2 border-[#EDCCD5] cursor-pointer hover:border-[#C4687D] transition-colors"
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product info + form */}
          <div className="space-y-6">

            {/* Name + price */}
            <div>
              <h1 className="font-playfair text-[2rem] md:text-[2.5rem] font-bold text-[#2B1A20] leading-[1.15] mb-3">
                {product.name}
              </h1>
              <p className="font-playfair text-2xl font-bold text-[#C4687D] mb-4">
                {formatPrice(product.price)}
              </p>
              <p className="text-[#6D4D5A] leading-relaxed text-sm">{product.description}</p>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center gap-1.5 bg-white rounded-full px-3 py-1.5 text-xs text-[#6D4D5A] border border-[#EDCCD5]/60">
                <Clock size={12} className="text-[#C4687D]" strokeWidth={1.75} />
                {product.production_days_min}–{product.production_days_max} días hábiles
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

            {/* Personalization form */}
            <div className="bg-white rounded-2xl p-6 border border-[#EDCCD5]/40 shadow-[0_2px_16px_rgba(43,26,32,0.05)]">
              <h2 className="font-playfair text-lg font-bold text-[#2B1A20] mb-5">
                Personalizar tu pedido
              </h2>
              <PersonalizationForm product={product} />
            </div>

            {/* Materials */}
            {product.materials && (
              <div className="bg-[#FFFAF7] rounded-xl p-5 border border-[#EDCCD5]/30">
                <h3 className="font-semibold text-[#2B1A20] mb-1.5 text-sm">Materiales</h3>
                <p className="text-sm text-[#A58494]">{product.materials}</p>
              </div>
            )}

            {product.care_instructions && (
              <div className="bg-[#FFFAF7] rounded-xl p-5 border border-[#EDCCD5]/30">
                <h3 className="font-semibold text-[#2B1A20] mb-1.5 text-sm">Cuidados</h3>
                <p className="text-sm text-[#A58494]">{product.care_instructions}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
