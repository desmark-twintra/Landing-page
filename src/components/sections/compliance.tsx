import { Factory, Landmark, Leaf, Receipt } from "lucide-react";
import { complianceIntro, credentials, type Credential } from "@/content/compliance";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const icons: Record<Credential["icon"], typeof Landmark> = {
  landmark: Landmark,
  factory: Factory,
  leaf: Leaf,
  receipt: Receipt,
};

export function Compliance() {
  return (
    <Section id="compliance">
      <SectionHeading
        label={complianceIntro.label}
        title={complianceIntro.title}
        align="center"
        lead="Every claim on this page is backed by a registration you can verify. Where something is still in process, we say so."
        className="mx-auto"
      />

      <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {credentials.map((cred, i) => {
          const Icon = icons[cred.icon];
          const pending = cred.status === "pending";

          return (
            <Reveal as="li" key={cred.title} delay={i}>
              <div
                className={cn(
                  "flex h-full flex-col items-start rounded-2xl border p-7 transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:shadow-[0_24px_48px_-26px_rgba(30,17,64,0.3)]",
                  pending
                    ? "border-amber/30 bg-amber/[0.05]"
                    : "border-cream-line bg-card",
                )}
              >
                <span
                  className={cn(
                    "flex size-14 items-center justify-center rounded-full ring-1",
                    pending
                      ? "bg-amber/10 text-amber ring-amber/25"
                      : "bg-outline/[0.05] text-success ring-outline/12",
                  )}
                >
                  <Icon className="size-6" aria-hidden />
                </span>

                <h3 className="mt-5 font-display text-[1.15rem] leading-snug text-heading">
                  {cred.title}
                </h3>
                <p className="mt-3 flex-1 text-[13.5px] leading-[1.65] text-ink-muted">
                  {cred.body}
                </p>

                {cred.note && (
                  <p className="mt-3 text-[12.5px] font-medium tracking-[0.02em] text-heading">
                    {cred.note}
                  </p>
                )}

                <Badge status={cred.status} className="mt-6">
                  {cred.statusLabel}
                </Badge>
              </div>
            </Reveal>
          );
        })}
      </ul>
    </Section>
  );
}
