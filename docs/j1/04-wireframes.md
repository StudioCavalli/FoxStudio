# 04 — Wireframes basse fidélité

**Statut :** Draft v1 — à valider avec FoxCase
**Issue GitHub :** #4
**Format :** Markdown + ASCII. Les hi-fi Figma seront construits à partir de ce document.

> Convention ASCII utilisée :
> - `╔══╗ ╚══╝` = blocs principaux (sections)
> - `┌──┐ └──┘` = sous-blocs (cards, modules)
> - `▸` = flèche / CTA
> - `[01]` = label numéroté
> - `····` = scroll-driven content / continue below
> - `[ALT]` = image / média
> - `[3D]` = scène 3D R3F

---

## Index des pages

| # | Route | Doc |
|---|---|---|
| 1 | `/` (Home) | §1 |
| 2 | `/works` | §2 |
| 3 | `/works/[slug]` | §3 |
| 4 | `/lab` | §4 |
| 5 | `/studio` | §5 |
| 6 | `/journal` | §6 |
| 7 | `/journal/[slug]` | §7 |
| 8 | `/contact` | §8 |
| — | Header + Footer (transverses) | §9 |

---

## §1 — Home `/`

**Objectif :** convertir un visiteur en 90 secondes — il doit comprendre qui on est, voir une preuve technique forte, et savoir où cliquer ensuite.

**Sections (du haut vers le bas) :**

```
╔════════════════════════════════════════════════════════════════╗
║  HEADER (sticky, transparent → solid au scroll)                ║
╠════════════════════════════════════════════════════════════════╣
║  [00 ▸ MANIFESTO]                                              ║
║                                                                ║
║          FOXSTUDIO                                             ║
║          IS THE R&D LAB                                        ║
║          OF FOXCASE.                                           ║
║                                                                ║
║          ┌──────────────────────────────────┐                  ║
║          │                                  │                  ║
║          │            [3D]                  │                  ║
║          │     scène signature R3F          │                  ║
║          │   (objet abstrait monochrome,    │                  ║
║          │    réagit à la souris/scroll)    │                  ║
║          │                                  │                  ║
║          └──────────────────────────────────┘                  ║
║                                                                ║
║          We build what we wish existed.                        ║
║          We break what we don't understand.                    ║
║          We publish what holds up.                             ║
║                                                                ║
║          ▸ Scroll to explore        Paris · 14:32 · GMT+1     ║
╠════════════════════════════════════════════════════════════════╣
║  [01 ▸ INDEX]                       Latest works              ║
║                                                                ║
║  ──────────────────────────────────────────────────────────    ║
║   001  PROJECT NAME              ◯  2026 ▸  Stack: TS, R3F    ║
║   002  PROJECT NAME              ◯  2026 ▸  Stack: Rust, ML   ║
║   003  PROJECT NAME              ◯  2025 ▸  Stack: Edge, AI   ║
║   004  PROJECT NAME              ◯  2025 ▸  Stack: WebGPU     ║
║  ──────────────────────────────────────────────────────────    ║
║                                       [view all ▸ /works]      ║
║                                                                ║
║  Hover sur ligne → image preview prend tout le viewport        ║
║  derrière la liste (révélation subtile).                       ║
╠════════════════════════════════════════════════════════════════╣
║  [02 ▸ LAB]                         Live experiments           ║
║                                                                ║
║  ┌────────────────┐ ┌────────────────┐ ┌────────────────┐     ║
║  │  [ALT loop]    │ │  [ALT loop]    │ │  [ALT loop]    │     ║
║  │                │ │                │ │                │     ║
║  │  exp_004       │ │  exp_005       │ │  exp_006       │     ║
║  │  WebGPU shader │ │  Edge AI       │ │  Haptic UI     │     ║
║  │  ◉ live        │ │  ◉ live        │ │  ◉ wip         │     ║
║  └────────────────┘ └────────────────┘ └────────────────┘     ║
║                                       [enter the lab ▸ /lab]   ║
╠════════════════════════════════════════════════════════════════╣
║  [03 ▸ STUDIO]                      Who we are                 ║
║                                                                ║
║  Manifeste long en 2-3 paragraphes (extrait de tone-of-voice). ║
║  Lien vers /studio.                                            ║
╠════════════════════════════════════════════════════════════════╣
║  [04 ▸ JOURNAL]                     Latest notes               ║
║                                                                ║
║  3 derniers articles (titre + date + reading time + tag)       ║
║                                       [all notes ▸ /journal]   ║
╠════════════════════════════════════════════════════════════════╣
║  [05 ▸ TALK TO US]                                             ║
║                                                                ║
║  3 portes :                                                    ║
║    ▸ Incubators & investors                                    ║
║    ▸ Companies & projects                                      ║
║    ▸ Talents                                                   ║
╠════════════════════════════════════════════════════════════════╣
║  FOOTER                                                        ║
╚════════════════════════════════════════════════════════════════╝
```

