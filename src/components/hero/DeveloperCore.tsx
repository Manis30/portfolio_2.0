import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface DeveloperCoreProps {
  isHovered?: boolean;
}

// Custom Irregular Low-Poly Architectural Polyhedron (NOT a cube, NOT a sphere, NOT a basic icosahedron)
function createArchitecturalCoreGeometry(): THREE.BufferGeometry {
  // 12 carefully sculpted vertices creating an asymmetric architectural gemstone/core
  const rawVerts: number[][] = [
    // Top apex (subtly offset for organic architectural asymmetry)
    [0.08, 1.22, 0.02],
    // Upper facet ring (5 asymmetric points)
    [0.82, 0.42, 0.36],
    [0.12, 0.52, 0.92],
    [-0.82, 0.38, 0.42],
    [-0.72, 0.48, -0.62],
    [0.52, 0.40, -0.78],
    // Lower facet ring (5 staggered asymmetric points)
    [0.92, -0.32, -0.22],
    [0.42, -0.42, 0.82],
    [-0.52, -0.38, 0.78],
    [-0.88, -0.28, -0.32],
    [-0.08, -0.40, -0.92],
    // Bottom apex
    [-0.06, -1.22, 0.02],
  ];

  // 20 Triangular facet definitions
  const faces = [
    // Top Cap (5 triangles)
    [0, 1, 2], [0, 2, 3], [0, 3, 4], [0, 4, 5], [0, 5, 1],
    // Mid Belt (10 triangles)
    [1, 6, 2], [2, 6, 7],
    [2, 7, 3], [3, 7, 8],
    [3, 8, 4], [4, 8, 9],
    [4, 9, 5], [5, 9, 10],
    [5, 10, 1], [1, 10, 6],
    // Bottom Cap (5 triangles)
    [11, 7, 6], [11, 8, 7], [11, 9, 8], [11, 10, 9], [11, 6, 10],
  ];

  const positions: number[] = [];
  for (const face of faces) {
    const vA = rawVerts[face[0]];
    const vB = rawVerts[face[1]];
    const vC = rawVerts[face[2]];
    positions.push(...vA, ...vB, ...vC);
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.computeVertexNormals();
  return geometry;
}

export const DeveloperCore: React.FC<DeveloperCoreProps> = ({ isHovered = false }) => {
  const crystalRef = useRef<THREE.Mesh>(null);
  const nucleusRef = useRef<THREE.Mesh>(null);
  const wireframeRef = useRef<THREE.LineSegments>(null);

  const customGeo = useMemo(() => createArchitecturalCoreGeometry(), []);
  const edgesGeo = useMemo(() => new THREE.EdgesGeometry(customGeo), [customGeo]);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;

    // Slow, stately rotation (approx 0.08–0.12 rad/sec)
    if (crystalRef.current) {
      crystalRef.current.rotation.y += delta * 0.09;
      crystalRef.current.rotation.x = Math.sin(t * 0.28) * 0.04;
      const breathe = 1 + Math.sin(t * 1.1) * (isHovered ? 0.03 : 0.012);
      crystalRef.current.scale.set(breathe, breathe, breathe);
    }

    // Inner glowing nucleus rotating counter to the outer core
    if (nucleusRef.current) {
      nucleusRef.current.rotation.y -= delta * 0.12;
      nucleusRef.current.rotation.z += delta * 0.07;
      const innerPulse = 1 + Math.sin(t * 2.0) * 0.03;
      nucleusRef.current.scale.set(innerPulse, innerPulse, innerPulse);
    }

    // Wireframe edge shell rotating with subtle angular offset
    if (wireframeRef.current) {
      wireframeRef.current.rotation.y += delta * 0.09;
      wireframeRef.current.rotation.x = Math.sin(t * 0.28) * 0.04;
      const breathe = 1 + Math.sin(t * 1.1) * (isHovered ? 0.03 : 0.012);
      wireframeRef.current.scale.set(breathe * 1.002, breathe * 1.002, breathe * 1.002);
    }
  });

  return (
    <group>
      {/* Small internal white & violet light source inside the core */}
      <pointLight position={[0, 0, 0]} intensity={2.8} color="#C084FC" distance={4.5} />
      <pointLight position={[0, 0.2, 0]} intensity={1.8} color="#FFFFFF" distance={2.5} />

      {/* LAYER 1: Inner Glowing Luminous Nucleus (Application Core) */}
      <mesh ref={nucleusRef}>
        <octahedronGeometry args={[0.45, 0]} />
        <meshStandardMaterial
          color="#8B5CF6"
          emissive="#A855F7"
          emissiveIntensity={1.2}
          roughness={0.18}
          metalness={0.4}
        />
      </mesh>

      {/* LAYER 1 (Outer): Custom Architectural Polyhedron Crystal */}
      <mesh ref={crystalRef} geometry={customGeo}>
        <meshPhysicalMaterial
          color="#0F061F"
          emissive="#6D28D9"
          emissiveIntensity={isHovered ? 0.75 : 0.42}
          roughness={0.15}
          metalness={0.25}
          transmission={0.35}
          thickness={1.4}
          ior={1.52}
          transparent={true}
          opacity={0.88}
          clearcoat={1}
          clearcoatRoughness={0.12}
          flatShading={true}
        />
      </mesh>

      {/* Subtle Architectural Edge Wireframe Highlighting the Facets */}
      <lineSegments ref={wireframeRef} geometry={edgesGeo}>
        <lineBasicMaterial color="#C084FC" transparent opacity={0.32} />
      </lineSegments>
    </group>
  );
};

export default DeveloperCore;
