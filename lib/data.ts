import { Model, Product, Testimonial } from '@/types'

const FUNDA_DESC = `Funda de silicona para chupete

Mantené el chupete de tu bebé siempre limpio y protegido con nuestra funda de silicona para chupete. Es práctica, liviana y fácil de transportar, ideal para llevar en el bolso maternal, la mochila o el cochecito.

Está confeccionada en silicona de grado alimenticio, libre de BPA, y cuenta con una tira para colgarla donde te resulte más cómodo, manteniendo el chupete siempre al alcance de la mano.

Completá el conjunto con nuestro combo de portachupete personalizado + funda para chupete, una opción práctica y funcional para el día a día o un regalo ideal para un recién nacido.`

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '71447254-8d70-4ff2-bd98-9c4cd9c52561',
    slug: 'portachupete-letras-blancas',
    name: 'Portachupete · Letras Blancas',
    description: `🤍 Portachupete personalizado de silicona - Letras blancas

Nuestro portachupete personalizado con letras blancas combina un diseño delicado y atemporal con la practicidad que necesitás para el día a día. Está confeccionado con letras de silicona libre de BPA, personalizadas con el nombre de tu bebé, para mantener el chupete siempre al alcance de la mano.

Completá tu compra con nuestros combos de portachupete + llavero personalizado o portachupete + funda de silicona para chupete, ideales para lograr un conjunto práctico y armonioso.

Cada portachupete se confecciona artesanalmente en Argentina, especialmente para vos.`,
    price: 25000,
    images: [
      '/products/portachupete-blancas-1.webp',
      '/products/portachupete-blancas-2.webp',
      '/products/portachupete-blancas-3.webp',
      '/products/portachupete-blancas-4.webp',
      '/products/portachupete-blancas-5.webp',
    ],
    category: 'portachupete',
    badge: 'Más vendido',
    production_days_min: 1,
    production_days_max: 2,
    available_colors: [],
    stock: null,
    meta_title: 'Portachupete con Nombre Letras Blancas — Más Vendido | Mimikids',
    meta_description: 'Nuestro portachupete más vendido: nombre personalizado en letras silicona blanca. Artesanal, seguro y único. Enviamos a todo el país.',
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: '3a83f7bf-2f3f-4840-9b26-5a32463079c8',
    slug: 'portachupete-letras-beige',
    name: 'Portachupete · Letras Beige',
    description: `🤎 Portachupete personalizado de silicona - Letras beige

Nuestro portachupete personalizado con letras beige es una opción elegante y cálida para acompañar a tu bebé todos los días. Está realizado con silicona libre de BPA y personalizado con el nombre que elijas, creando un accesorio único y funcional.

También podés elegir uno de nuestros combos personalizados: portachupete + llavero o portachupete + funda de silicona para chupete, diseñados para combinar perfectamente.

Cada pieza está hecha artesanalmente en Argentina con mucho amor.`,
    price: 25000,
    images: [
      '/products/portachupete-beige-1.webp',
      '/products/portachupete-beige-2.webp',
      '/products/portachupete-beige-3.webp',
      '/products/portachupete-beige-4.webp',
      '/products/portachupete-beige-5.webp',
      '/products/portachupete-beige-6.webp',
    ],
    category: 'portachupete',
    production_days_min: 1,
    production_days_max: 2,
    available_colors: [],
    stock: null,
    meta_title: 'Portachupete con Nombre Letras Beige | Mimikids',
    meta_description: 'Portachupete artesanal personalizado con el nombre de tu bebé en letras silicona beige. Hecho a mano en Argentina. Envíos a todo el país.',
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: '20446d65-f7c1-425e-bdee-96b780ab19ef',
    slug: 'portachupete-letras-rosas',
    name: 'Portachupete · Letras Rosas',
    description: `🩷 Portachupete personalizado de silicona - Letras rosas

Nuestro portachupete personalizado con letras rosas combina dulzura, diseño y funcionalidad. Está confeccionado con letras de silicona libre de BPA y personalizado con el nombre de tu bebé, creando un accesorio único para acompañarlo en cada momento.

Completá el conjunto con nuestros combos de portachupete + llavero personalizado o portachupete + funda de silicona para chupete, pensados para quienes buscan accesorios que combinen entre sí.

Cada pieza se confecciona artesanalmente en Argentina con dedicación y mucho amor.`,
    price: 25000,
    images: [
      '/products/portachupete-rosas-1.webp',
    ],
    category: 'portachupete',
    badge: '💕 Para nenas',
    production_days_min: 1,
    production_days_max: 2,
    available_colors: [],
    stock: null,
    meta_title: 'Portachupete con Nombre Letras Rosas — Para Nenas | Mimikids',
    meta_description: 'Portachupete artesanal con nombre en letras rosas, ideal para nenas. Hecho a mano con amor en Argentina. Regalá algo único y especial.',
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: '2efb72da-6c06-44d7-bb82-23cf88c63e71',
    slug: 'portachupete-letras-celeste',
    name: 'Portachupete · Letras Celeste',
    description: `💙 Portachupete personalizado de silicona - Letras celestes

Nuestro portachupete personalizado con letras celestes es ideal para quienes buscan un diseño tierno y personalizado. Confeccionado con letras de silicona libre de BPA, ayuda a mantener el chupete limpio, seguro y siempre cerca de tu bebé.

Podés completar el conjunto con nuestro llavero personalizado o elegir el combo con funda de silicona para chupete, una opción práctica para llevar el chupete protegido.

Cada portachupete se realiza artesanalmente en Argentina especialmente para vos.`,
    price: 25000,
    images: [
      '/products/portachupete-celeste-1.webp',
      '/products/portachupete-celeste-2.webp',
      '/products/portachupete-celeste-3.webp',
    ],
    category: 'portachupete',
    badge: '💙 Para nenes',
    production_days_min: 1,
    production_days_max: 2,
    available_colors: [],
    stock: null,
    meta_title: 'Portachupete con Nombre Letras Celeste — Para Nenes | Mimikids',
    meta_description: 'Portachupete artesanal con nombre en letras celeste, ideal para nenes. Hecho a mano y seguro. Personalizado con el nombre de tu bebé. Envíos a todo Argentina.',
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: '0c132c1a-7b09-45b9-85f4-ab9c34981fcb',
    slug: 'llavero-personalizado',
    name: 'Llavero Personalizado',
    description: 'Llavero artesanal personalizado con el nombre que elijas. Ideal como regalo único para bebés y mamás. Hecho a mano en Argentina. Envíos a todo el país.',
    price: 21000,
    images: [
      '/products/llavero-1.webp',
      '/products/llavero-2.webp',
    ],
    category: 'llavero',
    badge: 'Ideales',
    production_days_min: 1,
    production_days_max: 2,
    available_colors: [],
    stock: null,
    meta_title: 'Llavero Personalizado con Nombre | Mimikids',
    meta_description: 'Llavero artesanal personalizado con el nombre que elijas. Ideal como regalo único para bebés y mamás. Hecho a mano en Argentina. Envíos a todo el país.',
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 'a74ef931-b84e-4ee1-be82-829ee676c257',
    slug: 'guardachupetes---oso---avena-claro',
    name: 'Guardachupetes - Oso - AVENA CLARO',
    description: FUNDA_DESC,
    price: 14900,
    images: [
      '/products/funda-avena-claro-1.webp',
    ],
    category: 'funda',
    badge: 'Mas vendido',
    production_days_min: 1,
    production_days_max: 2,
    available_colors: [],
    stock: 1,
    meta_title: 'Guardachupete Oso Avena — El Más Vendido | Mimikids',
    meta_description: 'La funda guardachupete más vendida: oso artesanal en avena claro. Color neutro y cálido, hecho a mano en Argentina. ¡El favorito de las mamás!',
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: '04972043-f771-4d4e-8713-2f65fded667f',
    slug: 'guardachupetes--oso--azul-seco',
    name: 'Guardachupetes - Oso - AZUL SECO',
    description: FUNDA_DESC,
    price: 14900,
    images: [
      '/products/funda-azul-seco-1.webp',
    ],
    category: 'funda',
    production_days_min: 1,
    production_days_max: 2,
    available_colors: [],
    stock: 1,
    meta_title: 'Guardachupete Artesanal Oso Azul Seco | Mimikids',
    meta_description: 'Funda guardachupete oso azul seco, perfecto para nenes. Artesanal y único. Protege el chupete de tu bebé con estilo. Envíos a todo Argentina.',
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 'dcea0d41-aa70-47e0-8e0c-26a38a2de5b2',
    slug: 'guardachupetes--oso--gris-claro',
    name: 'Guardachupetes - Oso - GRIS CLARO',
    description: FUNDA_DESC,
    price: 14900,
    images: [
      '/products/funda-gris-claro-1.webp',
    ],
    category: 'funda',
    production_days_min: 1,
    production_days_max: 2,
    available_colors: [],
    stock: 1,
    meta_title: 'Guardachupete Artesanal Oso Gris Claro | Mimikids',
    meta_description: 'Funda guardachupete oso gris claro, unisex y elegante. Protege el chupete de tu bebé con estilo. Hecho a mano en Argentina. Envíos a todo el país.',
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: '64282127-1f71-411c-8b9d-eb042142dce6',
    slug: 'guardachupetes--oso--rosa-bebe',
    name: 'Guardachupetes - Oso - ROSA BEBE',
    description: FUNDA_DESC,
    price: 14898,
    images: [
      '/products/funda-rosa-bebe-1.webp',
    ],
    category: 'funda',
    production_days_min: 1,
    production_days_max: 2,
    available_colors: [],
    stock: 1,
    meta_title: 'Guardachupete Artesanal Oso Rosa Bebé | Mimikids',
    meta_description: 'Funda guardachupete oso rosa bebé, ideal para nenas. Artesanal y única. Protege el chupete con estilo. Hecho a mano, envíos a todo el país.',
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 'eb142914-3bfd-4fb6-9f65-ff2f2e92e306',
    slug: 'guardachupetes--oso--rosa-rubor',
    name: 'Guardachupetes - Oso - ROSA RUBOR (*)',
    description: FUNDA_DESC,
    price: 14900,
    images: [
      '/products/funda-rosa-rubor-1.webp',
    ],
    category: 'funda',
    production_days_min: 1,
    production_days_max: 2,
    available_colors: [],
    stock: 1,
    meta_title: 'Guardachupete Artesanal Oso Rosa Rubor | Mimikids',
    meta_description: 'Funda guardachupete artesanal oso rosa rubor. Protege el chupete de tu bebé con una pieza única hecha a mano. Envíos a todo Argentina.',
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: '6a7810ed-f0b8-4fb7-98de-72a5e8ef4ff5',
    slug: 'guardachupetes--oso--verde-musgo',
    name: 'Guardachupetes - Oso - VERDE MUSGO',
    description: FUNDA_DESC,
    price: 14900,
    images: [
      '/products/funda-verde-musgo-1.webp',
    ],
    category: 'funda',
    production_days_min: 1,
    production_days_max: 2,
    available_colors: [],
    stock: 1,
    meta_title: 'Guardachupete Artesanal Oso Verde Musgo | Mimikids',
    meta_description: 'Funda guardachupete artesanal con forma de oso en verde musgo. Protege el chupete de tu bebé con estilo. Hecho a mano en Argentina. Envíos a todo el país.',
    is_active: true,
    created_at: new Date().toISOString(),
  },
]

