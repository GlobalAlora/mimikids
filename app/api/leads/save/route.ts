import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase-server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)
const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://mimikids.com.ar'
const FROM = process.env.RESEND_FROM_EMAIL || 'pedidos@mimikids.com.ar'
const DISCOUNT_CODE = 'BIENVENIDA10'

function welcomeEmailHtml() {
  const base = `font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;margin:0;padding:0;`
  const wrap = `max-width:600px;margin:0 auto;background:#fffaf7;`
  const card = `background:#fff;border-radius:16px;padding:28px;margin:16px 0;border:1px solid #edccd5;`

  return `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Tu 10% OFF en Mimikids</title></head>
<body style="${base}background:#f9f0f3;">
<div style="${wrap}padding:40px 20px;">

  <div style="text-align:center;margin-bottom:24px;">
    <img src="${SITE_URL}/mimikids.jpg" alt="Mimikids" style="width:64px;height:64px;border-radius:50%;object-fit:cover;" />
    <h1 style="font-size:20px;color:#6b3d50;margin:10px 0 2px;">Mimikids</h1>
    <p style="font-size:11px;color:#a58494;text-transform:uppercase;letter-spacing:.05em;">portachupetes personalizados</p>
  </div>

  <div style="${card}text-align:center;">
    <div style="font-size:44px;margin-bottom:12px;">🎁</div>
    <h2 style="font-size:22px;color:#6b3d50;margin:0 0 8px;">¡Gracias por suscribirte!</h2>
    <p style="font-size:14px;color:#6d4d5a;margin:0 0 20px;line-height:1.6;">
      Como prometimos, acá está tu código con 10% de descuento<br/>para tu primera compra:
    </p>
    <div style="background:#fae8ec;border:2px dashed #c4687d;border-radius:12px;padding:16px 24px;display:inline-block;margin-bottom:20px;">
      <p style="font-size:28px;font-weight:800;color:#c4687d;margin:0;letter-spacing:.15em;">${DISCOUNT_CODE}</p>
    </div>
    <p style="font-size:13px;color:#a58494;margin:0 0 24px;line-height:1.6;">
      Mencioná este código al coordinar tu pedido por WhatsApp<br/>y aplicamos el 10% sobre el total.
    </p>
    <a href="${SITE_URL}/shop"
       style="display:inline-block;background:#c4687d;color:#fff;font-size:14px;font-weight:600;padding:14px 32px;border-radius:100px;text-decoration:none;">
      Ver portachupetes →
    </a>
  </div>

  <div style="background:#fff;border-radius:16px;padding:20px;border:1px solid #edccd5;margin-top:12px;">
    <p style="font-size:12px;font-weight:700;color:#6b3d50;margin:0 0 10px;">¿Por qué elegirnos?</p>
    <div style="display:grid;gap:8px;">
      ${[
        ['🎨', '100% personalizado con el nombre de tu bebé'],
        ['⚡', 'Listo en 1–2 días hábiles'],
        ['💎', 'Silicona sin BPA, materiales seguros'],
        ['🚚', 'Andreani a todo el país'],
      ].map(([emoji, text]) => `
        <div style="display:flex;align-items:center;gap:10px;">
          <span style="font-size:16px;">${emoji}</span>
          <span style="font-size:12px;color:#6d4d5a;">${text}</span>
        </div>`).join('')}
    </div>
  </div>

  <p style="text-align:center;font-size:11px;color:#c0a0ae;margin-top:24px;">
    Mimikids · Trenque Lauquen, Buenos Aires, Argentina<br/>
    <a href="${SITE_URL}" style="color:#c4687d;text-decoration:none;">${SITE_URL}</a>
  </p>

</div>
</body></html>`
}

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()
    if (!email) return NextResponse.json({ ok: false })

    const supabase = createServerClient()

    const { error } = await supabase
      .from('email_leads')
      .upsert({ email, source: 'popup' }, { onConflict: 'email', ignoreDuplicates: true })

    if (error && error.code !== '23505') {
      // Ignore duplicate key errors, log others
      console.error('Lead save error:', error)
    }

    if (process.env.RESEND_API_KEY) {
      await resend.emails.send({
        from: FROM,
        to: email,
        subject: `🎁 Tu 10% OFF en Mimikids — Código: ${DISCOUNT_CODE}`,
        html: welcomeEmailHtml(),
      }).catch(() => {})
    }

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: false })
  }
}
