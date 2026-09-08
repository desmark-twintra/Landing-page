import type { Metadata } from "next";
import { company, contact } from "@/content/company";
import { Contact } from "@/components/sections/contact";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Talk to ${company.name} about chilli supply — grades, packing and indicative terms. Email ${contact.email} or reach us on WhatsApp.`,
};

export default function ContactPage() {
  // Contact is a dark full-bleed Section; its own py-20/24/32 plus the pt below
  // clears the fixed header without a separate page-header band.
  return (
    <div className="pt-18">
      <Contact />
    </div>
  );
}
