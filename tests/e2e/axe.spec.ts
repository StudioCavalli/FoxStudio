import { AxeBuilder } from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const PAGES = [
  { name: "Home (en)", path: "/en" },
  { name: "Works (en)", path: "/en/works" },
  { name: "Project (en)", path: "/en/works/edge-inference" },
];

for (const { name, path } of PAGES) {
  test(`${name} has no critical or serious axe violations`, async ({ page }) => {
    await page.goto(path);

    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();

    const blocking = results.violations.filter(
      (v) => v.impact === "critical" || v.impact === "serious",
    );

    if (blocking.length > 0) {
      console.log(JSON.stringify(blocking, null, 2));
    }

    expect(blocking).toEqual([]);
  });
}
