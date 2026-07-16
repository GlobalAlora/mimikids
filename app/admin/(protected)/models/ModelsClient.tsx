'use client'

import { useState, useRef } from 'react'
import { Plus, Trash2, Eye, EyeOff, Upload, X, Check } from 'lucide-react'
import Button from '@/components/ui/Button'

interface Model {
  id: string
  name: string
  photo: string
  color?: string | null
  is_active: boolean
  sort_order: number
}

const COLORS = [
  { value: 'blanco',  label: 'Blanco',  hex: '#F5EFEA', border: true },
  { value: 'beige',   label: 'Beige',   hex: '#D4B896' },
  { value: 'celeste', label: 'Celeste', hex: '#8EC9E0' },
  { value: 'rosa',    label: 'Rosa',    hex: '#E8A0B0' },
  { value: 'madera',  label: 'Madera',  hex: '#B8804A' },
] as const

// ── Multi-upload ───────────────────────────────────────────────────────────────

interface UploadItem {
  file: File
  preview: string   // local object URL
  status: 'pending' | 'uploading' | 'done' | 'error'
  url?: string
  error?: string
}

function MultiUploader({
  onDone,
  onCancel,
}: {
  onDone: (urls: string[]) => void
  onCancel: () => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [items, setItems] = useState<UploadItem[]>([])
  const [uploading, setUploading] = useState(false)

  function addFiles(files: FileList) {
    const newItems: UploadItem[] = Array.from(files).map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      status: 'pending',
    }))
    setItems((prev) => [...prev, ...newItems])
  }

  function removeItem(i: number) {
    setItems((prev) => {
      URL.revokeObjectURL(prev[i].preview)
      return prev.filter((_, idx) => idx !== i)
    })
  }

  async function uploadAll() {
    setUploading(true)
    const updated = [...items]

    await Promise.all(
      updated.map(async (item, i) => {
        if (item.status === 'done') return
        updated[i] = { ...item, status: 'uploading' }
        setItems([...updated])
        try {
          const fd = new FormData()
          fd.append('file', item.file)
          const res = await fetch('/api/admin/upload', { method: 'POST', body: fd })
          const data = await res.json()
          if (data.url) {
            updated[i] = { ...updated[i], status: 'done', url: data.url }
          } else {
            updated[i] = { ...updated[i], status: 'error', error: data.error || 'Error' }
          }
        } catch {
          updated[i] = { ...updated[i], status: 'error', error: 'Error de red' }
        }
        setItems([...updated])
      })
    )

    setUploading(false)
    const urls = updated.filter((it) => it.status === 'done' && it.url).map((it) => it.url!)
    if (urls.length > 0) onDone(urls)
  }

  const pending = items.filter((it) => it.status === 'pending').length
  const done = items.filter((it) => it.status === 'done').length
  const errors = items.filter((it) => it.status === 'error').length

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={!uploading ? onCancel : undefined} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-6 flex flex-col gap-4 max-h-[90vh]">

        <div className="flex items-center justify-between flex-shrink-0">
          <div>
            <h3 className="font-playfair font-bold text-[#6b3d50]">Subir modelos</h3>
            {items.length > 0 && (
              <p className="text-xs text-gray-400 mt-0.5">
                {items.length} foto{items.length !== 1 ? 's' : ''} seleccionada{items.length !== 1 ? 's' : ''}
                {done > 0 && ` · ${done} subida${done !== 1 ? 's' : ''}`}
                {errors > 0 && ` · ${errors} con error`}
              </p>
            )}
          </div>
          {!uploading && (
            <button onClick={onCancel} className="p-1 rounded-lg hover:bg-gray-100 cursor-pointer">
              <X size={18} className="text-gray-400" />
            </button>
          )}
        </div>

        {/* Drop zone / selector */}
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="w-full py-8 rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-2 hover:border-[#d4768a] hover:bg-pink-50/30 transition-colors cursor-pointer disabled:opacity-40 flex-shrink-0"
        >
          <Upload size={22} className="text-gray-300" />
          <span className="text-sm text-gray-400 font-medium">Tocá para agregar fotos</span>
          <span className="text-xs text-gray-300">Podés seleccionar varias a la vez · JPG, PNG o WebP</span>
        </button>

        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/webp"
          multiple
          className="hidden"
          onChange={(e) => { if (e.target.files?.length) addFiles(e.target.files); e.target.value = '' }}
        />

        {/* Preview grid */}
        {items.length > 0 && (
          <div className="overflow-y-auto flex-1 -mx-1 px-1">
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
              {items.map((item, i) => (
                <div key={i} className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.preview} alt="" className="w-full h-full object-cover" />

                  {/* Status overlay */}
                  {item.status === 'uploading' && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    </div>
                  )}
                  {item.status === 'done' && (
                    <div className="absolute inset-0 bg-green-500/20 flex items-center justify-center">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <Check size={13} className="text-white" />
                      </div>
                    </div>
                  )}
                  {item.status === 'error' && (
                    <div className="absolute inset-0 bg-red-500/20 flex items-center justify-center">
                      <span className="text-red-600 text-lg font-bold">!</span>
                    </div>
                  )}

                  {/* Remove (solo pending) */}
                  {item.status === 'pending' && !uploading && (
                    <button
                      onClick={() => removeItem(i)}
                      className="absolute top-1 right-1 w-5 h-5 bg-black/50 rounded-full flex items-center justify-center cursor-pointer hover:bg-black/70"
                    >
                      <X size={10} className="text-white" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        {items.length > 0 && (
          <div className="flex gap-2 flex-shrink-0">
            {!uploading && (
              <button
                onClick={onCancel}
                className="flex-1 px-4 py-2 rounded-lg border border-gray-200 text-sm text-gray-500 hover:bg-gray-50 cursor-pointer"
              >
                Cancelar
              </button>
            )}
            <Button
              className="flex-1"
              onClick={uploadAll}
              disabled={uploading || pending === 0}
            >
              {uploading
                ? `Subiendo ${done}/${items.length}...`
                : `Subir ${pending} foto${pending !== 1 ? 's' : ''}`}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

// ── Name + color editor modal ──────────────────────────────────────────────────

function NameModal({
  initial,
  initialColor,
  photo,
  onSave,
  onCancel,
}: {
  initial: string
  initialColor?: string | null
  photo: string
  onSave: (name: string, color: string | null) => void
  onCancel: () => void
}) {
  const [name, setName] = useState(initial)
  const [color, setColor] = useState<string | null>(initialColor ?? null)
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onCancel} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 space-y-4">
        <h3 className="font-playfair font-bold text-[#6b3d50]">Editar modelo</h3>
        <div className="aspect-video rounded-xl overflow-hidden bg-gray-100">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={photo} alt="" className="w-full h-full object-cover" />
        </div>
        <input
          autoFocus
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && onSave(name, color)}
          placeholder='Ej: "Rosado con estrella y cuentas blancas"'
          className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-[#d4768a]"
        />

        {/* Color picker */}
        <div>
          <p className="text-xs text-gray-400 mb-2">Color predominante</p>
          <div className="flex gap-2 flex-wrap">
            {COLORS.map((c) => (
              <button
                key={c.value}
                type="button"
                onClick={() => setColor(color === c.value ? null : c.value)}
                title={c.label}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs transition-all cursor-pointer ${
                  color === c.value
                    ? 'ring-2 ring-[#d4768a] ring-offset-1 font-semibold text-[#6b3d50]'
                    : 'text-gray-500 hover:bg-gray-50'
                }`}
                style={{ border: '1px solid #e5e7eb' }}
              >
                <span
                  className="w-3.5 h-3.5 rounded-full"
                  style={{
                    background: c.hex,
                    border: c.border ? '1px solid #D4B8C0' : 'none',
                  }}
                />
                {c.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-2">
          <button onClick={onCancel} className="flex-1 px-4 py-2 rounded-lg border border-gray-200 text-sm text-gray-500 hover:bg-gray-50 cursor-pointer">
            Cancelar
          </button>
          <Button className="flex-1" onClick={() => onSave(name, color)}>
            Guardar
          </Button>
        </div>
      </div>
    </div>
  )
}

// ── Main ───────────────────────────────────────────────────────────────────────

export default function ModelsClient({ initialModels }: { initialModels: Model[] }) {
  const [models, setModels] = useState<Model[]>(initialModels)
  const [showUploader, setShowUploader] = useState(false)

  async function handleUploadsDone(urls: string[]) {
    setShowUploader(false)
    // Crear todos los modelos en paralelo con nombre vacío
    const results = await Promise.all(
      urls.map((url) =>
        fetch('/api/admin/models', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ photo: url, name: '' }),
        }).then((r) => r.json())
      )
    )
    const newModels = results
      .filter((d) => d.success && d.data)
      .map((d) => d.data)
    if (newModels.length > 0) {
      setModels((prev) => [...newModels.reverse(), ...prev])
    }
  }

  async function toggleActive(model: Model) {
    const newVal = !model.is_active
    setModels((prev) => prev.map((m) => m.id === model.id ? { ...m, is_active: newVal } : m))
    await fetch(`/api/admin/models/${model.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ is_active: newVal }),
    })
  }

  async function deleteModel(id: string) {
    if (!confirm('¿Eliminar este modelo?')) return
    setModels((prev) => prev.filter((m) => m.id !== id))
    await fetch(`/api/admin/models/${id}`, { method: 'DELETE' })
  }

  async function updateModel(model: Model, name: string, color: string | null) {
    setModels((prev) => prev.map((m) => m.id === model.id ? { ...m, name, color } : m))
    await fetch(`/api/admin/models/${model.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, color }),
    })
  }

  return (
    <>
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-playfair text-2xl font-bold text-[#6b3d50]">
              Modelos <span className="text-base font-normal text-gray-400">({models.filter(m => m.is_active).length} activos)</span>
            </h1>
            <p className="text-sm text-gray-400 mt-0.5">
              Fotos de portachupetes terminados que los clientes usan de referencia al comprar
            </p>
          </div>
          <Button size="sm" onClick={() => setShowUploader(true)} className="flex items-center gap-2">
            <Plus size={15} /> Subir modelo
          </Button>
        </div>

        {models.length === 0 ? (
          <div className="text-center py-24 text-gray-400">
            <div className="text-5xl mb-4">📸</div>
            <p className="text-lg font-medium">Todavía no hay modelos</p>
            <p className="text-sm mt-1">Subí la primera foto con el botón de arriba</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
            {models.map((model) => (
              <ModelCard
                key={model.id}
                model={model}
                onToggle={() => toggleActive(model)}
                onDelete={() => deleteModel(model.id)}
                onUpdate={(name, color) => updateModel(model, name, color)}
              />
            ))}
          </div>
        )}
      </div>

      {showUploader && (
        <MultiUploader
          onDone={handleUploadsDone}
          onCancel={() => setShowUploader(false)}
        />
      )}
    </>
  )
}

// ── Card ───────────────────────────────────────────────────────────────────────

function ModelCard({
  model,
  onToggle,
  onDelete,
  onUpdate,
}: {
  model: Model
  onToggle: () => void
  onDelete: () => void
  onUpdate: (name: string, color: string | null) => void
}) {
  const [editing, setEditing] = useState(false)
  const colorMeta = COLORS.find((c) => c.value === model.color)

  return (
    <>
      <div className={`group relative rounded-2xl overflow-hidden border-2 transition-all ${model.is_active ? 'border-transparent' : 'border-dashed border-gray-200 opacity-60'}`}>
        {/* Photo */}
        <div className="aspect-square bg-gray-100 relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={model.photo} alt={model.name} className="w-full h-full object-cover" />

          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-200 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
            <button
              onClick={onToggle}
              title={model.is_active ? 'Desactivar' : 'Activar'}
              className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow cursor-pointer hover:bg-white transition-colors"
            >
              {model.is_active ? <EyeOff size={14} className="text-gray-600" /> : <Eye size={14} className="text-green-600" />}
            </button>
            <button
              onClick={onDelete}
              title="Eliminar"
              className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow cursor-pointer hover:bg-red-50 transition-colors"
            >
              <Trash2 size={14} className="text-red-500" />
            </button>
          </div>

          {/* Color dot */}
          {colorMeta && (
            <div
              className="absolute top-2 right-2 w-4 h-4 rounded-full shadow ring-1 ring-white/60"
              style={{ background: colorMeta.hex, border: colorMeta.border ? '1px solid #D4B8C0' : 'none' }}
              title={colorMeta.label}
            />
          )}

          {/* Inactive badge */}
          {!model.is_active && (
            <div className="absolute top-2 left-2 bg-gray-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
              Inactivo
            </div>
          )}
        </div>

        {/* Name + color */}
        <div
          className="p-2 bg-white cursor-pointer hover:bg-gray-50 transition-colors"
          onClick={() => setEditing(true)}
          title="Clic para editar"
        >
          <p className="text-xs text-gray-600 font-medium leading-tight truncate">
            {model.name || <span className="text-gray-300 italic">Sin nombre</span>}
          </p>
          <p className="text-[10px] text-gray-300 mt-0.5">
            {colorMeta ? colorMeta.label : 'clic para editar'}
          </p>
        </div>
      </div>

      {editing && (
        <NameModal
          initial={model.name}
          initialColor={model.color}
          photo={model.photo}
          onSave={(name, color) => { onUpdate(name, color); setEditing(false) }}
          onCancel={() => setEditing(false)}
        />
      )}
    </>
  )
}
