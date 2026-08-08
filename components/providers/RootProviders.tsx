"use client";

import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";
import { TooltipProvider } from "../ui/tooltip";
import { ClerkProvider } from "@clerk/nextjs";

function RootProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <ClerkProvider afterSignOutUrl="sign-in">
        <TooltipProvider>{children}</TooltipProvider>
      </ClerkProvider>
    </ThemeProvider>
  );
}
export default RootProviders;
