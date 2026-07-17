import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Política de Devoluciones | Mimikids',
  description: 'Conocé nuestra política de devoluciones, cambios y garantía para portachupetes personalizados Mimikids.',
  robots: { index: true, follow: true },
}

export default function PoliticaDevoluciones() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12 md:py-20">
      <h1 className="font-playfair text-3xl md:text-4xl font-bold text-[#6b3d50] mb-2">
        Política de Devoluciones
      </h1>
      <p className="text-sm text-gray-400 mb-10">Última actualización: julio 2025</p>

      <div className="space-y-8 text-gray-700 leading-relaxed">

        <section>
          <h2 className="font-semibold text-[#6b3d50] text-lg mb-3">Productos personalizados</h2>
          <p>
            Nuestros portachupetes y fundas son fabricados artesanalmente y personalizados con el nombre de tu bebé.
            Por tratarse de productos hechos a medida, <strong>no aceptamos devoluciones por arrepentimiento</strong> una vez iniciada la producción.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-[#6b3d50] text-lg mb-3">Productos con defectos de fabricación</h2>
          <p>
            Si tu pedido llega con algún defecto de fabricación o daño durante el envío, te lo reemplazamos sin cargo. Para gestionarlo:
          </p>
          <ol className="list-decimal list-inside mt-3 space-y-1 text-sm">
            <li>Contactanos dentro de los <strong>7 días hábiles</strong> de recibir el pedido.</li>
            <li>Envianos una foto del defecto por WhatsApp o email.</li>
            <li>Acordamos el envío del reemplazo o la devolución del dinero según corresponda.</li>
          </ol>
        </section>

        <section>
          <h2 className="font-semibold text-[#6b3d50] text-lg mb-3">Cancelaciones antes de producción</h2>
          <p>
            Podés cancelar tu pedido sin cargo dentro de las <strong>24 horas</strong> de realizado, siempre que la producción no haya comenzado.
            Pasado ese plazo, el pedido ya está en proceso y no puede cancelarse.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-[#6b3d50] text-lg mb-3">Proceso de devolución</h2>
          <p>
            En los casos que corresponda devolución de dinero, el reintegro se realiza por el mismo medio de pago utilizado
            en un plazo de <strong>5 a 10 días hábiles</strong>.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-[#6b3d50] text-lg mb-3">Contacto</h2>
          <p>Para cualquier consulta sobre tu pedido:</p>
          <ul className="mt-2 space-y-1 text-sm">
            <li>
              📲 WhatsApp:{' '}
              <a
                href="https://wa.me/543388673629"
                className="text-[#c4687d] hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                +54 338 867-3629
              </a>
            </li>
            <li>
              📧 Email:{' '}
              <a href="mailto:pedidos@mimikids.com.ar" className="text-[#c4687d] hover:underline">
                pedidos@mimikids.com.ar
              </a>
            </li>
          </ul>
        </section>

        <div className="pt-6 border-t border-gray-100">
          <Link href="/" className="text-sm text-[#c4687d] hover:underline">
            ← Volver al inicio
          </Link>
        </div>
      </div>
    </main>
  )
}
