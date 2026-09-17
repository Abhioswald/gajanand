import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Shared Materials (Instantiated once to eliminate draw call overhead and memory allocations)
const BREAD_TOP_MAT = new THREE.MeshStandardMaterial({
  color: '#C9823D',
  roughness: 0.42,
  metalness: 0.05,
});

const BREAD_INSIDE_MAT = new THREE.MeshStandardMaterial({
  color: '#E8C39E',
  roughness: 0.75,
});

const BREAD_BOTTOM_MAT = new THREE.MeshStandardMaterial({
  color: '#BA7736',
  roughness: 0.55,
  metalness: 0.05,
});

const BREAD_BOTTOM_INSIDE_MAT = new THREE.MeshStandardMaterial({
  color: '#F2DEC2',
  roughness: 0.8,
});

const SESAME_MAT = new THREE.MeshStandardMaterial({
  color: '#F7E8CF',
  roughness: 0.5,
});

const ONION_MAT1 = new THREE.MeshStandardMaterial({
  color: '#E8D0D0',
  roughness: 0.3,
  metalness: 0.1,
});

const ONION_MAT2 = new THREE.MeshStandardMaterial({
  color: '#E0C2C2',
  roughness: 0.3,
  metalness: 0.1,
});

const CHILLI_MAT = new THREE.MeshStandardMaterial({
  color: '#3A752B',
  roughness: 0.25,
});

const VADA_MAT = new THREE.MeshStandardMaterial({
  color: '#C46A21',
  roughness: 0.55,
  metalness: 0.1,
});

const VADA_CRUST_MAT1 = new THREE.MeshStandardMaterial({
  color: '#D97A24',
  roughness: 0.5,
});

const VADA_CRUST_MAT2 = new THREE.MeshStandardMaterial({
  color: '#B85D1A',
  roughness: 0.6,
});

const CHUTNEY_MAT = new THREE.MeshStandardMaterial({
  color: '#496A3D',
  roughness: 0.2,
  metalness: 0.15,
});

const MASALA_MAT1 = new THREE.MeshStandardMaterial({
  color: '#8F3418',
  roughness: 0.7,
});

const MASALA_MAT2 = new THREE.MeshStandardMaterial({
  color: '#A63C1B',
  roughness: 0.7,
});

// Shared geometries for repeated decorative elements
const SESAME_GEO = new THREE.CapsuleGeometry(0.5, 1, 3, 6);
const CRUMB_GEO = new THREE.OctahedronGeometry(1, 0);
const BUMP_GEO = new THREE.DodecahedronGeometry(1, 0);

// 1. Top Pav Bun
function TopPavBun({ groupRef }) {
  const sesamePositions = useMemo(() => [
    [0.2, 0.45, 0.3],
    [-0.3, 0.42, 0.25],
    [0.1, 0.48, -0.2],
    [-0.15, 0.46, -0.35],
    [0.35, 0.38, -0.1],
    [-0.38, 0.36, -0.05],
    [0, 0.5, 0.05],
  ], []);

  return (
    <group ref={groupRef} position={[0, 0.42, 0]}>
      {/* Baked Bread Dome */}
      <mesh position={[0, 0, 0]} scale={[1.45, 0.85, 1.45]}>
        <sphereGeometry args={[1, 24, 14, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
        <primitive object={BREAD_TOP_MAT} attach="material" />
      </mesh>

      {/* Flat Soft Bread Face */}
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.45, 24]} />
        <primitive object={BREAD_INSIDE_MAT} attach="material" />
      </mesh>

      {/* Sesame Seeds */}
      {sesamePositions.map((pos, idx) => (
        <mesh
          key={idx}
          position={[pos[0] * 1.4, pos[1] * 0.85 + 0.02, pos[2] * 1.4]}
          scale={[0.035, 0.02, 0.05]}
          rotation={[0.2, idx * 0.5, 0.3]}
          geometry={SESAME_GEO}
          material={SESAME_MAT}
        />
      ))}
    </group>
  );
}

// 2. Onion & Chilli Layer
function OnionAndChilliLayer({ groupRef }) {
  return (
    <group ref={groupRef} position={[0, 0.25, 0]}>
      <mesh position={[-0.3, 0, 0.2]} rotation={[Math.PI / 2.1, 0.1, 0.4]}>
        <torusGeometry args={[0.42, 0.06, 8, 18]} />
        <primitive object={ONION_MAT1} attach="material" />
      </mesh>
      <mesh position={[0.35, 0.02, -0.15]} rotation={[Math.PI / 1.9, -0.2, -0.3]}>
        <torusGeometry args={[0.48, 0.065, 8, 18]} />
        <primitive object={ONION_MAT2} attach="material" />
      </mesh>
      <mesh position={[0.05, 0.04, 0.35]} rotation={[0.3, 0.8, -0.2]} scale={[0.09, 0.09, 0.45]}>
        <cylinderGeometry args={[0.7, 0.9, 2, 8]} />
        <primitive object={CHILLI_MAT} attach="material" />
      </mesh>
    </group>
  );
}

// 3. Bataka Vada
function BatakaVada({ groupRef }) {
  return (
    <group ref={groupRef} position={[0, 0.1, 0]}>
      <mesh scale={[1.25, 0.95, 1.25]}>
        <sphereGeometry args={[0.92, 24, 18]} />
        <primitive object={VADA_MAT} attach="material" />
      </mesh>
      <mesh position={[0.65, 0.2, 0.5]} scale={[0.22, 0.18, 0.22]} geometry={BUMP_GEO} material={VADA_CRUST_MAT1} />
      <mesh position={[-0.7, -0.1, 0.4]} scale={[0.2, 0.15, 0.2]} geometry={BUMP_GEO} material={VADA_CRUST_MAT2} />
      <mesh position={[0.2, 0.45, -0.6]} scale={[0.24, 0.16, 0.2]} geometry={BUMP_GEO} material={VADA_CRUST_MAT1} />
      <mesh position={[-0.4, 0.35, -0.5]} scale={[0.18, 0.15, 0.18]} geometry={BUMP_GEO} material={VADA_MAT} />
    </group>
  );
}

