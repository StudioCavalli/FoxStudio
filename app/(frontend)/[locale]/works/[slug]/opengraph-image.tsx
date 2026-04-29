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
        <span>FoxStudio</span>
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
