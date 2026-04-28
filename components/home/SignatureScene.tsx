"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

import { SignatureFallback } from "./SignatureFallback";

/**
 * Dynamically loaded R3F canvas. ssr:false keeps three.js out of the
 * server bundle and out of the initial HTML; it streams only when the
 * user is on a client without reduced-motion.
 */
const SignatureCanvas = dynamic(() => import("./SignatureCanvas").then((m) => m.SignatureCanvas), {
  ssr: false,
  loading: () => <SignatureFallback />,
});

export function SignatureScene() {
  // null = not yet checked (SSR + first paint) → show static fallback.
  // true = user wants reduced motion → keep static fallback.
  // false = OK to load three.js.
  const [reducedMotion, setReducedMotion] = useState<boolean | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  if (reducedMotion === null || reducedMotion) {
    return <SignatureFallback />;
  }

  return <SignatureCanvas />;
}
