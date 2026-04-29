/**
 * Seed data for the Lab — discrete R&D experiments published as standalone
 * technical investigations. Each one has a clear demonstrable hypothesis,
 * a measurable outcome, and stands on its own (no "technical arm of project X"
 * — that's what the project pages are for).
 *
 * State distribution mirrors a working lab: a few proven (live), most in
 * motion (wip), one archived to keep the trace.
 */

import type { Locale } from "./projects";

export type LabExperimentSeed = {
  code: string;
  name: Record<Locale, string>;
  summary: Record<Locale, string>;
  state: "live" | "wip" | "archived";
  tags: { tag: string }[];
  startedAt: string; // ISO yyyy-mm-dd
  sourceUrl?: string;
  demoUrl?: string;
};

const tri = (fr: string, en: string, it: string): Record<Locale, string> => ({ fr, en, it });

export const LAB_EXPERIMENTS: LabExperimentSeed[] = [
  {
    code: "exp_001",
    name: tri("LLM client à 14 ko", "Edge LLM at 14 ko", "LLM edge a 14 ko"),
    summary: tri(
      "Inférence d'un petit modèle entièrement côté client. Aucun appel serveur, ONNX runtime + WebGPU sur des laptops d'entrée de gamme. Cible : réponse en moins de 800 ms sur un ThinkPad de 2019.",
      "Inference of a small model fully client-side. No server call, ONNX runtime + WebGPU on entry-level laptops. Target: under 800 ms response on a 2019 ThinkPad.",
      "Inferenza di un piccolo modello interamente lato client. Nessuna chiamata al server, ONNX runtime + WebGPU su laptop di fascia bassa. Obiettivo: risposta sotto 800 ms su un ThinkPad del 2019.",
    ),
    state: "live",
    tags: [{ tag: "edge" }, { tag: "ai" }, { tag: "webgpu" }],
    startedAt: "2026-02-04",
  },

  {
    code: "exp_002",
    name: tri(
      "Renderer WebGPU monochrome",
      "Monochrome WebGPU renderer",
      "Renderer WebGPU monocromatico",
    ),
    summary: tri(
      "Pipeline de rendu différé physiquement plausible, écrit en compute shaders WGSL — pas de pipeline graphique classique. Cible : 60 fps sur une iGPU de 2020 en 1080p.",
      "Physically-based deferred rendering pipeline, written in WGSL compute shaders — no classic graphics pipeline. Target: 60 fps on a 2020 iGPU at 1080p.",
      "Pipeline di rendering deferred fisicamente plausibile, scritta in compute shader WGSL — niente pipeline grafica classica. Obiettivo: 60 fps su una iGPU del 2020 a 1080p.",
    ),
    state: "live",
    tags: [{ tag: "webgpu" }, { tag: "perf" }, { tag: "3d" }],
    startedAt: "2026-03-12",
  },

  {
    code: "exp_003",
    name: tri(
      "Empreinte vocale cognitive",
      "Vocal cognitive fingerprint",
      "Impronta vocale cognitiva",
    ),
    summary: tri(
      "Algorithmes de détection de signaux faibles (rythme, lexique, hésitations) à partir de conversations naturelles, sans transcription. Bench sur 200 h de corpus public, hors ligne.",
      "Algorithms detecting weak signals (pace, lexicon, hesitations) from natural conversations, transcription-free. Benchmark on 200 hours of public corpus, fully offline.",
      "Algoritmi di rilevamento di segnali deboli (ritmo, lessico, esitazioni) da conversazioni naturali, senza trascrizione. Benchmark su 200 ore di corpus pubblico, offline.",
    ),
    state: "wip",
    tags: [{ tag: "ai" }, { tag: "voice" }, { tag: "health" }],
    startedAt: "2026-04-02",
  },

  {
    code: "exp_004",
    name: tri("Validateur phygital", "Phygital quest validator", "Validatore phygital"),
    summary: tri(
      "Moteur de validation des actions du monde réel par fusion de capteurs (caméra, micro, accéléromètre, géoloc). On vérifie que l'utilisateur a vraiment fait ce qu'il prétend, sans tracking persistant.",
      "Real-world action validator via sensor fusion (camera, mic, accelerometer, geolocation). Verifies the user actually did what they claim, with zero persistent tracking.",
      "Validatore di azioni del mondo reale tramite sensor fusion (camera, microfono, accelerometro, geolocalizzazione). Verifica che l'utente abbia davvero fatto ciò che dichiara, senza tracking persistente.",
    ),
    state: "wip",
    tags: [{ tag: "phygital" }, { tag: "ml" }, { tag: "privacy" }],
    startedAt: "2026-04-15",
  },

  {
    code: "exp_005",
    name: tri(
      "Routage edge bas-carbone",
      "Carbon-aware edge routing",
      "Routing edge a basse emissioni",
    ),
    summary: tri(
      "Edge function qui choisit dynamiquement la région la moins carbonée pour servir une requête, en lisant les flux d'intensité électrique en temps réel (RTE, ENTSO-E, NESO).",
      "Edge function that dynamically picks the lowest-carbon region to serve a request, by reading live electrical-grid intensity feeds (RTE, ENTSO-E, NESO).",
      "Edge function che sceglie dinamicamente la regione a minor impatto carbonico per servire una richiesta, leggendo i flussi di intensità elettrica in tempo reale (RTE, ENTSO-E, NESO).",
    ),
    state: "wip",
    tags: [{ tag: "edge" }, { tag: "eco" }, { tag: "infra" }],
    startedAt: "2026-04-20",
  },

  {
    code: "exp_006",
    name: tri("Synchro CRDT local-first", "Local-first CRDT sync", "Sync CRDT local-first"),
    summary: tri(
      "Collaboration en temps réel sur un document partagé, sans serveur d'autorité. WebRTC + Yjs, résolution de conflit déterministe, fonctionne hors-ligne par défaut.",
      "Real-time collaboration on a shared document with no authority server. WebRTC + Yjs, deterministic conflict resolution, offline-by-default.",
      "Collaborazione in tempo reale su un documento condiviso, senza server di autorità. WebRTC + Yjs, risoluzione conflitti deterministica, offline by default.",
    ),
    state: "live",
    tags: [{ tag: "p2p" }, { tag: "crdt" }, { tag: "offline" }],
    startedAt: "2026-01-15",
  },

  {
    code: "exp_007",
    name: tri("Landing < 8 ko, zéro JS", "Landing under 8 ko, zero JS", "Landing < 8 ko, zero JS"),
    summary: tri(
      "Page d'atterrissage premium en HTML + CSS uniquement, transferrée en moins de 8 kilo-octets gzip. Animations CSS scroll-driven, formulaires natifs, web components seulement si vital.",
      "Premium landing page in HTML + CSS only, shipped under 8 kilobytes gzipped. Scroll-driven CSS animations, native forms, web components only if vital.",
      "Landing page premium in solo HTML + CSS, sotto gli 8 kilobyte gzippati. Animazioni CSS scroll-driven, form nativi, web component solo se essenziali.",
    ),
    state: "live",
    tags: [{ tag: "perf" }, { tag: "platform" }, { tag: "minimal" }],
    startedAt: "2025-12-08",
  },

  {
    code: "exp_008",
    name: tri(
      "Graphe d'investigation sourcé",
      "Source-cited investigation graph",
      "Grafo d'indagine con fonti citate",
    ),
    summary: tri(
      "Représentation d'une enquête comme un graphe orienté de sources, faits, hypothèses et contradictions. Chaque arête est tracée à un document. Précurseur de l'architecture Ombrys.",
      "Representing an investigation as a directed graph of sources, facts, hypotheses and contradictions. Every edge is traced to a document. Precursor to the Ombrys architecture.",
      "Rappresentazione di un'indagine come grafo diretto di fonti, fatti, ipotesi e contraddizioni. Ogni arco è tracciato a un documento. Precursore dell'architettura Ombrys.",
    ),
    state: "archived",
    tags: [{ tag: "data" }, { tag: "journalism" }, { tag: "graph" }],
    startedAt: "2025-09-04",
  },
];
