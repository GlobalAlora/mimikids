import { MOCK_PRODUCTS } from '@/lib/data'
import ProductCard from '@/components/shop/ProductCard'

export const metadata = {
  title: 'Tienda · Mimikids',
  description: 'Todos nuestros portachupetes artesanales personalizables',
}

export default function ShopPage() {
  const products = MOCK_PRODUCTS.filter((p) => p.is_active)

  return (
    <div className="min-h-screen bg-[#FFFAF7]">

      {/* Page header */}
      <div className="bg-[#F6EEE9] border-b border-[#EDCCD5]/40 py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-5 text-center">
          <p className="label-caps mb-4">Nuestra colección</p>
          <h1 className="font-playfair text-[2.5rem] md:text-[3.5rem] font-bold text-[#2B1A20] leading-[1.1] mb-4">
            La tienda Mimikids
          </h1>
          <p className="text-[#6D4D5A] max-w-sm mx-auto text-sm leading-relaxed">
            Cada portachupete es único y hecho especialmente para vos.
            Elegí el tuyo y personalizalo.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-5 py-14">

        {/* Products grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-7">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-24">
            <p className="text-[#A58494]">No hay productos disponibles por el momento.</p>
          </div>
        )}

      </div>
    </div>
  )
}
