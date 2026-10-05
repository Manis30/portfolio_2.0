import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { DeveloperCore } from './DeveloperCore';
import { ArchitectureLayers } from './ArchitectureLayers';
import { DataParticles } from './DataParticles';
import { OrbitalPaths } from './OrbitalPaths';
import { TechNode, TechNodeProps } from './TechNode';

// Sparse Ambient Particles (16 particles, barely perceptible)
function AmbientParticles() {
  const count = 16;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 5.6;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 4.6;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 3.2;
    }
    return pos;
  }, []);

  const ref = useRef<THREE.Points>(null);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.005;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.016}
        color="#C084FC"
        transparent
        opacity={0.16}
        sizeAttenuation
      />
    </points>
  );
}

// 4 Architectural Tech Nodes with distinct 3D Depth (Z-positions)
const ARCH_NODES: Omit<TechNodeProps, 'isHovered' | 'onHover' | 'onLeave'>[] = [
  // 1. TypeScript (Top, recessed in depth)
  { id: 'ts', name: 'TypeScript', position: [0.0, 1.80, -0.25], color: '#3178C6', speed: 0.35, phase: 0.0 },
  // 2. React (Client Tier, left, closer in depth)
  { id: 'react', name: 'React', position: [-1.85, 0.45, 0.40], color: '#61DAFB', speed: 0.32, phase: 1.2 },
  // 3. Node.js (Server Tier, right, closer in depth)
  { id: 'node', name: 'Node.js', position: [1.85, 0.45, 0.40], color: '#68A063', speed: 0.34, phase: 2.1 },
  // 4. MongoDB (Database Tier, bottom, recessed in depth)
  { id: 'mongo', name: 'MongoDB', position: [0.0, -1.80, -0.25], color: '#22C55E', speed: 0.30, phase: 3.4 },
];

interface SceneContentProps {
  isReducedMotion: boolean;
  isMobile: boolean;
  hoveredNode: string | null;
  setHoveredNode: (id: string | null) => void;
}

function SceneContent({
  isReducedMotion,
  isMobile,
  hoveredNode,
  setHoveredNode,
}: SceneContentProps) {
  const sceneRef = useRef<THREE.Group>(null);

  useFrame(({ pointer }) => {
    if (sceneRef.current && !isReducedMotion) {
      // Subtle, calm mouse parallax (deflection capped to 5-10px equivalent)
      const targetRotX = -pointer.y * 0.038;
      const targetRotY = pointer.x * 0.048;
      sceneRef.current.rotation.x = THREE.MathUtils.lerp(
        sceneRef.current.rotation.x,
        targetRotX,
        0.035
      );
      sceneRef.current.rotation.y = THREE.MathUtils.lerp(
        sceneRef.current.rotation.y,
        targetRotY,
        0.035
      );
    }
  });

  const visibleNodes = isMobile
    ? ARCH_NODES.filter((n) => n.id !== 'mongo') // On mobile, keep React, Node.js, TypeScript
    : ARCH_NODES;

  return (
    <group ref={sceneRef} scale={isMobile ? 0.82 : 1.0}>
      {/* Studio Lighting Hierarchy: Depth, reflection, edge highlights without flat purple wash */}
      <ambientLight intensity={0.65} />
      <directionalLight position={[5, 6, 4]} intensity={1.25} color="#FFFFFF" />
      <pointLight position={[-4, -2, -2]} intensity={0.85} color="#8B5CF6" />
      <pointLight position={[3, -4, 2]} intensity={0.45} color="#38BDF8" />

      {/* LAYER 1: 3D Application Core (Irregular Architectural Polyhedron) */}
      <DeveloperCore isHovered={hoveredNode !== null} />

      {/* LAYER 2: Architecture Layer (Frontend, API, Backend, Database wireframe tiers) */}
      <ArchitectureLayers hoveredTier={hoveredNode} />

      {/* LAYER 3: Data Flow (Animated Request Packets traveling along the pipeline) */}
      {!isReducedMotion && <DataParticles />}

      {/* Network Pathways (3 subtle elliptical curves) */}
      <OrbitalPaths />

      {/* Technology Nodes: Distinct 3D Depths, interactive on hover */}
      {visibleNodes.map((item) => (
        <TechNode
          key={item.id}
          {...item}
          isHovered={hoveredNode === item.id}
          onHover={(id) => setHoveredNode(id)}
          onLeave={() => setHoveredNode(null)}
        />
      ))}

      {/* Ambient Micro-Particles */}
      {!isReducedMotion && <AmbientParticles />}
    </group>
  );
}

export const HeroScene: React.FC = () => {
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    setMounted(true);
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mobileQuery = window.matchMedia('(max-width: 768px)');

    setIsReducedMotion(motionQuery.matches);
    setIsMobile(mobileQuery.matches);

    const handleMotion = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    const handleMobile = (e: MediaQueryListEvent) => setIsMobile(e.matches);

    motionQuery.addEventListener('change', handleMotion);
    mobileQuery.addEventListener('change', handleMobile);

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      motionQuery.removeEventListener('change', handleMotion);
      mobileQuery.removeEventListener('change', handleMobile);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-[360px] sm:h-[440px] lg:h-[600px] xl:h-[640px] flex items-center justify-center">
        <div className="w-16 h-16 rounded-full border border-[#8B5CF6]/30 animate-pulse bg-[#0D0F14]/40" />
      </div>
    );
  }

  // Section 24: Scroll Transition (subtly scale down, move right, fade slightly)
  const scrollProgress = Math.min(scrollY / 450, 1);
  const scale = 1 - scrollProgress * 0.12;
  const translateX = scrollProgress * 28;
  const opacity = 1 - scrollProgress * 0.55;

  return (
    <div
      className="relative w-full h-[360px] sm:h-[440px] lg:h-[600px] xl:h-[640px] flex items-center justify-center overflow-visible select-none transition-transform duration-100 ease-out"
      style={{
        transform: `translateX(${translateX}px) scale(${scale})`,
        opacity: opacity,
      }}
    >
      <Canvas
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        camera={{ position: [0, 0, 7.2], fov: 36 }}
        style={{ pointerEvents: 'auto', width: '100%', height: '100%' }}
      >
        <SceneContent
          isReducedMotion={isReducedMotion}
          isMobile={isMobile}
          hoveredNode={hoveredNode}
          setHoveredNode={setHoveredNode}
        />
      </Canvas>
    </div>
  );
};

export default HeroScene;
