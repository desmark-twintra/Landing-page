import type { MetadataRoute } from "next";
import { products } from "@/content/products";
import { SITE_URL } from "@/lib/site";

/**
 * The ten indexable URLs. Product entries are derived from the same `products`
 * array that drives `generateStaticParams`, so a new line added to the content
 * layer appears here without touching this file.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    { url: SITE_URL, lastModified, changeFrequency: "monthly", priority: 1 },
    {
      url: `${SITE_URL}/products`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.7,
    },
    ...products.map((product) => ({
      url: `${SITE_URL}/products/${product.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
      images: [`${SITE_URL}${product.image}`],
    })),
  ];
}
