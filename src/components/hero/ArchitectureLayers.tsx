import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ArchitectureLayersProps {
  hoveredTier?: string | null;
}

export const ArchitectureLayers: React.FC<ArchitectureLayersProps> = ({ hoveredTier }) => {
  const frontendRef = useRef<THREE.Group>(null);
  const apiRef = useRef<THREE.Group>(null);
  const backendRef = useRef<THREE.Group>(null);
  const dbRef = useRef<THREE.Group>(null);

  // Pre-generate EdgesGeometry for each architectural structural layer
  const frontendGeo = useMemo(() => new THREE.EdgesGeometry(new THREE.BoxGeometry(2.6, 1.9, 1.5)), []);
  const apiGeo = useMemo(() => new THREE.EdgesGeometry(new THREE.CylinderGeometry(1.65, 1.65, 0.45, 8)), []);
  const backendGeo = useMemo(() => new THREE.EdgesGeometry(new THREE.BoxGeometry(2.1, 2.1, 2.1)), []);
  const dbGeo = useMemo(() => new THREE.EdgesGeometry(new THREE.CylinderGeometry(2.35, 2.35, 0.28, 6)), []);

  useFrame((_, delta) => {
    // Slow, independent architectural rotations (40–80s periods)
    if (frontendRef.current) {
      frontendRef.current.rotation.y += delta * 0.032;
      frontendRef.current.rotation.z += delta * 0.014;
    }
    if (apiRef.current) {
      apiRef.current.rotation.y -= delta * 0.038;
      apiRef.current.rotation.x += delta * 0.018;
    }
    if (backendRef.current) {
      backendRef.current.rotation.y += delta * 0.024;
      backendRef.current.rotation.x -= delta * 0.016;
    }
    if (dbRef.current) {
      dbRef.current.rotation.y -= delta * 0.020;
    }
  });

  return (
    <group>
      {/* 1. FRONTEND TIER: Dimensional structural rectangular prism */}
      <group ref={frontendRef} rotation={[0.2, 0.35, -0.15]}>
        <lineSegments geometry={frontendGeo}>
          <lineBasicMaterial
            color={hoveredTier === 'react' || hoveredTier === 'ts' ? '#C084FC' : '#8B5CF6'}
            transparent
            opacity={hoveredTier === 'react' || hoveredTier === 'ts' ? 0.65 : 0.28}
          />
        </lineSegments>
      </group>

      {/* 2. API GATEWAY TIER: Angled octagonal prism routing frame */}
      <group ref={apiRef} rotation={[0.75, 0.2, 0.45]}>
        <lineSegments geometry={apiGeo}>
          <lineBasicMaterial
            color="#A855F7"
            transparent
            opacity={hoveredTier ? 0.5 : 0.24}
          />
        </lineSegments>
      </group>

      {/* 3. BACKEND TIER: Intersecting isometric cubic structural frame */}
      <group ref={backendRef} rotation={[-0.35, -0.5, 0.25]}>
        <lineSegments geometry={backendGeo}>
          <lineBasicMaterial
            color={hoveredTier === 'node' ? '#68A063' : '#7C3AED'}
            transparent
            opacity={hoveredTier === 'node' ? 0.65 : 0.22}
          />
        </lineSegments>
      </group>

      {/* 4. DATABASE TIER: Tiered hexagonal foundation lattice */}
      <group ref={dbRef} position={[0, -1.2, 0]} rotation={[0.1, 0, 0]}>
        <lineSegments geometry={dbGeo}>
          <lineBasicMaterial
            color={hoveredTier === 'mongo' ? '#22C55E' : '#6D28D9'}
            transparent
            opacity={hoveredTier === 'mongo' ? 0.65 : 0.26}
          />
        </lineSegments>
      </group>
    </group>
  );
};

export default ArchitectureLayers;
