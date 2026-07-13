import { ShieldCheck, Truck, CreditCard, Repeat } from 'lucide-react'

const features = [
  { icon: CreditCard,   label: 'MercadoPago',    desc: 'Tarjeta y cuotas' },
  { icon: Repeat,       label: 'Transferencia',   desc: 'Bancaria y alias' },
  { icon: Truck,        label: 'Envío nacional',  desc: 'Andreani · Correo Argentino' },
  { icon: ShieldCheck,  label: 'Compra segura',   desc: 'Garantía Mimikids' },
]

export default function PaymentBanner() {
  return (
    <section className="bg-[#F6EEE9] border-y border-[#EDCCD5]/40 py-6">
      <div className="max-w-6xl mx-auto px-5">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-0 md:divide-x md:divide-[#EDCCD5]/60">
          {features.map((f) => (
            <div key={f.label} className="flex items-center gap-3 md:px-6 first:pl-0 last:pr-0">
              <f.icon size={18} className="text-[#C4687D] flex-shrink-0" strokeWidth={1.75} />
              <div>
                <p className="text-[0.8125rem] font-semibold text-[#2B1A20]">{f.label}</p>
                <p className="text-xs text-[#A58494]">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
