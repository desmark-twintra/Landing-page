"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useReducedMotionSafe } from "@/lib/hydration";
import { ArrowLeft, ArrowRight, Check, ChevronDown, Circle, Dot } from "lucide-react";
import { journeyIntro, phases, type PhaseStatus } from "@/content/journey";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionItem, AccordionTrigger, AccordionPanel } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

const statusRing: Record<PhaseStatus, string> = {
  active: "border-violet-300 bg-violet-300 text-violet-900",
  planned: "border-panel-ink/35 text-panel-ink/80",
  vision: "border-panel-ink/25 text-panel-ink/55",
};

const statusText: Record<PhaseStatus, string> = {
  active: "text-accent",
  planned: "text-panel-ink/70",
  vision: "text-panel-ink/55",
};

const statusChip: Record<PhaseStatus, string> = {
  active: "border-accent/30 bg-accent/10",
  planned: "border-panel-ink/25 bg-panel-ink/[0.06]",
  vision: "border-panel-ink/15 bg-panel-ink/[0.03]",
};

function StepIcon({ status, step }: { status: PhaseStatus; step: number }) {
  if (status === "active") return <Check className="size-5" aria-hidden />;
  if (status === "vision") return <Circle className="size-3.5" aria-hidden />;
  return <span className="text-[15px] font-semibold">{step}</span>;
}

