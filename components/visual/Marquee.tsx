/**
 * Infinite horizontal marquee. CSS-only animation, paused on hover and
 * disabled by prefers-reduced-motion. Children are duplicated once
 * to make the loop seamless.
 */

import type { ReactNode } from "react";

type MarqueeProps = {
  children: ReactNode;
  /** Animation duration. Bigger = slower. */
  durationSeconds?: number;
  /** Reverse direction (right-to-left by default). */
  reverse?: boolean;
  className?: string;
};

export function Marquee({
  children,
  durationSeconds = 40,
  reverse = false,
  className = "",
}: MarqueeProps) {
  const direction = reverse ? "reverse" : "normal";

  return (
    <div
      className={`marquee group relative flex w-full overflow-hidden ${className}`}
      data-direction={direction}
      style={
        {
          "--marquee-duration": `${durationSeconds}s`,
          "--marquee-direction": direction,
        } as React.CSSProperties
      }
    >
      <div className="marquee-track flex shrink-0 items-center gap-[var(--spacing-9)] py-[var(--spacing-5)]">
        {children}
      </div>
      <div
        aria-hidden="true"
        className="marquee-track flex shrink-0 items-center gap-[var(--spacing-9)] py-[var(--spacing-5)]"
      >
        {children}
      </div>
    </div>
  );
}
