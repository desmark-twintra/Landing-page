import Link from "next/link";
import { company, contact, navLinks, certifications } from "@/content/company";
import { products } from "@/content/products";
import { Container } from "@/components/ui/container";
import { BrandMark } from "@/components/ui/brand-mark";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="on-dark border-t border-panel-ink/10 bg-panel pb-32 lg:pb-0">
      {/* pb-32 clears the fixed mobile Call/Enquire bar (mobile-cta-bar.tsx) plus
          env(safe-area-inset-bottom) on notched phones; lg:pb-0 keeps desktop
          unchanged, which has no such bar. */}
      <Container className="py-16 sm:py-20 lg:py-24">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <BrandMark tone="dark" />
            <p className="mt-4 font-display text-[1.35rem] leading-snug text-panel-ink/90">
              {company.tagline}
            </p>
            <p className="mt-3 max-w-xs text-[13.5px] leading-[1.65] text-panel-ink/45">
              {company.legalForm} · {company.sector}
            </p>

            <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-2">
              {certifications.map((cert) => (
                <li
                  key={cert.short}
                  className="text-[11.5px] tracking-[0.06em] text-panel-ink/40"
                >
                  {cert.label}
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Footer">
            <h2 className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-accent">
              Explore
            </h2>
            <ul className="mt-4 space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[14px] text-panel-ink/60 underline-offset-4 transition-colors hover:text-panel-ink hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-accent">
              Products
            </h2>
            <ul className="mt-4 space-y-2.5">
              {products.map((product) => (
                <li key={product.slug}>
                  <Link
                    href={`/products/${product.slug}`}
                    className="text-[14px] text-panel-ink/60 underline-offset-4 transition-colors hover:text-panel-ink hover:underline"
                  >
                    {product.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-panel-ink/10 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[12.5px] text-panel-ink/40">
            © {year} {company.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-[12.5px] text-panel-ink/40">
            <a
              href={`mailto:${contact.email}`}
              className="underline-offset-4 transition-colors hover:text-panel-ink/70 hover:underline"
            >
              {contact.email}
            </a>
            {contact.phones.map((p) => (
              <a
                key={p.href}
                href={`tel:${p.href}`}
                className="underline-offset-4 transition-colors hover:text-panel-ink/70 hover:underline"
              >
                {p.display}
              </a>
            ))}
            <span>{contact.location}</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
