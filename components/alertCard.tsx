"use client";

import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Badge } from "./ui/badge";
import { Check, Copy, Server, ShieldCheck } from "lucide-react";
import { Button } from "./ui/custom/button";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";
import type { AlertCardProps } from "@/models/components";

type BadgeVarients = "default" | "secondary" | "destructive" | "outline";

const textMap: Record<AlertCardProps["variant"], string> = {
  public: "Public",
  admin: "Admin",
};

const variantMap: Record<AlertCardProps["description"], BadgeVarients> = {
  public: "secondary",
  admin: "destructive",
};

export default function AlertCard({
  title,
  description,
  loading,
  variant = "public",
  className,
}: AlertCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (copied || loading) return;
    setCopied(true);
    navigator.clipboard.writeText(description);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <Alert className={cn(className)}>
      <Server />
      <AlertTitle className="align-center gap-x-2">
        {title}
        <Badge variant={variantMap[variant]}>{textMap[variant]}</Badge>
        {variant === "admin" && <ShieldCheck size={17} />}
      </AlertTitle>
      <AlertDescription className="flex-between mt-3 gap-4">
        {loading ? (
          <div className="h-3.5 w-3/4 animate-pulse rounded-full bg-gray-200"></div>
        ) : (
          <code className="bg-muted py[0.3rem] text-foreground relative rounded px-[0.3rem] font-mono text-sm font-semibold">
            {description}
          </code>
        )}

        <Button
          variant={"outline"}
          className="text-foreground"
          size={"icon"}
          onClick={handleCopy}
        >
          {copied ? <Check className="!text-chart-2" /> : <Copy />}
        </Button>
      </AlertDescription>
    </Alert>
  );
}