**Comportements clés :**
- Hero sans scroll = manifeste lisible et 3D visible. **LCP = le manifeste**, pas la 3D (la 3D charge en progressive enhancement).
- Index [01] : hover sur une ligne change le visuel de fond (style Lando Norris hover-variant).
- [02 LAB] : chaque card est un mini-loop vidéo silencieux ou une mini-démo embarquée (lazy-loaded).
- Switch locale FR/EN/IT dans header.

**Mobile :**
- Hero : manifeste d'abord, 3D en dessous (ou désactivée → image fallback statique).
- Index : liste verticale simple, pas de hover (image preview au tap).
- Lab cards : carousel horizontal scrollable.

---

## §2 — Works `/works`

**Objectif :** lister tous les projets de manière scannable, permettre filtre rapide.

```
╔════════════════════════════════════════════════════════════════╗
║  HEADER                                                        ║
╠════════════════════════════════════════════════════════════════╣
║  /works                                                        ║
║                                                                ║
║   12 PROJECTS  ·  2024–2026  ·  filter: [all] [3D] [AI] [edge] ║
║                                                                ║
║  ──────────────────────────────────────────────────────────    ║
║   001    PROJECT NAME ALPHA            2026 · TS, R3F      ▸  ║
║          One-line description                                  ║
║   002    PROJECT NAME BETA             2026 · Rust, ML     ▸  ║
║          One-line description                                  ║
║   003    PROJECT NAME GAMMA            2025 · Edge, AI     ▸  ║
║          One-line description                                  ║
║   ...                                                          ║
║  ──────────────────────────────────────────────────────────    ║
║                                                                ║
║  [Plein viewport en arrière-plan : image preview du projet     ║
║   actuellement hover. Transitionne au mouvement souris.]       ║
╠════════════════════════════════════════════════════════════════╣
║  FOOTER                                                        ║
╚════════════════════════════════════════════════════════════════╝
```

**Comportements :**
- Liste verticale dense (style Terminal / Ribbit).
- Hover ligne → image fond change. Click → page projet.
- Filtres : URL-driven (`?tag=ai`), pas modal.

**Mobile :**
- Pas d'image fond hover. Liste avec petite vignette inline à droite.

---

## §3 — Project page `/works/[slug]`

**Objectif :** narration immersive d'un projet. C'est la pièce maîtresse pour les incubateurs.

```
╔════════════════════════════════════════════════════════════════╗
║  HEADER (peut devenir transparent sur cette page)              ║
╠════════════════════════════════════════════════════════════════╣
║  PLEIN VIEWPORT — HERO PROJET                                  ║
║                                                                ║
║   001 — PROJECT NAME                                           ║
║                                                                ║
║   [ALT — image hero plein écran ou vidéo silencieuse loop]    ║
║                                                                ║
║   ▾ scroll                                                     ║
╠════════════════════════════════════════════════════════════════╣
║  ACTE 1 — CONTEXT                                              ║
║                                                                ║
║   ┌─ META (sticky left col) ──┐  ┌─ BODY ──────────────────┐  ║
║   │ Year       2026           │  │ "4200 users in beta.    │  ║
║   │ Duration   3 mo           │  │  12 ko of JS.           │  ║
║   │ Stack      TS, R3F, Rust  │  │  No framework."         │  ║
║   │ Partners   X, Y           │  │                         │  ║
║   │ Role       R&D + design   │  │ Long-form context...    │  ║
║   └───────────────────────────┘  └─────────────────────────┘  ║
╠════════════════════════════════════════════════════════════════╣
║  ACTE 2 — APPROACH                                             ║
║                                                                ║
║   [Texte + visuels alternés, pin scroll-driven sur visuels]   ║
║                                                                ║
║   ┌────────────────────────────────────────────────────┐      ║
║   │ [ALT — capture / diagramme / vidéo démo]           │      ║
║   └────────────────────────────────────────────────────┘      ║
║                                                                ║
║   Texte qui révèle au scroll (split + stagger)                 ║
╠════════════════════════════════════════════════════════════════╣
║  ACTE 3 — RESULTS                                              ║
║                                                                ║
║   ┌──────┐ ┌──────┐ ┌──────┐                                   ║
║   │ 4200 │ │  12k │ │ 0.18 │                                   ║
║   │users │ │ JS   │ │ gCO₂ │   (compteurs animés au scroll)    ║
║   └──────┘ └──────┘ └──────┘                                   ║
║                                                                ║
║   "What we'd do differently" — paragraphe d'humilité          ║
╠════════════════════════════════════════════════════════════════╣
║  NEXT PROJECT                                                  ║
║                                                                ║
║   002 — NEXT PROJECT NAME                                  ▸   ║
║   [Image preview du suivant]                                   ║
╠════════════════════════════════════════════════════════════════╣
║  FOOTER                                                        ║
╚════════════════════════════════════════════════════════════════╝
```

