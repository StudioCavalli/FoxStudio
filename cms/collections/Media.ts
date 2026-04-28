import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media",
  admin: {
    useAsTitle: "alt",
    description: "Image and video uploads. Stored on Cloudflare R2 in production.",
  },
  upload: {
    // Static dir is used as fallback when no S3/R2 adapter is configured.
    staticDir: "public/uploads",
    imageSizes: [
      { name: "thumbnail", width: 400, height: 300, position: "centre" },
      { name: "card", width: 768 },
      { name: "tablet", width: 1280 },
      { name: "desktop", width: 1920 },
    ],
    formatOptions: {
      format: "webp",
      options: { quality: 80 },
    },
    mimeTypes: ["image/*", "video/*"],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
      localized: true,
      admin: {
        description: "Required alternative text for accessibility (WCAG 2.2 AA).",
      },
    },
    {
      name: "caption",
      type: "text",
      localized: true,
    },
    {
      name: "credit",
      type: "text",
      admin: {
        description: "Photographer / source attribution if applicable.",
      },
    },
  ],
};
