import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const adminEmail = process.env.ADMIN_EMAIL
        const adminPassword = process.env.ADMIN_PASSWORD

        if (!credentials?.email || !credentials?.password) return null
        if (credentials.email !== adminEmail) return null

        const isValid = adminPassword
          ? await bcrypt.compare(credentials.password as string, adminPassword)
          : credentials.password === 'admin123'

        if (!isValid) return null

        return {
          id: '1',
          email: adminEmail,
          name: 'Admin Mimikids',
          role: 'admin',
        }
      },
    }),
  ],
  pages: {
    signIn: '/admin/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = (user as { role?: string }).role
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as { role?: string }).role = token.role as string
      }
      return session
    },
  },
  session: { strategy: 'jwt' },
})
