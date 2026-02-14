"use client";

import { useMemo } from "react";
import * as THREE from "three";

const vertexShader = `
  varying vec3 vNormal;
  varying vec3 vViewPosition;

  void main() {
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    vNormal = normalize(normalMatrix * normal);
    vViewPosition = -mvPosition.xyz;
  }
`;

const fragmentShader = `
  uniform vec3 uColor;
  uniform float uTime;
  uniform float uOpacity;
  uniform float uFresnelPower;
  uniform float uScanlineIntensity;
  uniform float uDefinitionStrength;

  varying vec3 vNormal;
  varying vec3 vViewPosition;

  float hash(float n) {
    return fract(sin(n) * 43758.5453);
  }

  void main() {
    vec3 viewDir = normalize(vViewPosition);
    float fresnel = pow(1.0 - max(dot(viewDir, vNormal), 0.0), uFresnelPower);
    
    // Directional shading for facial definition (nose, eyes, cheeks)
    vec3 lightDir = normalize(vec3(0.4, 0.6, 0.7));
    float NdotL = max(dot(vNormal, lightDir), 0.0);
    float diffuse = mix(0.4, 1.0, NdotL);
    float definition = mix(1.0, diffuse, uDefinitionStrength);
    
    // Base emissive: Fresnel edge glow + normal-based definition
    vec3 emissive = uColor * (0.25 + 0.6 * fresnel) * definition;
    
    // Internal noise flicker (subtle, ~5%)
    float noise = hash(floor(uTime * 12.0) + vViewPosition.x * 10.0 + vViewPosition.y * 10.0);
    float flicker = 1.0 + (noise - 0.5) * 0.10;
    emissive *= flicker;
    
    // Scanlines moving upward (thin horizontal bands)
    float scanline = sin(gl_FragCoord.y * 0.6 + uTime * 5.0) * 0.5 + 0.5;
    emissive *= 1.0 - scanline * uScanlineIntensity;
    
    gl_FragColor = vec4(emissive, uOpacity * (0.5 + 0.5 * fresnel));
  }
`;

const HOLOGRAM_COLOR = new THREE.Color("#5eb8e8");

export function useHologramMaterial() {
  return useMemo(() => {
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide,
      uniforms: {
        uColor: { value: new THREE.Vector3(HOLOGRAM_COLOR.r * 1.0, HOLOGRAM_COLOR.g * 1.0, HOLOGRAM_COLOR.b * 1.0) },
        uTime: { value: 0 },
        uOpacity: { value: 0.55 },
        uFresnelPower: { value: 2.0 },
        uScanlineIntensity: { value: 0.12 },
        uDefinitionStrength: { value: 0.65 },
      },
    });

    // Disable tone mapping so bloom picks up emissive values > 1
    material.toneMapped = false;

    return material;
  }, []);
}
