"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Copy } from "lucide-react";

interface CodeBlockProps {
  code: string;
  language?: string;
}

export function CodeBlock({ code, language = "javascript" }: CodeBlockProps) {
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    toast.success("Code copied to clipboard!");
  };

  return (
    <div className="relative rounded-md bg-muted p-4 font-mono text-xs text-muted-foreground overflow-x-auto">
      <Button
        size="icon"
        variant="ghost"
        className="absolute top-2 right-2 h-6 w-6 hover:bg-background/50"
        onClick={handleCopy}
      >
        <Copy className="h-3 w-3" />
        <span className="sr-only">Copy code</span>
      </Button>
      <pre>
        <code className={`language-${language}`}>{code}</code>
      </pre>
    </div>
  );
}
