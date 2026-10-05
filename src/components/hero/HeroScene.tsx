import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { DeveloperCore } from './DeveloperCore';
import { TechnologyNode, TechNodeData } from './TechnologyNode';
import { ConnectionLines } from './ConnectionLines';
import { ParticleField } from './ParticleField';

// Exactly 6 Technology Nodes with mathematically calibrated non-colliding positions
const TECH_NODES_DATA: TechNodeData[] = [
  // 1. TypeScript (Top Apex, slightly back in Z)
  { id: 'ts', name: 'TypeScript', category: 'Type System', position: [0.0, 2.10, -0.25], color: '#3178C6', phase: 0.0 },
  // 2. React (Upper Left, forward in Z)
  { id: 'react', name: 'React', category: 'Frontend', position: [-2.05, 1.05, 0.35], color: '#61DAFB', phase: 1.2 },
  // 3. Node.js (Upper Right, forward in Z)
  { id: 'node', name: 'Node.js', category: 'Backend Engine', position: [2.05, 1.05, 0.35], color: '#68A063', phase: 2.1 },
  // 4. Git (Lower Left, mid-depth)
  { id: 'git', name: 'Git', category: 'Version Control', position: [-2.05, -1.05, 0.15], color: '#F05032', phase: 3.0 },
  // 5. MongoDB (Lower Right, mid-depth)
  { id: 'mongo', name: 'MongoDB', category: 'Database', position: [2.05, -1.05, 0.15], color: '#22C55E', phase: 3.9 },
  // 6. REST API (Bottom Apex, slightly back in Z)
  { id: 'api', name: 'REST API', category: 'Architecture', position: [0.0, -2.10, -0.25], color: '#A855F7', phase: 4.8 },
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
  const sceneGroupRef = useRef<THREE.Group>(null);

  useFrame(({ pointer }) => {
    if (sceneGroupRef.current && !isReducedMotion) {
      // Controlled, subtle mouse parallax (x: ±0.08, y: ±0.05)
      const targetRotX = -pointer.y * 0.045;
      const targetRotY = pointer.x * 0.065;
      sceneGroupRef.current.rotation.x = THREE.MathUtils.lerp(
        sceneGroupRef.current.rotation.x,
        targetRotX,
        0.04
      );
      sceneGroupRef.current.rotation.y = THREE.MathUtils.lerp(
        sceneGroupRef.current.rotation.y,
        targetRotY,
        0.04
      );
    }
  });

  // On mobile (<768px), show the 4 primary nodes (React, Node.js, TypeScript, MongoDB)
  const activeNodes = isMobile
    ? TECH_NODES_DATA.filter((n) => n.id === 'react' || n.id === 'node' || n.id === 'ts' || n.id === 'mongo')
    : TECH_NODES_DATA;

  return (
    <group ref={sceneGroupRef} scale={isMobile ? 0.76 : 1.0}>
      {/* Studio Lighting Hierarchy: subtle ambient, white directional key, soft violet rim */}
      <ambientLight intensity={0.45} />
      <directionalLight position={[4, 6, 5]} intensity={1.2} color="#FFFFFF" />
      <pointLight position={[-4, -2, -3]} intensity={0.7} color="#8B5CF6" />
      <pointLight position={[3, -4, 2]} intensity={0.4} color="#38BDF8" />

      {/* LAYER 1: Central Developer Core (Dark Glass Octahedron with Inner Glowing Core) */}
      <DeveloperCore isHovered={hoveredNode !== null} />

      {/* Thin Technical Connection Rays to each Node */}
      <ConnectionLines nodes={activeNodes} hoveredNode={hoveredNode} />

      {/* LAYER 2: Technology Nodes (Exact 6 Floating Glass UI Cards) */}
      {activeNodes.map((item) => (
        <TechnologyNode
          key={item.id}
          {...item}
          isHovered={hoveredNode === item.id}
          onHover={(id) => setHoveredNode(id)}
          onLeave={() => setHoveredNode(null)}
        />
      ))}

      {/* LAYER 3: Subtle Background Particle Field (28 particles max) */}
      {!isReducedMotion && <ParticleField />}
    </group>
  );
}

export const HeroScene: React.FC = () => {
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

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

    return () => {
      motionQuery.removeEventListener('change', handleMotion);
      mobileQuery.removeEventListener('change', handleMobile);
    };
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-[380px] sm:h-[460px] lg:h-[600px] xl:h-[620px] flex items-center justify-center">
        <div className="w-14 h-14 rounded-full border border-[#8B5CF6]/30 animate-pulse bg-[#0D0F14]/40" />
      </div>
    );
  }

  return (
    <div className="w-full h-[380px] sm:h-[460px] lg:h-[600px] xl:h-[620px] relative overflow-hidden flex items-center justify-center select-none">
      <Canvas
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        camera={{ position: [0, 0, 8.4], fov: 46 }}
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
