import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { aboutCopy, aboutStats } from "@/content/company";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { buttonStyles } from "@/components/ui/button";

/**
 * Home-page condensation of the About section: the opening paragraph and the
 * stat grid, with everything else — the full story, What We Trade, Journey,
 * Why Us, Vision & Mission, Credentials — behind "View More" on /about.
 */
export function AboutTeaser() {
  return (
    /* `overflow-hidden`: the stat-grid wash below is `-inset-6`, so it
       reaches past the container's right edge at `lg` and would otherwise
       give the whole page a horizontal scrollbar. */
    <Section id="about" className="overflow-hidden bg-paper-dots">
      <div className="grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <Reveal>
          <SectionHeading label={aboutCopy.label} title={aboutCopy.title} />

          <p className="mt-7 max-w-xl text-[15.5px] leading-[1.75] text-ink-mid">
            {/* Plain text here — the {{marked}} treatment belongs to the full
                telling on /about, where it has room to land. */}
            {aboutCopy.paragraphs[0].text.replace(/\{\{|\}\}/g, "")}
          </p>

          <Link
            href="/about"
            className={buttonStyles({ variant: "primary", size: "lg", className: "mt-8" })}
          >
            View More
            <ArrowUpRight className="size-4" aria-hidden />
          </Link>
        </Reveal>

        <Reveal delay={2}>
          <div className="relative">
            {/* Warm wash behind the stat grid */}
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-6 -z-10 rounded-[2rem] opacity-90"
              style={{
                background:
                  "radial-gradient(ellipse 70% 60% at 25% 20%, rgba(224,95,58,0.1) 0%, transparent 62%), radial-gradient(ellipse 65% 60% at 82% 78%, rgba(47,27,96,0.1) 0%, transparent 60%)",
              }}
            />

            <dl className="grid grid-cols-2 overflow-hidden rounded-2xl border border-cream-line bg-card/70 backdrop-blur-sm">
              {aboutStats.map((stat) => (
                /* `dt` must precede `dd` in the DOM; column-reverse puts the
                   figure back on top visually. */
                <div
                  key={stat.value}
                  className="group relative flex flex-col-reverse justify-end border-cream-line p-6 transition-colors duration-300 hover:bg-cream-deep/50 sm:p-8 [&:nth-child(-n+2)]:border-b [&:nth-child(odd)]:border-r"
                >
                  <dt className="mt-3.5 text-[12.5px] font-medium leading-[1.5] text-ink-muted">
                    {stat.label}
                  </dt>
                  <dd className="font-display text-[2.5rem] leading-none tracking-[-0.02em] text-heading sm:text-[3rem]">
                    {stat.value}
                  </dd>
                  <span
                    aria-hidden
                    className="absolute bottom-0 left-0 h-px w-0 bg-accent transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-full"
                  />
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
