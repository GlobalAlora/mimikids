import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import WhatsAppButton from '@/components/ui/WhatsAppButton'
import DiaDelNinoBanner from '@/components/home/DiaDelNinoBanner'

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <DiaDelNinoBanner />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
