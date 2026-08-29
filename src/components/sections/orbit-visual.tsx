import Image from "next/image";
import { products } from "@/content/products";
import { certifications } from "@/content/company";
import { OrbitingCircles } from "@/components/ui/orbiting-circles";
import { cn } from "@/lib/utils";

/**
 * The hero's orbiting credential graphic. Two counter-rotating rings — product
 * lines outside, registrations inside — around the registration count.
 *
 * Every dimension is a ratio of one variable, `--orbit-d`, which is set per
 * breakpoint below against *both* viewport axes. That is what lets the same
 * component fill a television and shrink into the space a phone has left over
 * once the copy and the credential rail have taken theirs.
 *
 * Motion is pure CSS (see `OrbitingCircles` and the `orbit` keyframe in
 * globals.css); hovering the graphic parks every ring so the labels can be read.
 */

/* Ring geometry as fractions of --orbit-d.

   Captions used to be an absolutely-positioned child hanging "below" their
   tile in screen space. That breaks with independent rotation: the product
   ring and the credential ring spin at different speeds, so whichever tile
   is nearest the top of its (still-rotating) circle at any given moment has
   its caption swinging inward, toward the credential ring, rather than
   staying outward — a collision that recurs continuously through the
   rotation, not just at one unlucky frame. Fixed by giving captions their
   own ring (below) that travels in lockstep with the product ring — same
   duration/startAngle/direction, one radius further out — so a caption is
   always radially outward of its own tile, at every point in the rotation.

   The inner (credential) ring's radius has to clear both neighbours: the
   product ring above it, and the centre stat's text below it. */
const OUTER_RADIUS = "calc(var(--orbit-d)*0.38)";
const OUTER_ICON = "calc(var(--orbit-d)*0.145)";
const CAPTION_RADIUS = "calc(var(--orbit-d)*0.475)";
const INNER_RADIUS = "calc(var(--orbit-d)*0.23)";
const INNER_ICON = "calc(var(--orbit-d)*0.115)";

/** Caps the per-breakpoint size so the box never outgrows its grid column,
 *  and floors it so the graphic stays legible (and the ring gaps above stay
 *  clear of the badges' own fixed font-size floor) on short mobile screens,
 *  where `28svh`/`32svh` alone can shrink it a lot further than that. */
const ORBIT_SIZE = cn(
  "[--orbit-d:max(270px,min(72vw,28svh))]",
  "sm:[--orbit-d:max(310px,min(56vw,32svh))]",
  "lg:[--orbit-d:min(38vw,58svh,470px)]",
  "2xl:[--orbit-d:min(34vw,62svh,660px)]",
);

