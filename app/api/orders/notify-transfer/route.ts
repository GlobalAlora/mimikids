import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { createServerClient } from '@/lib/supabase-server'

const resend = new Resend(process.env.RESEND_API_KEY)

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://mimikids.com.ar'
const FROM = process.env.RESEND_FROM_EMAIL || 'pedidos@mimikids.com.ar'
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'somosglobalalora@gmail.com'
const WA_NUMBER = '543388673629'

function formatARS(n: number) {
  return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(n)
}

// ── Shared styles ──────────────────────────────────────────────────────────────

const base = `font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;margin:0;padding:0;`
const wrap = `max-width:600px;margin:0 auto;background:#fffaf7;`
const card = `background:#fff;border-radius:16px;padding:24px;margin:20px 0;border:1px solid #edccd5;`
const label = `font-size:12px;color:#a58494;text-transform:uppercase;letter-spacing:.05em;`
const value = `font-size:14px;font-weight:600;color:#2b1a20;`
const pink  = `color:#c4687d;`
const mono  = `font-family:monospace;font-size:15px;font-weight:700;color:#2d7a5e;letter-spacing:.02em;`

// ── Buyer email ────────────────────────────────────────────────────────────────

function buyerEmailHtml({
  order_number,
  buyer,
  items,
  shipping_method,
  subtotal,
  shipping_cost,
  total,
  cbu,
  alias,
  bank,
  holder,
}: {
  order_number: string
  buyer: { name: string; email: string; phone: string }
  items: { product_name: string; quantity: number; unit_price: number; personalization: { nombre?: string; brocheName?: string } }[]
  shipping_method: { name: string; price: number }
  subtotal: number
  shipping_cost: number
  total: number
  cbu: string
  alias: string
  bank: string
  holder: string
}) {
  const firstName = buyer.name.split(' ')[0]
  const waMsg = encodeURIComponent(`Hola! Te envío el comprobante del pedido #${order_number} 🤍`)

  const itemsHtml = items.map((item) => `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid #f5e6ec;">
        <div style="${value}">${item.product_name} × ${item.quantity}</div>
        ${item.personalization?.nombre ? `<div style="${label}">Nombre: ${item.personalization.nombre}${item.personalization?.brocheName ? ` · Broche: ${item.personalization.brocheName}` : ''}</div>` : ''}
      </td>
      <td style="padding:10px 0;border-bottom:1px solid #f5e6ec;text-align:right;${value}">${formatARS(item.unit_price * item.quantity)}</td>
    </tr>
  `).join('')

  return `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Pedido Mimikids #${order_number}</title></head>
<body style="${base}background:#f9f0f3;">
<div style="${wrap}padding:40px 20px;">

  <!-- Logo -->
  <div style="text-align:center;margin-bottom:28px;">
    <img src="${SITE_URL}/mimikids.jpg" alt="Mimikids" style="width:72px;height:72px;border-radius:50%;object-fit:cover;" />
    <h1 style="font-size:22px;color:#6b3d50;margin:12px 0 2px;">Mimikids</h1>
    <p style="${label}">portachupetes personalizados</p>
  </div>

  <!-- Main message -->
  <div style="${card}text-align:center;">
    <div style="font-size:36px;margin-bottom:12px;">🎉</div>
    <h2 style="font-size:20px;color:#6b3d50;margin:0 0 8px;">¡Gracias, ${firstName}!</h2>
    <p style="color:#a58494;font-size:14px;margin:0;">Tu pedido <strong style="${pink}">#${order_number}</strong> fue recibido. Para que arranquemos a fabricarlo, realizá la transferencia con los datos de abajo.</p>
  </div>

  <!-- Transfer data -->
  <div style="${card}">
    <h3 style="font-size:15px;color:#6b3d50;margin:0 0 16px;">💳 Datos para transferir</h3>
    <table style="width:100%;border-collapse:collapse;">
      <tr>
        <td style="padding:8px 0;${label}">Monto</td>
        <td style="padding:8px 0;font-size:22px;font-weight:700;${pink}text-align:right;">${formatARS(total)}</td>
      </tr>
      <tr style="border-top:1px solid #f5e6ec;">
        <td style="padding:10px 0;${label}">CBU</td>
        <td style="padding:10px 0;${mono}text-align:right;">${cbu || '—'}</td>
      </tr>
      <tr style="border-top:1px solid #f5e6ec;">
        <td style="padding:10px 0;${label}">Alias</td>
        <td style="padding:10px 0;${mono}text-align:right;">${alias || '—'}</td>
      </tr>
      ${bank ? `<tr style="border-top:1px solid #f5e6ec;"><td style="padding:10px 0;${label}">Banco</td><td style="padding:10px 0;${value}text-align:right;">${bank}</td></tr>` : ''}
      <tr style="border-top:1px solid #f5e6ec;">
        <td style="padding:10px 0;${label}">Titular</td>
        <td style="padding:10px 0;${value}text-align:right;">${holder || 'Mimikids'}</td>
      </tr>
    </table>
    <div style="margin-top:16px;padding:12px;background:#f0f9f4;border-radius:10px;font-size:13px;color:#2d7a5e;">
      📎 Una vez hecha la transferencia, mandanos el comprobante por WhatsApp. Comenzamos a fabricar en cuanto confirmemos el pago.
    </div>
    <div style="text-align:center;margin-top:16px;">
      <a href="https://wa.me/${WA_NUMBER}?text=${waMsg}" style="display:inline-block;background:#25d366;color:#fff;font-size:13px;font-weight:600;padding:10px 24px;border-radius:100px;text-decoration:none;">
        📲 Enviar comprobante por WhatsApp
      </a>
    </div>
  </div>

  <!-- Order summary -->
  <div style="${card}">
    <h3 style="font-size:15px;color:#6b3d50;margin:0 0 16px;">🛍️ Tu pedido</h3>
    <table style="width:100%;border-collapse:collapse;">
      ${itemsHtml}
      <tr>
        <td style="padding:8px 0;${label}">Subtotal</td>
        <td style="padding:8px 0;${label}text-align:right;">${formatARS(subtotal)}</td>
      </tr>
      <tr>
        <td style="padding:8px 0;${label}">Envío — ${shipping_method.name}</td>
        <td style="padding:8px 0;${label}text-align:right;">${shipping_cost === 0 ? 'Gratis' : formatARS(shipping_cost)}</td>
      </tr>
      <tr style="border-top:2px solid #edccd5;">
        <td style="padding:12px 0;font-size:15px;font-weight:700;color:#2b1a20;">Total</td>
        <td style="padding:12px 0;font-size:18px;font-weight:700;${pink}text-align:right;">${formatARS(total)}</td>
      </tr>
    </table>
  </div>

  <!-- Footer -->
  <div style="text-align:center;padding-top:20px;">
    <p style="font-size:12px;color:#c0a0ae;">Mimikids · Trenque Lauquen, Buenos Aires, Argentina</p>
    <p style="font-size:12px;color:#c0a0ae;margin:4px 0 0;"><a href="${SITE_URL}" style="color:#c4687d;text-decoration:none;">${SITE_URL}</a></p>
  </div>

</div>
</body></html>`
}

