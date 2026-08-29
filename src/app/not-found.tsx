import Link from "next/link";
import { Container } from "@/components/ui/container";
import { buttonStyles } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="on-dark bg-hero-mesh relative isolate flex min-h-[70vh] items-center overflow-hidden">
      <div aria-hidden className="bg-hero-grid pointer-events-none absolute inset-0 opacity-60" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-surface"
      />

      <Container className="relative py-24 text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-panel-ink/70">
          404 — Not Found
        </p>
        <h1 className="mx-auto mt-5 max-w-xl font-display text-[2.4rem] leading-[1.1] tracking-[-0.02em] text-panel-ink sm:text-[3.2rem]">
          This page isn&apos;t part of our catalogue.
        </h1>
        <p className="mx-auto mt-5 max-w-md text-[15.5px] leading-[1.7] text-panel-ink/60">
          The link may be out of date. Head back to the products we trade, or get in
          touch and we&apos;ll point you the right way.
        </p>

        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Link href="/" className={buttonStyles({ variant: "violet", size: "lg" })}>
            Back to home
          </Link>
          <Link
            href="/#products"
            className={buttonStyles({ variant: "glass", size: "lg" })}
          >
            View products
          </Link>
        </div>
      </Container>
    </div>
  );
}
