export const whyIntro = {
  label: "Why Choose Us",
  title: "Building Trust Across Borders",
};

export type Reason = {
  icon:
    | "shield"
    | "sparkles"
    | "handshake"
    | "compass"
    | "globe"
    | "zap";
  title: string;
  body: string;
};

export const reasons: Reason[] = [
  {
    icon: "shield",
    title: "Fully Compliant & Registered",
    body: "MCA registration, MSME certification, and FSSAI food safety registration ensure you are transacting with a legitimate, accountable entity. No shortcuts, no ambiguity.",
  },
  {
    icon: "sparkles",
    title: "Quality-Driven Sourcing",
    body: "We apply export-grade thinking even to domestic supply. Every lot is evaluated for moisture, colour, and grade consistency, building habits that will serve our clients globally.",
  },
  {
    icon: "handshake",
    title: "Transparent Trade Practices",
    body: "Honest pricing, clear documentation, and direct communication are core to how we operate. We don't just close deals, we build partnerships that last through multiple seasons.",
  },
  {
    icon: "compass",
    title: "Market-Literate Team",
    body: "Deep understanding of Indian agri commodity markets, including regional price movements, seasonal cycles, and trade terminology used across the supply chain.",
  },
  {
    icon: "globe",
    title: "Export-Ready Vision",
    body: "Our domestic phase is preparation, not limitation. We are actively building the processes, relationships, and documentation practices required to serve international buyers with confidence.",
  },
  {
    icon: "zap",
    title: "MSME — Agile by Design",
    body: "As a certified MSME, we benefit from government trade support programmes, faster decision cycles, and the flexibility to accommodate both large buyers and specialised niche orders.",
  },
];
