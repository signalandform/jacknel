"use client";

import { Suspense, useState, useEffect } from "react";
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
  const [dpr, setDpr] = useState(2);
  useEffect(() => {
    setDpr(
      typeof window !== "undefined" && window.devicePixelRatio > 2 ? 1 : 2
    );
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0, 2.5], fov: 45 }}
      dpr={dpr}
      gl={{ antialias: true, alpha: true }}
    >
      <Suspense fallback={null}>
        <SceneContent />
      </Suspense>
    </Canvas>
  );
}
