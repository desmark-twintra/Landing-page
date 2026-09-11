import { ImageResponse } from "next/og";
import { certifications, company } from "@/content/company";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${company.name} — ${company.tagline}`;

/**
 * The site-wide social card.
 *
 * Built with ImageResponse (satori + resvg, not sharp) so it renders on Vercel
 * without the ignored sharp postinstall. Only flexbox and a CSS subset are
 * supported here — no grid, no custom fonts unless fetched explicitly.
 */
export default function OpengraphImage() {
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
        {/* Eyebrow */}
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
            {company.sector}
          </div>
        </div>

        {/* Wordmark + tagline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 92,
              lineHeight: 1.05,
              letterSpacing: -2,
              color: "#faf6ee",
              fontWeight: 700,
              display: "flex",
            }}
          >
            {company.nameParts.first}
            <span style={{ display: "flex", color: "#e8a13c", marginLeft: 20 }}>
              {company.nameParts.second}
            </span>
          </div>
          <div
            style={{ display: "flex",
              marginTop: 24,
              fontSize: 34,
              color: "rgba(250,246,238,0.66)",
              maxWidth: 820,
              lineHeight: 1.4,
            }}
          >
            {company.tagline} — premium Indian dried red chillies, chilli powder
            and named varieties.
          </div>
        </div>

        {/* Credential row */}
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          {certifications.map((cert) => (
            <div
              key={cert.short}
              style={{
                display: "flex",
                fontSize: 21,
                fontWeight: 600,
                letterSpacing: 1.5,
                color: "rgba(250,246,238,0.82)",
                border: "1px solid rgba(250,246,238,0.22)",
                borderRadius: 999,
                padding: "10px 26px",
              }}
            >
              {cert.short}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
