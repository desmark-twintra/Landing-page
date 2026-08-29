# Desmark Twintra

Company site for **Desmark Twintra LLP** — an Indian agricultural trading LLP specialising in chillies and chilli variants.

Built with Next.js 16 (App Router, Turbopack), React 19, Tailwind CSS v4, TypeScript, and **bun** for package management.

## Getting started

```bash
bun install
bun dev        # http://localhost:3000
bun run build  # production build
bun run lint   # eslint
```

## Structure

```
src/
  app/
    page.tsx                  Landing page — all sections, anchor navigation
    layout.tsx                Fonts, metadata, JSON-LD, header/footer, quote provider
    not-found.tsx             Custom 404 on the violet hero surface
    products/[slug]/page.tsx  Per-product detail (statically generated)
    api/quote/route.ts        Enquiry endpoint — validates and logs (see below)

  content/                    ALL COPY LIVES HERE — edit text without touching JSX
    company.ts                Name, tagline, contact details, certifications, nav, about
    products.ts               6 product lines + shared trade terms
    journey.ts                3-phase roadmap
    why.ts                    "Why Choose Us" cards
    vision-mission.ts         Vision & Mission
    compliance.ts             MCA / MSME / FSSAI / GST credentials

  components/
    ui/                       Container, Section, SectionHeading, Button, Badge,
                              BrandMark, Reveal (scroll-in wrapper)
    sections/                 One file per page section
    quote/                    Enquiry form, quote drawer, provider, trigger button

  lib/
    schemas.ts                Single zod schema for the enquiry payload
    enquiry.ts                Client-side submit entry point
    utils.ts                  cn() class merger
```

## Editing content

Nearly every visible string is in `src/content/`. Changing a product name, adding a
certification, or rewording a phase only means editing one of those files.

Two conventions worth knowing:

- **Line breaks in titles** — a `\n` in a `title` field renders as a deliberate line break.
- **Highlighted phrases** — wrapping text in `{{double braces}}` in `company.ts`
  renders it with the chilli-red underline treatment.

## Design system

Brand palette carried over from the original company profile, defined as Tailwind v4
tokens in `src/app/globals.css`:

| Token | Value | Use |
| --- | --- | --- |
| `cream` | `#FAF6EE` | page background |
| `forest` / `forest-mid` / `forest-light` | `#1B3A2D` / `#2D5A3F` / `#4A8C60` | headings, dark sections, active states |
| `chilli` / `chilli-warm` | `#C0392B` / `#E05F3A` | primary accent, CTAs |
| `amber` / `gold` | `#D4880A` / `#B8922A` | pending badges |
| `violet-*` | ramp | **hero surface only** |

Fonts: **Outfit** (body + display) + **Ubuntu** (loaded, not yet a default role), self-hosted via `next/font`.

All section artwork is layered CSS gradients — there are no image requests, so nothing
blocks first paint. Product gradients live on each product in `content/products.ts`.

Every animation is gated behind `prefers-reduced-motion`.

## Wiring up the contact form

The enquiry UI is complete and works end to end today. Only delivery is stubbed.

**One file to change:** [`src/app/api/quote/route.ts`](src/app/api/quote/route.ts).
It already validates the payload with the shared zod schema, absorbs honeypot
submissions, and returns `{ ok: true }`. A marked `TODO:` block shows exactly where to
add email (Resend/Nodemailer), a CRM push, or a database insert.

Read credentials from environment variables — put them in `.env.local` (git-ignored)
and never inline them. Return `{ ok: false }` with a 502 if delivery fails; the form
already surfaces the error message and lets the user retry.

Nothing in the UI layer needs to change: both the contact form and the quote drawer go
through `submitEnquiry()` in `src/lib/enquiry.ts`, which posts to that one route.

## Notes

- **No logo asset yet** — the original profile only had an upload placeholder, so
  `BrandMark` renders a typographic `D` lockup. Drop a real file in and swap that
  component when one exists.
- **Website field** is `null` in `content/company.ts` and shows as "Coming soon";
  set it to the live domain once there is one.
- **`metadataBase`** in `layout.tsx` is a placeholder — set it to the real domain
  before deploying so OpenGraph URLs resolve correctly.
