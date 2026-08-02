import { NextRequest, NextResponse } from 'next/server'
import { Preference } from 'mercadopago'
import { getMercadoPagoClient } from '@/lib/mercadopago'

export async function POST(req: NextRequest) {
  try {
    const { order_id, order_number, items, buyer, shipping_method } = await req.json()

    const client = getMercadoPagoClient()
    const preference = new Preference(client)

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://mimikids.com.ar'
    const backBase = `${appUrl}/order/${order_id}?method=mercadopago&order_number=${encodeURIComponent(order_number)}`

    const result = await preference.create({
      body: {
        items: items.map((item: {
          product: { name: string; images: string[]; price: number }
          quantity: number
        }) => ({
          title: item.product.name,
          quantity: item.quantity,
          unit_price: item.product.price,
          currency_id: 'ARS',
          picture_url: item.product.images?.[0],
        })),
        ...(shipping_method?.price > 0 && {
          shipments: {
            cost: shipping_method.price,
            mode: 'not_specified',
          },
        }),
        payer: {
          name: buyer.name,
          email: buyer.email,
          phone: { number: buyer.phone.replace(/\D/g, '').slice(-10) },
        },
        back_urls: {
          success: `${backBase}&status=success`,
          failure: `${backBase}&status=failure`,
          pending: `${backBase}&status=pending`,
        },
        auto_return: 'approved',
        notification_url: `${appUrl}/api/webhooks/mercadopago`,
        external_reference: order_id,
        statement_descriptor: 'MIMIKIDS',
      },
    })

    return NextResponse.json({ success: true, init_point: result.init_point })
  } catch (err) {
    console.error('[MP preference]', err)
    return NextResponse.json(
      { success: false, error: 'No se pudo iniciar el pago con MercadoPago' },
      { status: 500 }
    )
  }
}
