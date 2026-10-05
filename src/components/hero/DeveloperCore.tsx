import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface DeveloperCoreProps {
  isHovered?: boolean;
}

export const DeveloperCore: React.FC<DeveloperCoreProps> = ({ isHovered = false }) => {
  const crystalRef = useRef<THREE.Mesh>(null);
  const innerSphereRef = useRef<THREE.Mesh>(null);
  const wireframeRef = useRef<THREE.LineSegments>(null);

  // Precision clean octahedron crystal
  const crystalGeo = useMemo(() => new THREE.OctahedronGeometry(1.12, 0), []);
  const edgesGeo = useMemo(() => new THREE.EdgesGeometry(crystalGeo), [crystalGeo]);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;

    // Extremely calm, slow rotation (0.06 - 0.08 rad/s)
    if (crystalRef.current) {
      crystalRef.current.rotation.y += delta * 0.07;
      crystalRef.current.rotation.z = Math.sin(t * 0.3) * 0.03;
      const breathe = 1 + Math.sin(t * 1.2) * (isHovered ? 0.025 : 0.012);
      crystalRef.current.scale.set(breathe, breathe, breathe);
    }

    // Inner glowing core with gentle counter-rotation
    if (innerSphereRef.current) {
      innerSphereRef.current.rotation.y -= delta * 0.10;
      const pulse = 1 + Math.sin(t * 2.0) * 0.025;
      innerSphereRef.current.scale.set(pulse, pulse, pulse);
    }

    // Technical wireframe shell matching crystal rotation with subtle offset
    if (wireframeRef.current) {
      wireframeRef.current.rotation.y += delta * 0.07;
      wireframeRef.current.rotation.z = Math.sin(t * 0.3) * 0.03;
      const breathe = 1 + Math.sin(t * 1.2) * (isHovered ? 0.025 : 0.012);
      wireframeRef.current.scale.set(breathe * 1.004, breathe * 1.004, breathe * 1.004);
    }
  });

  return (
    <group>
      {/* Soft internal lights creating glass reflections from within */}
      <pointLight position={[0, 0, 0]} intensity={2.2} color="#8B5CF6" distance={4.5} />
      <pointLight position={[0, 0.25, 0.2]} intensity={1.0} color="#FFFFFF" distance={2.5} />

      {/* LAYER 1: Inner Glowing Violet Core Sphere */}
      <mesh ref={innerSphereRef}>
        <sphereGeometry args={[0.36, 32, 32]} />
        <meshStandardMaterial
          color="#8B5CF6"
          emissive="#A855F7"
          emissiveIntensity={1.8}
          roughness={0.15}
          metalness={0.3}
        />
      </mesh>

      {/* LAYER 2: Transparent Dark Glass Octahedron Crystal Shell */}
      <mesh ref={crystalRef} geometry={crystalGeo}>
        <meshPhysicalMaterial
          color="#0A0614"
          emissive="#6D28D9"
          emissiveIntensity={isHovered ? 0.55 : 0.28}
          roughness={0.12}
          metalness={0.15}
          transmission={0.72}
          thickness={1.4}
          ior={1.52}
          transparent={true}
          opacity={0.88}
          clearcoat={1}
          clearcoatRoughness={0.08}
          flatShading={true}
        />
      </mesh>

      {/* LAYER 3: Thin Clean Technical Wireframe */}
      <lineSegments ref={wireframeRef} geometry={edgesGeo}>
        <lineBasicMaterial color="#C084FC" transparent opacity={0.35} />
      </lineSegments>
    </group>
  );
};

export default DeveloperCore;
