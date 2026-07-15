# Outskirts Saloon

Marketing site for **Outskirts Saloon** — _Everybody's Hometown Bar_ — in Prescott, Arizona.
Static Next.js site, deployed to Cloudflare Pages at [outskirtssaloon.com](https://outskirtssaloon.com).

The signature element is the **signboard hero**, which recreates the bar's physical hand-painted
sign (navy field, white Didone caps, letterspaced tagline). The whole design follows from it.

---

## Stack

- **Next.js 14** (App Router) with **static export** (`output: 'export'` → emits `out/`)
- **TypeScript**
- **Tailwind CSS** — brand tokens are named colors in `tailwind.config.ts`
- Fonts via `next/font/google` (Bodoni Moda + Libre Franklin), self-hosted at build
- No CMS, database, or API routes. All content lives in typed files under `config/`.

---

## Local development

Requires **Node 18.17+** (built and tested on Node 20/22/24).

```bash
npm install
npm run dev        # http://localhost:3000
```

Other scripts:

```bash
npm run build      # production static export → ./out
npm run test       # unit tests for the hours engine (Vitest)
npm run lint       # ESLint (next/core-web-vitals)
npm run gen:images # regenerate OG image + icons (see "Brand assets" below)
```

---

## Project structure

```
app/                 App Router routes + metadata
  page.tsx           /        signboard hero, intro, hours card, fact strip
  events/page.tsx    /events  SkpR calendar embed
  menu/page.tsx      /menu    drinks & bites (driven by config/menu.ts)
  visit/page.tsx     /visit   hours, address, phone, map, socials
  layout.tsx         shared nav + footer, fonts, site-wide metadata
  globals.css        ported design system (single source of truth for hex tokens)
  icon.svg           SVG favicon (O tile)
  favicon.ico        16/32 favicon (generated)
  apple-icon.png     180px apple touch icon (generated)
components/
  Nav.tsx            sticky nav, mobile toggle, active-route highlight (client)
  Footer.tsx         shared footer ("Events powered by SkpR")
  OpenStatus.tsx     live open/closed indicator (client, hydration-safe)
  HoursList.tsx      week hours, today highlighted (client)
  logo/              SignboardLogo, OTile, Badge (inline SVG / HTML)
config/
  site.ts            address, phone, socials, maps, events provider
  hours.ts           the hours table (minutes-from-midnight, spillover) + timezone
  menu.ts            PLACEHOLDER menu — one-file swap
lib/
  hours.ts           open/closed engine (pure, Phoenix-pinned)
  hours.test.ts      unit tests (all four branches + spillover + timezone)
public/
  og.png             Open Graph / Twitter card (generated)
assets/fonts/        committed WOFFs used only to generate brand assets
scripts/
  gen-images.mjs     regenerates og.png, apple-icon.png, favicon.ico
```

---

## The hours engine

`lib/hours.ts` powers the live "Open now / Closed" indicator on `/` and `/visit`.

- **Timezone-correct.** Evaluation is pinned to `America/Phoenix` (Arizona observes no DST), so a
  visitor in any timezone sees the bar's real status — not their own clock.
- **After-midnight spillover.** A day that closes after midnight (Friday → 2 AM) keeps the bar
  "open" during the early hours of the next day. Saturday 12:30 AM correctly reports open.
- **Hydration-safe.** The status renders a neutral placeholder on the server and computes the real
  value in `useEffect`, re-evaluating every 60s. No hydration mismatch.

Edit hours in `config/hours.ts` only. Run `npm run test` after any change.

---

## Brand assets

`app/icon.svg` is hand-authored. The raster assets — `public/og.png`, `app/apple-icon.png`, and
`app/favicon.ico` — are **generated** from the real Bodoni Moda outlines and committed to the repo,
so `next build` never needs to render them.

To regenerate (e.g. after a wordmark tweak):

```bash
npm run gen:images
```

This uses `opentype.js` (glyph outlines → SVG paths) and `sharp` (rasterize), both dev-only.

---

## Deploy — Cloudflare Pages

The domain is already on Cloudflare. Connect the repo as a Pages project with:

| Setting | Value |
|---|---|
| Framework preset | Next.js (Static HTML Export) — or "None" |
| Build command | `next build` |
| Build output directory | `out` |
| Environment variable | `NODE_VERSION` = `20` (or newer) |

`next.config.js` sets `output: 'export'` and `trailingSlash: true`, so every route is emitted as its
own `index.html` and served cleanly by Pages. No server, functions, or adapters are involved.

To preview the production output locally exactly as Pages serves it:

```bash
npm run build
npx serve out       # or any static file server
```

### A note on `npm audit`

`npm audit` flags advisories against Next's **server runtime** (Image Optimizer, RSC request
handling, rewrites). This site is a **static export** — there is no Next.js server at runtime; Pages
serves plain files — so those advisories don't apply to what's deployed. The one "critical" is in a
**dev-only** transitive dependency (Vitest's toolchain) and never ships. We pin the latest patched
`14.2.x`. Don't run `npm audit fix --force` — it would jump major versions and break the build.

---

## What's still placeholder

These are intentionally fake — flagged in the code and (where visible) in the UI:

- **Menu** (`config/menu.ts`) — sample items with `$—` prices. The rust-colored
  "Sample menu — swap for real items & prices" note stays visible until you set `isSample = false`.
  Real prices are **not** invented; swap the whole file when you have the real menu.
- **Social links** (`config/site.ts`) — Facebook/Instagram icons point at `#`. Replace `href: '#'`
  with the real profile URLs. The "Add Outskirts' social links" note on `/visit` is a reminder.

Everything else — hours, address, phone, geography, the SkpR embed — is real.

---

## Deliberately not included

Per scope: no analytics, cookie banner, contact form, newsletter signup, or blog. The `/events`
page has **no** JSON-LD or server-rendered event copy — SkpR owns event SEO by design.
