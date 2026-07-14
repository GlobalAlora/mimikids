import Hero from '@/components/home/Hero'
import WhyMimikids from '@/components/home/WhyMimikids'
import HomeShopSection from '@/components/home/HomeShopSection'
import HowItWorks from '@/components/home/HowItWorks'
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
      <Testimonials />
      <PaymentBanner />
    </>
  )
}
