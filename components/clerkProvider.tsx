"use client";

import { useTheme } from "next-themes";
import { ReactNode } from "react";
import { ClerkProvider as Provider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

export function ClerkProvider({ children }: { children: ReactNode }) {
  const { resolvedTheme } = useTheme();

  console.log(resolvedTheme, "Current theme in ClerkProvider");

  return (
    <Provider
      appearance={{
        baseTheme: resolvedTheme === "dark" ? dark : undefined,
      }}
    >
      {children}
    </Provider>
  );
}
