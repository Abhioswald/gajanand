import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// 1. Top Pav Bun Component
function TopPavBun({ explosionProgress }) {
  const meshRef = useRef();

  // Subtle sesame seed specks
  const sesamePositions = useMemo(() => [
    [0.2, 0.45, 0.3],
    [-0.3, 0.42, 0.25],
    [0.1, 0.48, -0.2],
    [-0.15, 0.46, -0.35],
    [0.35, 0.38, -0.1],
    [-0.38, 0.36, -0.05],
    [0, 0.5, 0.05],
  ], []);

  useFrame(() => {
    if (!meshRef.current) return;
    // Assembled: y = 0.42 -> Exploded: y = 1.35
    const targetY = THREE.MathUtils.lerp(0.42, 1.35, explosionProgress.current);
    meshRef.current.position.y = targetY;
  });

  return (
    <group ref={meshRef} position={[0, 0.42, 0]}>
      {/* Golden Baked Bread Dome */}
      <mesh position={[0, 0, 0]} scale={[1.45, 0.85, 1.45]}>
        <sphereGeometry args={[1, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
        <meshStandardMaterial
          color="#C9823D"
          roughness={0.4}
          metalness={0.05}
        />
      </mesh>

      {/* Flat Soft Bread Bottom of the Top Bun */}
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.45, 32]} />
        <meshStandardMaterial
          color="#E8C39E"
          roughness={0.7}
        />
      </mesh>

      {/* Sesame Seeds */}
      {sesamePositions.map((pos, idx) => (
        <mesh key={idx} position={[pos[0] * 1.4, pos[1] * 0.85 + 0.02, pos[2] * 1.4]} scale={[0.035, 0.02, 0.05]} rotation={[0.2, idx * 0.5, 0.3]}>
          <capsuleGeometry args={[0.5, 1, 4, 8]} />
          <meshStandardMaterial color="#F7E8CF" roughness={0.5} />
        </mesh>
      ))}
    </group>
  );
}

// 2. Crisp Onion Rings & Green Chilli Slice
function OnionAndChilliLayer({ explosionProgress }) {
  const groupRef = useRef();

  useFrame(() => {
    if (!groupRef.current) return;
    // Assembled: y = 0.25 -> Exploded: y = 0.72
    const targetY = THREE.MathUtils.lerp(0.25, 0.72, explosionProgress.current);
    groupRef.current.position.y = targetY;
  });

  return (
    <group ref={groupRef} position={[0, 0.25, 0]}>
      {/* Onion Ring 1 */}
      <mesh position={[-0.3, 0, 0.2]} rotation={[Math.PI / 2.1, 0.1, 0.4]}>
        <torusGeometry args={[0.42, 0.06, 12, 24]} />
        <meshStandardMaterial color="#E8D0D0" roughness={0.3} metalness={0.1} />
      </mesh>

      {/* Onion Ring 2 */}
      <mesh position={[0.35, 0.02, -0.15]} rotation={[Math.PI / 1.9, -0.2, -0.3]}>
        <torusGeometry args={[0.48, 0.065, 12, 24]} />
        <meshStandardMaterial color="#E0C2C2" roughness={0.3} metalness={0.1} />
      </mesh>

      {/* Sliced Green Chilli Accent */}
      <mesh position={[0.05, 0.04, 0.35]} rotation={[0.3, 0.8, -0.2]} scale={[0.09, 0.09, 0.45]}>
        <cylinderGeometry args={[0.7, 0.9, 2, 8]} />
        <meshStandardMaterial color="#3A752B" roughness={0.25} />
      </mesh>
    </group>
  );
}

// 3. Crispy Bataka Vada
function BatakaVada({ explosionProgress }) {
  const meshRef = useRef();

  useFrame(() => {
    if (!meshRef.current) return;
    // Assembled: y = 0.1 -> Exploded: y = 0.08 (Central Hero Anchor)
    const targetY = THREE.MathUtils.lerp(0.1, 0.08, explosionProgress.current);
    meshRef.current.position.y = targetY;
  });

  return (
    <group ref={meshRef} position={[0, 0.1, 0]}>
      {/* Main Golden Fried Besan Dumpling */}
      <mesh scale={[1.25, 0.95, 1.25]}>
        <sphereGeometry args={[0.92, 32, 24]} />
        <meshStandardMaterial
          color="#C46A21"
          roughness={0.55}
          metalness={0.1}
        />
      </mesh>

      {/* Crispy Texture Bumps / Besan Batter Fritter Accents */}
      <mesh position={[0.65, 0.2, 0.5]} scale={[0.22, 0.18, 0.22]}>
        <dodecahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color="#D97A24" roughness={0.5} />
      </mesh>
      <mesh position={[-0.7, -0.1, 0.4]} scale={[0.2, 0.15, 0.2]}>
        <dodecahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color="#B85D1A" roughness={0.6} />
      </mesh>
      <mesh position={[0.2, 0.45, -0.6]} scale={[0.24, 0.16, 0.2]}>
        <dodecahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color="#D97A24" roughness={0.5} />
      </mesh>
      <mesh position={[-0.4, 0.35, -0.5]} scale={[0.18, 0.15, 0.18]}>
        <dodecahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color="#C46A21" roughness={0.55} />
      </mesh>
    </group>
  );
}

