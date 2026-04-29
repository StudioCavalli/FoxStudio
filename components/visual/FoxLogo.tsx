/**
 * FoxStudio mark — a minimal geometric fox head.
 *
 * Single-path silhouette in `currentColor` so the mark inherits the
 * surrounding text colour (works in both dark and inverted sections).
 * No fur, no eyes — pure brutalist geometry, in line with the rest of
 * the visual language (mono labels, blueprint grid, sharp section
 * dividers).
 *
 *   ▲   ▲          ears = two pointed triangles
 *    \V/           forehead notch
 *    | |           cheeks
 *     V            snout / chin
 */

type FoxLogoProps = {
  className?: string;
  /** ARIA label for screen readers. Falls back to decorative if omitted. */
  label?: string;
};

export function FoxLogo({ className = "", label }: FoxLogoProps) {
  const decorative = !label;
  return (
    <svg
      viewBox="0 0 28 28"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      strokeLinejoin="round"
      strokeLinecap="round"
      role={decorative ? "presentation" : "img"}
      aria-hidden={decorative ? "true" : undefined}
      aria-label={label}
      className={className}
    >
      {label && <title>{label}</title>}
      <path d="M7 3 L11 12 L14 10 L17 12 L21 3 L23 13 L20 18 L14 25 L8 18 L5 13 Z" />
    </svg>
  );
}
