export const visionMissionIntro = {
  label: "Who We Are Built To Be",
  title: "Our Vision & Mission",
};

export type Pillar = {
  key: "vision" | "mission";
  kind: string;
  title: string;
  body: string;
  /** Gradient artwork used where the original profile had an image slot. */
  gradient: string;
  /** Optional real photograph, dropped in later without touching the component. */
  image?: string;
};

export const pillars: Pillar[] = [
  {
    key: "vision",
    kind: "Vision",
    title: "To Be India's Most Trusted Agricultural Trade Partner",
    body: "To establish Desmark Twintra LLP as a globally recognised name in agricultural commodity trading — known for integrity, quality, and the ability to seamlessly connect Indian farmlands to international markets. We envision a future where every shipment we handle reflects the pride of Indian agriculture and the trust of our partners worldwide.",
    gradient:
      "radial-gradient(ellipse 62% 55% at 28% 30%, rgba(122,86,220,0.45) 0%, transparent 60%), radial-gradient(ellipse 55% 48% at 78% 62%, rgba(196,140,72,0.34) 0%, transparent 58%), radial-gradient(ellipse 48% 44% at 54% 80%, rgba(74,140,96,0.32) 0%, transparent 56%), linear-gradient(148deg,#1b1240 0%,#2c1c5c 30%,#33324f 58%,#1d3630 82%,#12241d 100%)",
    image: "/vision-mission/vision.png",
  },
  {
    key: "mission",
    kind: "Mission",
    title: "Delivering Quality. Building Trust. Connecting Markets.",
    body: "Our mission is to build a compliant, quality-driven agricultural trading enterprise that serves both domestic and international buyers with consistency and reliability. We are committed to sourcing the finest Indian chillies and spices, maintaining the highest food safety standards, and creating lasting partnerships rooted in transparency — trade beyond mere transactions.",
    gradient:
      "radial-gradient(ellipse 60% 52% at 32% 34%, rgba(224,95,58,0.42) 0%, transparent 58%), radial-gradient(ellipse 52% 46% at 76% 30%, rgba(212,136,10,0.34) 0%, transparent 56%), radial-gradient(ellipse 58% 50% at 50% 84%, rgba(45,90,63,0.5) 0%, transparent 60%), linear-gradient(150deg,#3a1108 0%,#5c2412 26%,#3f3a1c 52%,#1f4230 78%,#122a1f 100%)",
    image: "/vision-mission/mission.png",
  },
];
