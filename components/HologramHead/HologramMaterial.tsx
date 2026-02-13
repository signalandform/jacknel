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
    
    // Subtle scanline animation
    float scanline = sin(vViewPosition.y * 80.0 + uTime * 2.0) * 0.5 + 0.5;
    emissive *= 1.0 - scanline * uScanlineIntensity;
    
    gl_FragColor = vec4(emissive, uOpacity * (0.5 + 0.5 * fresnel));
  }
`;

const HOLOGRAM_COLOR = new THREE.Color("#00d4ff");

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
        uColor: { value: new THREE.Vector3(HOLOGRAM_COLOR.r * 2, HOLOGRAM_COLOR.g * 2, HOLOGRAM_COLOR.b * 2) },
        uTime: { value: 0 },
        uOpacity: { value: 0.75 },
        uFresnelPower: { value: 2.5 },
        uScanlineIntensity: { value: 0.08 },
        uDefinitionStrength: { value: 0.65 },
      },
    });

    // Disable tone mapping so bloom picks up emissive values > 1
    material.toneMapped = false;

    return material;
  }, []);
}
