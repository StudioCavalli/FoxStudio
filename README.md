# FoxStudio

R&D lab of [FoxCase](https://foxcase.fr). Showcase site.

> **Status :** J2 baseline — Home shell deployable, no 3D yet, no CMS yet.

📖 Specs: [`CAHIER-DES-CHARGES.md`](./CAHIER-DES-CHARGES.md) · J1 deliverables: [`docs/j1/`](./docs/j1/)

---

## Stack

- **Next.js 15** (App Router, Turbopack, typed routes)
- **React 19**
- **TypeScript 5** (strict, `noUncheckedIndexedAccess`)
- **Tailwind CSS v4** (CSS-first, `@theme` directive)
- **Geist Sans / Geist Mono** (open-source, via `geist` package)
- **Biome 1.9** (lint + format)
- **Vitest 2** (unit tests)
- **Playwright 1.59** (E2E tests, scaffold pending)

Runtime cible : **Bun** (recommandé par le CDC §6.1). Le repo fonctionne avec **pnpm** ou **bun** indifféremment ; la migration `pnpm install` → `bun install` ne demande qu'à régénérer le lockfile.

## Setup local

```bash
# Prérequis : Node ≥ 20, pnpm ≥ 10, Docker + Docker Compose v2
pnpm install
cp .env.docker.example .env.local
pnpm services:up        # Postgres + MinIO en Docker
pnpm payload:migrate
pnpm payload:types
pnpm dev
```

Ouvrir [http://localhost:3000](http://localhost:3000) (site) / [http://localhost:3000/admin](http://localhost:3000/admin) (CMS).

→ Détails et troubleshooting : [`docs/LOCAL-DEV.md`](./docs/LOCAL-DEV.md).
→ Setup Neon + R2 (prod-grade) : [`docs/SETUP-CMS.md`](./docs/SETUP-CMS.md).

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
| `pnpm test:watch` | Vitest watch mode |
| `pnpm test:e2e` | Playwright E2E (à configurer en J5) |

## Structure

```
.
├── app/                 # Next.js App Router
│   ├── layout.tsx       # Root layout (Geist fonts, Header, Footer)
│   ├── page.tsx         # Home
│   └── globals.css      # @import tailwindcss + @theme
├── components/
│   ├── layout/          # Header, Footer
│   ├── ui/              # Container, MonoLabel, ArrowLink
│   └── home/            # Hero, Index, Teasers (Lab/Studio/Journal/Contact)
├── lib/
│   ├── site.ts          # SITE constants, NAV, LOCALES
│   └── data/            # Mocked data (until Payload — J3)
├── tests/unit/          # Vitest
├── docs/
│   ├── j1/              # Cadrage, tone, moodboard, wireframes, style guide
│   └── j1/tokens/       # tokens.json (DTCG) + theme.css spec
└── .github/workflows/
    └── ci.yml           # Lint · Typecheck · Test · Build sur PR
```

## Design tokens

La source de vérité runtime est [`app/globals.css`](./app/globals.css) (bloc `@theme`).

La source de vérité **design-time** (Figma, exports, doc) est [`docs/j1/tokens/tokens.json`](./docs/j1/tokens/tokens.json) (DTCG-style). Les deux doivent rester alignés ; tout changement passe par le tokens.json puis se répercute dans globals.css.

## Performance budgets (cf. CDC §7.2)

| Métrique | Budget | Statut actuel |
|---|---|---|
| JS Home (gzip) | ≤ 120 ko | **105 kB First Load JS** ✅ |
| CSS Home (gzip) | ≤ 20 ko | À mesurer |
| LCP (mobile 4G) | < 2.0 s | À mesurer en J5 |
| INP | < 200 ms | À mesurer en J5 |
| CLS | < 0.05 | À mesurer en J5 |
| Empreinte carbone | ≤ 0.20 g CO₂ / vue | À mesurer en J5 |

L'enforcement automatique en CI (Lighthouse, websitecarbon, axe-core) est planifié dans des issues séparées du milestone J2.

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
