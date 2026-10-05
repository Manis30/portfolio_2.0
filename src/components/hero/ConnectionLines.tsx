import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Line } from '@react-three/drei';
import * as THREE from 'three';
import { TechNodeData } from './TechnologyNode';

interface ConnectionLinesProps {
  nodes: TechNodeData[];
  hoveredNode: string | null;
}

export const ConnectionLines: React.FC<ConnectionLinesProps> = ({ nodes, hoveredNode }) => {
  // Pre-generate linear pathways from [0, 0, 0] to each node's anchor position
  const packets = useMemo(() => {
    return nodes.map((node, i) => {
      // Calculate anchor bead position adjacent to the card
      const anchorX = node.position[0] + (node.id === 'react' || node.id === 'git' ? 0.95 : -0.95);
      const targetPos = new THREE.Vector3(anchorX, node.position[1], node.position[2]);

      return {
        nodeId: node.id,
        color: node.color,
        target: targetPos,
        speed: 0.28 + (i % 3) * 0.05,
        offset: (i * 0.16) % 1,
      };
    });
  }, [nodes]);

  const packetRefs = useRef<(THREE.Mesh | null)[]>([]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    packets.forEach((p, idx) => {
      const mesh = packetRefs.current[idx];
      if (mesh) {
        // Progress cycling 0 -> 1 along the connection ray
        const progress = (t * p.speed + p.offset) % 1;
        mesh.position.lerpVectors(new THREE.Vector3(0, 0, 0), p.target, progress);
      }
    });
  });

  return (
    <group>
      {/* 6 Technical Connection Rays matching reference image */}
      {nodes.map((node) => {
        const isHovered = hoveredNode === node.id;
        const anchorX = node.position[0] + (node.id === 'react' || node.id === 'git' ? 0.95 : -0.95);
        const anchorPoint: [number, number, number] = [anchorX, node.position[1], node.position[2]];

        return (
          <Line
            key={`line-${node.id}`}
            points={[[0, 0, 0], anchorPoint]}
            color={isHovered ? node.color : '#A855F7'}
            lineWidth={isHovered ? 1.5 : 0.8}
            transparent
            opacity={isHovered ? 0.85 : 0.28}
          />
        );
      })}

      {/* Glowing data packet traveling along each ray */}
      {packets.map((p, idx) => (
        <mesh
          key={`packet-${p.nodeId}`}
          ref={(el) => {
            packetRefs.current[idx] = el;
          }}
        >
          <sphereGeometry args={[0.032, 16, 16]} />
          <meshStandardMaterial
            color={hoveredNode === p.nodeId ? p.color : '#E879F9'}
            emissive={hoveredNode === p.nodeId ? p.color : '#E879F9'}
            emissiveIntensity={2.5}
            roughness={0.1}
            metalness={0.8}
          />
        </mesh>
      ))}
    </group>
  );
};

export default ConnectionLines;
