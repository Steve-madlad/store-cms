"use client";

import { useState } from "react";
import { Button } from "./ui/custom/button";
import { Check, Clipboard } from "lucide-react";

export default function TempCodeBlock({
  response,
}: {
  response: Record<string, string | Date>;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const json = JSON.stringify(response, null, 2);
    navigator.clipboard.writeText(json);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <pre className="w-fit overflow-hidden rounded-md bg-[#1d202d] pt-2 pr-2">
      <div className="just-end">
        <Button
          onClick={handleCopy}
          className="hover:text-muted-foreground !bg-transparent"
        >
          {copied ? <Check className="text-chart-2" /> : <Clipboard />}
        </Button>
      </div>
      <div className="p-4 pt-0">
        <code className="text-white">{JSON.stringify(response, null, 2)}</code>
      </div>
    </pre>
  );
}
