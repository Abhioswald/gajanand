import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Procedural Gujarat Stepwell / Jharokha Sandstone Geometry Relief
function StepwellRelief({ isReducedMotion }) {
  const groupRef = useRef();
  const mouse = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useFrame((state) => {
    if (!groupRef.current || isReducedMotion) return;

    // Subtle pointer parallax (max ±2.5 deg)
    mouse.current.targetX = (state.pointer.x * Math.PI) / 80;
    mouse.current.targetY = -(state.pointer.y * Math.PI) / 80;

    mouse.current.x = THREE.MathUtils.lerp(mouse.current.x, mouse.current.targetX, 0.04);
    mouse.current.y = THREE.MathUtils.lerp(mouse.current.y, mouse.current.targetY, 0.04);

    groupRef.current.rotation.y = mouse.current.x;
    groupRef.current.rotation.x = mouse.current.y;
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]} rotation={[0.05, -0.15, 0]}>
      {/* Warm Sandstone Materials */}
      {/* 1. Stepped Arch Tier 1 (Back) */}
      <mesh position={[0, 0, -0.6]}>
        <boxGeometry args={[4.2, 3.6, 0.2]} />
        <meshStandardMaterial color="#C89668" roughness={0.9} />
      </mesh>

      {/* 2. Inverted Stepwell Staircase Geometry Left */}
      <group position={[-1.2, 0, -0.3]}>
        <mesh position={[0, 0.8, 0]}>
          <boxGeometry args={[0.8, 0.25, 0.4]} />
          <meshStandardMaterial color="#D4A276" roughness={0.85} />
        </mesh>
        <mesh position={[0.2, 0.5, 0]}>
          <boxGeometry args={[0.8, 0.25, 0.4]} />
          <meshStandardMaterial color="#DDAF84" roughness={0.85} />
        </mesh>
        <mesh position={[0.4, 0.2, 0]}>
          <boxGeometry args={[0.8, 0.25, 0.4]} />
          <meshStandardMaterial color="#E8C39E" roughness={0.85} />
        </mesh>
        <mesh position={[0.6, -0.1, 0]}>
          <boxGeometry args={[0.8, 0.25, 0.4]} />
          <meshStandardMaterial color="#D4A276" roughness={0.85} />
        </mesh>
        <mesh position={[0.8, -0.4, 0]}>
          <boxGeometry args={[0.8, 0.25, 0.4]} />
          <meshStandardMaterial color="#C89668" roughness={0.85} />
        </mesh>
      </group>

      {/* 3. Inverted Stepwell Staircase Geometry Right */}
      <group position={[1.2, 0, -0.3]}>
        <mesh position={[0, 0.8, 0]}>
          <boxGeometry args={[0.8, 0.25, 0.4]} />
          <meshStandardMaterial color="#D4A276" roughness={0.85} />
        </mesh>
        <mesh position={[-0.2, 0.5, 0]}>
          <boxGeometry args={[0.8, 0.25, 0.4]} />
          <meshStandardMaterial color="#DDAF84" roughness={0.85} />
        </mesh>
        <mesh position={[-0.4, 0.2, 0]}>
          <boxGeometry args={[0.8, 0.25, 0.4]} />
          <meshStandardMaterial color="#E8C39E" roughness={0.85} />
        </mesh>
        <mesh position={[-0.6, -0.1, 0]}>
          <boxGeometry args={[0.8, 0.25, 0.4]} />
          <meshStandardMaterial color="#D4A276" roughness={0.85} />
        </mesh>
        <mesh position={[-0.8, -0.4, 0]}>
          <boxGeometry args={[0.8, 0.25, 0.4]} />
          <meshStandardMaterial color="#C89668" roughness={0.85} />
        </mesh>
      </group>

      {/* 4. Central Jharokha Pillar Column Framing */}
      <mesh position={[-1.7, 0, 0.1]}>
        <cylinderGeometry args={[0.12, 0.14, 3.2, 8]} />
        <meshStandardMaterial color="#E8C39E" roughness={0.8} />
      </mesh>
      <mesh position={[1.7, 0, 0.1]}>
        <cylinderGeometry args={[0.12, 0.14, 3.2, 8]} />
        <meshStandardMaterial color="#E8C39E" roughness={0.8} />
      </mesh>

      {/* Top Lintel Arch Beam */}
      <mesh position={[0, 1.5, 0.1]}>
        <boxGeometry args={[3.8, 0.22, 0.35]} />
        <meshStandardMaterial color="#DDAF84" roughness={0.8} />
      </mesh>

      {/* Plinth Base Beam */}
      <mesh position={[0, -1.5, 0.1]}>
        <boxGeometry args={[3.8, 0.28, 0.4]} />
        <meshStandardMaterial color="#C89668" roughness={0.85} />
      </mesh>

      {/* Central Diamond Motif Relief */}
      <mesh position={[0, 0, -0.1]} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[0.7, 0.7, 0.15]} />
        <meshStandardMaterial color="#E8C39E" roughness={0.75} />
      </mesh>
    </group>
  );
}

export default function GujaratHeritage3D() {
  const isReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;

  if (isMobile) return null;

  return (
    <div
      className="absolute -right-8 -bottom-8 w-72 h-72 lg:w-96 lg:h-96 pointer-events-none z-0 opacity-40 mix-blend-luminosity overflow-hidden"
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 40 }}
        dpr={[1, 1.25]}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: 'low-power',
        }}
        style={{ pointerEvents: 'none' }}
      >
        <ambientLight intensity={0.9} />
        <directionalLight position={[3, 4, 2]} intensity={1.5} color="#F2A321" />
        <directionalLight position={[-3, -2, 1]} intensity={0.4} color="#F7E8CF" />
        <React.Suspense fallback={null}>
          <StepwellRelief isReducedMotion={isReducedMotion} />
        </React.Suspense>
      </Canvas>
    </div>
  );
}
