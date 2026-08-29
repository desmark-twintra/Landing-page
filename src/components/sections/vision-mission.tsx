import { Globe, Target } from "lucide-react";
import { pillars, visionMissionIntro } from "@/content/vision-mission";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";

const icons = { vision: Globe, mission: Target } as const;

export function VisionMission() {
  return (
    <Section id="vision">
      <SectionHeading
        label={visionMissionIntro.label}
        title={visionMissionIntro.title}
        align="center"
        className="mx-auto"
      />

      <div className="mt-14 grid gap-6 lg:grid-cols-2 lg:gap-8">
        {pillars.map((pillar, i) => {
          const Icon = icons[pillar.key];

          return (
            <Reveal key={pillar.key} as="article" delay={i * 2}>
              <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-cream-line bg-card transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:shadow-[0_28px_56px_-28px_rgba(30,17,64,0.4)]">
                {/* Artwork panel — swaps to a photograph by setting `image` in content */}
                <div className="relative aspect-[2/1] overflow-hidden">
                  <span
                    aria-hidden
                    className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
                    style={
                      pillar.image
                        ? {
                            backgroundImage: `url(${pillar.image})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                          }
                        : { backgroundImage: pillar.gradient }
                    }
                  />
                  <span
                    aria-hidden
                    className="bg-grain absolute inset-0 opacity-[0.16] mix-blend-overlay"
                  />

                  <span className="absolute left-6 top-6 flex items-center gap-3">
                    <span className="flex size-11 items-center justify-center rounded-full border border-white/25 bg-white/12 text-white backdrop-blur-md">
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/85">
                      {pillar.kind}
                    </span>
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-7 sm:p-9">
                  <h3 className="font-display text-[1.5rem] leading-[1.25] tracking-[-0.01em] text-heading sm:text-[1.75rem]">
                    {pillar.title}
                  </h3>
                  <p className="mt-4 text-[15px] leading-[1.75] text-ink-mid">
                    {pillar.body}
                  </p>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