**Comportements :**
- Page = narration en 3 actes (Context, Approach, Results). Variantes selon types (court/long, image-heavy/text-heavy).
- Compteurs animés sur les chiffres clés (style Terminal).
- "Next project" inline en fin de page (pas de page séparée pour la suite).
- JSON-LD `CreativeWork` injecté.

**Mobile :**
- Pas de sticky meta column, meta en haut de chaque acte.
- Visuels et textes en flux unique.

---

## §4 — Lab `/lab`

**Objectif :** vitrine des prototypes en cours, démos en place.

```
╔════════════════════════════════════════════════════════════════╗
║  HEADER                                                        ║
╠════════════════════════════════════════════════════════════════╣
║  /lab — work in progress, by design                            ║
║                                                                ║
║  ──────────────────────────────────────────────────────────    ║
║                                                                ║
║  ┌─────────────────────┐   exp_004                             ║
║  │                     │   WebGPU compute shader               ║
║  │   [DEMO IN PLACE]   │   started: 2026-03-12                 ║
║  │   live mini-canvas  │   status: ◉ live (try it)             ║
║  │   interactive       │                                       ║
║  │                     │   "Test interactif d'un compute       ║
║  └─────────────────────┘    shader pour..."                    ║
║                                                                ║
║                          [open in fullscreen ▸] [source ▸]     ║
║                                                                ║
║  ──────────────────────────────────────────────────────────    ║
║                                                                ║
║  ┌─────────────────────┐   exp_005                             ║
║  │                     │   Edge AI inference                   ║
║  │   [DEMO]            │   ...                                 ║
║                                                                ║
║  ...                                                           ║
║                                                                ║
╠════════════════════════════════════════════════════════════════╣
║  FOOTER                                                        ║
╚════════════════════════════════════════════════════════════════╝
```

**Comportements :**
- Chaque expérience = bloc avec démo embarquée (canvas, iframe sandbox, mini-app React).
- Démos lazy-loadées (intersection observer).
- Statuts : `◉ live` / `◯ wip` / `× archived`.
- Lien vers source GitHub si publiée.

**Mobile :**
- Démos jouent sauf si reduced-motion ; fallback image animée légère.

---

## §5 — Studio `/studio`

**Objectif :** présenter le qui, le pourquoi, la filiation FoxCase.

