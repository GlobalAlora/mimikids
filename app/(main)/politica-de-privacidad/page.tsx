import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Política de Privacidad | Mimikids',
  description: 'Política de privacidad y protección de datos personales de Mimikids.',
  robots: { index: true, follow: true },
}

export default function PoliticaPrivacidad() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12 md:py-20">
      <h1 className="font-playfair text-3xl md:text-4xl font-bold text-[#6b3d50] mb-2">
        Política de Privacidad
      </h1>
      <p className="text-sm text-gray-400 mb-10">Última actualización: julio 2025</p>

      <div className="space-y-8 text-gray-700 leading-relaxed">

        <section>
          <h2 className="font-semibold text-[#6b3d50] text-lg mb-3">1. Responsable del tratamiento</h2>
          <p>
            Mimikids, con domicilio en Trenque Lauquen, provincia de Buenos Aires, Argentina, es responsable del tratamiento de los datos personales que recopila a través del sitio web{' '}
            <a href="https://www.mimikids.com.ar" className="text-[#c4687d] hover:underline">www.mimikids.com.ar</a>.
          </p>
          <p className="mt-2">Contacto: <a href="mailto:pedidos@mimikids.com.ar" className="text-[#c4687d] hover:underline">pedidos@mimikids.com.ar</a></p>
        </section>

        <section>
          <h2 className="font-semibold text-[#6b3d50] text-lg mb-3">2. Datos que recopilamos</h2>
          <p>Recopilamos los siguientes datos cuando realizás una compra o nos contactás:</p>
          <ul className="list-disc list-inside mt-3 space-y-1 text-sm">
            <li>Nombre y apellido</li>
            <li>Correo electrónico</li>
            <li>Dirección de envío</li>
            <li>Número de teléfono (opcional)</li>
            <li>Información del pedido (productos, personalización, preferencias)</li>
          </ul>
          <p className="mt-3 text-sm">
            También podemos recopilar datos de navegación como dirección IP, tipo de dispositivo y páginas visitadas,
            con fines estadísticos y de mejora del servicio.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-[#6b3d50] text-lg mb-3">3. Finalidad del tratamiento</h2>
          <p>Utilizamos tus datos para:</p>
          <ul className="list-disc list-inside mt-3 space-y-1 text-sm">
            <li>Procesar y gestionar tu pedido</li>
            <li>Enviarte actualizaciones sobre el estado de tu compra</li>
            <li>Coordinar el envío</li>
            <li>Responder consultas y brindar atención al cliente</li>
            <li>Enviarte comunicaciones comerciales si nos diste tu consentimiento</li>
          </ul>
        </section>

        <section>
          <h2 className="font-semibold text-[#6b3d50] text-lg mb-3">4. Base legal</h2>
          <p>
            El tratamiento de tus datos se basa en la ejecución del contrato de compraventa (Ley 25.326 de Protección de
            Datos Personales de la República Argentina) y, en su caso, en tu consentimiento expreso para comunicaciones comerciales.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-[#6b3d50] text-lg mb-3">5. Compartimos tus datos</h2>
          <p>
            No vendemos ni cedemos tus datos personales a terceros con fines comerciales. Podemos compartirlos
            únicamente con los servicios necesarios para operar:
          </p>
          <ul className="list-disc list-inside mt-3 space-y-1 text-sm">
            <li><strong>Resend</strong> — envío de emails transaccionales</li>
            <li><strong>Supabase</strong> — almacenamiento seguro de datos</li>
            <li><strong>Andreani / Correo Argentino</strong> — logística de envíos</li>
          </ul>
          <p className="mt-3 text-sm">Todos estos proveedores operan con políticas de privacidad propias y adecuadas.</p>
        </section>

        <section>
          <h2 className="font-semibold text-[#6b3d50] text-lg mb-3">6. Conservación de los datos</h2>
          <p>
            Conservamos tus datos durante el tiempo necesario para cumplir con la finalidad para la que fueron recopilados
            y las obligaciones legales vigentes. Los datos de pedidos se conservan por un mínimo de 5 años conforme a la
            normativa tributaria argentina.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-[#6b3d50] text-lg mb-3">7. Tus derechos</h2>
          <p>En cumplimiento de la Ley 25.326, tenés derecho a:</p>
          <ul className="list-disc list-inside mt-3 space-y-1 text-sm">
            <li><strong>Acceso</strong>: conocer qué datos tenemos sobre vos</li>
            <li><strong>Rectificación</strong>: corregir datos inexactos</li>
            <li><strong>Supresión</strong>: solicitar la eliminación de tus datos</li>
            <li><strong>Oposición</strong>: oponerte al tratamiento de tus datos con fines comerciales</li>
          </ul>
          <p className="mt-3 text-sm">
            Para ejercer estos derechos, escribinos a{' '}
            <a href="mailto:pedidos@mimikids.com.ar" className="text-[#c4687d] hover:underline">pedidos@mimikids.com.ar</a>.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-[#6b3d50] text-lg mb-3">8. Cookies</h2>
          <p>
            Nuestro sitio utiliza cookies técnicas necesarias para el funcionamiento del carrito de compras y la sesión.
            También podemos utilizar cookies de análisis para mejorar la experiencia. Podés consultar nuestra{' '}
            <Link href="/politica-de-cookies" className="text-[#c4687d] hover:underline">
              Política de Cookies
            </Link>{' '}
            para más información.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-[#6b3d50] text-lg mb-3">9. Seguridad</h2>
          <p>
            Implementamos medidas técnicas y organizativas para proteger tus datos contra acceso no autorizado,
            pérdida o alteración. La conexión al sitio está cifrada mediante HTTPS.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-[#6b3d50] text-lg mb-3">10. Cambios en esta política</h2>
          <p>
            Podemos actualizar esta política periódicamente. Te notificaremos de cambios significativos
            por email si tenés pedidos activos.
          </p>
        </section>

        <div className="pt-6 border-t border-gray-100 flex gap-6 flex-wrap">
          <Link href="/politica-de-cookies" className="text-sm text-[#c4687d] hover:underline">
            Política de Cookies →
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
