/**
 * FoxStudio mark — geometric fox head, outline-only.
 *
 * Stroked instead of filled so the visual weight matches the mono
 * wordmark next to it (Geist Mono ~1 px stem at 13 px). At 20 px
 * render size, stroke-width 1.5 in a 32-unit viewBox renders at
 * ~0.94 px — same filament as the typography, no visual mass that
 * would overpower the text.
 *
 * `currentColor` so the mark inherits the surrounding text colour
 * (works in both dark and inverted sections). Eyes are tiny filled
 * dots to add presence without re-introducing solid mass.
 *
 *   ▲     ▲    pointed ears (sharp peaks)
 *   \\ V //    pronounced forehead V
 *    \   /     cheeks angle inward
 *     V       snout / chin
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
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
      strokeLinecap="round"
      role={decorative ? "presentation" : "img"}
      aria-hidden={decorative ? "true" : undefined}
      aria-label={label}
      className={className}
    >
      {label && <title>{label}</title>}
      <path d="M 8 3 L 12 11 L 16 7 L 20 11 L 24 3 L 27 11 L 24 18 L 16 28 L 8 18 L 5 11 Z" />
      <circle cx="12.5" cy="15.5" r="0.6" fill="currentColor" stroke="none" />
      <circle cx="19.5" cy="15.5" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}
