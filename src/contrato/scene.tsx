import React, { Component, Suspense, useEffect, useRef, useState, type ReactNode } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { getScrollFrame } from './scroll';

function BrandInstrument() {
  const ref = useRef<THREE.Group>(null);
  const gltf = useLoader(GLTFLoader, '/logo-h.glb');

  useFrame((state) => {
    const group = ref.current;
    if (!group) return;
    const { progress } = getScrollFrame();
    group.rotation.x = Math.sin(state.clock.elapsedTime * 0.35) * 0.12 + Math.sin(progress * Math.PI) * 0.15;
    group.rotation.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.2 + Math.sin(progress * Math.PI * 1.5) * 0.45;
    group.rotation.z = Math.sin(state.clock.elapsedTime * 0.28) * 0.06;
    group.position.x = 0.75 - progress * 1.7;
    group.position.y = Math.sin(state.clock.elapsedTime * 0.55 + progress * Math.PI * 2) * 0.18 + 0.15;
  });

  return (
    <group ref={ref} scale={0.85} rotation={[0.12, -0.25, 0]}>
      <primitive object={gltf.scene} />
    </group>
  );
}

class SceneBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? this.props.fallback : this.props.children; }
}

export function FableScene() {
  const [frameloop, setFrameloop] = useState<'always' | 'never'>(() =>
    typeof document !== 'undefined' && document.visibilityState === 'hidden' ? 'never' : 'always',
  );

  useEffect(() => {
    const onVisibilityChange = () => {
      setFrameloop(document.visibilityState === 'hidden' ? 'never' : 'always');
    };
    document.addEventListener('visibilitychange', onVisibilityChange);
    return () => document.removeEventListener('visibilitychange', onVisibilityChange);
  }, []);

  return (
    <SceneBoundary fallback={<div className="fable-scene-fallback" aria-hidden="true"><img src="/logo-h-white.png" alt="" /></div>}>
      <Canvas
        className="fable-scene"
        aria-hidden="true"
        dpr={[0.75, 1.1]}
        frameloop={frameloop}
        performance={{ min: 0.5 }}
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
