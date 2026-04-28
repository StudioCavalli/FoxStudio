/**
 * Static SVG fallback for the signature scene.
 * Used when prefers-reduced-motion, when WebGL is unavailable,
 * or while the R3F bundle is loading.
 */
export function SignatureFallback() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <svg viewBox="0 0 200 200" className="h-3/5 w-auto" aria-hidden="true" role="presentation">
        <g fill="none" stroke="var(--color-fg)" strokeWidth="1.25" strokeLinejoin="round">
          <polygon points="100,30 150,60 150,140 100,170 50,140 50,60" />
          <polygon points="100,30 150,140 50,140" />
          <polygon points="50,60 100,170 150,60" />
          <line x1="100" y1="30" x2="100" y2="170" />
          <line x1="50" y1="60" x2="150" y2="140" />
          <line x1="150" y1="60" x2="50" y2="140" />
        </g>
      </svg>
    </div>
  );
}
