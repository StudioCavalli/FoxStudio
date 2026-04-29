import path from "node:path";
import { fileURLToPath } from "node:url";

import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { s3Storage } from "@payloadcms/storage-s3";
import { buildConfig } from "payload";
import sharp from "sharp";

import { JournalArticles } from "./cms/collections/JournalArticles";
import { LabExperiments } from "./cms/collections/LabExperiments";
import { Media } from "./cms/collections/Media";
import { Pages } from "./cms/collections/Pages";
import { Projects } from "./cms/collections/Projects";
import { TeamMembers } from "./cms/collections/TeamMembers";
import { Users } from "./cms/collections/Users";
import { Navigation } from "./cms/globals/Navigation";
import { Settings } from "./cms/globals/Settings";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const r2Configured = Boolean(
  process.env.R2_ACCESS_KEY_ID &&
    process.env.R2_SECRET_ACCESS_KEY &&
    process.env.R2_BUCKET &&
    process.env.R2_ENDPOINT,
);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: " · FoxStudio CMS",
    },
  },

  collections: [Users, Media, Projects, LabExperiments, JournalArticles, TeamMembers, Pages],
  globals: [Settings, Navigation],

  editor: lexicalEditor(),

  secret: process.env.PAYLOAD_SECRET || "dev-only-secret-do-not-use-in-prod",

  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },

  db: postgresAdapter({
    pool: {
      connectionString:
        process.env.DATABASE_URL ||
        // Placeholder so build doesn't fail without a real DB.
        // The pool only connects on first DB query, not at construction.
        "postgres://postgres:postgres@localhost:5432/foxstudio",
    },
  }),

  sharp,

  localization: {
    locales: ["fr", "en", "it"],
    defaultLocale: "en",
    fallback: true,
  },

  plugins: r2Configured
    ? [
        s3Storage({
          collections: { media: true },
          bucket: process.env.R2_BUCKET || "",
          config: {
            endpoint: process.env.R2_ENDPOINT,
            credentials: {
              accessKeyId: process.env.R2_ACCESS_KEY_ID || "",
              secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || "",
            },
            region: process.env.R2_REGION || "auto",
            forcePathStyle: true,
          },
        }),
      ]
    : [],
});
