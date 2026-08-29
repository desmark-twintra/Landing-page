import { Hero } from "@/components/sections/hero";
import { PromiseStrip } from "@/components/sections/promise-strip";
import { About } from "@/components/sections/about";
import { Products } from "@/components/sections/products";
import { JourneyStepper } from "@/components/sections/journey-stepper";
import { WhyUs } from "@/components/sections/why-us";
import { VisionMission } from "@/components/sections/vision-mission";
import { Compliance } from "@/components/sections/compliance";
import { Contact } from "@/components/sections/contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <PromiseStrip />
      <About />
      <Products />
      <JourneyStepper />
      <WhyUs />
      <VisionMission />
      <Compliance />
      <Contact />
    </>
  );
}
