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
  // Pre-generate linear pathways from [0, 0, 0] to each node
  const packets = useMemo(() => {
    return nodes.map((node, i) => ({
      nodeId: node.id,
      color: node.color,
      target: new THREE.Vector3(...node.position),
      speed: 0.25 + (i % 3) * 0.05,
      offset: (i * 0.16) % 1,
    }));
  }, [nodes]);

  const packetRefs = useRef<(THREE.Mesh | null)[]>([]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    packets.forEach((p, idx) => {
      const mesh = packetRefs.current[idx];
      if (mesh) {
        // Progress cycling 0 -> 1 along the line
        const progress = (t * p.speed + p.offset) % 1;
        mesh.position.lerpVectors(new THREE.Vector3(0, 0, 0), p.target, progress);
      }
    });
  });

  return (
    <group>
      {/* Maximum 6 subtle technical connection rays */}
      {nodes.map((node) => {
        const isHovered = hoveredNode === node.id;
        return (
          <Line
            key={`line-${node.id}`}
            points={[[0, 0, 0], node.position]}
            color={isHovered ? node.color : '#8B5CF6'}
            lineWidth={isHovered ? 1.0 : 0.5}
            transparent
            opacity={isHovered ? 0.65 : 0.15}
          />
        );
      })}

      {/* Occasional small moving data packet along each connection ray */}
      {packets.map((p, idx) => (
        <mesh
          key={`packet-${p.nodeId}`}
          ref={(el) => {
            packetRefs.current[idx] = el;
          }}
        >
          <sphereGeometry args={[0.024, 12, 12]} />
          <meshStandardMaterial
            color={hoveredNode === p.nodeId ? p.color : '#C084FC'}
            emissive={hoveredNode === p.nodeId ? p.color : '#C084FC'}
            emissiveIntensity={1.4}
            roughness={0.1}
            metalness={0.8}
          />
        </mesh>
      ))}
    </group>
  );
};

export default ConnectionLines;
