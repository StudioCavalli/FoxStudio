import type { CollectionConfig } from "payload";

export const TeamMembers: CollectionConfig = {
  slug: "team-members",
  labels: { singular: "Team member", plural: "Team members" },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "role", "order"],
    description: "FoxStudio team — shown on /studio.",
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => user?.role === "admin" || user?.role === "editor",
    update: ({ req: { user } }) => user?.role === "admin" || user?.role === "editor",
    delete: ({ req: { user } }) => user?.role === "admin",
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "role",
      type: "text",
      required: true,
      localized: true,
    },
    {
      name: "location",
      type: "text",
      admin: { description: "City of residence (proper noun, same in all locales)." },
    },
    {
      name: "bio",
      type: "textarea",
      localized: true,
      maxLength: 480,
    },
    {
      name: "photo",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "links",
      type: "array",
      fields: [
        {
          type: "row",
          fields: [
            {
              name: "label",
              type: "text",
              required: true,
              admin: { width: "30%" },
            },
            {
              name: "url",
              type: "text",
              required: true,
              admin: { width: "70%" },
            },
          ],
        },
      ],
    },
    {
      name: "order",
      type: "number",
      defaultValue: 0,
      admin: {
        position: "sidebar",
        description: "Sort order on /studio (ascending). Founders typically 0–10.",
      },
    },
  ],
};
