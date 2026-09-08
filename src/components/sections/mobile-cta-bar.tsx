"use client";

import Link from "next/link";
import { Phone } from "lucide-react";
import { contact } from "@/content/company";
import { useQuote } from "@/components/quote/quote-provider";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import { whatsappHref } from "@/lib/whatsapp";

/**
 * Fixed (not `sticky` — `AppScrollArea` is the real scroll container, so
 * `fixed` is what actually pins this to the viewport bottom, matching
 * SiteHeader's own `fixed` top bar) Call / WhatsApp / enquire bar shown on
 * phones and tablets. The footer reserves matching bottom padding below `lg`
 * so this never covers footer content.
 *
 * Two icon buttons at `size-12` plus gaps and gutters leave ~180px for the
 * CTA at 320px, so its label stays on one line at the smallest width and
 * only gains the second line from `sm` up.
 */
export function MobileCtaBar() {
  const { enquiryList } = useQuote();
  const count = enquiryList.length;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex gap-2 border-t border-outline/10 bg-surface/95 px-3 pb-[calc(11px+env(safe-area-inset-bottom))] pt-2.5 backdrop-blur-xl sm:gap-2.5 sm:px-4 lg:hidden">
      <a
        href={`tel:${contact.phoneHref}`}
        aria-label="Call"
        className="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-outline/15 bg-card text-heading sm:size-13"
      >
        <Phone className="size-4.5" aria-hidden />
      </a>

      <a
        href={whatsappHref()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[#25D366] text-white sm:size-13"
      >
        <WhatsAppIcon className="size-4.5" />
      </a>

      <Link
        href="/contact"
        className="flex h-12 min-w-0 flex-1 flex-col items-center justify-center rounded-2xl bg-chilli text-cream sm:h-13"
      >
        <span className="text-[14px] font-semibold leading-tight sm:text-[15px]">
          {count > 0 ? "Send enquiry" : "Start an Enquiry"}
        </span>
        <span className="hidden text-[11px] leading-tight opacity-80 sm:block">
          {count > 0
            ? `${count} product${count === 1 ? "" : "s"} selected`
            : "We reply personally"}
        </span>
      </Link>
    </div>
  );
}
