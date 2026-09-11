import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  label: string;
  title: string;
  /** Optional supporting sentence under the title. */
  lead?: string;
  align?: "left" | "center";
  /** Heading level. Defaults to h2; pass "h1" where this lockup is the page
   *  title, as on /contact, so every route has exactly one h1. */
  as?: "h1" | "h2";
  tone?: "light" | "dark";
  className?: string;
};

/**
 * The eyebrow-rule + label + serif title lockup. It repeats seven times across
 * the page, so all the spacing and tone rules live here.
 */
export function SectionHeading({
  label,
  title,
  lead,
  align = "left",
  tone = "light",
  as: Heading = "h2",
  className,
}: SectionHeadingProps) {
  const centered = align === "center";
  const onDark = tone === "dark";

  return (
    <div
      className={cn(
        "flex flex-col",
        centered && "items-center text-center",
        className,
      )}
    >
      <div className={cn("flex items-center gap-3", centered && "justify-center")}>
        <span
          aria-hidden
          className={cn("h-px w-8", onDark ? "bg-accent/70" : "bg-accent/60")}
        />
        <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
          {label}
        </span>
      </div>

      <Heading
        className={cn(
          "mt-5 max-w-3xl font-display text-[2rem] leading-[1.12] tracking-[-0.015em] text-balance-tight sm:text-[2.6rem] lg:text-[3.1rem]",
          onDark ? "text-panel-ink" : "text-heading",
        )}
      >
        {/* Titles carry deliberate line breaks in the content layer */}
        {title.split("\n").map((line, i) => (
          <span key={i} className="block">
            {line}
          </span>
        ))}
      </Heading>

      {lead && (
        <p
          className={cn(
            "mt-5 max-w-2xl text-[15px] leading-relaxed sm:text-base",
            onDark ? "text-panel-ink/65" : "text-ink-mid",
          )}
        >
          {lead}
        </p>
      )}
    </div>
  );
}