```
╔════════════════════════════════════════════════════════════════╗
║  HEADER                                                        ║
╠════════════════════════════════════════════════════════════════╣
║  /studio                                                       ║
║                                                                ║
║  Manifeste long (250-400 mots) en typographie aérée.           ║
║                                                                ║
║   "FoxStudio is the R&D lab of FoxCase.                        ║
║                                                                ║
║    ..."                                                        ║
║                                                                ║
╠════════════════════════════════════════════════════════════════╣
║  [01 ▸ TEAM]                                                   ║
║                                                                ║
║  ┌─────┐  ┌─────┐  ┌─────┐  ┌─────┐                            ║
║  │ N&B │  │ N&B │  │ N&B │  │ N&B │                            ║
║  │photo│  │photo│  │photo│  │photo│                            ║
║  └─────┘  └─────┘  └─────┘  └─────┘                            ║
║   Name     Name     Name     Name                              ║
║   Role     Role     Role     Role                              ║
║                                                                ║
║   Hover : photo se met en mouvement (cycle de 2-3 photos)      ║
╠════════════════════════════════════════════════════════════════╣
║  [02 ▸ FOXCASE]                                                ║
║                                                                ║
║  Bloc explicatif court : qui est FoxCase, quel est le lien.    ║
║  Lien sortant vers foxcase.fr.                                 ║
╠════════════════════════════════════════════════════════════════╣
║  [03 ▸ PRINCIPLES]                                             ║
║                                                                ║
║   → On construit avant d'expliquer.                            ║
║   → On publie ce qui tient debout.                             ║
║   → On mesure ce qu'on prétend.                                ║
║   → ...                                                        ║
╠════════════════════════════════════════════════════════════════╣
║  FOOTER                                                        ║
╚════════════════════════════════════════════════════════════════╝
```

---

## §6 — Journal `/journal`

**Objectif :** index des notes / articles techniques.

```
╔════════════════════════════════════════════════════════════════╗
║  HEADER                                                        ║
╠════════════════════════════════════════════════════════════════╣
║  /journal — workshop notes                                     ║
║                                                                ║
║  filter: [all] [3D] [perf] [tooling] [opinion]                 ║
║                                                                ║
║  ──────────────────────────────────────────────────────────    ║
║   2026-04-15  ·  6 min  ·  perf                                ║
║   Réécrire un router Next en 80 lignes                    ▸    ║
║   Hover : excerpt apparaît en dessous (2 lignes)               ║
║  ──────────────────────────────────────────────────────────    ║
║   2026-03-28  ·  12 min  ·  3D                                 ║
║   Pourquoi on a viré WebGL au profit de WebGPU pour X     ▸    ║
║  ──────────────────────────────────────────────────────────    ║
║   ...                                                          ║
║                                                                ║
║   [ load 10 more ]                                             ║
╠════════════════════════════════════════════════════════════════╣
║  FOOTER                                                        ║
╚════════════════════════════════════════════════════════════════╝
```

---

## §7 — Journal article `/journal/[slug]`

**Objectif :** lecture confortable d'un article technique riche (code, schémas).

```
╔════════════════════════════════════════════════════════════════╗
║  HEADER                                                        ║
╠════════════════════════════════════════════════════════════════╣
║  ◂ Back to journal                                             ║
║                                                                ║
║   2026-04-15  ·  6 min  ·  perf  ·  by Lucas                   ║
║                                                                ║
║   RÉÉCRIRE UN ROUTER NEXT                                      ║
║   EN 80 LIGNES                                                 ║
║                                                                ║
║   Lead paragraph (italique, taille intermédiaire) qui pose     ║
║   le problème en 2-3 phrases.                                  ║
║                                                                ║
║   ──────────────────────────────────────────────                ║
║                                                                ║
║   Body — texte 16px, line-height 1.6, max-width 65ch           ║
║                                                                ║
║   ## H2                                                        ║
║                                                                ║
║   Texte... `inline code` ...                                   ║
║                                                                ║
║   ┌────────────────────────────────────────────┐               ║
║   │ // bloc de code, shiki coloration          │               ║
║   │ export function router() { ... }           │               ║
║   └────────────────────────────────────────────┘               ║
║                                                                ║
║   ▸ Lien externe stylé                                         ║
║                                                                ║
║   [Image / schéma plein contenant]                             ║
║                                                                ║
║   ──────────────────────────────────────────────                ║
║                                                                ║
║   READ NEXT                                                    ║
║   ┌─────────────┐  ┌─────────────┐                            ║
║   │ Article 1   │  │ Article 2   │                            ║
║   └─────────────┘  └─────────────┘                            ║
╠════════════════════════════════════════════════════════════════╣
║  FOOTER                                                        ║
╚════════════════════════════════════════════════════════════════╝
```

**Comportements :**
- Reading progress en haut (barre fine 1px de couleur `--fg-primary`).
- Code blocks : copy button au hover.
- JSON-LD `Article`.

---

## §8 — Contact `/contact`

**Objectif :** trois portes claires, formulaire progressif (style Ribbit).

