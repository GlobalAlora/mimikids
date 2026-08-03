import { NextRequest, NextResponse } from 'next/server'
import { Payment } from 'mercadopago'
import { getMercadoPagoClient } from '@/lib/mercadopago'
import { createServerClient } from '@/lib/supabase-server'

// Always return 200 to MP so it doesn't keep retrying
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    if (body.type !== 'payment' || !body.data?.id) {
      return NextResponse.json({ received: true })
    }

    const paymentId = String(body.data.id)

    const client = getMercadoPagoClient()
    const paymentClient = new Payment(client)
    const paymentData = await paymentClient.get({ id: paymentId })

    const orderId = paymentData.external_reference
    const mpStatus = paymentData.status

    if (!orderId) return NextResponse.json({ received: true })

    let paymentStatus = 'pendiente'
    let orderStatus = 'pendiente_pago'

    if (mpStatus === 'approved') {
      paymentStatus = 'confirmado'
      orderStatus = 'pago_confirmado'
    } else if (mpStatus === 'rejected' || mpStatus === 'cancelled') {
      paymentStatus = 'rechazado'
      orderStatus = 'cancelado'
    }

    const supabase = createServerClient()

    // Fetch current order to check if already confirmed (avoid duplicate emails)
    const { data: existingOrder } = await supabase
      .from('orders')
      .select('*')
      .eq('id', orderId)
      .single()

    await supabase
      .from('orders')
      .update({ payment_status: paymentStatus, status: orderStatus })
      .eq('id', orderId)

    // Send email if transitioning to approved for the first time
    if (mpStatus === 'approved' && existingOrder && existingOrder.payment_status !== 'confirmado') {
      const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://mimikids.com.ar'
      await fetch(`${appUrl}/api/orders/notify-mercadopago`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          order_number: existingOrder.order_number,
          buyer: existingOrder.buyer,
          items: existingOrder.items,
          shipping_method: existingOrder.shipping_method,
          shipping_address: existingOrder.shipping_address,
          subtotal: existingOrder.subtotal,
          shipping_cost: existingOrder.shipping_cost,
          total: existingOrder.total,
        }),
      }).catch(() => {})
    }

    return NextResponse.json({ received: true })
  } catch (err) {
    console.error('[MP webhook]', err)
    return NextResponse.json({ received: true })
  }
}
