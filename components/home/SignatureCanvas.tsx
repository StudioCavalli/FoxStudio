"use client";

import { Edges, Float } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Mesh } from "three";

function Geometry() {
  const ref = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x += delta * 0.08;
    ref.current.rotation.y += delta * 0.12;
  });

  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[1.6, 0]} />
      {/* Invisible material; only edges are drawn (monochrome wireframe) */}
      <meshBasicMaterial transparent opacity={0} />
      <Edges color="#f4f4f4" lineWidth={1} />
    </mesh>
  );
}

export function SignatureCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4.5], fov: 50 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ width: "100%", height: "100%" }}
      aria-hidden="true"
    >
      <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.3}>
        <Geometry />
      </Float>
    </Canvas>
  );
}
