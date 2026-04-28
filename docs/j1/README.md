# J1 — Cadrage & maquettes

Livrables du jalon J1 du projet FoxStudio. Ces documents servent de base pour toute la suite (J2 → J6).

## Index

| # | Doc | Issue GH | Statut |
|---|---|---|---|
| 01 | [Cadrage stratégique](./01-cadrage.md) | [#1](https://github.com/StudioCavalli/FoxStudio/issues/1) | ✅ Draft v1 |
| 02 | [Tone of voice & manifeste FR/EN/IT](./02-tone-of-voice.md) | [#2](https://github.com/StudioCavalli/FoxStudio/issues/2) | ✅ Draft v1 |
| 03 | [Moodboard & direction artistique](./03-moodboard.md) | [#3](https://github.com/StudioCavalli/FoxStudio/issues/3) | ✅ Draft v1 (texte) — visuel Figma à produire |
| 04 | [Wireframes basse fidélité](./04-wireframes.md) | [#4](https://github.com/StudioCavalli/FoxStudio/issues/4) | ✅ Draft v1 |
| 05 | Maquettes hi-fi Home (FR/EN/IT) | [#5](https://github.com/StudioCavalli/FoxStudio/issues/5) | ⏳ À faire — designer Figma |
| 06 | Maquettes hi-fi page projet | [#6](https://github.com/StudioCavalli/FoxStudio/issues/6) | ⏳ À faire — designer Figma |
| 07 | Maquettes responsive | [#7](https://github.com/StudioCavalli/FoxStudio/issues/7) | ⏳ À faire — designer Figma |
| 08 | [Style guide](./08-style-guide.md) + [tokens.json](./tokens/tokens.json) + [theme.css](./tokens/theme.css) | [#8](https://github.com/StudioCavalli/FoxStudio/issues/8) | ✅ Draft v1 |
| 09 | Validation FoxCase | [#9](https://github.com/StudioCavalli/FoxStudio/issues/9) | ⏳ Gate de fin J1 |

## Ce qui est prêt

- Cadrage stratégique complet (objectifs, KPIs, personas, hypothèses, risques, gouvernance).
- Charte éditoriale + manifeste **trilingue FR/EN/IT** (à relire par locuteur natif EN/IT avant J4).
- Analyse détaillée des 4 références esthétiques avec règles concrètes de synthèse.
- Wireframes des 8 pages en markdown/ASCII, prêts à être transformés en hi-fi.
- Style guide + tokens design system **directement consommables par Tailwind v4** en J2.

## Ce qui demande un humain

- **Maquettes Figma haute fidélité** (issues #5/#6/#7) — un designer doit prendre les wireframes + le moodboard + les tokens et produire les hi-fi.
- **Moodboard visuel Figma** (capture d'écran annotée des 4 références).
- **Validation FoxCase** sur tous les drafts (issue #9).
- **Set d'icônes SVG** (≤ 30 icônes monoline) — peut être livré début J2.
- **Acquisition licence PP Neue Montreal** (~750 €) ou choix définitif d'une alternative gratuite (Inter Tight).

## Suite

Une fois validation J1 (issue #9) signée, on attaque J2 :
- Init repo Next.js 15, Tailwind v4 (consommer `theme.css`), CI.
- Implémenter la page Home avec scène 3D signature.
