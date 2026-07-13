import { NextRequest, NextResponse } from 'next/server'

interface MPItem {
  product: { name: string; price: number; images: string[] }
  quantity: number
}

export async function POST(req: NextRequest) {
  try {
    const { orderId, order_number, items, buyer, total } = await req.json()

    const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN
    if (!accessToken) {
      return NextResponse.json({ error: 'MercadoPago not configured' }, { status: 400 })
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

    const preference = {
      items: items.map((item: MPItem) => ({
        title: item.product.name,
        quantity: item.quantity,
        unit_price: item.product.price,
        currency_id: 'ARS',
        picture_url: item.product.images[0],
      })),
      payer: {
        name: buyer.name,
        email: buyer.email,
        phone: { number: buyer.phone },
      },
      back_urls: {
        success: `${appUrl}/order/${orderId}?order_number=${order_number}&method=mercadopago`,
        failure: `${appUrl}/checkout?error=payment_failed`,
        pending: `${appUrl}/order/${orderId}?order_number=${order_number}&method=mercadopago&status=pending`,
      },
      auto_return: 'approved',
      external_reference: orderId,
      statement_descriptor: 'Mimikids',
      metadata: { order_number, total },
    }

    const res = await fetch('https://api.mercadopago.com/checkout/preferences', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(preference),
    })

    const data = await res.json()

    if (!res.ok) {
      throw new Error(data.message || 'Error creating MP preference')
    }

    return NextResponse.json({
      preference_id: data.id,
      init_point: data.init_point,
      sandbox_init_point: data.sandbox_init_point,
    })
  } catch (error) {
    console.error('MercadoPago error:', error)
    return NextResponse.json({ error: 'Error al procesar el pago' }, { status: 500 })
  }
}
