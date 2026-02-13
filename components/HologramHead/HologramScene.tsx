"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import HologramHead from "./HologramHead";
import { useBloom } from "./SceneWithBloom";

function SceneContent() {
  useBloom();
  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight position={[5, 5, 5]} intensity={0.5} />
      <pointLight position={[-5, 5, 5]} intensity={0.3} color="#00d4ff" />
      <HologramHead />
    </>
  );
}

export default function HologramScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 2.5], fov: 45 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
    >
      <Suspense fallback={null}>
        <SceneContent />
      </Suspense>
    </Canvas>
  );
}
