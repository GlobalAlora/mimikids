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
    await supabase
      .from('orders')
      .update({ payment_status: paymentStatus, status: orderStatus })
      .eq('id', orderId)

    return NextResponse.json({ received: true })
  } catch (err) {
    console.error('[MP webhook]', err)
    return NextResponse.json({ received: true })
  }
}
