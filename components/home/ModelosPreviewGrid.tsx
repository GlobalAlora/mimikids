'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import ModelLightbox from '@/components/modelos/ModelLightbox'

interface Model {
  id: string
  name: string
  photo: string
}

export default function ModelosPreviewGrid({ models }: { models: Model[] }) {
  const [lightbox, setLightbox] = useState<Model | null>(null)

  const row1 = models.filter((_, i) => i % 2 === 0)
  const row2 = models.filter((_, i) => i % 2 === 1)

  return (
    <>
      <div className="space-y-3 overflow-x-auto pb-2 -mx-5 px-5 sm:mx-0 sm:px-0">
        {/* Fila 1 */}
        <div className="flex gap-3" style={{ width: 'max-content' }}>
          {row1.map((m) => (
            <button
              key={m.id}
              onClick={() => setLightbox(m)}
              className="group relative flex-shrink-0 overflow-hidden rounded-2xl bg-[#F6EEE9] cursor-pointer"
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
            </button>
          ))}
        </div>

        {/* Fila 2 */}
        <div className="flex gap-3 pl-[86px]" style={{ width: 'max-content' }}>
          {row2.map((m) => (
            <button
              key={m.id}
              onClick={() => setLightbox(m)}
              className="group relative flex-shrink-0 overflow-hidden rounded-2xl bg-[#F6EEE9] cursor-pointer"
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
            </button>
          ))}

          {/* CTA tile al final */}
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

      {lightbox && (
        <ModelLightbox
          photo={lightbox.photo}
          name={lightbox.name}
          onClose={() => setLightbox(null)}
          cta={
            <Link
              href="/modelos"
              className="flex-shrink-0 bg-[#C4687D] text-white text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-[#A8546A] transition-colors whitespace-nowrap flex items-center gap-1.5"
            >
              Ver catálogo <ArrowRight size={13} />
            </Link>
          }
        />
      )}
    </>
  )
}
