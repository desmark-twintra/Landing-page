import { certifications, company, contact } from "@/content/company";
import type { Product } from "@/content/products";
import { SITE_URL } from "@/lib/site";

/**
 * Every JSON-LD node the site emits, built from the content layer so the schema
 * can never drift from the copy on the page.
 *
 * Stable `@id`s let nodes reference one another instead of repeating the
 * company details on each page: the Product `brand` and the WebSite `publisher`
 * both point back at ORG_ID.
 */
export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

/** Address lives in the content layer; it was previously duplicated inline. */
const postalAddress = {
  "@type": "PostalAddress",
  addressLocality: "Chennai",
  addressRegion: "Tamil Nadu",
  addressCountry: "IN",
};

/** Both published numbers, reachable as a sales contact point. */
const contactPoint = contact.phones.map((phone) => ({
  "@type": "ContactPoint",
  telephone: `+${phone.href.replace(/^\+/, "")}`,
  email: contact.email,
  contactType: "sales",
  areaServed: "IN",
  availableLanguage: ["en", "ta"],
}));

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": ORG_ID,
  name: company.name,
  legalName: company.name,
  url: SITE_URL,
  description: company.heroLead,
  slogan: company.tagline,
  foundingDate: String(company.established),
  email: contact.email,
  telephone: contact.phone,
  address: postalAddress,
  contactPoint,
  /* GSTIN is the company's government tax registration. */
  taxID: contact.gstin,
  knowsAbout: [
    "Dried red chilli",
    "Chilli powder",
    "Teja chilli",
    "Sannam chilli",
    "Agricultural commodity trading",
  ],
  /* The four active government registrations, as verifiable credentials. */
  hasCredential: certifications
    .filter((cert) => cert.status === "active")
    .map((cert) => ({
      "@type": "EducationalOccupationalCredential",
      credentialCategory: cert.label,
    })),
};

export const webSiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: SITE_URL,
  name: company.name,
  description: company.heroLead,
  inLanguage: "en-IN",
  publisher: { "@id": ORG_ID },
};

/**
 * A product node.
 *
 * Deliberately carries no `offers`: this is a quote-based B2B trader with no
 * published price, and inventing price or availability to win a rich result
 * would be a structured-data violation. `additionalProperty` carries the real
 * grading attributes instead.
 */
export function productJsonLd(product: Product) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${SITE_URL}/products/${product.slug}#product`,
    name: product.name,
    description: product.description,
    image: `${SITE_URL}${product.image}`,
    category: product.category,
    url: `${SITE_URL}/products/${product.slug}`,
    brand: { "@id": ORG_ID },
    additionalProperty: product.attributes.map((attr) => ({
      "@type": "PropertyValue",
      name: attr.label,
      value: attr.value,
    })),
  };
}

/** Home → Products → {product}, matching the real route hierarchy. */
export function breadcrumbJsonLd(product: Product) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Products",
        item: `${SITE_URL}/products`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: product.name,
        item: `${SITE_URL}/products/${product.slug}`,
      },
    ],
  };
}

/** The six traded lines, as an ordered list on /products. */
export function productListJsonLd(products: Product[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Products traded by " + company.name,
    itemListElement: products.map((product, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: product.name,
      url: `${SITE_URL}/products/${product.slug}`,
    })),
  };
}

export const contactPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "@id": `${SITE_URL}/contact#contactpage`,
  url: `${SITE_URL}/contact`,
  name: `Contact ${company.name}`,
  isPartOf: { "@id": WEBSITE_ID },
  about: { "@id": ORG_ID },
  mainEntity: { "@id": ORG_ID },
};

export const aboutPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": `${SITE_URL}/about#aboutpage`,
  url: `${SITE_URL}/about`,
  name: `About ${company.name}`,
  isPartOf: { "@id": WEBSITE_ID },
  about: { "@id": ORG_ID },
};
