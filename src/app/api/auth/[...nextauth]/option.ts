import axios from "axios";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          // Ensure credentials are included in the request
          const response = await axios.post(
            "http://localhost:3001/user/login",
            {
              username: credentials?.username,
              password: credentials?.password,
            }
          );
          const user = response.data;
          if (user) {
            return user;
          } else {
            return null;
          }
        } catch (error) {
          // Handle errors, e.g., log them or return a custom error message
          console.error("Authentication error:", error);
          return null;
        }
      },
    }),
  ],
};
