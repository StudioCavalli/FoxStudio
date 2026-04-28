/**
 * Mocked project data — used until Payload CMS is wired in J3.
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
    slug: "edge-inference",
    name: "Edge inference at 14 ko",
    year: 2026,
    stack: ["TS", "WebGPU", "ONNX"],
    description: "On-device LLM running entirely client-side. No server call.",
    status: "live",
  },
  {
    id: "002",
    number: "002",
    slug: "haptic-mesh",
    name: "Haptic mesh prototype",
    year: 2026,
    stack: ["Rust", "WASM", "WebHID"],
    description: "Force-feedback grid driving consumer-grade haptic devices.",
    status: "live",
  },
  {
    id: "003",
    number: "003",
    slug: "render-pipe",
    name: "Render pipe — WebGPU",
    year: 2025,
    stack: ["TS", "WGSL", "R3F"],
    description: "Custom deferred renderer for monochrome physically-based scenes.",
    status: "live",
  },
  {
    id: "004",
    number: "004",
    slug: "spatial-router",
    name: "Spatial router",
    year: 2025,
    stack: ["TS", "Rust", "Edge"],
    description: "Content delivery routed by spatial proximity, not network topology.",
    status: "wip",
  },
];
