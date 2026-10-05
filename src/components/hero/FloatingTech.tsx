import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, Line } from '@react-three/drei';
import * as THREE from 'three';

interface TechIndicatorProps {
  id: string;
  name: string;
  position: [number, number, number];
  color: string;
  speed: number;
  phase: number;
}

const renderTechIcon = (id: string) => {
  switch (id) {
    case 'ts':
      return (
        <span className="w-3.5 h-3.5 rounded-[3px] bg-[#3178C6] flex items-center justify-center text-[7.5px] font-bold text-white leading-none">
          TS
        </span>
      );
    case 'react':
      return (
        <svg className="w-3.5 h-3.5 text-[#61DAFB]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(30 12 12)" />
          <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(90 12 12)" />
          <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(150 12 12)" />
          <circle cx="12" cy="12" r="1.8" fill="currentColor" />
        </svg>
      );
    case 'node':
      return (
        <span className="w-3.5 h-3.5 rounded-[3px] bg-[#22C55E]/20 border border-[#22C55E]/40 flex items-center justify-center text-[7.5px] font-bold text-[#4ADE80] leading-none">
          JS
        </span>
      );
    case 'mongo':
      return (
        <svg className="w-3.5 h-3.5 text-[#22C55E]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2C8 7 8 13 12 22c4-9 4-15 0-20z" fill="currentColor" fillOpacity="0.3" />
          <line x1="12" y1="3" x2="12" y2="21" />
        </svg>
      );
    default:
      return <span className="w-2 h-2 rounded-full bg-[#8B5CF6]" />;
  }
};

const SingleTechIndicator: React.FC<TechIndicatorProps> = ({
  id,
  name,
  position,
  color,
  speed,
  phase,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const [currentPos, setCurrentPos] = React.useState<[number, number, number]>(position);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    // Slow, stately micro-floating (8–14s period)
    const dx = Math.sin(t * speed * 0.35 + phase) * 0.015;
    const dy = Math.cos(t * speed * 0.3 + phase) * 0.015;
    const dz = Math.sin(t * speed * 0.25 + phase) * 0.01;

    const posX = position[0] + dx;
    const posY = position[1] + dy;
    const posZ = position[2] + dz;

    if (groupRef.current) {
      groupRef.current.position.set(posX, posY, posZ);
      setCurrentPos([posX, posY, posZ]);
    }
  });

  return (
    <>
      {/* Subtle thin connecting ray toward center */}
      <Line
        points={[[0, 0, 0], currentPos]}
        color="#8B5CF6"
        lineWidth={0.5}
        transparent
        opacity={0.12}
      />

      <group ref={groupRef} position={position}>
        {/* Tiny 3D Anchor Bead */}
        <mesh>
          <sphereGeometry args={[0.022, 16, 16]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.6}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>

        {/* Small subtle 3D floating badge */}
        <Html center distanceFactor={7.4} className="select-none pointer-events-auto">
          <div
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition-all duration-300 hover:scale-105 cursor-pointer shadow-[0_2px_12px_rgba(0,0,0,0.7)] hover:border-white/30"
            style={{
              height: '30px',
              background: 'rgba(8, 8, 14, 0.85)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              whiteSpace: 'nowrap',
            }}
          >
            <div className="w-[14px] h-[14px] flex items-center justify-center shrink-0">
              {renderTechIcon(id)}
            </div>
            <span className="font-sans font-medium text-[12px] text-[#F3F4F6] tracking-tight">
              {name}
            </span>
          </div>
        </Html>
      </group>
    </>
  );
};

// Exactly 4 intentional technology indicators with verified non-colliding 3D spatial clearance
export const FloatingTech: React.FC = () => {
  const INDICATORS: TechIndicatorProps[] = [
    // 1. TypeScript (Top Apex, slightly back in depth)
    { id: 'ts', name: 'TypeScript', position: [0.0, 1.82, -0.25], color: '#3178C6', speed: 0.35, phase: 0.0 },
    // 2. React (Upper Left, forward in depth)
    { id: 'react', name: 'React', position: [-1.68, 0.48, 0.35], color: '#61DAFB', speed: 0.32, phase: 1.2 },
    // 3. Node.js (Upper Right, forward in depth)
    { id: 'node', name: 'Node.js', position: [1.68, 0.48, 0.35], color: '#68A063', speed: 0.34, phase: 2.1 },
    // 4. MongoDB (Bottom, slightly back in depth)
    { id: 'mongo', name: 'MongoDB', position: [0.0, -1.82, -0.25], color: '#22C55E', speed: 0.30, phase: 3.4 },
  ];

  return (
    <group>
      {INDICATORS.map((ind) => (
        <SingleTechIndicator key={ind.id} {...ind} />
      ))}
    </group>
  );
};

export default FloatingTech;
