"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { AnimatePresence, motion } from "motion/react";
import { FileText, Menu, Phone, X } from "lucide-react";
import { company, contact, navLinks } from "@/content/company";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import { whatsappHref } from "@/lib/whatsapp";
import { BrandMark } from "@/components/ui/brand-mark";
import { QuoteButton } from "@/components/quote/quote-button";
import { useQuote } from "@/components/quote/quote-provider";
import { Container } from "@/components/ui/container";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { useScrollViewport } from "@/components/scroll-viewport-context";
import { useHasMounted, useReducedMotionSafe } from "@/lib/hydration";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const reduced = useReducedMotionSafe();
  const viewportRef = useScrollViewport();
  const { resolvedTheme, setTheme } = useTheme();

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { enquiryList, openList } = useQuote();

  // The server has no idea which theme will win, so the toggle can't render
  // until after hydration without risking a mismatch.
  const mounted = useHasMounted();

  /**
   * Now that every nav entry is its own route, "active" is just the current
   * path. `startsWith` rather than equality so /products/teja-variety keeps
   * Products lit; Home is exact, since every path starts with "/".
   */
  function isActiveHref(href: string) {
    return href === "/" ? pathname === "/" : pathname.startsWith(href);
  }

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

  useEffect(() => {
    if (!menuOpen) return;
    const el = viewportRef.current;
    if (!el) return;
    const previous = el.style.overflow;
    el.style.overflow = "hidden";
    return () => {
      el.style.overflow = previous;
    };
  }, [menuOpen, viewportRef]);

  useEffect(() => {
    if (!menuOpen) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setMenuOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  const solid = scrolled || menuOpen;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]",
        solid
          ? "border-b border-outline/10 bg-surface/85 shadow-[0_1px_24px_-12px_rgba(30,17,64,0.4)] backdrop-blur-xl"
          : "on-dark border-b border-transparent bg-transparent",
      )}
    >
      <Container className="flex h-18 items-center justify-between gap-6 py-3.5">
        <Link
          href="/"
          aria-label={`${company.name} — home`}
          onClick={() => setMenuOpen(false)}
          className="shrink-0 rounded-lg"
        >
          <BrandMark tone={solid ? "light" : "dark"} />
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = isActiveHref(link.href);

              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "relative rounded-full px-4 py-2 text-[14px] transition-colors duration-200",
                      solid
                        ? isActive
                          ? "text-heading"
                          : "text-ink-mid hover:text-heading"
                        : isActive
                          ? "text-panel-ink"
                          : "text-panel-ink/65 hover:text-panel-ink",
                    )}
                  >
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId={reduced ? undefined : "nav-active"}
                        aria-hidden
                        className={cn(
                          "absolute inset-0 -z-10 rounded-full",
                          solid ? "bg-outline/[0.07]" : "bg-panel-ink/12",
                        )}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          {mounted ? (
            <AnimatedThemeToggler
              theme={resolvedTheme === "dark" ? "dark" : "light"}
              onThemeChange={setTheme}
              className={cn(
                "hidden size-10 items-center justify-center rounded-full border transition-colors sm:flex [&_svg]:size-5",
                solid
                  ? "border-outline/15 text-heading hover:bg-outline/[0.06]"
                  : "border-panel-ink/20 text-panel-ink hover:bg-panel-ink/10",
              )}
            />
          ) : (
            <div
              aria-hidden
              className={cn(
                "hidden size-10 rounded-full border sm:block",
                solid ? "border-outline/15" : "border-panel-ink/20",
              )}
            />
          )}

          <div className="relative hidden lg:inline-flex">
            <QuoteButton
              variant={solid ? "primary" : "glass"}
              size="sm"
              interactive
              className="inline-flex"
            />
            {enquiryList.length > 0 && (
              <button
                type="button"
                onClick={openList}
                aria-label={`Enquiry list, ${enquiryList.length} selected`}
                className="absolute -right-1 -top-1 flex size-4.5 items-center justify-center rounded-full bg-chilli text-[10px] font-semibold text-cream"
              >
                {enquiryList.length}
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={openList}
            aria-label={`Enquiry list${enquiryList.length ? `, ${enquiryList.length} selected` : ""}`}
            className={cn(
              "relative flex size-10 items-center justify-center rounded-full border transition-colors lg:hidden",
              solid
                ? "border-outline/15 text-heading hover:bg-outline/[0.06]"
                : "border-panel-ink/20 text-panel-ink hover:bg-panel-ink/10",
            )}
          >
            <FileText className="size-4.5" aria-hidden />
            {enquiryList.length > 0 && (
              <span className="absolute -right-1 -top-1 flex size-4.5 items-center justify-center rounded-full bg-chilli text-[10px] font-semibold text-cream">
                {enquiryList.length}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className={cn(
              "flex size-10 items-center justify-center rounded-full border transition-colors lg:hidden",
              solid
                ? "border-outline/15 text-heading hover:bg-outline/[0.06]"
                : "border-panel-ink/20 text-panel-ink hover:bg-panel-ink/10",
            )}
          >
            {menuOpen ? (
              <X className="size-5" aria-hidden />
            ) : (
              <Menu className="size-5" aria-hidden />
            )}
          </button>
        </div>
      </Container>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-nav"
            initial={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
            animate={reduced ? { opacity: 1 } : { height: "auto", opacity: 1 }}
            exit={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-outline/10 bg-surface lg:hidden"
          >
            <Container className="py-5">
              <ul className="flex flex-col">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="block border-b border-outline/[0.07] py-3.5 font-display text-xl text-heading transition-colors hover:text-accent"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex items-center gap-2.5">
                {mounted ? (
                  <AnimatedThemeToggler
                    theme={resolvedTheme === "dark" ? "dark" : "light"}
                    onThemeChange={setTheme}
                    className="flex size-11 shrink-0 items-center justify-center rounded-full border border-outline/15 text-heading transition-colors hover:bg-outline/[0.06] [&_svg]:size-5"
                  />
                ) : (
                  <div aria-hidden className="size-11 shrink-0 rounded-full border border-outline/15" />
                )}

                <a
                  href={`tel:${contact.phoneHref}`}
                  onClick={() => setMenuOpen(false)}
                  className="flex h-11 flex-1 items-center justify-center gap-2 rounded-full border border-outline/15 text-[14px] font-medium text-heading transition-colors hover:bg-outline/[0.06]"
                >
                  <Phone className="size-4" aria-hidden />
                  Call
                </a>

                <a
                  href={whatsappHref()}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMenuOpen(false)}
                  className="flex h-11 flex-1 items-center justify-center gap-2 rounded-full bg-[#25D366] text-[14px] font-medium text-white transition-opacity hover:opacity-90"
                >
                  <WhatsAppIcon className="size-4" />
                  WhatsApp
                </a>
              </div>

              <div className="pt-3">
                <QuoteButton variant="primary" size="lg" className="w-full" />
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
