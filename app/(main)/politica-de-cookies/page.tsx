import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Política de Cookies | Mimikids',
  description: 'Información sobre el uso de cookies en el sitio web de Mimikids.',
  robots: { index: true, follow: true },
}

export default function PoliticaCookies() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12 md:py-20">
      <h1 className="font-playfair text-3xl md:text-4xl font-bold text-[#6b3d50] mb-2">
        Política de Cookies
      </h1>
      <p className="text-sm text-gray-400 mb-10">Última actualización: julio 2025</p>

      <div className="space-y-8 text-gray-700 leading-relaxed">

        <section>
          <h2 className="font-semibold text-[#6b3d50] text-lg mb-3">¿Qué son las cookies?</h2>
          <p>
            Las cookies son pequeños archivos de texto que los sitios web almacenan en tu dispositivo cuando los visitás.
            Sirven para recordar información entre páginas y sesiones, mejorar la experiencia de navegación y recopilar
            estadísticas de uso.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-[#6b3d50] text-lg mb-3">Cookies que utilizamos</h2>

          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse mt-3">
              <thead>
                <tr className="bg-[#fdf0f3]">
                  <th className="text-left p-3 font-semibold text-[#6b3d50] rounded-tl-lg">Tipo</th>
                  <th className="text-left p-3 font-semibold text-[#6b3d50]">Nombre</th>
                  <th className="text-left p-3 font-semibold text-[#6b3d50] rounded-tr-lg">Finalidad</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="p-3 font-medium text-gray-700">Técnica</td>
                  <td className="p-3 text-gray-500 font-mono text-xs">next-auth.session-token</td>
                  <td className="p-3 text-gray-600">Sesión de usuario (administración)</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-gray-700">Funcional</td>
                  <td className="p-3 text-gray-500 font-mono text-xs">mk-cart / localStorage</td>
                  <td className="p-3 text-gray-600">Persistencia del carrito de compras</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-gray-700">Funcional</td>
                  <td className="p-3 text-gray-500 font-mono text-xs">mk_coupon_used</td>
                  <td className="p-3 text-gray-600">Control de uso de cupones de descuento</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-gray-700">Analítica</td>
                  <td className="p-3 text-gray-500 font-mono text-xs">_ga / _gid</td>
                  <td className="p-3 text-gray-600">Google Analytics — estadísticas de visitas anónimas</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="font-semibold text-[#6b3d50] text-lg mb-3">Cookies técnicas (necesarias)</h2>
          <p>
            Las cookies técnicas son esenciales para el funcionamiento del sitio. Sin ellas, el carrito de compras
            no puede recordar tus productos y no es posible completar una compra. No requieren tu consentimiento ya que
            son estrictamente necesarias.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-[#6b3d50] text-lg mb-3">Cookies analíticas</h2>
          <p>
            Utilizamos Google Analytics para entender cómo los visitantes usan el sitio. Esta información es anónima y
            agregada — no nos permite identificarte individualmente. Los datos se usan exclusivamente para mejorar la
            experiencia de compra.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-[#6b3d50] text-lg mb-3">¿Cómo gestionar las cookies?</h2>
          <p>
            Podés configurar tu navegador para bloquear o eliminar cookies en cualquier momento. Ten en cuenta que
            bloquear cookies técnicas puede afectar el funcionamiento del carrito y el proceso de compra.
          </p>
          <ul className="list-disc list-inside mt-3 space-y-1 text-sm">
            <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-[#c4687d] hover:underline">Chrome</a></li>
            <li><a href="https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias" target="_blank" rel="noopener noreferrer" className="text-[#c4687d] hover:underline">Firefox</a></li>
            <li><a href="https://support.apple.com/es-ar/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-[#c4687d] hover:underline">Safari</a></li>
          </ul>
        </section>

        <section>
          <h2 className="font-semibold text-[#6b3d50] text-lg mb-3">Contacto</h2>
          <p>
            Para consultas sobre el uso de cookies escribinos a{' '}
            <a href="mailto:pedidos@mimikids.com.ar" className="text-[#c4687d] hover:underline">
              pedidos@mimikids.com.ar
            </a>.
          </p>
        </section>

        <div className="pt-6 border-t border-gray-100 flex gap-6 flex-wrap">
          <Link href="/politica-de-privacidad" className="text-sm text-[#c4687d] hover:underline">
            Política de Privacidad →
          </Link>
          <Link href="/politica-devoluciones" className="text-sm text-[#c4687d] hover:underline">
            Política de Devoluciones →
          </Link>
          <Link href="/" className="text-sm text-gray-400 hover:underline">
            ← Volver al inicio
          </Link>
        </div>
      </div>
    </main>
  )
}
