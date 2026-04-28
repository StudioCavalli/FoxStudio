# 08 — Style guide

**Statut :** Draft v1 — à valider avec FoxCase
**Issue GitHub :** #8
**Tokens :** `tokens/tokens.json` (DTCG) + `tokens/theme.css` (Tailwind v4)

> Ce document est le **complément humain** des tokens. Il explique le pourquoi, les règles d'usage, et les pièges. Le `tokens.json` est la source de vérité machine ; ce doc est la source de vérité éditoriale.

---

## 1. Principes directeurs

1. **Le contenu prime.** Le design ne doit jamais voler la vedette à ce qu'on présente.
2. **Le silence vaut mieux que le bruit.** Si un élément n'a pas de raison d'être, il n'existe pas.
3. **Les bordures plutôt que les ombres.** N&B brutaliste = traits nets, pas de profondeur faussée.
4. **La grille est visible quand elle sert le propos.** Lignes de construction assumées, pas cachées.
5. **Animer pour révéler, pas pour décorer.** Toute animation doit pouvoir s'expliquer.
6. **Mobile = même rigueur, pas une version dégradée.**

---

## 2. Couleurs

### 2.1 Palette stricte

| Token CSS | Dark (défaut) | Light | Usage |
|---|---|---|---|
| `--color-bg` | `#0A0A0A` | `#FFFFFF` | Fond principal |
| `--color-bg-secondary` | `#141414` | `#F4F4F4` | Cards, sections alternées |
| `--color-bg-tertiary` | `#1F1F1F` | `#EAEAEA` | Inset (code blocks, callouts) |
| `--color-fg` | `#F4F4F4` | `#0A0A0A` | Texte principal |
| `--color-fg-secondary` | `#A0A0A0` | `#666666` | Métadonnées, labels mono |
| `--color-fg-tertiary` | `#666666` | `#999999` | Désactivé |
| `--color-border` | `#262626` | `#E5E5E5` | Lignes de grille, dividers |
| `--color-border-strong` | `#404040` | `#CCCCCC` | Borders d'emphase |
| `--color-focus` | `#FFFFFF` | `#0A0A0A` | Anneau de focus |

### 2.2 Règles d'usage couleur

✅ **Autorisé :**
- Une couleur d'accent **par page projet uniquement**, déclarée dans le CMS, max 1 couleur, utilisée pour : compteurs, hover lien, focus.
- Couleurs de syntaxe (Shiki) sur les blocs de code du journal.
- Médias (images, vidéos) en couleur si le contenu l'exige.

❌ **Interdit :**
- Couleur sur Home, Works (index), Lab (cards), Studio, Journal (index), Contact.
- Dégradés colorés.
- Couleurs néon / saturées partout.
- Plus d'**une** couleur d'accent par page projet.

### 2.3 Contraste

