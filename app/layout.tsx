import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800', '900'],
  variable: '--font-playfair',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Mimikids · Portachupetes Personalizados',
  description:
    'Portachupetes artesanales 100% personalizados con el nombre de tu bebé. Envíos a todo el país. Hecho con amor en Argentina.',
  keywords: 'portachupete personalizado, portachupetes artesanales, regalo bebé, baby shower',
  openGraph: {
    title: 'Mimikids · Portachupetes Personalizados',
    description: 'Portachupetes artesanales personalizados con el nombre de tu bebé.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${playfair.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col antialiased">
        {children}
      </body>
    </html>
  )
}