// 4. Chutney & Masala Layer
function ChutneyAndMasalaLayer({ groupRef }) {
  return (
    <group ref={groupRef} position={[0, -0.15, 0]}>
      <mesh position={[0, 0, 0]} scale={[1.35, 0.08, 1.35]}>
        <cylinderGeometry args={[1, 1.1, 1, 20]} />
        <primitive object={CHUTNEY_MAT} attach="material" />
      </mesh>
      <mesh position={[0.4, 0.08, 0.3]} scale={[0.07, 0.05, 0.07]} geometry={CRUMB_GEO} material={MASALA_MAT1} />
      <mesh position={[-0.35, 0.07, 0.25]} scale={[0.06, 0.04, 0.06]} geometry={CRUMB_GEO} material={MASALA_MAT2} />
      <mesh position={[0.1, 0.09, -0.4]} scale={[0.08, 0.05, 0.08]} geometry={CRUMB_GEO} material={MASALA_MAT1} />
      <mesh position={[-0.45, 0.07, -0.2]} scale={[0.05, 0.04, 0.05]} geometry={CRUMB_GEO} material={MASALA_MAT2} />
    </group>
  );
}

// 5. Bottom Pav Bun
function BottomPavBun({ groupRef }) {
  return (
    <group ref={groupRef} position={[0, -0.35, 0]}>
      <mesh position={[0, -0.15, 0]} scale={[1.4, 0.45, 1.4]}>
        <cylinderGeometry args={[1, 0.92, 1, 24]} />
        <primitive object={BREAD_BOTTOM_MAT} attach="material" />
      </mesh>
      <mesh position={[0, 0.08, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.38, 24]} />
        <primitive object={BREAD_BOTTOM_INSIDE_MAT} attach="material" />
      </mesh>
    </group>
  );
}

// Consolidated Master Scene Composition (Single useFrame loop for all layer updates)
function VadaPavComposition({ explosionProgressRef, isReducedMotion, isVisible }) {
  const masterGroupRef = useRef();
  const topPavRef = useRef();
  const onionRef = useRef();
  const vadaRef = useRef();
  const chutneyRef = useRef();
  const bottomPavRef = useRef();

  const currentProgress = useRef(1);
  const mouse = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useFrame((state) => {
    // Skip calculations entirely if off-screen
    if (!masterGroupRef.current || !isVisible) return;

    // 1. Smooth interpolation of explosion separation
    const targetProgress = isReducedMotion
      ? 1
      : explosionProgressRef?.current !== undefined
        ? explosionProgressRef.current
        : 1;

    currentProgress.current = THREE.MathUtils.lerp(currentProgress.current, targetProgress, 0.1);
    const p = currentProgress.current;

    // 2. Direct per-frame transform updates without React state reconciliation
    if (topPavRef.current) topPavRef.current.position.y = THREE.MathUtils.lerp(0.42, 1.35, p);
    if (onionRef.current) onionRef.current.position.y = THREE.MathUtils.lerp(0.25, 0.72, p);
    if (vadaRef.current) vadaRef.current.position.y = THREE.MathUtils.lerp(0.1, 0.08, p);
    if (chutneyRef.current) chutneyRef.current.position.y = THREE.MathUtils.lerp(-0.15, -0.42, p);
    if (bottomPavRef.current) bottomPavRef.current.position.y = THREE.MathUtils.lerp(-0.35, -1.05, p);

    // 3. Pointer-driven subtle damping
    if (!isReducedMotion) {
      mouse.current.targetX = (state.pointer.x * Math.PI) / 60;
      mouse.current.targetY = -(state.pointer.y * Math.PI) / 60;

      mouse.current.x = THREE.MathUtils.lerp(mouse.current.x, mouse.current.targetX, 0.06);
      mouse.current.y = THREE.MathUtils.lerp(mouse.current.y, mouse.current.targetY, 0.06);

      const scrollRotation = p * 0.12;
      masterGroupRef.current.rotation.y = mouse.current.x + scrollRotation + 0.15;
      masterGroupRef.current.rotation.x = mouse.current.y + 0.12;
    }
  });

  return (
    <group ref={masterGroupRef} scale={[1.15, 1.15, 1.15]}>
      <TopPavBun groupRef={topPavRef} />
      <OnionAndChilliLayer groupRef={onionRef} />
      <BatakaVada groupRef={vadaRef} />
      <ChutneyAndMasalaLayer groupRef={chutneyRef} />
      <BottomPavBun groupRef={bottomPavRef} />
    </group>
  );
}

export default function ExplodedVadaPav3D({ explosionProgressRef }) {
  const [hasWebGLError, setHasWebGLError] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const containerRef = useRef(null);

  const isReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Lightweight IntersectionObserver to pause rendering when off-screen
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { rootMargin: '200px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

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
    <div ref={containerRef} className="relative w-full h-full select-none" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 42 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        frameloop={isVisible ? 'always' : 'never'}
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
            explosionProgressRef={explosionProgressRef}
            isReducedMotion={isReducedMotion}
            isVisible={isVisible}
          />
        </React.Suspense>
      </Canvas>
    </div>
  );
}
