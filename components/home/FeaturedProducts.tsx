import Link from 'next/link'
import { createServerClient } from '@/lib/supabase-server'
import ProductCard from '@/components/shop/ProductCard'
import { ArrowRight } from 'lucide-react'

export default async function FeaturedProducts() {
  const supabase = createServerClient()
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false })
    .limit(4)

  if (!products || products.length === 0) return null

  return (
    <section className="bg-[#FFFAF7] py-24">
      <div className="max-w-6xl mx-auto px-5">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <p className="label-caps mb-3">Nuestra colección</p>
            <h2 className="font-playfair text-[2rem] md:text-[2.5rem] font-bold text-[#2B1A20] leading-[1.15]">
              Los más queridos
            </h2>
          </div>
          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#C4687D] hover:text-[#A8546A] transition-colors duration-200 group shrink-0 pb-1"
            aria-label="Ver todos los productos"
          >
            Ver todos
            <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform duration-200" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-7">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </section>
  )
}
