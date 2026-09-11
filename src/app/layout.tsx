import type { Metadata } from "next";
import { Outfit, Ubuntu } from "next/font/google";
import { company } from "@/content/company";
import { OG_IMAGE, SITE_URL } from "@/lib/site";
import { organizationJsonLd, webSiteJsonLd } from "@/lib/structured-data";
import { JsonLd } from "@/components/json-ld";
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
  metadataBase: new URL(SITE_URL),
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
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: company.name,
    title: `${company.name} — ${company.tagline}`,
    description: company.heroLead,
    locale: "en_IN",
    url: "/",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: `${company.name} — ${company.tagline}`,
    description: company.heroLead,
    images: [OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  /* Set NEXT_PUBLIC_GSC_VERIFICATION in Vercel once Search Console is claimed;
     unset, the field is omitted rather than emitting an empty meta tag. */
  ...(process.env.NEXT_PUBLIC_GSC_VERIFICATION
    ? { verification: { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION } }
    : {}),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-IN"
      data-scroll-behavior="smooth"
      // next-themes stamps the theme class onto <html> before paint, which the
      // server render cannot predict.
      suppressHydrationWarning
      className={`${outfit.variable} ${ubuntu.variable} h-full antialiased`}
    >
      <head>
        {/*
          Decide the hero intro before anything paints.

          The server cannot know whether this visitor has already seen the
          intro, so it emits the settled hero with the copy visible — that is
          what keeps the `h1` readable without scripts. But the browser paints
          that HTML as soon as it arrives, long before React hydrates, so
          hiding the copy from a layout effect still let it flash on screen.

          This runs synchronously in `<head>`, before `<body>` is parsed, and
          stamps the decision onto `<html>`. The rule in globals.css keyed to
          `[data-hero-intro="run"]` then hides the copy in the very first paint.
          Same technique next-themes uses to avoid a theme flash.
        */}
        <script
          // No user input reaches this; it reads sessionStorage and a media
          // query, and writes one attribute.
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var p=sessionStorage.getItem('dt-hero-intro-played-v2')==='1';var m=window.matchMedia('(prefers-reduced-motion: reduce)').matches;if(!p&&!m){var d=document.documentElement;d.setAttribute('data-hero-intro','run');d.setAttribute('data-hero-pile-hidden','')}}catch(e){}})()`,
          }}
        />
      </head>
      <body className="flex h-full flex-col overflow-hidden bg-surface">
        <JsonLd data={[organizationJsonLd, webSiteJsonLd]} />

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
