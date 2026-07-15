import Link from 'next/link'
import { createServerClient } from '@/lib/supabase-server'
import { ArrowRight } from 'lucide-react'

export default async function ModelosPreview() {
  const supabase = createServerClient()
  const { data: models } = await supabase
    .from('models')
    .select('id, name, photo')
    .eq('is_active', true)
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false })
    .limit(10)

  if (!models || models.length === 0) return null

  // Distribuir en 2 filas visuales con alturas intercaladas
  const row1 = models.filter((_, i) => i % 2 === 0)
  const row2 = models.filter((_, i) => i % 2 === 1)

  return (
    <section className="py-16 md:py-24 bg-[#FFF8F5] overflow-hidden">
      <div className="max-w-6xl mx-auto px-5">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <p className="label-caps mb-2">Galería de inspiración</p>
            <h2 className="font-playfair text-[2rem] md:text-[2.75rem] font-bold text-[#2B1A20] leading-[1.1]">
              {models.length >= 10 ? '+' : ''}{models.length} modelos<br className="hidden sm:block" /> para elegir
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

        {/* Grid escalonado — horizontal scroll en mobile */}
        <div className="space-y-3 overflow-x-auto pb-2 -mx-5 px-5 sm:mx-0 sm:px-0">
          {/* Fila 1 — fotos más altas */}
          <div className="flex gap-3" style={{ width: 'max-content' }}>
            {row1.map((m) => (
              <Link
                key={m.id}
                href={`/modelos`}
                className="group relative flex-shrink-0 overflow-hidden rounded-2xl bg-[#F6EEE9]"
                style={{ width: 160, height: 200 }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={m.photo}
                  alt={m.name || 'Modelo Mimikids'}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {m.name && (
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/50 to-transparent px-2 pb-2 pt-6 opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-white text-xs font-medium leading-tight line-clamp-2">{m.name}</p>
                  </div>
                )}
              </Link>
            ))}
          </div>

          {/* Fila 2 — fotos más bajas, desplazadas */}
          <div className="flex gap-3 pl-[86px]" style={{ width: 'max-content' }}>
            {row2.map((m) => (
              <Link
                key={m.id}
                href={`/modelos`}
                className="group relative flex-shrink-0 overflow-hidden rounded-2xl bg-[#F6EEE9]"
                style={{ width: 160, height: 160 }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={m.photo}
                  alt={m.name || 'Modelo Mimikids'}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {m.name && (
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/50 to-transparent px-2 pb-2 pt-6 opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-white text-xs font-medium leading-tight line-clamp-2">{m.name}</p>
                  </div>
                )}
              </Link>
            ))}

            {/* Tile CTA al final */}
            <Link
              href="/modelos"
              className="flex-shrink-0 rounded-2xl border-2 border-dashed border-[#EDCCD5] flex flex-col items-center justify-center gap-2 hover:border-[#C4687D] hover:bg-[#FFF0F3] transition-all group"
              style={{ width: 160, height: 160 }}
            >
              <span className="text-2xl">✨</span>
              <span className="text-xs font-semibold text-[#C4687D] text-center px-3 leading-tight group-hover:underline">
                Ver todos los modelos
              </span>
            </Link>
          </div>
        </div>

      </div>
    </section>
  )
}
