import type { Metadata } from 'next'
import Hero from '@/components/home/Hero'
import WhyMimikids from '@/components/home/WhyMimikids'
import HomeShopSection from '@/components/home/HomeShopSection'
import HowItWorks from '@/components/home/HowItWorks'
import ModelosPreview from '@/components/home/ModelosPreview'
import SobreNosotras from '@/components/home/SobreNosotras'
import Testimonials from '@/components/home/Testimonials'
import PaymentBanner from '@/components/home/PaymentBanner'
import DiaDelNinoSection from '@/components/home/DiaDelNinoSection'

export const dynamic = 'force-dynamic'

const DDN_DATE = new Date('2026-08-10T00:00:00-03:00')

export function generateMetadata(): Metadata {
  const isDdN = new Date() < DDN_DATE

  if (isDdN) {
    return {
      title: 'Regalo Día del Niño para Bebés · Portachupetes Personalizados · Mimikids',
      description: 'El mejor regalo para el Día del Niño: portachupetes artesanales personalizados con el nombre de tu bebé. 20% OFF · Pedí antes del 5/8 y recibís a tiempo · Envíos a toda Argentina.',
      keywords: [
        'regalo día del niño bebé',
        'portachupete personalizado día del niño',
        'regalo para bebé día del niño',
        'portachupetes personalizados argentina',
        'regalo bebé nombre',
        'portachupete artesanal argentina',
      ],
      openGraph: {
        title: 'Regalo Día del Niño · Portachupetes Personalizados con el nombre de tu bebé · Mimikids',
        description: 'Portachupetes artesanales personalizados con 20% OFF para el Día del Niño. Pedí antes del 5/8 y recibís a tiempo. Envíos a toda Argentina.',
        type: 'website',
      },
    }
  }

  return {}
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <DiaDelNinoSection />
      <WhyMimikids />
      <HomeShopSection />
      <HowItWorks />
      <ModelosPreview />
      <SobreNosotras />
      <Testimonials />
      <PaymentBanner />
    </>
  )
}
