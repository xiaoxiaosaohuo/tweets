import { prisma } from "@/lib/prisma";
import { compare } from "bcryptjs";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { ISession } from "@/types/data";
export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        name: {
          label: "name",
          type: "text",
          placeholder: "Enter your name",
        },
        password: { label: "Password", type: "password" },
      },
      // @ts-ignore
      async authorize(credentials) {
        if (!credentials?.name || !credentials.password) {
          return null;
        }
        try {
          const user = await prisma.user.findUnique({
            where: {
              name: credentials.name,
            },
          });
          console.log('console.log(user)',user)
          if (!user || !(await compare(credentials.password, user.password))) {

            return undefined
          }
          return {
            id: user.id,
            name: user.name,
          };
        } catch (error) {
          console.error(error)
          return undefined
        }

      },
    }),
  ],
  callbacks: {
    session: ({ session, token }) => {
      // console.log("Session Callback", { session, token });
      session.user = token;
      return session
    },
    jwt: ({ token, user }) => {
      // console.log("JWT Callback", { token, user });
      if (user) {
        const u = user as unknown as any;
        return {
          ...token,
          ...user
        };
      }
      return token;
    },
  },
  pages: {
    signIn: '/auth/login',
  },
};




export const getSessionInServer = async (): Promise<ISession> => {
  const session: ISession = await getServerSession(authOptions) as ISession;
  return session
}

export const Unauthorized = async () => {
  const session = await getSessionInServer();
  // @ts-ignore
  if (session && session.user && session.user.role !== 'Admin') {
    return new NextResponse(
      JSON.stringify({
        status: "error",
        message: "Unauthorized",
      }),
      { status: 401 }
    );
  }
}