export function OrbitVisual({ className }: { className?: string }) {
  const orbiting = products.slice(0, 4);

  return (
    <div
      className={cn(
        "group relative mx-auto size-(--orbit-d) shrink-0",
        ORBIT_SIZE,
        className,
      )}
    >
      {/* Ambient glow behind the whole system */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-[-18%] rounded-full opacity-70 blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(139,92,246,0.42) 0%, rgba(96,42,168,0.22) 42%, transparent 70%)",
        }}
      />

      {/* Light sweeping around the rings, clipped to the annulus they occupy.
          `closest-side` makes the mask's percentages fractions of the radius,
          so the band tracks the ring ratios above. */}
      <div
        aria-hidden
        className="animate-sweep pointer-events-none absolute inset-0 group-hover:[animation-play-state:paused]"
        style={{
          background:
            "conic-gradient(from 0deg, transparent 0deg, rgba(196,181,253,0.22) 34deg, rgba(224,168,120,0.14) 60deg, transparent 96deg)",
          maskImage:
            "radial-gradient(circle closest-side at 50% 50%, transparent 42%, #000 50%, #000 78%, transparent 86%)",
          WebkitMaskImage:
            "radial-gradient(circle closest-side at 50% 50%, transparent 42%, #000 50%, #000 78%, transparent 86%)",
        }}
      />

      {/* ─── Outer ring — product lines ─── */}
      <OrbitingCircles
        radius={OUTER_RADIUS}
        iconSize={OUTER_ICON}
        duration={54}
        startAngle={22}
        pathClassName="border-panel-ink/22 lg:border-dashed"
        className="group-hover:[animation-play-state:paused]"
      >
        {orbiting.map((product) => (
          <div key={product.slug} aria-hidden className="group/node relative size-full">
            <span
              className="absolute inset-0 rounded-[28%] opacity-55 blur-[calc(var(--orbit-d)*0.028)] transition-opacity duration-500 group-hover/node:opacity-90"
              style={{ backgroundImage: product.gradient }}
            />
            <span className="relative block size-full overflow-hidden rounded-[28%] shadow-[0_12px_38px_-10px_rgba(0,0,0,0.7)] ring-1 ring-panel-ink/25 transition-transform duration-500 group-hover/node:scale-110">
              <Image src={product.image} alt="" fill sizes="96px" className="object-cover" />
              <span
                aria-hidden
                className="absolute inset-0 opacity-65 mix-blend-multiply"
                style={{ backgroundImage: product.gradient }}
              />
            </span>
            <span
              className="pointer-events-none absolute inset-0 rounded-[28%] opacity-70"
              style={{
                background:
                  "linear-gradient(150deg, rgba(255,255,255,0.34) 0%, transparent 44%)",
              }}
            />
          </div>
        ))}
      </OrbitingCircles>

      {/* ─── Caption ring — same duration/startAngle/direction as the product
          ring above, one radius further out, so each caption travels in
          lockstep with its own tile and is always radially outward of it
          (see the geometry comment up top). No `path`: it's an alignment
          aid, not a ring anyone should see. ─── */}
      <OrbitingCircles
        radius={CAPTION_RADIUS}
        iconSize={1}
        duration={54}
        startAngle={22}
        path={false}
        className="pointer-events-none group-hover:[animation-play-state:paused]"
      >
        {orbiting.map((product) => (
          <span
            key={product.slug}
            aria-hidden
            className="whitespace-nowrap text-[clamp(9px,calc(var(--orbit-d)*0.026),13px)] font-medium tracking-[0.04em] text-panel-ink/85 [text-shadow:0_1px_6px_rgba(250,246,238,0.9)] dark:[text-shadow:0_1px_6px_rgba(10,4,26,0.9)]"
          >
            {product.name}
          </span>
        ))}
      </OrbitingCircles>

      {/* ─── Middle ring — credentials ─── */}
      <OrbitingCircles
        radius={INNER_RADIUS}
        iconSize={INNER_ICON}
        duration={38}
        startAngle={68}
        reverse
        pathClassName="border-panel-ink/14"
        className="group-hover:[animation-play-state:paused]"
      >
        {certifications.map((cert) => (
          <span
            key={cert.short}
            aria-hidden
            className={cn(
              "flex size-full items-center justify-center rounded-full border text-[clamp(8px,calc(var(--orbit-d)*0.028),13px)] font-semibold tracking-[0.05em] backdrop-blur-md",
              cert.status === "pending"
                ? "border-amber/70 bg-amber/25 text-amber shadow-[0_0_24px_-4px_rgba(212,136,10,0.6)]"
                : "border-white/35 bg-violet-950/70 text-white shadow-[0_0_24px_-6px_rgba(196,181,253,0.65)]",
            )}
          >
            {cert.short}
          </span>
        ))}
      </OrbitingCircles>

      {/* Inner ring — breathing halo */}
      <div className="animate-pulse-ring pointer-events-none absolute inset-[36%] rounded-full border border-violet-300/25" />

      {/* Centre stat */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 m-auto size-[42%] rounded-full blur-2xl dark:hidden"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(250,246,238,0.95) 0%, rgba(250,246,238,0.5) 55%, transparent 72%)",
          }}
        />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 m-auto hidden size-[42%] rounded-full blur-2xl dark:block"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(18,10,38,0.9) 0%, rgba(18,10,38,0.45) 55%, transparent 72%)",
          }}
        />
        <span className="relative font-display text-[clamp(1.75rem,calc(var(--orbit-d)*0.15),4.2rem)] leading-none tracking-[-0.02em] text-panel-ink">
          3<span className="text-panel-accent">+</span>
        </span>
        <span className="relative mt-[calc(var(--orbit-d)*0.016)] text-[clamp(8px,calc(var(--orbit-d)*0.024),12px)] font-medium uppercase tracking-[0.24em] text-panel-ink/65">
          Registrations
        </span>
      </div>

      {/* The rings are decorative; this is the text equivalent. */}
      <span className="sr-only">
        Three or more government registrations —{" "}
        {certifications.map((c) => c.label).join(", ")}. Product lines:{" "}
        {orbiting.map((p) => p.name).join(", ")}.
      </span>
    </div>
  );
}
