import { Hero } from "@/components/sections/hero";
import { ProductShowcase } from "@/components/sections/product-showcase";
import { PromiseStrip } from "@/components/sections/promise-strip";
import { AboutTeaser } from "@/components/sections/about-teaser";
import { JourneyTeaser } from "@/components/sections/journey-teaser";

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
