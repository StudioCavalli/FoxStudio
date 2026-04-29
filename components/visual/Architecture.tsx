"use client";

import { useEffect, useRef, useState } from "react";

import type {
  ArchEdge,
  ArchNode,
  ArchRole,
  Architecture as ArchitectureData,
} from "@/lib/data/architectures";
import type { Locale } from "@/lib/site";

/**
 * System architecture diagram — black-and-white SVG schematic.
 *
 * Visual language matches the rest of the site: thin 1.5 px strokes,
 * Geist Sans for node labels, Geist Mono uppercase for role badges and
 * edge captions, no fills (boxes are transparent so the section bg shows
 * through). Nodes and edges fade in / slide up with a small stagger
 * once the diagram enters the viewport — driven by IntersectionObserver
 * and CSS transitions so the markup stays static and SSR-friendly.
 *
 * Layout: 12-col × 6-row grid; each node carries `col`/`row` and an
 * optional `w` (column span). Edge router is a simple 3-segment elbow
 * through the midpoint — good enough for the 5–7 node graphs we author.
 */

const COLS = 12;
const ROWS = 6;
const VIEW_W = 1200;
const VIEW_H = 600;
const CELL_W = VIEW_W / COLS;
const CELL_H = VIEW_H / ROWS;
const NODE_PAD_X = 14;
const NODE_PAD_Y = 16;
const DEFAULT_W = 3;

const ROLE_BADGE: Record<ArchRole, string> = {
  client: "CLIENT",
  device: "DEVICE",
  server: "SERVER",
  service: "SERVICE",
  storage: "STORAGE",
  edge: "EDGE",
  external: "EXTERNAL",
};

type NodeRect = {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  cx: number;
  cy: number;
};

function placeNode(node: ArchNode): NodeRect {
  const w = (node.w ?? DEFAULT_W) * CELL_W - NODE_PAD_X * 2;
  const h = CELL_H - NODE_PAD_Y * 2;
  const x = node.col * CELL_W + NODE_PAD_X;
  const y = node.row * CELL_H + NODE_PAD_Y;
  return { id: node.id, x, y, w, h, cx: x + w / 2, cy: y + h / 2 };
}

function edgeAnchor(a: NodeRect, b: NodeRect): { x: number; y: number } {
  const dx = b.cx - a.cx;
  const dy = b.cy - a.cy;
  const horizontalDominant = Math.abs(dx) * a.h >= Math.abs(dy) * a.w;
  if (horizontalDominant) {
    return { x: dx > 0 ? a.x + a.w : a.x, y: a.cy };
  }
  return { x: a.cx, y: dy > 0 ? a.y + a.h : a.y };
}

function edgePath(from: NodeRect, to: NodeRect): { d: string; mid: { x: number; y: number } } {
  const a = edgeAnchor(from, to);
  const b = edgeAnchor(to, from);
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  const horizontalFirst = Math.abs(b.x - a.x) >= Math.abs(b.y - a.y);
  const d = horizontalFirst
    ? `M ${a.x} ${a.y} L ${mx} ${a.y} L ${mx} ${b.y} L ${b.x} ${b.y}`
    : `M ${a.x} ${a.y} L ${a.x} ${my} L ${b.x} ${my} L ${b.x} ${b.y}`;
  return { d, mid: { x: mx, y: my } };
}

function strokeFor(kind: ArchEdge["kind"]): string | undefined {
  switch (kind) {
    case "async":
      return "6 4";
    case "data":
      return "2 4";
    default:
      return undefined;
  }
}

type Props = {
  architecture: ArchitectureData;
  locale: Locale;
  className?: string;
};

export function Architecture({ architecture, locale, className = "" }: Props) {
  const ref = useRef<SVGSVGElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setInView(true);
      return;
    }
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  const placed = new Map<string, NodeRect>();
  for (const n of architecture.nodes) placed.set(n.id, placeNode(n));

  return (
    <svg
      ref={ref}
      role="img"
      aria-label="System architecture diagram"
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      preserveAspectRatio="xMidYMid meet"
      className={`arch ${inView ? "arch--in" : ""} ${className}`}
    >
      <title>System architecture diagram</title>
      <defs>
        <marker
          id="arch-arrow"
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" />
        </marker>
      </defs>

      {/* Edges first so the box borders sit on top and mask the line ends. */}
      <g stroke="currentColor" fill="none" strokeWidth={1.5} strokeLinecap="round">
        {architecture.edges.map((e, i) => {
          const a = placed.get(e.from);
          const b = placed.get(e.to);
          if (!a || !b) return null;
          const { d, mid } = edgePath(a, b);
          const dash = strokeFor(e.kind);
          const label = e.label?.[locale];
          // Edges come in slightly after nodes, then their labels last.
          const delay = 220 + i * 60;
          return (
            <g
              key={`${e.from}-${e.to}-${i}`}
              className="arch-edge"
              style={{ ["--d" as string]: `${delay}ms` }}
            >
              <path d={d} strokeDasharray={dash} markerEnd="url(#arch-arrow)" />
              {label && (
                <g
                  className="arch-edge-label"
                  style={{ ["--d" as string]: `${delay + 120}ms` }}
                  transform={`translate(${mid.x} ${mid.y})`}
                >
                  <rect
                    x={-(label.length * 3.4 + 8)}
                    y={-8}
                    width={label.length * 6.8 + 16}
                    height={16}
                    fill="var(--color-bg-secondary)"
                    stroke="none"
                  />
                  <text
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontFamily="var(--font-mono)"
                    fontSize="9"
                    letterSpacing="0.1em"
                    fill="currentColor"
                    opacity={0.7}
                    style={{ textTransform: "uppercase" }}
                  >
                    {label}
                  </text>
                </g>
              )}
            </g>
          );
        })}
      </g>

      {/* Nodes */}
      <g>
        {architecture.nodes.map((n, i) => {
          const r = placed.get(n.id);
          if (!r) return null;
          const delay = i * 70;
          return (
            <g key={n.id} className="arch-node" style={{ ["--d" as string]: `${delay}ms` }}>
              <rect
                x={r.x}
                y={r.y}
                width={r.w}
                height={r.h}
                fill="var(--color-bg-secondary)"
                stroke="currentColor"
                strokeWidth={1.5}
              />
              <text
                x={r.x + 14}
                y={r.y + 18}
                fontFamily="var(--font-mono)"
                fontSize="9"
                letterSpacing="0.12em"
                fill="currentColor"
                opacity={0.5}
                style={{ textTransform: "uppercase" }}
              >
                {ROLE_BADGE[n.role]}
              </text>
              <text
                x={r.cx}
                y={r.cy + 12}
                textAnchor="middle"
                fontFamily="var(--font-display)"
                fontSize="20"
                fontWeight={500}
                letterSpacing="-0.01em"
                fill="currentColor"
              >
                {n.label[locale]}
              </text>
            </g>
          );
        })}
      </g>
    </svg>
  );
}