// Fallback para cuando Supabase está caído — usa imágenes de productos ya en /public/products/
export const MOCK_MODELS: Model[] = [
  { id: 'f245cb3a-2722-45c0-ac2c-79aa926cb28a', name: '', photo: '/products/portachupete-blancas-1.webp', color: 'blanco' },
  { id: 'b430a96d-fa09-4e2d-af33-71b18f9f9839', name: '', photo: '/products/portachupete-blancas-2.webp', color: 'blanco' },
  { id: '43a097b9-19c3-46ed-a637-25fee7e6057d', name: '', photo: '/products/portachupete-blancas-3.webp', color: 'blanco' },
  { id: '652863eb-6e16-4f37-ad48-52af8780eb08', name: '', photo: '/products/portachupete-blancas-4.webp', color: 'blanco' },
  { id: 'de0a567d-4c9e-4104-aa47-2d4a1736e286', name: '', photo: '/products/portachupete-blancas-5.webp', color: 'blanco' },
  { id: 'e5656188-25a9-49c2-8fe0-04c93677486a', name: '', photo: '/products/portachupete-beige-1.webp',   color: 'beige' },
  { id: '1a365594-a241-4e2b-9fce-6ead80167d18', name: '', photo: '/products/portachupete-beige-2.webp',   color: 'beige' },
  { id: '5c50ccd9-cf22-415b-977c-b599c6c71f82', name: '', photo: '/products/portachupete-beige-3.webp',   color: 'beige' },
  { id: '75e8d3f3-7b0c-4d68-984d-33923f044205', name: '', photo: '/products/portachupete-beige-4.webp',   color: 'beige' },
  { id: 'ffdea1a6-09bd-46b3-8748-9355a193b9b9', name: '', photo: '/products/portachupete-beige-5.webp',   color: 'beige' },
  { id: 'd856fa3f-ea45-439a-8228-3f19f086e930', name: '', photo: '/products/portachupete-beige-6.webp',   color: 'beige' },
  { id: '87f964e3-fbe6-489a-8385-e9d7ff1b529c', name: '', photo: '/products/portachupete-rosas-1.webp',   color: 'rosa' },
  { id: 'e325a421-5594-4e5b-86b6-92ad085f2249', name: '', photo: '/products/portachupete-celeste-1.webp', color: 'celeste' },
  { id: '3074163b-0bd7-462b-9f83-cc24c0b91da1', name: '', photo: '/products/portachupete-celeste-2.webp', color: 'celeste' },
  { id: '064f920b-a38b-44fc-b464-6c4bbc4450de', name: '', photo: '/products/portachupete-celeste-3.webp', color: 'celeste' },
]

