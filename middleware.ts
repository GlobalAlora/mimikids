import { createClient } from '@/utils/supabase/middleware'
import type { NextRequest } from 'next/server'

export default function middleware(request: NextRequest) {
  return createClient(request)
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/admin/:path*',
  ],
}
