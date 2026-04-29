"use client";

import { useEffect, useRef, useState } from "react";

type CounterProps = {
  to: number;
  /** Animation duration in ms. */
  durationMs?: number;
  /** Suffix appended after the number (e.g. "k", "%", "ms"). */
  suffix?: string;
  /** Number of decimal places. */
  decimals?: number;
  /** Format with thousands separator (en-US grouping by default). */
  separator?: string;
  className?: string;
};

/**
 * Animated number counter that triggers when scrolled into view.
 * One-shot: doesn't replay on scroll back. Respects prefers-reduced-motion
 * (renders the final value immediately).
 */
export function Counter({
  to,
  durationMs = 1600,
  suffix = "",
  decimals = 0,
  separator = " ",
  className = "",
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !ref.current) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setValue(to);
      setDone(true);
      return;
    }

    const node = ref.current;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !done) {
            const start = performance.now();
            const tick = (now: number) => {
              const elapsed = now - start;
              const t = Math.min(elapsed / durationMs, 1);
              // ease-out cubic
              const eased = 1 - (1 - t) ** 3;
              setValue(to * eased);
              if (t < 1) requestAnimationFrame(tick);
              else setDone(true);
            };
            requestAnimationFrame(tick);
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.4 },
    );

    io.observe(node);
    return () => io.disconnect();
  }, [to, durationMs, done]);

  const formatted = formatNumber(done ? to : value, decimals, separator);

  return (
    <span ref={ref} className={className}>
      {formatted}
      {suffix}
    </span>
  );
}

function formatNumber(n: number, decimals: number, separator: string): string {
  const fixed = n.toFixed(decimals);
  const [int, frac] = fixed.split(".");
  const grouped = (int ?? "").replace(/\B(?=(\d{3})+(?!\d))/g, separator);
  return frac ? `${grouped}.${frac}` : grouped;
}
