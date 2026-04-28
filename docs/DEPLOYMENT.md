# Deployment

## Vercel — front Next.js

### One-time setup

1. Create a Vercel team or use an existing one.
2. Import the GitHub repo `StudioCavalli/FoxStudio` from the Vercel dashboard.
3. Framework preset will auto-detect as **Next.js**.
4. **Build & development settings** :
   - Build command: `pnpm build`
   - Install command: `pnpm install --frozen-lockfile`
   - Output directory: `.next` (default)
   - Node.js version: `22.x`
5. **Region** : Paris (`cdg1`) — already set in `vercel.json`.
6. **Env vars** : à ajouter quand on aura Payload (J3) et Resend (J4).

Once linked, Vercel automatically:
- Deploys `main` branch to production (`https://foxstudio.fr` once domain is wired).
- Creates a preview deployment for every PR.
- Runs Speed Insights and Web Vitals.

### Domain

- Apex: `foxstudio.fr`
- Studio (Payload, J3): `studio.foxstudio.fr`
- Optional: `www.foxstudio.fr` → 301 to apex

### Headers & cache

Headers and cache rules are declared in [`vercel.json`](../vercel.json). Don't duplicate them in `next.config.ts` to keep one source of truth.

---

## Cloudflare R2 — media storage (J3)

To be wired when Payload arrives (issue #34).

---

## Status

| Item | Status |
|---|---|
| `vercel.json` (regions, headers, cache) | ✅ committed |
| Vercel project linked to GitHub | ⏳ requires user-side setup |
| Domain `foxstudio.fr` wired | ⏳ J6 |
| Speed Insights | ⏳ J6 |
| R2 storage for media | ⏳ J3 |
