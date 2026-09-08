"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { products, productsIntro, tradeTerms } from "@/content/products";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { buttonStyles } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MobileProductList } from "./mobile-product-list";

const FILTERS = [
  { label: "All", value: "All" },
  { label: "Whole", value: "Whole Spice" },
  { label: "Ground", value: "Ground Spice" },
  { label: "Variety", value: "Named Variety" },
  { label: "Service", value: "Trade Service" },
] as const;

export function ProductCard({
  product,
  index = 0,
}: {
  product: (typeof products)[number];
  index?: number;
}) {
  return (
    <Reveal as="article" delay={index} className="h-full">
      <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-cream-line bg-card transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-accent/25 hover:shadow-[0_24px_50px_-24px_rgba(30,17,64,0.35)]">
        {/* Spice-gradient artwork, carried over from the original profile */}
        <Link
          href={`/products/${product.slug}`}
          aria-label={`View ${product.name}`}
          className="relative block aspect-[16/10] overflow-hidden"
        >
          <span
            aria-hidden
            className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
          >
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover"
            />
            <span
              aria-hidden
              className="absolute inset-0 opacity-50 mix-blend-multiply"
              style={{ backgroundImage: product.gradient }}
            />
          </span>
          <span
            aria-hidden
            className="bg-grain absolute inset-0 opacity-[0.18] mix-blend-overlay"
          />
          <span
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent"
          />

          <span className="absolute left-4 top-4 rounded-full border border-white/25 bg-black/25 px-2.5 py-1 text-[10.5px] font-medium uppercase tracking-[0.12em] text-white/85 backdrop-blur-sm">
            {product.category}
          </span>

          <span className="absolute bottom-4 left-4 right-4 font-display text-[1.4rem] leading-tight text-white">
            {product.name}
          </span>
        </Link>

        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <p className="text-[14px] leading-[1.6] text-ink-mid">{product.summary}</p>

          <ul className="mt-4 flex flex-wrap gap-1.5">
            {product.tags.slice(0, 3).map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-outline/12 bg-cream-deep/60 px-2.5 py-1 text-[11px] tracking-[0.02em] text-ink-muted"
              >
                {tag}
              </li>
            ))}
          </ul>

          <div className="mt-auto pt-6">
            <Link
              href={`/products/${product.slug}`}
              className={buttonStyles({
                variant: "outline",
                size: "md",
                className: "group/link w-full",
              })}
            >
              View Details
              <ArrowUpRight
                className="size-4 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                aria-hidden
              />
            </Link>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export function Products() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["value"]>("All");
  const visible =
    filter === "All" ? products : products.filter((p) => p.category === filter);

  return (
    <Section id="products" className="bg-cream-deep/40">
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

      <Reveal>
        <p className="mt-8 max-w-3xl text-[15.5px] leading-[1.75] text-ink-mid">
          {productsIntro.lead}
        </p>
      </Reveal>

      <div className="mt-8 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            type="button"
            onClick={() => setFilter(f.value)}
            className={cn(
              "flex h-10 items-center rounded-full border px-4 text-[13px] font-medium transition-colors",
              filter === f.value
                ? "border-transparent bg-chilli text-cream"
                : "border-outline/15 bg-card text-ink-mid hover:border-outline/30 hover:text-heading",
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="mt-8 hidden gap-6 lg:grid lg:grid-cols-3">
        {visible.map((product, i) => (
          <ProductCard key={product.slug} product={product} index={i % 3} />
        ))}
      </div>

      {/* Mobile/tablet: list rows + basket toggle instead of cards (below `lg`) */}
      <MobileProductList products={visible} />

      {/* Shared trade terms — identical for every line, so stated once */}
      <Reveal delay={1}>
        <dl className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-cream-line bg-cream-line sm:grid-cols-2 lg:grid-cols-4">
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
