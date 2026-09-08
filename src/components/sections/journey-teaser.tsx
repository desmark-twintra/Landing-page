import Link from "next/link";
import { ArrowUpRight, Check, Circle } from "lucide-react";
import { journeyIntro, phases, type PhaseStatus } from "@/content/journey";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { buttonStyles } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Three-phase summary for the home page — badge, title and one line each.
 * The interactive stepper with the per-phase workstreams lives on /about.
 */
const ring: Record<PhaseStatus, string> = {
  active: "border-violet-300 bg-violet-300 text-violet-900",
  planned: "border-panel-ink/35 text-panel-ink/80",
  vision: "border-panel-ink/25 text-panel-ink/55",
};

const label: Record<PhaseStatus, string> = {
  active: "text-accent",
  planned: "text-panel-ink/70",
  vision: "text-panel-ink/55",
};

export function JourneyTeaser() {
  return (
    <Section id="journey" dark className="isolate overflow-hidden bg-panel">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-80"
        style={{
          background:
            "radial-gradient(ellipse 55% 50% at 10% 12%, rgba(192,57,43,0.22) 0%, transparent 58%), radial-gradient(ellipse 60% 55% at 90% 88%, rgba(184,146,42,0.16) 0%, transparent 60%)",
        }}
      />

      <SectionHeading
        label={journeyIntro.label}
        title={journeyIntro.title}
        align="center"
        tone="dark"
        className="mx-auto"
      />

      <ol className="mt-14 grid gap-5 sm:grid-cols-3">
        {phases.map((phase, i) => (
          <Reveal as="li" key={phase.step} delay={i}>
            <div className="flex h-full flex-col rounded-2xl border border-panel-ink/12 bg-panel-ink/[0.04] p-7">
              <span
                className={cn(
                  "flex size-11 shrink-0 items-center justify-center rounded-full border",
                  ring[phase.status],
                )}
              >
                {phase.status === "active" ? (
                  <Check className="size-5" aria-hidden />
                ) : phase.status === "vision" ? (
                  <Circle className="size-3.5" aria-hidden />
                ) : (
                  <span className="text-[15px] font-semibold">{phase.step}</span>
                )}
              </span>

              <p
                className={cn(
                  "mt-5 text-[10.5px] font-semibold uppercase tracking-[0.16em]",
                  label[phase.status],
                )}
              >
                {phase.badge}
              </p>
              <h3 className="mt-2 font-display text-[1.3rem] leading-snug text-panel-ink">
                {phase.title}
              </h3>
              <p className="mt-3 text-[13.5px] leading-[1.65] text-panel-ink/55">
                {phase.points[0]}
              </p>
            </div>
          </Reveal>
        ))}
      </ol>

      <Reveal delay={1}>
        <div className="mt-12 flex justify-center">
          <Link
            href="/about"
            className={buttonStyles({ variant: "glass", size: "lg" })}
          >
            See the full journey
            <ArrowUpRight className="size-4" aria-hidden />
          </Link>
        </div>
      </Reveal>
    </Section>
  );
}
