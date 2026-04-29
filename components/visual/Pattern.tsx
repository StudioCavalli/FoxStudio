/**
 * Procedural monochrome SVG patterns.
 *
 * Each pattern is deterministic — same seed → same render. The seed is
 * usually a slug or id, so a project keeps its identity across reloads
 * and locales. Patterns are stateless React components, server-renderable,
 * with the foreground colour inherited from `currentColor`.
 *
 * Eight variants, picked deterministically by hashing the seed.
 * Adding a 9th: append to PATTERNS, the hash modulo handles the rest.
 */

type PatternVariant =
  | "grid"
  | "halftone"
  | "lines"
  | "contour"
  | "hatch"
  | "dots"
  | "concentric"
  | "checker";

const VARIANTS: PatternVariant[] = [
  "grid",
  "halftone",
  "lines",
  "contour",
  "hatch",
  "dots",
  "concentric",
  "checker",
];

function hash(seed: string): number {
  let h = 5381;
  for (let i = 0; i < seed.length; i++) h = (h * 33) ^ seed.charCodeAt(i);
  return h >>> 0;
}

function variantFor(seed: string): PatternVariant {
  return VARIANTS[hash(seed) % VARIANTS.length] ?? "grid";
}

export type PatternProps = {
  seed: string;
  /** Override the auto-picked variant. */
  variant?: PatternVariant;
  className?: string;
};

export function Pattern({ seed, variant, className = "" }: PatternProps) {
  const v = variant ?? variantFor(seed);
  const h = hash(seed);

  return (
    <div
      className={`relative h-full w-full overflow-hidden ${className}`}
      data-pattern={v}
      aria-hidden="true"
    >
      <svg viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice" className="h-full w-full">
        <title>Decorative pattern</title>
        {v === "grid" && <Grid h={h} />}
        {v === "halftone" && <Halftone h={h} />}
        {v === "lines" && <Lines h={h} />}
        {v === "contour" && <Contour h={h} />}
        {v === "hatch" && <Hatch h={h} />}
        {v === "dots" && <Dots h={h} />}
        {v === "concentric" && <Concentric h={h} />}
        {v === "checker" && <Checker h={h} />}
      </svg>
    </div>
  );
}

/* ─── Variant implementations ─────────────────────────────────────── */

function Grid({ h }: { h: number }) {
  const step = 8 + (h % 6); // 8–13
  return (
    <g stroke="currentColor" strokeWidth="0.5" opacity="0.5" fill="none">
      <title>Grid</title>
      {Array.from({ length: Math.ceil(200 / step) + 1 }, (_, i) => (
        <line key={`v-${i}`} x1={i * step} y1={0} x2={i * step} y2={200} />
      ))}
      {Array.from({ length: Math.ceil(200 / step) + 1 }, (_, i) => (
        <line key={`h-${i}`} x1={0} y1={i * step} x2={200} y2={i * step} />
      ))}
      <g stroke="currentColor" strokeWidth="1.5" opacity="1">
        <line x1={0} y1={(h % 9) * step} x2={200} y2={(h % 9) * step} />
        <line x1={((h >> 4) % 9) * step} y1={0} x2={((h >> 4) % 9) * step} y2={200} />
      </g>
    </g>
  );
}

function Halftone({ h }: { h: number }) {
  const cells = 14;
  const step = 200 / cells;
  return (
    <g fill="currentColor">
      <title>Halftone</title>
      {Array.from({ length: cells * cells }, (_, i) => {
        const x = (i % cells) * step + step / 2;
        const y = Math.floor(i / cells) * step + step / 2;
        const dx = (x - 100) / 100;
        const dy = (y - 100) / 100;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const r = Math.max(0.4, (1 - dist) * (step / 2.4) + ((h >> (i % 16)) & 1));
        return <circle key={i} cx={x} cy={y} r={r > 0 ? r : 0.5} />;
      })}
    </g>
  );
}

