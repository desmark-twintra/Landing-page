import { ImageResponse } from "next/og";
import { company } from "@/content/company";
import { getProduct, products } from "@/content/products";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/* Prerender one card per product alongside the pages themselves. */
export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateImageMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  return [
    {
      id: "og",
      size,
      contentType,
      alt: product ? `${product.name} — ${company.name}` : company.name,
    },
  ];
}

/** Per-product social card, so a shared product link previews that product. */
export default async function ProductOpengraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#1c1815",
          backgroundImage:
            "radial-gradient(ellipse 55% 60% at 12% 8%, rgba(192,57,43,0.38) 0%, transparent 60%), radial-gradient(ellipse 60% 55% at 92% 92%, rgba(184,146,42,0.26) 0%, transparent 62%)",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ display: "flex", width: 44, height: 3, backgroundColor: "#e8a13c" }} />
          <div
            style={{ display: "flex",
              fontSize: 22,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#e8a13c",
              fontWeight: 600,
            }}
          >
            {product?.category ?? "Products"}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{ display: "flex",
              fontSize: 88,
              lineHeight: 1.05,
              letterSpacing: -2,
              color: "#faf6ee",
              fontWeight: 700,
            }}
          >
            {product?.name ?? "Product"}
          </div>
          <div
            style={{ display: "flex",
              marginTop: 24,
              fontSize: 31,
              color: "rgba(250,246,238,0.66)",
              maxWidth: 900,
              lineHeight: 1.45,
            }}
          >
            {product?.summary ?? ""}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 25,
            color: "rgba(250,246,238,0.8)",
            fontWeight: 600,
            letterSpacing: 0.5,
          }}
        >
          {company.name}
        </div>
      </div>
    ),
    size,
  );
}
