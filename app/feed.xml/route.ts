import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase-server'
import { PORTACHUPETE_DISCOUNT_PCT, COMBO_DISCOUNT_PCT } from '@/lib/discounts'

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://www.mimikids.com.ar'
const BRAND    = 'Mimikids'

function formatARS(n: number) {
  return `${n.toFixed(2)} ARS`
}

function esc(str: string) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function productCategory(category: string | null) {
  if (category === 'portachupete') return 'Bebé &gt; Portachupetes personalizados'
  if (category === 'funda')        return 'Bebé &gt; Accesorios para portachupetes'
  if (category === 'promo')        return 'Bebé &gt; Combos portachupete y funda'
  return 'Bebé &gt; Accesorios'
}

function salePrice(price: number, category: string | null): number | null {
  if (category === 'portachupete') return Math.round(price * (1 - PORTACHUPETE_DISCOUNT_PCT))
  if (category === 'promo')        return Math.round(price * (1 - COMBO_DISCOUNT_PCT))
  return null
}

export async function GET() {
  try {
    const supabase = createServerClient()
    const { data: products, error } = await supabase
      .from('products')
      .select('id, slug, name, description, price, images, category, stock')
      .eq('is_active', true)
      .order('created_at', { ascending: false })

    if (error || !products?.length) {
      return new NextResponse('<?xml version="1.0"?><rss version="2.0"><channel></channel></rss>', {
        headers: { 'Content-Type': 'application/xml; charset=utf-8' },
      })
    }

    const items = products.map((p) => {
      const url      = `${SITE_URL}/shop/${p.slug}`
      const imageUrl = p.images?.[0] ?? `${SITE_URL}/mimikids.jpg`
      const desc     = esc(p.description || `${p.name} — portachupete artesanal personalizado con el nombre de tu bebé. Silicona grado alimentario. Mimikids, Trenque Lauquen, Argentina.`)
      const sale     = salePrice(p.price, p.category)
      const inStock  = p.stock === null || p.stock > 0

      return `
    <item>
      <g:id>${esc(p.slug)}</g:id>
      <g:title>${esc(p.name)}</g:title>
      <g:description>${desc}</g:description>
      <g:link>${url}</g:link>
      <g:image_link>${esc(imageUrl)}</g:image_link>
      <g:condition>new</g:condition>
      <g:availability>${inStock ? 'in_stock' : 'out_of_stock'}</g:availability>
      <g:price>${formatARS(p.price)}</g:price>
      ${sale ? `<g:sale_price>${formatARS(sale)}</g:sale_price>` : ''}
      <g:brand>${BRAND}</g:brand>
      <g:google_product_category>Baby &amp; Toddler</g:google_product_category>
      <g:product_type>${productCategory(p.category)}</g:product_type>
      <g:identifier_exists>no</g:identifier_exists>
      <g:shipping>
        <g:country>AR</g:country>
        <g:service>Correo Argentino / OCA</g:service>
        <g:price>0 ARS</g:price>
      </g:shipping>
      <g:custom_label_0>${p.category ?? 'otro'}</g:custom_label_0>
      ${sale ? '<g:custom_label_1>descuento</g:custom_label_1>' : ''}
    </item>`
    }).join('\n')

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>${BRAND} — Portachupetes Personalizados</title>
    <link>${SITE_URL}</link>
    <description>Portachupetes artesanales personalizados con el nombre de tu bebé. Silicona grado alimentario. Envíos a todo Argentina.</description>
    ${items}
  </channel>
</rss>`

    return new NextResponse(xml, {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
      },
    })
  } catch {
    return new NextResponse('<?xml version="1.0"?><rss version="2.0"><channel></channel></rss>', {
      headers: { 'Content-Type': 'application/xml; charset=utf-8' },
    })
  }
}
