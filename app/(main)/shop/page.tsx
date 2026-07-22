import { createServerClient } from '@/lib/supabase-server'
import ShopClient from './ShopClient'
import type { Metadata } from 'next'
import type { Product } from '@/types'

export const dynamic = 'force-dynamic'

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://mimikids.com.ar'

export const metadata: Metadata = {
  title: 'Tienda de Portachupetes Personalizados · Mimikids',
  description: 'Comprá portachupetes personalizados con el nombre de tu bebé. Letras en silicona o madera, 100% artesanales, con 20% OFF. Envíos a todo Argentina.',
  keywords: [
    'portachupete personalizado',
    'portachupete con nombre',
    'comprar portachupete',
    'portachupete artesanal',
    'portachupete bebé Argentina',
    'funda guardachupete',
    'regalo baby shower personalizado',
  ],
  alternates: { canonical: `${SITE_URL}/shop` },
  openGraph: {
    title: 'Tienda · Portachupetes Personalizados · Mimikids',
    description: 'Portachupetes artesanales personalizados con el nombre de tu bebé. 20% OFF. Envíos a todo Argentina.',
    url: `${SITE_URL}/shop`,
    images: [{ url: `${SITE_URL}/mimikids.jpg`, width: 1080, height: 1080, alt: 'Tienda Mimikids' }],
  },
}

interface Props {
  searchParams: Promise<{ modelo?: string; modeloFoto?: string; modeloNombre?: string }>
}

export default async function ShopPage({ searchParams }: Props) {
  const sp = await searchParams
  const supabase = createServerClient()
  const { data: products, error } = await supabase
    .from('products')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false })

  if (error) console.error('[shop] Supabase error:', error.message)

  const CATEGORY_ORDER: Record<string, number> = { portachupete: 0, llavero: 1, promo: 2, funda: 3 }
  const productList = (products ?? []).sort(
    (a, b) => (CATEGORY_ORDER[a.category] ?? 10) - (CATEGORY_ORDER[b.category] ?? 10)
  ) as Product[]

  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Portachupetes personalizados Mimikids',
    description: 'Catálogo completo de portachupetes y fundas guardachupete artesanales personalizadas',
    url: `${SITE_URL}/shop`,
    numberOfItems: productList.length,
    itemListElement: productList.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${SITE_URL}/shop/${p.slug}`,
      name: p.name,
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />
      <ShopClient
        initialProducts={productList}
        modelParams={sp.modeloFoto ? {
          modelo: sp.modelo ?? '',
          modeloFoto: sp.modeloFoto,
          modeloNombre: sp.modeloNombre ?? '',
        } : undefined}
      />
    </>
  )
}
