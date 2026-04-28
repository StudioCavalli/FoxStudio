# 03 — Moodboard & direction artistique

**Statut :** Draft v1 — à valider avec FoxCase
**Issue GitHub :** #3
**Note :** Document texte — un moodboard visuel Figma viendra compléter (designer requis).

---

## 1. Positionnement DA en une phrase

> *La rigueur industrielle de **Terminal Industries**, la cinétique narrative de **Lando Norris**, l'audace technique de **Bruno Simon**, la retenue typographique de **Ribbit** — le tout fondu dans un noir & blanc strict.*

---

## 2. Analyse référence par référence

### 2.1 Terminal Industries — *le squelette*

**URL :** https://terminal-industries.com/

| Élément observé | Ce qu'on prend | Ce qu'on adapte |
|---|---|---|
| Numérotation séquentielle des sections (01–06) | ✅ **On garde**. Chaque bloc de la home est numéroté `01 — INDEX`, `02 — WORKS`, etc. | — |
| Badges / labels (`Benefit 01`, `Gartner 2025`) | ✅ **On garde** comme système. Labels en mono pour les métadonnées (date, stack, statut). | Style brutaliste (border 1px, padding compact) |
| Hero accroche directe (*"We have reinvented…"*) | ✅ **On garde** la structure : une phrase, un point. Pas de sous-titre fleuri. | Notre phrase = manifeste FoxStudio |
| Compteur numérique animé | ✅ **On garde** comme micro-détail (compteur de projets, compteur de poids de la page) | — |
| Palette bleue / accents colorés | ❌ **On rejette.** N&B strict. | — |
| Ton B2B "valeur business" | ❌ **On rejette.** Ton labo, pas commercial. | — |
| Mise en page centrée, classique | ⚠️ **On rigidifie** : grille apparente avec lignes de construction visibles (style blueprint). | — |

> **À retenir :** Terminal Industries nous donne **la rigueur structurelle** — numérotation, labels, blocs nettement délimités. C'est le squelette sur lequel on construit.

---

### 2.2 Lando Norris — *la cinétique*

**URL :** https://landonorris.com/

| Élément observé | Ce qu'on prend | Ce qu'on adapte |
|---|---|---|
| Hover variants sur les cards (`base` ↔ `hover`) | ✅ **Pilier**. Chaque card projet a un état hover qui révèle visuel ou animation. | — |
| Galerie horizontale scrollable (casques) | ✅ **On reprend** pour `/lab` — défilement horizontal des prototypes. | Mode lecture clavier + tactile |
| Parallaxe subtile au scroll | ✅ **On garde** — uniquement sur les sections cinématiques des pages projet. | Désactivé si `prefers-reduced-motion` |
| Narration progressive (intro → philo → champion) | ✅ **On reprend** pour les pages projet — histoire scrollée en actes. | — |
| Lime green / or / accents colorés | ❌ **On rejette.** | — |
| Signature manuscrite | ❌ **On rejette** — trop personnel pour un studio. | — |
| Indicateur "tap to lock" / interactions tactiles affichées | ✅ **On garde** comme principe : afficher discrètement les interactions disponibles. | — |
| `Load Norris` (élément interactif mystérieux) | ✅ **On garde l'esprit** : un easter egg discret quelque part sur le site. | — |

> **À retenir :** Lando Norris nous apprend que **chaque page peut être un mini-film**. Les transitions entre sections doivent raconter, pas juste défiler.

---

### 2.3 Bruno Simon — *l'audace technique*

**URL :** http://bruno-simon.com/

