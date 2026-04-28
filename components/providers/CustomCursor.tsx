"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Custom cursor. Discreet circle that follows the pointer and expands
 * over interactive targets (a, button, [role=button], [data-cursor=hover]).
 * Hidden on touch devices and when prefers-reduced-motion is set.
 */
export function CustomCursor() {
  const ref = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const [enabled, setEnabled] = useState(false);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (reduced || coarse) return;

    setEnabled(true);

    const onMove = (e: PointerEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;

      const el = e.target as HTMLElement | null;
      const interactive = !!el?.closest("a, button, [role='button'], [data-cursor='hover']");
      setHover(interactive);
    };

    const onTouch = () => setEnabled(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("touchstart", onTouch, { once: true, passive: true });

    let rafId = 0;
    const tick = () => {
      current.current.x += (target.current.x - current.current.x) * 0.18;
      current.current.y += (target.current.y - current.current.y) * 0.18;
      if (ref.current) {
        ref.current.style.transform = `translate3d(${current.current.x}px, ${current.current.y}px, 0) translate(-50%, -50%)`;
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("touchstart", onTouch);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none fixed top-0 left-0 z-[var(--z-cursor)] mix-blend-difference transition-[width,height] duration-[var(--duration-base)] ease-[var(--ease-default)] ${
        hover ? "h-10 w-10" : "h-3 w-3"
      } rounded-full bg-[var(--color-fg)]`}
    />
  );
}