function Lines({ h }: { h: number }) {
  const angle = (h % 90) - 45;
  const count = 18;
  return (
    <g stroke="currentColor" strokeWidth="1" fill="none">
      <title>Lines</title>
      <g transform={`rotate(${angle} 100 100)`}>
        {Array.from({ length: count }, (_, i) => {
          const y = (i / count) * 280 - 40;
          const opacity = 0.2 + ((h >> i) & 1) * 0.7;
          return (
            <line
              key={i}
              x1={-50}
              y1={y}
              x2={250}
              y2={y}
              opacity={opacity}
              strokeWidth={(i % 4 === 0 ? 1.6 : 0.6).toString()}
            />
          );
        })}
      </g>
    </g>
  );
}

function Contour({ h }: { h: number }) {
  const cx = 80 + (h % 60);
  const cy = 60 + ((h >> 4) % 60);
  return (
    <g stroke="currentColor" fill="none" strokeWidth="0.7">
      <title>Contour</title>
      {Array.from({ length: 12 }, (_, i) => {
        const r = (i + 1) * 12;
        const offset = ((h >> i) & 1) * 2;
        return (
          <ellipse
            key={i}
            cx={cx + offset}
            cy={cy - offset}
            rx={r}
            ry={r * (0.7 + ((h >> (i * 2)) & 3) * 0.05)}
            opacity={0.3 + (i / 12) * 0.5}
          />
        );
      })}
    </g>
  );
}

function Hatch({ h }: { h: number }) {
  const angle = (h % 60) - 30;
  return (
    <g stroke="currentColor" strokeWidth="0.6">
      <title>Hatching</title>
      <g transform={`rotate(${angle} 100 100)`}>
        {Array.from({ length: 60 }, (_, i) => {
          const y = -50 + i * 5;
          const length = 40 + ((h >> i) & 7) * 20;
          const x = -20 + ((h >> (i * 2)) & 15) * 12;
          return <line key={i} x1={x} y1={y} x2={x + length} y2={y} />;
        })}
      </g>
    </g>
  );
}

function Dots({ h }: { h: number }) {
  const cells = 16;
  const step = 200 / cells;
  return (
    <g fill="currentColor">
      <title>Dots</title>
      {Array.from({ length: cells * cells }, (_, i) => {
        const filled = ((h >> (i % 32)) ^ (h >> (i % 7))) & 1;
        if (!filled) return null;
        const x = (i % cells) * step + step / 2;
        const y = Math.floor(i / cells) * step + step / 2;
        return <circle key={i} cx={x} cy={y} r={1.6} />;
      })}
    </g>
  );
}

function Concentric({ h }: { h: number }) {
  const cx = 100;
  const cy = 100;
  return (
    <g stroke="currentColor" fill="none" strokeWidth="1">
      <title>Concentric</title>
      {Array.from({ length: 14 }, (_, i) => {
        const r = (i + 1) * 9;
        const dash = (h >> i) & 1 ? "4 4" : "none";
        return (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r={r}
            strokeDasharray={dash}
            opacity={0.3 + (i / 14) * 0.6}
          />
        );
      })}
      <line x1={0} y1={cy} x2={200} y2={cy} strokeWidth="0.4" opacity="0.6" />
      <line x1={cx} y1={0} x2={cx} y2={200} strokeWidth="0.4" opacity="0.6" />
    </g>
  );
}

function Checker({ h }: { h: number }) {
  const cells = 10;
  const step = 200 / cells;
  return (
    <g fill="currentColor">
      <title>Checker</title>
      {Array.from({ length: cells * cells }, (_, i) => {
        const x = i % cells;
        const y = Math.floor(i / cells);
        const fill = (x + y + ((h >> ((x * y) % 16)) & 1)) % 2;
        if (!fill) return null;
        return (
          <rect
            key={i}
            x={x * step}
            y={y * step}
            width={step}
            height={step}
            opacity={0.85 - ((h >> (i % 8)) & 1) * 0.4}
          />
        );
      })}
    </g>
  );
}
