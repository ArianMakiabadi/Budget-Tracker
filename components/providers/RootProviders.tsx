"use client";

import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";
import { TooltipProvider } from "../ui/tooltip";
import { ClerkProvider } from "@clerk/nextjs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function RootProviders({ children }: { children: ReactNode }) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
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
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
export default RootProviders;
