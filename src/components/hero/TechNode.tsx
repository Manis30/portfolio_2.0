import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, Line } from '@react-three/drei';
import * as THREE from 'three';

export interface TechNodeProps {
  id: string;
  name: string;
  position: [number, number, number];
  color: string;
  speed: number;
  phase: number;
  isHovered: boolean;
  onHover: (id: string) => void;
  onLeave: () => void;
  onPositionUpdate?: (id: string, pos: [number, number, number]) => void;
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
  const [currentPos, setCurrentPos] = useState<[number, number, number]>(position);

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    // Organic micro-floating
    const dx = Math.sin(t * speed * 0.35 + phase) * 0.015;
    const dy = Math.cos(t * speed * 0.30 + phase) * 0.015;
    // On hover, physically advance forward in Z depth for true 3D responsiveness
    const targetZ = isHovered ? position[2] + 0.15 : position[2];
    const dz = Math.sin(t * speed * 0.25 + phase) * 0.01;

    const posX = position[0] + dx;
    const posY = position[1] + dy;
    const posZ = targetZ + dz;

    if (groupRef.current) {
      groupRef.current.position.set(posX, posY, posZ);
      setCurrentPos([posX, posY, posZ]);
      onPositionUpdate?.(id, [posX, posY, posZ]);
    }
  });

  return (
    <>
      {/* Structural Ray Line from Core to Architectural Tech Node */}
      <Line
        points={[[0, 0, 0], currentPos]}
        color={isHovered ? color : '#8B5CF6'}
        lineWidth={isHovered ? 1.0 : 0.5}
        transparent
        opacity={isHovered ? 0.65 : 0.14}
      />

      <group ref={groupRef} position={position}>
        {/* Architectural Node Anchor Bead */}
        <mesh>
          <sphereGeometry args={[0.024, 16, 16]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={isHovered ? 1.2 : 0.6}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>

        {/* Premium Floating Object Badge (approx 125-140px wide, not dominating) */}
        <Html center distanceFactor={7.4} className="select-none pointer-events-auto">
          <div
            onMouseEnter={() => onHover(id)}
            onMouseLeave={onLeave}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all duration-300 cursor-pointer"
            style={{
              height: '32px',
              minWidth: '115px',
              background: isHovered ? 'rgba(14, 11, 26, 0.94)' : 'rgba(8, 8, 14, 0.85)',
              border: isHovered
                ? `1px solid rgba(192, 132, 252, 0.6)`
                : '1px solid rgba(255, 255, 255, 0.11)',
              boxShadow: isHovered
                ? `0 4px 20px rgba(139, 92, 246, 0.4), inset 0 0 12px rgba(139, 92, 246, 0.2)`
                : '0 2px 10px rgba(0, 0, 0, 0.6)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              whiteSpace: 'nowrap',
              transform: isHovered ? 'scale(1.06)' : 'scale(1.0)',
            }}
          >
            <div className="w-[14px] h-[14px] flex items-center justify-center shrink-0">
              {renderTechIcon(id)}
            </div>
            <span
              className={`font-sans font-medium text-[12px] tracking-tight transition-colors duration-200 ${
                isHovered ? 'text-white' : 'text-[#E4E4E7]'
              }`}
            >
              {name}
            </span>
            {isHovered && (
              <span className="w-1 h-1 rounded-full bg-[#C084FC] ml-auto animate-pulse" />
            )}
          </div>
        </Html>
      </group>
    </>
  );
};

export default TechNode;
