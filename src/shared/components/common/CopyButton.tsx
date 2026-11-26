import { useState } from "react";
import { Check, Copy } from "lucide-react";

import { Button } from "@/shared/components/ui/button";
import { cn } from "@/shared/lib/utils/cn";

interface CopyButtonProps {
  value: string;

  label?: string;

  copiedLabel?: string;

  size?: "sm" | "default" | "lg" | "icon";

  variant?:
    | "default"
    | "secondary"
    | "outline"
    | "ghost"
    | "link";

  className?: string;

  onCopied?: () => void;
}

export default function CopyButton({
  value,

  label,

  copiedLabel = "Copied!",

  size = "icon",

  variant = "ghost",

  className,

  onCopied,
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);

      setCopied(true);

      onCopied?.();

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  return (
    <Button
      type="button"
      variant={variant}
      size={size}
      onClick={handleCopy}
      className={cn(className)}
    >
      {copied ? (
        <>
          <Check className="h-4 w-4" />

          {label && (
            <span>{copiedLabel}</span>
          )}
        </>
      ) : (
        <>
          <Copy className="h-4 w-4" />

          {label && (
            <span>{label}</span>
          )}
        </>
      )}
    </Button>
  );
}