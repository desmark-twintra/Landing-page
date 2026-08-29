import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

export type HoverButtonVariant = "violet" | "glass" | "primary";
export type HoverButtonSize = "sm" | "md" | "lg";

const base =
  "group relative inline-flex w-auto cursor-pointer items-center justify-center overflow-hidden rounded-full text-center font-medium tracking-[0.01em] transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] disabled:cursor-not-allowed disabled:opacity-55";

const variants: Record<
  HoverButtonVariant,
  { root: string; dot: string; reveal: string }
> = {
  violet: {
    root: "bg-violet-600 text-white shadow-[0_0_0_1px_rgba(167,139,250,0.35),0_10px_30px_-10px_rgba(139,92,246,0.85)]",
    dot: "bg-white",
    reveal: "text-violet-700",
  },
  glass: {
    root: "border border-panel-ink/20 bg-panel-ink/10 text-panel-ink backdrop-blur-md",
    dot: "bg-panel-ink",
    reveal: "text-panel",
  },
  primary: {
    root: "bg-chilli text-cream shadow-[0_1px_2px_rgba(192,57,43,0.35)]",
    dot: "bg-cream",
    reveal: "text-chilli",
  },
};

const sizes: Record<HoverButtonSize, string> = {
  sm: "h-9 px-4 text-[13px]",
  md: "h-11 px-6 text-sm",
  lg: "h-13 px-8 text-[15px]",
};

function HoverContent({
  variant,
  children,
}: {
  variant: HoverButtonVariant;
  children: React.ReactNode;
}) {
  const v = variants[variant];

  return (
    <>
      <div className="flex items-center justify-center gap-2">
        <div
          className={cn(
            "h-2 w-2 rounded-full transition-all duration-300 group-hover:scale-[100.8]",
            v.dot,
          )}
        />
        <span className="inline-block transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0">
          {children}
        </span>
      </div>
      <div
        className={cn(
          "absolute top-0 z-10 flex h-full w-full translate-x-12 items-center justify-center gap-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100",
          v.reveal,
        )}
      >
        <span>{children}</span>
        <ArrowRight className="size-4" aria-hidden />
      </div>
    </>
  );
}

type InteractiveHoverButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: HoverButtonVariant;
  size?: HoverButtonSize;
};

export function InteractiveHoverButton({
  variant = "violet",
  size = "md",
  className,
  children,
  ...props
}: InteractiveHoverButtonProps) {
  return (
    <button
      className={cn(base, variants[variant].root, sizes[size], className)}
      {...props}
    >
      <HoverContent variant={variant}>{children}</HoverContent>
    </button>
  );
}

type InteractiveHoverLinkProps = React.ComponentProps<typeof Link> & {
  variant?: HoverButtonVariant;
  size?: HoverButtonSize;
};

export function InteractiveHoverLink({
  variant = "violet",
  size = "md",
  className,
  children,
  ...props
}: InteractiveHoverLinkProps) {
  return (
    <Link
      className={cn(base, variants[variant].root, sizes[size], className)}
      {...props}
    >
      <HoverContent variant={variant}>{children}</HoverContent>
    </Link>
  );
}
