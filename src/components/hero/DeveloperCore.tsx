import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface DeveloperCoreProps {
  isHovered?: boolean;
}

// Custom Precision-Cut Beveled Crystal Polyhedron
function createFacetedCrystalGeometry(): THREE.BufferGeometry {
  // Vertices for a sculpted, beveled crystalline diamond polyhedron
  const rawVerts: number[][] = [
    // Top apex
    [0, 1.35, 0],
    // Upper chamfered ring (6 symmetric vertices)
    [0.95, 0.45, 0.55],
    [0.0, 0.45, 1.10],
    [-0.95, 0.45, 0.55],
    [-0.95, 0.45, -0.55],
    [0.0, 0.45, -1.10],
    [0.95, 0.45, -0.55],
    // Lower chamfered ring (6 symmetric vertices)
    [0.95, -0.45, 0.55],
    [0.0, -0.45, 1.10],
    [-0.95, -0.45, 0.55],
    [-0.95, -0.45, -0.55],
    [0.0, -0.45, -1.10],
    [0.95, -0.45, -0.55],
    // Bottom apex
    [0, -1.35, 0],
  ];

  // Triangulated faces
  const faces = [
    // Top Cap (6 triangles)
    [0, 1, 2], [0, 2, 3], [0, 3, 4], [0, 4, 5], [0, 5, 6], [0, 6, 1],
    // Mid Belt (12 triangles)
    [1, 7, 2], [2, 7, 8],
    [2, 8, 3], [3, 8, 9],
    [3, 9, 4], [4, 9, 10],
    [4, 10, 5], [5, 10, 11],
    [5, 11, 6], [6, 11, 12],
    [6, 12, 1], [1, 12, 7],
    // Bottom Cap (6 triangles)
    [13, 8, 7], [13, 9, 8], [13, 10, 9], [13, 11, 10], [13, 12, 11], [13, 7, 12],
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
  const crystalMeshRef = useRef<THREE.Mesh>(null);
  const wireframeRef = useRef<THREE.LineSegments>(null);
  const innerCubeRef = useRef<THREE.Mesh>(null);
  const orbitalRing1Ref = useRef<THREE.Group>(null);
  const orbitalRing2Ref = useRef<THREE.Group>(null);
  const bead1Ref = useRef<THREE.Mesh>(null);
  const bead2Ref = useRef<THREE.Mesh>(null);

  const crystalGeo = useMemo(() => createFacetedCrystalGeometry(), []);
  const edgesGeo = useMemo(() => new THREE.EdgesGeometry(crystalGeo), [crystalGeo]);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;

    // Slow, stately crystal rotation (0.06 rad/s)
    if (crystalMeshRef.current) {
      crystalMeshRef.current.rotation.y += delta * 0.065;
      crystalMeshRef.current.rotation.x = Math.sin(t * 0.3) * 0.03;
      const breathe = 1 + Math.sin(t * 1.2) * (isHovered ? 0.025 : 0.012);
      crystalMeshRef.current.scale.set(breathe, breathe, breathe);
    }

    if (wireframeRef.current) {
      wireframeRef.current.rotation.y += delta * 0.065;
      wireframeRef.current.rotation.x = Math.sin(t * 0.3) * 0.03;
      const breathe = 1 + Math.sin(t * 1.2) * (isHovered ? 0.025 : 0.012);
      wireframeRef.current.scale.set(breathe * 1.002, breathe * 1.002, breathe * 1.002);
    }

    // Inner glowing violet-magenta core counter-rotates and gently pulses
    if (innerCubeRef.current) {
      innerCubeRef.current.rotation.y -= delta * 0.12;
      innerCubeRef.current.rotation.x += delta * 0.08;
      const pulse = 1 + Math.sin(t * 2.2) * 0.04;
      innerCubeRef.current.scale.set(pulse, pulse, pulse);
    }

    // Orbital ring slow 3D motion
    if (orbitalRing1Ref.current) {
      orbitalRing1Ref.current.rotation.z += delta * 0.025;
      orbitalRing1Ref.current.rotation.y += delta * 0.012;
    }
    if (orbitalRing2Ref.current) {
      orbitalRing2Ref.current.rotation.x += delta * 0.018;
      orbitalRing2Ref.current.rotation.z -= delta * 0.020;
    }

    // Orbiting data beads along the ring
    if (bead1Ref.current) {
      const angle = t * 0.6;
      bead1Ref.current.position.set(Math.cos(angle) * 2.3, Math.sin(angle) * 2.3, 0);
    }
    if (bead2Ref.current) {
      const angle = -t * 0.5 + Math.PI;
      bead2Ref.current.position.set(Math.cos(angle) * 2.3, Math.sin(angle) * 2.3, 0);
    }
  });

  return (
    <group>
      {/* 1. INTENSE INTERNAL LUMINESCENT LIGHTS (Hot center + violet aura) */}
      <pointLight position={[0, 0, 0]} intensity={3.8} color="#D946EF" distance={5.0} />
      <pointLight position={[0, 0.3, 0.2]} intensity={2.2} color="#FFFFFF" distance={3.2} />
      <pointLight position={[0, -0.3, -0.2]} intensity={1.5} color="#8B5CF6" distance={3.5} />

      {/* 2. INNER GLOWING VIOLET-MAGENTA CUBE / NUCLEUS */}
      <mesh ref={innerCubeRef} rotation={[0.4, 0.5, 0.2]}>
        <boxGeometry args={[0.55, 0.55, 0.55]} />
        <meshStandardMaterial
          color="#E879F9"
          emissive="#D946EF"
          emissiveIntensity={2.8}
          roughness={0.12}
          metalness={0.4}
        />
      </mesh>

      {/* 3. OUTER FACETED DARK GLASS CRYSTAL (High refraction, clearcoat, flat shading) */}
      <mesh ref={crystalMeshRef} geometry={crystalGeo}>
        <meshPhysicalMaterial
          color="#100826"
          emissive="#7C3AED"
          emissiveIntensity={isHovered ? 0.6 : 0.32}
          roughness={0.08}
          metalness={0.15}
          transmission={0.88}
          thickness={1.6}
          ior={1.62}
          transparent={true}
          opacity={0.85}
          clearcoat={1.0}
          clearcoatRoughness={0.06}
          flatShading={true}
        />
      </mesh>

      {/* 4. SHARP SPECULAR EDGE WIREFRAME (Electric violet/white facet highlights) */}
      <lineSegments ref={wireframeRef} geometry={edgesGeo}>
        <lineBasicMaterial color="#E879F9" transparent opacity={0.65} />
      </lineSegments>

      {/* 5. BASE PEDESTAL CONCENTRIC RINGS (Horizontal floor plane at y = -1.8) */}
      <group position={[0, -1.8, 0]} rotation={[Math.PI / 2, 0, 0]}>
        {/* Inner ring */}
        <mesh>
          <torusGeometry args={[1.4, 0.005, 16, 120]} />
          <meshBasicMaterial color="#8B5CF6" transparent opacity={0.45} />
        </mesh>
        {/* Middle glowing ring */}
        <mesh>
          <torusGeometry args={[1.9, 0.004, 16, 120]} />
          <meshBasicMaterial color="#A855F7" transparent opacity={0.35} />
        </mesh>
        {/* Outer wide ring */}
        <mesh>
          <torusGeometry args={[2.5, 0.003, 16, 120]} />
          <meshBasicMaterial color="#6D28D9" transparent opacity={0.25} />
        </mesh>
      </group>

      {/* 6. TILTED ORBITAL NETWORK RINGS WITH GLOWING DATA BEADS */}
      <group ref={orbitalRing1Ref} rotation={[0.65, 0.35, -0.2]}>
        <mesh>
          <torusGeometry args={[2.3, 0.0035, 16, 120]} />
          <meshBasicMaterial color="#C084FC" transparent opacity={0.3} />
        </mesh>
        {/* Orbiting data bead 1 */}
        <mesh ref={bead1Ref}>
          <sphereGeometry args={[0.038, 16, 16]} />
          <meshStandardMaterial
            color="#61DAFB"
            emissive="#61DAFB"
            emissiveIntensity={2.5}
            roughness={0.1}
          />
        </mesh>
        {/* Orbiting data bead 2 */}
        <mesh ref={bead2Ref}>
          <sphereGeometry args={[0.035, 16, 16]} />
          <meshStandardMaterial
            color="#E879F9"
            emissive="#E879F9"
            emissiveIntensity={2.2}
            roughness={0.1}
          />
        </mesh>
      </group>

      <group ref={orbitalRing2Ref} rotation={[-0.45, 0.6, 0.4]}>
        <mesh>
          <torusGeometry args={[2.65, 0.0028, 16, 120]} />
          <meshBasicMaterial color="#7C3AED" transparent opacity={0.2} />
        </mesh>
      </group>
    </group>
  );
};

export default DeveloperCore;
