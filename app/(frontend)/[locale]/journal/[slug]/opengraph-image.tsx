import { notFound } from "next/navigation";
import { ImageResponse } from "next/og";

import { getJournalArticleBySlug } from "@/lib/data/journal";
import { SITE } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "FoxStudio journal article.";

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  const article = await getJournalArticleBySlug(slug, locale as "fr" | "en" | "it");
  if (!article) notFound();

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#0a0a0a",
        color: "#f4f4f4",
        padding: 56,
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontFamily: "ui-monospace, monospace",
          fontSize: 18,
          letterSpacing: 1.2,
          textTransform: "uppercase",
          color: "#a0a0a0",
        }}
      >
        <span style={{ display: "flex", gap: 12 }}>
          <span>{article.publishedAt?.slice(0, 10) ?? "—"}</span>
          <span>·</span>
          <span style={{ color: "#f4f4f4" }}>{article.tag}</span>
          {article.readingTimeMinutes && <span>· {article.readingTimeMinutes} min</span>}
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <span>Journal ·</span>
          <span style={{ color: "#f4f4f4" }}>FoxStudio</span>
          <svg
            width="42"
            height="42"
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="#f4f4f4"
            strokeWidth="1.6"
            strokeLinejoin="round"
            strokeLinecap="round"
          >
            <title>FoxStudio</title>
            <path d="M 8 3 L 12 11 L 16 7 L 20 11 L 24 3 L 27 11 L 24 18 L 16 28 L 8 18 L 5 11 Z" />
            <circle cx="12.5" cy="15.5" r="0.9" fill="#f4f4f4" />
            <circle cx="19.5" cy="15.5" r="0.9" fill="#f4f4f4" />
          </svg>
        </span>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 28,
          flex: 1,
          justifyContent: "center",
        }}
      >
        <h1
          style={{
            fontSize: article.title.length > 50 ? 84 : 110,
            fontWeight: 600,
            lineHeight: 1,
            letterSpacing: -2,
            margin: 0,
            display: "flex",
          }}
        >
          {article.title}
        </h1>
        {article.lead && (
          <p
            style={{
              fontSize: 26,
              fontStyle: "italic",
              lineHeight: 1.3,
              margin: 0,
              maxWidth: 1000,
              color: "#a0a0a0",
              display: "flex",
            }}
          >
            {article.lead}
          </p>
        )}
      </div>

      <div
        style={{
          fontFamily: "ui-monospace, monospace",
          fontSize: 18,
          letterSpacing: 1.2,
          textTransform: "uppercase",
          color: "#a0a0a0",
          display: "flex",
        }}
      >
        {SITE.url.replace(/^https?:\/\//, "")}/journal/{article.slug}
      </div>
    </div>,
    { ...size },
  );
}