export const MOCK_TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    author_name: 'Valentina M.',
    baby_name: 'Salvador',
    content:
      'Increíble la calidad! Lo recibí en 4 días y la personalización quedó perfecta. Mi bebé lo usa todos los días y se ve hermoso. 100% recomendable.',
    rating: 5,
    created_at: new Date().toISOString(),
  },
  {
    id: '2',
    author_name: 'Lucía R.',
    baby_name: 'Olivia',
    content:
      'Compré el de letras blancas para mi nena y quedó divino. La atención fue hermosa, me ayudaron a elegir el diseño por WhatsApp. Ya pedí el segundo!',
    rating: 5,
    created_at: new Date().toISOString(),
  },
  {
    id: '3',
    author_name: 'Florencia K.',
    baby_name: 'Mateo',
    content:
      'Súper atenta la atención al cliente. Me ayudaron a elegir las cuentas y quedó espectacular. El envío llegó muy bien empaquetado.',
    rating: 5,
    created_at: new Date().toISOString(),
  },
]

export const PROVINCES = [
  'Buenos Aires',
  'CABA',
  'Catamarca',
  'Chaco',
  'Chubut',
  'Córdoba',
  'Corrientes',
  'Entre Ríos',
  'Formosa',
  'Jujuy',
  'La Pampa',
  'La Rioja',
  'Mendoza',
  'Misiones',
  'Neuquén',
  'Río Negro',
  'Salta',
  'San Juan',
  'San Luis',
  'Santa Cruz',
  'Santa Fe',
  'Santiago del Estero',
  'Tierra del Fuego',
  'Tucumán',
]
