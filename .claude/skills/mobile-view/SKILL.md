---
name: mobile-view
description: Audit mobile/tablet/desktop responsiveness in the Desmark Twintra Next.js site after any frontend or UI change. Use after editing files under src/app, src/components (especially src/components/ui or src/components/sections), or src/app/globals.css — anything touching JSX/Tailwind classes, layout, spacing, grids, or new interactive/visual elements. Checks changed files for fixed-pixel widths without sm:/md:/lg: overrides, hard-coded grids/flex without responsive variants, touch target sizing, and overflow risk at 320-375px, then spot-checks the dev server at phone/tablet/desktop widths against this repo's Container/Section conventions.
---

# mobile-view

Verifies that a frontend change in this repo (Next.js 16 App Router + Tailwind v4,
no `tailwind.config.js` — breakpoints are the framework defaults: `sm`=640,
`md`=768, `lg`=1024, `xl`=1280) still works at mobile, tablet, and desktop widths.

## 1. Identify what changed

- If this is a git repo with a working diff, use it to list changed files.
- Otherwise, list recently modified files under `src/app/`, `src/components/`,
  and `src/app/globals.css` (check mtimes) and treat those as "changed."
- Only audit files actually touched — do not re-audit the whole app each time.

## 2. Static-analysis checklist (per changed file)

Read each changed file and check for:

- **Fixed pixel widths/heights without a responsive override**: a literal
  `w-[Npx]`, `min-w-[Npx]`, or inline `style={{ width: N }}` that has no
  `sm:`/`md:`/`lg:` variant and is NOT inside a wrapper already gated by
  `hidden lg:block` / `md:hidden` etc. (Gated fixed-size elements — like this
  repo's `OrbitVisual`, which only renders at `lg:` and up — are not a
  concern; ungated ones on components that render at all widths are.)
- **New grid/flex layouts without responsive variants**: a new `grid-cols-N`
  or side-by-side `flex` row that lacks a mobile-first fallback (compare
  against this repo's own pattern: `grid gap-N sm:grid-cols-2
  lg:grid-cols-3/4`, or `flex-col lg:flex-row`).
- **Touch target sizing on new interactive elements**: new buttons/links
  meant to be tapped should be roughly `size-10`/40px or larger (this repo's
  existing floor for icon buttons); flag anything smaller with no
  `sm:`/`lg:`-gated exception.
- **New images/media**: confirm `next/image` usage or an `aspect-*` +
  `w-full` treatment (this repo's convention — see `ProductCard`,
  `VisionMission`'s artwork panel) rather than a fixed pixel box.
- **New fixed/absolute-positioned elements**: anything with `absolute` or
  `fixed` and an explicit offset/width should be checked against its nearest
  ancestor with `overflow-hidden` (or add one) so it cannot bleed past a
  320px viewport — this repo already does this consistently (`isolate
  overflow-hidden` on hero/dark sections).
- **Fluid geometry mixed with fixed-size text/icons** (e.g. `orbit-visual.tsx`'s
  `--orbit-d`-ratio system): when a layout scales every dimension as a ratio
  of one CSS variable but a child's font-size or icon is `clamp()`-floored
  (stops shrinking below some px value), the ratio-based gaps around that
  child shrink faster than the child itself as the variable gets small —
  eventually the fixed-size content collides with a sibling that looked
  clear at desktop size. This is easy to miss because it only breaks once the
  variable drops below the point where the floor binds, and if the layout
  also animates independently-timed motion (e.g. two counter-rotating rings),
  the collision is intermittent rather than present in every static frame.
  For any such component, check the smallest size the ratio can actually
  reach (walk its breakpoint `clamp()`/`min()`/`max()` chain down to the
  narrowest+shortest realistic viewport) and confirm the fixed-size element's
  own box, plus its ratio-based offset, still clears its neighbors at that
  floor — don't just eyeball one frame at one width.
- For any row combining a flexible input and a fixed-width sibling (this
  repo's pattern: `flex-1` input + `w-32 shrink-0` select, as in
  `enquiry-form.tsx`), do the arithmetic: does
  `(narrowest realistic container width) − (fixed sibling width + gaps)`
  leave a usable, non-negative width for the flexible sibling at 320px?
  State the numbers, don't just eyeball it.

## 3. Cross-check against this project's three tiers

Map every finding to the breakpoint convention already established here:

- **Mobile** — below `sm` (<640px)
- **Tablet** — `sm` to `lg` (640–1023px), i.e. where `sm:` classes are live
  but `lg:` ones are not
- **Desktop** — `lg` and up (≥1024px)

Judge each changed component against whichever tier(s) it actually renders in
(e.g. an element inside `hidden lg:block` only needs the desktop tier
checked).

## 4. Live spot-check

Launch the app for a real look (prefer this repo's `run` skill if present;
otherwise `bun dev`), then for each changed page/section check three widths:

- ~375px (phone)
- ~820px (tablet portrait)
- ~1280px (desktop)

Look for: horizontal scrollbars, clipped/cropped text (especially near
container edges or inside `overflow-hidden` wrappers), overlapping elements,
and cramped touch targets.

## 5. Report format

End with a short pass/fail table, one line per changed component:

    | Component                | Mobile | Tablet | Desktop | Notes |
    |---------------------------|--------|--------|---------|-------|
    | src/components/.../x.tsx  | PASS   | PASS   | PASS    | —     |
    | src/components/.../y.tsx  | FAIL   | PASS   | PASS    | <what and the minimal Tailwind class fix> |

For any FAIL, propose the **minimal Tailwind responsive-class fix** (add/adjust
`sm:`/`md:`/`lg:` utilities) rather than a structural rewrite, consistent with
how the rest of this codebase is built.
