import { cn } from "@/lib/utils";

export type ButtonVariant =
  | "primary"
  | "outline"
  | "glass"
  | "ghost";

export type ButtonSize = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-[0.01em] transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] disabled:cursor-not-allowed disabled:opacity-55";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-chilli text-cream shadow-[0_1px_2px_rgba(192,57,43,0.35)] hover:bg-chilli-warm hover:shadow-[0_8px_24px_-8px_rgba(192,57,43,0.6)] hover:-translate-y-px active:translate-y-0",
  outline:
    "border border-outline/20 bg-transparent text-heading hover:border-outline/45 hover:bg-outline/[0.04]",
  glass:
    "border border-panel-ink/20 bg-panel-ink/10 text-panel-ink backdrop-blur-md hover:border-panel-ink/35 hover:bg-panel-ink/16",
  ghost: "bg-transparent text-heading hover:bg-outline/[0.06]",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-[13px]",
  md: "h-11 px-6 text-sm",
  lg: "h-13 px-8 text-[15px]",
};

export function buttonStyles({
  variant = "primary",
  size = "md",
  className,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
} = {}) {
  return cn(base, variants[variant], sizes[size], className);
}

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export function Button({
  variant,
  size,
  className,
  ...props
}: ButtonProps) {
  return <button className={buttonStyles({ variant, size, className })} {...props} />;
}
