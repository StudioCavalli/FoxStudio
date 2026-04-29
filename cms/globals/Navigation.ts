import type { GlobalConfig } from "payload";

export const Navigation: GlobalConfig = {
  slug: "navigation",
  admin: {
    description: "Header / footer navigation links. Override the static defaults from lib/site.ts.",
  },
  access: {
    read: () => true,
    update: ({ req: { user } }) => user?.role === "admin" || user?.role === "editor",
  },
  fields: [
    {
      name: "primary",
      type: "array",
      labels: { singular: "Link", plural: "Primary links" },
      fields: [
        {
          type: "row",
          fields: [
            {
              name: "label",
              type: "text",
              required: true,
              localized: true,
              admin: { width: "50%" },
            },
            {
              name: "href",
              type: "text",
              required: true,
              admin: { width: "50%", description: "Internal path, e.g. /works" },
            },
          ],
        },
      ],
    },
    {
      name: "footerExtras",
      type: "array",
      labels: { singular: "Link", plural: "Footer extras" },
      fields: [
        {
          type: "row",
          fields: [
            {
              name: "label",
              type: "text",
              required: true,
              localized: true,
              admin: { width: "50%" },
            },
            {
              name: "href",
              type: "text",
              required: true,
              admin: { width: "50%" },
            },
          ],
        },
      ],
    },
  ],
};
