'use client'

import { signOut } from 'next-auth/react'
import { LogOut } from 'lucide-react'

export default function AdminSignOut() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: '/admin/login' })}
      className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-gray-500 hover:bg-red-50 hover:text-red-500 transition-colors w-full cursor-pointer"
    >
      <LogOut size={15} />
      Cerrar sesión
    </button>
  )
}
