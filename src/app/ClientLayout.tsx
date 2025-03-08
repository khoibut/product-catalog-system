"use client";

import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ConvexClientProvider } from "./ConvexClientProvider";
import { SessionProvider } from "next-auth/react";

interface ClientLayoutProps {
  children: React.ReactNode;
  username: string | null;
}

export default function ClientLayout({ children, username }: ClientLayoutProps) {
  return (
    <SessionProvider>
      <ConvexClientProvider>
        <Header username={username} inverted={false} />
        {children}
        <Footer />
      </ConvexClientProvider>
    </SessionProvider>
  );
}