Tous les textes doivent atteindre **WCAG 2.2 AA minimum** :
- Body sur bg-primary : ratio ≥ 7:1 ✓ (`#F4F4F4` sur `#0A0A0A` = 18.4:1)
- Métadonnées (`--color-fg-secondary`) sur bg-primary : ratio ≥ 4.5:1 ✓ (`#A0A0A0` sur `#0A0A0A` = 7.2:1)
- ⚠️ **Attention** : `--color-fg-tertiary` (#666 dark) ne passe pas AA pour le body (ratio 4.0:1) — usage limité aux états désactivés.

---

## 3. Typographie

### 3.1 Familles

| Rôle | Famille | Note |
|---|---|---|
| **Display** | PP Neue Montreal | Licence à acquérir (~750€ / Pangram Pangram). Fallback gratuit : *Inter Tight*. |
| **Body / UI** | Geist Sans | Open source (Vercel/OFL). Auto-hébergé. |
| **Mono** | Geist Mono | Open source. Auto-hébergé. |

**Total chargé : 2 fichiers woff2** — Display (variable) + Mono (variable). Geist Sans peut être servi via la même variable que Display, sinon un 3e fichier max.

### 3.2 Échelle typo

| Token | Mobile | Desktop | Usage |
|---|---|---|---|
| `text-display-xl` | 64px | 160px | Hero manifeste Home |
| `text-display-l` | 48px | 96px | Titres de section |
| `text-display-m` | 36px | 64px | Titres pages projet |
| `text-heading` | 24px | 32px | H2 |
| `text-body-l` | 18px | 18px | Lead paragraph journal |
| `text-body` | 16px | 16px | Body |
| `text-mono-m` | 13px | 13px | Métadonnées |
| `text-mono-s` | 12px | 12px | Labels, badges |

### 3.3 Règles typo

- **Display** : tracking serré (`-0.02em`), line-height tight (`1.0` à `1.15`), font-weight regular (400) ou medium (500).
- **Body** : line-height 1.5, max-width 65ch en lecture longue (journal).
- **Mono** : majuscules pour les labels (`01 ▸ INDEX`), tracking légèrement ouvert (`0.04em`).
- **Pas d'italique gras** : on utilise soit italique léger pour citation, soit gras pour emphase, jamais les deux ensemble.
- **Hyphenation off** sur display, on en titre **on** sur body en FR/IT (lang attr requis).

### 3.4 Hiérarchie minimale par page

```
[Mono label section]            ← text-mono-s, secondary fg
[Display title]                 ← text-display-l ou m, primary fg
[Body lead paragraph]           ← text-body-l, primary fg
[Body content]                  ← text-body, primary fg, max 65ch
```

---

## 4. Grille

### 4.1 Colonnes

| Breakpoint | Colonnes | Gutter | Margin |
|---|---|---|---|
| Mobile (< 768px) | 4 | 16px | 20px |
| Tablet (768–1023px) | 8 | 20px | 32px |
| Desktop (≥ 1024px) | 12 | 24px | 48px |

Max content width : `1440px` (au-delà, marges étendues).

### 4.2 Grille visible (mode blueprint)

Sur certaines sections (hero, page projet acte 1), les **lignes de colonne** sont visibles :
- 1px solid `--color-border`
- Opacité `30%`
- Activable via classe `.grid-visible` sur le container

> Effet : on rappelle qu'il y a une construction. Style CAD / blueprint, pas grille rigide partout.

---

## 5. Espacement

Échelle 8px stricte. Tout multiple de 4px minimum :

```
1 = 4px    7 = 48px     ← section padding tablet
2 = 8px    8 = 64px     ← section padding desktop
3 = 12px   9 = 96px     ← grand espace (entre H1 et body)
4 = 16px   10 = 128px   ← spacer entre sections
5 = 24px   11 = 192px   ← spacer hero/section
6 = 32px   12 = 256px   ← très grand vide intentionnel
```

**Règles :**
- Espace entre 2 sections : minimum `--spacing-9` (96px).
- Espace entre H1 et premier paragraphe : `--spacing-5` (24px).
- Padding interne d'un block / card : `--spacing-5` ou `--spacing-6`.

---

## 6. Bordures & rayons

- Border par défaut : `1px solid --color-border`.
- Focus ring : `2px solid --color-focus` + offset `2px`.
- **Très peu de border-radius** : 0 partout, sauf inputs (`2px`), badges status (full pour les pastilles `◉`).
- Pas de shadows, sauf hover lift très subtil sur les cards Lab.

---

## 7. Motion

### 7.1 Durations & easings

| Token | Valeur | Usage |
|---|---|---|
| `--duration-instant` | 100ms | feedback tactile |
| `--duration-fast` | 150ms | hover, focus |
| `--duration-base` | 300ms | transitions courantes |
| `--duration-page` | 400ms | view transitions |
| `--duration-slow` | 600ms | reveal text scroll |

| Easing | Bezier | Usage |
|---|---|---|
| `--ease-default` | `(0.4, 0, 0.2, 1)` | défaut |
| `--ease-reveal` | `(0.16, 1, 0.3, 1)` | reveal scroll (out-expo-ish) |
| `--ease-page` | `(0.83, 0, 0.17, 1)` | page transitions |

### 7.2 Catalogue de motion (à implémenter en J2)

| Pattern | Durée | Easing | Stagger |
|---|---|---|---|
| Hover link | fast | default | — |
| Hover card image swap | base | default | — |
| Reveal title (split) | slow | reveal | 30ms / char |
| Reveal paragraph | slow | reveal | 60ms / line |
| Compteur animé | 2000ms | ease-out | — |
| Page transition | page | page | — |
| Sticky nav apparition | base | default | — |

### 7.3 Règle absolue

Tout `transition-duration > 200ms` et toute `animation` est désactivée par :

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

Le smooth scroll (Lenis) est désactivé manuellement quand `matchMedia('(prefers-reduced-motion)').matches`.

---

## 8. Iconographie

- **Pas de librairie d'icônes** (lucide, heroicons, etc.) — set custom SVG inline ≤ 30 icônes.
- Style : monoline, 1.5px stroke, viewBox 24×24.
- Couleur : `currentColor` (héritée).
- Sprite SVG unique chargé en début de session.

Set initial nécessaire :
- `arrow-right`, `arrow-down`, `arrow-up-right` (lien externe)
- `play`, `pause`
- `cross`, `check`
- `dot-live` (rempli), `dot-wip` (vide)
- `menu`, `close`
- `external-link`
- `github`, `twitter`, `linkedin`, `mail`

---

## 9. Composants UI (specs minimales)

### Button

```
┌──────────────────────┐
│  Label  ▸            │
└──────────────────────┘
```

- Padding : `--spacing-3` × `--spacing-5` (12 × 24px)
- Border : `1px solid --color-fg`
- Background : transparent (ghost) ou `--color-fg` (primary, texte inversé)
- Mono uppercase font, tracking `0.04em`
- Hover : background swap, durée fast
- Focus : ring 2px

### Link inline

- Souligné `1px` en dessous (offset 4px)
- Hover : underline disparaît, fg-primary plus marqué
- Lien externe : icône `arrow-up-right` après le texte

### Card projet

- Bordure 1px `--color-border`
- Padding `--spacing-5`
- Hover : border-color → `--color-border-strong`, image swap si applicable
- Mono label en haut (numéro, année), display title, mono meta en bas

### Input (formulaire)

- Hauteur 48px minimum
- Border bottom 1px (style minimal, pas de boîte)
- Focus : border bottom 2px `--color-focus`, label se rétracte
- Pas de placeholder visible si label utilisé

### Status dot

- 8px diamètre
- ◉ live : `--color-fg`
- ◯ wip : transparent + 1px border `--color-fg`
- × archived : `--color-fg-tertiary`

---

## 10. Photographie & médias

### 10.1 Style photo équipe (page Studio)
- N&B uniquement (post-prod si nécessaire).
- Lumière franche, contraste élevé.
- Fond neutre (mur, atelier, pas studio photo).
- Hover : cycle de 2-3 photos par personne (si fourni).

### 10.2 Captures projet
- Couleur autorisée (c'est le contenu).
- Format : 16:9 ou 1:1 selon contexte.
- Pas de cadrage circulaire ni de drop shadow.

### 10.3 Vidéos
- Loop silencieux uniquement (pas de son par défaut).
- **Jamais d'autoplay** sans intersection observer.
- Format AV1 / VP9 fallback h.264.
- Durée loop ≤ 8s ou click-to-play.

---

## 11. Voix & écriture (synthèse)

Voir `02-tone-of-voice.md` pour le détail. Principes courts :

- Phrases courtes. Une idée par phrase.
- Numérotation factuelle préférée aux superlatifs.
- Le mot "innovation" est limité à 2 occurrences sur tout le site.
- "On" (français) plutôt que "nous". "We" en EN. "Noi" en IT (rare, voi neutre).

---

## 12. Validation J1

- [ ] Tokens JSON validés et exploitables
- [ ] theme.css testé en local (compile avec Tailwind v4)
- [ ] Échelle typo validée par designer
- [ ] Palette validée par FoxCase
- [ ] Motion catalogue compris par le dev front
- [ ] Set d'icônes initial dessiné (peut être livré en début J2)

---

*Référence : §4, §6.2 du CDC.*