| Élément observé | Ce qu'on prend | Ce qu'on adapte |
|---|---|---|
| Three.js + Rapier (physique) + Howler (audio) | ⚠️ **À doser.** On garde Three.js (R3F) pour **une seule scène signature**, pas le site entier. | Bundle ≤ 250 ko gzip |
| Voiture jouable, exploration libre | ❌ **On rejette** comme principe global — trop de friction pour un incubateur pressé. | Mais un "mode lab" optionnel envisageable |
| Easter eggs, achievements, secrets | ✅ **On garde l'esprit** d'easter eggs sobres (un raccourci clavier qui révèle un truc, par ex.) | — |
| Sources ouvertes, devlogs, tout documenté | ✅ **Pilier de marque.** Le journal FoxStudio doit avoir cette transparence. Code de la 3D signature publié sur GitHub. | — |
| Niveau de polish 3D (ombres, post-process, audio, haptique) | ✅ **Référence bar haute** pour notre scène signature — même si elle est plus courte, elle doit avoir ce niveau. | — |
| Palette minimaliste avec icônes SVG cohérentes | ✅ **On garde**. SVG monochromes, set cohérent. | Pas de lib d'icônes lourde — set custom ≤ 30 icônes |

> **À retenir :** Bruno Simon nous fixe **la barre de qualité technique**. Si on fait de la 3D, elle doit être au niveau Bruno Simon. Sinon on n'en fait pas.

---

### 2.4 Ribbit — *la retenue*

**URL :** https://ribbit.dk/

| Élément observé | Ce qu'on prend | Ce qu'on adapte |
|---|---|---|
| Bicolore strict (logo dark/light) | ✅ **Cœur de notre DA.** Sombre par défaut, switch léger. | — |
| Espacement généreux, respiration visuelle | ✅ **Pilier.** Le luxe, c'est l'espace. | — |
| Titres XXL ("Ribbit is a creative motion agency…") | ✅ **On garde.** Titres monumentaux qui occupent plusieurs lignes. | Notre manifeste sur 3-5 lignes courtes |
| Lignes séparées (*"Let's get to / know each other"*) | ✅ **On garde** comme principe : forcer les retours à la ligne pour le rythme. | — |
| Formulaire multi-étapes (1/5, 2/5…) | ✅ **On reprend** pour `/contact` — formulaire progressif par cible. | Mais sans illustrations de personnages |
| `Local time: (GMT+1)` discret | ✅ **On adore.** Détail factuel intégré subtilement. → On affiche : `Paris · GMT+1` + `0.18 g CO₂ · this view` dans le footer. | — |
| Illustrations de personnages (jester, oiseau…) | ❌ **On rejette.** Pas d'illustration figurative. | — |
| Pluralité de CTA ("Ribbit who?", "All Projects"…) | ⚠️ **On allège.** 1 CTA principal par page, pas 4. | — |
| Bouton "Play" + vidéo intégrée | ✅ **On garde** pour les pages projet quand pertinent. | Lazy + click-to-play (jamais autoplay) |

> **À retenir :** Ribbit nous apprend **la retenue**. Moins de tout. Plus de blanc. Plus de silence visuel. C'est l'antidote au risque de lourdeur que peuvent introduire Bruno Simon ou Lando Norris.

---

## 3. Synthèse — la DA FoxStudio

### 3.1 Palette stricte

| Token | Light mode | Dark mode (par défaut) | Usage |
|---|---|---|---|
| `--bg-primary` | `#FFFFFF` | `#0A0A0A` | Fond principal |
| `--bg-secondary` | `#F4F4F4` | `#141414` | Cards, sections alternées |
| `--fg-primary` | `#0A0A0A` | `#F4F4F4` | Texte principal |
| `--fg-secondary` | `#666666` | `#999999` | Texte secondaire, métadonnées |
| `--border` | `#E5E5E5` | `#262626` | Lignes de grille, séparateurs |
| `--accent` | `#0A0A0A` | `#FFFFFF` | Hover states, focus rings |

> **Aucune couleur d'accent permanente.** La couleur (cyan, magenta, ambre…) est autorisée **comme signal** sur un projet spécifique (page projet uniquement) qui aurait sa propre couleur signature. Maximum 1 couleur par page projet, jamais de couleur sur l'index ou les pages génériques.

### 3.2 Typographie

