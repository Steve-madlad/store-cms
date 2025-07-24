import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export function H2({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={cn(
        className,
        "scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0",
      )}
    >
      {children}
    </h2>
  );
}
