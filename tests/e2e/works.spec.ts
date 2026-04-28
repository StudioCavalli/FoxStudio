import { expect, test } from "@playwright/test";

test.describe("Works", () => {
  test("index page lists projects grouped by year", async ({ page }) => {
    await page.goto("/en/works");

    await expect(page.getByRole("heading", { level: 1 })).toContainText(/project/i);

    const firstProjectLink = page.getByRole("link", { name: /Edge inference/i });
    await expect(firstProjectLink).toBeVisible();
    await expect(firstProjectLink).toHaveAttribute("href", "/en/works/edge-inference");
  });

  test("clicking a project navigates to its slug page", async ({ page }) => {
    await page.goto("/en/works");
    await page.getByRole("link", { name: /Edge inference/i }).click();

    await expect(page).toHaveURL(/\/en\/works\/edge-inference/);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(/Edge inference/i);
  });

  test("project page renders the 3-act narrative", async ({ page }) => {
    await page.goto("/en/works/edge-inference");

    await expect(page.getByText(/Context/i).first()).toBeVisible();
    await expect(page.getByText(/Approach/i).first()).toBeVisible();
    await expect(page.getByText(/Results/i).first()).toBeVisible();
  });

  test("project page surfaces stack metadata", async ({ page }) => {
    await page.goto("/en/works/edge-inference");

    const aside = page.locator("aside").first();
    await expect(aside).toContainText(/Year/i);
    await expect(aside).toContainText(/Stack/i);
  });

  test("project page links to the next project", async ({ page }) => {
    await page.goto("/en/works/edge-inference");

    const next = page.getByText(/^Next ▸/i);
    await expect(next).toBeVisible();
  });

  test("French locale renders Projets header", async ({ page }) => {
    await page.goto("/fr/works");
    await expect(page.getByText(/Projets/i).first()).toBeVisible();
  });
});