```
╔════════════════════════════════════════════════════════════════╗
║  HEADER                                                        ║
╠════════════════════════════════════════════════════════════════╣
║  /contact                                                      ║
║                                                                ║
║   TALK TO US.                                                  ║
║   PICK YOUR DOOR.                                              ║
║                                                                ║
║   ┌──────────────────────────────────────────────────────┐    ║
║   │ [01 ▸ INCUBATORS]                                    │    ║
║   │  You run a program, a fund, an accelerator.          │    ║
║   │  We'd love to pitch.                                 │    ║
║   │                                                  ▸   │    ║
║   └──────────────────────────────────────────────────────┘    ║
║                                                                ║
║   ┌──────────────────────────────────────────────────────┐    ║
║   │ [02 ▸ COMPANIES]                                     │    ║
║   │  You have a problem, we might have an angle.         │    ║
║   │                                                  ▸   │    ║
║   └──────────────────────────────────────────────────────┘    ║
║                                                                ║
║   ┌──────────────────────────────────────────────────────┐    ║
║   │ [03 ▸ TALENTS]                                       │    ║
║   │  You build things and you'd like to build with us.   │    ║
║   │                                                  ▸   │    ║
║   └──────────────────────────────────────────────────────┘    ║
║                                                                ║
║   ──── ou direct ────                                          ║
║   ▸ hello@foxstudio.fr                                         ║
╠════════════════════════════════════════════════════════════════╣
║  FOOTER (allégé)                                               ║
╚════════════════════════════════════════════════════════════════╝
```

**Click sur une porte → formulaire progressif (style Ribbit, étapes 1/N) :**

```
┌──────────────────────────────────────────────────────┐
│  STEP 1/4                                            │
│                                                      │
│  Your name                                           │
│  ┌──────────────────────────────────────────────┐   │
│  │                                              │   │
│  └──────────────────────────────────────────────┘   │
│                                                      │
│  ◂ back                              next ▸          │
└──────────────────────────────────────────────────────┘
```

Étapes par cible :
- **Incubators** : nom, structure, programme, message
- **Companies** : nom, société, sujet (3D/AI/edge/other), budget indicatif, message
- **Talents** : nom, rôle visé, lien portfolio/GitHub, message

**Comportements :**
- Honeypot champ caché (anti-bot).
- Rate-limit 3 envois / heure / IP.
- Submit via Resend → mailing list FoxCase.
- Confirmation visuelle minimale après envoi (pas de page de remerciement séparée).

---

## §9 — Header & Footer (transverses)

### Header

```
┌──────────────────────────────────────────────────────────────────┐
│ FOXSTUDIO   Works  Lab  Studio  Journal  Contact   FR · EN · IT  │
└──────────────────────────────────────────────────────────────────┘
```

- Sticky, **transparent au load** sur Home et page projet, **solide** ailleurs.
- Au scroll > 100 px sur Home : passe solide.
- Switch locale en bout de barre, état actif en gras.
- Mobile : burger → menu plein écran avec navigation et locales.

### Footer

```
╔══════════════════════════════════════════════════════════════════╗
║                                                                  ║
║  FOXSTUDIO                                                       ║
║  Subsidiary of FoxCase.                                          ║
║                                                                  ║
║  Navigate                  Contact                Legal          ║
║   Works                     hello@foxstudio.fr     Mentions      ║
║   Lab                       Paris, FR              Privacy       ║
║   Studio                    @foxstudio_            Footprint     ║
║   Journal                                                        ║
║                                                                  ║
║  ────────────────────────────────────────────────────────────    ║
║                                                                  ║
║   Paris · GMT+1   ·   0.18 g CO₂ · this view   ·   v0.4.2        ║
║                                                                  ║
╚══════════════════════════════════════════════════════════════════╝
```

- **Slot footprint live** : poids de la page courante + estimation CO₂, alimenté par la page `/footprint` (cf. CDC §7.3).
- Version semver visible (signe de soin / transparence).

---

## 10. À valider avec FoxCase

- [ ] Arborescence (8 pages) confirmée
- [ ] Structure narrative pages projet en 3 actes validée
- [ ] Présence d'une scène 3D signature en hero Home confirmée
- [ ] Mode sombre par défaut confirmé
- [ ] Détails footer (poids + CO₂ + GMT) gardés
- [ ] Stratégie 3 portes /contact validée

Une fois validé, ce document devient la base pour les maquettes hi-fi (issues #5 #6 #7).

---

*Référence : §5 du CDC.*
