import { notFound } from "next/navigation";
import { ImageResponse } from "next/og";

import { getProjectBySlug } from "@/lib/data/projects";
import { SITE } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "FoxStudio project page.";

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  const project = await getProjectBySlug(slug, locale as "fr" | "en" | "it");
  if (!project) notFound();

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
        <span>
          {project.number} ▸ {project.year}
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: 14 }}>
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
            fontSize: 124,
            fontWeight: 600,
            lineHeight: 0.92,
            letterSpacing: -3,
            margin: 0,
            display: "flex",
          }}
        >
          {project.name}
        </h1>
        {project.summary && (
          <p
            style={{
              fontSize: 28,
              lineHeight: 1.25,
              margin: 0,
              maxWidth: 900,
              color: "#a0a0a0",
            }}
          >
            {project.summary}
          </p>
        )}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontFamily: "ui-monospace, monospace",
          fontSize: 18,
          letterSpacing: 1.2,
          textTransform: "uppercase",
          color: "#a0a0a0",
        }}
      >
        <span style={{ display: "flex" }}>{project.stack.slice(0, 4).join(" · ")}</span>
        <span>
          {SITE.url.replace(/^https?:\/\//, "")}/works/{project.slug}
        </span>
      </div>
    </div>,
    { ...size },
  );
}
