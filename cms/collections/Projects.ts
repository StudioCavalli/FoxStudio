import { revalidateTag } from "next/cache";
import type { CollectionConfig } from "payload";

export const Projects: CollectionConfig = {
  slug: "projects",
  labels: { singular: "Project", plural: "Projects" },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["number", "name", "year", "status", "_status", "publishedAt"],
    description: "FoxStudio works. Each project becomes /works/[slug] on the site.",
  },
  versions: {
    drafts: {
      autosave: { interval: 2000 },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
  access: {
    // Public read for published documents; authenticated users see drafts.
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
      ({ doc }) => {
        // Invalidate Next.js cache for /works and the specific project.
        try {
          revalidateTag("projects");
          if (doc?.slug) revalidateTag(`project-${doc.slug}`);
        } catch {
          // revalidateTag throws if called outside a Next request context;
          // safe to ignore — the cache will refresh on next visit.
        }
      },
    ],
  },
  fields: [
    {
      type: "row",
      fields: [
        {
          name: "number",
          type: "text",
          required: true,
          admin: { width: "20%", description: "Sequential code: 001, 002…" },
        },
        {
          name: "name",
          type: "text",
          required: true,
          localized: true,
          admin: { width: "55%" },
        },
        {
          name: "slug",
          type: "text",
          required: true,
          unique: true,
          index: true,
          admin: { width: "25%", description: "URL segment (kebab-case)." },
        },
      ],
    },
    {
      name: "summary",
      type: "textarea",
      localized: true,
      maxLength: 240,
      admin: { description: "One-line description, shown in /works index." },
    },
    {
      name: "year",
      type: "number",
      required: true,
      min: 2020,
      max: 2030,
    },
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "live",
      options: [
        { label: "Live", value: "live" },
        { label: "Work in progress", value: "wip" },
        { label: "Archived", value: "archived" },
      ],
    },
    {
      name: "stack",
      type: "array",
      labels: { singular: "Tech", plural: "Stack" },
      fields: [{ name: "tech", type: "text", required: true }],
    },
    {
      name: "partners",
      type: "array",
      fields: [
        { name: "name", type: "text", required: true },
        { name: "url", type: "text" },
      ],
    },
    {
      name: "heroMedia",
      type: "upload",
      relationTo: "media",
      admin: { description: "Hero image / video for the project page." },
    },
    {
      name: "narrative",
      type: "richText",
      localized: true,
      admin: {
        description: "Long-form narrative — the body of the project page.",
      },
    },
    {
      name: "results",
      type: "array",
      maxRows: 6,
      labels: { singular: "Result", plural: "Results" },
      fields: [
        {
          type: "row",
          fields: [
            {
              name: "value",
              type: "text",
              required: true,
              admin: { width: "30%", description: 'e.g. "4 200", "12 ko"' },
            },
            {
              name: "label",
              type: "text",
              required: true,
              localized: true,
              admin: { width: "70%" },
            },
          ],
        },
      ],
    },
    {
      name: "publishedAt",
      type: "date",
      admin: {
        position: "sidebar",
        date: { pickerAppearance: "dayAndTime" },
      },
    },
  ],
};
