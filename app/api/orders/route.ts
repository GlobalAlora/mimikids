import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase-server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      order_number,
      items,
      buyer,
      shipping_address,
      shipping_method,
      payment_method,
      subtotal,
      shipping_cost,
      total,
    } = body

    const orderItems = items.map((item: {
      product: { id: string; name: string; images: string[]; price: number }
      quantity: number
      personalization: unknown
    }) => ({
      product_id: item.product.id,
      product_name: item.product.name,
      product_image: item.product.images[0],
      quantity: item.quantity,
      unit_price: item.product.price,
      personalization: item.personalization,
    }))

    let orderId: string

    try {
      const supabase = createServerClient()
      const { data, error } = await supabase
        .from('orders')
        .insert({
          order_number,
          status: 'pendiente_pago',
          payment_method,
          payment_status: 'pendiente',
          items: orderItems,
          shipping_method,
          shipping_address,
          buyer,
          subtotal,
          shipping_cost,
          total,
        })
        .select('id')
        .single()

      if (error) throw error
      orderId = data.id
    } catch {
      orderId = `mock-${Date.now()}`
    }

    if (payment_method === 'transferencia') {
      try {
        await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/orders/notify-transfer`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            order_number,
            buyer,
            items: orderItems,
            shipping_method,
            shipping_address,
            subtotal,
            shipping_cost,
            total,
          }),
        })
      } catch {
        // Email not configured — continue
      }
    }

    return NextResponse.json({ success: true, order_id: orderId, order_number })
  } catch (error) {
    console.error('Order creation error:', error)
    return NextResponse.json({ success: false, error: 'Error al crear el pedido' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const supabase = createServerClient()
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return NextResponse.json({ success: true, data })
  } catch {
    return NextResponse.json({ success: false, error: 'Error al obtener pedidos' }, { status: 500 })
  }
}
