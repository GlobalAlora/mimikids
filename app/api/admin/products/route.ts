import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase-server'
import { auth } from '@/lib/auth'

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const supabase = createServerClient()

  const { data, error } = await supabase
    .from('products')
    .insert({
      slug: body.slug,
      name: body.name,
      description: body.description,
      price: Number(body.price),
      images: body.images || [],
      category: 'portachupete',
      badge: body.badge || null,
      materials: body.materials || null,
      care_instructions: body.care_instructions || null,
      production_days_min: Number(body.production_days_min) || 3,
      production_days_max: Number(body.production_days_max) || 5,
      available_colors: body.available_colors || [],
      is_active: body.is_active ?? true,
    })
    .select('id, slug, name, price, images, badge, is_active')
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true, data })
}
