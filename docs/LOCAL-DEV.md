# Local development — quick start

Boots a complete dev environment in **under a minute**, no SaaS account required.

## Prerequisites

- **Node 20+** (currently tested with 22)
- **pnpm 10+**
- **Docker** + **Docker Compose v2** (for Postgres + MinIO)

## Quick start

```bash
# 1. Install JS deps
pnpm install

# 2. Copy the docker-aware env template
cp .env.docker.example .env.local

# 3. Boot Postgres + MinIO + create the bucket
pnpm services:up

# 4. Push the Payload schema to Postgres + generate TS types
pnpm payload:migrate
pnpm payload:types

# 5. Run Next.js (Payload admin auto-mounted at /admin)
pnpm dev
```

Open :
- [http://localhost:3000](http://localhost:3000) — public site
- [http://localhost:3000/admin](http://localhost:3000/admin) — CMS (first visit creates the admin user)
- [http://localhost:9001](http://localhost:9001) — MinIO console (foxstudio / foxstudio-dev-secret)

## What runs where

| Component | Where | Port | Notes |
|---|---|---|---|
| Next.js dev server | host | 3000 | hot reload, fast |
| Payload admin | host (mounted in Next) | 3000/admin | shares the Next process |
| Postgres 17 | Docker | 5432 | `foxstudio-postgres-data` volume |
| MinIO (S3) | Docker | 9000 (API) + 9001 (console) | `foxstudio-minio-data` volume |
| Bucket `foxstudio-media` | MinIO | — | public-read, created by `minio-init` job |

## pnpm scripts

| Script | What it does |
|---|---|
| `pnpm services:up` | Start Postgres + MinIO + create bucket |
| `pnpm services:down` | Stop services (**keeps data**) |
| `pnpm services:reset` | Stop + delete volumes + restart fresh |
| `pnpm services:logs` | Tail logs of Postgres + MinIO |
| `pnpm services:status` | Show container status |
| `pnpm payload:migrate` | Push schema changes to DB |
| `pnpm payload:types` | Regenerate `payload-types.ts` |
| `pnpm payload:importmap` | Regenerate `app/(payload)/admin/importMap.js` |

## Switching to production-grade services

The dev stack and the prod stack are **API-compatible** — same env var names, same S3 protocol. To migrate to Neon + Cloudflare R2 :

1. Provision Neon + R2 following [`SETUP-CMS.md`](./SETUP-CMS.md) steps 1–3.
2. Replace the values in `.env.local` (or in Vercel project env).
3. Restart the dev server. **No code changes**.

## Troubleshooting

| Symptom | Fix |
|---|---|
| `pnpm services:up` fails on first run | Ensure Docker Desktop is actually running |
| `pnpm payload:migrate` errors with `connection refused` | Wait ~5 s for postgres healthcheck to pass, retry |
| Bucket creation skipped | `pnpm services:reset` — wipes & recreates everything |
| Images uploaded but 403 in browser | The `minio-init` job sets the bucket to `download` (public read). Check `mc anonymous get local/foxstudio-media` |
| `Cannot find module '@/payload-types'` | Run `pnpm payload:types` after schema changes |
| Want a clean DB without losing the bucket | `docker compose stop postgres && docker volume rm foxstudio-postgres-data && pnpm services:up` |

## Storage bridge (MinIO ↔ R2)

The S3 adapter (`@payloadcms/storage-s3`) talks to MinIO and R2 with the **same code path**. The only differences in dev :

- `R2_ENDPOINT=http://localhost:9000` (instead of the Cloudflare URL)
- `R2_REGION=auto` (kept identical for parity)
- Bucket is local (`foxstudio-media` in MinIO) instead of a Cloudflare bucket

URLs returned by Payload follow `${endpoint}/${bucket}/${key}` thanks to `forcePathStyle: true` — same shape locally and in prod.
