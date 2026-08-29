import { company, certifications } from "@/content/company";
import { Container } from "@/components/ui/container";
import { QuoteButton } from "@/components/quote/quote-button";
import { GridPattern } from "@/components/ui/grid-pattern";
import { InteractiveHoverLink } from "@/components/ui/interactive-hover-button";
import { OrbitVisual } from "./orbit-visual";
import { cn } from "@/lib/utils";

/**
 * Occupies exactly one screen at every size, with the credential rail as the
 * last thing above the fold.
 *
 * `min-h-svh` rather than `h-svh`: `svh` keeps mobile browser chrome from
 * pushing the rail out of view, and `min-` lets the section grow instead of
 * clipping on viewports too short to hold the copy at all (landscape phones).
 */
export function Hero() {
  return (
    <section className="on-dark bg-hero-mesh relative isolate flex min-h-svh flex-col overflow-hidden">
      {/* Grid lines and grain, layered over the mesh */}
      <GridPattern
        width={72}
        height={72}
        className="fill-panel-ink/0 stroke-panel-ink/[0.0825] dark:stroke-panel-ink/[0.045]"
      />
      <div aria-hidden className="bg-grain pointer-events-none absolute inset-0 opacity-[0.16] mix-blend-overlay" />

      {/* The mesh settles into its deep base above the credential rail. Scoped to
          this wrapper so the fade never washes over the rail's text. */}
      <div className="relative flex flex-1 items-center">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-panel/85"
        />

        <Container className="relative w-full pb-8 pt-24 sm:pt-28 2xl:max-w-[1560px]">
          <div className="grid items-center gap-8 sm:gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
            {/* ─── Copy ─── */}
            <div className="max-w-xl lg:pl-8">
              <div className="flex items-center gap-3">
                <span aria-hidden className="h-px w-8 bg-panel-accent/60" />
                <span className="text-[clamp(10px,1vw+0.3rem,11px)] font-semibold uppercase tracking-[0.2em] text-panel-ink/70">
                  {company.eyebrow}
                </span>
              </div>

              {/* Fluid, so the block shrinks on short screens rather than
                  forcing the fold open. */}
              <h1 className="mt-[clamp(1rem,2.6vh,1.75rem)] font-display text-[clamp(2rem,5.2vw+0.6rem,4.15rem)] leading-[1.06] tracking-[-0.025em] text-panel-ink text-balance-tight">
                Trade Beyond
                <br />
                Transactions —
                <br />
                <span className="text-panel-accent">Rooted in India&apos;s</span>
                <br />
                <span className="text-panel-accent">Finest Chillies.</span>
              </h1>

              <p className="mt-[clamp(0.75rem,2vh,1.75rem)] max-w-lg text-[clamp(14px,0.55vw+0.72rem,16.5px)] leading-[1.65] text-panel-ink/65">
                {company.heroLead}
              </p>

              <div className="mt-[clamp(1.25rem,3vh,2.25rem)] flex flex-wrap items-center gap-3">
                <QuoteButton variant="violet" size="lg" interactive>
                  Start an Enquiry
                </QuoteButton>

                <InteractiveHoverLink href="/#products" variant="glass" size="lg">
                  View Products
                </InteractiveHoverLink>
              </div>
            </div>

            {/* ─── Orbit graphic — live at every breakpoint ─── */}
            <div className="flex justify-center lg:justify-end">
              <OrbitVisual className="animate-float" />
            </div>
          </div>
        </Container>
      </div>

      {/* ─── Credential strip ─── */}
      <div className="relative z-10 shrink-0 border-t border-panel-ink/10 bg-panel/70 backdrop-blur-sm">
        <Container className="py-4 sm:py-5 2xl:max-w-[1560px]">
          <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2.5 sm:justify-between sm:gap-x-6">
            {certifications.map((cert) => (
              <li
                key={cert.short}
                className="flex items-center gap-2.5 text-[13px] tracking-[0.03em]"
              >
                <span
                  aria-hidden
                  className={cn(
                    "size-1.5 shrink-0 rounded-full",
                    cert.status === "pending" ? "bg-amber" : "bg-panel-accent",
                  )}
                />
                <span
                  className={cn(
                    cert.status === "pending" ? "text-amber" : "text-panel-ink/75",
                  )}
                >
                  {cert.label}
                </span>
              </li>
            ))}
            <li className="hidden items-center gap-2.5 text-[13px] text-panel-ink/55 lg:flex">
              <span aria-hidden className="h-3.5 w-px bg-panel-ink/20" />
              {company.tagline}
            </li>
          </ul>
        </Container>
      </div>
    </section>
  );
}
