/**
 * Per-project system architecture diagrams.
 *
 * Each entry describes a small graph of nodes (services, clients, storage, …)
 * and the edges connecting them, with i18n labels. Rendered by
 * `components/visual/Architecture.tsx` as a black-and-white SVG schematic
 * inside the project page, replacing the previous decorative dot pattern.
 *
 * Layout grid : 12 columns × 6 rows. Each node specifies its `col`/`row`
 * position (top-left of the cell). `w` controls width in columns (default 3).
 *
 * Roles map to subtle visual treatments (border style, badge):
 *   client   — end-user devices / front-ends
 *   device   — physical hardware (robot, sensor, kiosk)
 *   server   — application servers
 *   service  — focused services (ML, transcription, payment, …)
 *   storage  — databases, buckets
 *   edge     — CDN / edge / gateway / scheduled job
 *   external — third-party API
 */

import type { Locale } from "@/lib/site";

type Tri = Record<Locale, string>;

export type ArchRole = "client" | "device" | "server" | "service" | "storage" | "edge" | "external";

export type ArchNode = {
  id: string;
  label: Tri;
  role: ArchRole;
  col: number;
  row: number;
  w?: number;
};

export type ArchEdge = {
  from: string;
  to: string;
  label?: Tri;
  /** solid (default) | dashed (async) | dotted (data flow) */
  kind?: "sync" | "async" | "data";
};

export type Architecture = {
  nodes: ArchNode[];
  edges: ArchEdge[];
};

const tri = (fr: string, en: string, it: string): Tri => ({ fr, en, it });

