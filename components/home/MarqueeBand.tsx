import { Marquee } from "@/components/visual/Marquee";

const KEYWORDS = [
  "WebGPU",
  "Edge AI",
  "Next.js 15",
  "React 19",
  "Three.js",
  "Payload v3",
  "TypeScript",
  "Rust + WASM",
  "WebHID",
  "Postgres",
  "Tailwind v4",
  "Turbopack",
];

export function MarqueeBand() {
  return (
    <div className="border-y border-border">
      <Marquee durationSeconds={50}>
        {KEYWORDS.map((keyword) => (
          <span
            key={keyword}
            className="flex items-center gap-[var(--spacing-9)] font-[var(--font-display)] text-[var(--text-display-m)] leading-none tracking-[var(--tracking-display)] text-fg-secondary md:text-[clamp(48px,6vw,96px)]"
          >
            <span aria-hidden className="text-fg-tertiary">
              ◇
            </span>
            <span className="hover:text-fg">{keyword}</span>
          </span>
        ))}
      </Marquee>
    </div>
  );
}
