'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Product, CartItemPersonalization } from '@/types'
import { useCartStore } from '@/store/cart'
import { formatPrice } from '@/lib/utils'
import { getLetterImage } from '@/lib/letter-images'
import Button from '@/components/ui/Button'
import { ShoppingBag, Minus, Plus, Check, ShieldCheck, MessageCircle } from 'lucide-react'

// ─── Broche options ───────────────────────────────────────────────────────────

interface BrocheOption {
  id: string
  name: string
  material: 'plastico' | 'madera'
  emoji: string
  color?: string
  image?: string
}

const BROCHES: BrocheOption[] = [
  { id: 'plastico-blanco',  name: 'Blanco',  material: 'plastico', emoji: '🤍', color: '#F5F5F5', image: '/brocheblanco.webp' },
  { id: 'plastico-celeste', name: 'Celeste', material: 'plastico', emoji: '💙', color: '#B8DFF5', image: '/brocheceleste.webp' },
  { id: 'plastico-rosa',    name: 'Rosa',    material: 'plastico', emoji: '🩷', color: '#F9C4D2', image: '/brocherosa.webp' },
  { id: 'plastico-menta',   name: 'Menta',   material: 'plastico', emoji: '💚', color: '#C8EFE3', image: '/brochementa.webp' },
  { id: 'madera-redondo',   name: 'Redondo', material: 'madera',   emoji: '🟤' },
  { id: 'madera-osito',     name: 'Osito',   material: 'madera',   emoji: '🐻' },
]

// ─── Letter style bead colors ─────────────────────────────────────────────────

const LETTER_STYLE_COLORS: Record<string, { bg: string; text: string; border: string; isWood: boolean }> = {
  'silicona-blanca':  { bg: '#FFFFFF',  text: '#A58494', border: '#EDCCD5', isWood: false },
  'silicona-beige':   { bg: '#F5E6D3',  text: '#8a6a50', border: '#e0cbb8', isWood: false },
  'silicona-rosa':    { bg: '#EDCCD5',  text: '#9b3a52', border: '#C4687D', isWood: false },
  'silicona-celeste': { bg: '#B8DFF5',  text: '#2a6a90', border: '#90c8e8', isWood: false },
  madera:             { bg: '#D4A574',  text: '#5a3a1a', border: '#b8864a', isWood: true },
}

const WHATSAPP_NUMBER = '5491112345678' // 👈 reemplazar con el número real

// ─── LetterBead ───────────────────────────────────────────────────────────────

function LetterBead({
  char,
  letterStyleId,
  isPlaceholder = false,
}: {
  char: string
  letterStyleId: string | undefined
  isPlaceholder?: boolean
}) {
  const [imgError, setImgError] = useState(false)
  const imgUrl = letterStyleId ? getLetterImage(letterStyleId, char) : null
  const showImg = !!imgUrl && !imgError
  const defaultStyle = { bg: '#F9C4D2', text: '#9b3a52', border: '#f0a0b8', isWood: false }
  const style = letterStyleId ? (LETTER_STYLE_COLORS[letterStyleId] ?? defaultStyle) : defaultStyle

  return (
    <div
      className={`w-9 h-9 overflow-hidden flex items-center justify-center text-xs font-black transition-all duration-200 ${
        style.isWood ? 'rounded-md' : 'rounded-full'
      } ${isPlaceholder ? 'opacity-30' : 'opacity-100'}`}
      style={{
        backgroundColor: showImg ? undefined : style.bg,
        color: style.text,
        border: `2px solid ${style.border}`,
        boxShadow: `0 1px 3px ${style.border}60`,
      }}
    >
      {showImg ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={imgUrl}
          alt={char}
          className="w-full h-full object-contain p-0.5"
          onError={() => setImgError(true)}
        />
      ) : (
        char
      )}
    </div>
  )
}

// ─── NameBeads ────────────────────────────────────────────────────────────────

