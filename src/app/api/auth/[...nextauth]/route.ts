import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      type: "credentials",
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { username, password } = credentials as {
          username: string;
          password: string;
        };

        const user: any = {
          id: 1,
          name: "Pares",
          username: "admin",
          password: "123456",
          role: "admin",
        };

        if (username === "admin" && password === "123456") {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.username = user.username;
        token.name = user.name;
        token.role = user.role;
      }

      return token;
    },

    // generate session
    async session({ session, token }: any) {
      if (session.user) {
        if ("username" in token) {
          session.user.username = token.username;
        }

        if ("name" in token) {
          session.user.name = token.name;
        }

        if ("role" in token) {
          session.user.role = token.role;
        }
      }

      return session;
    },
  },

  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
