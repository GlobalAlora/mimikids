import Hero from '@/components/home/Hero'
import WhyMimikids from '@/components/home/WhyMimikids'
import FeaturedProducts from '@/components/home/FeaturedProducts'
import HowItWorks from '@/components/home/HowItWorks'
import Testimonials from '@/components/home/Testimonials'
import PaymentBanner from '@/components/home/PaymentBanner'

export default function HomePage() {
  return (
    <>
      <Hero />
      <WhyMimikids />
      <FeaturedProducts />
      <HowItWorks />
      <Testimonials />
      <PaymentBanner />
    </>
  )
}