function NameBeads({ name, letterStyleId }: { name: string; letterStyleId: string | undefined }) {
  const display = name.trim() ? name.toUpperCase() : 'NOMBRE'
  const isPlaceholder = !name.trim()

  return (
    <div className="flex items-center gap-1.5 flex-wrap">
      {display.split('').map((char, i) => (
        <LetterBead
          key={`${char}-${i}`}
          char={char}
          letterStyleId={letterStyleId}
          isPlaceholder={isPlaceholder}
        />
      ))}
    </div>
  )
}

// ─── BpaBadge ─────────────────────────────────────────────────────────────────

function BpaBadge() {
  return (
    <div className="flex items-center gap-2 bg-[#e8f7f0] text-[#2d7a5e] rounded-full px-3 py-1.5 text-xs font-semibold border border-[#BDE8D6]">
      <ShieldCheck size={13} className="flex-shrink-0" />
      Silicona alimenticia · Libre de BPA
    </div>
  )
}

// ─── BrocheCard ───────────────────────────────────────────────────────────────

function BrocheCard({
  option,
  selected,
  onSelect,
}: {
  option: BrocheOption
  selected: boolean
  onSelect: () => void
}) {
  return (
    <button
      onClick={onSelect}
      className={`relative flex flex-col items-center gap-1.5 p-3 rounded-2xl border-2 transition-all duration-200 cursor-pointer active:scale-[0.97] ${
        selected
          ? 'border-[#C4687D] bg-[#FAF0F3] shadow-md'
          : 'border-[#EDCCD5]/40 bg-white hover:border-[#EDCCD5] hover:bg-[#FFFAF7]'
      }`}
    >
      {selected && (
        <div className="absolute top-1.5 right-1.5 w-4 h-4 bg-[#C4687D] rounded-full flex items-center justify-center">
          <Check size={9} className="text-white" />
        </div>
      )}
      <div className="w-10 h-10 rounded-full overflow-hidden shadow-sm flex-shrink-0">
        {option.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={option.image} alt={option.name} className="w-full h-full object-cover" />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center text-xl"
            style={
              option.color
                ? { backgroundColor: option.color, border: '2px solid rgba(0,0,0,0.06)' }
                : { background: 'linear-gradient(135deg, #D4A574, #A0724A)' }
            }
          >
            {option.emoji}
          </div>
        )}
      </div>
      <span
        className={`text-xs font-semibold text-center leading-tight ${
          selected ? 'text-[#C4687D]' : 'text-[#6D4D5A]'
        }`}
      >
        {option.name}
      </span>
    </button>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

interface PersonalizationFormProps {
  product: Product
}

export default function PersonalizationForm({ product }: PersonalizationFormProps) {
  const router = useRouter()
  const addItem = useCartStore((s) => s.addItem)

  const [selectedBroche, setSelectedBroche] = useState<BrocheOption | null>(null)
  const [nombre, setNombre] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  const letterStyleId = product.letter_style
  const nombreValido = nombre.trim().length > 0 && nombre.trim().length <= 12
  const isComplete = !!selectedBroche && nombreValido

  function handleNombreChange(val: string) {
    const clean = val.replace(/[^a-záéíóúüñA-ZÁÉÍÓÚÜÑ\s]/g, '').slice(0, 12)
    setNombre(clean)
  }

  function handleAdd() {
    if (!isComplete || !selectedBroche) return

    const personalization: CartItemPersonalization = {
      broche: selectedBroche.id,
      brocheName: `${selectedBroche.material === 'plastico' ? 'Plástico' : 'Madera'} ${selectedBroche.name}`,
      nombre: nombre.trim(),
    }

    addItem(product, personalization, quantity)
    setAdded(true)
    setTimeout(() => router.push('/cart'), 700)
  }

  const whatsappMsg = encodeURIComponent(
    `Hola! Me interesa el ${product.name}. Quiero coordinar la decoración 🤍`
  )

  const brochesByMaterial = {
    plastico: BROCHES.filter((b) => b.material === 'plastico'),
    madera: BROCHES.filter((b) => b.material === 'madera'),
  }

  return (
    <div className="space-y-5">
      <BpaBadge />

      {/* ── Broche ─────────────────────────────────────────────────── */}
      <div>
        <p className="text-sm font-semibold text-[#2B1A20] mb-3">1. Elegí el broche</p>
        <div className="space-y-3">
          <div>
            <p className="text-xs font-bold text-[#A58494] uppercase tracking-widest mb-2">Plástico</p>
            <div className="grid grid-cols-4 gap-2">
              {brochesByMaterial.plastico.map((b) => (
                <BrocheCard
                  key={b.id}
                  option={b}
                  selected={selectedBroche?.id === b.id}
                  onSelect={() => setSelectedBroche(b)}
                />
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-bold text-[#A58494] uppercase tracking-widest mb-2">Madera</p>
            <div className="grid grid-cols-2 gap-2">
              {brochesByMaterial.madera.map((b) => (
                <BrocheCard
                  key={b.id}
                  option={b}
                  selected={selectedBroche?.id === b.id}
                  onSelect={() => setSelectedBroche(b)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Nombre ─────────────────────────────────────────────────── */}
      <div>
        <label className="block text-sm font-semibold text-[#2B1A20] mb-2">
          2. Nombre del bebé
        </label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => handleNombreChange(e.target.value)}
          placeholder="Ej: Valentina"
          className="w-full px-4 py-3 rounded-xl border-2 border-[#EDCCD5]/50 focus:border-[#C4687D] focus:outline-none bg-white text-[#2B1A20] placeholder-[#A58494] transition-colors text-lg font-medium"
        />
        <div className="flex justify-between mt-1.5">
          <p className="text-xs text-[#A58494]">Solo letras, sin números ni símbolos</p>
          <p className={`text-xs font-medium ${nombre.length >= 12 ? 'text-[#C4687D]' : 'text-[#A58494]'}`}>
            {nombre.length}/12
          </p>
        </div>
      </div>

      {/* ── WhatsApp note ────────────────────────────────────────────── */}
      <div className="bg-[#e8f7f0] rounded-2xl p-4 border border-[#C8EFE3]/60">
        <p className="text-sm font-semibold text-[#2d7a5e] mb-1">
          🤍 El resto lo coordinamos por WhatsApp
        </p>
        <p className="text-xs text-[#4a9a7a] mb-3">
          Colores de cuentas, cantidad de letras decorativas, disposición... ¡Nos encanta ayudarte a crear algo único!
        </p>
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMsg}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#25D366] text-white text-xs font-semibold px-4 py-2 rounded-full hover:bg-[#20b858] transition-colors"
        >
          <MessageCircle size={13} />
          Consultar por WhatsApp
        </a>
      </div>

      {/* ── Qty + Price + CTA ───────────────────────────────────────── */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-9 h-9 rounded-full bg-[#EDCCD5]/30 hover:bg-[#EDCCD5]/60 flex items-center justify-center transition-colors cursor-pointer"
            >
              <Minus size={15} className="text-[#6D4D5A]" />
            </button>
            <span className="font-playfair text-xl font-bold text-[#2B1A20] w-7 text-center">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-9 h-9 rounded-full bg-[#EDCCD5]/30 hover:bg-[#EDCCD5]/60 flex items-center justify-center transition-colors cursor-pointer"
            >
              <Plus size={15} className="text-[#6D4D5A]" />
            </button>
          </div>
          <p className="font-playfair text-2xl font-bold text-[#C4687D]">
            {formatPrice(product.price * quantity)}
          </p>
        </div>

        <Button onClick={handleAdd} disabled={!isComplete || added} size="lg" className="w-full">
          {added ? (
            <>
              <Check size={18} className="mr-2" />
              ¡Agregado!
            </>
          ) : (
            <>
              <ShoppingBag size={18} className="mr-2" />
              {isComplete
                ? 'Agregar al carrito'
                : !selectedBroche
                ? 'Elegí un broche para continuar'
                : 'Escribí el nombre del bebé'}
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
