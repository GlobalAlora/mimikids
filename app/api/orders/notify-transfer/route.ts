import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  try {
    const { order_number, buyer, total } = await req.json()

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json({ success: true, note: 'Email not configured' })
    }

    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
      to: buyer.email,
      subject: `Tu pedido Mimikids #${order_number} — Datos para transferencia`,
      html: `
        <div style="font-family: 'DM Sans', sans-serif; max-width: 600px; margin: 0 auto; background: #FFF8F0; padding: 40px 20px; border-radius: 16px;">
          <div style="text-align: center; margin-bottom: 32px;">
            <h1 style="color: #8b5e70; font-size: 28px; margin: 0;">Mimikids 🌈</h1>
            <p style="color: #9b7a88;">baby shop</p>
          </div>

          <h2 style="color: #6b3d50; font-size: 22px;">¡Pedido confirmado, ${buyer.name.split(' ')[0]}!</h2>
          <p style="color: #9b7a88;">Tu pedido #${order_number} fue recibido. Para comenzar la producción, realizá la transferencia con los siguientes datos:</p>

          <div style="background: white; border-radius: 16px; padding: 24px; margin: 24px 0; border: 1px solid rgba(249,196,210,0.4);">
            <h3 style="color: #6b3d50; margin-top: 0;">Datos bancarios</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #9b7a88; font-size: 14px;">CBU</td>
                <td style="padding: 8px 0; font-family: monospace; font-weight: 600; color: #3d9e78;">0000000000000000000000</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #9b7a88; font-size: 14px;">Alias</td>
                <td style="padding: 8px 0; font-weight: 600; color: #3d9e78;">MIMIKIDS.SHOP</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #9b7a88; font-size: 14px;">Titular</td>
                <td style="padding: 8px 0; font-weight: 600; color: #3d9e78;">Mimikids Baby Shop</td>
              </tr>
              <tr style="border-top: 1px solid rgba(249,196,210,0.4);">
                <td style="padding: 8px 0; color: #9b7a88; font-size: 14px; font-weight: 600;">Monto a transferir</td>
                <td style="padding: 8px 0; font-size: 20px; font-weight: 700; color: #d4768a;">$${total.toLocaleString('es-AR')}</td>
              </tr>
            </table>
          </div>

          <p style="color: #9b7a88; font-size: 14px;">
            Importante: una vez que realices la transferencia, envianos el comprobante por WhatsApp o por email respondiendo este mensaje. Comenzaremos la producción ni bien confirmemos el pago.
          </p>

          <div style="text-align: center; margin-top: 32px; padding-top: 24px; border-top: 1px solid rgba(249,196,210,0.4);">
            <p style="color: #b89aa8; font-size: 12px;">Mimikids Baby Shop · hola@mimikids.com.ar</p>
          </div>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Email error:', error)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
