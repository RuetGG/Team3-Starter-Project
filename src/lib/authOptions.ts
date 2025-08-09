import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";
import { Session, User } from "next-auth";
import crypto from "crypto";

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
        rememberMe: { label: "Remember Me", type: "text" },
      },
      async authorize(credentials) {
        const rememberMe = credentials?.rememberMe === "true";

        if (!credentials?.email || !credentials?.password) return null;

        try {
          const res = await fetch(
            "https://a2sv-application-platform-backend-team3.onrender.com/auth/token/",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
              }),
            }
          );

          const data = await res.json();
          console.log("Auth API response:", data); // For debugging

          if (res.ok && data.success && data.data?.access) {
            return {
              id: credentials.email,
              email: credentials.email,
              accessToken: data.data.access,
              refreshToken: data.data.refresh,
              role: data.data.role,
              rememberMe,
            } as User;
          }

          console.warn("Login failed", res.status, data);
          return null;
        } catch (err) {
          console.error("Authorize error:", err);
          return null;
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.role = user.role;
        token.email = user.email;
        token.rememberMe = user.rememberMe;
        token.exp =
          Math.floor(Date.now() / 1000) +
          (user.rememberMe ? 30 * 24 * 60 * 60 : 24 * 60 * 60); // 30 days or 1 day
      }

      const currentTime = Math.floor(Date.now() / 1000);
      if (token.exp && currentTime > token.exp) {
        console.log("JWT expired");
        token.expired = true;
      }

      return token;
    },

    async session({ session, token }: { session: Session; token: JWT }) {
      session.accessToken = token.accessToken as string;
      session.refreshToken = token.refreshToken as string;
      session.role = token.role as string;
      session.user.email = token.email as string;
      session.rememberMe = token.rememberMe;
      return session;
    },
  },

  pages: {
    signIn: "/auth/signin",
  },

  debug: process.env.NODE_ENV === "development",
};
