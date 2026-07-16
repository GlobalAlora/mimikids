import Link from 'next/link'
import { createServerClient } from '@/lib/supabase-server'
import { ArrowRight } from 'lucide-react'
import ModelosPreviewGrid from './ModelosPreviewGrid'

export default async function ModelosPreview() {
  const supabase = createServerClient()
  const [{ data: models }, { count }] = await Promise.all([
    supabase
      .from('models')
      .select('id, name, photo')
      .eq('is_active', true)
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: false })
      .limit(20),
    supabase
      .from('models')
      .select('*', { count: 'exact', head: true })
      .eq('is_active', true),
  ])

  if (!models || models.length === 0) return null

  const total = count ?? models.length
  const countLabel = total >= 100 ? '+100' : total >= 10 ? `+${total}` : String(total)

  return (
    <section className="py-16 md:py-24 bg-[#FFF8F5] overflow-hidden">
      <div className="max-w-6xl mx-auto px-5">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <p className="label-caps mb-2">Galería de inspiración</p>
            <h2 className="font-playfair text-[2rem] md:text-[2.75rem] font-bold text-[#2B1A20] leading-[1.1]">
              {countLabel} modelos<br className="hidden sm:block" /> para elegir
            </h2>
            <p className="text-[#6D4D5A] text-sm mt-3 max-w-xs leading-relaxed">
              Cada portachupete es único. Elegí uno como referencia y lo hacemos con el nombre de tu bebé.
            </p>
          </div>
          <Link
            href="/modelos"
            className="inline-flex items-center gap-2 bg-[#2B1A20] text-white text-sm font-semibold px-6 py-3 rounded-full hover:bg-[#4A2E38] transition-colors self-start sm:self-auto whitespace-nowrap"
          >
            Ver todos <ArrowRight size={14} />
          </Link>
        </div>

        {/* Grid escalonado con lightbox */}
        <ModelosPreviewGrid models={models} />

      </div>
    </section>
  )
}
