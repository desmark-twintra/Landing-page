import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { products, productsIntro, type Product } from "@/content/products";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { buttonStyles } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * The home page's product showcase, directly under the hero. A large flagship
 * photograph anchors the left column; the full catalogue sits to its right as
 * compact cards in two vertically offset columns.
 *
 * Deliberately a server component with no filtering — the catalogue is only six
 * lines, and the filter UI already lives on /products. Keeping it static leaves
 * the whole home page server-rendered.
 */

/** The flagship image. Its own gradient tints the photo, so it is pulled from
    the product record rather than hard-coded alongside the path. */
const FEATURE_SLUG = "dried-red-chilli";

/**
 * Cards are dealt into two columns by index parity, so DOM order runs down
 * each column rather than across the pair. Reading order and the reveal
 * stagger then agree with what the eye follows.
 */
function dealIntoColumns(items: Product[]) {
  return [
    items.filter((_, i) => i % 2 === 0),
    items.filter((_, i) => i % 2 === 1),
  ];
}

function ShowcaseCard({ product, delay }: { product: Product; delay: number }) {
  return (
    <Reveal as="article" delay={delay}>
      {/* One link around the whole card: a single tab stop, and the arrow is
          decoration rather than a second, smaller touch target. */}
      <Link
        href={`/products/${product.slug}`}
        className="group block overflow-hidden rounded-2xl border border-cream-line bg-card transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-accent/25 hover:shadow-[0_24px_50px_-24px_rgba(30,17,64,0.35)]"
      >
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 22vw, (min-width: 640px) 42vw, 88vw"
            className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
          />
          <span
            aria-hidden
            className="absolute inset-0 opacity-40 mix-blend-multiply"
            style={{ backgroundImage: product.gradient }}
          />
          <span
            aria-hidden
            className="bg-grain absolute inset-0 opacity-[0.18] mix-blend-overlay"
          />
        </div>

        <div className="flex items-end justify-between gap-3 p-4 sm:p-5">
          <div className="min-w-0">
            <p className="font-display text-[1.05rem] leading-tight text-heading">
              {product.name}
            </p>
            <p className="mt-1 text-[12px] leading-snug text-ink-muted">
              {product.category}
            </p>
          </div>

          <span
            aria-hidden
            className="grid size-9 shrink-0 place-items-center rounded-full border border-outline/15 text-ink-muted transition-colors duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-cream"
          >
            <ArrowUpRight className="size-4" />
          </span>
        </div>
      </Link>
    </Reveal>
  );
}

export function ProductShowcase() {
  const feature = products.find((p) => p.slug === FEATURE_SLUG) ?? products[0];
  const [columnA, columnB] = dealIntoColumns(products);

  return (
    <Section className="bg-cream-deep/40">
      <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
        {/* ─── Copy + flagship photograph ─── */}
        <div>
          <Reveal>
            <SectionHeading
              label={productsIntro.label}
              title={productsIntro.title}
            />

            <p className="mt-6 max-w-xl text-[15.5px] leading-[1.75] text-ink-mid">
              {productsIntro.lead}
            </p>
          </Reveal>

          <Reveal delay={1}>
            {/* The ratio must stay explicit: the only child is an absolute
                `fill` image, so an auto-height box would collapse to zero. */}
            <div className="relative mt-9 aspect-[4/5] overflow-hidden rounded-[2rem] sm:aspect-[5/4] lg:aspect-[4/5]">
              <Image
                src={feature.image}
                alt={feature.name}
                fill
                sizes="(min-width: 1024px) 45vw, 92vw"
                className="object-cover"
              />
              <span
                aria-hidden
                className="absolute inset-0 opacity-40 mix-blend-multiply"
                style={{ backgroundImage: feature.gradient }}
              />
              <span
                aria-hidden
                className="bg-grain absolute inset-0 opacity-[0.18] mix-blend-overlay"
              />
              {/* Scrim only under the caption, so the top of the photo stays
                  bright and the text below keeps its contrast. */}
              <span
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/70 via-black/25 to-transparent"
              />

              <div className="absolute inset-x-6 bottom-6">
                <p className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/75">
                  {productsIntro.flagship}
                </p>
                <p className="mt-1.5 font-display text-[1.35rem] leading-tight text-white sm:text-[1.6rem]">
                  {productsIntro.flagshipName}
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={2}>
            <Link
              href="/products"
              className={buttonStyles({
                variant: "primary",
                size: "lg",
                className: "group/cta mt-8",
              })}
            >
              Explore Our Products
              <ArrowUpRight
                className="size-4 transition-transform duration-300 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5"
                aria-hidden
              />
            </Link>
          </Reveal>
        </div>

        {/* ─── Catalogue cards ─── */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {[columnA, columnB].map((column, columnIndex) => (
            <div
              key={columnIndex}
              className={cn(
                "flex flex-col gap-5",
                /* The offset that gives the pair its staggered look. Kept at
                   `lg:` only — below that the columns sit side by side (or
                   stack), where a leading margin would read as a dead gap. */
                columnIndex === 1 && "lg:mt-12",
              )}
            >
              {column.map((product, i) => (
                <ShowcaseCard
                  key={product.slug}
                  product={product}
                  delay={i * 2 + columnIndex}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
