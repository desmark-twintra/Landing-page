export const company = {
  name: "Desmark Twintra LLP",
  nameParts: { first: "Desmark", second: "Twintra", suffix: "LLP" },
  legalForm: "Limited Liability Partnership · India",
  tagline: "Global Trade Excellence",
  eyebrow: "Agricultural Products Trading — Est. 2026",
  established: 2026,
  promise: "Quality in Every Shipment. Trust in Every Transaction.",
  promiseLabel: "Our Promise",
  heroLead:
    "A fully registered agricultural trading partnership, built on transparency, quality assurance, and a long-term vision for cross-border commerce in premium Indian spices.",
  sector: "Agricultural Products Trading · India",
} as const;

export const contact = {
  company: "Desmark Twintra LLP",
  email: "desmarktwintrallp@gmail.com",
  phone: "+91 80562 50963",
  phoneHref: "+918056250963",
  location: "Chennai, Tamil Nadu, India",
  website: null as string | null,
  gstin: "33AAZFD7884N1ZA",
} as const;

export type CertStatus = "active" | "pending";

export const certifications: {
  short: string;
  label: string;
  status: CertStatus;
}[] = [
  { short: "MCA", label: "MCA Registered", status: "active" },
  { short: "MSME", label: "MSME Certified", status: "active" },
  { short: "FSSAI", label: "FSSAI Registered", status: "active" },
  { short: "GST", label: "GST Registered", status: "active" },
];

export const aboutCopy = {
  label: "Who We Are",
  title: "Trade Beyond Transactions",
  paragraphs: [
    {
      text: "Desmark Twintra LLP is a newly established, {{government-registered agricultural trading company}} based in India, with a focused initial specialisation in chillies and chilli-related produce.",
    },
    {
      text: "We were founded on the belief that great trading is not just about moving goods, it is about building lasting relationships grounded in integrity, compliance, and mutual growth. Our entry into domestic markets is a deliberate, disciplined step toward becoming a {{trusted name in global spice exports}}.",
    },
    {
      text: "Every process — from sourcing to documentation to delivery — is handled with attention to regulatory standards and genuine respect for both buyer and seller.",
    },
  ],
};

export const aboutStats = [
  {
    value: "3+",
    label: "Government Registrations & Certifications",
  },
  {
    value: "Dual",
    label: "Market Focus — Domestic & Export",
  },
  {
    value: "100%",
    label: "Compliance-First Approach",
  },
  {
    value: "PAN",
    label: "India Domestic Trade Reach",
  },
];

/** Buyer profiles the company is actively looking to work with. */
export const buyerProfiles = [
  "Domestic wholesalers & retailers looking for reliable chilli supply",
  "Food manufacturers & processors needing consistent grade supply",
  "Overseas importers interested in building an India supply chain",
  "B2B buyers who value documentation, compliance & trust",
];

export const navLinks = [
  { href: "/#about", label: "About" },
  { href: "/#products", label: "Products" },
  { href: "/#journey", label: "Journey" },
  { href: "/#compliance", label: "Compliance" },
  { href: "/#contact", label: "Contact" },
];
