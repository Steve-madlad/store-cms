import { cn } from "@/lib/utils";

export function P({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  return <p className={cn(className, "leading-7")}>{children}</p>;
}
