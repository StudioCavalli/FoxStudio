"use client";

import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";

/**
 * Live carbon footprint indicator for the current page view.
 *
 * Reads the Performance API once the page settles (load + a beat), sums
 * `transferSize` (over-the-wire bytes) for resources + the navigation
 * itself, then applies the SWD v3 simplified coefficient
 * (3.33e-7 g CO₂e / byte) — same maths as `scripts/measure-carbon.ts`
 * and the live measurement on /footprint.
 *
 * Until the value is available we show the same animated bar loader as
 * /footprint plus a localised "MESURE…" / "MEASURING…" label, so the
 * reader sees that the figure is actually being computed (not faked).
 */

const GRAMS_PER_BYTE = 3.33e-7;

export function FootprintLive() {
  const t = useTranslations("Footer");
  const locale = useLocale();
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
        // Silent — the loader stays visible until the next render.
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

  if (grams === null) {
    return (
      <span
        aria-label="Carbon footprint estimate for this page view"
        className="inline-flex items-center gap-[var(--spacing-2)]"
      >
        <span aria-hidden className="footprint-bars">
          <span />
          <span />
          <span />
        </span>
        <span className="text-fg-secondary">{locale === "fr" ? "MESURE…" : "MEASURING…"}</span>
      </span>
    );
  }

  const display = grams < 0.01 ? "< 0,01 g" : `~ ${grams.toFixed(2).replace(".", ",")} g`;

  return (
    <span aria-label="Carbon footprint estimate for this page view">
      <span className="tabular text-fg">{display} CO₂</span>
      <span className="text-fg-secondary"> · {t("thisView")}</span>
    </span>
  );
}
