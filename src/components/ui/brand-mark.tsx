import { cn } from "@/lib/utils";
import { company } from "@/content/company";

/**
 * Typographic wordmark standing in for a logo until a real asset is supplied —
 * the source profile only had an upload placeholder, never a file.
 */
export function BrandMark({
  tone = "light",
  className,
}: {
  tone?: "light" | "dark";
  className?: string;
}) {
  const onDark = tone === "dark";

  return (
    <span
      className={cn(
        "inline-flex items-center font-display text-[18.5px] leading-none tracking-[-0.01em]",
        onDark ? "text-panel-ink" : "text-heading",
        className,
      )}
    >
      {company.nameParts.first}&nbsp;
      <span className={onDark ? "text-panel-accent" : "text-accent"}>
        {company.nameParts.second}
      </span>
    </span>
  );
}
