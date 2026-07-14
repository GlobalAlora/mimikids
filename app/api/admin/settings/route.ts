import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase-server'
import { auth } from '@/lib/auth'

export async function GET() {
  const supabase = createServerClient()
  const { data, error } = await supabase
    .from('settings')
    .select('key, value')

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  const settings = Object.fromEntries((data ?? []).map(({ key, value }) => [key, value]))
  return NextResponse.json(settings)
}

export async function PATCH(req: NextRequest) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body: Record<string, string> = await req.json()
  const supabase = createServerClient()

  const allowed = ['transfer_cbu', 'transfer_alias', 'transfer_bank', 'transfer_holder']
  const updates = Object.entries(body).filter(([k]) => allowed.includes(k))

  for (const [key, value] of updates) {
    const { error } = await supabase
      .from('settings')
      .upsert({ key, value, updated_at: new Date().toISOString() }, { onConflict: 'key' })
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
