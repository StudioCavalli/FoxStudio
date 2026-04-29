/**
 * Top-level 404 — used for routes that fall outside the (frontend) and
 * (payload) groups (e.g. truly unknown paths). Localized 404 lives at
 * app/(frontend)/[locale]/not-found.tsx and handles in-app navigation.
 *
 * This minimalist version is intentionally locale-less; visitors here
 * have already hit a misrouting before reaching the i18n layer.
 */

export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "32px",
          padding: "48px 20px",
          background: "#0a0a0a",
          color: "#f4f4f4",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <p
          style={{
            fontFamily: "ui-monospace, monospace",
            fontSize: "12px",
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            color: "#a0a0a0",
            margin: 0,
          }}
        >
          404 ▸ Not found
        </p>
        <h1
          style={{
            fontSize: "clamp(48px, 8vw, 128px)",
            fontWeight: 500,
            lineHeight: 0.92,
            letterSpacing: "-0.03em",
            margin: 0,
            textAlign: "center",
          }}
        >
          This page doesn't exist.
          <br />
          Probably never did.
        </h1>
        <a
          href="/"
          style={{
            fontFamily: "ui-monospace, monospace",
            fontSize: "13px",
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            color: "#f4f4f4",
            textDecoration: "underline",
            textUnderlineOffset: "6px",
          }}
        >
          ◂ Back to home
        </a>
      </body>
    </html>
  );
}
