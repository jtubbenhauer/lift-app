import NextAuth, { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GitHubProvider from "next-auth/providers/github";
import { prisma } from "../../../utils/prismaClient";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHubProvider({
      // @ts-ignore
      clientId: process.env.GITHUB_ID,
      // @ts-ignore
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      // Send props to the client
      session.userId = user.id;
      return session;
    },
    async jwt({ account, token }) {
      if (account) {
        token.userId = account.userId;
      }
      return token;
    },
  },
};

export default NextAuth(authOptions);
