import { MOCK_TESTIMONIALS } from '@/lib/data'
import { Star } from 'lucide-react'

export default function Testimonials() {
  return (
    <section id="testimonios" className="bg-white py-24">
      <div className="max-w-6xl mx-auto px-5">

        <div className="text-center mb-14">
          <p className="label-caps mb-4">Familias que nos eligieron</p>
          <h2 className="font-playfair text-[2rem] md:text-[2.5rem] font-bold text-[#2B1A20] leading-[1.15]">
            Lo que dicen las mamás
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MOCK_TESTIMONIALS.map((t, i) => (
            <article
              key={t.id}
              className={`p-7 rounded-2xl border transition-shadow duration-300 hover:shadow-[0_6px_28px_rgba(43,26,32,0.08)] ${
                i === 1
                  ? 'bg-[#2B1A20] border-transparent'
                  : 'bg-white border-[#EDCCD5]/50'
              }`}
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-5" aria-label={`${t.rating} de 5 estrellas`}>
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star
                    key={j}
                    size={13}
                    className={i === 1 ? 'fill-[#C4687D] text-[#C4687D]' : 'fill-[#C4687D] text-[#C4687D]'}
                    aria-hidden="true"
                  />
                ))}
              </div>

              {/* Quote */}
              <blockquote>
                <p className={`text-sm leading-relaxed mb-6 ${i === 1 ? 'text-white/80' : 'text-[#6D4D5A]'}`}>
                  &ldquo;{t.content}&rdquo;
                </p>
              </blockquote>

              {/* Author */}
              <footer>
                <p className={`font-semibold text-sm ${i === 1 ? 'text-white' : 'text-[#2B1A20]'}`}>
                  {t.author_name}
                </p>
                {t.baby_name && (
                  <p className={`text-xs mt-0.5 ${i === 1 ? 'text-white/50' : 'text-[#A58494]'}`}>
                    Mamá de {t.baby_name}
                  </p>
                )}
              </footer>
            </article>
          ))}
        </div>

        {/* Social proof bar */}
        <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-8 text-center">
          <div className="flex items-center gap-2">
            <div className="flex gap-0.5" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, j) => (
                <Star key={j} size={12} className="fill-[#C4687D] text-[#C4687D]" />
              ))}
            </div>
            <span className="font-playfair font-bold text-[#2B1A20]">4.9</span>
            <span className="text-sm text-[#A58494]">promedio de calificación</span>
          </div>
          <div className="hidden sm:block w-px h-5 bg-[#EDCCD5]" aria-hidden="true" />
          <p className="text-sm text-[#A58494]">
            <span className="font-semibold text-[#2B1A20]">+500</span> familias felices en todo el país
          </p>
        </div>

      </div>
    </section>
  )
}
