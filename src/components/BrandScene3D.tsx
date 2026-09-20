import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const MODEL_URL = '/logo-h.glb';

function disposeObject(object: THREE.Object3D) {
  object.traverse((child) => {
    if (!(child instanceof THREE.Mesh)) return;
    child.geometry?.dispose();
    const materials = Array.isArray(child.material) ? child.material : [child.material];
    materials.forEach((material) => material?.dispose());
  });
}

export default function BrandScene3D() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let renderer: THREE.WebGLRenderer | null = null;
    let animationFrame = 0;
    let disposed = false;
    let halfVisibleWidth = 1;
    let halfVisibleHeight = 1;
    let scrollProgress = 0;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 0, 5.2);

    const instrument = new THREE.Group();
    instrument.position.set(1.2, 0.05, 0);
    instrument.rotation.set(0.12, -0.25, 0);
    scene.add(instrument);

    scene.add(new THREE.AmbientLight('#dbeafe', 0.72));
    const keyLight = new THREE.PointLight('#83b9ff', 3.2);
    keyLight.position.set(2, 2, 4);
    scene.add(keyLight);
    const fillLight = new THREE.PointLight('#f2efe8', 1.35);
    fillLight.position.set(-2, -1, 2);
    scene.add(fillLight);

    const render = () => renderer?.render(scene, camera);

    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: false,
        powerPreference: 'high-performance',
      });
      renderer.setClearColor(0x000000, 0);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.25));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.domElement.setAttribute('aria-hidden', 'true');
      renderer.domElement.setAttribute('tabindex', '-1');
      host.appendChild(renderer.domElement);
    } catch {
      return;
    }

    const resize = () => {
      if (!renderer) return;
      const width = Math.max(host.clientWidth, 1);
      const height = Math.max(host.clientHeight, 1);
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      halfVisibleHeight = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.position.z;
      halfVisibleWidth = halfVisibleHeight * camera.aspect;
      instrument.position.x = halfVisibleWidth * (width < 640 ? 0.55 : 0.68);
      render();
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);
    resize();

    const clock = new THREE.Clock();
    const animate = () => {
      if (disposed) return;
      animationFrame = window.requestAnimationFrame(animate);
      if (document.hidden) return;

      const elapsed = clock.getElapsedTime();
      const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      const targetProgress = THREE.MathUtils.clamp(window.scrollY / maxScroll, 0, 1);
      scrollProgress = THREE.MathUtils.lerp(scrollProgress, targetProgress, 0.055);
      const mobileAmplitude = window.innerWidth < 640 ? 0.78 : 1;

      instrument.rotation.x = 0.12 + Math.sin(elapsed * 0.35) * 0.1 + Math.sin(scrollProgress * Math.PI) * 0.15;
      instrument.rotation.y = -0.25 + Math.sin(elapsed * 0.4) * 0.2 + scrollProgress * Math.PI * 2.15;
      instrument.rotation.z = Math.sin(elapsed * 0.28) * 0.055;
      instrument.position.x = halfVisibleWidth * Math.cos(scrollProgress * Math.PI * 3) * 0.68 * mobileAmplitude;
      instrument.position.y = halfVisibleHeight * Math.sin(scrollProgress * Math.PI * 4) * 0.38
        + Math.sin(elapsed * 0.55) * 0.11;
      render();
    };

    const loader = new GLTFLoader();
    loader.load(
      MODEL_URL,
      (gltf) => {
        if (disposed) {
          disposeObject(gltf.scene);
          return;
        }

        const bounds = new THREE.Box3().setFromObject(gltf.scene);
        const size = bounds.getSize(new THREE.Vector3());
        const center = bounds.getCenter(new THREE.Vector3());
        const longestSide = Math.max(size.x, size.y, size.z, 0.001);
        gltf.scene.position.sub(center);
        gltf.scene.scale.setScalar(2.45 / longestSide);
        instrument.add(gltf.scene);
        host.dataset.ready = 'true';
        render();

        if (!prefersReducedMotion) animate();
      },
      undefined,
      () => {
        host.dataset.failed = 'true';
      },
    );

    return () => {
      disposed = true;
      window.cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      disposeObject(instrument);
      renderer?.dispose();
      renderer?.forceContextLoss();
      renderer?.domElement.remove();
    };
  }, []);

  return (
    <div ref={hostRef} className="landing-3d-scene" aria-hidden="true">
      <img src="/logo-h-white.png" alt="" />
    </div>
  );
}
