import type { Metadata } from "next";
import { OG_IMAGE } from "@/lib/site";
import { Hero } from "@/components/sections/hero";
import { ProductShowcase } from "@/components/sections/product-showcase";
import { PromiseStrip } from "@/components/sections/promise-strip";
import { AboutTeaser } from "@/components/sections/about-teaser";
import { JourneyTeaser } from "@/components/sections/journey-teaser";
import { company } from "@/content/company";

/* The layout supplies the brand title via `title.default`; setting a `title`
   here would run the `%s · {company}` template and repeat the name. */
export const metadata: Metadata = {
  description:
    "Desmark Twintra LLP supplies premium Indian dried red chillies, chilli powder and named varieties (Teja, Sannam) to wholesalers, food processors and export buyers. MCA, MSME, FSSAI and GST registered.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    title: `${company.name} — ${company.tagline}`,
    description:
      "Premium Indian dried red chillies, chilli powder and named varieties — traded by a fully registered agricultural trading LLP.",
    images: [OG_IMAGE],
  },
};


export default function HomePage() {
  return (
    <>
      <Hero />
      <ProductShowcase />
      <PromiseStrip />
      <AboutTeaser />
      <JourneyTeaser />
    </>
  );
}
