import React, { Component, Suspense, useEffect, useRef, useState, type ReactNode } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { getScrollFrame } from './scroll';

const vertexShader = `
  varying vec2 vUv;
  varying vec3 vNormal;
  uniform float uTime;
  void main() {
    vUv = uv;
    vNormal = normal;
    vec3 p = position + normal * sin((position.y * 3.4) + uTime * 0.7) * 0.035;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`;

const fragmentShader = `
  varying vec2 vUv;
  varying vec3 vNormal;
  uniform float uTime;
  uniform vec3 uAccent;
  float noise(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }
  void main() {
    float grain = noise(vUv * 180.0 + uTime * 0.08) * 0.065;
    float rim = pow(1.0 - abs(dot(normalize(vNormal), vec3(0.0, 0.0, 1.0))), 2.2);
    float aberration = sin(vUv.y * 22.0 + uTime) * 0.045;
    vec3 dark = vec3(0.018, 0.022, 0.03);
    vec3 color = mix(dark, uAccent, rim * 0.9 + aberration);
    color.r += aberration * 0.45;
    color.b -= aberration * 0.25;
    gl_FragColor = vec4(color + grain, 0.96);
  }
`;

function Instrument() {
  const ref = useRef<THREE.Mesh>(null);
  const material = useRef<THREE.ShaderMaterial>(null);

  useFrame((state) => {
    const mesh = ref.current;
    if (!mesh) return;
    const { progress } = getScrollFrame();
    mesh.rotation.x = state.clock.elapsedTime * 0.12 + progress * Math.PI * 1.5;
    mesh.rotation.y = state.clock.elapsedTime * 0.18 + progress * Math.PI * 2.3;
    mesh.position.x = 1.65 - progress * 3.2;
    mesh.position.y = Math.sin(progress * Math.PI * 5) * 0.55 + 0.15;
    if (material.current) material.current.uniforms.uTime.value = state.clock.elapsedTime;
  });

  return (
    <mesh ref={ref} scale={1.28}>
      <torusKnotGeometry args={[0.82, 0.24, 96, 14, 2, 3]} />
      <shaderMaterial
        ref={material}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          uTime: { value: 0 },
          uAccent: { value: new THREE.Color('#83b9ff') },
        }}
        transparent
      />
    </mesh>
  );
}

class SceneBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? this.props.fallback : this.props.children; }
}

export function FableScene() {
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      setSupported(Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl')));
    } catch {
      setSupported(false);
    }
  }, []);

  const fallback = <div className="fable-scene-fallback" aria-hidden="true" />;
  if (!supported) return fallback;

  return (
    <SceneBoundary fallback={fallback}>
      <Canvas
        className="fable-scene"
        aria-hidden="true"
        dpr={[0.75, 1.25]}
        camera={{ position: [0, 0, 5.2], fov: 42 }}
        gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
      >
        <Suspense fallback={null}>
          <Instrument />
        </Suspense>
      </Canvas>
    </SceneBoundary>
  );
}
