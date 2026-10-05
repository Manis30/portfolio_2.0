import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

export interface TechNodeProps {
  id: string;
  name: string;
  position: [number, number, number];
  color: string;
  speed: number;
  phase: number;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
  onPositionUpdate?: (id: string, pos: [number, number, number]) => void;
}

// Crisp Minimal SVG Tech Icons
const renderTechIcon = (id: string) => {
  switch (id) {
    case 'ts':
      return (
        <span className="w-4 h-4 rounded bg-[#3178C6] flex items-center justify-center text-[9px] font-bold text-white leading-none">
          TS
        </span>
      );
    case 'react':
      return (
        <svg className="w-4 h-4 text-[#61DAFB]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(30 12 12)" />
          <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(90 12 12)" />
          <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(150 12 12)" />
          <circle cx="12" cy="12" r="1.8" fill="currentColor" />
        </svg>
      );
    case 'node':
      return (
        <span className="w-4 h-4 rounded bg-[#22C55E]/20 border border-[#22C55E]/40 flex items-center justify-center text-[8.5px] font-bold text-[#4ADE80] leading-none">
          JS
        </span>
      );
    case 'api':
      return (
        <svg className="w-4 h-4 text-[#A855F7]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
        </svg>
      );
    case 'express':
      return (
        <span className="w-4 h-4 rounded-full bg-black border border-white/20 flex items-center justify-center text-[8px] font-mono font-bold text-white leading-none">
          ex
        </span>
      );
    case 'git':
      return (
        <span className="w-4 h-4 rounded bg-[#F05032] flex items-center justify-center text-[9px] text-white">
          <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <line x1="6" y1="3" x2="6" y2="15" />
            <circle cx="18" cy="6" r="3" />
            <circle cx="6" cy="18" r="3" />
            <path d="M18 9a9 9 0 0 1-9 9" />
          </svg>
        </span>
      );
    case 'appwrite':
      return (
        <span className="w-4 h-4 rounded-full bg-[#FD366E] flex items-center justify-center text-[9px] font-black text-white leading-none shadow-sm">
          A
        </span>
      );
    case 'docker':
      return (
        <svg className="w-4 h-4 text-[#38BDF8]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 14a8 8 0 0 0 16 0c0-4-3-6-4-6-1 0-2 1-3 1s-2-1-3-1c-2 0-3 1-4 3" />
          <rect x="5" y="8" width="2" height="2" fill="currentColor" />
          <rect x="8" y="8" width="2" height="2" fill="currentColor" />
          <rect x="11" y="8" width="2" height="2" fill="currentColor" />
        </svg>
      );
    case 'mongo':
      return (
        <svg className="w-4 h-4 text-[#22C55E]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2C8 7 8 13 12 22c4-9 4-15 0-20z" fill="currentColor" fillOpacity="0.3" />
          <line x1="12" y1="3" x2="12" y2="21" />
        </svg>
      );
    default:
      return <span className="w-2 h-2 rounded-full bg-[#8B5CF6]" />;
  }
};

export const TechNode: React.FC<TechNodeProps> = ({
  id,
  name,
  position,
  color,
  speed,
  phase,
  isHovered,
  onHover,
  onLeave,
  onPositionUpdate,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const zDepth = position[2];

  // Visual cues based on Z depth: subtle perspective scaling
  const depthScale = zDepth > 0.2 ? 1.02 : zDepth < -0.2 ? 0.94 : 0.98;
  const depthOpacity = zDepth > 0.2 ? 1.0 : zDepth < -0.2 ? 0.85 : 0.92;

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    // Controlled, slow orbital micro-motion (6-15s cycle)
    const dx = Math.sin(t * speed * 0.4 + phase) * 0.02;
    const dy = Math.cos(t * speed * 0.35 + phase) * 0.02;
    const dz = Math.sin(t * speed * 0.3 + phase) * 0.012;

    const posX = position[0] + dx;
    const posY = position[1] + dy;
    const posZ = position[2] + dz;

    if (groupRef.current) {
      groupRef.current.position.set(posX, posY, posZ);
      onPositionUpdate?.(id, [posX, posY, posZ]);
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* 3D Anchor Point */}
      <mesh>
        <sphereGeometry args={[0.025, 16, 16]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={isHovered ? 1.4 : 0.5}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Controlled Floating Tech Token (Height: 48px, Padding: 10px 16px, Font: 15px) */}
      <Html center distanceFactor={7.5} className="select-none pointer-events-auto">
        <div
          onMouseEnter={onHover}
          onMouseLeave={onLeave}
          className={`flex items-center gap-2.5 px-4 py-2 rounded-2xl transition-all duration-300 cursor-pointer ${
            isHovered
              ? 'scale-105 border shadow-[0_0_20px_var(--glow)] z-30'
              : 'hover:border-white/30 shadow-[0_4px_16px_rgba(0,0,0,0.5)]'
          }`}
          style={{
            height: '48px',
            background: 'rgba(10, 10, 18, 0.85)',
            borderWidth: '1px',
            borderStyle: 'solid',
            borderColor: isHovered ? color : 'rgba(139, 92, 246, 0.22)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            ['--glow' as string]: `${color}55`,
            transform: `scale(${depthScale})`,
            opacity: depthOpacity,
            whiteSpace: 'nowrap',
          }}
        >
          <div className="w-[18px] h-[18px] flex items-center justify-center shrink-0">
            {renderTechIcon(id)}
          </div>
          <span className="font-sans font-medium text-[15px] text-[#F5F5F5] tracking-tight whitespace-nowrap">
            {name}
          </span>
        </div>
      </Html>
    </group>
  );
};

export default TechNode;
