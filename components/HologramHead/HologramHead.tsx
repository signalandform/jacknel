"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useHologramMaterial } from "./HologramMaterial";

const MODEL_PATH = "/models/head.glb";
const IDLE_ROTATION_SPEED = 0.6;
const MOUSE_SENSITIVITY = 0.4;
const LERP_FACTOR = 0.05;
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
  const baseRotationRef = useRef(0);
  const mouseOffsetRef = useRef(0);
  const glitchCooldownRef = useRef(GLITCH_MIN_COOLDOWN);
  const glitchFramesRef = useRef(0);
  const glitchOffsetRef = useRef({ x: 0, y: 0, rotZ: 0 });
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
    if (!groupRef.current || !spinRef.current) return;

    const delta = state.clock.getDelta();
    const elapsed = state.clock.getElapsedTime();

    // Update shader time for scanlines
    hologramMaterial.uniforms.uTime.value = elapsed;

    // Idle rotation (disabled when reduced motion)
    if (!prefersReducedMotion) {
      baseRotationRef.current += IDLE_ROTATION_SPEED * delta;
    }

    // Mouse offset, smoothly lerped (pointer.x is -1 to 1)
    const targetMouseOffset = pointer.x * MOUSE_SENSITIVITY;
    mouseOffsetRef.current +=
      (targetMouseOffset - mouseOffsetRef.current) * LERP_FACTOR;

    // Apply rotation to inner group (no props = reconciler won't overwrite)
    spinRef.current.rotation.y = baseRotationRef.current + mouseOffsetRef.current;

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
    <group ref={groupRef} scale={0.15}>
      <group ref={spinRef}>
        <primitive object={clonedScene} />
      </group>
    </group>
  );
}
