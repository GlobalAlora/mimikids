import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Calendar } from 'lucide-react'

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://mimikids.com.ar'

export const metadata: Metadata = {
  title: { absolute: 'Blog de Mimikids — Guías y consejos sobre portachupetes y bebés' },
  description: 'Artículos y guías sobre portachupetes personalizados, materiales seguros para bebés, cómo cuidarlos, ideas para regalos y más. Por Mimikids, desde Trenque Lauquen.',
  keywords: [
    'blog portachupete',
    'guía portachupete personalizado',
    'consejos bebé accesorios',
    'portachupete silicona seguro',
    'regalo baby shower argentina',
    'mimikids blog',
  ],
  alternates: { canonical: `${SITE_URL}/blog` },
  openGraph: {
    title: 'Blog de Mimikids — Guías y consejos sobre portachupetes y bebés',
    description: 'Artículos y guías sobre portachupetes personalizados, materiales seguros, ideas para regalos y más.',
    url: `${SITE_URL}/blog`,
    images: [{ url: `${SITE_URL}/mimikids.jpg`, width: 1080, height: 1080, alt: 'Blog Mimikids' }],
  },
}

const ARTICLES = [
  {
    slug: null,
    href: '/guia',
    title: 'Guía completa de portachupetes personalizados: materiales, cuidados y cómo elegir',
    excerpt: 'Todo lo que necesitás saber antes de comprar un portachupete personalizado: qué materiales son seguros, cómo elegir el estilo de letras y cómo cuidarlo.',
    category: 'Guía',
    date: '2026-07-01',
    readTime: '5 min',
  },
  {
    slug: 'que-es-un-portachupete-personalizado',
    href: null,
    title: '¿Qué es un portachupete personalizado y cómo se hace?',
    excerpt: 'Desde la elección de las cuentas de silicona hasta las letras con el nombre del bebé: así fabricamos cada portachupete de manera artesanal en Mimikids.',
    category: 'Productos',
    date: null,
    readTime: '4 min',
  },
  {
    slug: 'como-limpiar-portachupete-silicona',
    href: null,
    title: 'Cómo limpiar un portachupete de silicona correctamente',
    excerpt: 'Consejos para mantener el portachupete de tu bebé limpio e higiénico sin dañar las cuentas ni las letras. Paso a paso.',
    category: 'Cuidados',
    date: null,
    readTime: '3 min',
  },
  {
    slug: 'regalo-baby-shower-portachupete',
    href: null,
    title: 'El mejor regalo para un baby shower: portachupete personalizado',
    excerpt: 'Por qué un portachupete con el nombre del bebé es el regalo más especial para un baby shower. Ideas, consejos y cómo elegir el modelo ideal.',
    category: 'Regalos',
    date: null,
    readTime: '4 min',
  },
  {
    slug: 'diferencia-letras-silicona-madera',
    href: null,
    title: 'Letras de silicona vs. letras de madera en portachupetes: ¿cuál elegir?',
    excerpt: 'Comparamos los dos estilos de letras disponibles en Mimikids para que puedas elegir el que más se adapta al bebé y a tu gusto personal.',
    category: 'Guía',
    date: null,
    readTime: '3 min',
  },
  {
    slug: 'portachupete-seguro-bebe',
    href: null,
    title: '¿Es seguro un portachupete personalizado para bebés?',
    excerpt: 'Todos los materiales que usamos en Mimikids son seguros y libres de BPA. Te explicamos qué certificaciones tienen y por qué importan.',
    category: 'Seguridad',
    date: null,
    readTime: '5 min',
  },
]

