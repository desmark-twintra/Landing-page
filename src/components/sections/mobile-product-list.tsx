import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { Product } from "@/content/products";
import { buttonStyles } from "@/components/ui/button";

/**
 * Phone/tablet-only product list — rows instead of cards. Desktop keeps the
 * ProductCard grid untouched. Receives the (possibly category-filtered) list
 * from Products() so mobile and desktop stay in sync with the same filter.
 */
export function MobileProductList({ products }: { products: Product[] }) {
  return (
    <div className="mt-4 border-t border-cream-line lg:hidden">
      {products.map((product) => (
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

              <div className="mt-3">
                <Link
                  href={`/products/${product.slug}`}
                  /* `md` (h-11) not `sm` (h-9): this list only renders below
                     lg, where it is the row's primary tap target. */
                  className={buttonStyles({ variant: "outline", size: "md" })}
                >
                  View Details
                  <ArrowUpRight className="size-3.5" aria-hidden />
                </Link>
              </div>
            </div>
          </div>
      ))}
    </div>
  );
}
