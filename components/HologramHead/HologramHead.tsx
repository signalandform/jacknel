"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

const MODEL_PATH = "/models/head.glb";
const ROTATION_PERIOD_SEC = 10 / 100; // 100x faster: ~10 rotations per second
const IDLE_ROTATION_SPEED = (Math.PI * 2) / ROTATION_PERIOD_SEC; // 2π / 10 ≈ 0.628
const FLOAT_AMPLITUDE = 0.05;
const FLOAT_SPEED = 0.8;
const GLITCH_CHANCE = 0.004;
const GLITCH_MIN_COOLDOWN = 3;
const GLITCH_MAX_COOLDOWN = 8;
const GLITCH_MAX_OFFSET = 0.015;
const GLITCH_MAX_ROTATION = 0.02;

export default function HologramHead() {
  const groupRef = useRef<THREE.Group>(null);
  const spinRef = useRef<THREE.Group>(null);
  const [rotationY, setRotationY] = useState(0);
  const glitchCooldownRef = useRef(GLITCH_MIN_COOLDOWN);
  const glitchFramesRef = useRef(0);
  const glitchOffsetRef = useRef({ x: 0, y: 0, rotZ: 0 });
  const { scene } = useGLTF(MODEL_PATH);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = () => setPrefersReducedMotion(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const clonedScene = useMemo(() => scene.clone(), [scene]);

  useFrame((state) => {
    if (!groupRef.current || !spinRef.current) return;

    const delta = state.clock.getDelta();
    const elapsed = state.clock.getElapsedTime();

    // Idle rotation (slower when reduced motion)
    const rotSpeed = prefersReducedMotion ? 0.05 : IDLE_ROTATION_SPEED;
    setRotationY((prev) => prev + rotSpeed * delta);

    // Vertical floating motion (sin wave)
    const floatOffset = prefersReducedMotion
      ? 0
      : Math.sin(elapsed * FLOAT_SPEED) * FLOAT_AMPLITUDE;
    const baseY = -0.1;

    // Glitch jitter (occasional random offset/rotation)
    if (!prefersReducedMotion) {
      glitchCooldownRef.current -= delta;
      if (glitchFramesRef.current > 0) {
        glitchFramesRef.current--;
        groupRef.current.position.x = glitchOffsetRef.current.x;
        groupRef.current.position.y = baseY + floatOffset + glitchOffsetRef.current.y;
        groupRef.current.position.z = 0;
        groupRef.current.rotation.z = glitchOffsetRef.current.rotZ;
      } else {
        const glitchChance =
          typeof window !== "undefined" && window.innerWidth < 768
            ? GLITCH_CHANCE * 0.3
            : GLITCH_CHANCE;
        if (glitchCooldownRef.current <= 0 && Math.random() < glitchChance) {
          glitchFramesRef.current = 2 + Math.floor(Math.random() * 3);
          glitchOffsetRef.current = {
            x: (Math.random() - 0.5) * 2 * GLITCH_MAX_OFFSET,
            y: (Math.random() - 0.5) * 2 * GLITCH_MAX_OFFSET,
            rotZ: (Math.random() - 0.5) * 2 * GLITCH_MAX_ROTATION,
          };
          glitchCooldownRef.current =
            GLITCH_MIN_COOLDOWN + Math.random() * (GLITCH_MAX_COOLDOWN - GLITCH_MIN_COOLDOWN);
        }
        groupRef.current.position.x = 0;
        groupRef.current.position.y = baseY + floatOffset;
        groupRef.current.position.z = 0;
        groupRef.current.rotation.z = 0;
      }
    } else {
      groupRef.current.position.x = 0;
      groupRef.current.position.y = baseY + floatOffset;
      groupRef.current.position.z = 0;
      groupRef.current.rotation.z = 0;
    }
  });

  return (
    <group ref={groupRef} scale={1.6}>
      <group ref={spinRef} rotation={[0, rotationY, 0]}>
        <primitive object={clonedScene} />
      </group>
    </group>
  );
}
