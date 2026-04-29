/**
 * Seed data for the Lab — 6 ongoing experiments anchored in the StudioCavalli
 * stack. Each experiment has a code, localized name + summary, state, tags,
 * and an optional source/demo URL.
 */

import type { Locale } from "./projects";

export type LabExperimentSeed = {
  code: string;
  name: Record<Locale, string>;
  summary: Record<Locale, string>;
  state: "live" | "wip" | "archived";
  tags: { tag: string }[];
  startedAt: string; // ISO date (yyyy-mm-dd)
  sourceUrl?: string;
  demoUrl?: string;
};

const tri = (fr: string, en: string, it: string): Record<Locale, string> => ({ fr, en, it });

export const LAB_EXPERIMENTS: LabExperimentSeed[] = [
  {
    code: "exp_001",
    name: tri("LLM client à 14 ko", "Edge LLM at 14 ko", "LLM edge a 14 ko"),
    summary: tri(
      "Inférence d'un petit LLM entièrement côté client. Pas d'appel serveur, ONNX runtime + WebGPU pour les laptops d'entrée de gamme.",
      "Running a small LLM entirely on the client. No server call, ONNX runtime + WebGPU on entry-level laptops.",
      "Inferenza di un piccolo LLM interamente lato client. Nessuna chiamata al server, ONNX runtime + WebGPU su laptop entry-level.",
    ),
    state: "live",
    tags: [{ tag: "edge" }, { tag: "ai" }, { tag: "webgpu" }],
    startedAt: "2026-02-04",
  },
  {
    code: "exp_002",
    name: tri(
      "Pipeline de rendu WebGPU",
      "WebGPU compute pipeline",
      "Pipeline di rendering WebGPU",
    ),
    summary: tri(
      "Renderer différé monochrome physiquement plausible, ciblant les laptops d'il y a 5 ans. Compute shaders WGSL, pas de shaders graphiques.",
      "Monochrome physically-based deferred renderer, targeting 5-year-old laptops. WGSL compute shaders, no graphics shaders.",
      "Renderer deferred monocromatico fisicamente plausibile, mirato a laptop di 5 anni fa. Compute shader WGSL, niente graphics shader.",
    ),
    state: "live",
    tags: [{ tag: "webgpu" }, { tag: "perf" }, { tag: "3d" }],
    startedAt: "2026-03-12",
  },
  {
    code: "exp_003",
    name: tri(
      "Détection vocale du déclin cognitif",
      "Voice cognitive screening",
      "Screening cognitivo vocale",
    ),
    summary: tri(
      "Algorithmes de détection de signaux faibles (rythme, vocabulaire, hésitations) à partir de conversations naturelles. Bras technique de Memoria.",
      "Detection algorithms for weak signals (pace, vocabulary, hesitations) from natural conversations. Technical arm of Memoria.",
      "Algoritmi di rilevamento di segnali deboli (ritmo, vocabolario, esitazioni) a partire da conversazioni naturali. Braccio tecnico di Memoria.",
    ),
    state: "wip",
    tags: [{ tag: "ai" }, { tag: "health" }, { tag: "voice" }],
    startedAt: "2026-04-02",
    sourceUrl: "https://github.com/StudioCavalli/Memoria",
  },
  {
    code: "exp_004",
    name: tri(
      "Boucle de récompense phygitale",
      "Phygital reward loop",
      "Ciclo di ricompensa phygital",
    ),
    summary: tri(
      "Moteur de validation des quêtes du monde réel — capteurs téléphone, photo, audio, géoloc — qui récompense l'enfant quand il pose l'écran. Bras technique de Kidverse.",
      "Real-world quest validation engine — phone sensors, photo, audio, geofencing — that rewards the kid for putting the screen down. Technical arm of Kidverse.",
      "Motore di validazione delle missioni del mondo reale — sensori del telefono, foto, audio, geolocalizzazione — che ricompensa il bambino quando posa lo schermo. Braccio tecnico di Kidverse.",
    ),
    state: "wip",
    tags: [{ tag: "phygital" }, { tag: "kids" }, { tag: "ml" }],
    startedAt: "2026-04-15",
  },
  {
    code: "exp_005",
    name: tri(
      "Routage edge à faible empreinte",
      "Carbon-aware edge routing",
      "Routing edge a bassa impronta",
    ),
    summary: tri(
      "Edge function qui choisit dynamiquement la région la moins carbonée pour servir une requête, en lisant les flux d'intensité électrique en temps réel.",
      "Edge function that dynamically picks the lowest-carbon region to serve a request, by reading live electrical-grid intensity feeds.",
      "Edge function che sceglie dinamicamente la regione a minor impatto carbonico per servire una richiesta, leggendo i flussi di intensità elettrica in tempo reale.",
    ),
    state: "wip",
    tags: [{ tag: "edge" }, { tag: "eco" }, { tag: "infrastructure" }],
    startedAt: "2026-04-20",
  },
  {
    code: "exp_006",
    name: tri(
      "Moteur de patterns procéduraux",
      "Procedural pattern engine",
      "Motore di pattern procedurali",
    ),
    summary: tri(
      "Patterns SVG monochromes déterministes à partir d'une seed string — 8 variantes (grille CAD, halftone, lignes, contours, hachures, points, concentriques, échiquier). Utilisé dans ce site.",
      "Deterministic monochrome SVG patterns from a seed string — 8 variants (CAD grid, halftone, lines, contour, hatch, dots, concentric, checker). Used on this site.",
      "Pattern SVG monocromatici deterministici da una seed string — 8 varianti (griglia CAD, halftone, linee, contour, hatch, punti, concentrici, scacchiera). Usati in questo sito.",
    ),
    state: "live",
    tags: [{ tag: "design" }, { tag: "svg" }, { tag: "tools" }],
    startedAt: "2026-04-28",
    sourceUrl: "https://github.com/StudioCavalli/FoxStudio",
  },
];
