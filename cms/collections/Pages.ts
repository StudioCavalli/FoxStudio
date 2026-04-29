import {
  HeadingFeature,
  LinkFeature,
  ParagraphFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";
import { revalidateTag } from "next/cache";
import type { CollectionConfig } from "payload";

/**
 * Free-form editorial pages (Studio body, Contact intros, etc.).
 * Slug is fixed — pages are looked up by slug from the front.
 */
export const Pages: CollectionConfig = {
  slug: "pages",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["slug", "title", "_status"],
    description: "Editorial pages. Slug determines which front route renders the content.",
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
      ({ doc }) => {
        try {
          if (doc?.slug) revalidateTag(`page-${doc.slug}`);
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
          admin: { width: "30%", description: "e.g. studio, contact, footprint" },
        },
      ],
    },
    {
      name: "intro",
      type: "textarea",
      localized: true,
      maxLength: 480,
    },
    {
      name: "body",
      type: "richText",
      localized: true,
      editor: lexicalEditor({
        features: () => [
          ParagraphFeature(),
          HeadingFeature({ enabledHeadingSizes: ["h2"] }),
          LinkFeature(),
        ],
      }),
    },
  ],
};
