# Deployment

## Vercel — front Next.js + Payload admin

Payload CMS is **embedded** in the same Next.js app (Payload v3 pattern):
the public site is served from `/`, the admin from `/admin`, and the
REST/GraphQL API from `/api/*`. A single deployment, a single repo.

### One-time setup

1. Create a Vercel team or use an existing one.
2. Import the GitHub repo `StudioCavalli/FoxStudio` from the Vercel dashboard.
3. Framework preset auto-detects as **Next.js**.
4. **Build & development settings** :
   - Build command: `pnpm build`
   - Install command: `pnpm install --frozen-lockfile`
   - Output directory: `.next` (default)
   - Node.js version: `22.x`
5. **Region** : Paris (`cdg1`) — already set in `vercel.json`.
6. **Env vars** : see `.env.example` and the table below.

Once linked, Vercel automatically:
- Deploys `main` to production (`https://foxstudio.fr` once domain is wired).
- Creates a preview deployment for every PR.
- Runs Speed Insights and Web Vitals.

### Required env vars (production)

| Variable | Source | Notes |
|---|---|---|
| `DATABASE_URL` | Vercel Postgres or Neon serverless | Postgres connection string |
| `PAYLOAD_SECRET` | `openssl rand -hex 32` | JWT signing secret |
| `R2_ACCESS_KEY_ID` | Cloudflare R2 dashboard | API token |
| `R2_SECRET_ACCESS_KEY` | Cloudflare R2 dashboard | API token secret |
| `R2_BUCKET` | Cloudflare R2 dashboard | e.g. `foxstudio-media` |
| `R2_ENDPOINT` | Cloudflare R2 dashboard | `https://<account-id>.r2.cloudflarestorage.com` |
| `R2_REGION` | (optional) | Defaults to `auto` |
| `NEXT_PUBLIC_SITE_URL` | Vercel | `https://foxstudio.fr` in prod |

### Domain

- Apex: `foxstudio.fr` → public site
- Admin: `foxstudio.fr/admin` (default). To expose at `studio.foxstudio.fr`,
  add a Vercel domain rewrite: `studio.foxstudio.fr/*` → `foxstudio.fr/admin/*`.
- Optional: `www.foxstudio.fr` → 301 to apex.

---

## Database — Neon (recommended) or Vercel Postgres

### Provisioning

**Neon** (free tier sufficient for J3–J4):
1. Create a project at [console.neon.tech](https://console.neon.tech).
2. Region: `eu-west-1` (Frankfurt) or `eu-central-1` for low EU latency.
3. Copy the connection string (with `?sslmode=require`) to `DATABASE_URL`.

**Vercel Postgres**:
1. Vercel dashboard → Storage → Create Postgres DB.
2. Region matching the front (`cdg1` or nearest).
3. `DATABASE_URL` is auto-injected.

### First run

```bash
# 1. Set DATABASE_URL in .env.local
# 2. Generate & apply schema
pnpm payload:migrate
# 3. Generate TypeScript types from your Payload config
pnpm payload:types
# 4. Generate the admin importMap (after any field component change)
pnpm payload:importmap
# 5. Start the dev server, open /admin, create your first user
pnpm dev
```

---

## Cloudflare R2 — media storage

### Why R2

R2 has zero egress fees and a measurably lower carbon footprint than
S3-standard. With Vercel as the compute layer, R2 keeps the media
side of the carbon budget under control (cf. CDC §6.6).

### Provisioning

1. Cloudflare dashboard → R2 → Create bucket: `foxstudio-media`.
2. Set the bucket access to **Public** (we serve media directly).
3. Settings → API tokens → Create token with R2 read/write on the bucket.
4. Copy the four credentials into Vercel env vars (see table above).

If R2 vars are unset, Payload falls back to writing media in
`public/uploads/` — fine for local dev, **not** for production.

---

## Status

| Item | Status |
|---|---|
| `vercel.json` (regions, headers, cache) | ✅ committed |
| Payload v3 wired into Next | ✅ committed |
| Database adapter (Postgres) configured | ✅ committed |
| R2 storage adapter (conditional) | ✅ committed |
| Vercel project linked to GitHub | ⏳ requires user-side setup |
| Postgres provisioned | ⏳ requires user-side setup |
| R2 bucket provisioned | ⏳ requires user-side setup |
| Domain `foxstudio.fr` wired | ⏳ J6 |
| Speed Insights | ⏳ J6 |
