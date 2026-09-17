import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// Low-poly procedural spice particles and leaf fragments
function SpiceParticle({ initialPos, speed, scale, color, rotationSpeed }) {
  const meshRef = useRef();
  const timeOffset = useMemo(() => Math.random() * 100, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime() * speed + timeOffset;
    
    // Very gentle floating motion
    meshRef.current.position.y = initialPos[1] + Math.sin(t) * 0.12;
    meshRef.current.position.x = initialPos[0] + Math.cos(t * 0.7) * 0.08;
    meshRef.current.rotation.x += rotationSpeed[0];
    meshRef.current.rotation.y += rotationSpeed[1];
    meshRef.current.rotation.z += rotationSpeed[2];
  });

  return (
    <mesh ref={meshRef} position={initialPos} scale={scale}>
      <octahedronGeometry args={[1, 0]} />
      <meshStandardMaterial
        color={color}
        roughness={0.6}
        metalness={0.1}
        transparent
        opacity={0.7}
      />
    </mesh>
  );
}

// Single subtle stylized green chilli accent
function FloatingChilli({ position }) {
  const chilliRef = useRef();

  useFrame((state) => {
    if (!chilliRef.current) return;
    const t = state.clock.getElapsedTime() * 0.6;
    chilliRef.current.position.y = position[1] + Math.sin(t) * 0.08;
    chilliRef.current.rotation.z = Math.sin(t * 0.5) * 0.05 + 0.3;
  });

  return (
    <group ref={chilliRef} position={position} scale={[0.18, 0.18, 0.18]} rotation={[0.2, 0.4, 0.3]}>
      {/* Chilli Body */}
      <mesh>
        <cylinderGeometry args={[0.25, 0.05, 3.2, 8]} />
        <meshStandardMaterial color="#3A752B" roughness={0.35} metalness={0.1} transparent opacity={0.65} />
      </mesh>
      {/* Stem */}
      <mesh position={[0, 1.7, 0]}>
        <cylinderGeometry args={[0.08, 0.12, 0.5, 6]} />
        <meshStandardMaterial color="#244B18" roughness={0.8} />
      </mesh>
    </group>
  );
}

// Scene with mouse tilt
function HeroScene({ isReducedMotion }) {
  const { viewport } = useThree();
  const groupRef = useRef();
  const mouse = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  // Generate a few outer perimeter particles
  const particles = useMemo(() => {
    return [
      // Top Left
      { pos: [-viewport.width * 0.38, viewport.height * 0.35, -0.5], scale: 0.07, color: '#D96814', speed: 0.6, rot: [0.005, 0.008, 0.003] },
      { pos: [-viewport.width * 0.42, viewport.height * 0.22, 0.2], scale: 0.045, color: '#8F3418', speed: 0.8, rot: [0.007, 0.004, 0.006] },
      { pos: [-viewport.width * 0.32, viewport.height * 0.42, -1], scale: 0.035, color: '#496A3D', speed: 0.5, rot: [0.004, 0.006, 0.002] },
      
      // Top Right
      { pos: [viewport.width * 0.38, viewport.height * 0.38, -0.2], scale: 0.065, color: '#C46A21', speed: 0.7, rot: [0.006, 0.005, 0.008] },
      { pos: [viewport.width * 0.43, viewport.height * 0.18, 0.5], scale: 0.04, color: '#F2A321', speed: 0.9, rot: [0.008, 0.006, 0.004] },
      
      // Bottom Left
      { pos: [-viewport.width * 0.4, -viewport.height * 0.3, 0], scale: 0.055, color: '#8F3418', speed: 0.7, rot: [0.005, 0.007, 0.003] },
      
      // Bottom Right
      { pos: [viewport.width * 0.36, -viewport.height * 0.32, -0.4], scale: 0.08, color: '#D96814', speed: 0.6, rot: [0.004, 0.006, 0.005] },
      { pos: [viewport.width * 0.42, -viewport.height * 0.24, 0.3], scale: 0.035, color: '#496A3D', speed: 0.8, rot: [0.007, 0.003, 0.006] },
    ];
  }, [viewport]);

  useFrame((state) => {
    if (!groupRef.current || isReducedMotion) return;
    
    // Smooth mouse tilt tracking (max ±1.8 degrees)
    mouse.current.targetX = (state.pointer.x * Math.PI) / 100;
    mouse.current.targetY = -(state.pointer.y * Math.PI) / 100;

    mouse.current.x = THREE.MathUtils.lerp(mouse.current.x, mouse.current.targetX, 0.05);
    mouse.current.y = THREE.MathUtils.lerp(mouse.current.y, mouse.current.targetY, 0.05);

    groupRef.current.rotation.y = mouse.current.x;
    groupRef.current.rotation.x = mouse.current.y;
  });

  return (
    <group ref={groupRef}>
      {/* Subtle Warm Lighting */}
      <ambientLight intensity={0.8} />
      <directionalLight position={[4, 5, 3]} intensity={1.2} color="#F2A321" />

      {/* Floating Spice Particles */}
      {particles.map((p, i) => (
        <SpiceParticle
          key={i}
          initialPos={p.pos}
          scale={p.scale}
          color={p.color}
          speed={p.speed}
          rotationSpeed={p.rot}
        />
      ))}

      {/* Single Accent Chilli in lower right quadrant away from center video */}
      <FloatingChilli position={[viewport.width * 0.39, -viewport.height * 0.28, -0.2]} />
    </group>
  );
}

export default function Hero3DAccents({ isReducedMotion = false }) {
  // Disable on small mobile devices to ensure zero GPU contention with the hero video
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  if (isMobile) return null;

  return (
    <div
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
        style={{ pointerEvents: 'none' }}
      >
        <React.Suspense fallback={null}>
          <HeroScene isReducedMotion={isReducedMotion} />
        </React.Suspense>
      </Canvas>
    </div>
  );
}
