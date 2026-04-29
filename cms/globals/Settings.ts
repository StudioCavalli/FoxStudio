import type { GlobalConfig } from "payload";

export const Settings: GlobalConfig = {
  slug: "settings",
  admin: {
    description: "Site-wide settings: SEO defaults, contact endpoints, footprint thresholds.",
  },
  access: {
    read: () => true,
    update: ({ req: { user } }) => user?.role === "admin",
  },
  fields: [
    {
      name: "siteName",
      type: "text",
      defaultValue: "FoxStudio",
    },
    {
      name: "tagline",
      type: "text",
      localized: true,
    },
    {
      name: "defaultDescription",
      type: "textarea",
      localized: true,
      maxLength: 280,
    },
    {
      name: "contactEmail",
      type: "email",
      defaultValue: "hello@foxstudio.fr",
    },
    {
      name: "footprint",
      type: "group",
      fields: [
        {
          name: "budgetGramsCO2",
          type: "number",
          defaultValue: 0.2,
          admin: { description: "Per-view CO₂ budget enforced in CI (CDC §7.2)." },
        },
        {
          name: "displayInFooter",
          type: "checkbox",
          defaultValue: true,
        },
      ],
    },
  ],
};
