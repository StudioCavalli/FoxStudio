/**
 * Seed data for the 12 FoxStudio projects.
 * Source: README.md of each repo under github.com/StudioCavalli.
 *
 * Each project carries non-localized fields (slug, year, stack, state)
 * plus localized fields in fr/en/it (name when meaningful, summary,
 * results.label). The seed script writes EN first then payload.update
 * for FR and IT.
 */

export type Locale = "fr" | "en" | "it";

export type ResultMetric = {
  value: string;
  label: Record<Locale, string>;
};

export type ProjectSeed = {
  number: string;
  slug: string;
  /** Brand name — usually identical across locales. */
  name: Record<Locale, string>;
  /** One-liner shown in /works index. */
  summary: Record<Locale, string>;
  year: number;
  state: "live" | "wip" | "archived";
  stack: { tech: string }[];
  /** Optional partners: { name, url }. */
  partners?: { name: string; url?: string }[];
  /** Three signature metrics for the project page. */
  results: ResultMetric[];
  /** GitHub repo (without the org prefix). Used for "view source" links. */
  repo: string;
};

const tri = (fr: string, en: string, it: string): Record<Locale, string> => ({ fr, en, it });

export const PROJECTS: ProjectSeed[] = [
  {
    number: "001",
    slug: "nonno-robot",
    repo: "NonnoRobot",
    name: tri("NonnoRobot", "NonnoRobot", "NonnoRobot"),
    summary: tri(
      "Chef robotique piloté par IA — pizza et pâtes faites maison, du pétrissage au dressage.",
      "AI-powered robotic chef cooking pizza and pasta from scratch — kneading, plating, the lot.",
      "Chef robotico guidato dall'IA — pizza e pasta fatte in casa, dall'impasto all'impiattamento.",
    ),
    year: 2026,
    state: "wip",
    stack: [
      { tech: "FastAPI" },
      { tech: "ROS 2 Jazzy" },
      { tech: "PyTorch" },
      { tech: "Next.js 15" },
      { tech: "Postgres 16" },
      { tech: "Redis" },
      { tech: "Docker" },
    ],
    results: [
      {
        value: "11",
        label: tri("services orchestrés", "services orchestrated", "servizi orchestrati"),
      },
      {
        value: "47",
        label: tri("recettes vectorisées", "vectorised recipes", "ricette vettorializzate"),
      },
      {
        value: "120 ms",
        label: tri("latence vision-action", "vision-to-action latency", "latenza visione-azione"),
      },
    ],
  },

  {
    number: "002",
    slug: "memoria",
    repo: "Memoria",
    name: tri("Memoria", "Memoria", "Memoria"),
    summary: tri(
      "IA biographique pour seniors 80+. Compagnon vocal qui recueille les souvenirs de vie et veille sur les premiers signes de déclin cognitif.",
      "Biographical AI for seniors 80+. A voice companion that collects life memories and watches for early signs of cognitive decline.",
      "IA biografica per anziani 80+. Compagno vocale che raccoglie i ricordi di vita e veglia sui primi segni di declino cognitivo.",
    ),
    year: 2026,
    state: "live",
    partners: [{ name: "CCI Nice Côte d'Azur", url: "https://cote-azur.cci.fr" }],
    stack: [
      { tech: "FastAPI" },
      { tech: "Postgres" },
      { tech: "React Native" },
      { tech: "Next.js 15" },
      { tech: "Tailwind v4" },
    ],
    results: [
      {
        value: "1 200",
        label: tri("souvenirs collectés", "memories collected", "ricordi raccolti"),
      },
      {
        value: "7",
        label: tri(
          "indicateurs cognitifs suivis",
          "cognitive markers tracked",
          "marcatori cognitivi monitorati",
        ),
      },
      {
        value: "AMI",
        label: tri("Silver Économie 2026", "Silver Economy 2026 call", "bando Silver Economy 2026"),
      },
    ],
  },

  {
    number: "003",
    slug: "kidverse",
    repo: "KidVerse",
    name: tri("Kidverse", "Kidverse", "Kidverse"),
    summary: tri(
      "App phygitale pour enfants 3–15 ans. La première qui les récompense quand ils posent le téléphone et passent à l'action dans le monde réel.",
      "Phygital app for kids 3–15. The first that rewards them when they put the phone down and act in the real world.",
      "App phygital per bambini 3–15. La prima che li ricompensa quando posano il telefono e agiscono nel mondo reale.",
    ),
    year: 2026,
    state: "wip",
    stack: [
      { tech: "React Native 0.78" },
      { tech: "Expo SDK 52" },
      { tech: "NestJS 11" },
      { tech: "Apollo Router" },
      { tech: "Claude" },
    ],
    results: [
      { value: "4", label: tri("studios créatifs", "creative studios", "studi creativi") },
      {
        value: "200+",
        label: tri("quêtes du monde réel", "real-world quests", "missioni nel mondo reale"),
      },
      {
        value: "0 ad",
        label: tri("publicité dans l'app", "ads in the app", "pubblicità nell'app"),
      },
    ],
  },

  {
    number: "004",
    slug: "flov",
    repo: "Flov",
    name: tri("Flov.", "Flov.", "Flov."),
    summary: tri(
      "Plateforme de streaming musical et vidéo. Made in Cannes. Sans pub, sans tracking, sans compromis.",
      "Music and video streaming platform. Made in Cannes. No ads, no tracking, no compromise.",
      "Piattaforma di streaming musicale e video. Made in Cannes. Niente pubblicità, niente tracking, nessun compromesso.",
    ),
    year: 2026,
    state: "live",
    stack: [{ tech: "Laravel 13" }, { tech: "React 19" }, { tech: "TypeScript 5" }],
    results: [
      {
        value: "0",
        label: tri("trackers tiers", "third-party trackers", "tracker di terze parti"),
      },
      {
        value: "100 %",
        label: tri(
          "infrastructure FR",
          "FR-hosted infrastructure",
          "infrastruttura ospitata in FR",
        ),
      },
      { value: "MIT", label: tri("licence du player", "player licence", "licenza del player") },
    ],
  },

  {
    number: "005",
    slug: "ombrys",
    repo: "OmbrysWeb",
    name: tri("Ombrys", "Ombrys", "Ombrys"),
    summary: tri(
      "Collectif citoyen et journalistique. Plateforme d'investigation où la vérité est documentée, vérifiable, transparente.",
      "Citizen and journalist collective. An investigative platform where truth is documented, verifiable, transparent.",
      "Collettivo di cittadini e giornalisti. Piattaforma investigativa dove la verità è documentata, verificabile, trasparente.",
    ),
    year: 2026,
    state: "live",
    stack: [{ tech: "Next.js" }, { tech: "TypeScript" }, { tech: "Sanity" }],
    results: [
      { value: "8", label: tri("dossiers ouverts", "open investigations", "indagini aperte") },
      {
        value: "100 %",
        label: tri("sources sourcées", "sources cited", "fonti citate"),
      },
      {
        value: "0 €",
        label: tri("publicité acceptée", "advertising accepted", "pubblicità accettata"),
      },
    ],
  },

  {
    number: "006",
    slug: "clayr",
    repo: "LightOff",
    name: tri("Clayr", "Clayr", "Clayr"),
    summary: tri(
      "Refuge cosmique numérique. Citations, textes, musique, IA, manuscrits, thérapie immersive — tout un univers pour se reconnecter à soi.",
      "A digital cosmic refuge. Quotes, texts, music, AI, manuscripts, immersive therapy — a whole universe to reconnect with yourself.",
      "Un rifugio cosmico digitale. Citazioni, testi, musica, IA, manoscritti, terapia immersiva — un intero universo per riconnettersi con sé stessi.",
    ),
    year: 2026,
    state: "live",
    stack: [
      { tech: "Next.js 16" },
      { tech: "Supabase" },
      { tech: "Tailwind v4" },
      { tech: "TypeScript 5" },
    ],
    results: [
      { value: "12", label: tri("rituels guidés", "guided rituals", "rituali guidati") },
      {
        value: "AI Companion",
        label: tri("compagnon IA dédié", "dedicated AI companion", "compagno IA dedicato"),
      },
      { value: "PWA", label: tri("offline first", "offline-first", "offline first") },
    ],
  },

  {
    number: "007",
    slug: "foxcube",
    repo: "EurlGenialite",
    name: tri("FoxCube", "FoxCube", "FoxCube"),
    summary: tri(
      "E-commerce multilingue pour une maison italienne d'import-export. Catalogue à variantes, broderie sur mesure, paiement multi-devises.",
      "Multilingual e-commerce for an Italian import/export house. Variant-aware catalogue, custom embroidery, multi-currency checkout.",
      "E-commerce multilingue per una casa italiana di import/export. Catalogo a varianti, ricamo su misura, pagamento multi-valuta.",
    ),
    year: 2026,
    state: "live",
    stack: [
      { tech: "Laravel 12" },
      { tech: "Tailwind v4" },
      { tech: "PHP 8.4" },
      { tech: "Stripe" },
      { tech: "Docker" },
    ],
    results: [
      {
        value: "5",
        label: tri(
          "variantes par produit (moy.)",
          "variants per product (avg.)",
          "varianti per prodotto (media)",
        ),
      },
      {
        value: "3",
        label: tri("langues catalogue", "catalogue languages", "lingue catalogo"),
      },
      {
        value: "PDF",
        label: tri("factures auto-générées", "auto-generated invoices", "fatture auto-generate"),
      },
    ],
  },

  {
    number: "008",
    slug: "moes-coffee",
    repo: "FoxHoleSim",
    name: tri("Moe's Coffee", "Moe's Coffee", "Moe's Coffee"),
    summary: tri(
      "Springfield's finest, au gramme près. Une boutique e-commerce sérieuse habillée de l'univers de Moe Szyslak — banc d'essai grandeur nature pour la stack 2026.",
      "Springfield's finest, to the gram. A serious e-commerce store wrapped in Moe Szyslak's universe — a full-scale benchmark for the 2026 stack.",
      "Il meglio di Springfield, al grammo. Un e-commerce serio vestito dell'universo di Moe Szyslak — un banco di prova in scala reale per lo stack 2026.",
    ),
    year: 2026,
    state: "live",
    stack: [
      { tech: "React Router v7" },
      { tech: "TypeScript 5.9" },
      { tech: "Tailwind v4" },
      { tech: "SQLite" },
      { tech: "Drizzle" },
    ],
    results: [
      {
        value: "4",
        label: tri("thèmes Springfield", "Springfield themes", "temi Springfield"),
      },
      { value: "Drizzle", label: tri("ORM type-safe", "type-safe ORM", "ORM type-safe") },
      {
        value: "Vercel",
        label: tri("déploiement edge", "edge deployment", "deploy edge"),
      },
    ],
  },

  {
    number: "009",
    slug: "klown",
    repo: "Klown",
    name: tri("Klown", "Klown", "Klown"),
    summary: tri(
      "Framework desktop multi-plateforme pour le hacking éthique autorisé. Cadre légal strict, journal d'audit, modules sandboxés.",
      "Cross-platform desktop framework for authorised ethical hacking. Strict legal scope, audit logging, sandboxed modules.",
      "Framework desktop multipiattaforma per l'hacking etico autorizzato. Quadro legale rigoroso, audit log, moduli sandbox.",
    ),
    year: 2025,
    state: "archived",
    stack: [{ tech: "TypeScript" }, { tech: "Electron" }, { tech: "Rust" }, { tech: "Node.js" }],
    results: [
      {
        value: "3",
        label: tri("plateformes supportées", "platforms supported", "piattaforme supportate"),
      },
      {
        value: "audit",
        label: tri("journal complet", "full event log", "log completo"),
      },
      {
        value: "sandbox",
        label: tri("modules isolés", "isolated modules", "moduli isolati"),
      },
    ],
  },

  {
    number: "010",
    slug: "klown-network",
    repo: "KlownNetwork",
    name: tri("Klown Network", "Klown Network", "Klown Network"),
    summary: tri(
      "Plateforme communautaire de l'écosystème Klown. Couche sociale, hub de contenus, service d'identité.",
      "Community platform for the Klown ecosystem. Social layer, content hub, identity service.",
      "Piattaforma comunitaria per l'ecosistema Klown. Strato sociale, hub di contenuti, servizio identità.",
    ),
    year: 2025,
    state: "wip",
    stack: [{ tech: "Next.js" }, { tech: "TypeScript" }, { tech: "MongoDB" }],
    results: [
      { value: "3", label: tri("rôles utilisateurs", "user roles", "ruoli utente") },
      {
        value: "SSO",
        label: tri("avec Klown Vitrine", "with Klown Vitrine", "con Klown Vitrine"),
      },
      {
        value: "WebSocket",
        label: tri("temps réel", "real-time layer", "tempo reale"),
      },
    ],
  },

  {
    number: "011",
    slug: "klown-vitrine",
    repo: "KlownVitrine",
    name: tri("Klown Vitrine", "Klown Vitrine", "Klown Vitrine"),
    summary: tri(
      "Vitrine publique de la marque Klown et de sa gamme produit — narrative, motion légère, server-rendered.",
      "Public-facing showcase for the Klown brand and product line — narrative-led, motion-light, server-rendered.",
      "Showcase pubblico del brand Klown e della sua linea di prodotti — narrativa, motion leggero, server-rendered.",
    ),
    year: 2025,
    state: "archived",
    stack: [{ tech: "Next.js" }, { tech: "TypeScript" }, { tech: "Tailwind" }],
    results: [
      { value: "≤ 80 kB", label: tri("JS sur la home", "JS on the home", "JS sulla home") },
      {
        value: "SSR",
        label: tri("100 % rendu serveur", "100 % server-rendered", "100 % server-rendered"),
      },
      {
        value: "0",
        label: tri("dépendance client lourde", "heavy client dep", "dipendenze client pesanti"),
      },
    ],
  },

  {
    number: "012",
    slug: "foxcard",
    repo: "FoxCard",
    name: tri("FoxCard", "FoxCard", "FoxCard"),
    summary: tri(
      "Planificateur de roadmap façon cartes. Génère automatiquement les issues GitHub depuis un markdown source unique.",
      "Card-shaped roadmap planner. Auto-generates GitHub issues from a single source-of-truth markdown.",
      "Planner di roadmap a forma di card. Genera automaticamente le issue GitHub da un unico markdown sorgente.",
    ),
    year: 2025,
    state: "archived",
    stack: [{ tech: "TypeScript" }, { tech: "GitHub CLI" }, { tech: "Markdown" }],
    results: [
      {
        value: "1",
        label: tri("source de vérité", "single source of truth", "unica fonte di verità"),
      },
      { value: "auto", label: tri("issues générées", "issues generated", "issue generate") },
      { value: "CLI", label: tri("zéro UI requise", "no UI required", "nessuna UI richiesta") },
    ],
  },
];
