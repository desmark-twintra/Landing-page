import { cn } from "@/lib/utils";

type BadgeProps = {
  status?: "active" | "pending" | "neutral";
  tone?: "light" | "dark";
  className?: string;
  children: React.ReactNode;
};

export function Badge({
  status = "neutral",
  tone = "light",
  className,
  children,
}: BadgeProps) {
  const onDark = tone === "dark";

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[11.5px] font-medium tracking-[0.06em]",
        onDark
          ? "border-panel-ink/15 bg-panel-ink/[0.07] text-panel-ink/80 backdrop-blur-sm"
          : status === "pending"
            ? "border-amber/30 bg-amber/10 text-amber"
            : status === "active"
              ? "border-success/30 bg-success/10 text-success"
              : "border-outline/15 bg-outline/[0.04] text-ink-mid",
        className,
      )}
    >
      <span
        aria-hidden
        className={cn(
          "size-1.5 shrink-0 rounded-full",
          status === "pending"
            ? "bg-amber"
            : status === "active"
              ? "bg-success"
              : onDark
                ? "bg-panel-accent"
                : "bg-ink-muted",
          status === "active" &&
            "shadow-[0_0_0_3px_color-mix(in_srgb,var(--color-success)_20%,transparent)]",
        )}
      />
      {children}
    </span>
  );
}
