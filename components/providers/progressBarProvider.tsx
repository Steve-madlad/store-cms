"use client";

import { ProgressProvider } from "@bprogress/next/app";
import { useTheme } from "next-themes";
import { ReactNode, useEffect, useState } from "react";

export default function ProgressBarProvider({
  children,
}: {
  children: ReactNode;
}) {
  const theme = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <ProgressProvider
      options={{ showSpinner: false }}
      color={mounted && theme.resolvedTheme === "light" ? "black" : "white"}
    >
      {children}
    </ProgressProvider>
  );
}
