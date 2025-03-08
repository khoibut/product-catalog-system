import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ConvexClientProvider } from "./ConvexClientProvider";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const metadata: Metadata = {
  title: "Ecommerce",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Retrieve the session from NextAuth on the server.
  const session = await getServerSession(authOptions)
  // Extract the username from the session (if available).
  const username = session?.user?.name || null;
  return (
    <html lang="en">
      <head>
        <style>
          {`@import url('https://fonts.googleapis.com/css2?family=Public+Sans:ital,wght@0,100..900;1,100..900&display=swap');`}
        </style>
      </head>
      <body>
        <ConvexClientProvider>
          <Header username={username} inverted={false} />
          {children}
          <Footer />
        </ConvexClientProvider>
      </body>
    </html>
  );
}
