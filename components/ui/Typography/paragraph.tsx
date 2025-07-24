import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export function P({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <p className={cn(className, "leading-7")}>{children}</p>;
}
