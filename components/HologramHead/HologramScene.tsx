"use client";

import { Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import HologramHead from "./HologramHead";

function SceneContent() {
  return (
    <>
      <hemisphereLight
        color="#e8f4fc"
        groundColor="#d4c4a8"
        intensity={0.6}
      />
      <ambientLight intensity={1.5} />
      <directionalLight position={[5, 5, 5]} intensity={5} />
      <directionalLight position={[-5, 5, 5]} intensity={5} />
      <pointLight position={[-5, 5, 5]} intensity={5} color="#fff5e6" />
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
      frameloop="always"
      gl={{ antialias: true, alpha: true }}
    >
      <Suspense fallback={null}>
        <SceneContent />
      </Suspense>
    </Canvas>
  );
}
