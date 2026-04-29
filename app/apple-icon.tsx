import { ImageResponse } from "next/og";

/**
 * Apple touch icon — 180×180 PNG used by iOS home screens.
 * Outline mark + filled eye dots, matching the FoxLogo component.
 * iOS rounds the corners automatically, no mask needed.
 */

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0a0a0a",
      }}
    >
      <svg
        viewBox="0 0 32 32"
        width="120"
        height="120"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        stroke="#f4f4f4"
        strokeWidth="1.6"
        strokeLinejoin="round"
        strokeLinecap="round"
      >
        <title>FoxStudio</title>
        <path d="M 8 3 L 12 11 L 16 7 L 20 11 L 24 3 L 27 11 L 24 18 L 16 28 L 8 18 L 5 11 Z" />
        <circle cx="12.5" cy="15.5" r="0.9" fill="#f4f4f4" stroke="none" />
        <circle cx="19.5" cy="15.5" r="0.9" fill="#f4f4f4" stroke="none" />
      </svg>
    </div>,
    { ...size },
  );
}
