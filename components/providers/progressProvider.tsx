"use client";

import { ProgressProvider as AppProgressProvider } from "@bprogress/next/app";
import { ReactNode, Suspense } from "react";

export default function ProgressProvider({
  children,
}: {
  children: ReactNode;
}) {
  return (
    // <Suspense>
    <AppProgressProvider options={{ showSpinner: false }} color="black">
      {children}
    </AppProgressProvider>
    // {/* </Suspense> */}
  );
}
