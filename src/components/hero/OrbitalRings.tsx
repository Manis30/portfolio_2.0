import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const OrbitalRings: React.FC = () => {
  const ring1Ref = useRef<THREE.Group>(null);
  const ring2Ref = useRef<THREE.Group>(null);
  const ring3Ref = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    // Independent slow 3D axial rotations
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z += delta * 0.025;
      ring1Ref.current.rotation.y += delta * 0.012;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.x += delta * 0.02;
      ring2Ref.current.rotation.z -= delta * 0.015;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.y -= delta * 0.018;
      ring3Ref.current.rotation.x += delta * 0.01;
    }
  });

  return (
    <group>
      {/* Orbit 1: Tilted Ellipse X/Y (Radius 1.15) */}
      <group ref={ring1Ref} rotation={[0.4, 0.5, 0.15]}>
        <mesh>
          <torusGeometry args={[1.15, 0.003, 16, 120]} />
          <meshBasicMaterial color="#8B5CF6" transparent opacity={0.18} />
        </mesh>
      </group>

      {/* Orbit 2: Inclined Ellipse Y/Z (Radius 1.55) */}
      <group ref={ring2Ref} rotation={[-0.5, 0.3, -0.3]}>
        <mesh>
          <torusGeometry args={[1.55, 0.003, 16, 120]} />
          <meshBasicMaterial color="#A855F7" transparent opacity={0.14} />
        </mesh>
      </group>

      {/* Orbit 3: Outer Deep Ellipse (Radius 1.95) */}
      <group ref={ring3Ref} rotation={[0.6, -0.25, 0.4]}>
        <mesh>
          <torusGeometry args={[1.95, 0.0025, 16, 120]} />
          <meshBasicMaterial color="#7C3AED" transparent opacity={0.12} />
        </mesh>
      </group>
    </group>
  );
};

export default OrbitalRings;
