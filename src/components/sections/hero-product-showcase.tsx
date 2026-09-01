import Image from "next/image";
import { products } from "@/content/products";
import { Reveal } from "@/components/ui/reveal";

/**
 * Static replacement for the hero's old orbiting product visual — a calm
 * 2x2 grid so the eye lands on the headline first, not a spinning graphic.
 * Purely decorative (no click-through, no CTA); certifications and the
 * registrations stat live in the credential strip below the CTAs instead.
 */
export function HeroProductShowcase() {
  const featured = products.slice(0, 4);

  return (
    <div className="mx-auto grid w-full max-w-sm grid-cols-2 gap-3 sm:max-w-md sm:gap-4 lg:mx-0 lg:max-w-lg">
      {featured.map((product, i) => (
        <Reveal key={product.slug} delay={i} className="aspect-[4/5] overflow-hidden rounded-2xl">
          <div className="relative size-full">
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(min-width: 1024px) 18vw, (min-width: 640px) 22vw, 40vw"
              className="object-cover"
            />
            <span
              aria-hidden
              className="absolute inset-0 opacity-45 mix-blend-multiply"
              style={{ backgroundImage: product.gradient }}
            />
            <span
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent"
            />
            <span className="absolute inset-x-3 bottom-3 font-display text-[13px] leading-tight text-white sm:text-[14px]">
              {product.name}
            </span>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
