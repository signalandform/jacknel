"use client";

import { useRef, useMemo, useEffect } from "react";
import { addAfterEffect, useThree } from "@react-three/fiber";
import {
  EffectComposer as PostEffectComposer,
  RenderPass,
  EffectPass,
  BloomEffect,
} from "postprocessing";
import * as THREE from "three";

/**
 * Custom bloom using postprocessing directly.
 * Bypasses @react-three/postprocessing's EffectComposer which has
 * a React 18 compatibility bug (groupInstance.children undefined).
 */
export function useBloom() {
  const { gl, scene, camera, size } = useThree();

  const composer = useMemo(() => {
    const c = new PostEffectComposer(gl, {
      frameBufferType: THREE.HalfFloatType,
    });
    c.addPass(new RenderPass(scene, camera));
    c.addPass(
      new EffectPass(
        camera,
        new BloomEffect({
          luminanceThreshold: 0.85,
          luminanceSmoothing: 0.03,
          intensity: 0.55,
          mipmapBlur: true,
        })
      )
    );
    return c;
  }, [gl, scene, camera]);

  useEffect(() => {
    const prevToneMapping = gl.toneMapping;
    gl.toneMapping = THREE.NoToneMapping;

    const unsubscribe = addAfterEffect(() => {
      composer.setSize(size.width, size.height);
      composer.render();
    });

    return () => {
      unsubscribe();
      composer.dispose();
      gl.toneMapping = prevToneMapping;
    };
  }, [composer, gl, size.width, size.height]);

  return null;
}
