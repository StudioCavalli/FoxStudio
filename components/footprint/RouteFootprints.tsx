"use client";

import { useEffect, useState } from "react";

import { LegalRow } from "@/components/legal/LegalLayout";

/**
 * Live per-route footprint measurement.
 *
 * For each route in the list, on mount we:
 *   1. fetch the HTML
 *   2. parse the HTML for <script src> / <link rel=stylesheet href> URLs
 *      that point at our origin (i.e. /_next/* chunks, not third parties)
 *   3. fetch each unique asset and sum response sizes
 *   4. convert to grams CO₂e via the SWD v3 simplified coefficient
 *      (3.33 × 10⁻⁷ g/byte — same constant used by FootprintLive in the
 *      footer and by scripts/measure-carbon.ts in CI)
 *
 * Bytes are read from `Response.blob().size`, which gives the
 * decompressed payload as the browser exposes it. That's an upper-bound
 * on the real over-the-wire transfer (which is gzip/brotli compressed
 * by the CDN). We deliberately don't try to be more clever — being a
 * touch pessimistic is the right error direction for an eco budget.
 *
 * Results are cached for the current page session via state. We don't
 * persist to localStorage because the values are tied to the deployed
 * commit's chunks; a re-deploy invalidates them.
 */

const GRAMS_PER_BYTE = 3.33e-7;

type Measurement = {
  bytes: number;
  grams: number;
};

type Status = "loading" | "ok" | "error";

type Row = {
  path: string;
  label: string;
  status: Status;
  measurement?: Measurement;
};

type Props = {
  routes: Array<{ path: string; label: string }>;
};

function formatKb(bytes: number): string {
  return `${(bytes / 1024).toFixed(0)} kB`;
}

function formatGrams(grams: number, locale: string): string {
  if (grams < 0.005) return locale === "fr" ? "< 0,01 g CO₂" : "< 0.01 g CO₂";
  const fixed = grams.toFixed(2);
  return locale === "fr" ? `${fixed.replace(".", ",")} g CO₂` : `${fixed} g CO₂`;
}

async function measureRoute(path: string): Promise<Measurement> {
  const htmlRes = await fetch(path, { credentials: "same-origin" });
  if (!htmlRes.ok) throw new Error(`HTTP ${htmlRes.status} on ${path}`);
  const html = await htmlRes.text();
  let bytes = new TextEncoder().encode(html).length;

  const assetUrls = new Set<string>();
  const scriptRe = /<script[^>]+src="([^"]+)"/g;
  const styleRe = /<link[^>]+rel="stylesheet"[^>]+href="([^"]+)"/g;
  for (const m of html.matchAll(scriptRe)) {
    if (m[1]?.startsWith("/")) assetUrls.add(m[1]);
  }
  for (const m of html.matchAll(styleRe)) {
    if (m[1]?.startsWith("/")) assetUrls.add(m[1]);
  }

  // Fetch all assets in parallel ; failures are skipped (don't break the row).
  const sizes = await Promise.all(
    Array.from(assetUrls).map(async (url) => {
      try {
        const r = await fetch(url, { credentials: "same-origin" });
        if (!r.ok) return 0;
        const blob = await r.blob();
        return blob.size;
      } catch {
        return 0;
      }
    }),
  );
  bytes += sizes.reduce((a, b) => a + b, 0);

  return { bytes, grams: bytes * GRAMS_PER_BYTE };
}

export function RouteFootprints({ routes }: Props) {
  const [rows, setRows] = useState<Row[]>(() => routes.map((r) => ({ ...r, status: "loading" })));
  const [locale, setLocale] = useState<string>("en");

  useEffect(() => {
    if (typeof document !== "undefined") {
      setLocale(document.documentElement.lang?.slice(0, 2) || "en");
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      for (const route of routes) {
        try {
          const measurement = await measureRoute(route.path);
          if (cancelled) return;
          setRows((prev) =>
            prev.map((r) => (r.path === route.path ? { ...r, status: "ok", measurement } : r)),
          );
        } catch {
          if (cancelled) return;
          setRows((prev) =>
            prev.map((r) => (r.path === route.path ? { ...r, status: "error" } : r)),
          );
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [routes]);

  return (
    <>
      {rows.map((row) => (
        <LegalRow
          key={row.path}
          label={row.label}
          value={
            <span className="tabular">
              {row.status === "loading" && (
                <span className="inline-flex items-center gap-[var(--spacing-2)] text-fg-secondary">
                  <span aria-hidden className="footprint-bars">
                    <span />
                    <span />
                    <span />
                  </span>
                  <span>{locale === "fr" ? "MESURE…" : "MEASURING…"}</span>
                </span>
              )}
              {row.status === "error" && (
                <span className="text-fg-secondary">
                  {locale === "fr" ? "indisponible" : "unavailable"}
                </span>
              )}
              {row.status === "ok" && row.measurement && (
                <>
                  {formatKb(row.measurement.bytes)} ·{" "}
                  <span className="text-fg">{formatGrams(row.measurement.grams, locale)}</span>
                </>
              )}
            </span>
          }
        />
      ))}
    </>
  );
}
