import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { getProduct, products, tradeTerms } from "@/content/products";
import { company } from "@/content/company";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { QuoteButton } from "@/components/quote/quote-button";
import { buttonStyles } from "@/components/ui/button";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata(
  props: PageProps<"/products/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const product = getProduct(slug);

  if (!product) return { title: "Product not found" };

  return {
    title: product.name,
    description: product.summary,
    openGraph: {
      title: `${product.name} · ${company.name}`,
      description: product.summary,
      type: "article",
    },
  };
}

export default async function ProductPage(props: PageProps<"/products/[slug]">) {
  const { slug } = await props.params;
  const product = getProduct(slug);

  if (!product) notFound();

  const related = products.filter((p) => p.slug !== product.slug).slice(0, 3);

  return (
    <>
      {/* ─── Product hero ─── */}
      <section className="on-dark relative isolate overflow-hidden bg-panel pt-28 sm:pt-32">
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 opacity-70"
          style={{
            background:
              "radial-gradient(ellipse 60% 55% at 15% 10%, rgba(192,57,43,0.22) 0%, transparent 60%), radial-gradient(ellipse 55% 50% at 90% 85%, rgba(184,146,42,0.16) 0%, transparent 58%)",
          }}
        />

        <Container className="pb-16 sm:pb-20">
          <Link
            href="/#products"
            className="inline-flex items-center gap-2 text-[13px] text-panel-ink/55 transition-colors hover:text-panel-ink"
          >
            <ArrowLeft className="size-4" aria-hidden />
            All products
          </Link>

          <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-14">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
                {product.category}
              </p>
              <h1 className="mt-4 font-display text-[2.4rem] leading-[1.08] tracking-[-0.02em] text-panel-ink text-balance-tight sm:text-[3.2rem]">
                {product.name}
              </h1>
              <p className="mt-5 max-w-lg text-[15.5px] leading-[1.75] text-panel-ink/60">
                {product.summary}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <QuoteButton product={product.name} variant="primary" size="lg">
                  Request a Quote
                </QuoteButton>
                <Link
                  href="/#contact"
                  className={buttonStyles({ variant: "glass", size: "lg" })}
                >
                  Talk to us
                </Link>
              </div>
            </div>

            {/* Photo, tinted with the product's gradient */}
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl ring-1 ring-panel-ink/12">
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
              <span
                aria-hidden
                className="absolute inset-0 opacity-50 mix-blend-multiply"
                style={{ backgroundImage: product.gradient }}
              />
              <span
                aria-hidden
                className="bg-grain absolute inset-0 opacity-[0.2] mix-blend-overlay"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* ─── Detail ─── */}
      <Section className="bg-paper-dots">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <Reveal>
            <div className="flex items-center gap-3">
              <span aria-hidden className="h-px w-8 bg-accent/60" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
                About This Line
              </span>
            </div>

            <p className="mt-6 max-w-xl text-[16px] leading-[1.8] text-ink-mid">
              {product.description}
            </p>

            <ul className="mt-8 flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border border-outline/12 bg-card px-3.5 py-1.5 text-[12.5px] text-ink-mid"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={2}>
            <div className="overflow-hidden rounded-2xl border border-cream-line bg-card">
              <div className="border-b border-cream-line px-6 py-5">
                <h2 className="font-display text-[1.25rem] text-heading">
                  Product attributes
                </h2>
              </div>
              <dl>
                {product.attributes.map((attr) => (
                  <div
                    key={attr.label}
                    className="flex flex-col gap-1 border-b border-cream-line px-6 py-4 last:border-b-0 sm:flex-row sm:items-baseline sm:gap-6"
                  >
                    <dt className="w-36 shrink-0 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
                      {attr.label}
                    </dt>
                    <dd className="text-[14px] leading-[1.55] text-heading">
                      {attr.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="mt-6 overflow-hidden rounded-2xl border border-cream-line bg-card">
              <div className="border-b border-cream-line px-6 py-5">
                <h2 className="font-display text-[1.25rem] text-heading">Trade terms</h2>
              </div>
              <dl>
                {tradeTerms.map((term) => (
                  <div
                    key={term.label}
                    className="flex flex-col gap-1 border-b border-cream-line px-6 py-4 last:border-b-0 sm:flex-row sm:items-baseline sm:gap-6"
                  >
                    <dt className="w-36 shrink-0 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
                      {term.label}
                    </dt>
                    <dd className="text-[14px] leading-[1.55] text-heading">
                      {term.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>

        {/* ─── Quote CTA ─── */}
        <Reveal delay={1}>
          <div className="on-dark relative mt-16 isolate overflow-hidden rounded-2xl bg-panel px-8 py-12 sm:px-12 sm:py-14">
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 -z-10 opacity-80"
              style={{
                background:
                  "radial-gradient(ellipse 50% 90% at 88% 20%, rgba(192,57,43,0.3) 0%, transparent 60%), radial-gradient(ellipse 45% 80% at 8% 85%, rgba(184,146,42,0.2) 0%, transparent 58%)",
              }}
            />
            <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-xl">
                <h2 className="font-display text-[1.8rem] leading-tight text-panel-ink sm:text-[2.15rem]">
                  Ready to discuss {product.name.toLowerCase()}?
                </h2>
                <p className="mt-3 text-[15px] leading-[1.7] text-panel-ink/60">
                  Send us your grade, packing and delivery requirements. We&apos;ll come
                  back with options and indicative terms — no obligation.
                </p>
              </div>
              <QuoteButton
                product={product.name}
                variant="primary"
                size="lg"
                className="shrink-0"
              >
                Request a Quote
              </QuoteButton>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* ─── Related ─── */}
      <Section className="border-t border-cream-line bg-cream-deep/40 py-16 sm:py-20">
        <div className="flex items-end justify-between gap-6">
          <h2 className="font-display text-[1.75rem] leading-tight text-heading sm:text-[2.1rem]">
            Other lines we trade
          </h2>
          <Link
            href="/#products"
            className="hidden shrink-0 items-center gap-1.5 text-[13.5px] font-medium text-heading transition-colors hover:text-accent sm:inline-flex"
          >
            View all
            <ArrowUpRight className="size-4" aria-hidden />
          </Link>
        </div>

        <ul className="mt-8 grid gap-5 sm:grid-cols-3">
          {related.map((item, i) => (
            <Reveal as="li" key={item.slug} delay={i}>
              <Link
                href={`/products/${item.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-cream-line bg-card transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-accent/25 hover:shadow-[0_24px_48px_-26px_rgba(30,17,64,0.35)]"
              >
                <span aria-hidden className="relative block aspect-[16/9] w-full">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="(min-width: 640px) 33vw, 100vw"
                    className="object-cover"
                  />
                  <span
                    aria-hidden
                    className="absolute inset-0 opacity-50 mix-blend-multiply"
                    style={{ backgroundImage: item.gradient }}
                  />
                </span>
                <span className="flex flex-1 flex-col p-5">
                  <span className="font-display text-[1.15rem] text-heading">
                    {item.name}
                  </span>
                  <span className="mt-2 text-[13.5px] leading-[1.6] text-ink-muted">
                    {item.summary}
                  </span>
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </Section>
    </>
  );
}
