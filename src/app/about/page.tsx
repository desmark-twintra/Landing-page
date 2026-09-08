import type { Metadata } from "next";
import { company } from "@/content/company";
import { Container } from "@/components/ui/container";
import { About } from "@/components/sections/about";
import { WhatWeTrade } from "@/components/sections/what-we-trade";
import { JourneyStepper } from "@/components/sections/journey-stepper";
import { WhyUs } from "@/components/sections/why-us";
import { VisionMission } from "@/components/sections/vision-mission";
import { Compliance } from "@/components/sections/compliance";

export const metadata: Metadata = {
  title: "About Us",
  description: `${company.name} — a government-registered agricultural trading partnership specialising in Indian chillies, built on compliance, quality-driven sourcing and transparent trade.`,
};

export default function AboutPage() {
  return (
    <>
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
            About Us
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-[2.4rem] leading-[1.08] tracking-[-0.02em] text-panel-ink text-balance-tight sm:text-[3.2rem]">
            Trade Beyond Transactions
          </h1>
          <p className="mt-5 max-w-xl text-[15.5px] leading-[1.75] text-panel-ink/60">
            {company.heroLead}
          </p>
        </Container>
      </section>

      <About />
      <WhatWeTrade />
      <JourneyStepper />
      <WhyUs />
      <VisionMission />
      <Compliance />
    </>
  );
}
