"use client";

import { products } from "@/content/products";
import { DepthCarousel } from "@/components/ui/depth-carousel";
import { useReducedMotionSafe } from "@/lib/hydration";

// Extra chilli photography (not tied to a catalogue entry) rounding out the
// hero stack, since the trade-service products (bulk trade, sorting) don't
// have a chilli of their own to show.
const EXTRA_IMAGES = [
  { image: "/products/chilli-hanging-dried.jpg", alt: "Dried red chillies hanging to cure" },
  { image: "/products/chilli-red-green-pair.jpg", alt: "Ripe and unripe chilli peppers" },
  { image: "/products/chilli-spice-scatter.jpg", alt: "Whole dried chillies and ground spice" },
];

/**
 * Hero visual — a 3D depth stack cycling through chilli photography,
 * replacing the old static 2x2 grid so buyers see more of the product
 * without leaving the fold. Excludes the catalogue's non-chilli trade-service
 * photos (shipping containers, generic sorting) so every card is on-theme.
 */
export function HeroProductCarousel() {
  const reducedMotion = useReducedMotionSafe();
  const items = [
    ...products.filter((p) => p.slug !== "bulk-trade").map((p) => ({ image: p.image, alt: p.name })),
    ...EXTRA_IMAGES,
  ];

  return (
    <div className="relative mx-auto h-[300px] w-full max-w-sm sm:h-[400px] sm:max-w-lg lg:h-[460px] lg:max-w-xl">
      <DepthCarousel
        items={items}
        cardWidth={300}
        cardHeight={375}
        radius={20}
        tint="#170a06"
        depth={190}
        spread={70}
        tilt={12}
        tiltDirection="right"
        perspective={1200}
        visibleCards={2}
        falloff={0.5}
        blur={6}
        duration={650}
        autoplay={!reducedMotion}
        autoplayDelay={4200}
        loop
        showControls
        showIndicators
      />
    </div>
  );
}
