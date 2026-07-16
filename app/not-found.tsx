import Link from 'next/link'
import { ArrowLeft, ShoppingBag } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#FFFAF7] flex items-center justify-center px-5">
      <div className="text-center max-w-md">

        {/* Decorative number */}
        <div className="relative mb-8">
          <p className="font-playfair text-[9rem] font-bold text-[#EDCCD5] leading-none select-none">
            404
          </p>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-5xl">🧸</span>
          </div>
        </div>

        <h1 className="font-playfair text-[1.75rem] font-bold text-[#2B1A20] mb-3">
          Esta página no existe
        </h1>
        <p className="text-[#6D4D5A] text-sm leading-relaxed mb-8">
          Puede que el link esté roto o que la página se haya movido.
          Desde acá podés volver al inicio.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-[#C4687D] text-white text-sm font-semibold px-6 py-3 rounded-full hover:bg-[#A8546A] transition-colors"
          >
            <ArrowLeft size={14} />
            Volver al inicio
          </Link>
          <Link
            href="/shop"
            className="inline-flex items-center justify-center gap-2 border border-[#EDCCD5] text-[#6D4D5A] text-sm font-semibold px-6 py-3 rounded-full hover:border-[#C4687D] hover:text-[#C4687D] transition-colors"
          >
            <ShoppingBag size={14} />
            Ver la tienda
          </Link>
        </div>

      </div>
    </div>
  )
}
