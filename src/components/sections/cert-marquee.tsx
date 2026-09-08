import { Factory, Landmark, Leaf, Receipt } from "lucide-react";
import { certifications } from "@/content/company";
import { Marquee } from "@/components/ui/marquee";
import { cn } from "@/lib/utils";

/**
 * Certification rail under the hero. lucide icons stand in for the actual
 * MCA / MSME / FSSAI / GST marks — those are government emblems we hold no
 * licensed artwork for. Adding an `image` field to `certifications` and
 * swapping the icon span here is all it would take once artwork exists.
 */
const icons = [Landmark, Factory, Leaf, Receipt];

function CertItem({
  Icon,
  label,
  pending,
}: {
  Icon: typeof Landmark;
  label: string;
  pending: boolean;
}) {
  return (
    <div className="flex items-center gap-3 px-5 sm:px-7">
      <span
        className={cn(
          "flex size-9 shrink-0 items-center justify-center rounded-full ring-1",
          pending
            ? "bg-amber/10 text-amber ring-amber/25"
            : "bg-panel-ink/[0.07] text-panel-accent ring-panel-ink/15",
        )}
      >
        <Icon className="size-4.5" aria-hidden />
      </span>
      <span
        className={cn(
          "whitespace-nowrap text-[13.5px] tracking-[0.03em]",
          pending ? "text-amber" : "text-panel-ink/75",
        )}
      >
        {label}
      </span>
    </div>
  );
}

export function CertMarquee() {
  const items = certifications.map((cert, i) => (
    <CertItem
      key={cert.short}
      Icon={icons[i % icons.length]}
      label={cert.label}
      pending={cert.status === "pending"}
    />
  ));

  return (
    <div className="relative z-10 shrink-0 overflow-hidden border-t border-panel-ink/10 bg-panel/70 backdrop-blur-sm">
      {/* Edge fades so items dissolve rather than clipping at the gutters */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-panel to-transparent sm:w-24"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-panel to-transparent sm:w-24"
      />

      <Marquee pauseOnHover className="py-3.5 [--duration:32s] [--gap:0rem]">
        {items}
      </Marquee>
    </div>
  );
}
