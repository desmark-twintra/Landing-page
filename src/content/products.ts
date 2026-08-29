export type Product = {
  slug: string;
  name: string;
  category: string;
  summary: string;
  description: string;
  /** Layered CSS gradient used as the card / hero artwork. */
  gradient: string;
  /** Photo shown under the gradient tint — path under /public. */
  image: string;
  tags: string[];
  /** Product-level attributes. Values stay buyer-negotiated — no fixed claims. */
  attributes: { label: string; value: string }[];
};

/**
 * Company-level trade terms. Identical across the catalogue, so they live here
 * once rather than being repeated on every product.
 */
export const tradeTerms = [
  { label: "Market", value: "Domestic India (Phase 1)" },
  {
    label: "Clients",
    value:
      "Wholesalers, Retailers, Food Processors, Institutional Buyers, Hotels, Restaurants & Caterers",
  },
  { label: "Food Safety", value: "FSSAI Registered" },
  { label: "Packaging", value: "As per Buyer Specification" },
];

export const productsIntro = {
  label: "What We Trade",
  title: "India's Finest Products,\nDelivered with Confidence",
  lead: "India is the world's largest producer and exporter of chillies, and Desmark Twintra is positioned to be a reliable intermediary in this ecosystem. We source high-quality dried red chillies, chilli powder, and related variants from established growing regions, ensuring consistent quality grades for both domestic and future export shipments.",
  flagship: "Flagship Category",
  flagshipName: "Red Chillies & Chilli Variants",
};

