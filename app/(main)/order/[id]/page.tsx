import Link from 'next/link'
import Button from '@/components/ui/Button'
import { CheckCircle, Copy, ArrowRight, Building2 } from 'lucide-react'
import { createServerClient } from '@/lib/supabase-server'

interface Props {
  params: Promise<{ id: string }>
  searchParams: Promise<{ order_number?: string }>
}

async function getTransferSettings() {
  try {
    const supabase = createServerClient()
    const { data } = await supabase.from('settings').select('key, value')
    return Object.fromEntries((data ?? []).map(({ key, value }: { key: string; value: string }) => [key, value]))
  } catch {
    return {}
  }
}

export default async function OrderConfirmationPage({ params, searchParams }: Props) {
  const { id } = await params
  const { order_number } = await searchParams
  const settings = await getTransferSettings()

  const cbu = settings.transfer_cbu || '—'
  const alias = settings.transfer_alias || '—'
  const bank = settings.transfer_bank || ''
  const holder = settings.transfer_holder || '—'

  return (
    <div className="min-h-screen bg-[#FFFAF7] flex items-center justify-center px-5 py-20">
      <div className="max-w-lg w-full">

        {/* Success header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-[#BDE8D6] rounded-full flex items-center justify-center mx-auto mb-5">
            <CheckCircle size={40} className="text-[#3d9e78]" />
          </div>
          <h1 className="font-playfair text-3xl font-bold text-[#2B1A20] mb-2">
            ¡Pedido confirmado!
          </h1>
          <p className="text-[#A58494]">
            Gracias por tu compra. Te enviamos un email con los detalles.
          </p>
        </div>

        {/* Order number */}
        <div className="bg-white rounded-2xl p-5 border border-[#EDCCD5]/30 shadow-[0_2px_12px_rgba(43,26,32,0.05)] mb-4 text-center">
          <p className="text-xs text-[#A58494] uppercase tracking-wider mb-1">
            Número de pedido
          </p>
          <div className="flex items-center justify-center gap-2">
            <p className="font-playfair text-xl font-bold text-[#C4687D]">
              {order_number || `MK-${id.slice(0, 8).toUpperCase()}`}
            </p>
            <button className="p-1 rounded-md hover:bg-[#EDCCD5]/30 transition-colors cursor-pointer">
              <Copy size={14} className="text-[#A58494]" />
            </button>
          </div>
        </div>

        {/* Transfer info */}
        <div className="bg-gradient-to-br from-[#f0faf5] to-[#e8f7f0] rounded-2xl p-6 border border-[#BDE8D6]/50 mb-4">
          <div className="flex items-center gap-3 mb-4">
            <Building2 size={20} className="text-[#3d9e78]" />
            <h2 className="font-bold text-[#2d6b50]">Datos para transferencia</h2>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-[#A58494]">CBU</span>
              <span className="font-mono font-semibold text-[#2d6b50]">{cbu}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#A58494]">Alias</span>
              <span className="font-semibold text-[#2d6b50]">{alias}</span>
            </div>
            {bank && (
              <div className="flex justify-between">
                <span className="text-[#A58494]">Banco</span>
                <span className="font-semibold text-[#2d6b50]">{bank}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-[#A58494]">Titular</span>
              <span className="font-semibold text-[#2d6b50]">{holder}</span>
            </div>
          </div>
          <div className="mt-4 p-3 bg-white/70 rounded-xl">
            <p className="text-xs text-[#3d9e78] font-medium">
              ✓ Una vez acreditado el pago, comenzamos la producción de tu pedido.
              Te avisamos por email cuando confirmemos la transferencia.
            </p>
          </div>
        </div>

        {/* Production info */}
        <div className="bg-white rounded-2xl p-5 border border-[#EDCCD5]/30 shadow-[0_2px_12px_rgba(43,26,32,0.05)] mb-6">
          <h3 className="font-semibold text-[#2B1A20] mb-3">¿Qué sigue?</h3>
          <ol className="space-y-2 text-sm text-[#A58494]">
            <li className="flex gap-2">
              <span className="text-[#C4687D] font-bold">1.</span>
              Realizá la transferencia con los datos de arriba
            </li>
            <li className="flex gap-2">
              <span className="text-[#C4687D] font-bold">2.</span>
              Confirmamos tu pago y comenzamos a producir tu portachupete artesanalmente
              (1–2 días hábiles)
            </li>
            <li className="flex gap-2">
              <span className="text-[#C4687D] font-bold">3.</span>
              Te enviamos el número de seguimiento por email
            </li>
            <li className="flex gap-2">
              <span className="text-[#C4687D] font-bold">4.</span>
              ¡Tu portachupete llega a tu puerta!
            </li>
          </ol>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link href="/shop" className="flex-1">
            <Button variant="outline" className="w-full">
              Seguir comprando
            </Button>
          </Link>
          <Link href="/" className="flex-1">
            <Button className="w-full group">
              Ir al inicio
              <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

      </div>
    </div>
  )
}
