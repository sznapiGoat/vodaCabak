# CLAUDE.md

Marketing one-pager for **Vodo-Topo Čabák** — Štěpán Čabák, a plumber and
heating technician in Vsetín, Czech Republic. All customer-facing copy is in
**Czech**; keep it that way (formal but friendly first-person voice — the
tradesman speaks: "ozvu se", "pracuji čistě").

## Stack

- Next.js 14 (App Router, single route `app/page.tsx`), React 18, TypeScript
- Tailwind CSS 3 with a custom theme in `tailwind.config.ts`
- framer-motion for animations, lucide-react for icons
- shadcn-style primitives in `components/ui/` (button, card, dialog, input, label)
- No backend: the inquiry form (`configurator.tsx`) opens a prefilled `mailto:`

## Commands

- `npm run dev` — dev server
- `npm run build` — production build (use this to validate changes)
- `npx tsc --noEmit` — typecheck

## Architecture

`app/page.tsx` stacks the sections in order; each lives in `components/site/`:
navbar → hero → services → before-after → gallery → process → configurator
(3-step inquiry wizard) → contact → footer. All are client components.

Section anchor ids are Czech and referenced by the navbar and buttons:
`#sluzby`, `#realizace`, `#galerie`, `#postup`, `#poptavka`, `#kontakt`.
A fixed 68px navbar is compensated by `scroll-padding-top` in `globals.css` —
keep those in sync if the navbar height changes.

## Design system

Dark-only theme. The core visual idea is a **water vs. heat** duality:

- `water` (cyan `#06b6d4`) = plumbing, `heat` (orange `#f97316`) = heating.
  Components take an `accent: "water" | "heat"` prop/field and alternate.
- Surfaces: `base` (page bg), `panel` (cards), `edge` (borders) — defined in
  `tailwind.config.ts` along with `shadow-glow-water/heat`, `rounded-xl2`,
  and the `mesh-water`/`mesh-heat` hero blob animations.
- Fonts: Space Grotesk (`font-display`, headings) + Inter (`font-sans`).
- Motion: framer-motion `whileInView` reveals with ease `[0.16, 1, 0.3, 1]`;
  respect `useReducedMotion` / the `prefers-reduced-motion` block in
  `globals.css` for anything animated.

## Content and data

- Real photos live in `public/realizace/*.jpeg` and are mapped with Czech
  captions in `gallery.tsx`. Don't invent projects or photos.
- The before/after slider currently shows two **different** jobs (see TODO in
  `before-after.tsx`) — swap in a real matched pair when available.
- Contact facts (phone +420 731 200 845, e-mail vodotopo-cabak@seznam.cz,
  address Horní Jasenka 175, Vsetín) appear in navbar, hero, configurator,
  contact, footer, and the JSON-LD in `app/layout.tsx` — update all of them
  together.
- SEO: LocalBusiness (`Plumber`) JSON-LD sits in `app/layout.tsx`; the site
  URL `https://voda-cabak.vercel.app` is hardcoded in `app/layout.tsx`
  (metadataBase + JSON-LD), `app/robots.ts`, and `app/sitemap.ts` — if a
  custom domain is added later, update all three files.

## Conventions

- No external requests at runtime (fonts are self-hosted via `next/font`;
  the contact "map" is a stylized CSS panel, not an embed) — keep it that way.
- Plain `<img>` is used instead of `next/image` throughout; if you migrate,
  migrate consistently.
- Czech diacritics matter — check copy carefully (Čabák, poptávka, tlaková
  zkouška).
