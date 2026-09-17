import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function EarthenThaliPlate({ isReducedMotion }) {
  const plateRef = useRef();
  const mouse = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useFrame((state) => {
    if (!plateRef.current || isReducedMotion) return;

    // Subtle pointer parallax (max ±2 deg)
    mouse.current.targetX = (state.pointer.x * Math.PI) / 90;
    mouse.current.targetY = -(state.pointer.y * Math.PI) / 90;

    mouse.current.x = THREE.MathUtils.lerp(mouse.current.x, mouse.current.targetX, 0.05);
    mouse.current.y = THREE.MathUtils.lerp(mouse.current.y, mouse.current.targetY, 0.05);

    plateRef.current.rotation.y = mouse.current.x;
    plateRef.current.rotation.x = mouse.current.y + 0.35;
  });

  return (
    <group ref={plateRef} position={[0, -0.6, 0]} rotation={[0.35, 0, 0]}>
      {/* 1. Main Terracotta / Brass Base Plate */}
      <mesh position={[0, -0.1, 0]}>
        <cylinderGeometry args={[2.5, 2.3, 0.12, 32]} />
        <meshStandardMaterial color="#3D2012" roughness={0.7} metalness={0.2} />
      </mesh>

      {/* 2. Elevated Outer Flanged Lip Rim */}
      <mesh position={[0, -0.02, 0]}>
        <torusGeometry args={[2.42, 0.08, 12, 32]} />
        <meshStandardMaterial color="#6B3A1B" roughness={0.55} metalness={0.3} />
      </mesh>

      {/* 3. Concentric Decorative Ring Inset */}
      <mesh position={[0, -0.03, 0]}>
        <torusGeometry args={[1.7, 0.04, 8, 32]} />
        <meshStandardMaterial color="#8F4F24" roughness={0.6} metalness={0.35} />
      </mesh>

      {/* 4. Soft Warm Ambient Shadow Floor */}
      <mesh position={[0, -0.25, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[2.8, 32]} />
        <meshBasicMaterial color="#0A0604" transparent opacity={0.65} />
      </mesh>
    </group>
  );
}

export default function ProductPlate3D() {
  const isReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;

  if (isMobile) return null;

  return (
    <div
      className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[120%] h-[120%] pointer-events-none z-0 opacity-70 overflow-hidden"
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 2, 5], fov: 40 }}
        dpr={[1, 1.25]}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: 'low-power',
        }}
        style={{ pointerEvents: 'none' }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[3, 5, 2]} intensity={1.4} color="#F2A321" />
        <React.Suspense fallback={null}>
          <EarthenThaliPlate isReducedMotion={isReducedMotion} />
        </React.Suspense>
      </Canvas>
    </div>
  );
}
