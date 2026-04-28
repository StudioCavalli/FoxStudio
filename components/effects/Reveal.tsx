"use client";

import { useEffect, useRef, useState } from "react";

type RevealProps = {
  children: React.ReactNode;
  /** Delay before the animation starts, ms */
  delay?: number;
  /** Distance to translate from, in px */
  distance?: number;
  /** Direction to translate from */
  from?: "up" | "down";
  className?: string;
};

/**
 * Lightweight scroll-driven reveal. Uses IntersectionObserver
 * (broad support) and respects prefers-reduced-motion.
 *
 * The animation is a one-shot fade + translate; the element stays
 * visible after triggering, no thrashing on scroll-back.
 */
export function Reveal({
  children,
  delay = 0,
  distance = 24,
  from = "up",
  className = "",
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);

    const node = ref.current;
    if (!node) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" },
    );

    io.observe(node);
    return () => io.disconnect();
  }, []);

  const initial = reduced || visible ? "opacity-100" : "opacity-0";

  const transformInitial = reduced
    ? undefined
    : visible
      ? "translate3d(0,0,0)"
      : `translate3d(0, ${from === "up" ? distance : -distance}px, 0)`;

  return (
    <div
      ref={ref}
      className={`transition-all duration-[var(--duration-slow)] ease-[var(--ease-reveal)] ${initial} ${className}`}
      style={{
        transform: transformInitial,
        transitionDelay: `${delay}ms`,
        willChange: reduced ? undefined : "transform, opacity",
      }}
    >
      {children}
    </div>
  );
}
