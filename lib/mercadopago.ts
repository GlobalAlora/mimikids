import MercadoPagoConfig from 'mercadopago'

let _client: MercadoPagoConfig | null = null

export function getMercadoPagoClient(): MercadoPagoConfig {
  if (!_client) {
    const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN
    if (!accessToken) throw new Error('MERCADOPAGO_ACCESS_TOKEN no configurado')
    _client = new MercadoPagoConfig({ accessToken })
  }
  return _client
}
