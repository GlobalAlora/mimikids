'use client'

import { useState, useRef } from 'react'
import { Plus, Trash2, Eye, EyeOff, Upload, RefreshCw, X, Check } from 'lucide-react'
import Button from '@/components/ui/Button'

interface Model {
  id: string
  name: string
  photo: string
  is_active: boolean
  sort_order: number
}

// ── Upload slot ────────────────────────────────────────────────────────────────

function PhotoUploader({
  onUploaded,
  onCancel,
}: {
  onUploaded: (url: string) => void
  onCancel: () => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState('')
  const [error, setError] = useState('')

  async function handleFile(file: File) {
    setUploading(true)
    setError('')
    const fd = new FormData()
    fd.append('file', file)
    try {
      const res = await fetch('/api/admin/upload', { method: 'POST', body: fd })
      const data = await res.json()
      if (data.url) {
        setPreview(data.url)
      } else {
        setError(data.error || 'Error al subir')
      }
    } catch {
      setError('Error de red')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onCancel} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-playfair font-bold text-[#6b3d50]">Subir foto del modelo</h3>
          <button onClick={onCancel} className="p-1 rounded-lg hover:bg-gray-100 cursor-pointer">
            <X size={18} className="text-gray-400" />
          </button>
        </div>

        {/* Preview */}
        {preview ? (
          <div className="relative aspect-square rounded-xl overflow-hidden border-2 border-[#d4768a]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={preview} alt="preview" className="w-full h-full object-cover" />
            <button
              onClick={() => setPreview('')}
              className="absolute top-2 right-2 w-7 h-7 bg-white/90 rounded-full flex items-center justify-center shadow cursor-pointer hover:bg-white"
            >
              <X size={14} className="text-gray-600" />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="w-full aspect-square rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-2 hover:border-[#d4768a] hover:bg-pink-50/30 transition-colors cursor-pointer disabled:opacity-50"
          >
            {uploading ? (
              <>
                <div className="w-6 h-6 border-2 border-[#d4768a] border-t-transparent rounded-full animate-spin" />
                <span className="text-sm text-gray-400">Subiendo...</span>
              </>
            ) : (
              <>
                <Upload size={24} className="text-gray-300" />
                <span className="text-sm text-gray-400">Tocá para elegir una foto</span>
                <span className="text-xs text-gray-300">JPG, PNG o WebP · máx. 5 MB</span>
              </>
            )}
          </button>
        )}

        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/webp"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0]
            if (f) handleFile(f)
            e.target.value = ''
          }}
        />

        {error && <p className="text-sm text-red-500">{error}</p>}

        {preview && (
          <Button className="w-full" onClick={() => onUploaded(preview)}>
            <Check size={16} className="mr-2" /> Usar esta foto
          </Button>
        )}
      </div>
    </div>
  )
}

// ── Name editor modal ──────────────────────────────────────────────────────────

function NameModal({
  initial,
  photo,
  onSave,
  onCancel,
}: {
  initial: string
  photo: string
  onSave: (name: string) => void
  onCancel: () => void
}) {
  const [name, setName] = useState(initial)
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onCancel} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 space-y-4">
        <h3 className="font-playfair font-bold text-[#6b3d50]">Nombrar modelo</h3>
        <div className="aspect-video rounded-xl overflow-hidden bg-gray-100">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={photo} alt="" className="w-full h-full object-cover" />
        </div>
        <input
          autoFocus
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && onSave(name)}
          placeholder='Ej: "Rosado con estrella y cuentas blancas"'
          className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-[#d4768a]"
        />
        <div className="flex gap-2">
          <button onClick={onCancel} className="flex-1 px-4 py-2 rounded-lg border border-gray-200 text-sm text-gray-500 hover:bg-gray-50 cursor-pointer">
            Cancelar
          </button>
          <Button className="flex-1" onClick={() => onSave(name)}>
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
  const [pendingPhoto, setPendingPhoto] = useState('')
  const [saving, setSaving] = useState(false)

  async function handlePhotoUploaded(url: string) {
    setShowUploader(false)
    setPendingPhoto(url)
  }

  async function handleNameSaved(name: string) {
    if (!pendingPhoto) return
    setSaving(true)
    try {
      const res = await fetch('/api/admin/models', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ photo: pendingPhoto, name }),
      })
      const data = await res.json()
      if (data.success && data.data) {
        setModels((prev) => [data.data, ...prev])
      }
    } finally {
      setSaving(false)
      setPendingPhoto('')
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

  async function renameModel(model: Model, name: string) {
    setModels((prev) => prev.map((m) => m.id === model.id ? { ...m, name } : m))
    await fetch(`/api/admin/models/${model.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
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
                onRename={(name) => renameModel(model, name)}
              />
            ))}
          </div>
        )}
      </div>

      {showUploader && (
        <PhotoUploader
          onUploaded={handlePhotoUploaded}
          onCancel={() => setShowUploader(false)}
        />
      )}

      {pendingPhoto && (
        <NameModal
          initial=""
          photo={pendingPhoto}
          onSave={handleNameSaved}
          onCancel={() => setPendingPhoto('')}
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
  onRename,
}: {
  model: Model
  onToggle: () => void
  onDelete: () => void
  onRename: (name: string) => void
}) {
  const [editingName, setEditingName] = useState(false)

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

          {/* Active badge */}
          {!model.is_active && (
            <div className="absolute top-2 left-2 bg-gray-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
              Inactivo
            </div>
          )}
        </div>

        {/* Name */}
        <div
          className="p-2 bg-white cursor-pointer hover:bg-gray-50 transition-colors"
          onClick={() => setEditingName(true)}
          title="Clic para renombrar"
        >
          <p className="text-xs text-gray-600 font-medium leading-tight truncate">
            {model.name || <span className="text-gray-300 italic">Sin nombre</span>}
          </p>
          <p className="text-[10px] text-gray-300 mt-0.5">clic para renombrar</p>
        </div>
      </div>

      {editingName && (
        <NameModal
          initial={model.name}
          photo={model.photo}
          onSave={(name) => { onRename(name); setEditingName(false) }}
          onCancel={() => setEditingName(false)}
        />
      )}
    </>
  )
}
