import {
  Compass,
  Globe2,
  Handshake,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import { ChevronDown } from "lucide-react";
import { reasons, whyIntro, type Reason } from "@/content/why";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { Accordion, AccordionItem, AccordionTrigger, AccordionPanel } from "@/components/ui/accordion";

const icons: Record<Reason["icon"], typeof ShieldCheck> = {
  shield: ShieldCheck,
  sparkles: Sparkles,
  handshake: Handshake,
  compass: Compass,
  globe: Globe2,
  zap: Zap,
};

export function WhyUs() {
  return (
    <Section id="why" className="bg-cream-deep/40">
      <SectionHeading label={whyIntro.label} title={whyIntro.title} align="center" className="mx-auto" />

      <ul className="mt-14 hidden gap-5 lg:grid lg:grid-cols-3">
        {reasons.map((reason, i) => {
          const Icon = icons[reason.icon];

          return (
            <Reveal as="li" key={reason.title} delay={i % 3}>
              <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-cream-line bg-card p-7 transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-outline/20 hover:shadow-[0_24px_48px_-26px_rgba(30,17,64,0.35)]">
                {/* Accent rule grows across the card top on hover */}
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-[2.5px] w-0 bg-gradient-to-r from-chilli to-chilli-warm transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-full"
                />

                <span className="flex size-11 items-center justify-center rounded-xl bg-outline/[0.06] text-heading transition-colors duration-300 group-hover:bg-accent/10 group-hover:text-accent">
                  <Icon className="size-5" aria-hidden />
                </span>

                <h3 className="mt-5 font-display text-[1.2rem] leading-snug text-heading">
                  {reason.title}
                </h3>
                <p className="mt-3 text-[14px] leading-[1.7] text-ink-mid">
                  {reason.body}
                </p>
              </div>
            </Reveal>
          );
        })}
      </ul>

      {/* Mobile/tablet: numbered accordion instead of the card grid (below `lg`) */}
      <div className="mt-14 border-t border-cream-line lg:hidden">
        <Accordion>
          {reasons.map((reason, i) => (
            <AccordionItem key={reason.title} value={i}>
              <AccordionTrigger>
                <span className="flex flex-1 items-center gap-3">
                  <span className="text-[11px] tabular-nums text-ink-muted/60">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[16px] font-medium text-heading">
                    {reason.title}
                  </span>
                </span>
                <ChevronDown
                  className="size-4.5 shrink-0 text-chilli transition-transform duration-200 group-data-[panel-open]:rotate-180"
                  aria-hidden
                />
              </AccordionTrigger>
              <AccordionPanel>
                <p className="pl-8 text-[14px] leading-[1.6] text-ink-mid">
                  {reason.body}
                </p>
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </Section>
  );
}