export function JourneyStepper() {
  const [selected, setSelected] = useState(0);
  const reduced = useReducedMotionSafe();
  const phase = phases[selected];

  return (
    <Section id="journey" dark className="isolate overflow-hidden bg-panel">
      {/* Section's Container (the Image's actual DOM parent) isn't itself
          positioned, which trips next/image's fill-parent check even though
          the absolute box still resolves fine against the outer <section>. */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <Image
          src="/journey/journey-bg.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-[0.12]"
        />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-80"
        style={{
          background:
            "radial-gradient(ellipse 55% 45% at 15% 0%, rgba(192,57,43,0.22) 0%, transparent 58%), radial-gradient(ellipse 60% 50% at 88% 92%, rgba(184,146,42,0.16) 0%, transparent 60%)",
        }}
      />

      <SectionHeading
        label={journeyIntro.label}
        title={journeyIntro.title}
        tone="dark"
        align="center"
        className="mx-auto"
      />

      {/* ─── Horizontal rail (lg and up) ─── */}
      <div className="mt-16 hidden lg:block">
        <ol className="relative flex items-start justify-between">
          {/* Base track */}
          <span
            aria-hidden
            className="absolute left-0 right-0 top-6 -z-10 h-px bg-panel-ink/12"
          />
          {/* Progress up to the selected step */}
          <motion.span
            aria-hidden
            className="absolute left-0 top-6 -z-10 h-px origin-left bg-gradient-to-r from-violet-300 to-chilli-warm"
            initial={false}
            animate={{
              width: `${(selected / (phases.length - 1)) * 100}%`,
            }}
            transition={{ duration: reduced ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] }}
          />

          {phases.map((p, i) => {
            const isSelected = i === selected;

            return (
              <li key={p.step} className="flex flex-1 flex-col items-center px-3 text-center">
                <button
                  type="button"
                  onClick={() => setSelected(i)}
                  aria-current={isSelected ? "step" : undefined}
                  className="group flex flex-col items-center focus-visible:outline-none"
                >
                  <span
                    className={cn(
                      "flex size-12 items-center justify-center rounded-full border-2 bg-panel transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105 group-focus-visible:ring-4 group-focus-visible:ring-chilli-warm/40",
                      statusRing[p.status],
                      isSelected &&
                        "scale-105 shadow-[0_0_0_5px_color-mix(in_srgb,var(--color-chilli-warm)_22%,transparent)]",
                    )}
                  >
                    <StepIcon status={p.status} step={p.step} />
                  </span>

                  <span
                    className={cn(
                      "mt-4 inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] transition-colors",
                      isSelected ? "border-accent/30 bg-accent/10 text-accent" : cn(statusChip[p.status], statusText[p.status]),
                    )}
                  >
                    {p.badge}
                  </span>
                  <span
                    className={cn(
                      "mt-1.5 font-display text-[1.15rem] leading-snug transition-colors",
                      isSelected
                        ? "text-panel-ink"
                        : p.status === "vision"
                          ? "text-panel-ink/60"
                          : "text-panel-ink/70",
                    )}
                  >
                    {p.title}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>

      {/* ─── Detail card ─── */}
      <div className="mt-10 hidden lg:block">
        <AnimatePresence mode="wait">
          <motion.div
            key={phase.step}
            initial={reduced ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: -10 }}
            transition={{ duration: reduced ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-2xl border border-panel-ink/12 bg-panel-ink/[0.04] p-8 backdrop-blur-sm lg:p-10"
          >
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
                  {phase.badge}
                </p>
                <h3 className="mt-3 font-display text-[1.75rem] leading-tight text-panel-ink">
                  {phase.title}
                </h3>
                <p className="mt-4 text-[15px] leading-[1.75] text-panel-ink/60">
                  {phase.description}
                </p>
              </div>

              <ul className="space-y-3.5 lg:border-l lg:border-panel-ink/10 lg:pl-10">
                {phase.points.map((point) => (
                  <li key={point} className="flex gap-3 text-[14px] leading-[1.6] text-panel-ink/70">
                    <Dot className="mt-0.5 size-5 shrink-0 text-accent" aria-hidden />
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-9 flex items-center justify-between gap-4 border-t border-panel-ink/10 pt-7">
              <Button
                variant="glass"
                size="md"
                onClick={() => setSelected((s) => Math.max(0, s - 1))}
                disabled={selected === 0}
              >
                <ArrowLeft className="size-4" aria-hidden />
                Go Back
              </Button>

              <span className="text-[12.5px] tracking-[0.06em] text-panel-ink/40">
                Phase {selected + 1} of {phases.length}
              </span>

              <Button
                variant="primary"
                size="md"
                onClick={() =>
                  setSelected((s) => Math.min(phases.length - 1, s + 1))
                }
                disabled={selected === phases.length - 1}
              >
                Next Step
                <ArrowRight className="size-4" aria-hidden />
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ─── Vertical timeline (below lg) — collapsible, Phase 1 open by default ─── */}
      <div className="relative mt-12 lg:hidden">
        <span
          aria-hidden
          className="absolute left-6 top-6 bottom-6 -z-10 w-px bg-panel-ink/12"
        />

        <Accordion defaultValue={[phases.find((p) => p.status === "active")?.step ?? phases[0].step]}>
          {phases.map((p) => (
            <AccordionItem key={p.step} value={p.step} className="border-b-0">
              <div className="flex gap-5 pb-6">
                <span
                  className={cn(
                    "z-10 flex size-12 shrink-0 items-center justify-center rounded-full border-2 bg-panel",
                    statusRing[p.status],
                  )}
                >
                  <StepIcon status={p.status} step={p.step} />
                </span>

                <div className="min-w-0 flex-1 pt-1">
                  <AccordionTrigger className="group items-start py-0 text-left">
                    <span className="flex-1">
                      <span
                        className={cn(
                          "inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em]",
                          p.status === "active"
                            ? "border-accent/30 bg-accent/10 text-accent"
                            : cn(statusChip[p.status], statusText[p.status]),
                        )}
                      >
                        {p.badge}
                      </span>
                      <span
                        className={cn(
                          "mt-2 block font-display text-[1.35rem] leading-snug",
                          p.status === "vision" ? "text-panel-ink/65" : "text-panel-ink",
                        )}
                      >
                        {p.title}
                      </span>
                    </span>
                    <ChevronDown
                      className="mt-1 size-4.5 shrink-0 text-panel-ink/45 transition-transform duration-200 group-data-[panel-open]:rotate-180"
                      aria-hidden
                    />
                  </AccordionTrigger>

                  <AccordionPanel>
                    <p
                      className={cn(
                        "mt-2 text-[14.5px] leading-[1.7]",
                        p.status === "vision" ? "text-panel-ink/55" : "text-panel-ink/60",
                      )}
                    >
                      {p.description}
                    </p>

                    <ul className="mt-4 space-y-2">
                      {p.points.map((point) => (
                        <li
                          key={point}
                          className="flex gap-2 text-[13.5px] leading-[1.55] text-panel-ink/50"
                        >
                          <Dot className="mt-px size-4 shrink-0 text-accent" aria-hidden />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </AccordionPanel>
                </div>
              </div>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </Section>
  );
}
