import { AxeBuilder } from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

/**
 * axe-core accessibility audit — runs WCAG 2.0/2.1/2.2 A & AA rules
 * on the key user-facing pages. Fails the suite on any critical or
 * serious violation. Used both locally (pnpm test:e2e) and in CI.
 */

const PAGES = [
  { name: "Home (fr)", path: "/fr" },
  { name: "Works index (fr)", path: "/fr/works" },
  { name: "Project page (fr)", path: "/fr/works/memoria" },
  { name: "Lab (fr)", path: "/fr/lab" },
  { name: "Journal (fr)", path: "/fr/journal" },
  { name: "Team (fr)", path: "/fr/team" },
  { name: "Contact (fr)", path: "/fr/contact" },
  { name: "Legal mentions (fr)", path: "/fr/legal/mentions" },
];

for (const { name, path } of PAGES) {
  test(`${name} has no critical or serious axe violations`, async ({ page }) => {
    await page.goto(path);
    // Wait for Reveal animations + IntersectionObserver-driven content
    // to settle before scanning, otherwise hidden nodes can produce
    // false positives.
    await page.waitForLoadState("networkidle");

    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();

    const blocking = results.violations.filter(
      (v) => v.impact === "critical" || v.impact === "serious",
    );

    if (blocking.length > 0) {
      console.log(`\n${blocking.length} blocking violation(s) on ${path}:`);
      for (const v of blocking) {
        console.log(`  · [${v.impact}] ${v.id} — ${v.help}`);
        for (const node of v.nodes.slice(0, 3)) {
          console.log(`      → ${node.target.join(", ")}`);
        }
      }
    }

    expect(blocking).toEqual([]);
  });
}
