import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/email"
import FacebookProvider from "next-auth/providers/facebook"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "../../../../lib/prisma"

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "To Do List",
      type: "credentials",
      async authorize(credentials, req) {
        const user = {
          // image: credentials.image,
          name: credentials.name,
          email: credentials.email,
          password: credentials.password,
        }
        return user
      },
      credentials: {
        // image: {
        //   label: "Image",
        //   type: "text",
        //   placeholder: "/assets/img/people.png",
        // },
        name: { label: "Name", type: "text", placeholder: "jhon" },
        email: { label: "Email", type: "email", placeholder: "jhon@unity.dev" },
        password: { label: "Password", type: "password" },
      },
      pages: {
        signIn: "/auth/login",
      },
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
}

export default NextAuth(authOptions)
