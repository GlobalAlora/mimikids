import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase-server'
import { auth } from '@/lib/auth'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)
const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://mimikids.com.ar'
const FROM = process.env.RESEND_FROM_EMAIL || 'pedidos@mimikids.com.ar'
const WA_NUMBER = '543388673629'

const STATUS_INFO: Record<string, { label: string; emoji: string; message: string }> = {
  pagado:        { label: 'Pago confirmado',  emoji: '✅', message: '¡Recibimos tu pago! Ya arrancamos a fabricar tu pedido con mucho cariño.' },
  en_produccion: { label: 'En producción',    emoji: '🔨', message: 'Tu pedido está siendo fabricado. Te avisamos cuando esté listo para enviar.' },
  enviado:       { label: 'Enviado',          emoji: '📦', message: 'Tu pedido fue despachado y está en camino. ¡Ya falta poco!' },
  entregado:     { label: 'Entregado',        emoji: '🎉', message: '¡Tu pedido llegó! Esperamos que lo amen. Gracias por elegirnos 🤍' },
  cancelado:     { label: 'Cancelado',        emoji: '❌', message: 'Tu pedido fue cancelado. Si tenés alguna duda, escribinos por WhatsApp.' },
}

function statusEmailHtml({
  order_number,
  buyerName,
  status,
}: {
  order_number: string
  buyerName: string
  status: string
}) {
  const info = STATUS_INFO[status]
  if (!info) return ''
  const base = `font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;margin:0;padding:0;`
  const wrap = `max-width:600px;margin:0 auto;background:#fffaf7;`
  const card = `background:#fff;border-radius:16px;padding:24px;margin:20px 0;border:1px solid #edccd5;`
  const waMsg = encodeURIComponent(`Hola! Tengo una consulta sobre mi pedido #${order_number}`)
  const firstName = buyerName.split(' ')[0]

  return `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Actualización pedido #${order_number}</title></head>
<body style="${base}background:#f9f0f3;">
<div style="${wrap}padding:40px 20px;">

  <div style="text-align:center;margin-bottom:28px;">
    <img src="${SITE_URL}/mimikids.jpg" alt="Mimikids" style="width:72px;height:72px;border-radius:50%;object-fit:cover;" />
    <h1 style="font-size:22px;color:#6b3d50;margin:12px 0 2px;">Mimikids</h1>
    <p style="font-size:12px;color:#a58494;text-transform:uppercase;letter-spacing:.05em;">portachupetes personalizados</p>
  </div>

  <div style="${card}text-align:center;">
    <div style="font-size:48px;margin-bottom:12px;">${info.emoji}</div>
    <h2 style="font-size:20px;color:#6b3d50;margin:0 0 8px;">¡Hola, ${firstName}!</h2>
    <p style="font-size:15px;font-weight:700;color:#c4687d;margin:0 0 12px;">Tu pedido #${order_number} — ${info.label}</p>
    <p style="color:#6d4d5a;font-size:14px;margin:0;line-height:1.6;">${info.message}</p>
  </div>

  <div style="text-align:center;padding:8px 0 20px;">
    <a href="https://wa.me/${WA_NUMBER}?text=${waMsg}"
       style="display:inline-block;background:#25d366;color:#fff;font-size:13px;font-weight:600;padding:10px 24px;border-radius:100px;text-decoration:none;">
      📲 Consultar por WhatsApp
    </a>
  </div>

  <p style="text-align:center;font-size:12px;color:#c0a0ae;">Mimikids · Trenque Lauquen, Buenos Aires, Argentina</p>
  <p style="text-align:center;font-size:12px;margin:4px 0 0;"><a href="${SITE_URL}" style="color:#c4687d;text-decoration:none;">${SITE_URL}</a></p>

</div>
</body></html>`
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const body = await req.json()
  const supabase = createServerClient()

  const { error } = await supabase
    .from('orders')
    .update({ status: body.status })
    .eq('id', id)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  // Send status notification email to buyer
  if (process.env.RESEND_API_KEY && STATUS_INFO[body.status]) {
    try {
      const { data: order } = await supabase
        .from('orders')
        .select('order_number, buyer')
        .eq('id', id)
        .single()

      if (order?.buyer?.email) {
        const html = statusEmailHtml({
          order_number: order.order_number,
          buyerName: order.buyer.name || 'Cliente',
          status: body.status,
        })
        const info = STATUS_INFO[body.status]
        await resend.emails.send({
          from: FROM,
          to: order.buyer.email,
          subject: `${info.emoji} Tu pedido Mimikids #${order.order_number} — ${info.label}`,
          html,
        })
      }
    } catch {
      // Email failure doesn't block the status update
    }
  }

  return NextResponse.json({ success: true })
}
