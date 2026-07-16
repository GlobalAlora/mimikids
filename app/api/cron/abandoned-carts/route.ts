import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase-server'
import { Resend } from 'resend'
import { formatPrice } from '@/lib/utils'

const resend = new Resend(process.env.RESEND_API_KEY)
const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://mimikids.com.ar'
const FROM = process.env.RESEND_FROM_EMAIL || 'pedidos@mimikids.com.ar'

function abandonedCartHtml({
  buyerName,
  items,
  total,
}: {
  buyerName: string
  items: Array<{ product: { name: string; price: number; images: string[] }; quantity: number }>
  total: number
}) {
  const firstName = buyerName?.split(' ')[0] || 'Hola'
  const base = `font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;margin:0;padding:0;`
  const wrap = `max-width:600px;margin:0 auto;background:#fffaf7;`
  const card = `background:#fff;border-radius:16px;padding:24px;margin:16px 0;border:1px solid #edccd5;`

  const itemsHtml = items
    .map(
      (item) => `
    <div style="display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:1px solid #f5eee9;">
      ${item.product.images?.[0] ? `<img src="${item.product.images[0]}" alt="${item.product.name}" style="width:56px;height:56px;border-radius:10px;object-fit:cover;flex-shrink:0;" />` : ''}
      <div style="flex:1;">
        <p style="font-size:14px;font-weight:600;color:#2b1a20;margin:0 0 2px;">${item.product.name}</p>
        <p style="font-size:12px;color:#a58494;margin:0;">x${item.quantity} · ${formatPrice(item.product.price * item.quantity)}</p>
      </div>
    </div>`
    )
    .join('')

  return `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Tu carrito te espera 🧸</title></head>
<body style="${base}background:#f9f0f3;">
<div style="${wrap}padding:40px 20px;">

  <div style="text-align:center;margin-bottom:24px;">
    <img src="${SITE_URL}/mimikids.jpg" alt="Mimikids" style="width:64px;height:64px;border-radius:50%;object-fit:cover;" />
    <h1 style="font-size:20px;color:#6b3d50;margin:10px 0 2px;">Mimikids</h1>
    <p style="font-size:11px;color:#a58494;text-transform:uppercase;letter-spacing:.05em;">portachupetes personalizados</p>
  </div>

  <div style="${card}">
    <div style="text-align:center;margin-bottom:20px;">
      <div style="font-size:40px;margin-bottom:8px;">🧸</div>
      <h2 style="font-size:20px;color:#6b3d50;margin:0 0 8px;">¡${firstName}, olvidaste algo!</h2>
      <p style="font-size:14px;color:#6d4d5a;margin:0;line-height:1.6;">
        Dejaste productos en tu carrito. Todavía están disponibles y esperándote.
      </p>
    </div>

    <div>${itemsHtml}</div>

    <div style="display:flex;justify-content:space-between;align-items:center;padding-top:12px;margin-top:4px;">
      <span style="font-size:13px;color:#a58494;">Total estimado</span>
      <span style="font-size:18px;font-weight:700;color:#c4687d;">${formatPrice(total)}</span>
    </div>
  </div>

  <div style="text-align:center;padding:8px 0 20px;">
    <a href="${SITE_URL}/cart"
       style="display:inline-block;background:#c4687d;color:#fff;font-size:14px;font-weight:600;padding:14px 32px;border-radius:100px;text-decoration:none;">
      Completar mi compra →
    </a>
  </div>

  <p style="text-align:center;font-size:12px;color:#a58494;line-height:1.6;">
    Si ya completaste tu pedido, ignorá este mensaje.<br/>
    <a href="${SITE_URL}" style="color:#c4687d;text-decoration:none;">mimikids.com.ar</a>
  </p>

</div>
</body></html>`
}

export async function GET(req: NextRequest) {
  // Vercel Cron protection
  const authHeader = req.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json({ skipped: 'no RESEND_API_KEY' })
  }

  const supabase = createServerClient()

  // Carts saved more than 2h ago, not yet sent, not recovered
  const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
  const { data: carts, error } = await supabase
    .from('abandoned_carts')
    .select('*')
    .eq('recovery_sent', false)
    .lt('updated_at', twoHoursAgo)
    .limit(50)

  if (error || !carts?.length) {
    return NextResponse.json({ processed: 0 })
  }

  // Filter out emails that completed an order after the cart was saved
  const emails = carts.map((c) => c.email)
  const { data: completedOrders } = await supabase
    .from('orders')
    .select('buyer')
    .in('status', ['pago_confirmado', 'en_produccion', 'enviado', 'entregado'])
    .gte('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString())

  const completedEmails = new Set(
    (completedOrders ?? []).map((o) => o.buyer?.email).filter(Boolean)
  )

  let sent = 0
  for (const cart of carts) {
    if (completedEmails.has(cart.email)) {
      // Already bought — just mark as sent so we don't retry
      await supabase.from('abandoned_carts').update({ recovery_sent: true }).eq('id', cart.id)
      continue
    }

    try {
      await resend.emails.send({
        from: FROM,
        to: cart.email,
        subject: '🧸 ¡Olvidaste algo en Mimikids!',
        html: abandonedCartHtml({
          buyerName: cart.buyer_name || '',
          items: cart.cart_items || [],
          total: cart.total || 0,
        }),
      })
      await supabase.from('abandoned_carts').update({ recovery_sent: true }).eq('id', cart.id)
      sent++
    } catch {
      // Log silently, retry next run
    }
  }

  return NextResponse.json({ processed: carts.length, sent })
}
