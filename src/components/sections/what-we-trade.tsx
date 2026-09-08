import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { productsIntro, tradeTerms } from "@/content/products";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { buttonStyles } from "@/components/ui/button";

/**
 * "What We Trade" on /about — the flagship-category narrative and the shared
 * trade terms. The catalogue itself (cards, filters) lives on /products, so
 * this closes with a link there rather than repeating the grid.
 */
export function WhatWeTrade() {
  return (
    <Section id="trade" className="bg-cream-deep/40">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          label={productsIntro.label}
          title={productsIntro.title}
          className="lg:max-w-2xl"
        />

        <div className="lg:max-w-sm lg:shrink-0 lg:pb-2">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-muted">
            {productsIntro.flagship}
          </p>
          <p className="mt-2 font-display text-xl text-heading">
            {productsIntro.flagshipName}
          </p>
        </div>
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-14">
        <Reveal>
          <p className="max-w-xl text-[15.5px] leading-[1.75] text-ink-mid">
            {productsIntro.lead}
          </p>

          <Link
            href="/products"
            className={buttonStyles({ variant: "primary", size: "lg", className: "mt-8" })}
          >
            View the full catalogue
            <ArrowUpRight className="size-4" aria-hidden />
          </Link>
        </Reveal>

        <Reveal delay={1}>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
            <Image
              src="/products/chilli-hanging-dried.jpg"
              alt="Chillies hung to dry at a growing region"
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
            <span
              aria-hidden
              className="absolute inset-0 opacity-30 mix-blend-multiply"
              style={{
                backgroundImage:
                  "radial-gradient(ellipse 70% 60% at 50% 55%, rgba(200,35,8,0.6) 0%, transparent 65%)",
              }}
            />
            <span
              aria-hidden
              className="bg-grain absolute inset-0 opacity-[0.18] mix-blend-overlay"
            />
          </div>
        </Reveal>
      </div>

      {/* Shared trade terms — identical for every line, so stated once */}
      <Reveal delay={1}>
        <dl className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-cream-line bg-cream-line sm:grid-cols-2 lg:grid-cols-4">
          {tradeTerms.map((term) => (
            <div key={term.label} className="bg-surface px-5 py-6">
              <dt className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-accent">
                {term.label}
              </dt>
              <dd className="mt-2.5 text-[13.5px] leading-[1.55] text-heading">
                {term.value}
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </Section>
  );
}
