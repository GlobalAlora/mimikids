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
import NavidadSection from '@/components/home/NavidadSection'

export const dynamic = 'force-dynamic'

const DDN_DATE = new Date('2026-08-16T00:00:00-03:00')
const NAVIDAD_DATE = new Date('2026-12-25T00:00:00-03:00')

export function generateMetadata(): Metadata {
  const now = new Date()
  const isDdN = now < DDN_DATE
  const isNavidad = now < NAVIDAD_DATE

  const canonical = { alternates: { canonical: 'https://mimikids.com.ar' } }

  if (isDdN) {
    return {
      ...canonical,
      title: { absolute: 'Regalo Día del Niño para Bebés — Portachupetes Personalizados | Mimikids' },
      description: 'El mejor regalo para el Día del Niño: portachupetes artesanales personalizados con el nombre de tu bebé. 20% OFF · Pedí antes del 10/8 y recibís a tiempo · Envíos a toda Argentina.',
      keywords: [
        'regalo día del niño bebé',
        'portachupete personalizado día del niño',
        'regalo para bebé día del niño',
        'portachupetes personalizados argentina',
        'regalo bebé nombre',
        'portachupete artesanal argentina',
      ],
      openGraph: {
        title: 'Regalo Día del Niño — Portachupetes Personalizados con el nombre de tu bebé | Mimikids',
        description: 'Portachupetes artesanales personalizados con 20% OFF para el Día del Niño. Pedí antes del 10/8 y recibís a tiempo. Envíos a toda Argentina.',
        type: 'website',
      },
    }
  }

  if (isNavidad) {
    return {
      ...canonical,
      title: { absolute: 'Regalo de Navidad para Bebés — Portachupetes Personalizados | Mimikids' },
      description: 'El regalo de Navidad más especial para bebés: portachupetes artesanales personalizados con el nombre de tu bebé. 20% OFF · Pedí antes del 20/12 y llegás a tiempo · Envíos a toda Argentina.',
      keywords: [
        'regalo navidad bebé',
        'portachupete personalizado navidad',
        'regalo navidad personalizado bebé',
        'portachupetes personalizados argentina',
        'regalo bebé nombre navidad',
        'portachupete artesanal argentina',
        'canasta navidad bebé',
        'regalo navidad para bebé recién nacido',
      ],
      openGraph: {
        title: 'Regalo de Navidad — Portachupetes Personalizados con el nombre de tu bebé | Mimikids',
        description: 'Portachupetes artesanales personalizados con 20% OFF para Navidad. Pedí antes del 20/12 y llegás a tiempo. Envíos a toda Argentina.',
        type: 'website',
      },
    }
  }

  return canonical
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <DiaDelNinoSection />
      <NavidadSection />
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
