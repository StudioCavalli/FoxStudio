import { ImageResponse } from "next/og";

import { SITE } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "FoxStudio — R&D lab of FoxCase.";

const TAGLINE: Record<string, string> = {
  fr: "Le laboratoire R&D de FoxCase.",
  en: "The R&D lab of FoxCase.",
  it: "Il laboratorio R&D di FoxCase.",
};

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const tagline = TAGLINE[locale] ?? TAGLINE.en;

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
        <span style={{ display: "flex", alignItems: "center", gap: 16 }}>
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
          <span style={{ color: "#f4f4f4" }}>FoxStudio</span>
          <span>00 ▸ Manifesto</span>
        </span>
        <span>v{SITE.version}</span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
        <h1
          style={{
            fontSize: 144,
            fontWeight: 600,
            lineHeight: 0.92,
            letterSpacing: -3,
            margin: 0,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <span>FoxStudio</span>
          <span style={{ color: "#a0a0a0" }}>R&amp;D Lab.</span>
        </h1>
        <p
          style={{
            fontSize: 32,
            lineHeight: 1.2,
            margin: 0,
            maxWidth: 720,
            color: "#f4f4f4",
          }}
        >
          {tagline}
        </p>
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
        <span>
          {SITE.contact.location} · {SITE.contact.timezone}
        </span>
        <span style={{ color: "#f4f4f4" }}>~ 0.18 g CO₂ · this view</span>
      </div>
    </div>,
    { ...size },
  );
}
