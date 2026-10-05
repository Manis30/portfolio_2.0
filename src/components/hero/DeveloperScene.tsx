import React, { useRef, useMemo, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, Line } from '@react-three/drei';
import * as THREE from 'three';
import { HERO_TECH_NODES, MOBILE_HERO_NODES } from '../../data/techStack';
import { DeveloperCore } from './DeveloperCore';
import { OrbitalRings } from './OrbitalRings';
import { TechNode } from './TechNode';

// Sparse Ambient Micro-Particles
function AmbientDust() {
  const count = 20;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 5.8;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 4.6;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 3.4;
    }
    return pos;
  }, []);

  const ref = useRef<THREE.Points>(null);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.006;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.018}
        color="#C084FC"
        transparent
        opacity={0.16}
        sizeAttenuation
      />
    </points>
  );
}

// 3D Scene Root with Damped Mouse Parallax (10–18px maximum deflection)
function SceneContent() {
  const sceneGroupRef = useRef<THREE.Group>(null);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [livePositions, setLivePositions] = useState<Record<string, [number, number, number]>>({});

  const handlePositionUpdate = (id: string, pos: [number, number, number]) => {
    setLivePositions((prev) => ({ ...prev, [id]: pos }));
  };

  useFrame(({ pointer }) => {
    if (sceneGroupRef.current) {
      // Smooth subtle mouse parallax
      const targetRotX = -pointer.y * 0.045;
      const targetRotY = pointer.x * 0.06;
      sceneGroupRef.current.rotation.x = THREE.MathUtils.lerp(
        sceneGroupRef.current.rotation.x,
        targetRotX,
        0.03
      );
      sceneGroupRef.current.rotation.y = THREE.MathUtils.lerp(
        sceneGroupRef.current.rotation.y,
        targetRotY,
        0.03
      );
    }
  });

  return (
    <group ref={sceneGroupRef}>
      {/* Cinematic Three-Point Lighting */}
      <ambientLight intensity={0.55} />
      <pointLight position={[0, 0, 0]} intensity={2.8} color="#8B5CF6" distance={5.5} />
      <directionalLight position={[4, 5, 4]} intensity={1.2} color="#FFFFFF" />
      <pointLight position={[-4, -3, -2]} intensity={1.0} color="#38BDF8" />
      <pointLight position={[3, -4, 2]} intensity={0.7} color="#C084FC" />

      {/* Central 3D Developer Core (220-280px visual scale) */}
      <DeveloperCore isHovered={hoveredNodeId !== null} />

      {/* 3D Orbital Trajectory System */}
      <OrbitalRings />

      {/* Thin connecting energy rays from core to each node */}
      {HERO_TECH_NODES.map((item) => {
        const isHovered = hoveredNodeId === item.id;
        const currentPos = livePositions[item.id] || item.position;

        return (
          <Line
            key={`ray-${item.id}`}
            points={[[0, 0, 0], currentPos]}
            color={isHovered ? item.color : '#8B5CF6'}
            lineWidth={isHovered ? 1.2 : 0.5}
            transparent
            opacity={isHovered ? 0.75 : 0.12}
          />
        );
      })}

      {/* 9 Floating Technology Nodes within safe non-colliding bounds */}
      {HERO_TECH_NODES.map((item) => (
        <TechNode
          key={item.id}
          id={item.id}
          name={item.name}
          position={item.position}
          color={item.color}
          speed={item.speed}
          phase={item.phase}
          isHovered={hoveredNodeId === item.id}
          onHover={() => setHoveredNodeId(item.id)}
          onLeave={() => setHoveredNodeId(null)}
          onPositionUpdate={handlePositionUpdate}
        />
      ))}

      {/* Ambient Micro Dust */}
      <AmbientDust />
    </group>
  );
}

export const DeveloperScene: React.FC = () => {
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mediaQueryMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mediaQueryMobile = window.matchMedia('(max-width: 768px)');

    setIsReducedMotion(mediaQueryMotion.matches);
    setIsMobile(mediaQueryMobile.matches);

    const handleMotion = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    const handleMobile = (e: MediaQueryListEvent) => setIsMobile(e.matches);

    mediaQueryMotion.addEventListener('change', handleMotion);
    mediaQueryMobile.addEventListener('change', handleMobile);

    return () => {
      mediaQueryMotion.removeEventListener('change', handleMotion);
      mediaQueryMobile.removeEventListener('change', handleMobile);
    };
  }, []);

  if (!mounted) {
    return <div className="w-full h-full min-h-[320px]" />;
  }

  // Simplified Clean Mobile Presentation (Dedicated 6-node layout)
  if (isReducedMotion || isMobile) {
    return (
      <div className="relative w-full h-[320px] sm:h-[360px] flex items-center justify-center select-none overflow-hidden px-4">
        <div className="relative w-[280px] h-[280px] flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border border-white/[0.08] bg-[#07070C]/80 shadow-[0_0_35px_rgba(139,92,246,0.1)]" />
          <div className="absolute inset-6 rounded-full border border-dashed border-[#8B5CF6]/20 animate-[spin_100s_linear_infinite]" />

          {/* Central Core */}
          <div className="w-20 h-20 rounded-2xl bg-[#090910] border border-[#8B5CF6]/50 flex flex-col items-center justify-center shadow-[0_0_25px_rgba(139,92,246,0.25)] z-10">
            <span className="font-display text-xs font-black text-white tracking-wider">
              MANI
            </span>
            <span className="font-mono-tech text-[8px] uppercase text-[#8B5CF6] tracking-widest font-bold mt-0.5">
              FULL STACK
            </span>
            <div className="w-1.5 h-1.5 rounded-full bg-[#10B981] mt-1 shadow-[0_0_6px_#10B981]" />
          </div>

          {/* 6 Core Mobile Nodes */}
          {MOBILE_HERO_NODES.map((node) => {
            const x = Math.cos(node.angle) * node.dist;
            const y = Math.sin(node.angle) * node.dist;
            return (
              <div
                key={node.id}
                className="absolute flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#0A0A12]/95 border border-white/15 text-[11px] font-sans font-medium text-[#F5F5F5] shadow-lg whitespace-nowrap"
                style={{
                  transform: `translate(${x}px, ${y}px)`,
                }}
              >
                <span>{node.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Desktop Cinematic 3D Scene with Calibrated Perspective Camera (zero clipping guarantee)
  return (
    <div className="hero-visual w-full h-[min(620px,70vh)] relative flex items-center justify-center select-none overflow-visible">
      <Suspense
        fallback={
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-[#8B5CF6] border-t-transparent rounded-full animate-spin" />
          </div>
        }
      >
        <Canvas
          dpr={[1, 1.5]}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'low-power',
          }}
        >
          <PerspectiveCamera makeDefault position={[0, 0, 8.0]} fov={38} />
          <SceneContent />
        </Canvas>
      </Suspense>
    </div>
  );
};

export default DeveloperScene;
