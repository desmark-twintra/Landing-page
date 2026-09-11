import type { Metadata } from "next";
import { OG_IMAGE } from "@/lib/site";
import { company, contact } from "@/content/company";
import { Contact } from "@/components/sections/contact";
import { JsonLd } from "@/components/json-ld";
import { contactPageJsonLd } from "@/lib/structured-data";

const contactDescription = `Talk to ${company.name} about chilli supply — grades, packing and indicative terms. Email ${contact.email} or reach us on WhatsApp.`;

export const metadata: Metadata = {
  title: "Contact Us",
  description: contactDescription,
  alternates: { canonical: "/contact" },
  openGraph: {
    type: "website",
    url: "/contact",
    title: `Contact Us · ${company.name}`,
    description: contactDescription,
    images: [OG_IMAGE],
  },
};

export default function ContactPage() {
  // Contact is a dark full-bleed Section; its own py-20/24/32 plus the pt below
  // clears the fixed header without a separate page-header band.
  return (
    <div className="pt-18">
      <JsonLd data={contactPageJsonLd} />
      <Contact />
    </div>
  );
}
