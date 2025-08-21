import React from "react";
import { H2 } from "./ui/Typography/heading2";
import { P } from "./ui/Typography/paragraph";
import { Separator } from "./ui/separator";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ExternalLink, Store } from "lucide-react";

export default function Heading({
  header,
  description,
  link,
  separator,
  className,
}: {
  header: string;
  description: string;
  link?: string;
  separator?: boolean;
  className?: string;
}) {
  return (
    <div className={cn(className)}>
      <div className="flex-between">
        <div>
          <H2>{header}</H2>
          <P className="text-muted-foreground">{description}</P>
        </div>

        {link && (
          <Link target="_blank" className="flex-center gap-3" href={link}>
            <Store size={15} /> Checkout Store <ExternalLink size={15} />
          </Link>
        )}
      </div>
      {separator && <Separator className="bg-border h-[1px]" />}
    </div>
  );
}
