# Setup runbook — Payload CMS

Ce document est la marche à suivre **étape par étape** pour activer le CMS sur ton poste local. Compte ~ 20 minutes la première fois.

> Pré-requis : compte Cloudflare (gratuit), compte Neon (gratuit), Node 20+, pnpm 10+.

---

## Étape 1 — Provisionner Postgres (Neon)

1. Va sur [console.neon.tech](https://console.neon.tech) (créer un compte si besoin).
2. **Create project** :
   - Name : `foxstudio`
   - Postgres version : 17 (ou la plus récente)
   - Region : `eu-central-1 (Frankfurt)` ou `eu-west-1 (Dublin)` — proche de Vercel `cdg1`
   - Database name : `foxstudio`
3. Une fois créé, sur la page **Dashboard** → bouton **Connect** :
   - Copier la **Connection string** (commence par `postgresql://...?sslmode=require`)
4. Garder cet onglet ouvert — on s'en sert dans 5 minutes.

---

## Étape 2 — Provisionner Cloudflare R2

> R2 est facultatif au début. Si tu skip cette étape, Payload écrira les médias dans `public/uploads/` localement. Mais en prod, R2 est requis.

1. Va sur [dash.cloudflare.com](https://dash.cloudflare.com).
2. Menu gauche → **R2 Object Storage** → **Create bucket** :
   - Nom : `foxstudio-media`
   - Location : EU (Europe)
3. Bucket créé → onglet **Settings** :
   - **Public access** → enable (active la lecture publique)
   - Note l'**Account ID** (en haut à droite), il sert pour l'endpoint
4. Menu gauche → **R2** → **Manage R2 API Tokens** → **Create API token** :
   - Token name : `foxstudio-media-rw`
   - Permissions : **Object Read & Write**
   - Specify buckets : `foxstudio-media`
   - TTL : aucun (ou 1 an, ton choix)
   - **Create**
5. Copier les 3 valeurs affichées **immédiatement** (elles ne sont plus visibles ensuite) :
   - **Access Key ID** → `R2_ACCESS_KEY_ID`
   - **Secret Access Key** → `R2_SECRET_ACCESS_KEY`
   - **Endpoint** (jurisdiction-specific endpoint S3) → `R2_ENDPOINT`

---

## Étape 3 — Configurer `.env.local`

À la racine du repo :

```bash
cp .env.example .env.local
```

Édite `.env.local` :

```bash
# Depuis Neon (étape 1)
DATABASE_URL=postgresql://user:pass@ep-xxx.eu-central-1.aws.neon.tech/foxstudio?sslmode=require

# Génère un secret de 32 octets
PAYLOAD_SECRET=$(openssl rand -hex 32)

# Depuis Cloudflare R2 (étape 2)
R2_ACCESS_KEY_ID=<ton access key id>
R2_SECRET_ACCESS_KEY=<ton secret>
R2_BUCKET=foxstudio-media
R2_ENDPOINT=https://<account-id>.r2.cloudflarestorage.com
R2_REGION=auto

NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

> Pour générer le secret : `openssl rand -hex 32` puis copier le résultat.

---

## Étape 4 — Premier setup Payload

```bash
# Crée le schéma DB sur Neon
pnpm payload:migrate

# Génère payload-types.ts depuis ta config
pnpm payload:types

# Génère le importMap (à refaire après tout ajout de field component custom)
pnpm payload:importmap

# Lance le dev server
pnpm dev
```

Ouvre [http://localhost:3000/admin](http://localhost:3000/admin) → l'écran de création du **premier admin** s'affiche. Crée ton compte (ce sera le compte admin global du CMS).

---

## Étape 5 — Test rapide

Une fois loggué :
1. Sidebar → **Projects** → **Create new** :
   - Number : `001`
   - Name (EN) : `Edge inference at 14 ko`
   - Slug : `edge-inference`
   - Year : `2026`
   - Stack → ajouter une ligne `tech: TS`
   - Status : `Live`
   - **Save** puis **Publish**
2. Va sur [http://localhost:3000/works](http://localhost:3000/works) → ton projet remplace les mocks ! 🎉
3. Va sur [http://localhost:3000/works/edge-inference](http://localhost:3000/works/edge-inference) → page projet rendue.

---

## Étape 6 — Production (plus tard)

Quand tu déploieras sur Vercel :

1. Toutes les variables ci-dessus → Vercel **Project Settings → Environment Variables**.
2. Re-run `pnpm payload:migrate` côté CI ou via Vercel build hook.
3. R2 bucket bien public, sinon les images ne s'afficheront pas.

Voir [`DEPLOYMENT.md`](./DEPLOYMENT.md) pour le détail Vercel.

---

## Troubleshooting

| Problème | Solution |
|---|---|
| `pnpm payload:migrate` plante avec `Connection refused` | Vérifie ta `DATABASE_URL`, et que `?sslmode=require` est bien à la fin |
| `/admin` affiche "Cannot find module @payload-config" | Vérifie que `tsconfig.json` a bien `"paths": { "@payload-config": ["./payload.config.ts"] }` |
| Médias ne s'uploadent pas / erreur 403 | R2 token bien actif sur le bon bucket, et `R2_ENDPOINT` au format `https://<account-id>.r2.cloudflarestorage.com` |
| Pages publiques affichent les mocks malgré DATABASE_URL configurée | Pas de projet en `_status: published` dans Payload — pense à cliquer **Publish** (pas que Save) |
| Schéma DB désynchro après modif de collection | `pnpm payload:migrate:create` puis `pnpm payload:migrate` |

---

## Ce que tu **n'as pas** à faire

- Pas besoin de créer le schéma SQL à la main — `pnpm payload:migrate` le fait.
- Pas besoin de créer le bucket avec un policy fancy — la simple config "public" suffit pour servir les médias.
- Pas besoin de configurer CORS sur R2 — Payload tape dessus côté serveur.
