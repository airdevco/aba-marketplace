"use client";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { HideDevIndicator } from "./hide-dev-indicator";
import { EmployerMessageDrawerProvider } from "@/components/EmployerMessageDrawerContext";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <EmployerMessageDrawerProvider>
          <HideDevIndicator />
          <Toaster />
          <Sonner position="top-right" />
          {children}
        </EmployerMessageDrawerProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