// ── Admin email ────────────────────────────────────────────────────────────────

function adminEmailHtml({
  order_number,
  buyer,
  items,
  shipping_method,
  shipping_address,
  subtotal,
  shipping_cost,
  total,
}: {
  order_number: string
  buyer: { name: string; email: string; phone: string }
  items: { product_name: string; quantity: number; unit_price: number; personalization: { nombre?: string; brocheName?: string } }[]
  shipping_method: { name: string; price: number }
  shipping_address: { street: string; number: string; floor?: string; city: string; province: string; postal_code: string }
  subtotal: number
  shipping_cost: number
  total: number
}) {
  const itemsHtml = items.map((item) => `
    <tr>
      <td style="padding:8px 0;border-bottom:1px solid #f0f0f0;font-size:14px;color:#333;">
        ${item.product_name} × ${item.quantity}
        ${item.personalization?.nombre ? `<br><span style="font-size:12px;color:#888;">Nombre: ${item.personalization.nombre}${item.personalization?.brocheName ? ` · Broche: ${item.personalization.brocheName}` : ''}</span>` : ''}
      </td>
      <td style="padding:8px 0;border-bottom:1px solid #f0f0f0;text-align:right;font-weight:600;color:#333;">${formatARS(item.unit_price * item.quantity)}</td>
    </tr>
  `).join('')

  const addr = `${shipping_address.street} ${shipping_address.number}${shipping_address.floor ? `, ${shipping_address.floor}` : ''}, ${shipping_address.city}, ${shipping_address.province} (${shipping_address.postal_code})`

  return `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Nuevo pedido #${order_number}</title></head>
<body style="${base}background:#f5f5f5;">
<div style="${wrap}padding:30px 20px;">

  <div style="${card}border-left:4px solid #c4687d;">
    <h2 style="margin:0 0 4px;color:#c4687d;font-size:20px;">🛍️ Nuevo pedido #${order_number}</h2>
    <p style="margin:0;color:#888;font-size:14px;">Total: <strong style="color:#333;font-size:18px;">${formatARS(total)}</strong></p>
  </div>

  <div style="${card}">
    <h3 style="margin:0 0 12px;font-size:14px;color:#666;text-transform:uppercase;letter-spacing:.05em;">Comprador</h3>
    <p style="margin:4px 0;font-size:15px;font-weight:600;color:#333;">${buyer.name}</p>
    <p style="margin:4px 0;font-size:14px;color:#555;"><a href="mailto:${buyer.email}" style="color:#c4687d;">${buyer.email}</a></p>
    <p style="margin:4px 0;font-size:14px;color:#555;"><a href="https://wa.me/${buyer.phone.replace(/\D/g, '')}" style="color:#25d366;">${buyer.phone}</a></p>
  </div>

  <div style="${card}">
    <h3 style="margin:0 0 12px;font-size:14px;color:#666;text-transform:uppercase;letter-spacing:.05em;">Envío — ${shipping_method.name}</h3>
    <p style="margin:4px 0;font-size:14px;color:#555;">${addr}</p>
    <p style="margin:8px 0 0;font-size:14px;color:#555;">Costo: <strong>${shipping_cost === 0 ? 'Retiro / Gratis' : formatARS(shipping_cost)}</strong></p>
  </div>

  <div style="${card}">
    <h3 style="margin:0 0 12px;font-size:14px;color:#666;text-transform:uppercase;letter-spacing:.05em;">Productos</h3>
    <table style="width:100%;border-collapse:collapse;">
      ${itemsHtml}
      <tr>
        <td style="padding:8px 0;font-size:13px;color:#888;">Subtotal</td>
        <td style="padding:8px 0;text-align:right;font-size:13px;color:#888;">${formatARS(subtotal)}</td>
      </tr>
      <tr>
        <td style="padding:8px 0;font-size:13px;color:#888;">Envío</td>
        <td style="padding:8px 0;text-align:right;font-size:13px;color:#888;">${formatARS(shipping_cost)}</td>
      </tr>
      <tr style="border-top:2px solid #edccd5;">
        <td style="padding:10px 0;font-weight:700;color:#333;">Total</td>
        <td style="padding:10px 0;text-align:right;font-weight:700;font-size:18px;color:#c4687d;">${formatARS(total)}</td>
      </tr>
    </table>
  </div>

  <p style="text-align:center;font-size:12px;color:#aaa;">Mimikids Admin · ${new Date().toLocaleString('es-AR')}</p>
</div>
</body></html>`
}