export const ARCHITECTURES: Record<string, Architecture> = {
  // 001 — NonnoRobot (robotic kneading)
  "nonno-robot": {
    nodes: [
      {
        id: "recipes",
        label: tri("Recettes", "Recipes", "Ricette"),
        role: "storage",
        col: 0,
        row: 1,
      },
      {
        id: "arm",
        label: tri("Bras · ROS2", "Arm · ROS2", "Braccio · ROS2"),
        role: "device",
        col: 4,
        row: 1,
      },
      {
        id: "vision",
        label: tri("Caméra · OpenCV", "Camera · OpenCV", "Camera · OpenCV"),
        role: "device",
        col: 4,
        row: 4,
      },
      {
        id: "ml",
        label: tri("Classifier ML", "ML classifier", "Classificatore ML"),
        role: "service",
        col: 8,
        row: 4,
      },
      {
        id: "api",
        label: tri("FastAPI · télémétrie", "FastAPI · telemetry", "FastAPI · telemetria"),
        role: "server",
        col: 8,
        row: 1,
      },
    ],
    edges: [
      {
        from: "recipes",
        to: "arm",
        label: tri("courbe pétrissage", "kneading curve", "curva impasto"),
      },
      { from: "vision", to: "ml", label: tri("frames", "frames", "frame"), kind: "data" },
      {
        from: "ml",
        to: "arm",
        label: tri("couple · vitesse", "torque · speed", "coppia · velocità"),
        kind: "async",
      },
      { from: "arm", to: "api", label: tri("logs · états", "logs · states", "log · stati") },
    ],
  },

  // 002 — Memoria (biographic AI for seniors)
  memoria: {
    nodes: [
      {
        id: "tablet",
        label: tri("Tablette · React Native", "Tablet · React Native", "Tablet · React Native"),
        role: "client",
        col: 0,
        row: 0,
      },
      {
        id: "voice",
        label: tri("Whisper · transcription", "Whisper · transcription", "Whisper · trascrizione"),
        role: "service",
        col: 4,
        row: 0,
      },
      {
        id: "api",
        label: tri("FastAPI · pipeline", "FastAPI · pipeline", "FastAPI · pipeline"),
        role: "server",
        col: 4,
        row: 2,
      },
      {
        id: "db",
        label: tri("Postgres · souvenirs", "Postgres · memories", "Postgres · ricordi"),
        role: "storage",
        col: 8,
        row: 2,
      },
      {
        id: "sentinel",
        label: tri("Sentinelle cognitive", "Cognitive sentinel", "Sentinella cognitiva"),
        role: "service",
        col: 0,
        row: 4,
      },
      {
        id: "gazette",
        label: tri("Gazette · email", "Gazette · email", "Gazzetta · email"),
        role: "edge",
        col: 4,
        row: 4,
      },
      {
        id: "dashboard",
        label: tri(
          "Dashboard famille · Next.js",
          "Family dashboard · Next.js",
          "Dashboard famiglia · Next.js",
        ),
        role: "client",
        col: 8,
        row: 4,
      },
    ],
    edges: [
      {
        from: "tablet",
        to: "voice",
        label: tri("question vocale", "voice question", "domanda vocale"),
        kind: "async",
      },
      {
        from: "voice",
        to: "api",
        label: tri("transcription", "transcription", "trascrizione"),
        kind: "data",
      },
      { from: "api", to: "db" },
      {
        from: "api",
        to: "sentinel",
        label: tri("features audio", "audio features", "feature audio"),
        kind: "data",
      },
      {
        from: "sentinel",
        to: "dashboard",
        label: tri("alertes", "alerts", "alert"),
        kind: "async",
      },
      {
        from: "db",
        to: "gazette",
        label: tri("compilation hebdo", "weekly compile", "compilazione settimanale"),
      },
      { from: "db", to: "dashboard", label: tri("timeline", "timeline", "timeline") },
    ],
  },

  // 003 — Kidverse (educational platform)
  kidverse: {
    nodes: [
      {
        id: "pwa",
        label: tri("PWA enfant · Next.js", "Kid PWA · Next.js", "PWA bambini · Next.js"),
        role: "client",
        col: 0,
        row: 0,
      },
      {
        id: "parent",
        label: tri("Console parent", "Parent console", "Console genitore"),
        role: "client",
        col: 0,
        row: 4,
      },
      {
        id: "api",
        label: tri("API · Next.js", "API · Next.js", "API · Next.js"),
        role: "server",
        col: 4,
        row: 2,
      },
      {
        id: "redis",
        label: tri("Redis · sessions", "Redis · sessions", "Redis · sessioni"),
        role: "storage",
        col: 4,
        row: 0,
      },
      {
        id: "pg",
        label: tri("Postgres · cours", "Postgres · courses", "Postgres · corsi"),
        role: "storage",
        col: 8,
        row: 2,
      },
      {
        id: "s3",
        label: tri("S3 · assets", "S3 · assets", "S3 · asset"),
        role: "storage",
        col: 8,
        row: 0,
      },
      {
        id: "tutor",
        label: tri("Tuteur IA · LLM", "AI tutor · LLM", "Tutor IA · LLM"),
        role: "service",
        col: 4,
        row: 4,
      },
    ],
    edges: [
      {
        from: "pwa",
        to: "api",
        label: tri("auth · progress", "auth · progress", "auth · progresso"),
      },
      { from: "api", to: "redis" },
      { from: "api", to: "pg" },
      { from: "api", to: "s3", label: tri("médias", "media", "media"), kind: "data" },
      { from: "pwa", to: "tutor", label: tri("dialogue", "dialog", "dialogo"), kind: "async" },
      { from: "parent", to: "api" },
    ],
  },

  // 004 — Flov (Laravel + React)
  flov: {
    nodes: [
      {
        id: "web",
        label: tri("App React · Inertia", "React app · Inertia", "App React · Inertia"),
        role: "client",
        col: 0,
        row: 1,
      },
      {
        id: "laravel",
        label: tri("Laravel 13 · API", "Laravel 13 · API", "Laravel 13 · API"),
        role: "server",
        col: 4,
        row: 1,
      },
      {
        id: "queue",
        label: tri("Queue · Horizon", "Queue · Horizon", "Coda · Horizon"),
        role: "service",
        col: 4,
        row: 4,
      },
      {
        id: "mysql",
        label: tri("MySQL · données", "MySQL · data", "MySQL · dati"),
        role: "storage",
        col: 8,
        row: 1,
      },
      { id: "stripe", label: tri("Stripe", "Stripe", "Stripe"), role: "external", col: 8, row: 4 },
    ],
    edges: [
      { from: "web", to: "laravel" },
      { from: "laravel", to: "mysql" },
      { from: "laravel", to: "queue", label: tri("jobs", "jobs", "job"), kind: "async" },
      { from: "laravel", to: "stripe", label: tri("paiements", "payments", "pagamenti") },
    ],
  },

  // 005 — Ombrys (Sanity-driven studio site)
  ombrys: {
    nodes: [
      {
        id: "sanity",
        label: tri("Sanity · CMS", "Sanity · CMS", "Sanity · CMS"),
        role: "service",
        col: 0,
        row: 1,
      },
      {
        id: "next",
        label: tri("Next.js · ISR", "Next.js · ISR", "Next.js · ISR"),
        role: "server",
        col: 4,
        row: 1,
      },
      {
        id: "edge",
        label: tri("Vercel Edge · CDN", "Vercel Edge · CDN", "Vercel Edge · CDN"),
        role: "edge",
        col: 8,
        row: 1,
      },
      {
        id: "browser",
        label: tri("Navigateur", "Browser", "Browser"),
        role: "client",
        col: 8,
        row: 4,
      },
      {
        id: "webhook",
        label: tri("Webhook · revalidate", "Webhook · revalidate", "Webhook · revalidate"),
        role: "edge",
        col: 4,
        row: 4,
      },
    ],
    edges: [
      { from: "sanity", to: "next", label: tri("GROQ", "GROQ", "GROQ"), kind: "data" },
      { from: "next", to: "edge" },
      { from: "edge", to: "browser" },
      { from: "sanity", to: "webhook", label: tri("publish", "publish", "publish"), kind: "async" },
      {
        from: "webhook",
        to: "next",
        label: tri("invalidate cache", "invalidate cache", "invalidate cache"),
        kind: "async",
      },
    ],
  },

  // 006 — Clayr (sustainable e-commerce)
  clayr: {
    nodes: [
      {
        id: "shop",
        label: tri("Boutique · Next.js", "Storefront · Next.js", "Boutique · Next.js"),
        role: "client",
        col: 0,
        row: 0,
      },
      {
        id: "admin",
        label: tri("Admin · Payload", "Admin · Payload", "Admin · Payload"),
        role: "client",
        col: 0,
        row: 4,
      },
      {
        id: "api",
        label: tri("Payload · API", "Payload · API", "Payload · API"),
        role: "server",
        col: 4,
        row: 2,
      },
      {
        id: "pg",
        label: tri("Postgres · catalogue", "Postgres · catalog", "Postgres · catalogo"),
        role: "storage",
        col: 8,
        row: 0,
      },
      {
        id: "s3",
        label: tri("S3 · médias", "S3 · media", "S3 · media"),
        role: "storage",
        col: 8,
        row: 2,
      },
      { id: "stripe", label: tri("Stripe", "Stripe", "Stripe"), role: "external", col: 8, row: 4 },
    ],
    edges: [
      { from: "shop", to: "api" },
      { from: "admin", to: "api" },
      { from: "api", to: "pg" },
      { from: "api", to: "s3", kind: "data" },
      { from: "shop", to: "stripe", label: tri("checkout", "checkout", "checkout") },
    ],
  },

  // 007 — FoxCube (3D config viewer)
  foxcube: {
    nodes: [
      {
        id: "viewer",
        label: tri("Viewer · React + R3F", "Viewer · React + R3F", "Viewer · React + R3F"),
        role: "client",
        col: 0,
        row: 1,
      },
      {
        id: "config",
        label: tri("Configurateur", "Configurator", "Configuratore"),
        role: "client",
        col: 0,
        row: 4,
      },
      {
        id: "api",
        label: tri("API · Node", "API · Node", "API · Node"),
        role: "server",
        col: 4,
        row: 2,
      },
      {
        id: "models",
        label: tri("S3 · modèles 3D", "S3 · 3D models", "S3 · modelli 3D"),
        role: "storage",
        col: 8,
        row: 1,
      },
      {
        id: "draco",
        label: tri("Pipeline Draco/KTX2", "Draco/KTX2 pipeline", "Pipeline Draco/KTX2"),
        role: "service",
        col: 8,
        row: 4,
      },
    ],
    edges: [
      { from: "viewer", to: "api" },
      { from: "config", to: "api" },
      { from: "api", to: "models" },
      {
        from: "models",
        to: "draco",
        label: tri("compress", "compress", "comprime"),
        kind: "async",
      },
      {
        from: "draco",
        to: "viewer",
        label: tri("glb optimisé", "optimised glb", "glb ottimizzato"),
        kind: "data",
      },
    ],
  },

  // 008 — Moe's Coffee (kiosk + back office)
  "moes-coffee": {
    nodes: [
      {
        id: "kiosk",
        label: tri("Kiosque · iPad", "Kiosk · iPad", "Chiosco · iPad"),
        role: "device",
        col: 0,
        row: 0,
      },
      {
        id: "barista",
        label: tri("Écran barista", "Barista screen", "Schermo barista"),
        role: "device",
        col: 0,
        row: 4,
      },
      {
        id: "api",
        label: tri("API · Node", "API · Node", "API · Node"),
        role: "server",
        col: 4,
        row: 2,
      },
      {
        id: "queue",
        label: tri("Queue · Redis", "Queue · Redis", "Coda · Redis"),
        role: "storage",
        col: 4,
        row: 4,
      },
      {
        id: "pg",
        label: tri("Postgres · ventes", "Postgres · sales", "Postgres · vendite"),
        role: "storage",
        col: 8,
        row: 2,
      },
      {
        id: "stripe",
        label: tri("Stripe Terminal", "Stripe Terminal", "Stripe Terminal"),
        role: "external",
        col: 8,
        row: 0,
      },
    ],
    edges: [
      { from: "kiosk", to: "api", label: tri("commande", "order", "ordine") },
      { from: "kiosk", to: "stripe", label: tri("CB sans contact", "tap to pay", "pagamento NFC") },
      { from: "api", to: "queue", kind: "async" },
      { from: "queue", to: "barista", label: tri("ticket", "ticket", "ticket"), kind: "async" },
      { from: "api", to: "pg" },
    ],
  },

  // 009 — Klown (desktop streaming control)
  klown: {
    nodes: [
      {
        id: "app",
        label: tri("Electron · UI", "Electron · UI", "Electron · UI"),
        role: "client",
        col: 0,
        row: 1,
      },
      {
        id: "rust",
        label: tri("Core Rust · capture", "Rust core · capture", "Core Rust · cattura"),
        role: "service",
        col: 4,
        row: 1,
      },
      {
        id: "node",
        label: tri("Node bridge", "Node bridge", "Bridge Node"),
        role: "service",
        col: 4,
        row: 4,
      },
      {
        id: "obs",
        label: tri("OBS · scenes", "OBS · scenes", "OBS · scene"),
        role: "external",
        col: 8,
        row: 1,
      },
      {
        id: "twitch",
        label: tri("Twitch API", "Twitch API", "Twitch API"),
        role: "external",
        col: 8,
        row: 4,
      },
    ],
    edges: [
      { from: "app", to: "rust", label: tri("IPC", "IPC", "IPC") },
      { from: "rust", to: "obs", label: tri("WebSocket", "WebSocket", "WebSocket") },
      { from: "app", to: "node" },
      {
        from: "node",
        to: "twitch",
        label: tri("chat · events", "chat · events", "chat · eventi"),
        kind: "async",
      },
    ],
  },

  // 010 — Klown Network (creator network)
  "klown-network": {
    nodes: [
      {
        id: "web",
        label: tri("Web · Next.js", "Web · Next.js", "Web · Next.js"),
        role: "client",
        col: 0,
        row: 1,
      },
      {
        id: "api",
        label: tri("API · Next.js", "API · Next.js", "API · Next.js"),
        role: "server",
        col: 4,
        row: 1,
      },
      {
        id: "mongo",
        label: tri("MongoDB · profils", "MongoDB · profiles", "MongoDB · profili"),
        role: "storage",
        col: 8,
        row: 0,
      },
      {
        id: "ws",
        label: tri("WebSocket · live", "WebSocket · live", "WebSocket · live"),
        role: "service",
        col: 4,
        row: 4,
      },
      {
        id: "twitch",
        label: tri("Twitch · helix", "Twitch · helix", "Twitch · helix"),
        role: "external",
        col: 8,
        row: 3,
      },
    ],
    edges: [
      { from: "web", to: "api" },
      { from: "api", to: "mongo" },
      {
        from: "api",
        to: "twitch",
        label: tri("OAuth · streams", "OAuth · streams", "OAuth · stream"),
      },
      { from: "ws", to: "web", label: tri("notifs", "notifs", "notifiche"), kind: "async" },
      { from: "twitch", to: "ws", kind: "async" },
    ],
  },

  // 011 — Klown Vitrine (showcase)
  "klown-vitrine": {
    nodes: [
      {
        id: "browser",
        label: tri("Navigateur", "Browser", "Browser"),
        role: "client",
        col: 0,
        row: 1,
      },
      {
        id: "edge",
        label: tri("Vercel Edge", "Vercel Edge", "Vercel Edge"),
        role: "edge",
        col: 4,
        row: 1,
      },
      {
        id: "next",
        label: tri("Next.js · SSG", "Next.js · SSG", "Next.js · SSG"),
        role: "server",
        col: 8,
        row: 1,
      },
      {
        id: "cms",
        label: tri("MDX · contenu", "MDX · content", "MDX · contenuto"),
        role: "storage",
        col: 8,
        row: 4,
      },
    ],
    edges: [
      { from: "browser", to: "edge" },
      { from: "edge", to: "next" },
      {
        from: "cms",
        to: "next",
        label: tri("build-time", "build-time", "build-time"),
        kind: "data",
      },
    ],
  },

  // 012 — Shark (cloud gaming)
  shark: {
    nodes: [
      {
        id: "client",
        label: tri("Electron · UI", "Electron · UI", "Electron · UI"),
        role: "client",
        col: 0,
        row: 0,
      },
      {
        id: "input",
        label: tri("Capture input · raw", "Raw input capture", "Cattura input · raw"),
        role: "service",
        col: 0,
        row: 3,
      },
      {
        id: "signal",
        label: tri("Socket.io · signaling", "Socket.io · signalling", "Socket.io · signalling"),
        role: "edge",
        col: 4,
        row: 0,
      },
      {
        id: "rtc",
        label: tri("WebRTC · media", "WebRTC · media", "WebRTC · media"),
        role: "edge",
        col: 4,
        row: 3,
      },
      {
        id: "server",
        label: tri("Serveur jeu · GPU", "Game server · GPU", "Server gioco · GPU"),
        role: "server",
        col: 8,
        row: 1,
      },
      {
        id: "regions",
        label: tri("EU · NA · Asie", "EU · NA · Asia", "EU · NA · Asia"),
        role: "edge",
        col: 8,
        row: 4,
      },
    ],
    edges: [
      { from: "client", to: "signal", label: tri("offer · ICE", "offer · ICE", "offer · ICE") },
      { from: "signal", to: "server" },
      {
        from: "input",
        to: "rtc",
        label: tri("data channel", "data channel", "data channel"),
        kind: "data",
      },
      {
        from: "rtc",
        to: "server",
        label: tri("video · audio", "video · audio", "video · audio"),
        kind: "async",
      },
      {
        from: "regions",
        to: "server",
        label: tri("latence min.", "min latency", "latenza min."),
        kind: "data",
      },
    ],
  },
};

export function getArchitecture(slug: string): Architecture | null {
  return ARCHITECTURES[slug] ?? null;
}
