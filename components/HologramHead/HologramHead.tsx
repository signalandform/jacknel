"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useHologramMaterial } from "./HologramMaterial";

const MODEL_PATH = "/models/head.glb";
const IDLE_ROTATION_SPEED = 0.15;
const MOUSE_SENSITIVITY = 0.4;
const LERP_FACTOR = 0.05;

export default function HologramHead() {
  const groupRef = useRef<THREE.Group>(null);
  const baseRotationRef = useRef(0);
  const mouseOffsetRef = useRef(0);
  const { scene } = useGLTF(MODEL_PATH);
  const hologramMaterial = useHologramMaterial();
  const { pointer } = useThree();
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = () => setPrefersReducedMotion(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const clonedScene = useMemo(() => {
    const clone = scene.clone();
    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        (child as THREE.Mesh).material = hologramMaterial;
      }
    });
    return clone;
  }, [scene, hologramMaterial]);

  useFrame((state) => {
    if (!groupRef.current) return;

    const delta = state.clock.getDelta();

    // Update shader time for scanlines
    hologramMaterial.uniforms.uTime.value = state.clock.getElapsedTime();

    // Idle rotation (disabled when reduced motion)
    if (!prefersReducedMotion) {
      baseRotationRef.current += IDLE_ROTATION_SPEED * delta;
    }

    // Mouse offset, smoothly lerped (pointer.x is -1 to 1)
    const targetMouseOffset = pointer.x * MOUSE_SENSITIVITY;
    mouseOffsetRef.current +=
      (targetMouseOffset - mouseOffsetRef.current) * LERP_FACTOR;

    groupRef.current.rotation.y = baseRotationRef.current + mouseOffsetRef.current;
  });

  return (
    <group ref={groupRef} scale={1.2} position={[0, -0.1, 0]}>
      <primitive object={clonedScene} />
    </group>
  );
}
