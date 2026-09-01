import type { Metadata } from "next";
import { Outfit, Ubuntu } from "next/font/google";
import { company, contact } from "@/content/company";
import { SiteHeader } from "@/components/sections/site-header";
import { MobileCtaBar } from "@/components/sections/mobile-cta-bar";
import { DesktopEnquireBar } from "@/components/sections/desktop-enquire-bar";
import { Footer } from "@/components/sections/footer";
import { QuoteProvider } from "@/components/quote/quote-provider";
import { ThemeProvider } from "@/components/theme-provider";
import { ScrollViewportProvider } from "@/components/scroll-viewport-context";
import { AppScrollArea } from "@/components/app-scroll-area";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const ubuntu = Ubuntu({
  variable: "--font-ubuntu",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://desmarktwintra.example"),
  title: {
    default: `${company.name} — ${company.tagline}`,
    template: `%s · ${company.name}`,
  },
  description: company.heroLead,
  keywords: [
    "chilli exporter India",
    "dried red chilli supplier",
    "Teja chilli",
    "Sannam chilli",
    "chilli powder wholesale",
    "agricultural trading LLP",
    "FSSAI registered spice trader",
    "Chennai spice trading",
  ],
  authors: [{ name: company.name }],
  openGraph: {
    type: "website",
    siteName: company.name,
    title: `${company.name} — ${company.tagline}`,
    description: company.heroLead,
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: `${company.name} — ${company.tagline}`,
    description: company.heroLead,
  },
  robots: { index: true, follow: true },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: company.name,
  description: company.heroLead,
  slogan: company.tagline,
  foundingDate: String(company.established),
  email: contact.email,
  telephone: contact.phone,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Chennai",
    addressRegion: "Tamil Nadu",
    addressCountry: "IN",
  },
  knowsAbout: [
    "Dried red chilli",
    "Chilli powder",
    "Teja chilli",
    "Sannam chilli",
    "Agricultural commodity trading",
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      // next-themes stamps the theme class onto <html> before paint, which the
      // server render cannot predict.
      suppressHydrationWarning
      className={`${outfit.variable} ${ubuntu.variable} h-full antialiased`}
    >
      <body className="flex h-full flex-col overflow-hidden bg-surface">
        <script
          type="application/ld+json"
          // Static, author-controlled metadata — no user input reaches this.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />

        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ScrollViewportProvider>
            <QuoteProvider>
              <SiteHeader />
              <AppScrollArea>
                <main className="flex-1">{children}</main>
                <Footer />
              </AppScrollArea>
              <MobileCtaBar />
              <DesktopEnquireBar />
            </QuoteProvider>
          </ScrollViewportProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
