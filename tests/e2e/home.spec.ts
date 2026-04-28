import { expect, test } from "@playwright/test";

test.describe("Home", () => {
  test("renders the manifesto and main sections", async ({ page }) => {
    await page.goto("/en");

    await expect(page.getByRole("heading", { level: 1 })).toContainText("FoxStudio");

    await expect(page.getByText("Manifesto", { exact: false })).toBeVisible();
    await expect(page.getByText("Index", { exact: false })).toBeVisible();
    await expect(page.getByText("Lab", { exact: false }).first()).toBeVisible();

    await expect(page.getByRole("heading", { name: /Pick your door/i })).toBeVisible();
  });

  test("primary navigation is keyboard reachable", async ({ page }) => {
    await page.goto("/en");

    await page.keyboard.press("Tab"); // logo
    await page.keyboard.press("Tab"); // first nav link
    await expect(page.locator(":focus")).toContainText(/Works/i);
  });

  test("footer exposes contact and footprint info", async ({ page }) => {
    await page.goto("/en");

    const footer = page.getByRole("contentinfo");
    await expect(footer).toContainText(/hello@foxstudio\.fr/);
    await expect(footer).toContainText(/CO₂/);
  });

  test("locale switcher routes to /fr", async ({ page }) => {
    await page.goto("/en");
    await page.getByRole("link", { name: "Switch to FR" }).click();
    await expect(page).toHaveURL(/\/fr$/);
    // FR manifesto is loaded
    await expect(page.getByRole("heading", { level: 1 })).toContainText("laboratoire");
  });
});
