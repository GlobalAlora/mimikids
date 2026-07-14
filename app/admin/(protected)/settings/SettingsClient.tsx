'use client'

import { useState } from 'react'
import { Save, Building2 } from 'lucide-react'
import Button from '@/components/ui/Button'

interface Settings {
  transfer_cbu: string
  transfer_alias: string
  transfer_bank: string
  transfer_holder: string
}

export default function SettingsClient({ initial }: { initial: Settings }) {
  const [form, setForm] = useState<Settings>(initial)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  async function handleSave() {
    setSaving(true)
    setSaved(false)
    await fetch('/api/admin/settings', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const INPUT = 'w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-[#d4768a] transition-colors bg-white'
  const LABEL = 'text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block'

  return (
    <div className="p-8 max-w-2xl">
      <h1 className="font-playfair text-2xl font-bold text-[#6b3d50] mb-2">Configuración</h1>
      <p className="text-sm text-gray-400 mb-8">Estos datos se muestran al comprador en la página de confirmación del pedido.</p>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
          <Building2 size={16} className="text-[#d4768a]" />
          <h2 className="font-semibold text-gray-800 text-sm">Datos para transferencia bancaria</h2>
        </div>

        <div className="p-6 space-y-5">
          <div>
            <label className={LABEL}>CBU</label>
            <input
              className={INPUT + ' font-mono'}
              value={form.transfer_cbu}
              onChange={(e) => setForm((f) => ({ ...f, transfer_cbu: e.target.value }))}
              placeholder="0000000000000000000000"
              maxLength={22}
            />
          </div>

          <div>
            <label className={LABEL}>Alias</label>
            <input
              className={INPUT}
              value={form.transfer_alias}
              onChange={(e) => setForm((f) => ({ ...f, transfer_alias: e.target.value.toUpperCase() }))}
              placeholder="MIMIKIDS.SHOP"
            />
          </div>

          <div>
            <label className={LABEL}>Banco</label>
            <input
              className={INPUT}
              value={form.transfer_bank}
              onChange={(e) => setForm((f) => ({ ...f, transfer_bank: e.target.value }))}
              placeholder="Banco Galicia"
            />
          </div>

          <div>
            <label className={LABEL}>Titular de la cuenta</label>
            <input
              className={INPUT}
              value={form.transfer_holder}
              onChange={(e) => setForm((f) => ({ ...f, transfer_holder: e.target.value }))}
              placeholder="Perriello Camila Rocio"
            />
          </div>
        </div>

        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
          {saved && (
            <p className="text-sm text-green-600 font-medium">✓ Guardado correctamente</p>
          )}
          {!saved && <span />}
          <Button onClick={handleSave} disabled={saving} className="flex items-center gap-2">
            <Save size={14} />
            {saving ? 'Guardando...' : 'Guardar cambios'}
          </Button>
        </div>
      </div>

      <div className="mt-6 bg-[#f0faf5] rounded-2xl p-5 border border-[#BDE8D6]/50">
        <p className="text-xs text-[#3d9e78] font-medium mb-2">Vista previa para el comprador</p>
        <div className="space-y-1.5 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">CBU</span>
            <span className="font-mono font-semibold text-[#2d6b50]">{form.transfer_cbu || '—'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Alias</span>
            <span className="font-semibold text-[#2d6b50]">{form.transfer_alias || '—'}</span>
          </div>
          {form.transfer_bank && (
            <div className="flex justify-between">
              <span className="text-gray-500">Banco</span>
              <span className="font-semibold text-[#2d6b50]">{form.transfer_bank}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-gray-500">Titular</span>
            <span className="font-semibold text-[#2d6b50]">{form.transfer_holder || '—'}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
