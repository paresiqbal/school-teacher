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
        if (!process.env.API_LOGIN) {
          throw new Error("API_LOGIN environment variable is not defined");
        }

        const res = await fetch(process.env.API_LOGIN, {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
        });

        const data = await res.json();

        if (res.ok && data.token) {
          const user = {
            token: data.token,
            id: data.userID,
            role: data.role,
            username: data.username,
            fullname: data.fullname,
          };

          return user;
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.fullname = user.fullname;
        token.username = user.username;
      }
      return token;
    },

    async session({ session, token, user }: any) {
      session.accessToken = token.accessToken;
      session.user.id = token.id;
      session.user.role = token.role;
      session.user.fullname = token.fullname;
      session.user.username = token.username;

      return session;
    },
  },

  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
