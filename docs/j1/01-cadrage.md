# 01 — Cadrage stratégique

**Statut :** Draft v1 — à valider avec FoxCase
**Issue GitHub :** #1
**Date :** 2026-04-28

> Ce document fixe les fondations de FoxStudio : pourquoi on le construit, pour qui, et comment on saura que c'est réussi. Toute décision design ou technique ultérieure doit pouvoir s'y rattacher.

---

## 1. Vision

FoxStudio est la **filiale R&D** de FoxCase. Là où FoxCase exécute des projets pour ses clients, FoxStudio explore — sans client commanditaire, sur ses propres sujets — ce qui est techniquement possible aujourd'hui et désirable demain.

Le site FoxStudio doit être **la preuve vivante** de cette posture : il n'est pas une page "À propos" du studio, c'est **le premier produit du studio**.

> **Phrase repère :** *"Le site est lui-même une démo. S'il n'épate pas, le studio non plus."*

---

## 2. Objectifs

### 2.1 Objectifs business (mesurables à 6 mois)

| # | Objectif | Cible 6 mois | Comment on mesure |
|---|---|---|---|
| B1 | Décrocher des entretiens incubateurs | ≥ 3 RDV qualifiés | Tracking via le formulaire `/contact?type=incubator` |
| B2 | Attirer des talents tech/créa | ≥ 10 candidatures spontanées | Formulaire `/contact?type=talent` |
| B3 | Générer des leads entreprises sur sujets innovation | ≥ 5 demandes qualifiées | Formulaire `/contact?type=client` + qualification |
| B4 | Asseoir la marque FoxStudio dans la sphère tech | ≥ 1 mention presse / podcast | Veille manuelle |

### 2.2 Objectifs produit

- **P1 — Mémorable.** Premier choc visuel < 3 s. Si l'effet wow ne s'installe pas dans le hero, on a raté.
- **P2 — Crédible.** Les démos `/lab` doivent prouver le niveau technique sans avoir besoin de discours.
- **P3 — Lisible.** Malgré la densité visuelle, un incubateur en 30 secondes doit comprendre : *qui*, *quoi*, *pourquoi venir nous parler*.
- **P4 — Léger.** Le site assume une posture éco-conception (cf. §7 CDC). C'est un argument de vente, pas une contrainte subie.

### 2.3 Objectifs marque

- Positionner FoxStudio comme un **studio de R&D crédible**, pas comme une agence digitale "innovante" parmi d'autres.
- Affirmer la **filiation avec FoxCase** sans se faire écraser : FoxStudio est le grindcenter, FoxCase est l'opérationnel.
- Donner envie aux talents : montrer **les sujets**, pas la cantine.

---

## 3. KPIs cibles (validés)

### Performance technique
- **Lighthouse Performance ≥ 90** sur mobile 4G simulée (Home + Works + page projet)
- **LCP < 2.0 s** / **INP < 200 ms** / **CLS < 0.05**
- **Empreinte carbone ≤ 0.20 g CO₂ / vue** (mesure websitecarbon.com)
- **Score accessibilité Lighthouse ≥ 95**

### Engagement
- **Taux de rebond < 40 %**
- **Durée moyenne de session ≥ 1 min**
- **≥ 2 pages vues par session** en moyenne

### Conversion
- **Taux de conversion vers `/contact` ≥ 3 %** des visiteurs
- **Taux de complétion formulaire ≥ 60 %** (anti-frustration)

### Audience qualitative
- ≥ 30 % de **trafic référant** (vs SEO/direct) — preuve qu'on génère des partages

> Tous ces KPIs sont reconfirmés à la fin de J1 avec FoxCase.

---

## 4. Personas

Quatre personas — par ordre de priorité business.

### P1 — Anaïs, 38 ans, **Investment Manager** chez un VC parisien

- **Contexte** : 80 dossiers / mois, scanne en diagonale.
- **Cherche** : un signal fort de niveau d'exécution + fondation tech crédible.
- **Visite type** : 90 secondes, sur desktop, en réunion. Va sur Home → Works → projet le plus impressionnant.
- **Ce qui la convertit** : voir un projet concret avec **résultats chiffrés** + un manifeste qui ne parle pas en jargon.
- **Ce qui la perd** : flou, généralités ("nous concevons des expériences digitales..."), site lent.
- **Budget attention** : 0.

### P2 — Lucas, 27 ans, **dev senior** Front/3D

- **Contexte** : alterne 6-12 mois entre studios. Cherche des sujets, pas un job.
- **Cherche** : la **stack**, les **démos**, l'**équipe**.
- **Visite type** : 5-15 minutes, ouvre les sources sur GitHub, teste les démos `/lab`, regarde Network tab.
- **Ce qui le convertit** : voir une stack 2026 propre, des démos qui tournent vraiment, un journal technique vivant.
- **Ce qui le perd** : démos "concept" qui ne marchent pas, animations qui rament, pas d'équipe affichée.

### P3 — Camille, 45 ans, **DSI** d'une PME industrielle

- **Contexte** : a entendu parler de FoxStudio par bouche-à-oreille.
- **Cherche** : "Est-ce que ces gens peuvent m'aider sur mon problème de [IA/3D/data] ?"
- **Visite type** : 3-5 minutes, mobile (en déplacement) puis desktop pour creuser.
- **Ce qui la convertit** : un projet qui ressemble à son problème, un parcours `/contact` clair pour les pros.
- **Ce qui la perd** : trop expérimental, pas de cas d'usage business identifiable.

