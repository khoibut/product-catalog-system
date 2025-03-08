import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { api } from "../../../../../convex/_generated/api";
import { ConvexHttpClient } from "convex/browser";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;
        try {
          const user = await convex.mutation(api.users.login, {
            email: credentials.email,
            password: credentials.password,
          });
          // Ensure your user object includes the username (or "name")
          return { id: user.userId, name: user.name, email: user.email }; // { id, name, email }
        } catch (error) {
          console.error("NextAuth authorize error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }: { token: any, user?: any, account?: any, profile?: any, isNewUser?: boolean }) {
      // On initial sign-in, user object is available. Store it in the token.
      if (user) {
        token.user = user; // Add the full user object to the token
      }
      return token;
    },
    async session({ session, token }: { session: any, token: any }) {
      // Attach the token's user data to the session
      session.user = token.user as any;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
