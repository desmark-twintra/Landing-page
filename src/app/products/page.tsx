import type { Metadata } from "next";
import { OG_IMAGE } from "@/lib/site";
import { company } from "@/content/company";
import { products, productsIntro } from "@/content/products";
import { Container } from "@/components/ui/container";
import { Products } from "@/components/sections/products";
import { JsonLd } from "@/components/json-ld";
import { productListJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Products",
  description: productsIntro.metaDescription,
  alternates: { canonical: "/products" },
  openGraph: {
    type: "website",
    url: "/products",
    title: `Products · ${company.name}`,
    description: productsIntro.metaDescription,
    images: [OG_IMAGE],
  },
};

export default function ProductsPage() {
  return (
    <>
      <JsonLd data={productListJsonLd(products)} />
      {/* Page header — clears the fixed h-18 site header */}
      <section className="on-dark relative isolate overflow-hidden bg-panel pb-16 pt-28 sm:pb-20 sm:pt-32">
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 opacity-70"
          style={{
            background:
              "radial-gradient(ellipse 60% 55% at 15% 10%, rgba(192,57,43,0.22) 0%, transparent 60%), radial-gradient(ellipse 55% 50% at 90% 85%, rgba(184,146,42,0.16) 0%, transparent 58%)",
          }}
        />
        <Container>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
            {productsIntro.label}
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-[2.4rem] leading-[1.08] tracking-[-0.02em] text-panel-ink text-balance-tight sm:text-[3.2rem]">
            {productsIntro.flagshipName}
          </h1>
          <p className="mt-5 max-w-xl text-[15.5px] leading-[1.75] text-panel-ink/60">
            Every line below is traded by {company.name} under one accountable,
            registered entity — with grading confirmed before any lot is committed.
          </p>
        </Container>
      </section>

      <Products />
    </>
  );
}