### P4 — Joris, 24 ans, **journaliste tech** indépendant

- **Contexte** : cherche des sujets pour sa newsletter.
- **Visite type** : Twitter → site, 2 minutes, partage si bluffé.
- **Ce qui le convertit** : une démo signature partageable + un article de journal récent.
- **Ce qui le perd** : rien à raconter, pas de prise.

---

## 5. Non-objectifs (ce qu'on **refuse** de faire)

À garder en tête à chaque arbitrage :

- ❌ **Pas un site corporate**. Pas de "nos valeurs", pas d'équipe en cravate.
- ❌ **Pas un portfolio FoxCase bis**. La mention FoxCase est unique et discrète.
- ❌ **Pas de discours "innovation"**. Le mot "innovation" doit apparaître **moins de 3 fois** sur l'ensemble du site. On montre, on ne dit pas.
- ❌ **Pas de cookie banner, pas de chat widget, pas de newsletter pop-up.**
- ❌ **Pas de buzz visuel gratuit**. Chaque animation doit servir la lecture ou la démonstration technique.
- ❌ **Pas de placeholder "coming soon"**. Si un contenu n'est pas prêt, il n'est pas annoncé.

---

## 6. Hypothèses critiques (à challenger)

| # | Hypothèse | Impact si fausse | Comment on vérifie |
|---|---|---|---|
| H1 | Une scène 3D signature sur la home crée plus de valeur qu'elle ne coûte en perf/carbone | Élevé — c'est notre signature DA | A/B mental en J2 : si le budget perf ne tient pas avec la 3D, on bascule sur une animation 2D ambitieuse |
| H2 | Les incubateurs visitent le site avant le pitch | Moyen — sinon ROI sur cible P1 réduit | Demander en RDV : "Vous avez vu le site avant ?" |
| H3 | FR + EN + IT vaut le coût de production et de maintenance trilingue | Moyen | Tracking par locale post-lancement, drop d'IT si < 5 % du trafic à 6 mois |
| H4 | Payload v3 + Postgres tient la charge attendue | Faible (trafic prévu < 100 k visites/mois) | Load test léger en J5 |
| H5 | Le N&B strict ne fatigue pas / ne paraît pas froid au point de nuire à la conversion | Élevé | Test 5 utilisateurs cibles en fin de J1 sur les maquettes |

---

## 7. Risques principaux

| # | Risque | Probabilité | Impact | Mitigation |
|---|---|---|---|---|
| R1 | Budget carbone 0.20 g CO₂ non tenu à cause de la 3D | Moyenne | Élevé | Définir dès J2 un seuil bundle 3D (≤ 250 ko gzip) + image fallback prête |
| R2 | Glissement planning sur J3 (Payload + i18n combinés) | Moyenne | Moyen | Découper J3 et J4 strictement, pas de chevauchement |
| R3 | Contenu seed (4 projets trilingues) pas prêt à temps | Élevée | Moyen | Démarrer la production éditoriale dès J1 en parallèle |
| R4 | Validation FoxCase tardive sur les maquettes J1 | Moyenne | Élevé | Bloquer 2 créneaux de revue dans le calendrier dès le kickoff |
| R5 | Perte d'un contributeur clé | Faible | Élevé | Documentation au fil de l'eau (ARCHITECTURE.md tenu à jour) |

---

## 8. Stakeholders & gouvernance

| Rôle | Personne | Décide sur | Validé en combien de temps |
|---|---|---|---|
| **Sponsor** | FoxCase (Sébastien) | Vision, budget, validation des jalons | Sous 48h ouvrées |
| **Product owner** | À nommer côté FoxCase | Arbitrages produit / contenu | Sous 24h |
| **Lead dev** | Prestataire | Choix techniques | Autonome dans le cadre du CDC |
| **Designer** | À nommer (interne FoxCase ou freelance) | DA, maquettes | Cycles courts |
| **Editor / contenu** | FoxCase + traducteurs | Textes, traductions FR/EN/IT | Selon planning J3/J4 |

### Cadence
- **Daily async** : Slack / Discord, pas de stand-up imposé
- **Revue de jalon** : à chaque fin de J (cf. §12 CDC), 1h en visio
- **Revue de design intermédiaire** : 2 fois par jalon de design
- **Décisions** : RFC légère dans `docs/rfc/` pour tout choix structurant

---

## 9. Critères de succès du jalon J1

J1 est validé quand **tous** les critères suivants sont remplis :

- [ ] Ce document est validé et signé par FoxCase
- [ ] Tone of voice + manifeste FR/EN/IT validés (issue #2)
- [ ] Direction artistique validée sur moodboard (issue #3)
- [ ] Wireframes basse fidélité validés sur les 8 pages clés (issue #4)
- [ ] Maquettes haute fidélité Home + page projet validées (issues #5 #6)
- [ ] Maquettes responsive validées (issue #7)
- [ ] Style guide + tokens livrés et exploitables (issue #8)
- [ ] PV de jalon J1 signé (issue #9)

---

## 10. Annexes

- **Cahier des charges complet** : `/CAHIER-DES-CHARGES.md`
- **Issues GitHub** : milestone *J1 — Cadrage & maquettes*
- **Références esthétiques** : Terminal Industries, Lando Norris, Bruno Simon, Ribbit
