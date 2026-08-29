"use client";

import { Phone } from "lucide-react";
import { contact } from "@/content/company";
import { useQuote } from "@/components/quote/quote-provider";

/**
 * Fixed (not `sticky` — `AppScrollArea` is the real scroll container, so
 * `fixed` is what actually pins this to the viewport bottom, matching
 * SiteHeader's own `fixed` top bar) Call / enquire bar shown on phones and
 * tablets. `<main>` in layout.tsx reserves matching bottom padding below `lg`
 * so this never covers footer content.
 */
export function MobileCtaBar() {
  const { basket } = useQuote();
  const count = basket.length;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex gap-2.5 border-t border-outline/10 bg-surface/95 px-4 pb-[calc(11px+env(safe-area-inset-bottom))] pt-2.5 backdrop-blur-xl lg:hidden">
      <a
        href={`tel:${contact.phoneHref}`}
        aria-label="Call"
        className="flex size-13 shrink-0 items-center justify-center rounded-2xl border border-outline/15 bg-card text-heading"
      >
        <Phone className="size-4.5" aria-hidden />
      </a>
      <a
        href="#contact"
        className="flex h-13 flex-1 flex-col items-center justify-center rounded-2xl bg-chilli text-cream"
      >
        <span className="text-[15px] font-semibold leading-tight">
          {count > 0 ? "Request quote" : "Start an Enquiry"}
        </span>
        <span className="text-[11px] leading-tight opacity-80">
          {count > 0
            ? `${count} product${count === 1 ? "" : "s"} selected`
            : "We reply personally"}
        </span>
      </a>
    </div>
  );
}
