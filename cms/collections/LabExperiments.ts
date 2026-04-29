import { revalidateTag } from "next/cache";
import type { CollectionConfig } from "payload";

export const LabExperiments: CollectionConfig = {
  slug: "lab-experiments",
  labels: { singular: "Lab experiment", plural: "Lab experiments" },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["code", "name", "state", "_status"],
    description: "Prototypes and ongoing experiments. Each becomes a /lab card.",
  },
  versions: {
    drafts: { autosave: { interval: 2000 }, schedulePublish: true },
  },
  access: {
    read: ({ req: { user } }) => {
      if (user) return true;
      return { _status: { equals: "published" } };
    },
    create: ({ req: { user } }) => user?.role === "admin" || user?.role === "editor",
    update: ({ req: { user } }) =>
      user?.role === "admin" || user?.role === "editor" || user?.role === "translator",
    delete: ({ req: { user } }) => user?.role === "admin",
  },
  hooks: {
    afterChange: [
      () => {
        try {
          revalidateTag("lab-experiments");
        } catch {}
      },
    ],
  },
  fields: [
    {
      type: "row",
      fields: [
        {
          name: "code",
          type: "text",
          required: true,
          admin: { width: "30%", description: "e.g. exp_004" },
        },
        {
          name: "name",
          type: "text",
          required: true,
          localized: true,
          admin: { width: "70%" },
        },
      ],
    },
    {
      name: "summary",
      type: "textarea",
      localized: true,
      maxLength: 240,
    },
    {
      name: "state",
      type: "select",
      required: true,
      defaultValue: "wip",
      options: [
        { label: "Live", value: "live" },
        { label: "Work in progress", value: "wip" },
        { label: "Archived", value: "archived" },
      ],
    },
    {
      name: "tags",
      type: "array",
      fields: [{ name: "tag", type: "text", required: true }],
    },
    {
      name: "demoUrl",
      type: "text",
      admin: {
        description: "Link to live demo (sandboxed iframe target).",
      },
    },
    {
      name: "sourceUrl",
      type: "text",
      admin: { description: "Link to GitHub source if open." },
    },
    {
      name: "startedAt",
      type: "date",
      admin: {
        position: "sidebar",
        date: { pickerAppearance: "dayOnly" },
      },
    },
  ],
};
