import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase-server'
import { auth } from '@/lib/auth'

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const body = await req.json()

  const supabase = createServerClient()
  const allowed = ['name', 'slug', 'description', 'price', 'images', 'badge', 'category', 'letter_style', 'materials', 'care_instructions', 'production_days_min', 'production_days_max', 'stock', 'is_active', 'available_colors']
  const updates = Object.fromEntries(Object.entries(body).filter(([k]) => allowed.includes(k)))

  const { error } = await supabase.from('products').update(updates).eq('id', id)

  if (error) {
    // Si falla por columna que aún no existe en DB (stock o letter_style sin migración),
    // reintentamos sin esas columnas opcionales para no bloquear el resto del update
    if (error.code === '42703') {
      const safeUpdates = Object.fromEntries(
        Object.entries(updates).filter(([k]) => !['stock', 'letter_style'].includes(k))
      )
      const { error: retryError } = await supabase.from('products').update(safeUpdates).eq('id', id)
      if (retryError) return NextResponse.json({ error: retryError.message }, { status: 500 })
    } else {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
  }

  return NextResponse.json({ success: true })
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params

  const supabase = createServerClient()
  const { error } = await supabase.from('products').delete().eq('id', id)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ success: true })
}
