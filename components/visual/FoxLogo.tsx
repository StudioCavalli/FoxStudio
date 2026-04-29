/**
 * FoxStudio mark — geometric fox head with negative-space eyes.
 *
 * Single composite path in `currentColor` so the mark inherits the
 * surrounding text colour (works in both dark and inverted sections).
 * `fillRule="evenodd"` punches the eyes out as holes, no second-colour
 * needed — keeps the mark legible on every background.
 *
 *   ▲     ▲    pointed ears (sharp peaks)
 *   \\ V //    pronounced forehead V
 *    \   /     cheeks angle inward
 *    ◣ ◢      eye slashes (negative space)
 *     V       snout / chin
 *
 * ViewBox 32×32, comfortable padding (subject sits inside an 8–24 box)
 * so the mark holds at small sizes (16-20 px header use).
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
      fill="currentColor"
      fillRule="evenodd"
      role={decorative ? "presentation" : "img"}
      aria-hidden={decorative ? "true" : undefined}
      aria-label={label}
      className={className}
    >
      {label && <title>{label}</title>}
      <path
        d="
          M 8 3 L 12 11 L 16 7 L 20 11 L 24 3 L 27 11 L 24 18 L 16 28 L 8 18 L 5 11 Z
          M 11 15 L 13.5 16 L 11.5 16.6 Z
          M 21 15 L 18.5 16 L 20.5 16.6 Z
        "
      />
    </svg>
  );
}
