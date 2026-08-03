import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://mimikids.com.ar'
const FROM = process.env.RESEND_FROM_EMAIL || 'pedidos@mimikids.com.ar'
const ADMIN_EMAIL = process.env.NOTIFICATION_EMAIL || 'camilarocioperriello@gmail.com'
const WA_NUMBER = '543388673629'

function formatARS(n: number) {
  return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(n)
}

const base = `font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;margin:0;padding:0;`
const wrap = `max-width:600px;margin:0 auto;background:#fffaf7;`
const card = `background:#fff;border-radius:16px;padding:24px;margin:20px 0;border:1px solid #edccd5;`
const label = `font-size:12px;color:#a58494;text-transform:uppercase;letter-spacing:.05em;`
const value = `font-size:14px;font-weight:600;color:#2b1a20;`
const pink  = `color:#c4687d;`

type OrderItem = {
  product_name: string
  quantity: number
  unit_price: number
  personalization: { nombre?: string; brocheName?: string; modelNombre?: string; modelRef?: string }
}

type BuyerInfo = { name: string; email: string; phone: string }
type ShippingMethod = { name: string; price: number }
type ShippingAddress = { street: string; number: string; floor?: string; city: string; province: string; postal_code: string }

function buyerEmailHtml({ order_number, buyer, items, shipping_method, subtotal, shipping_cost, total }: {
  order_number: string
  buyer: BuyerInfo
  items: OrderItem[]
  shipping_method: ShippingMethod
  subtotal: number
  shipping_cost: number
  total: number
}) {
  const firstName = buyer.name.split(' ')[0]

  const itemsHtml = items.map((item) => `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid #f5e6ec;">
        <div style="${value}">${item.product_name} × ${item.quantity}</div>
        ${item.personalization?.nombre ? `<div style="${label}">Nombre: ${item.personalization.nombre}${item.personalization?.brocheName ? ` · Broche: ${item.personalization.brocheName}` : ''}</div>` : ''}
        ${item.personalization?.modelNombre ? `<div style="${label}">Modelo de referencia: <strong style="color:#6b3d50">${item.personalization.modelNombre}</strong></div>` : ''}
      </td>
      <td style="padding:10px 0;border-bottom:1px solid #f5e6ec;text-align:right;${value}">${formatARS(item.unit_price * item.quantity)}</td>
    </tr>
  `).join('')

  return `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Pedido confirmado #${order_number}</title></head>
<body style="${base}background:#f9f0f3;">
<div style="${wrap}padding:40px 20px;">

  <div style="text-align:center;margin-bottom:28px;">
    <img src="${SITE_URL}/mimikids.jpg" alt="Mimikids" style="width:72px;height:72px;border-radius:50%;object-fit:cover;" />
    <h1 style="font-size:22px;color:#6b3d50;margin:12px 0 2px;">Mimikids</h1>
    <p style="${label}">portachupetes personalizados</p>
  </div>

  <div style="${card}text-align:center;">
    <div style="font-size:36px;margin-bottom:12px;">✅</div>
    <h2 style="font-size:20px;color:#6b3d50;margin:0 0 8px;">¡Pago confirmado, ${firstName}!</h2>
    <p style="color:#a58494;font-size:14px;margin:0;">Tu pedido <strong style="${pink}">#${order_number}</strong> fue pagado exitosamente con MercadoPago. ¡Ya comenzamos a producir tu portachupete!</p>
  </div>

  <div style="${card}background:#f0f9f4;border-color:#b8e0cc;">
    <h3 style="font-size:15px;color:#2d7a5e;margin:0 0 12px;">🎨 ¿Qué sigue?</h3>
    <ol style="margin:0;padding-left:20px;color:#2d7a5e;font-size:14px;line-height:1.8;">
      <li>Producimos tu portachupete artesanalmente (1–2 días hábiles)</li>
      <li>Te enviamos el número de seguimiento por email</li>
      <li>¡Tu portachupete llega a tu puerta!</li>
    </ol>
    <div style="margin-top:12px;text-align:center;">
      <a href="https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(`Hola! Consulto por mi pedido #${order_number} 🤍`)}" style="display:inline-block;background:#25d366;color:#fff;font-size:13px;font-weight:600;padding:10px 24px;border-radius:100px;text-decoration:none;">
        📲 Consultar por WhatsApp
      </a>
    </div>
  </div>

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
        <td style="padding:12px 0;font-size:15px;font-weight:700;color:#2b1a20;">Total pagado</td>
        <td style="padding:12px 0;font-size:18px;font-weight:700;${pink}text-align:right;">${formatARS(total)}</td>
      </tr>
    </table>
  </div>

  <div style="text-align:center;padding-top:20px;">
    <p style="font-size:12px;color:#c0a0ae;">Mimikids · Trenque Lauquen, Buenos Aires, Argentina</p>
    <p style="font-size:12px;color:#c0a0ae;margin:4px 0 0;"><a href="${SITE_URL}" style="color:#c4687d;text-decoration:none;">${SITE_URL}</a></p>
  </div>

</div>
</body></html>`
}

function adminEmailHtml({ order_number, buyer, items, shipping_method, shipping_address, subtotal, shipping_cost, total }: {
  order_number: string
  buyer: BuyerInfo
  items: OrderItem[]
  shipping_method: ShippingMethod
  shipping_address: ShippingAddress
  subtotal: number
  shipping_cost: number
  total: number
}) {
  const itemsHtml = items.map((item) => `
    <tr>
      <td style="padding:8px 0;border-bottom:1px solid #f0f0f0;font-size:14px;color:#333;">
        ${item.product_name} × ${item.quantity}
        ${item.personalization?.nombre ? `<br><span style="font-size:12px;color:#888;">Nombre: ${item.personalization.nombre}${item.personalization?.brocheName ? ` · Broche: ${item.personalization.brocheName}` : ''}</span>` : ''}
        ${item.personalization?.modelNombre ? `<br><span style="font-size:12px;color:#888;">Modelo ref: <strong style="color:#c4687d;">${item.personalization.modelNombre}</strong></span>` : ''}
        ${item.personalization?.modelRef ? `<br><img src="${item.personalization.modelRef}" alt="Modelo" style="width:48px;height:48px;border-radius:6px;object-fit:cover;margin-top:4px;border:1px solid #edccd5;" />` : ''}
      </td>
      <td style="padding:8px 0;border-bottom:1px solid #f0f0f0;text-align:right;font-weight:600;color:#333;">${formatARS(item.unit_price * item.quantity)}</td>
    </tr>
  `).join('')

  const addr = `${shipping_address.street} ${shipping_address.number}${shipping_address.floor ? `, ${shipping_address.floor}` : ''}, ${shipping_address.city}, ${shipping_address.province} (${shipping_address.postal_code})`

  return `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Nuevo pedido MP #${order_number}</title></head>
<body style="${base}background:#f5f5f5;">
<div style="max-width:600px;margin:0 auto;padding:30px 20px;">

  <div style="${card}border-left:4px solid #009EE3;">
    <h2 style="margin:0 0 4px;color:#009EE3;font-size:20px;">💳 Nuevo pedido MercadoPago #${order_number}</h2>
    <p style="margin:0;color:#888;font-size:14px;">Total cobrado: <strong style="color:#333;font-size:18px;">${formatARS(total)}</strong></p>
    <p style="margin:4px 0 0;font-size:13px;background:#e8f7ff;color:#0077aa;padding:6px 10px;border-radius:6px;display:inline-block;">✅ Pago acreditado — comenzar producción</p>
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

export async function POST(req: NextRequest) {
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json({ success: true, note: 'Email not configured' })
  }

  try {
    const body = await req.json()
    const { order_number, buyer, items, shipping_method, shipping_address, subtotal, shipping_cost, total } = body

    await Promise.all([
      resend.emails.send({
        from: FROM,
        to: buyer.email,
        subject: `✅ Pago confirmado — Pedido Mimikids #${order_number}`,
        html: buyerEmailHtml({ order_number, buyer, items, shipping_method, subtotal, shipping_cost, total }),
      }),
      resend.emails.send({
        from: FROM,
        to: ADMIN_EMAIL,
        subject: `💳 Nuevo pedido MP #${order_number} — ${formatARS(total)}`,
        html: adminEmailHtml({ order_number, buyer, items, shipping_method, shipping_address, subtotal, shipping_cost, total }),
      }),
    ])

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('MP email error:', error)
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 })
  }
}
