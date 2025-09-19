import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      lastname?: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    lastname?: string;
  }
}