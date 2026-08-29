import { Check, Mail, MapPin, Phone, Building2, Globe, Receipt } from "lucide-react";
import { buyerProfiles, contact } from "@/content/company";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { EnquiryForm } from "@/components/quote/enquiry-form";

const details = [
  { icon: Building2, label: "Company", value: contact.company, href: null },
  { icon: Receipt, label: "GSTIN", value: contact.gstin, href: null },
  { icon: Mail, label: "Email", value: contact.email, href: `mailto:${contact.email}` },
  { icon: Phone, label: "Phone", value: contact.phone, href: `tel:${contact.phoneHref}` },
  { icon: MapPin, label: "Location", value: contact.location, href: null },
  {
    icon: Globe,
    label: "Website",
    value: contact.website ?? "Coming soon",
    href: contact.website,
  },
];

export function Contact() {
  return (
    <Section id="contact" dark className="isolate overflow-hidden bg-panel">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-90"
        style={{
          background:
            "radial-gradient(ellipse 55% 50% at 8% 8%, rgba(192,57,43,0.24) 0%, transparent 58%), radial-gradient(ellipse 60% 55% at 92% 88%, rgba(184,146,42,0.18) 0%, transparent 60%)",
        }}
      />
      {/* Deepens the panel toward its centre — only reads correctly against
          the always-dark violet panel, so it's dark-theme only. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 hidden opacity-90 dark:block"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(47,27,96,0.5) 0%, transparent 70%)",
        }}
      />

      <div className="grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16">
        {/* ─── Details ─── */}
        <div>
          <Reveal>
            <SectionHeading
              label="Get in Touch"
              title="Let's Trade Together"
              tone="dark"
            />

            <p className="mt-6 max-w-md text-[15.5px] leading-[1.75] text-panel-ink/60">
              Whether you are a domestic wholesaler, food manufacturer, or an overseas
              buyer interested in building a supply relationship — we welcome every
              conversation.
            </p>
          </Reveal>

          <Reveal delay={2}>
            <dl className="mt-10 space-y-px overflow-hidden rounded-2xl border border-panel-ink/10 bg-panel-ink/[0.04]">
              {details.map(({ icon: Icon, label, value, href }) => (
                <div
                  key={label}
                  className="flex items-start gap-4 border-b border-panel-ink/[0.07] px-5 py-4 last:border-b-0"
                >
                  <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full bg-panel-ink/[0.07] text-accent">
                    <Icon className="size-4" aria-hidden />
                  </span>
                  <div className="min-w-0">
                    <dt className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-panel-ink/40">
                      {label}
                    </dt>
                    <dd className="mt-1 break-words text-[14.5px] text-panel-ink/85">
                      {href ? (
                        <a
                          href={href}
                          className="underline-offset-4 transition-colors hover:text-accent hover:underline"
                        >
                          {value}
                        </a>
                      ) : (
                        value
                      )}
                    </dd>
                  </div>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={3}>
            <div className="mt-10">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
                Who We Work With
              </p>
              <ul className="mt-5 space-y-3">
                {buyerProfiles.map((profile) => (
                  <li
                    key={profile}
                    className="flex gap-3 text-[14px] leading-[1.6] text-panel-ink/65"
                  >
                    <span className="mt-0.5 flex size-4.5 shrink-0 items-center justify-center rounded-full bg-accent/20 text-accent">
                      <Check className="size-3" aria-hidden />
                    </span>
                    {profile}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        {/* ─── Enquiry form ─── */}
        <Reveal delay={1}>
          <div className="rounded-2xl border border-cream-line bg-card p-7 shadow-[0_30px_70px_-30px_rgba(0,0,0,0.6)] sm:p-9 lg:sticky lg:top-28">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
              Send an Enquiry
            </p>
            <h3 className="mt-2.5 font-display text-[1.7rem] leading-tight text-heading">
              Tell us what you need
            </h3>
            <p className="mt-3 text-[14px] leading-[1.65] text-ink-muted">
              Share your requirement and we&apos;ll respond with grades, packing options
              and indicative terms.
            </p>

            <div className="mt-7">
              <EnquiryForm />
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
