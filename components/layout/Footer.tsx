import Link from 'next/link'
import { MessageCircle } from 'lucide-react'

function InstagramIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}

const navLinks = [
  { href: '/',               label: 'Inicio' },
  { href: '/shop',           label: 'Tienda' },
  { href: '/#como-funciona', label: 'Cómo funciona' },
  { href: '/#testimonios',   label: 'Testimonios' },
]

export default function Footer() {
  return (
    <footer id="contacto" className="bg-[#2B1A20] text-white/80 mt-auto">
      <div className="max-w-6xl mx-auto px-5 pt-16 pb-10">

        <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr_1fr] gap-10 md:gap-16 mb-12">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-1.5 mb-4">
              <span className="font-playfair text-2xl font-bold text-white tracking-tight">
                mimikids
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#C4687D] mb-2" aria-hidden="true" />
            </div>
            <p className="text-sm text-white/55 leading-relaxed max-w-[260px] mb-6">
              Portachupetes personalizados con el nombre de tu bebé, hechos con amor para los más pequeños de la familia.
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/mimikids_arg/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#C4687D] flex items-center justify-center transition-colors duration-200 cursor-pointer"
                aria-label="Seguinos en Instagram"
              >
                <InstagramIcon size={16} />
              </a>
              <a
                href="https://wa.me/5493388673629"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#25D366] flex items-center justify-center transition-colors duration-200 cursor-pointer"
                aria-label="Contactanos por WhatsApp"
              >
                <MessageCircle size={16} strokeWidth={1.75} />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <nav aria-label="Navegación de pie de página">
            <p className="text-[0.6875rem] font-semibold tracking-widest uppercase text-white/35 mb-4">
              Navegación
            </p>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <p className="text-[0.6875rem] font-semibold tracking-widest uppercase text-white/35 mb-4">
              Contacto
            </p>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="https://wa.me/5493388673629"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-white transition-colors duration-200"
                >
                  WhatsApp
                </a>
              </li>
              <li className="pt-2 border-t border-white/10">
                <p className="text-white/40 text-xs leading-relaxed">
                  Envíos: Andreani · Correo Argentino
                  <br />
                  Pago: Transferencia bancaria
                </p>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-white/30">
            © {new Date().getFullYear()} Mimikids. Todos los derechos reservados.
          </p>
          <a
            href="https://globalalora.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-white/30 hover:text-white/60 transition-colors"
          >
            Desarrollado por Global Alora
          </a>
        </div>
      </div>
    </footer>
  )
}
