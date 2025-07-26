import React from "react";
import { H2 } from "./ui/Typography/heading2";
import { P } from "./ui/Typography/paragraph";
import { Separator } from "./ui/separator";
import { cn } from "@/lib/utils";

export default function Heading({
  header,
  description,
  separator,
  className,
}: {
  header: string;
  description: string;
  separator?: boolean;
  className?: string;
}) {
  return (
    <div className={cn(className)}>
      <div>
        <H2>{header}</H2>
        <P className="text-muted-foreground">{description}</P>
      </div>
      {separator && <Separator className="bg-border h-[1px]" />}
    </div>
  );
}
