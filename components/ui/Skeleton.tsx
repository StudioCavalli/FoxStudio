import type { CSSProperties } from "react";

/**
 * Skeleton primitives used by `loading.tsx` files across the App Router.
 *
 * Next.js renders the matching `loading.tsx` while the page segment is
 * suspending on data — so these placeholders are visible during real
 * waits (Payload/DB fetch), not as decorative animations. The pulse
 * effect (`.skeleton`) makes the loading state legible without faking
 * progress; it's neutralised under prefers-reduced-motion.
 *
 * Sizes are expressed in CSS values (px, %, rem, ch, var(...)) so each
 * skeleton can match the typographic rhythm of the real component.
 */

type SkeletonLineProps = {
  /** Width as a CSS value (e.g. `"60%"`, `"24ch"`, `"320px"`). */
  width?: string;
  /** Height as a CSS value. Defaults to a body-text line. */
  height?: string;
  className?: string;
};

export function SkeletonLine({
  width = "100%",
  height = "1em",
  className = "",
}: SkeletonLineProps) {
  return (
    <span
      aria-hidden
      className={`skeleton block ${className}`}
      style={{ width, height } as CSSProperties}
    />
  );
}

type SkeletonTextProps = {
  /** How many lines of body text to draw. */
  lines?: number;
  /** Optional max-width on the block. */
  maxWidth?: string;
  /** Spacing token between lines. */
  gap?: string;
  className?: string;
};

/**
 * Multi-line body-text placeholder. The last line is shorter to mimic
 * a real paragraph's ragged right edge.
 */
export function SkeletonText({
  lines = 3,
  maxWidth,
  gap = "var(--spacing-3)",
  className = "",
}: SkeletonTextProps) {
  return (
    <div aria-hidden className={`flex flex-col ${className}`} style={{ gap, maxWidth }}>
      {Array.from({ length: lines }, (_, i) => i).map((i) => (
        <SkeletonLine
          // Static placeholder rows generated from a deterministic length —
          // never reordered, so an index-based key is stable enough.
          key={`skel-line-${lines}-${i}`}
          width={i === lines - 1 ? "62%" : "100%"}
          height="1em"
        />
      ))}
    </div>
  );
}

type SkeletonBlockProps = {
  /** Aspect ratio CSS value (`"4 / 5"`, `"16 / 9"`, …). */
  aspect?: string;
  width?: string;
  height?: string;
  className?: string;
};

/**
 * Generic rectangular placeholder for an image or a card body.
 */
export function SkeletonBlock({
  aspect,
  width = "100%",
  height,
  className = "",
}: SkeletonBlockProps) {
  return (
    <div
      aria-hidden
      className={`skeleton ${className}`}
      style={{ width, height, aspectRatio: aspect } as CSSProperties}
    />
  );
}

/**
 * Mono-typographic header strip placeholder mirroring the
 * `SectionHeader` component (number ▸ label · meta).
 */
export function SkeletonSectionHeader({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`flex items-baseline justify-between border-t border-border pt-[var(--spacing-3)] ${className}`}
    >
      <SkeletonLine width="22ch" height="13px" />
      <SkeletonLine width="14ch" height="13px" />
    </div>
  );
}
