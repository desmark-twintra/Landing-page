"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { MessageSquare } from "lucide-react";
import { QuoteButton } from "@/components/quote/quote-button";
import { useScrollViewport } from "@/components/scroll-viewport-context";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import { whatsappHref } from "@/lib/whatsapp";

/**
 * Desktop-only persistent Enquire + WhatsApp cluster. Mirrors SiteHeader's own
 * "past the hero" scroll threshold so it appears at the same moment the header
 * itself goes solid, rather than competing with the hero on first load.
 */
export function DesktopEnquireBar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const viewportRef = useScrollViewport();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!isHome) return;
    const el = viewportRef.current;
    if (!el) return;

    function onScroll() {
      setScrolled(el!.scrollTop > el!.clientHeight * 0.72);
    }

    onScroll();
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [isHome, viewportRef]);

  if (isHome && !scrolled) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40 hidden flex-col items-end gap-3 lg:flex">
      <a
        href={whatsappHref()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="flex size-13 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_12px_28px_-10px_rgba(0,0,0,0.45)] transition-transform hover:-translate-y-0.5"
      >
        <WhatsAppIcon className="size-5.5" />
      </a>

      <QuoteButton variant="primary" size="md">
        <MessageSquare className="size-4" aria-hidden />
        Enquire
      </QuoteButton>
    </div>
  );
}
