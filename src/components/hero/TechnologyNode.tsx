import React, { useRef } from 'react';
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
        <div className="w-8 h-8 rounded-lg bg-[#2F74C0] flex items-center justify-center text-[10px] font-extrabold text-white shadow-[0_0_12px_rgba(47,116,192,0.5)]">
          TS
        </div>
      );
    case 'react':
      return (
        <div className="w-8 h-8 rounded-lg bg-[#61DAFB]/10 border border-[#61DAFB]/30 flex items-center justify-center shadow-[0_0_12px_rgba(97,218,251,0.3)]">
          <svg className="w-5 h-5 text-[#61DAFB]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(30 12 12)" />
            <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(90 12 12)" />
            <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(150 12 12)" />
            <circle cx="12" cy="12" r="1.8" fill="currentColor" />
          </svg>
        </div>
      );
    case 'node':
      return (
        <div className="w-8 h-8 rounded-lg bg-[#22C55E]/15 border border-[#22C55E]/40 flex items-center justify-center shadow-[0_0_12px_rgba(34,197,94,0.3)]">
          <span className="text-[10px] font-black text-[#4ADE80] tracking-tighter">JS</span>
        </div>
      );
    case 'mongo':
      return (
        <div className="w-8 h-8 rounded-lg bg-[#22C55E]/15 border border-[#22C55E]/30 flex items-center justify-center shadow-[0_0_12px_rgba(34,197,94,0.3)]">
          <svg className="w-5 h-5 text-[#22C55E]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2C8 7 8 13 12 22c4-9 4-15 0-20z" fill="currentColor" fillOpacity="0.4" />
            <line x1="12" y1="3" x2="12" y2="21" />
          </svg>
        </div>
      );
    case 'git':
      return (
        <div className="w-8 h-8 rounded-lg bg-[#F05032] flex items-center justify-center shadow-[0_0_12px_rgba(240,80,50,0.4)]">
          <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <circle cx="18" cy="18" r="2.8" />
            <circle cx="6" cy="6" r="2.8" />
            <circle cx="6" cy="18" r="2.8" />
            <path d="M6 9v6" />
            <path d="M9 18h6" />
          </svg>
        </div>
      );
    case 'api':
      return (
        <div className="w-8 h-8 rounded-lg bg-[#A855F7]/15 border border-[#A855F7]/35 flex items-center justify-center shadow-[0_0_12px_rgba(168,85,247,0.3)]">
          <svg className="w-5 h-5 text-[#C084FC]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
          </svg>
        </div>
      );
    default:
      return <div className="w-8 h-8 rounded-lg bg-[#8B5CF6]/20" />;
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

    // Organic slow micro-floating
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
      {/* 3D Anchor Bead glowing beside the card */}
      <mesh position={[id === 'react' || id === 'git' ? 0.95 : -0.95, 0, 0]}>
        <sphereGeometry args={[0.038, 16, 16]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={isHovered ? 2.5 : 1.6}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>

      {/* Premium Glass UI Card (Matching Target Screenshot) */}
      <Html center distanceFactor={8.2} className="select-none pointer-events-auto">
        <div
          onMouseEnter={() => onHover(id)}
          onMouseLeave={onLeave}
          className="flex items-center gap-3.5 px-4 py-2.5 rounded-[16px] transition-all duration-300 cursor-pointer"
          style={{
            width: '172px',
            height: '56px',
            background: isHovered ? 'rgba(14, 11, 28, 0.94)' : 'rgba(10, 8, 20, 0.84)',
            border: isHovered
              ? '1px solid rgba(192, 132, 252, 0.65)'
              : '1px solid rgba(255, 255, 255, 0.12)',
            boxShadow: isHovered
              ? `0 10px 30px rgba(139, 92, 246, 0.4), 0 0 20px rgba(139, 92, 246, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.2)`
              : '0 8px 24px rgba(0, 0, 0, 0.65), 0 0 18px rgba(139, 92, 246, 0.14), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            transform: isHovered ? 'scale(1.05)' : 'scale(1.0)',
          }}
        >
          {/* Left: App icon */}
          <div className="shrink-0">{renderTechIcon(id)}</div>

          {/* Right: Title & Subtitle */}
          <div className="flex flex-col min-w-0">
            <span
              className={`font-sans font-bold text-[13.5px] leading-tight truncate transition-colors duration-200 ${
                isHovered ? 'text-white' : 'text-[#F3F4F6]'
              }`}
            >
              {name}
            </span>
            <span className="font-mono-tech text-[8.5px] uppercase tracking-[0.18em] text-[#9CA3AF] mt-0.5 truncate">
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
