import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { LayoutDashboard, ShoppingBag, Package, Settings, LogOut } from 'lucide-react'
import AdminSignOut from '@/components/admin/AdminSignOut'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()

  if (!session) {
    redirect('/admin/login')
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-56 bg-white border-r border-gray-100 flex flex-col shadow-sm">
        <div className="p-5 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#F9C4D2] to-[#E8D5F5] flex items-center justify-center">
              <span className="text-xs font-black text-white">M</span>
            </div>
            <div>
              <p className="font-playfair text-sm font-bold text-[#8b5e70]">
                Mimikids
              </p>
              <p className="text-xs text-gray-400">Admin</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {[
            { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
            { href: '/admin/orders', label: 'Pedidos', icon: ShoppingBag },
            { href: '/admin/products', label: 'Productos', icon: Package },
            { href: '/admin/settings', label: 'Configuración', icon: Settings },
          ].map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
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
      </aside>

      <div className="flex-1 overflow-auto">{children}</div>
    </div>
  )
}
