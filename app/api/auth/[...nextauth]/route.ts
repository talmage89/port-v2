import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { z } from "zod";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";

// Extend the built-in types for Next Auth
declare module "next-auth" {
  interface User {
    id?: string;
    role?: string;
  }

  interface Session {
    user: {
      id?: string;
      role?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    role?: string;
  }
}

const adminSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

// Configure NextAuth options
const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          // Validate input format
          const result = adminSchema.safeParse(credentials);
          if (!result.success) {
            return null;
          }

          const { username, password } = result.data;

          // First check against environment variables for backward compatibility
          if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
            return {
              id: "admin",
              name: "Admin",
              email: "admin@example.com",
              role: "admin",
            };
          }

          // Check against database users
          const userResult = await db.select().from(users).where(eq(users.username, username));

          if (userResult.length === 0) {
            return null;
          }

          const user = userResult[0];

          // Verify password
          const passwordMatch = await bcrypt.compare(password, user.passwordHash);

          if (!passwordMatch) {
            return null;
          }

          // Return user
          return {
            id: user.id.toString(),
            name: user.name || user.username,
            email: user.email || null,
            role: user.role,
          };
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/admin/login",
    signOut: "/admin/login",
    error: "/admin/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      // Add role and id to JWT token if user exists
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      // Add role and id to session if token exists
      if (session.user) {
        session.user.role = token.role;
        session.user.id = token.id;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
