import { Container } from "@/components/ui/container";
import { CertMarquee } from "./cert-marquee";
import { HeroChilliAnimation } from "./hero-chilli-animation";
import { HeroContent } from "./hero-content";
import { HeroIntroProvider } from "./hero-intro-context";

/**
 * Occupies exactly one screen at every size, with the credential rail as the
 * last thing above the fold.
 *
 * `min-h-svh` rather than `h-svh`: `svh` keeps mobile browser chrome from
 * pushing the rail out of view, and `min-` lets the section grow instead of
 * clipping on viewports too short to hold the copy at all (landscape phones).
 *
 * The copy and the chilli share one intro timeline — the pile lands centred and
 * alone, then travels into its cell as the copy fades up — so both sit inside
 * `HeroIntroProvider`, which owns the clock. The section itself stays a server
 * component; only those two children are client-side.
 */
export function Hero() {
  return (
    <section className="on-dark bg-hero-mesh relative isolate flex min-h-svh flex-col overflow-hidden">
      {/* Grain only — the mesh carries the hero on its own, with no grid. */}
      <div aria-hidden className="bg-grain pointer-events-none absolute inset-0 opacity-[0.16] mix-blend-overlay" />

      {/* The mesh settles into its deep base above the credential rail. Scoped to
          this wrapper so the fade never washes over the rail's text. */}
      <div className="relative flex flex-1 items-center">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-panel/85"
        />

        <Container className="relative w-full pb-8 pt-24 sm:pt-28 2xl:max-w-[1560px]">
          <HeroIntroProvider>
            <div className="grid items-center gap-8 sm:gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
              {/* ─── Copy ─── */}
              <HeroContent />

              {/* ─── Banner image ─── */}
              <HeroChilliAnimation />
            </div>
          </HeroIntroProvider>
        </Container>
      </div>

      {/* ─── Credential rail ─── */}
      <CertMarquee />
    </section>
  );
}
