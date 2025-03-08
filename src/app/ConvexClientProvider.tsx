"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";
import { ReactNode, JSX } from "react";

// Ensure the environment variable is defined
const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
if (!convexUrl) {
  throw new Error("NEXT_PUBLIC_CONVEX_URL is not defined");
}

// Instantiate the Convex client using the URL
const convex = new ConvexReactClient(convexUrl);

export function ConvexClientProvider({ children }: { children: ReactNode }): JSX.Element {
  return <ConvexProvider client={convex}>{children}</ConvexProvider>;
}