// ── Handler ────────────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json({ success: true, note: 'Email not configured' })
  }

  try {
    const body = await req.json()
    const { order_number, buyer, items, shipping_method, shipping_address, subtotal, shipping_cost, total } = body

    // Fetch real transfer data from Supabase settings
    let cbu = '', alias = '', bank = '', holder = ''
    try {
      const supabase = createServerClient()
      const { data } = await supabase.from('settings').select('key, value')
      if (data) {
        cbu    = data.find((r) => r.key === 'transfer_cbu')?.value    ?? ''
        alias  = data.find((r) => r.key === 'transfer_alias')?.value  ?? ''
        bank   = data.find((r) => r.key === 'transfer_bank')?.value   ?? ''
        holder = data.find((r) => r.key === 'transfer_holder')?.value ?? ''
      }
    } catch {
      // continue with empty values
    }

    // Send both emails in parallel
    await Promise.all([
      resend.emails.send({
        from: FROM,
        to: buyer.email,
        subject: `Tu pedido Mimikids #${order_number} — Datos para transferir`,
        html: buyerEmailHtml({ order_number, buyer, items, shipping_method, subtotal, shipping_cost, total, cbu, alias, bank, holder }),
      }),
      resend.emails.send({
        from: FROM,
        to: ADMIN_EMAIL,
        subject: `🛍️ Nuevo pedido #${order_number} — ${new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(total)}`,
        html: adminEmailHtml({ order_number, buyer, items, shipping_method, shipping_address, subtotal, shipping_cost, total }),
      }),
    ])

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Email error:', error)
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 })
  }
}
