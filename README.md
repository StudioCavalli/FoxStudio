# FoxStudio

R&D lab of [FoxCase](https://foxcase.fr). Showcase site.

> **Status :** J5 in progress — site complet bilingue FR/EN/IT, CMS Payload branché, SEO + OG + JSON-LD livrés. Audit perf/a11y/Lighthouse à venir.

📖 Specs : [`CAHIER-DES-CHARGES.md`](./CAHIER-DES-CHARGES.md) · J1 deliverables : [`docs/j1/`](./docs/j1/)

---

## Stack

- **Next.js 15** (App Router, Turbopack, typed routes) + **React 19** + **TypeScript 5** strict
- **Tailwind CSS v4** (CSS-first, `@theme` directive)
- **Geist Sans / Geist Mono** (open-source, via `geist` package)
- **Payload CMS v3** embarqué (`/admin`) + **Drizzle** + **Postgres**
- **next-intl 4** — FR · EN · IT
- **Biome 1.9** (lint + format) · **Vitest 2** (unit) · **Playwright 1.59** (E2E)

### Infrastructure

| Service | Rôle |
|---|---|
| **Vercel** (region `cdg1`) | Hosting + CDN + Speed Insights |
| **Neon** (Postgres serverless) | DB Payload — branching natif par PR |
| **Vercel Blob** | Stockage médias Payload |
| **Resend** *(optionnel)* | Emails contact form |

## Setup local

```bash
# Prérequis : Node ≥ 20, pnpm ≥ 10
pnpm install
cp .env.example .env.local      # remplir DATABASE_URL + BLOB_READ_WRITE_TOKEN
pnpm payload:seed               # idempotent : 12 projets + 8 lab + 7 articles + 2 team
pnpm dev
```

Ouvrir [http://localhost:3000](http://localhost:3000) (site) / [http://localhost:3000/admin](http://localhost:3000/admin) (CMS).

→ La même DB Neon est utilisée en local et en Preview/Prod Vercel : pas de divergence de schéma, pas de seed double.

## Variables d'environnement

| Var | Source | Requis |
|---|---|---|
| `DATABASE_URL` | Neon (Vercel injecte auto) | ✅ |
| `POSTGRES_URL_NON_POOLING` | Neon (Vercel injecte auto) — préférée pour Payload | recommandé |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob (auto) | ✅ |
| `PAYLOAD_SECRET` | `openssl rand -hex 32` | ✅ |

`payload.config.ts` lit la connection string dans cet ordre : `POSTGRES_URL_NON_POOLING` → `DATABASE_URL_UNPOOLED` → `DATABASE_URL`. Le non-pooled est préféré car Payload utilise des transactions et prepared statements qui marchent mal avec pgbouncer en transaction-mode.

## Scripts

| Commande | Description |
|---|---|
| `pnpm dev` | Dev server avec Turbopack |
| `pnpm build` | Build de production |
| `pnpm start` | Serve le build |
| `pnpm check` | Biome lint + format check (CI) |
| `pnpm check:fix` | Biome auto-fix |
| `pnpm typecheck` | `tsc --noEmit` |
| `pnpm test` | Vitest unit tests |
| `pnpm test:e2e` | Playwright E2E |
| `pnpm payload:migrate` | Applique les migrations Payload |
| `pnpm payload:types` | Regénère `payload-types.ts` |
| `pnpm payload:seed` | Seed idempotent (projets · lab · journal · team) |

## Structure

```
.
├── app/                          # Next.js App Router
│   ├── (frontend)/[locale]/      # Pages publiques i18n
│   │   ├── page.tsx              # Home
│   │   ├── works/[slug]/         # Projets
│   │   ├── lab/[slug]/           # Expériences R&D
│   │   ├── journal/[slug]/       # Articles
│   │   ├── team/                 # Équipe
│   │   ├── contact/              # Form (Resend)
│   │   ├── legal/                # Mentions · Privacy
│   │   ├── footprint/            # Empreinte carbone
│   │   ├── opengraph-image.tsx   # OG dynamique home
│   │   └── error.tsx             # 500 stylé
│   ├── (payload)/admin/          # CMS Payload
│   ├── icon.svg                  # Favicon (FoxLogo)
│   ├── apple-icon.tsx            # 180×180 iOS
│   ├── sitemap.ts                # Sitemap.xml localisé
│   └── robots.ts                 # Robots.txt
├── cms/
│   ├── collections/              # Projects, LabExperiments, Journal, Team, Pages, Media, Users
│   └── globals/                  # Settings, Navigation
├── components/
│   ├── layout/                   # Header, Footer, FootprintLive
│   ├── ui/                       # Container, ArrowLink, MonoLabel, …
│   ├── visual/                   # FoxLogo, SectionHeader, Marquee, …
│   ├── seo/                      # LdJson (schema.org)
│   └── home/                     # Hero, Index, Teasers
├── lib/
│   ├── data/                     # Fetchers Payload (locale-aware) + mocks
│   ├── seo/schema.ts             # Builders Organization/CreativeWork/Article
│   └── site.ts                   # SITE constants, NAV, LOCALES
├── i18n/                         # next-intl config + locale routing
├── messages/                     # fr.json · en.json · it.json
├── scripts/
│   ├── seed.ts                   # Seed Payload
│   ├── seed-data/                # 12 projets + 8 lab + 7 articles + 2 team
│   └── measure-carbon.ts         # SWD v3 calc (pour CI)
└── docs/
    ├── j1/                       # Cadrage, tone, moodboard, wireframes, style guide
    ├── SETUP-CMS.md
    ├── DEPLOYMENT.md
    └── LOCAL-DEV.md
```

## Design tokens

La source de vérité runtime est [`app/globals.css`](./app/globals.css) (bloc `@theme`).

La source de vérité **design-time** (Figma, exports, doc) est [`docs/j1/tokens/tokens.json`](./docs/j1/tokens/tokens.json) (DTCG-style). Les deux doivent rester alignés ; tout changement passe par le tokens.json puis se répercute dans globals.css.

## Performance budgets (cf. CDC §7.2)

| Métrique | Budget | Statut |
|---|---|---|
| JS Home (gzip) | ≤ 120 ko | **105 kB First Load JS** ✅ |
| CSS Home (gzip) | ≤ 20 ko | À mesurer en J5 |
| LCP (mobile 4G) | < 2.0 s | À mesurer en J5 |
| INP | < 200 ms | À mesurer en J5 |
| CLS | < 0.05 | À mesurer en J5 |
| Empreinte carbone | ≤ 0.20 g CO₂ / vue | Indicateur live en footer ✅ |

L'enforcement automatique en CI (Lighthouse, websitecarbon, axe-core) est planifié dans le milestone J5.

## SEO

- **OG images dynamiques** par route (home, works, journal) — 1200×630 PNG via `next/og`
- **Favicon dual-color** SVG (`prefers-color-scheme`) + apple-touch-icon 180×180
- **JSON-LD** : `Organization`, `WebSite`, `CreativeWork` (projets), `TechArticle` (journal), `BreadcrumbList`
- **Sitemap.xml** localisé (FR/EN/IT) + `robots.txt`
- **Headers sécurité** dans `vercel.json` : HSTS, CSP stricte, COOP, Permissions-Policy

## Contribution

- Tout PR doit passer la CI (lint + typecheck + test + build).
- Conventional commits : `feat:`, `fix:`, `docs:`, `chore:`, `refactor:`, scope optionnel (`feat(home): ...`).
- Pas de merge sur `main` sans review (à activer côté GitHub branch protection).

## Roadmap

| Jalon | Échéance | Issues |
|---|---|---|
| J1 — Cadrage & maquettes | 2026-05-12 | [`milestone/1`](https://github.com/StudioCavalli/FoxStudio/milestone/1) |
| J2 — Setup tech + Home | 2026-06-02 | [`milestone/2`](https://github.com/StudioCavalli/FoxStudio/milestone/2) |
| J3 — Works + Payload | 2026-06-23 | [`milestone/3`](https://github.com/StudioCavalli/FoxStudio/milestone/3) |
| J4 — Lab/Studio/Journal/Contact + i18n | 2026-07-14 | [`milestone/4`](https://github.com/StudioCavalli/FoxStudio/milestone/4) |
| J5 — Perf/éco/a11y/SEO + recette | 2026-07-28 | [`milestone/5`](https://github.com/StudioCavalli/FoxStudio/milestone/5) |
| J6 — Lancement & transfert | 2026-08-04 | [`milestone/6`](https://github.com/StudioCavalli/FoxStudio/milestone/6) |
