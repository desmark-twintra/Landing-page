import { company } from "@/content/company";
import { Container } from "@/components/ui/container";

export function PromiseStrip() {
  return (
    <div className="on-dark relative isolate overflow-hidden bg-panel">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(ellipse 55% 120% at 12% 50%, rgba(192,57,43,0.28) 0%, transparent 60%), radial-gradient(ellipse 50% 120% at 88% 50%, rgba(184,146,42,0.2) 0%, transparent 58%)",
        }}
      />

      <Container className="relative py-14 sm:py-16">
        <div className="flex flex-col items-center gap-5 text-center">
          <blockquote className="max-w-3xl font-display text-[1.6rem] italic leading-[1.35] tracking-[-0.01em] text-panel-ink text-balance-tight sm:text-[2.1rem]">
            &ldquo;{company.promise}&rdquo;
          </blockquote>

          <div className="flex items-center gap-3">
            <span aria-hidden className="h-px w-6 bg-accent/60" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-accent">
              {company.promiseLabel}
            </span>
            <span aria-hidden className="h-px w-6 bg-accent/60" />
          </div>
        </div>
      </Container>
    </div>
  );
}
