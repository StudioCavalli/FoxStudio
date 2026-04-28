/**
 * Estimates the per-visit carbon footprint of the home page based on
 * the gzipped transfer weight of its build artifacts.
 *
 * Model: Sustainable Web Design (SWD) v3 simplified.
 *   0.81 kWh / GB transferred × 442 gCO₂e / kWh ≈ 358 g CO₂e / GB
 *   ≈ 3.33e-7 g CO₂e / byte
 *
 * Budget: ≤ 0.20 g CO₂ / view (CDC §7.2).
 */

import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { gzipSync } from "node:zlib";

const NEXT_DIR = ".next";
const ESTIMATED_HTML_BYTES = 6_000; // gzipped HTML approx for a static page
const GRAMS_PER_BYTE = 3.33e-7;
const BUDGET_GRAMS = 0.2;

// Routes whose chunks are loaded on the home page (excluding 404).
// Key format depends on Next.js bundler: webpack uses "/page" / "/layout",
// the (frontend) route group + [locale] segment yields "/(frontend)/[locale]/page" etc.
const HOME_ROUTE_KEYS = [
  "/layout",
  "/page",
  "/(frontend)/[locale]/layout",
  "/(frontend)/[locale]/page",
];

// Dev artifacts that may appear in the manifest but aren't shipped in production.
const DEV_PATTERNS = [/\[turbopack\]/, /hmr-client/, /devtools/, /_dev_/];

async function gzipSize(filePath: string): Promise<number> {
  const content = await readFile(filePath);
  return gzipSync(content).length;
}

function isProdChunk(file: string): boolean {
  return !DEV_PATTERNS.some((p) => p.test(file));
}

async function main(): Promise<void> {
  const manifestPath = join(NEXT_DIR, "app-build-manifest.json");
  const raw = await readFile(manifestPath, "utf-8");
  const manifest = JSON.parse(raw) as { pages: Record<string, string[]> };

  // Collect unique production chunks across all home-relevant routes.
  const files = new Set<string>();
  for (const key of HOME_ROUTE_KEYS) {
    const chunks = manifest.pages[key] ?? [];
    for (const chunk of chunks) {
      if (isProdChunk(chunk)) files.add(chunk);
    }
  }

  if (files.size === 0) {
    console.warn(
      `No production chunks found for home route. Available keys: ${Object.keys(manifest.pages).join(", ")}`,
    );
  }

  let totalBytes = ESTIMATED_HTML_BYTES;
  const breakdown: Array<[string, number]> = [];
  for (const file of files) {
    const fullPath = join(NEXT_DIR, file);
    try {
      const size = await gzipSize(fullPath);
      totalBytes += size;
      breakdown.push([file, size]);
    } catch {
      // Some entries (CSS, fonts) may live elsewhere; ignore quietly.
    }
  }

  breakdown.sort((a, b) => b[1] - a[1]);
  const grams = totalBytes * GRAMS_PER_BYTE;
  const kb = totalBytes / 1024;

  console.log("Top chunks (gzip):");
  for (const [file, size] of breakdown.slice(0, 5)) {
    console.log(`  ${(size / 1024).toFixed(1).padStart(7)} kB  ${file}`);
  }

  console.log("────────────────────────────────────────");
  console.log(`Home transfer (gzip):  ${kb.toFixed(2)} kB (${files.size} chunks)`);
  console.log(`Carbon estimate:       ${grams.toFixed(4)} g CO₂/visit`);
  console.log(`Budget:                ${BUDGET_GRAMS.toFixed(2)} g CO₂/visit`);
  console.log("────────────────────────────────────────");

  if (grams > BUDGET_GRAMS) {
    console.error(`✖ OVER BUDGET — ${grams.toFixed(4)} g > ${BUDGET_GRAMS} g`);
    process.exit(1);
  }

  console.log(`✓ Under budget by ${(BUDGET_GRAMS - grams).toFixed(4)} g`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
