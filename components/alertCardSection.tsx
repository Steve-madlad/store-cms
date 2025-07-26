"use client";

import type { AlertCardProps } from "@/models/components";
import AlertCard from "./alertCard";
import { cn } from "@/lib/utils";

export default function AlertCardSection({
  cards,
  className,
}: {
  cards: AlertCardProps[];
  className?: string;
}) {
  return (
    <section className={cn("col gap-4", className)}>
      {cards.map((card, index) => (
        <AlertCard key={index} {...card} />
      ))}
    </section>
  );
}
