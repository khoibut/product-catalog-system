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
          // Call your Convex login mutation to validate credentials.
          const user = await convex.mutation(api.users.login, {
            email: credentials.email,
            password: credentials.password,
          });
          return {
            id: user.userId, // Map userId to id
            name: user.name,
            email: user.email,
          }; // Ensure this returns an object that includes an "id" or "_id" property.
        } catch (error) {
          console.error("NextAuth authorize error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: any; user?: any }) {
      // On first sign-in, add user.id (or _id) to the token.
      if (user) {
        token.id = user.id || user._id;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      // Make the user id available in the session.
      // We add a custom property "id" to session.user.
      session.user = {
        ...session.user,
        id: token.id,
      };
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
