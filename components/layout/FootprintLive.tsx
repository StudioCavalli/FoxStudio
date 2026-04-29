"use client";

import { useEffect, useState } from "react";

import { useTranslations } from "next-intl";

/**
 * Live carbon footprint indicator for the current page view.
 *
 * Reads the Performance API once the page settles (load + a beat), sums
 * `transferSize` (over-the-wire bytes) for resources + the navigation
 * itself, then applies the SWD v3 simplified coefficient
 * (3.33e-7 g CO₂e / byte) — same maths as `scripts/measure-carbon.ts`.
 *
 * Falls back to a static "~ 0.18 g CO₂" placeholder if the Performance
 * API isn't available (very old browsers) or before the calculation
 * settles. No layout jitter — the slot reserves its width with a
 * monospace-tabular figure.
 */

const GRAMS_PER_BYTE = 3.33e-7;
const FALLBACK = "~ 0.18 g";

export function FootprintLive() {
  const t = useTranslations("Footer");
  const [grams, setGrams] = useState<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !window.performance) return;

    let cancelled = false;

    const compute = () => {
      try {
        const resources = performance.getEntriesByType("resource") as PerformanceResourceTiming[];
        const navigation = performance.getEntriesByType("navigation")[0] as
          | PerformanceNavigationTiming
          | undefined;

        const totalBytes =
          (navigation?.transferSize ?? 0) +
          resources.reduce((sum, r) => sum + (r.transferSize ?? 0), 0);

        if (totalBytes > 0 && !cancelled) {
          setGrams(totalBytes * GRAMS_PER_BYTE);
        }
      } catch {
        // Silent — we'll fall back to the placeholder.
      }
    };

    if (document.readyState === "complete") {
      const id = window.setTimeout(compute, 600);
      return () => {
        cancelled = true;
        window.clearTimeout(id);
      };
    }

    const onLoad = () => window.setTimeout(compute, 600);
    window.addEventListener("load", onLoad, { once: true });
    return () => {
      cancelled = true;
      window.removeEventListener("load", onLoad);
    };
  }, []);

  const display =
    grams === null
      ? FALLBACK
      : grams < 0.01
        ? "< 0,01 g"
        : `~ ${grams.toFixed(2).replace(".", ",")} g`;

  return (
    <span aria-label="Carbon footprint estimate for this page view">
      <span className="tabular text-[var(--color-fg)]">{display} CO₂</span>
      <span className="text-[var(--color-fg-secondary)]"> · {t("thisView")}</span>
    </span>
  );
}
