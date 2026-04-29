/**
 * Mocked project data — used as fallback when the Payload CMS isn't
 * connected (e.g., CI build without DATABASE_URL). The shape mirrors
 * what a published Project document carries.
 *
 * In production these are seeded into Payload by scripts/seed.ts and
 * served from the database. The list below is kept in sync with that
 * seed so the public site renders identically with or without DB.
 */

export type MockProject = {
  id: string;
  number: string;
  slug: string;
  name: string;
  year: number;
  stack: string[];
  description: string;
  status: "live" | "wip" | "archived";
};

export const MOCK_PROJECTS: MockProject[] = [
  {
    id: "001",
    number: "001",
    slug: "nonno-robot",
    name: "NonnoRobot",
    description:
      "An AI-powered robotic chef cooking pizza and pasta from scratch — vision, motion planning and recipe generation in one stack.",
    year: 2026,
    status: "wip",
    stack: ["FastAPI", "ROS 2", "PyTorch", "Next.js 15", "Postgres", "Docker"],
  },
  {
    id: "002",
    number: "002",
    slug: "memoria",
    name: "Memoria",
    description:
      "Biographical AI for seniors 80+. Voice companion that gathers life memories, sends a weekly Gazette to families, and watches for early cognitive decline signals.",
    year: 2026,
    status: "live",
    stack: ["FastAPI", "Postgres", "React Native", "Next.js 15", "Tailwind v4"],
  },
  {
    id: "003",
    number: "003",
    slug: "kidverse",
    name: "Kidverse",
    description:
      "Phygital app for kids 3–15 that rewards them when they put down the phone and act in the real world. Quests, AI companion, parent dashboard.",
    year: 2026,
    status: "wip",
    stack: ["React Native", "Expo", "NestJS", "Apollo Router", "Claude"],
  },
  {
    id: "004",
    number: "004",
    slug: "flov",
    name: "Flov.",
    description:
      "Music & video streaming platform built in Cannes. No ads, no tracking, no compromise.",
    year: 2026,
    status: "live",
    stack: ["Laravel 13", "React 19", "TypeScript", "MIT"],
  },
  {
    id: "005",
    number: "005",
    slug: "ombrys",
    name: "Ombrys",
    description:
      "A documented-truth collective. Investigative platform for citizens and journalists — long-form, verifiable, transparent.",
    year: 2026,
    status: "live",
    stack: ["Next.js", "TypeScript", "Sanity"],
  },
  {
    id: "006",
    number: "006",
    slug: "clayr",
    name: "Clayr",
    description:
      "A digital cosmic refuge. Quotes, texts, music, AI companion, immersive therapy — a space to inspire, create and reconnect.",
    year: 2026,
    status: "live",
    stack: ["Next.js 16", "Supabase", "Tailwind v4", "TypeScript"],
  },
  {
    id: "007",
    number: "007",
    slug: "foxcube",
    name: "FoxCube",
    description:
      "Multilingual e-commerce for an Italian embroidery import/export house. Variant-aware catalog, embroidery customisation, multi-currency checkout.",
    year: 2026,
    status: "live",
    stack: ["Laravel 12", "Tailwind v4", "PHP 8.4", "Stripe", "Docker"],
  },
  {
    id: "008",
    number: "008",
    slug: "moes-coffee",
    name: "Moe's Coffee",
    description:
      "Springfield's finest, au gramme près. A serious e-commerce skin wrapped in the universe of Moe Szyslak — built as a stress test of the stack.",
    year: 2026,
    status: "live",
    stack: ["React Router v7", "TypeScript 5.9", "Tailwind v4", "SQLite", "Drizzle"],
  },
  {
    id: "009",
    number: "009",
    slug: "klown",
    name: "Klown",
    description:
      "Cross-platform desktop framework for authorised ethical hacking and security research. Strict legal scope, audit logging, sandboxed modules.",
    year: 2025,
    status: "archived",
    stack: ["TypeScript", "Electron", "Rust", "Node.js"],
  },
  {
    id: "010",
    number: "010",
    slug: "klown-network",
    name: "Klown Network",
    description:
      "Community platform for the Klown ecosystem — social layer, content hub, identity service.",
    year: 2025,
    status: "wip",
    stack: ["Next.js", "TypeScript", "MongoDB"],
  },
  {
    id: "011",
    number: "011",
    slug: "klown-vitrine",
    name: "Klown Vitrine",
    description:
      "Public-facing showcase for the Klown brand and product line — narrative-led, motion-light, server-rendered.",
    year: 2025,
    status: "archived",
    stack: ["Next.js", "TypeScript", "Tailwind"],
  },
  {
    id: "012",
    number: "012",
    slug: "foxcard",
    name: "FoxCard",
    description:
      "Card-shaped roadmap and issue planner. Generates GitHub issues from a single source-of-truth markdown roadmap.",
    year: 2025,
    status: "archived",
    stack: ["TypeScript", "GitHub CLI", "Markdown"],
  },
];
