'use client'

import { useState } from 'react'
import Link from 'next/link'
import { LayoutDashboard, ShoppingBag, Package, Settings, Images, X, Menu } from 'lucide-react'
import AdminSignOut from './AdminSignOut'

const NAV_ITEMS = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/orders', label: 'Pedidos', icon: ShoppingBag },
  { href: '/admin/products', label: 'Productos', icon: Package },
  { href: '/admin/models', label: 'Modelos', icon: Images },
  { href: '/admin/settings', label: 'Configuración', icon: Settings },
]

function NavContent({ onClose }: { onClose?: () => void }) {
  return (
    <>
      <div className="p-5 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#F9C4D2] to-[#E8D5F5] flex items-center justify-center">
            <span className="text-xs font-black text-white">M</span>
          </div>
          <div>
            <p className="font-playfair text-sm font-bold text-[#8b5e70]">Mimikids</p>
            <p className="text-xs text-gray-400">Admin</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            onClick={onClose}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-[#F9C4D2]/20 hover:text-[#d4768a] transition-colors"
          >
            <Icon size={16} />
            {label}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-100">
        <AdminSignOut />
      </div>
    </>
  )
}

export default function AdminSidebar() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-56 bg-white border-r border-gray-100 flex-col shadow-sm flex-shrink-0">
        <NavContent />
      </aside>

      {/* Mobile top bar */}
      <header className="md:hidden fixed top-0 inset-x-0 z-40 bg-white border-b border-gray-100 h-14 flex items-center gap-3 px-4 shadow-sm">
        <button
          onClick={() => setOpen(true)}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
          aria-label="Abrir menú"
        >
          <Menu size={20} className="text-gray-600" />
        </button>
        <p className="font-playfair text-sm font-bold text-[#8b5e70]">Mimikids Admin</p>
      </header>

      {/* Mobile drawer */}
      {open && (
        <>
          <div
            className="md:hidden fixed inset-0 z-50 bg-black/30 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <aside className="md:hidden fixed inset-y-0 left-0 z-50 w-64 bg-white flex flex-col shadow-2xl">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 p-1.5 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
              aria-label="Cerrar menú"
            >
              <X size={18} className="text-gray-400" />
            </button>
            <NavContent onClose={() => setOpen(false)} />
          </aside>
        </>
      )}
    </>
  )
}
