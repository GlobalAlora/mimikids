import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import Script from 'next/script'
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

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://mimikids.com.ar'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Mimikids · Portachupetes Personalizados con el Nombre de tu Bebé',
    template: '%s · Mimikids',
  },
  description:
    'Portachupetes artesanales 100% personalizados con el nombre de tu bebé. Silicona grado alimentario, letras en madera o silicona. Envíos a todo Argentina desde Trenque Lauquen.',
  keywords: [
    'portachupete personalizado',
    'portachupetes artesanales',
    'portachupete con nombre',
    'regalo bebé personalizado',
    'baby shower Argentina',
    'portachupete silicona',
    'portachupete letras madera',
    'portachupete Trenque Lauquen',
    'portachupete Buenos Aires',
    'mimikids',
  ],
  authors: [{ name: 'Mimikids', url: siteUrl }],
  creator: 'Mimikids',
  publisher: 'Mimikids',
  alternates: { canonical: siteUrl },
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    url: siteUrl,
    siteName: 'Mimikids',
    title: 'Mimikids · Portachupetes Personalizados con el Nombre de tu Bebé',
    description:
      'Portachupetes artesanales personalizados con el nombre de tu bebé. Silicona grado alimentario. Envíos a todo Argentina.',
    images: [
      {
        url: '/mimikids.jpg',
        width: 1080,
        height: 1080,
        alt: 'Mimikids · Portachupetes Personalizados',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mimikids · Portachupetes Personalizados',
    description: 'Portachupetes artesanales personalizados con el nombre de tu bebé.',
    images: ['/mimikids.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  icons: {
    icon: '/mimikids.jpg',
    apple: '/mimikids.jpg',
  },
  verification: {
    google: undefined,
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${siteUrl}/#organization`,
      name: 'Mimikids',
      url: siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/mimikids.jpg`,
        width: 1080,
        height: 1080,
      },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+54-3388-673629',
        contactType: 'customer service',
        availableLanguage: 'Spanish',
      },
      sameAs: ['https://www.instagram.com/mimikids_arg/'],
    },
    {
      '@type': 'LocalBusiness',
      '@id': `${siteUrl}/#localbusiness`,
      name: 'Mimikids',
      description:
        'Portachupetes artesanales personalizados con el nombre de tu bebé. Fabricados en Trenque Lauquen, Buenos Aires, Argentina.',
      url: siteUrl,
      telephone: '+54-3388-673629',
      image: `${siteUrl}/mimikids.jpg`,
      priceRange: '$$',
      currenciesAccepted: 'ARS',
      paymentAccepted: 'Transferencia bancaria',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Trenque Lauquen',
        addressRegion: 'Buenos Aires',
        addressCountry: 'AR',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: -35.9727,
        longitude: -62.7296,
      },
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
      hasMap: 'https://maps.google.com/?q=Trenque+Lauquen+Buenos+Aires+Argentina',
    },
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: 'Mimikids',
      description: 'Portachupetes artesanales personalizados',
      publisher: { '@id': `${siteUrl}/#organization` },
      potentialAction: {
        '@type': 'SearchAction',
        target: { '@type': 'EntryPoint', urlTemplate: `${siteUrl}/shop?q={search_term_string}` },
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: '¿Cuánto tarda la producción de un portachupete personalizado?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'El tiempo de producción es de 1 a 2 días hábiles. Una vez confirmado el pago, comenzamos a fabricar tu portachupete artesanalmente.',
          },
        },
        {
          '@type': 'Question',
          name: '¿A qué zonas hacen envíos?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Realizamos envíos a todo Argentina a través de Andreani, tanto a domicilio como a sucursal. También ofrecemos retiro en persona en Trenque Lauquen, Buenos Aires.',
          },
        },
        {
          '@type': 'Question',
          name: '¿Los materiales son seguros para bebés?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Sí. Usamos cuentas de silicona grado alimentario, letras de silicona o madera de haya natural, y clips de madera de haya. Todos los materiales son 100% seguros y certificados para bebés.',
          },
        },
        {
          '@type': 'Question',
          name: '¿Cómo se paga?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Aceptamos transferencia bancaria. Una vez confirmada la transferencia, comenzamos la producción.',
          },
        },
        {
          '@type': 'Question',
          name: '¿Puedo personalizar el portachupete con el nombre de mi bebé?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Sí, todos nuestros portachupetes se personalizan con el nombre de tu bebé. Podés elegir el estilo de letras (blancas, beige, rosa, celeste o madera) y el tipo de broche.',
          },
        },
      ],
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        {children}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-PMEMN74TZY" strategy="afterInteractive" />
        <Script id="ga4" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-PMEMN74TZY');
        `}</Script>
      </body>
    </html>
  )
}
