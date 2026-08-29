"use client";

import { useQuote } from "./quote-provider";
import { Button, type ButtonSize, type ButtonVariant } from "@/components/ui/button";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";

/**
 * Any "Request Quote" trigger on the site. Passing a product name pre-fills the
 * drawer so the buyer never has to re-state what they were just looking at.
 */
export function QuoteButton({
  product,
  variant = "primary",
  size = "md",
  className,
  interactive = false,
  children = "Request Quote",
}: {
  product?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  /** Renders the MagicUI hover-dot treatment instead of the plain Button. */
  interactive?: boolean;
  children?: React.ReactNode;
}) {
  const { open } = useQuote();

  if (interactive) {
    return (
      <InteractiveHoverButton
        type="button"
        variant={variant as "violet" | "glass" | "primary"}
        size={size}
        className={className}
        onClick={() => open(product)}
      >
        {children}
      </InteractiveHoverButton>
    );
  }

  return (
    <Button
      type="button"
      variant={variant}
      size={size}
      className={className}
      onClick={() => open(product)}
    >
      {children}
    </Button>
  );
}
