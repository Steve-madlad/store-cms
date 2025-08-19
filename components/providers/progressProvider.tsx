"use client";

import { ProgressProvider as AppProgressProvider } from "@bprogress/next/app";
import { useTheme } from "next-themes";
import { ReactNode, Suspense, useEffect, useState } from "react";

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
    // <Suspense>
    <AppProgressProvider
      options={{ showSpinner: false }}
      color={mounted && theme.resolvedTheme === "light" ? "black" : "white"}
    >
      {children}
    </AppProgressProvider>
    // {/* </Suspense> */}
  );
}
