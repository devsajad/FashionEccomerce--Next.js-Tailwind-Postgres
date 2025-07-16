import NextAuth, { type NextAuthConfig } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/db/prisma";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcrypt-ts-edge";
import { Role } from "@prisma/client";

export const config: NextAuthConfig = {
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: "/signin",
    error: "/signin",
  },

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  providers: [
    Credentials({
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "password", type: "password" },
      },

      async authorize(credentials) {
        // 1. Validate that you received email and password
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        // 2. Get user from db and check if there is any user with entered email
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email as string,
          },
        });

        // User not found or they signed up with an OAuth provider (no password)
        if (!user || !user.password) {
          return null;
        }

        // 3. Compare password and check equality
        const isPasswordMatch = await compare(
          credentials.password as string,
          user.password
        );

        if (!isPasswordMatch) {
          return null; // Passwords don't match
        }

        // 4. If everything is correct, return the full user object
        // Auth.js will handle the rest
        return user;
      },
    }),
  ],

  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },

    async session({ session, token, user, trigger }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as Role;
      }
      if (trigger === "update") {
        session.user.name = user.name;
      }
      return session;
    },
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth(config);
