import { NextRequest, NextResponse } from 'next/server'
import { v2 as cloudinary } from 'cloudinary'
import { auth } from '@/lib/auth'

const MAX_SIZE = 5 * 1024 * 1024 // 5 MB
const ALLOWED = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const formData = await req.formData()
  const file = formData.get('file') as File | null

  if (!file) return NextResponse.json({ error: 'No se recibió archivo' }, { status: 400 })
  if (!ALLOWED.includes(file.type)) return NextResponse.json({ error: 'Formato no permitido. Usá JPG, PNG o WebP.' }, { status: 400 })
  if (file.size > MAX_SIZE) return NextResponse.json({ error: 'La imagen supera 5 MB.' }, { status: 400 })

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)
  const dataUri = `data:${file.type};base64,${buffer.toString('base64')}`

  try {
    const result = await cloudinary.uploader.upload(dataUri, {
      folder: 'mimikids',
      transformation: [
        { width: 900, height: 1125, crop: 'limit' },
        { quality: 'auto', fetch_format: 'auto' },
      ],
    })
    return NextResponse.json({ url: result.secure_url })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Error al subir imagen'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
