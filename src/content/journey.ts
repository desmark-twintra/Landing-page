export type PhaseStatus = "active" | "planned" | "vision";

export type Phase = {
  step: number;
  status: PhaseStatus;
  /** Short label for the stepper rail. */
  rail: string;
  badge: string;
  title: string;
  description: string;
  /** Concrete workstreams inside the phase, shown in the expanded card. */
  points: string[];
};

export const journeyIntro = {
  label: "Our Journey",
  title: "Delivering Quality.\nBuilding Trust. Connecting Markets.",
};

export const phases: Phase[] = [
  {
    step: 1,
    status: "active",
    rail: "Domestic",
    badge: "Phase 1 — Active",
    title: "Domestic Market Entry",
    description:
      "Establishing trade relationships across India. Building operational experience in agricultural commodity trading — from procurement and quality grading to logistics, documentation, and payment terms. Gaining ground-level market intelligence essential for long-term scalability.",
    points: [
      "Procurement relationships across established growing regions",
      "Quality grading and lot-level evaluation practices",
      "Logistics, documentation and payment-term workflows",
      "Ground-level market intelligence for long-term scale",
    ],
  },
  {
    step: 2,
    status: "planned",
    rail: "Export",
    badge: "Phase 2 — Planned",
    title: "Export Market Launch",
    description:
      "Transitioning into international trade with destinations in Southeast Asia, the Middle East, and Europe. Leveraging domestic expertise, FSSAI compliance, and MSME status to access government export incentives and credibility with overseas buyers.",
    points: [
      "Target destinations: Southeast Asia, Middle East, Europe",
      "FSSAI compliance carried into export documentation",
      "MSME status applied to government export incentives",
      "Credibility built on a proven domestic track record",
    ],
  },
  {
    step: 3,
    status: "vision",
    rail: "Expansion",
    badge: "Phase 3 — Vision",
    title: "Category Expansion",
    description:
      "Broadening the product portfolio beyond chillies to include other Indian agricultural commodities — spices, pulses, and dry produce — to serve a wider client base with a single, trusted trading partner.",
    points: [
      "Portfolio beyond chillies into wider Indian agri commodities",
      "Spices, pulses and dry produce lines",
      "One trusted partner across a buyer's full basket",
      "Wider client base served under a single relationship",
    ],
  },
];
