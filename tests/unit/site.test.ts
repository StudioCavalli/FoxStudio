import { describe, expect, it } from "vitest";

import { LOCALES, NAV, SITE } from "@/lib/site";

describe("site config", () => {
  it("exposes the three required locales", () => {
    expect(LOCALES).toEqual(["fr", "en", "it"]);
  });

  it("declares the five primary nav entries", () => {
    expect(NAV.map((n) => n.href)).toEqual(["/works", "/lab", "/studio", "/journal", "/contact"]);
  });

  it("references FoxCase as parent", () => {
    expect(SITE.parent.name).toBe("FoxCase");
  });
});
