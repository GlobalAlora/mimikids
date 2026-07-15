import Hero from '@/components/home/Hero'
import WhyMimikids from '@/components/home/WhyMimikids'
import HomeShopSection from '@/components/home/HomeShopSection'
import HowItWorks from '@/components/home/HowItWorks'
import ModelosPreview from '@/components/home/ModelosPreview'
import SobreNosotras from '@/components/home/SobreNosotras'
import Testimonials from '@/components/home/Testimonials'
import PaymentBanner from '@/components/home/PaymentBanner'

export const dynamic = 'force-dynamic'

export default function HomePage() {
  return (
    <>
      <Hero />
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
