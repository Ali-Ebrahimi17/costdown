import NextAuth from 'next-auth'

import authConfig from '@/auth.config'

export const { handlers, auth, signIn, signOut } = NextAuth({
  callbacks: {
    async session({ session, token }) {
      // console.log('session callback =>', { session, token })
      if (session && session.user && token.sub) {
        session.user.id = token.sub
      }
      //   const user = await fetchUserByEmail(session.user.email)

      //   if (user && session.user) {
      //     session.user.id = user._id
      //   }
      return session
    },
  },
  session: { strategy: 'jwt' },
  secret: process.env.AUTH_SECRET,
  trustHost: true,
  ...authConfig,
})
