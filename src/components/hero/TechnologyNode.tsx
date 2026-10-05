import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

export interface TechNodeData {
  id: string;
  name: string;
  category: string;
  position: [number, number, number];
  color: string;
  phase: number;
}

interface TechnologyNodeProps extends TechNodeData {
  isHovered: boolean;
  onHover: (id: string) => void;
  onLeave: () => void;
}

const renderTechIcon = (id: string) => {
  switch (id) {
    case 'ts':
      return (
        <span className="w-4 h-4 rounded-[4px] bg-[#3178C6] flex items-center justify-center text-[8px] font-bold text-white leading-none shadow-sm">
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
        <span className="w-4 h-4 rounded-[4px] bg-[#22C55E]/20 border border-[#22C55E]/40 flex items-center justify-center text-[8px] font-bold text-[#4ADE80] leading-none">
          JS
        </span>
      );
    case 'mongo':
      return (
        <svg className="w-4 h-4 text-[#22C55E]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2C8 7 8 13 12 22c4-9 4-15 0-20z" fill="currentColor" fillOpacity="0.3" />
          <line x1="12" y1="3" x2="12" y2="21" />
        </svg>
      );
    case 'git':
      return (
        <svg className="w-4 h-4 text-[#F05032]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="18" cy="18" r="3" />
          <circle cx="6" cy="6" r="3" />
          <circle cx="6" cy="18" r="3" />
          <path d="M6 9v6" />
          <path d="M9 18h6" />
        </svg>
      );
    case 'api':
      return (
        <svg className="w-4 h-4 text-[#A855F7]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="6" width="20" height="12" rx="3" />
          <path d="M6 12h.01M10 12h.01M14 12h.01M18 12h.01" />
        </svg>
      );
    default:
      return <span className="w-2.5 h-2.5 rounded-full bg-[#8B5CF6]" />;
  }
};

export const TechnologyNode: React.FC<TechnologyNodeProps> = ({
  id,
  name,
  category,
  position,
  color,
  phase,
  isHovered,
  onHover,
  onLeave,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const currentZRef = useRef(position[2]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    // Organic, slow micro-floating
    const dy = Math.sin(t * 0.45 + phase) * 0.015;
    const dx = Math.cos(t * 0.35 + phase) * 0.012;

    // Smooth spring-like lerp forward on hover for true 3D depth
    const targetZ = isHovered ? position[2] + 0.22 : position[2];
    currentZRef.current = THREE.MathUtils.lerp(currentZRef.current, targetZ, 0.08);

    if (groupRef.current) {
      groupRef.current.position.set(position[0] + dx, position[1] + dy, currentZRef.current);
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* 3D Anchor Bead */}
      <mesh>
        <sphereGeometry args={[0.022, 16, 16]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={isHovered ? 1.4 : 0.6}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Premium Glass UI Card (155px wide, 52px high, 14px radius) */}
      <Html center distanceFactor={8.2} className="select-none pointer-events-auto">
        <div
          onMouseEnter={() => onHover(id)}
          onMouseLeave={onLeave}
          className="flex items-center gap-3 px-3.5 py-2.5 rounded-[14px] transition-all duration-300 cursor-pointer"
          style={{
            width: '160px',
            height: '52px',
            background: isHovered ? 'rgba(14, 11, 26, 0.94)' : 'rgba(10, 9, 18, 0.86)',
            border: isHovered
              ? '1px solid rgba(192, 132, 252, 0.6)'
              : '1px solid rgba(255, 255, 255, 0.12)',
            boxShadow: isHovered
              ? '0 8px 24px rgba(139, 92, 246, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
              : '0 4px 16px rgba(0, 0, 0, 0.55), inset 0 1px 0 rgba(255, 255, 255, 0.06)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            transform: isHovered ? 'scale(1.05)' : 'scale(1.0)',
          }}
        >
          <div className="w-8 h-8 rounded-lg bg-white/[0.06] border border-white/[0.08] flex items-center justify-center shrink-0">
            {renderTechIcon(id)}
          </div>
          <div className="flex flex-col min-w-0">
            <span
              className={`font-sans font-semibold text-[13px] leading-tight truncate transition-colors duration-200 ${
                isHovered ? 'text-white' : 'text-[#F3F4F6]'
              }`}
            >
              {name}
            </span>
            <span className="font-mono-tech text-[9.5px] uppercase tracking-wider text-[#9CA3AF] mt-0.5 truncate">
              {category}
            </span>
          </div>
          {isHovered && (
            <div className="w-1.5 h-1.5 rounded-full bg-[#C084FC] ml-auto shrink-0 animate-pulse shadow-[0_0_8px_#C084FC]" />
          )}
        </div>
      </Html>
    </group>
  );
};

export default TechnologyNode;
