import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Categorías y productos viejos (antes de la pivotada a portachupetes)
      { source: '/ropa/:path*',                  destination: '/shop', permanent: true },
      { source: '/hora-de-comer/:path*',         destination: '/shop', permanent: true },
      { source: '/bandana-y-baberos-de-tela/:path*', destination: '/shop', permanent: true },
      { source: '/mordillos/:path*',             destination: '/shop', permanent: true },
      { source: '/ajuares/:path*',               destination: '/shop', permanent: true },
    ]
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  serverExternalPackages: ['resend', 'svix', 'standardwebhooks'],
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: '*.supabase.co' },
    ],
  },
  experimental: {
    authInterrupts: true,
  },
}

export default nextConfig
