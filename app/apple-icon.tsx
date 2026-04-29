import { ImageResponse } from "next/og";

/**
 * Apple touch icon — 180×180 PNG used by iOS home screens.
 * Filled silhouette on the brand-dark bg; iOS rounds the corners
 * automatically, no need for a mask.
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
        fill="#f4f4f4"
      >
        <title>FoxStudio</title>
        <path d="M 8 3 L 12 11 L 16 7 L 20 11 L 24 3 L 27 11 L 24 18 L 16 28 L 8 18 L 5 11 Z" />
      </svg>
    </div>,
    { ...size },
  );
}
