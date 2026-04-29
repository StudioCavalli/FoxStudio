import {
  HeadingFeature,
  InlineCodeFeature,
  LinkFeature,
  ParagraphFeature,
  UploadFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";
import { revalidateTag } from "next/cache";
import type { CollectionConfig } from "payload";

export const JournalArticles: CollectionConfig = {
  slug: "journal-articles",
  labels: { singular: "Journal article", plural: "Journal articles" },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "tag", "publishedAt", "_status"],
    description: "Long-form notes and articles. Rendered at /journal/[slug].",
  },
  versions: {
    drafts: { autosave: { interval: 2000 }, schedulePublish: true },
    maxPerDoc: 50,
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
      ({ doc }) => {
        try {
          revalidateTag("journal");
          if (doc?.slug) revalidateTag(`journal-${doc.slug}`);
        } catch {}
      },
    ],
  },
  fields: [
    {
      type: "row",
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
          localized: true,
          admin: { width: "70%" },
        },
        {
          name: "slug",
          type: "text",
          required: true,
          unique: true,
          index: true,
          admin: { width: "30%" },
        },
      ],
    },
    {
      name: "lead",
      type: "textarea",
      localized: true,
      maxLength: 280,
      admin: { description: "Italic lead paragraph shown above the body." },
    },
    {
      name: "tag",
      type: "select",
      required: true,
      defaultValue: "perf",
      options: [
        { label: "Performance", value: "perf" },
        { label: "3D / WebGPU", value: "3d" },
        { label: "Tooling", value: "tooling" },
        { label: "Opinion", value: "opinion" },
        { label: "Process", value: "process" },
      ],
    },
    {
      name: "readingTimeMinutes",
      type: "number",
      min: 1,
      max: 120,
      admin: { description: "Estimated reading time in minutes." },
    },
    {
      name: "body",
      type: "richText",
      required: true,
      localized: true,
      editor: lexicalEditor({
        features: () => [
          ParagraphFeature(),
          HeadingFeature({ enabledHeadingSizes: ["h2", "h3"] }),
          LinkFeature(),
          InlineCodeFeature(),
          UploadFeature(),
        ],
      }),
    },
    {
      name: "author",
      type: "relationship",
      relationTo: "team-members",
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
