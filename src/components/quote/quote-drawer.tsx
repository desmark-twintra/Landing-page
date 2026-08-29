"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useReducedMotionSafe } from "@/lib/hydration";
import { X } from "lucide-react";
import { EnquiryForm } from "./enquiry-form";
import { getProduct } from "@/content/products";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useScrollViewport } from "@/components/scroll-viewport-context";

export function QuoteDrawer({
  open,
  product,
  onClose,
}: {
  open: boolean;
  product?: string;
  onClose: () => void;
}) {
  const reduced = useReducedMotionSafe();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const viewportRef = useScrollViewport();

  // Close on Escape, and keep Tab focus inside the panel while it is open.
  useEffect(() => {
    if (!open) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
        return;
      }

      if (e.key !== "Tab" || !panelRef.current) return;

      const focusables = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([tabindex="-1"]), select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  // Lock app scroll behind the drawer.
  useEffect(() => {
    if (!open) return;
    const el = viewportRef.current;
    closeRef.current?.focus();
    if (!el) return;
    const previous = el.style.overflow;
    el.style.overflow = "hidden";
    return () => {
      el.style.overflow = previous;
    };
  }, [open, viewportRef]);

  const matched = product ? getProduct(product) : undefined;
  const displayName = matched?.name ?? product;

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100]">
          <motion.button
            type="button"
            aria-label="Close quote panel"
            onClick={onClose}
            className="absolute inset-0 h-full w-full cursor-default bg-violet-900/45 backdrop-blur-[3px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.25 }}
          />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="quote-drawer-title"
            className="absolute inset-y-5 right-5 flex w-[calc(100%-1.25rem)] max-w-[540px] flex-col overflow-hidden rounded-2xl border border-cream-line bg-surface shadow-[0_40px_90px_-30px_rgba(30,17,64,0.55)] sm:inset-y-8 sm:right-8 sm:w-[calc(100%-2rem)] lg:inset-y-10 lg:right-10 lg:w-[calc(100%-2.5rem)]"
            initial={reduced ? { opacity: 0 } : { opacity: 0, x: 60, y: 24 }}
            animate={reduced ? { opacity: 1 } : { opacity: 1, x: 0, y: 0 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, x: 40, y: 16 }}
            transition={{ duration: reduced ? 0 : 0.42, ease: [0.22, 1, 0.36, 1] }}
          >
            <header className="on-dark relative shrink-0 overflow-hidden bg-panel px-6 py-7 sm:px-8">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-60"
                style={{
                  background:
                    "radial-gradient(ellipse 60% 90% at 88% 10%, rgba(224,95,58,0.35) 0%, transparent 62%)",
                }}
              />
              <div className="relative flex items-start justify-between gap-4">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
                    Request a Quote
                  </p>
                  <h2
                    id="quote-drawer-title"
                    className="mt-2 font-display text-2xl leading-tight text-panel-ink sm:text-[1.75rem]"
                  >
                    {displayName ?? "Tell us what you need"}
                  </h2>
                  {matched && (
                    <p className="mt-2 max-w-sm text-[13.5px] leading-relaxed text-panel-ink/60">
                      {matched.summary}
                    </p>
                  )}
                </div>

                <button
                  ref={closeRef}
                  type="button"
                  onClick={onClose}
                  aria-label="Close"
                  className="-mr-1 -mt-1 flex size-9 shrink-0 items-center justify-center rounded-full border border-panel-ink/15 text-panel-ink/70 transition-colors hover:border-panel-ink/35 hover:bg-panel-ink/10 hover:text-panel-ink"
                >
                  <X className="size-4" aria-hidden />
                </button>
              </div>
            </header>

            <ScrollArea className="flex-1" viewportProps={{ className: "px-6 py-7 sm:px-8" }}>
              <EnquiryForm
                presetProduct={matched?.name ?? product}
                compact
                onSuccess={() => {
                  // Leave the confirmation on screen; the user closes when ready.
                }}
              />
            </ScrollArea>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
