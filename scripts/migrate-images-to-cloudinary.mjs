/**
 * Migra imágenes de Supabase Storage a Cloudinary.
 * Ejecutar el 13/9 cuando resetee la cuota de Supabase.
 *
 * Uso:
 *   SUPABASE_SERVICE_ROLE_KEY=tu_key node scripts/migrate-images-to-cloudinary.mjs
 */

import { createClient } from '@supabase/supabase-js'
import { v2 as cloudinary } from 'cloudinary'

// ── Config ─────────────────────────────────────────────────────────────────────

const SUPABASE_URL = 'https://gmetfnlyyjzasprpjtid.supabase.co'
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

const CLOUDINARY_CLOUD_NAME = 'dj61vu8jg'
const CLOUDINARY_API_KEY    = '542467194148125'
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET

if (!SUPABASE_KEY) {
  console.error('❌ Falta SUPABASE_SERVICE_ROLE_KEY')
  console.error('   Ejecutá: SUPABASE_SERVICE_ROLE_KEY=tu_key node scripts/migrate-images-to-cloudinary.mjs')
  process.exit(1)
}

if (!CLOUDINARY_API_SECRET) {
  console.error('❌ Falta CLOUDINARY_API_SECRET')
  console.error('   Ejecutá: CLOUDINARY_API_SECRET=Db0oqKe1... node scripts/migrate-images-to-cloudinary.mjs')
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key:    CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
})

// ── Helpers ────────────────────────────────────────────────────────────────────

function isSupabaseUrl(url) {
  return typeof url === 'string' && url.includes('supabase.co')
}

async function uploadToCloudinary(url) {
  const result = await cloudinary.uploader.upload(url, {
    folder: 'mimikids',
    transformation: [
      { width: 900, height: 1125, crop: 'limit' },
      { quality: 'auto', fetch_format: 'auto' },
    ],
  })
  return result.secure_url
}

// ── Migrar productos ───────────────────────────────────────────────────────────

async function migrateProducts() {
  console.log('\n📦 Migrando imágenes de productos...')
  const { data: products, error } = await supabase.from('products').select('id, name, images')
  if (error) { console.error('Error al obtener productos:', error.message); return }

  let updated = 0
  for (const product of products) {
    if (!product.images?.length) continue
    const supabaseImages = product.images.filter(isSupabaseUrl)
    if (!supabaseImages.length) continue

    console.log(`  → ${product.name} (${supabaseImages.length} imágenes)`)
    const newImages = []

    for (const url of product.images) {
      if (!isSupabaseUrl(url)) {
        newImages.push(url)
        continue
      }
      try {
        const newUrl = await uploadToCloudinary(url)
        newImages.push(newUrl)
        console.log(`     ✓ ${url.split('/').pop()} → Cloudinary`)
      } catch (err) {
        console.error(`     ✗ Error: ${err.message}`)
        newImages.push(url) // mantener URL original si falla
      }
    }

    await supabase.from('products').update({ images: newImages }).eq('id', product.id)
    updated++
  }
  console.log(`  ✅ ${updated} productos actualizados`)
}

// ── Migrar modelos ─────────────────────────────────────────────────────────────

async function migrateModels() {
  console.log('\n🖼  Migrando fotos de modelos...')
  const { data: models, error } = await supabase.from('models').select('id, name, photo')
  if (error) { console.error('Error al obtener modelos:', error.message); return }

  let updated = 0
  for (const model of models) {
    if (!isSupabaseUrl(model.photo)) continue

    console.log(`  → ${model.name || '(sin nombre)'}: ${model.photo.split('/').pop()}`)
    try {
      const newUrl = await uploadToCloudinary(model.photo)
      await supabase.from('models').update({ photo: newUrl }).eq('id', model.id)
      console.log(`     ✓ Migrado a Cloudinary`)
      updated++
    } catch (err) {
      console.error(`     ✗ Error: ${err.message}`)
    }
  }
  console.log(`  ✅ ${updated} modelos actualizados`)
}

// ── Main ───────────────────────────────────────────────────────────────────────

console.log('🚀 Iniciando migración de imágenes Supabase → Cloudinary')
console.log(`   Supabase: ${SUPABASE_URL}`)
console.log(`   Cloudinary: ${CLOUDINARY_CLOUD_NAME}`)

await migrateProducts()
await migrateModels()

console.log('\n🎉 Migración completa. Las URLs en la base de datos ahora apuntan a Cloudinary.')
console.log('   A partir de ahora el bandwidth de Supabase no se consume más por imágenes.')
