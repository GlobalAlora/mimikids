'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Button from '@/components/ui/Button'
import { Eye, EyeOff, Lock } from 'lucide-react'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPwd, setShowPwd] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })

    if (res?.error) {
      setError('Email o contraseña incorrectos')
    } else {
      router.push('/admin')
      router.refresh()
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-[#FFF8F0] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#F9C4D2] to-[#E8D5F5] flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Lock size={24} className="text-white" />
          </div>
          <h1 className="font-playfair text-2xl font-bold text-[#6b3d50]">
            Panel Admin
          </h1>
          <p className="text-sm text-[#9b7a88] mt-1">Mimikids Baby Shop</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl p-6 border border-[#F9C4D2]/30 shadow-sm space-y-4"
        >
          {error && (
            <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-xl border border-red-200">
              {error}
            </div>
          )}

          <div>
            <label className="text-xs font-semibold text-[#8b5e70] uppercase tracking-wider mb-1.5 block">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border-2 border-[#F9C4D2]/50 focus:border-[#d4768a] focus:outline-none text-sm"
              placeholder="admin@mimikids.com.ar"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-[#8b5e70] uppercase tracking-wider mb-1.5 block">
              Contraseña
            </label>
            <div className="relative">
              <input
                type={showPwd ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border-2 border-[#F9C4D2]/50 focus:border-[#d4768a] focus:outline-none text-sm pr-10"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPwd(!showPwd)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#c5aab4] hover:text-[#8b5e70] transition-colors cursor-pointer"
              >
                {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <Button type="submit" disabled={loading} className="w-full mt-2">
            {loading ? 'Entrando...' : 'Ingresar'}
          </Button>
        </form>
      </div>
    </div>
  )
}
