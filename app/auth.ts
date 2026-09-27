// auth.ts
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      name: "TokensPassThrough",
      credentials: {
        accessToken: { type: "text" },
        refreshToken: { type: "text" }
      },
      async authorize(credentials) {
        console.log('run')
        if (!credentials?.accessToken) return null
        console.log('run2')

        // Pass what your Server Action gave it right to the callbacks
        return {
          id: "authenticated-user", 
          accessToken: credentials.accessToken,
          refreshToken: credentials.refreshToken,
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      // 1. FIX: ONLY assign tokens if the 'user' object exists (First sign-in step)
      if (user) {
        token.accessToken = user.accessToken
        token.refreshToken = user.refreshToken
      }
      return token
    },
    async session({ session, token }) {
      // 2. Map both tokens down to the session layout so they show up across the client app
      session.accessToken = token.accessToken as string
      session.refreshToken = token.refreshToken as string
      return session
    }
  }
})


