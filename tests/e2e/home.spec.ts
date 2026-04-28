import { expect, test } from "@playwright/test";

test.describe("Home", () => {
  test("renders the manifesto and main sections", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByRole("heading", { level: 1 })).toContainText("FoxStudio");

    // Section labels (numbered) should be present
    await expect(page.getByText("Manifesto", { exact: false })).toBeVisible();
    await expect(page.getByText("Index", { exact: false })).toBeVisible();
    await expect(page.getByText("Lab", { exact: false }).first()).toBeVisible();

    // The 3-doors contact teaser
    await expect(page.getByRole("heading", { name: /Pick your door/i })).toBeVisible();
  });

  test("primary navigation is keyboard reachable", async ({ page }) => {
    await page.goto("/");

    // Skip whitespace; tab from logo through nav links
    await page.keyboard.press("Tab"); // logo
    await page.keyboard.press("Tab"); // first nav link
    await expect(page.locator(":focus")).toContainText(/Works/i);
  });

  test("footer exposes contact and footprint info", async ({ page }) => {
    await page.goto("/");

    const footer = page.getByRole("contentinfo");
    await expect(footer).toContainText(/hello@foxstudio\.fr/);
    await expect(footer).toContainText(/CO₂/);
  });
});