| Rôle | Famille proposée | Fallback |
|---|---|---|
| **Display / Titres XXL** | *PP Neue Montreal* (Pangram Pangram) ou *Söhne* | Inter Tight, sans-serif |
| **Body / UI** | *Geist Sans* (open source) | Inter, sans-serif |
| **Mono / métadonnées** | *Geist Mono* | JetBrains Mono, monospace |

- 2 familles maximum chargées (Display + Mono ; Body peut partager Display via un poids différent).
- Variables, sous-réglées latin uniquement, woff2.
- `font-display: swap`.

**Échelle typo (proposition) :**

| Step | Px desktop | Px mobile | Usage |
|---|---|---|---|
| Display XL | 160 | 64 | Hero manifeste |
| Display L | 96 | 48 | Titres de section |
| Display M | 64 | 36 | Titres projets |
| Heading | 32 | 24 | H2 de page |
| Body | 16 | 16 | Paragraphes |
| Mono S | 12 | 12 | Labels, métadonnées |

### 3.3 Grille

- **12 colonnes** desktop, **4 colonnes** mobile.
- **Gouttière 24 px** desktop, **16 px** mobile.
- **Margin extérieur 48 px** desktop, **20 px** mobile.
- **Lignes de grille visibles** (1px `--border`, opacité 30 %) sur certaines sections "blueprint".
- **Numérotation de section** (`01 ▸ INDEX`) en mono, alignée à gauche du bloc.

### 3.4 Motion

| Type | Durée | Easing | Quand |
|---|---|---|---|
| Hover state | 150 ms | `cubic-bezier(0.4, 0, 0.2, 1)` | Liens, cards |
| Reveal text | 600 ms | `cubic-bezier(0.16, 1, 0.3, 1)` | Apparition au scroll |
| Page transition | 400 ms | `cubic-bezier(0.83, 0, 0.17, 1)` | View Transitions |
| Smooth scroll (Lenis) | — | `default` | Scroll global |
| 3D scene idle | 60 fps | — | Hero R3F |

**Règle absolue :** toute animation > 200 ms est **désactivée** si `prefers-reduced-motion: reduce`.

### 3.5 Détails signature (à garder en priorité)

1. **Numérotation des sections** type `01 ▸ INDEX` (en mono).
2. **Métadonnées discrètes** dans le footer : `Paris · GMT+1` + `0.18 g CO₂ · this view` + `v0.4.2`.
3. **Hover variants** sur les cards projet (image base ↔ image alt ou animation).
4. **Manifeste hero** avec retours à la ligne forcés (style Ribbit).
5. **Compteurs animés** au scroll (style Terminal).
6. **Une scène 3D signature** (style Bruno Simon, doseé).
7. **Easter egg discret** (raccourci clavier qui révèle un mode debug ou une démo cachée).
8. **Page transitions filmiques** (style Lando Norris) sur les pages projet.

---

## 4. Anti-patterns à éviter

- ❌ Carrousel auto-rotatif
- ❌ Vidéos en autoplay
- ❌ Illustrations vectorielles "figurines" (style Ribbit jester)
- ❌ Effets glitch / cyberpunk
- ❌ Fonds animés type "particules"
- ❌ Curseurs custom envahissants (le nôtre reste discret)
- ❌ Mode "light" forcé — sombre par défaut, light en alternative
- ❌ Couleurs néon / saturées partout
- ❌ Plus de 2 polices chargées
- ❌ Logos clients alignés en grille sans contexte (style "ils nous font confiance")

---

## 5. Livrables attendus côté designer (à produire ensuite)

Sur la base de ce moodboard, le designer produit en J1 :
1. Moodboard visuel Figma (références + samples typo + palette)
2. Wireframes (issue #4) — voir doc `04-wireframes.md`
3. Maquettes haute fidélité Home + page projet (issues #5 #6)
4. Maquettes responsive (issue #7)
5. Style guide visuel (issue #8) — voir doc `08-style-guide.md` pour la base technique

---

*Référence : §4 du CDC.*
