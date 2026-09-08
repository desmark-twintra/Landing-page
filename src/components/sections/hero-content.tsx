"use client";

import { MessageSquare } from "lucide-react";
import { company } from "@/content/company";
import { QuoteButton } from "@/components/quote/quote-button";
import { InteractiveHoverLink } from "@/components/ui/interactive-hover-button";
import { cn } from "@/lib/utils";
import { useHeroIntro } from "./hero-intro-context";

/**
 * The hero's copy column. Held back while the chilli plays its centred intro,
 * then faded up as the pile travels into its slot.
 *
 * Hidden with opacity and transform only — never `display:none`, `hidden`, or
 * conditional rendering. The heading has to stay in the document and in the
 * accessibility tree throughout: it is the page's `h1`, and removing it would
 * cost both screen-reader users and search engines. `pointer-events-none`
 * covers the matching hazard, that the enquiry button would otherwise be
 * clickable while invisible.
 */
export function HeroContent() {
  const { revealed } = useHeroIntro();

  return (
    <div
      /* The pre-paint rule in globals.css targets this, so the copy is hidden
         in the browser's first frame rather than once React has hydrated. */
      data-hero-copy
      className={cn(
        "max-w-xl transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] lg:pl-8",
        revealed
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0",
      )}
    >
      <div className="flex items-center gap-3">
        <span aria-hidden className="h-px w-8 bg-panel-accent/60" />
        <span className="text-[clamp(10px,1vw+0.3rem,11px)] font-semibold uppercase tracking-[0.2em] text-panel-ink/70">
          {company.eyebrow}
        </span>
      </div>

      {/* Fluid, so the block shrinks on short screens rather than
          forcing the fold open. */}
      <h1 className="mt-[clamp(1rem,2.6vh,1.75rem)] font-display text-[clamp(2rem,5.2vw+0.6rem,4.15rem)] leading-[1.06] tracking-[-0.025em] text-panel-ink text-balance-tight">
        Trade Beyond
        <br />
        Transactions —
        <br />
        <span className="text-panel-accent">Rooted in India&apos;s</span>
        <br />
        <span className="text-panel-accent">Finest Chillies.</span>
      </h1>

      <p className="mt-[clamp(0.75rem,2vh,1.75rem)] max-w-lg text-[clamp(14px,0.55vw+0.72rem,16.5px)] leading-[1.65] text-panel-ink/65">
        {company.heroLead}
      </p>

      <div className="mt-[clamp(1.25rem,3vh,2.25rem)] flex flex-wrap items-center gap-3">
        <QuoteButton variant="primary" size="lg">
          <MessageSquare className="size-4" aria-hidden />
          Start an Enquiry
        </QuoteButton>

        <InteractiveHoverLink href="/products" variant="glass" size="lg">
          View Products
        </InteractiveHoverLink>
      </div>
    </div>
  );
}
