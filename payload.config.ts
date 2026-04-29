import path from "node:path";
import { fileURLToPath } from "node:url";

import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
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

const blobConfigured = Boolean(process.env.BLOB_READ_WRITE_TOKEN);

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
      // Prefer the non-pooled URL: Payload uses transactions and prepared
      // statements which can misbehave through pgbouncer (transaction mode).
      // Vercel's Neon integration injects POSTGRES_URL_NON_POOLING; locally
      // we set DATABASE_URL to the same direct host.
      // `uselibpqcompat=true` silences the pg-connection-string v3 deprecation
      // warning about `sslmode=require` while preserving current behavior.
      connectionString: ((): string => {
        const raw =
          process.env.POSTGRES_URL_NON_POOLING ||
          process.env.DATABASE_URL_UNPOOLED ||
          process.env.DATABASE_URL ||
          "postgres://postgres:postgres@localhost:5432/foxstudio";
        if (!raw.includes("sslmode=") || raw.includes("uselibpqcompat=")) return raw;
        const sep = raw.includes("?") ? "&" : "?";
        return `${raw}${sep}uselibpqcompat=true`;
      })(),
    },
  }),

  sharp,

  localization: {
    locales: ["fr", "en", "it"],
    defaultLocale: "en",
    fallback: true,
  },

  plugins: blobConfigured
    ? [
        vercelBlobStorage({
          collections: { media: true },
          token: process.env.BLOB_READ_WRITE_TOKEN || "",
        }),
      ]
    : [],
});
