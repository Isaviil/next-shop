// authOptions.ts
import { NextAuthOptions, User, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "../../lib/prisma";
import { JWT } from "next-auth/jwt";

interface MySessionUser {
  id: string;
  name: string;
  lastname: string;
  email: string;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "text" },
        pw: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await prisma.users.findUnique({
          where: { email: credentials?.email },
        });

        if (!user) throw new Error("NOT_FOUND");
        if (credentials?.pw !== user.password) throw new Error("INVALID");

        return {
          id: user.id.toString(),
          name: user.name,
          lastname: user.lastname,
          email: user.email,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user) {
        const u = user as {
          id: string;
          name: string;
          lastname: string;
          email: string;
        };
        token.name = u.name;
        token.lastname = u.lastname;
        token.email = u.email;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      const user = session.user as MySessionUser;
      user.id = token.sub as string;
      user.name = token.name as string;
      user.lastname = token.lastname as string;
      user.email = token.email as string;
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60,
    updateAge: 60 * 5,
  },
  secret: process.env.JWT_SECRET,
};