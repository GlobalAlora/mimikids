export interface Product {
  id: string
  slug: string
  name: string
  description: string
  price: number
  images: string[]
  category: string
  badge?: string
  materials?: string
  care_instructions?: string
  production_days_min: number
  production_days_max: number
  available_colors: ColorOption[]
  letter_style?: string // e.g. 'silicona-blanca' | 'silicona-beige' | 'silicona-rosa' | 'silicona-celeste' | 'madera'
  is_active: boolean
  created_at: string
}

export interface ColorOption {
  id: string
  name: string
  hex: string
}

export interface CartItemPersonalization {
  broche: string
  brocheName: string
  nombre: string
}

export interface CartItem {
  id: string
  product: Product
  quantity: number
  personalization: CartItemPersonalization
}

export interface ShippingMethod {
  id: 'andreani' | 'andreani_sucursal' | 'pickup'
  name: string
  price: number
  days_min: number
  days_max: number
}

export type OrderStatus =
  | 'pendiente_pago'
  | 'pago_confirmado'
  | 'en_produccion'
  | 'enviado'
  | 'entregado'
  | 'cancelado'

export type PaymentMethod = 'transferencia'

export interface Order {
  id: string
  order_number: string
  status: OrderStatus
  payment_method: PaymentMethod
  payment_status: 'pendiente' | 'confirmado' | 'rechazado'
  items: OrderItem[]
  shipping_method: ShippingMethod
  shipping_address: ShippingAddress
  buyer: BuyerInfo
  subtotal: number
  shipping_cost: number
  total: number
  created_at: string
  updated_at: string
}

export interface OrderItem {
  id: string
  product_id: string
  product_name: string
  product_image: string
  quantity: number
  unit_price: number
  personalization: CartItemPersonalization
}

export interface ShippingAddress {
  street: string
  number: string
  floor?: string
  city: string
  province: string
  postal_code: string
  country: string
}

export interface BuyerInfo {
  name: string
  email: string
  phone: string
}

export interface Testimonial {
  id: string
  author_name: string
  baby_name?: string
  content: string
  rating: number
  image_url?: string
  created_at: string
}
