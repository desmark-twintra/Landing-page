"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { useReducedMotionSafe } from "@/lib/hydration";
import { getProduct } from "@/content/products";
import { useScrollViewport } from "@/components/scroll-viewport-context";
import { Button } from "@/components/ui/button";

/**
 * Mobile-only "quote list" bottom sheet — lists the client-side basket built
 * from Products list rows, lets the buyer trim it, then hands off to the
 * existing inline enquiry form in the Contact section (no drawer, no new
 * submission path). Hand-rolled the same way as QuoteDrawer rather than a
 * @base-ui/react primitive, to match the one modal pattern already in this
 * codebase.
 */
export function QuoteListSheet({
  open,
  basket,
  onRemove,
  onClose,
}: {
  open: boolean;
  basket: string[];
  onRemove: (slug: string) => void;
  onClose: () => void;
}) {
  const reduced = useReducedMotionSafe();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const viewportRef = useScrollViewport();

  useEffect(() => {
    if (!open) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
        return;
      }

      if (e.key !== "Tab" || !panelRef.current) return;

      const focusables = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
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

  const items = basket
    .map((slug) => getProduct(slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100]">
          <motion.button
            type="button"
            aria-label="Close quote list"
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
            aria-labelledby="quote-list-title"
            className="absolute inset-x-0 bottom-0 flex max-h-[80vh] w-full flex-col overflow-hidden rounded-t-3xl border-t border-cream-line bg-surface px-5 pb-[calc(20px+env(safe-area-inset-bottom))] pt-3 shadow-[0_-24px_60px_-24px_rgba(30,17,64,0.45)] lg:inset-x-auto lg:inset-y-8 lg:bottom-auto lg:right-8 lg:max-w-md lg:rounded-3xl lg:border lg:pb-5"
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 40 }}
            animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: 32 }}
            transition={{ duration: reduced ? 0 : 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mx-auto h-1 w-9 shrink-0 rounded-full bg-outline/20" />

            <div className="mt-3 flex shrink-0 items-baseline justify-between gap-3">
              <h2 id="quote-list-title" className="font-display text-xl text-heading">
                Your quote list
              </h2>
              <div className="flex items-center gap-3">
                <span className="text-[13px] text-ink-muted">
                  {items.length} selected
                </span>
                <button
                  ref={closeRef}
                  type="button"
                  onClick={onClose}
                  aria-label="Close"
                  className="flex size-9 shrink-0 items-center justify-center rounded-full border border-outline/15 text-ink-mid hover:bg-outline/[0.06] hover:text-heading"
                >
                  <X className="size-4" aria-hidden />
                </button>
              </div>
            </div>

            {items.length > 0 ? (
              <>
                <div className="mt-3 flex-1 overflow-y-auto">
                  {items.map((product) => (
                    <div
                      key={product.slug}
                      className="flex items-center gap-3 border-b border-cream-line py-3 last:border-b-0"
                    >
                      <span className="relative size-11 shrink-0 overflow-hidden rounded-xl">
                        <Image
                          src={product.image}
                          alt=""
                          fill
                          sizes="44px"
                          className="object-cover"
                        />
                      </span>
                      <span className="flex-1 text-[15px] text-heading">
                        {product.name}
                      </span>
                      <button
                        type="button"
                        onClick={() => onRemove(product.slug)}
                        className="flex h-11 items-center px-3 text-[13.5px] font-medium text-chilli hover:text-chilli-warm"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>

                <a
                  href="#contact"
                  onClick={onClose}
                  className="mt-4 flex h-13.5 shrink-0 items-center justify-center rounded-2xl bg-chilli text-[16px] font-semibold text-cream hover:bg-chilli-warm"
                >
                  Continue to enquiry
                </a>
              </>
            ) : (
              <div className="py-2">
                <p className="mt-2 text-[14.5px] leading-relaxed text-ink-mid">
                  Nothing added yet. Add products from the list and they&apos;ll
                  travel into your enquiry — one message for the whole basket.
                </p>
                <a href="#products" onClick={onClose}>
                  <Button variant="outline" size="lg" className="mt-4 w-full">
                    Browse products
                  </Button>
                </a>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
