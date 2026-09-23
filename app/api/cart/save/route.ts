import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase-server'

export async function POST(req: NextRequest) {
  try {
    const { email, buyer_name, items, total } = await req.json()
    if (!email || !items?.length) return NextResponse.json({ ok: false })

    const supabase = createServerClient()
    // On insert: recovery_sent defaults to false in DB.
    // On conflict (update): don't touch recovery_sent — preserves true if already sent.
    await supabase.from('abandoned_carts').upsert(
      {
        email,
        buyer_name: buyer_name || null,
        cart_items: items,
        total: total || 0,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'email' }
    )

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: false })
  }
}