export const products: Product[] = [
  {
    slug: "dried-red-chilli",
    name: "Dried Red Chilli",
    category: "Whole Spice",
    summary:
      "Sun-dried whole red chillies sourced from established growing regions, sorted for colour and grade consistency.",
    description:
      "Our core line. Whole dried red chillies are procured directly from established Indian growing belts and assessed lot by lot for moisture, colour, and grade consistency before dispatch. We apply export-grade thinking even to domestic supply, so the same evaluation habits that serve a wholesaler today will serve an overseas buyer tomorrow.",
    gradient:
      "radial-gradient(ellipse 70% 60% at 55% 60%, rgba(255,75,15,0.65) 0%, transparent 60%), radial-gradient(ellipse 45% 35% at 30% 45%, rgba(200,35,8,0.55) 0%, transparent 55%), radial-gradient(ellipse 35% 25% at 78% 35%, rgba(160,22,5,0.5) 0%, transparent 48%), radial-gradient(ellipse 28% 20% at 50% 78%, rgba(255,95,25,0.4) 0%, transparent 42%), radial-gradient(ellipse 20% 16% at 18% 68%, rgba(180,30,6,0.45) 0%, transparent 38%), linear-gradient(155deg,#6a1000 0%,#a81800 22%,#cc2200 42%,#d42800 56%,#a01600 74%,#5e0c00 100%)",
    image: "/products/dried-red-chilli.jpg",
    tags: ["Whole Pods", "Stem / Stemless", "Colour Sorted", "Bulk Lots"],
    attributes: [
      { label: "Form", value: "Whole dried pods" },
      { label: "Stem", value: "With stem or stemless, as ordered" },
      { label: "Lot assessment", value: "Moisture, colour & grade consistency" },
      { label: "Order size", value: "Bulk — quantity agreed per contract" },
    ],
  },
  {
    slug: "chilli-powder",
    name: "Chilli Powder",
    category: "Ground Spice",
    summary:
      "Ground chilli in buyer-specified mesh, supplied to food processors, packers and institutional kitchens.",
    description:
      "Ground chilli supplied to the fineness and blend a buyer specifies. This line serves food manufacturers, spice packers and institutional kitchens that need arrival-to-arrival consistency rather than one good shipment. Grinding and packing specifications are confirmed in writing before any lot is committed.",
    gradient:
      "radial-gradient(ellipse 65% 50% at 45% 55%, rgba(255,85,8,0.65) 0%, transparent 58%), radial-gradient(ellipse 42% 32% at 72% 38%, rgba(210,48,5,0.55) 0%, transparent 52%), radial-gradient(ellipse 35% 28% at 22% 42%, rgba(240,65,12,0.5) 0%, transparent 48%), radial-gradient(ellipse 28% 22% at 58% 78%, rgba(185,28,5,0.45) 0%, transparent 42%), radial-gradient(ellipse 50% 38% at 50% 48%, rgba(215,52,8,0.3) 0%, transparent 60%), linear-gradient(140deg,#8c1500 0%,#b82000 20%,#d83200 38%,#e83a00 52%,#c02800 68%,#7a1200 88%,#5a0d00 100%)",
    image: "/products/chilli-powder.jpg",
    tags: ["Ground", "Buyer Mesh", "Food Processors", "Institutional"],
    attributes: [
      { label: "Form", value: "Ground powder" },
      { label: "Mesh", value: "As per buyer specification" },
      { label: "Best for", value: "Manufacturers, packers, institutional kitchens" },
      { label: "Consistency", value: "Grade matched across repeat lots" },
    ],
  },
  {
    slug: "teja-variety",
    name: "Teja Variety",
    category: "Named Variety",
    summary:
      "The high-pungency variety most sought after by export buyers and oleoresin processors.",
    description:
      "Teja is among the most recognised Indian chilli varieties in international trade, valued for its pungency and its use in extraction and processing. We source it as a named variety so buyers who specify Teja receive Teja — traceable to the growing region, with grading confirmed before the lot is committed.",
    gradient:
      "radial-gradient(ellipse 60% 55% at 50% 42%, rgba(255,42,0,0.68) 0%, transparent 58%), radial-gradient(ellipse 42% 30% at 22% 38%, rgba(210,18,0,0.58) 0%, transparent 52%), radial-gradient(ellipse 38% 28% at 78% 35%, rgba(190,12,0,0.52) 0%, transparent 48%), radial-gradient(ellipse 30% 24% at 45% 78%, rgba(255,58,5,0.42) 0%, transparent 44%), radial-gradient(ellipse 22% 18% at 15% 72%, rgba(168,8,0,0.48) 0%, transparent 38%), linear-gradient(165deg,#4e0600 0%,#820d00 18%,#b01200 36%,#d41800 52%,#9c0e00 70%,#620800 88%,#3c0500 100%)",
    image: "/products/teja-variety.jpg",
    tags: ["High Pungency", "Named Variety", "Export Favourite", "Processing"],
    attributes: [
      { label: "Profile", value: "High pungency" },
      { label: "Sourcing", value: "Traceable to growing region" },
      { label: "Typical demand", value: "Export buyers, extraction & processing" },
      { label: "Grading", value: "Confirmed before lot commitment" },
    ],
  },
  {
    slug: "sannam-variety",
    name: "Sannam Variety",
    category: "Named Variety",
    summary:
      "The dependable all-rounder — balanced colour and heat, widely used across Indian kitchens and trade.",
    description:
      "Sannam (S4) is the workhorse of the Indian chilli trade: balanced in colour and heat, and consistently in demand across domestic wholesale, retail packing and food service. It is the variety most buyers start with, and the one where reliable, repeatable supply matters more than anything else.",
    gradient:
      "radial-gradient(ellipse 62% 48% at 55% 52%, rgba(255,95,28,0.62) 0%, transparent 58%), radial-gradient(ellipse 40% 30% at 28% 36%, rgba(220,50,8,0.52) 0%, transparent 52%), radial-gradient(ellipse 36% 26% at 76% 36%, rgba(198,38,6,0.48) 0%, transparent 48%), radial-gradient(ellipse 28% 22% at 48% 76%, rgba(255,80,18,0.42) 0%, transparent 42%), radial-gradient(ellipse 52% 40% at 50% 44%, rgba(210,46,10,0.28) 0%, transparent 60%), linear-gradient(148deg,#7e1200 0%,#a81a00 20%,#cc2600 40%,#da2e00 55%,#b01e00 72%,#761200 90%,#501000 100%)",
    image: "/products/sannam-variety.jpg",
    tags: ["Balanced Heat", "Named Variety", "Retail Packing", "Food Service"],
    attributes: [
      { label: "Profile", value: "Balanced colour and heat" },
      { label: "Sourcing", value: "Traceable to growing region" },
      { label: "Typical demand", value: "Wholesale, retail packing, food service" },
      { label: "Supply", value: "Built for repeat, season-to-season orders" },
    ],
  },
  {
    slug: "bulk-trade",
    name: "Bulk Trade",
    category: "Trade Service",
    summary:
      "Large-volume procurement handled end to end — sourcing, grading, documentation and delivery.",
    description:
      "For buyers moving volume rather than sampling it. We handle the full chain — procurement from growing regions, quality grading, logistics coordination, documentation and payment terms — under one accountable registered entity. Honest pricing and clear paperwork are the point: we are building partnerships that last through multiple seasons, not single closed deals.",
    gradient:
      "radial-gradient(ellipse 62% 48% at 52% 52%, rgba(210,148,58,0.58) 0%, transparent 58%), radial-gradient(ellipse 42% 32% at 26% 38%, rgba(178,118,38,0.52) 0%, transparent 52%), radial-gradient(ellipse 36% 28% at 76% 36%, rgba(158,98,28,0.48) 0%, transparent 48%), radial-gradient(ellipse 30% 22% at 44% 76%, rgba(198,138,48,0.42) 0%, transparent 42%), radial-gradient(ellipse 45% 35% at 58% 28%, rgba(222,158,62,0.38) 0%, transparent 50%), radial-gradient(ellipse 24% 20% at 14% 64%, rgba(138,88,22,0.42) 0%, transparent 38%), linear-gradient(152deg,#362000 0%,#5e3408 18%,#7e4810 34%,#9a5e1c 50%,#724210 68%,#422808 84%,#281802 100%)",
    image: "/products/bulk-trade.jpg",
    tags: ["Volume Orders", "Logistics", "Documentation", "Contract Supply"],
    attributes: [
      { label: "Scope", value: "Procurement through delivery" },
      { label: "Includes", value: "Grading, logistics, documentation, payment terms" },
      { label: "Pricing", value: "Transparent, quoted per contract" },
      { label: "Relationship", value: "Multi-season contract supply" },
    ],
  },
  {
    slug: "export-grade-sorting",
    name: "Export-Grade Sorting",
    category: "Trade Service",
    summary:
      "Lot-by-lot evaluation for moisture, colour and grade consistency — the discipline behind every shipment.",
    description:
      "Not a commodity so much as the standard we hold everything to. Every lot is evaluated for moisture, colour and grade consistency before it moves, and the documentation practices we follow domestically are the same ones international buyers will audit us against. Our domestic phase is preparation, not limitation.",
    gradient:
      "radial-gradient(ellipse 60% 52% at 50% 46%, rgba(96,168,118,0.42) 0%, transparent 58%), radial-gradient(ellipse 44% 32% at 24% 36%, rgba(58,126,84,0.48) 0%, transparent 52%), radial-gradient(ellipse 38% 28% at 78% 34%, rgba(184,146,42,0.34) 0%, transparent 48%), radial-gradient(ellipse 30% 24% at 46% 78%, rgba(74,140,96,0.4) 0%, transparent 44%), radial-gradient(ellipse 26% 20% at 84% 74%, rgba(212,136,10,0.26) 0%, transparent 40%), linear-gradient(150deg,#0f2a20 0%,#1b3a2d 22%,#2d5a3f 44%,#356b4a 58%,#22452f 76%,#12291e 100%)",
    image: "/products/export-grade-sorting.jpg",
    tags: ["Quality Control", "Moisture", "Colour Grade", "Documentation"],
    attributes: [
      { label: "Assessed", value: "Moisture, colour, grade consistency" },
      { label: "Applied to", value: "Every lot, domestic and export" },
      { label: "Standard", value: "Export-grade thinking on domestic supply" },
      { label: "Records", value: "Documentation kept audit-ready" },
    ],
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
