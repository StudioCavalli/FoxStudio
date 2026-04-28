# Cahier des charges — FoxStudio

**Version :** 1.0
**Date :** 2026-04-28
**Commanditaire :** FoxCase (agence digitale)
**Produit :** FoxStudio — site vitrine & laboratoire d'innovation
**Contact :** sebastien@sdweb.fr

---

## 1. Contexte & vision

FoxStudio est la filiale **R&D et innovation** de FoxCase. Là où FoxCase délivre des produits digitaux pour ses clients, FoxStudio est le **grindcenter** : un laboratoire interne où l'on conçoit des produits à vocation innovante, où l'on explore les technologies de pointe (IA, 3D temps réel, edge computing, interfaces immersives, etc.) et où l'on prototype ce que l'on pourra proposer demain — au grand public comme aux entreprises.

Le site FoxStudio doit jouer trois rôles :

1. **Vitrine** des innovations produites par le studio (cas d'usage, démos interactives, prototypes).
2. **Carte de visite** auprès des **incubateurs**, fonds, partenaires et talents — il doit donner envie d'embarquer.
3. **Manifeste esthétique** : le site lui-même est une démonstration du niveau technique et créatif du studio. Le contenant doit être à la hauteur du contenu.

> **Principe directeur :** *Show, don't tell.* On ne raconte pas qu'on est innovant — le site, par sa qualité d'exécution, le prouve dès la première seconde.

---

## 2. Objectifs

### Objectifs business
- Décrocher des **rendez-vous incubateurs** (pitch, programme, partenariat).
- Attirer des **talents** (devs, designers, chercheurs) qui veulent travailler sur des sujets pointus.
- Générer des **leads qualifiés** auprès d'entreprises cherchant à innover.

### Objectifs produit
- Un site **mémorable** dès la première visite (effet "wow" volontaire).
- Une navigation **fluide et immersive**, jamais lourde.
- Un site **éco-conçu** et **performant**, malgré son ambition visuelle (cf. §8).

### KPIs cibles (à 6 mois post-lancement)
- Lighthouse Performance ≥ 90 sur mobile
- LCP < 2.0s, INP < 200ms, CLS < 0.05
- Score Ecograder / Website Carbon ≤ **0.20 g CO₂ / vue** (objectif top 10 % web)
- Taux de rebond < 40 %
- ≥ 1 min de durée moyenne de session

---

## 3. Cibles

| Cible | Attente principale | Ce qu'elle doit ressentir |
|---|---|---|
| **Incubateurs / fonds** | Comprendre la valeur, le sérieux, la traction | "Ces gens sont solides, on les rencontre" |
| **Talents tech & créa** | Voir le niveau d'ambition technique | "Je veux bosser ici" |
| **Entreprises / clients** | Identifier des cas d'usage applicables | "Ils peuvent résoudre mon problème" |
| **Communauté tech / presse** | Être surpris, avoir envie de partager | "Faut que je montre ça" |

---

## 4. Direction artistique

### 4.1 Identité visuelle

**Palette stricte : noir & blanc.**
- Pas de couleur d'accent permanente. Couleur autorisée uniquement comme **signal ponctuel** (hover, état actif, projet spécifique) et avec parcimonie.
- Le projet sera décliné en mode clair / mode sombre, **sombre par défaut** (économie d'énergie sur écrans OLED, posture éco-design assumée).

**Typographie :**
- Une **sans-serif technique** pour les titres et l'UI (type *Neue Haas Grotesk*, *Söhne*, *Inter*, *Geist*, ou *PP Neue Montreal*).
- Une **mono** pour les détails techniques (numéros de projet, métadonnées, code) — donne le côté "labo / industrie" de Terminal Industries.
- Échelle typo très contrastée : **gros titres XXL** vs corps de texte petit et dense.

**Grille & layout :**
- Grille apparente (lignes de construction visibles, type CAD / blueprint).
- Numérotation des sections (`01 — INDEX`, `02 — WORKS`, etc.).
- Beaucoup de **vide**. Le luxe, c'est l'espace.

### 4.2 Références — ce qu'on prend de chaque site

| Référence | Ce qu'on en retient |
|---|---|
| [terminal-industries.com](https://terminal-industries.com/) | **Base structurelle.** Rigueur industrielle, grille, typographie monumentale, monochrome assumé, transitions de page ultra-propres, sens du détail dans les micro-interactions. **C'est le squelette.** |
| [landonorris.com](https://landonorris.com/) | **Cinétique & narration.** Scroll narratif, séquences quasi-cinématographiques, transitions entre sections qui racontent une histoire. À reprendre pour les pages projets. |
| [bruno-simon.com](http://bruno-simon.com/) | **Audace technique.** Le 3D temps réel, l'interactivité ludique. **À doser** : pas tout le site en 3D, mais une **scène signature** (hero, ou page `Lab`) qui prouve le niveau technique. |
| [ribbit.dk](https://ribbit.dk/) | **Minimalisme animé.** Maîtrise de l'animation discrète, gestion du temps (rythme), élégance du blanc. La référence du "moins mais mieux". |

> **Synthèse direction artistique :** *Un Terminal Industries dans la rigueur, avec la cinétique d'un Lando Norris, une signature technique à la Bruno Simon, et la retenue d'un Ribbit.*

### 4.3 Animations & interactions

- **Smooth scroll** (Lenis) — fluidité native.
- **Scroll-driven animations** (CSS native `animation-timeline: scroll()` quand supportée, GSAP ScrollTrigger / Motion en fallback).
- **Page transitions** sans rechargement (View Transitions API + fallback).
- **Curseur custom** discret (sans en faire un gadget).
- **Reveal text** sur les titres (split + stagger).
- **Une scène 3D signature** (R3F / Three.js) — sur la home ou la page `Lab`. Modèle low-poly, optimisé, 60 fps mobile.
- **Respect strict de `prefers-reduced-motion`** : mode dégradé propre, pas un site cassé.

---

## 5. Arborescence & contenu

```
/                         → Home (manifeste + scène signature + index des projets)
/works                    → Liste des projets / innovations
/works/[slug]             → Page projet (case study)
/lab                      → Expérimentations en cours, démos techniques, R&D
/studio                   → Qui on est, philosophie, équipe, lien avec FoxCase
/journal                  → Notes, articles, prises de position techniques
/contact                  → Formulaire + canaux (incubateurs / clients / talents séparés)
```

### 5.1 Détail des pages

**Home**
- Hero avec scène signature (3D ou animation lourde mais optimisée).
- Manifeste court : qui est FoxStudio, en 2 phrases.
- Index numéroté des derniers projets.
- Footer riche (contact, liens, mentions, statut éco du site).

**Works / Works[slug]**
- Liste : grille ou liste verticale avec hover qui révèle un visuel.
- Page projet : narration scrollée, médias plein écran, infos techniques (stack, durée, partenaires), résultats mesurés.

**Lab**
- Vitrine des prototypes et expérimentations. Chaque carte doit être **interactive en place** quand c'est possible (mini-démo embarquée).
- Section "WIP" assumée — montre que le studio bouge.

**Studio**
- Manifeste long.
- Lien clair avec FoxCase (filiation, complémentarité).
- Équipe (photos N&B, rôles, courte bio).

**Journal**
- Articles techniques / éditoriaux.
- MDX, code coloré, schémas.

**Contact**
- Trois entrées clairement séparées : *Incubateurs / Partenaires*, *Clients*, *Talents*.
- Formulaire minimal, anti-spam (honeypot + rate-limit), envoi via Resend ou équivalent.

---

## 6. Stack technique (cible 2026)

### 6.1 Socle
- **Next.js 15+** (App Router, React Server Components, PPR, Turbopack en build).
- **React 19** (Actions, `use()`, transitions).
- **TypeScript 5.x** strict.
- **Bun** comme runtime de dev + package manager (rapidité, cohérence).
- **Biome** pour lint + format (remplace ESLint + Prettier — plus rapide, moins de config).

### 6.2 Style & UI
- **Tailwind CSS v4** (moteur Oxide, config CSS-first).
- **Composants accessibles** : Radix Primitives (headless) — pas de lib UI lourde.
- **CVA** (class-variance-authority) pour variantes typées.

### 6.3 Animation & 3D
- **Motion** (anciennement Framer Motion) pour l'UI.
- **GSAP** (avec licence club si nécessaire pour ScrollTrigger / SplitText) pour les séquences scroll complexes.
- **Lenis** pour le smooth scroll.
- **React Three Fiber + Drei + Three.js r170+** pour la 3D.
- Pour le 3D : **modèles glTF + Draco/Meshopt**, textures **KTX2 / Basis**, instancing, frustum culling, niveau de détail (LOD), désactivation hors viewport.

### 6.4 Contenu
- **CMS headless : Payload CMS v3** (auto-hébergé, open source, full TS, Postgres). Choix arrêté pour la cohérence éco-conception, la maîtrise des données et l'absence de dépendance SaaS.
- **MDX** pour le journal (Payload Lexical + rendu MDX côté front).
- **Base de données** : Postgres managé (Vercel Postgres / Neon serverless — cold start optimisé).
- **Médias** : stockage S3-compatible (Cloudflare R2 — pas de frais d'egress, bilan carbone meilleur que S3 standard) avec pipeline d'optimisation côté Payload (sharp) → AVIF/WebP, vidéos en HLS via Mux uniquement si besoin éditorial.

### 6.5 Backend léger
- **Resend** (emails transactionnels).
- **Upstash Redis** (rate-limit formulaire) — *seulement si besoin*.
- **Vercel Analytics** + **Vercel Speed Insights** (RUM Core Web Vitals).
- **Plausible** (analytics respectueux, sans cookie).

### 6.6 Hébergement & CI
- **Vercel** : front Next.js (Edge Network, image optim, Speed Insights, preview par PR).
- **Région primaire** : `cdg1` (Paris) — réduit la latence FR/EU et l'empreinte réseau.
- **Payload CMS** : déployé séparément (Vercel ou Railway) sur `studio.foxstudio.fr`.
- **Compensation / transparence carbone** : Vercel n'étant pas le meilleur élève côté empreinte, on compense par : assets sur **Cloudflare R2** (réseau bas-carbone), CDN edge agressif, et budgets §7.2 stricts pour ne pas creuser l'écart.
- **GitHub Actions** : type-check, lint Biome, tests, build, audit Lighthouse + Website Carbon (`@websitecarbon/api`) + axe-core en CI. Échec si budget dépassé.
- **Preview deployments** sur chaque PR avec comparaison perf vs `main`.

### 6.7 Tests
- **Vitest** (unitaires).
- **Playwright** (E2E + visuels).
- **Storybook 9** uniquement si la librairie de composants justifie son coût (sinon on s'en passe).

---

## 7. Performance & éco-conception

L'éco-conception n'est **pas** une checklist en fin de projet — c'est une contrainte de design dès le début.

### 7.1 Règles de design éco
- **Mode sombre par défaut** (économie d'énergie OLED).
- **Pas d'autoplay vidéo** non sollicité.
- **Pas de carrousel auto** (gourmand, peu utile).
- Charger **uniquement ce qui est visible** (route-level code split, dynamic imports, intersection observer pour les médias).
- **Polices variables** auto-hébergées, sous-réglées (subset latin), `font-display: swap`, ≤ 2 familles.
- **Pas de tracker tiers** non essentiel. Pas de Google Tag Manager. Plausible only.
- **Pas de cookie banner** (parce qu'on n'a pas de cookies à demander).

### 7.2 Budgets de performance (à enforcer en CI)

| Métrique | Budget |
|---|---|
| JS shippé sur la home (gzip) | ≤ 120 ko |
| CSS sur la home (gzip) | ≤ 20 ko |
| Image hero (max) | ≤ 200 ko (AVIF) |
| Total transfert home (1ʳᵉ visite) | ≤ 700 ko |
| LCP (mobile 4G simulée) | < 2.0 s |
| INP | < 200 ms |
| CLS | < 0.05 |
| Score Lighthouse Perf (mobile) | ≥ 90 |
| Bilan carbone (websitecarbon.com) | ≤ 0.20 g CO₂ / vue |

### 7.3 Empreinte carbone visible
- Page **`/footprint`** (ou bloc footer) qui affiche en temps réel le poids de la page courante, l'estimation CO₂, et l'hébergeur (vert si Cloudflare).
- Sert de **preuve** et de **statement** : on assume.

---

## 8. SEO, accessibilité, i18n

### SEO
- Sitemap, robots.txt, balises Open Graph + Twitter Cards générées dynamiquement (`@vercel/og` ou équivalent natif Next).
- Données structurées JSON-LD (`Organization`, `CreativeWork` pour chaque projet, `Article` pour le journal).
- URLs propres, canonicals, hreflang si i18n.

### Accessibilité
- **WCAG 2.2 AA minimum.**
- Contrastes contrôlés (le N&B aide, mais attention aux textes gris).
- Navigation clavier complète, focus visible.
- `prefers-reduced-motion` strictement respecté.
- Tests **axe-core** intégrés en CI.

### i18n
- **FR + EN + IT** dès le lancement.
  - **FR** : marché domestique et institutionnel (incubateurs FR, BPI, French Tech).
  - **EN** : standard international (incubateurs étrangers, talents, presse tech).
  - **IT** : ouverture marché italien (proximité culturelle, écosystème innovation Milan/Turin).
- **`next-intl`** (App Router-first, server-friendly, splitting par locale natif).
- **Routing** : segments de locale (`/fr`, `/en`, `/it`), redirection selon `Accept-Language` à la racine, fallback EN.
- **Contenu CMS** : champs localisés natifs Payload (un seul document par projet, traductions par champ). Workflow éditeur : statut "à traduire" par locale.
- **SEO** : `hreflang` complet entre les trois locales + sitemaps séparés.
- **Budget de traduction** : à prévoir côté commanditaire (FoxCase) — non inclus dans le périmètre dev.

---

## 9. CMS & autonomie éditoriale

L'équipe FoxCase doit pouvoir, **sans dev** :
- Créer / éditer un projet (titre, slug, médias, narration, stack, partenaires, dates, résultats).
- Publier un article de journal (MDX riche).
- Mettre à jour les pages Studio et Contact.
- Réordonner l'index des projets.

→ **Payload Admin** personnalisé, déployé sur sous-domaine `studio.foxstudio.fr`.

**Configuration Payload attendue :**
- Collections : `Projects`, `LabExperiments`, `JournalArticles`, `TeamMembers`, `Pages` (Studio, Contact), `Media`.
- Globals : `Settings` (SEO defaults, contacts, footprint thresholds), `Navigation`.
- **Localisation** activée sur tous les champs textuels (FR / EN / IT).
- **Drafts + Versions** activés (preview avant publication).
- **Live Preview** branché sur le front Next.js.
- **Access control** : rôles `admin`, `editor`, `translator`.
- **Hooks** : revalidation ISR / `revalidateTag` Next.js sur publication.

---

## 10. Sécurité & conformité

- HTTPS strict, HSTS, CSP stricte (script-src en nonce, pas d'`unsafe-inline`).
- Rate-limit sur le formulaire de contact.
- RGPD : pas de cookie hors strict nécessaire, mention légale et politique de confidentialité claires.
- Variables d'env via Vercel/CF, jamais committées. Rotation documentée.
- Dependabot / Renovate activé.

---

## 11. Livrables

1. **Code source** sur GitHub (repo `FoxStudio`, monorepo si CMS auto-hébergé).
2. **Design system** documenté (tokens, composants, guidelines).
3. **Studio CMS** déployé et configuré, avec contenu de seed.
4. **Pipeline CI/CD** complète (tests, lint, audit perf, audit carbone).
5. **Documentation** : `README.md` (setup), `ARCHITECTURE.md` (choix techniques), `CONTRIBUTING.md`, runbook pour les redéploiements et mises à jour CMS.
6. **Passation** : 1 session de transfert (1h) + 30 jours de support correctif post-lancement.

---

## 12. Jalons (proposition — à ajuster avec le prestataire)

| # | Jalon | Durée indicative | Sortie |
|---|---|---|---|
| J1 | Cadrage + maquettes haute-fidélité Home + 1 page projet | 2 sem. | Figma validé |
| J2 | Setup technique, design system, page Home | 3 sem. | Home déployée en preview |
| J3 | Pages Works + page projet + CMS branché | 3 sem. | Parcours principal navigable |
| J4 | Lab + Studio + Journal + Contact + i18n | 3 sem. | Site complet en preview |
| J5 | Optimisation perf / éco / a11y / SEO + recette | 2 sem. | Tous les budgets §7.2 verts |
| J6 | Lancement + transfert | 1 sem. | Mise en prod |

**Total indicatif : ~14 semaines.**

---

## 13. Critères d'acceptation (definition of done)

Le projet est livrable quand **tous** les critères suivants sont remplis :

- [ ] Tous les budgets de performance §7.2 atteints sur **mobile 4G simulée**.
- [ ] Lighthouse Performance / Accessibility / Best Practices / SEO ≥ 90 (mobile).
- [ ] Audit `axe-core` : zéro erreur critique.
- [ ] `prefers-reduced-motion` testé et propre sur toutes les pages animées.
- [ ] Tests E2E Playwright passent (parcours principaux + formulaire contact).
- [ ] Tous les contenus initiaux saisis dans le CMS (≥ 4 projets, ≥ 2 articles journal).
- [ ] FR + EN + IT complets sans trou de traduction (zéro fallback visible en prod).
- [ ] Documentation §11 livrée et relue.
- [ ] Audit carbone ≤ 0.20 g CO₂ / vue sur la home.
- [ ] CSP stricte active en prod, sans erreurs console.
- [ ] Validation visuelle finale par le commanditaire sur les 4 références esthétiques (§4.2).

---

## 14. Hors périmètre (v1)

Pour cadrer ce qui n'est **pas** dans la v1 :

- Espace client / authentifié.
- E-commerce.
- App mobile native.
- Backend métier (au-delà du formulaire de contact).
- Multi-tenant / instances séparées par projet présenté.

Ces sujets pourront faire l'objet d'évolutions ultérieures.

---

## 15. Annexes

- **Brand assets** (logos, typos sous licence) : à fournir par FoxCase au démarrage.
- **Comptes à créer / fournir** : Vercel (front + Postgres ou Neon), Cloudflare R2 (médias), Resend (emails), Plausible (analytics), GitHub org, domaine `foxstudio.fr` + sous-domaine `studio.foxstudio.fr`.
- **Références esthétiques** :
  - https://terminal-industries.com/
  - https://landonorris.com/
  - http://bruno-simon.com/
  - https://ribbit.dk/

---

*Document maintenu par FoxCase. Toute modification doit être versionnée (Git) et datée.*
