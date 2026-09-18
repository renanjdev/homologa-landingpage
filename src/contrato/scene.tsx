import React, { Component, Suspense, useMemo, useRef, type ReactNode } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js';
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

function BrandInstrument() {
  const ref = useRef<THREE.Group>(null);
  const svg = useLoader(SVGLoader, '/logo-h.svg');
  const geometries = useMemo(() => svg.paths.flatMap((path) => SVGLoader.createShapes(path).map((shape) => {
    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: 8,
      bevelEnabled: true,
      bevelSegments: 3,
      bevelSize: 1.5,
      bevelThickness: 1.2,
      curveSegments: 3,
    });
    geometry.scale(0.022, -0.022, 0.022);
    geometry.center();
    return geometry;
  })), [svg]);

  useFrame((state) => {
    const group = ref.current;
    if (!group) return;
    const { progress } = getScrollFrame();
    group.rotation.x = Math.sin(state.clock.elapsedTime * 0.35) * 0.18 + progress * 0.55;
    group.rotation.y = state.clock.elapsedTime * 0.18 + progress * 1.5;
    group.rotation.z = Math.sin(state.clock.elapsedTime * 0.28) * 0.08;
    group.position.x = 1.55 - progress * 1.7;
    group.position.y = Math.sin(state.clock.elapsedTime * 0.55 + progress * Math.PI * 2) * 0.18 + 0.15;
  });

  return (
    <group ref={ref} scale={0.52} rotation={[0.12, -0.25, 0]}>
      {geometries.map((geometry, index) => (
        <mesh key={index} geometry={geometry} position={[0, 0, index * 0.018]}>
          <meshStandardMaterial color={index === 2 ? '#83b9ff' : '#0d1b33'} metalness={0.58} roughness={0.24} emissive={index === 2 ? '#132f62' : '#02050b'} emissiveIntensity={0.7} />
        </mesh>
      ))}
    </group>
  );
}

class SceneBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? this.props.fallback : this.props.children; }
}

export function FableScene() {
  return (
    <SceneBoundary fallback={<div className="fable-scene-fallback" aria-hidden="true"><img src="/logo-h-white.png" alt="" /></div>}>
      <Canvas
        className="fable-scene"
        aria-hidden="true"
        dpr={[0.75, 1.1]}
        camera={{ position: [0, 0, 5.2], fov: 42 }}
        gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={0.7} />
        <pointLight position={[2, 2, 4]} intensity={3.2} color="#83b9ff" />
        <pointLight position={[-2, -1, 2]} intensity={1.4} color="#f2efe8" />
        <Suspense fallback={null}>
          <BrandInstrument />
        </Suspense>
      </Canvas>
    </SceneBoundary>
  );
}