export default function BlogPage() {
  const published = ARTICLES.filter((a) => a.date || a.href)
  const upcoming = ARTICLES.filter((a) => !a.date && !a.href)

  return (
    <div className="min-h-screen bg-[#FFFAF7]">

      {/* Header */}
      <div className="bg-gradient-to-b from-[#F6EEE9] to-[#FFFAF7] border-b border-[#EDCCD5]/40 pt-14 pb-10">
        <div className="max-w-6xl mx-auto px-5 text-center">
          <nav aria-label="Breadcrumb" className="flex items-center justify-center gap-1.5 text-xs text-[#A58494] mb-6">
            <Link href="/" className="hover:text-[#C4687D] transition-colors">Inicio</Link>
            <span>/</span>
            <span className="text-[#6D4D5A] font-medium">Blog</span>
          </nav>
          <p className="label-caps mb-3">Guías y consejos</p>
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-[#2B1A20] leading-tight mb-4">
            Blog de Mimikids
          </h1>
          <p className="text-[#6D4D5A] max-w-lg mx-auto text-sm leading-relaxed">
            Todo lo que necesitás saber sobre portachupetes personalizados, accesorios para bebés y regalos únicos.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-5 py-14">

        {/* Published articles */}
        {published.length > 0 && (
          <div className="mb-14">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {published.map((article) => {
                const url = article.href ?? `/blog/${article.slug}`
                return (
                  <Link
                    key={article.title}
                    href={url}
                    className="group block bg-white border border-[#EDCCD5]/60 rounded-2xl overflow-hidden hover:border-[#C4687D]/40 hover:shadow-[0_4px_20px_rgba(196,104,125,0.1)] transition-all duration-300"
                  >
                    <div className="h-2 bg-[#C4687D]" />
                    <div className="p-6">
                      <span className="inline-block text-[0.625rem] font-black text-[#C4687D] bg-[#FAE8EC] px-2.5 py-1 rounded-full uppercase tracking-wide mb-3">
                        {article.category}
                      </span>
                      <h2 className="font-playfair font-bold text-[#2B1A20] text-base leading-snug mb-3 group-hover:text-[#C4687D] transition-colors">
                        {article.title}
                      </h2>
                      <p className="text-xs text-[#A58494] leading-relaxed mb-4">
                        {article.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        {article.date && (
                          <span className="flex items-center gap-1 text-[0.6875rem] text-[#A58494]">
                            <Calendar size={11} />
                            {new Date(article.date).toLocaleDateString('es-AR', { day: 'numeric', month: 'long', year: 'numeric' })}
                          </span>
                        )}
                        <span className="text-xs text-[#A58494]">{article.readTime} de lectura</span>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        )}

        {/* Upcoming articles */}
        {upcoming.length > 0 && (
          <div>
            <h2 className="font-playfair text-xl font-bold text-[#2B1A20] mb-6">Próximamente</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {upcoming.map((article) => (
                <div
                  key={article.title}
                  className="bg-[#F6EEE9]/60 border border-[#EDCCD5]/40 rounded-2xl p-5 opacity-70"
                >
                  <span className="inline-block text-[0.625rem] font-black text-[#A58494] bg-white px-2.5 py-1 rounded-full uppercase tracking-wide mb-3">
                    {article.category}
                  </span>
                  <h3 className="font-playfair font-bold text-[#6D4D5A] text-sm leading-snug mb-2">
                    {article.title}
                  </h3>
                  <span className="text-xs text-[#A58494]">{article.readTime} de lectura</span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* CTA */}
      <div className="border-t border-[#EDCCD5]/30 bg-[#F6EEE9]/50 py-12 text-center">
        <h2 className="font-playfair text-xl font-bold text-[#2B1A20] mb-3">
          ¿Buscás portachupetes personalizados?
        </h2>
        <p className="text-sm text-[#6D4D5A] mb-6">Visitá nuestra tienda y personalizá el tuyo con el nombre de tu bebé.</p>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 bg-[#C4687D] text-white text-sm font-semibold px-6 py-3 rounded-full hover:bg-[#A8546A] transition-colors"
        >
          Ver portachupetes <ArrowRight size={14} />
        </Link>
      </div>

    </div>
  )
}
