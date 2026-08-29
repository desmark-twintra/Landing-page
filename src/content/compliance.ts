import type { CertStatus } from "./company";

export const complianceIntro = {
  label: "Credentials & Compliance",
  title: "Verified. Certified. Accountable.",
};

export type Credential = {
  icon: "landmark" | "factory" | "leaf" | "receipt";
  title: string;
  body: string;
  status: CertStatus;
  statusLabel: string;
  /** Short verification detail shown under the body — e.g. a registration number. */
  note?: string;
};

export const credentials: Credential[] = [
  {
    icon: "landmark",
    title: "MCA Registration",
    body: "Registered Limited Liability Partnership under the Ministry of Corporate Affairs, Government of India",
    status: "active",
    statusLabel: "Active",
  },
  {
    icon: "factory",
    title: "MSME Certificate",
    body: "Officially recognised Micro, Small & Medium Enterprise — eligible for government trade incentives",
    status: "active",
    statusLabel: "Active",
  },
  {
    icon: "leaf",
    title: "FSSAI Registration",
    body: "Food Safety and Standards Authority of India — registered to trade food and spice products",
    status: "active",
    statusLabel: "Active",
  },
  {
    icon: "receipt",
    title: "GST Registration",
    body: "Goods & Services Tax registration completed — the business is fully authorised to trade and invoice under GST.",
    status: "active",
    statusLabel: "Active",
    note: "GSTIN: 33AAZFD7884N1ZA",
  },
];
