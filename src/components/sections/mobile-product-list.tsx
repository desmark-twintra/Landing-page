"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { Product } from "@/content/products";
import { useQuote } from "@/components/quote/quote-provider";
import { cn } from "@/lib/utils";

/**
 * Phone/tablet-only product list — rows instead of cards, with a per-product
 * "add to quote" toggle wired into the client-side basket (see
 * quote-provider.tsx). Desktop keeps the existing ProductCard grid untouched.
 * Receives the (possibly category-filtered) list from Products() so mobile
 * and desktop stay in sync with the same filter.
 */
export function MobileProductList({ products }: { products: Product[] }) {
  const { toggleBasketItem, isInBasket } = useQuote();

  return (
    <div className="mt-4 border-t border-cream-line lg:hidden">
      {products.map((product) => {
        const added = isInBasket(product.slug);

        return (
          <div
            key={product.slug}
            className="flex gap-3.5 border-b border-cream-line py-4"
          >
            <Link
              href={`/products/${product.slug}`}
              aria-label={`View ${product.name}`}
              className="relative size-19 shrink-0 overflow-hidden rounded-2xl"
            >
              <Image
                src={product.image}
                alt=""
                fill
                sizes="76px"
                className="object-cover"
              />
            </Link>

            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-ink-muted">
                {product.category}
              </p>
              <h3 className="mt-0.5 font-display text-[1.1rem] leading-snug text-heading">
                {product.name}
              </h3>
              <p className="mt-1 text-[13px] leading-[1.45] text-ink-mid">
                {product.summary}
              </p>

              <div className="mt-2 flex flex-wrap gap-1.5">
                {product.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-cream-deep/60 px-2 py-1 text-[10.5px] text-ink-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-2.5 flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => toggleBasketItem(product.slug)}
                  className={cn(
                    "flex h-10 items-center rounded-full px-3.5 text-[13px] font-semibold transition-colors",
                    added
                      ? // Brand tokens (stay dark/light in both themes), not
                        // heading/cream — those flip independently and wash
                        // out against each other in dark mode.
                        "bg-violet-900 text-cream"
                      : "border border-outline/16 bg-card text-heading",
                  )}
                >
                  {added ? "✓ On quote list" : "+ Add to quote"}
                </button>

                <Link
                  href={`/products/${product.slug}`}
                  className="flex h-10 items-center gap-1 text-[13px] font-medium text-heading"
                >
                  Details
                  <ArrowUpRight className="size-3.5 text-chilli" aria-hidden />
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