// 4. Fresh Green Chutney Layer & Masala Particles
function ChutneyAndMasalaLayer({ explosionProgress }) {
  const groupRef = useRef();

  useFrame(() => {
    if (!groupRef.current) return;
    // Assembled: y = -0.15 -> Exploded: y = -0.42
    const targetY = THREE.MathUtils.lerp(-0.15, -0.42, explosionProgress.current);
    groupRef.current.position.y = targetY;
  });

  return (
    <group ref={groupRef} position={[0, -0.15, 0]}>
      {/* Organic Glossy Green Chutney Splat Disk */}
      <mesh position={[0, 0, 0]} scale={[1.35, 0.08, 1.35]}>
        <cylinderGeometry args={[1, 1.1, 1, 24]} />
        <meshStandardMaterial
          color="#496A3D"
          roughness={0.2}
          metalness={0.15}
        />
      </mesh>

      {/* Dry Garlic Masala Red Granules */}
      <mesh position={[0.4, 0.08, 0.3]} scale={[0.07, 0.05, 0.07]}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color="#8F3418" roughness={0.7} />
      </mesh>
      <mesh position={[-0.35, 0.07, 0.25]} scale={[0.06, 0.04, 0.06]}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color="#A63C1B" roughness={0.7} />
      </mesh>
      <mesh position={[0.1, 0.09, -0.4]} scale={[0.08, 0.05, 0.08]}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color="#8F3418" roughness={0.7} />
      </mesh>
      <mesh position={[-0.45, 0.07, -0.2]} scale={[0.05, 0.04, 0.05]}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color="#A63C1B" roughness={0.7} />
      </mesh>
    </group>
  );
}

// 5. Bottom Pav Bun
function BottomPavBun({ explosionProgress }) {
  const meshRef = useRef();

  useFrame(() => {
    if (!meshRef.current) return;
    // Assembled: y = -0.35 -> Exploded: y = -1.05
    const targetY = THREE.MathUtils.lerp(-0.35, -1.05, explosionProgress.current);
    meshRef.current.position.y = targetY;
  });

  return (
    <group ref={meshRef} position={[0, -0.35, 0]}>
      {/* Soft Bottom Bread Base */}
      <mesh position={[0, -0.15, 0]} scale={[1.4, 0.45, 1.4]}>
        <cylinderGeometry args={[1, 0.92, 1, 32]} />
        <meshStandardMaterial
          color="#BA7736"
          roughness={0.55}
          metalness={0.05}
        />
      </mesh>

      {/* Soft Inside White/Cream Bread Face */}
      <mesh position={[0, 0.08, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.38, 32]} />
        <meshStandardMaterial
          color="#F2DEC2"
          roughness={0.8}
        />
      </mesh>
    </group>
  );
}

// Main 3D Composition Group
function VadaPavComposition({ explosionProgress, isReducedMotion }) {
  const groupRef = useRef();
  const mouse = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useFrame((state) => {
    if (!groupRef.current) return;

    if (!isReducedMotion) {
      // Damped pointer tilt (max ±3 degrees)
      mouse.current.targetX = (state.pointer.x * Math.PI) / 60;
      mouse.current.targetY = -(state.pointer.y * Math.PI) / 60;

      mouse.current.x = THREE.MathUtils.lerp(mouse.current.x, mouse.current.targetX, 0.06);
      mouse.current.y = THREE.MathUtils.lerp(mouse.current.y, mouse.current.targetY, 0.06);

      // Subtle scroll rotation (4-6 deg) + mouse tilt
      const scrollRotation = explosionProgress.current * 0.12;
      groupRef.current.rotation.y = mouse.current.x + scrollRotation + 0.15;
      groupRef.current.rotation.x = mouse.current.y + 0.12;
    } else {
      groupRef.current.rotation.y = 0.2;
      groupRef.current.rotation.x = 0.1;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]} scale={[1.15, 1.15, 1.15]}>
      <TopPavBun explosionProgress={explosionProgress} />
      <OnionAndChilliLayer explosionProgress={explosionProgress} />
      <BatakaVada explosionProgress={explosionProgress} />
      <ChutneyAndMasalaLayer explosionProgress={explosionProgress} />
      <BottomPavBun explosionProgress={explosionProgress} />
    </group>
  );
}

export default function ExplodedVadaPav3D({ scrollProgress = 1 }) {
  const [hasWebGLError, setHasWebGLError] = useState(false);
  const explosionProgress = useRef(1);
  const isReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    // Keep explosion progress synced with scroll trigger progress smoothly
    if (isReducedMotion) {
      explosionProgress.current = 1;
    } else {
      explosionProgress.current = Math.min(Math.max(scrollProgress, 0), 1);
    }
  }, [scrollProgress, isReducedMotion]);

  if (hasWebGLError) {
    return (
      <img
        src="/assets/gajanand-ingredients.webp"
        alt="ગજાનંદ વડાપાઉંની સામગ્રી - પાવ, બટાકા વડો, લીલી ચટણી, લસણ મસાલો અને લીલું મરચું"
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover object-center rounded-2xl sm:rounded-[1.5rem] img-hover-subtle"
      />
    );
  }

  return (
    <div className="relative w-full h-full select-none" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 42 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
        onError={() => setHasWebGLError(true)}
      >
        <ambientLight intensity={1.1} />
        <directionalLight position={[4, 6, 4]} intensity={1.8} color="#F2A321" />
        <directionalLight position={[-4, -3, 2]} intensity={0.6} color="#F7E8CF" />
        <directionalLight position={[0, 4, -3]} intensity={0.4} color="#D96814" />
        
        <React.Suspense fallback={null}>
          <VadaPavComposition
            explosionProgress={explosionProgress}
            isReducedMotion={isReducedMotion}
          />
        </React.Suspense>
      </Canvas>
    </div>
  );
}
