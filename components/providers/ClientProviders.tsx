"use client";

import dynamic from "next/dynamic";

/**
 * Lazy-loads non-critical visual providers AFTER hydration.
 * Lenis (smooth scroll) and CustomCursor are nice-to-have but they
 * pull ~10kB and wire pointer listeners that don't need to block the
 * first paint — defer them to a separate chunk via next/dynamic + ssr:false.
 */

const SmoothScroll = dynamic(
  () => import("./SmoothScroll").then((m) => ({ default: m.SmoothScroll })),
  { ssr: false },
);

const CustomCursor = dynamic(
  () => import("./CustomCursor").then((m) => ({ default: m.CustomCursor })),
  { ssr: false },
);

export function ClientProviders() {
  return (
    <>
      <SmoothScroll />
      <CustomCursor />
    </>
  );
}
