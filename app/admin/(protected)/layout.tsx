import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import AdminSidebar from '@/components/admin/AdminSidebar'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()

  if (!session) {
    redirect('/admin/login')
  }

  return (
    <div className="min-h-screen bg-gray-50 md:flex">
      <AdminSidebar />
      <div className="flex-1 overflow-auto pt-14 md:pt-0">{children}</div>
    </div>
  )
}
