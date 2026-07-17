import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import Script from 'next/script'
import LeadCapturePopup from '@/components/ui/LeadCapturePopup'
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
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
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
      '@type': 'HowTo',
      name: 'Cómo pedir un portachupete personalizado en Mimikids',
      description: 'Guía paso a paso para encargar tu portachupete artesanal personalizado con el nombre de tu bebé.',
      totalTime: 'PT5M',
      tool: [{ '@type': 'HowToTool', name: 'Computadora o celular con acceso a internet' }],
      step: [
        {
          '@type': 'HowToStep',
          name: 'Elegí tu portachupete',
          text: 'Explorá nuestra tienda y elegí el modelo de portachupete que más te guste. Podés filtrar por color o estilo.',
          url: `${siteUrl}/shop`,
          position: 1,
        },
        {
          '@type': 'HowToStep',
          name: 'Personalizá con el nombre de tu bebé',
          text: 'Ingresá el nombre de tu bebé y elegí el estilo de letras: silicona blanca, beige, rosa, celeste o madera de haya natural.',
          position: 2,
        },
        {
          '@type': 'HowToStep',
          name: 'Elegí tu modelo de referencia',
          text: 'Opcionalmente podés elegir un modelo de referencia para ver cómo quedaría el portachupete con el estilo elegido.',
          url: `${siteUrl}/modelos`,
          position: 3,
        },
        {
          '@type': 'HowToStep',
          name: 'Completá el checkout',
          text: 'Ingresá tus datos de contacto y dirección de envío. Revisá el resumen de tu pedido con el descuento aplicado.',
          position: 4,
        },
        {
          '@type': 'HowToStep',
          name: 'Realizá la transferencia bancaria',
          text: 'Te enviamos los datos bancarios por email. Una vez confirmado el pago, comenzamos la producción artesanal de tu portachupete (1 a 2 días hábiles).',
          position: 5,
        },
        {
          '@type': 'HowToStep',
          name: 'Recibí tu pedido',
          text: 'Tu portachupete personalizado llega por Andreani a domicilio o sucursal en 2 a 7 días hábiles desde el despacho.',
          position: 6,
        },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: '¿Cuánto tarda la producción de un portachupete personalizado?',
          acceptedAnswer: { '@type': 'Answer', text: 'El tiempo de producción es de 1 a 2 días hábiles. Una vez confirmado el pago, comenzamos a fabricar tu portachupete artesanalmente.' },
        },
        {
          '@type': 'Question',
          name: '¿A qué zonas hacen envíos?',
          acceptedAnswer: { '@type': 'Answer', text: 'Realizamos envíos a todo Argentina a través de Andreani, tanto a domicilio como a sucursal. También ofrecemos retiro en persona en Trenque Lauquen, Buenos Aires.' },
        },
        {
          '@type': 'Question',
          name: '¿Los materiales son seguros para bebés?',
          acceptedAnswer: { '@type': 'Answer', text: 'Sí. Usamos cuentas de silicona grado alimentario, letras de silicona o madera de haya natural, y clips de madera de haya. Todos los materiales son 100% seguros y certificados para bebés.' },
        },
        {
          '@type': 'Question',
          name: '¿Cómo se paga?',
          acceptedAnswer: { '@type': 'Answer', text: 'Aceptamos transferencia bancaria. Una vez confirmada la transferencia, comenzamos la producción de tu pedido.' },
        },
        {
          '@type': 'Question',
          name: '¿Puedo personalizar el portachupete con el nombre de mi bebé?',
          acceptedAnswer: { '@type': 'Answer', text: 'Sí, todos nuestros portachupetes se personalizan con el nombre de tu bebé. Podés elegir el estilo de letras (blancas, beige, rosa, celeste o madera) y el tipo de broche.' },
        },
        {
          '@type': 'Question',
          name: '¿Qué es un portachupete personalizado?',
          acceptedAnswer: { '@type': 'Answer', text: 'Un portachupete personalizado es un accesorio artesanal para bebés que lleva el nombre del bebé en letras de silicona o madera. Se compone de cuentas de silicona grado alimentario ensartadas a mano, unidas con hilo de nylon resistente, y finaliza con un clip o broche para sujetar el chupete.' },
        },
        {
          '@type': 'Question',
          name: '¿Cuánto cuesta un portachupete personalizado?',
          acceptedAnswer: { '@type': 'Answer', text: 'Los portachupetes personalizados de Mimikids tienen un precio base que varía según el modelo. Actualmente contamos con un 20% de descuento en todos los portachupetes, y 25% de descuento si lo comprás en combo con una funda guardachupete.' },
        },
        {
          '@type': 'Question',
          name: '¿Qué incluye un portachupete de Mimikids?',
          acceptedAnswer: { '@type': 'Answer', text: 'Cada portachupete incluye: cuentas de silicona grado alimentario, letras con el nombre de tu bebé (en silicona o madera de haya), clip o broche en madera de haya, y packaging de regalo. Todo fabricado artesanalmente en Trenque Lauquen, Buenos Aires.' },
        },
        {
          '@type': 'Question',
          name: '¿Cómo elijo el estilo de letras?',
          acceptedAnswer: { '@type': 'Answer', text: 'Al personalizar tu pedido podés elegir entre letras de silicona blancas, beige, rosa o celeste, o letras de madera de haya natural. Cada opción da un estilo diferente: las de madera son más rústicas y naturales, las de silicona son más coloridas y modernas.' },
        },
        {
          '@type': 'Question',
          name: '¿Qué es una funda guardachupete?',
          acceptedAnswer: { '@type': 'Answer', text: 'La funda guardachupete es un estuche artesanal en tela para guardar el chupete cuando no está en uso. Protege el chupete de la suciedad y es perfecta para el bolso de la mamá. Comprándola en combo con el portachupete obtenés un 25% de descuento en todo.' },
        },
        {
          '@type': 'Question',
          name: '¿Hacen envíos a todo el país?',
          acceptedAnswer: { '@type': 'Answer', text: 'Sí, realizamos envíos a todo Argentina a través de Andreani. Podés elegir envío a domicilio o a sucursal. El costo del envío se calcula al momento del checkout según tu localidad.' },
        },
        {
          '@type': 'Question',
          name: '¿Es un buen regalo para baby shower?',
          acceptedAnswer: { '@type': 'Answer', text: 'Sí, los portachupetes personalizados son uno de los regalos más buscados para baby shower en Argentina. Al llevar el nombre del bebé son únicos y memorables. Lo hacemos con packaging de regalo incluido.' },
        },
        {
          '@type': 'Question',
          name: '¿Puedo hacer un pedido sin saber el nombre del bebé?',
          acceptedAnswer: { '@type': 'Answer', text: 'En ese caso podés contactarnos por WhatsApp para coordinar. También podés comprar una funda guardachupete o esperar hasta saber el nombre para hacer el pedido del portachupete personalizado.' },
        },
        {
          '@type': 'Question',
          name: '¿Cómo limpio el portachupete?',
          acceptedAnswer: { '@type': 'Answer', text: 'Recomendamos limpiar el portachupete con un paño húmedo. No sumergir en agua ni hervir. Evitar el contacto prolongado con el sol directo para preservar los colores de las cuentas de silicona.' },
        },
        {
          '@type': 'Question',
          name: '¿Desde dónde despachan los pedidos?',
          acceptedAnswer: { '@type': 'Answer', text: 'Todos nuestros pedidos se fabrican y despachan desde Trenque Lauquen, Buenos Aires, Argentina. Los tiempos de envío varían según la localidad de destino (generalmente 2 a 7 días hábiles una vez despachado).' },
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
        <LeadCapturePopup />
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
