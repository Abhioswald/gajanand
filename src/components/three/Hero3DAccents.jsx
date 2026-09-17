import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// Shared materials for zero allocation overhead
const SPICE_MAT1 = new THREE.MeshStandardMaterial({ color: '#D96814', roughness: 0.6, transparent: true, opacity: 0.65 });
const SPICE_MAT2 = new THREE.MeshStandardMaterial({ color: '#8F3418', roughness: 0.6, transparent: true, opacity: 0.65 });
const SPICE_MAT3 = new THREE.MeshStandardMaterial({ color: '#496A3D', roughness: 0.6, transparent: true, opacity: 0.65 });
const SPICE_MAT4 = new THREE.MeshStandardMaterial({ color: '#C46A21', roughness: 0.6, transparent: true, opacity: 0.65 });
const CHILLI_MAT = new THREE.MeshStandardMaterial({ color: '#3A752B', roughness: 0.35, transparent: true, opacity: 0.65 });
const STEM_MAT = new THREE.MeshStandardMaterial({ color: '#244B18', roughness: 0.8 });

const PARTICLE_GEO = new THREE.OctahedronGeometry(1, 0);

// Consolidated Scene (Single useFrame loop managing all particle drifts)
function HeroScene({ isReducedMotion, isVisible }) {
  const { viewport } = useThree();
  const groupRef = useRef();
  const chilliRef = useRef();
  const particleRefs = useRef([]);

  const mouse = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  // Outer perimeter particle parameters
  const particles = useMemo(() => [
    { pos: [-viewport.width * 0.38, viewport.height * 0.35, -0.5], scale: 0.07, mat: SPICE_MAT1, speed: 0.6, rot: [0.005, 0.008, 0.003], phase: 0.2 },
    { pos: [-viewport.width * 0.42, viewport.height * 0.22, 0.2], scale: 0.045, mat: SPICE_MAT2, speed: 0.8, rot: [0.007, 0.004, 0.006], phase: 1.5 },
    { pos: [-viewport.width * 0.32, viewport.height * 0.42, -1], scale: 0.035, mat: SPICE_MAT3, speed: 0.5, rot: [0.004, 0.006, 0.002], phase: 2.8 },
    { pos: [viewport.width * 0.38, viewport.height * 0.38, -0.2], scale: 0.065, mat: SPICE_MAT4, speed: 0.7, rot: [0.006, 0.005, 0.008], phase: 3.4 },
    { pos: [-viewport.width * 0.4, -viewport.height * 0.3, 0], scale: 0.055, mat: SPICE_MAT2, speed: 0.7, rot: [0.005, 0.007, 0.003], phase: 4.1 },
    { pos: [viewport.width * 0.36, -viewport.height * 0.32, -0.4], scale: 0.08, mat: SPICE_MAT1, speed: 0.6, rot: [0.004, 0.006, 0.005], phase: 5.3 },
  ], [viewport]);

  useFrame((state) => {
    // Stop calculations if off-screen or in reduced-motion
    if (!groupRef.current || !isVisible || isReducedMotion) return;

    const time = state.clock.getElapsedTime();

    // 1. Single consolidated loop for all floating particles
    for (let i = 0; i < particles.length; i++) {
      const mesh = particleRefs.current[i];
      if (mesh) {
        const p = particles[i];
        const t = time * p.speed + p.phase;
        mesh.position.y = p.pos[1] + Math.sin(t) * 0.1;
        mesh.position.x = p.pos[0] + Math.cos(t * 0.7) * 0.06;
        mesh.rotation.x += p.rot[0];
        mesh.rotation.y += p.rot[1];
      }
    }

    // 2. Chilli gentle swing
    if (chilliRef.current) {
      const t = time * 0.6;
      chilliRef.current.position.y = -viewport.height * 0.28 + Math.sin(t) * 0.08;
      chilliRef.current.rotation.z = Math.sin(t * 0.5) * 0.05 + 0.3;
    }

    // 3. Subtle mouse parallax tilt (max ±1.5 deg)
    mouse.current.targetX = (state.pointer.x * Math.PI) / 100;
    mouse.current.targetY = -(state.pointer.y * Math.PI) / 100;

    mouse.current.x = THREE.MathUtils.lerp(mouse.current.x, mouse.current.targetX, 0.04);
    mouse.current.y = THREE.MathUtils.lerp(mouse.current.y, mouse.current.targetY, 0.04);

    groupRef.current.rotation.y = mouse.current.x;
    groupRef.current.rotation.x = mouse.current.y;
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.8} />
      <directionalLight position={[4, 5, 3]} intensity={1.2} color="#F2A321" />

      {/* Shared-geometry spice particles */}
      {particles.map((p, i) => (
        <mesh
          key={i}
          ref={(el) => { particleRefs.current[i] = el; }}
          position={p.pos}
          scale={p.scale}
          geometry={PARTICLE_GEO}
          material={p.mat}
        />
      ))}

      {/* Single Accent Chilli in lower right margin */}
      <group
        ref={chilliRef}
        position={[viewport.width * 0.39, -viewport.height * 0.28, -0.2]}
        scale={[0.18, 0.18, 0.18]}
        rotation={[0.2, 0.4, 0.3]}
      >
        <mesh geometry={new THREE.CylinderGeometry(0.25, 0.05, 3.2, 6)} material={CHILLI_MAT} />
        <mesh position={[0, 1.7, 0]} geometry={new THREE.CylinderGeometry(0.08, 0.12, 0.5, 6)} material={STEM_MAT} />
      </group>
    </group>
  );
}

export default function Hero3DAccents({ isReducedMotion = false }) {
  const [isVisible, setIsVisible] = useState(true);
  const containerRef = useRef(null);

  // Disable on small mobile devices to ensure zero GPU contention with the hero video
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  // IntersectionObserver to pause rendering when hero is scrolled past
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { rootMargin: '100px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (isMobile) return null;

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none z-10 overflow-hidden"
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 1.25]}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: 'low-power',
        }}
        frameloop={isVisible ? 'always' : 'never'}
        style={{ pointerEvents: 'none' }}
      >
        <React.Suspense fallback={null}>
          <HeroScene isReducedMotion={isReducedMotion} isVisible={isVisible} />
        </React.Suspense>
      </Canvas>
    </div>
  );
}
