import { api } from "@/services/api";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        try {
          const response = await api.post("/user/login", {
            email: credentials.email,
            password: credentials.password,
          });

          if (response?.data.status === 200) {
            return response?.data;
          } else {
            throw new Error("Could not login");
          }
        } catch (error) {
          throw new Error("Could not login");
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
    signOut: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
  // callbacks: {
  //   session: async ({ session, token }) => {
  //     return session;
  //   },
  // },
};
