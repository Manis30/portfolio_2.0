import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const TechOrbit: React.FC = () => {
  const orbit1Ref = useRef<THREE.Mesh>(null);
  const orbit2Ref = useRef<THREE.Mesh>(null);
  const orbit3Ref = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    // Subtle, calm independent rotations on different axes
    if (orbit1Ref.current) {
      orbit1Ref.current.rotation.z += delta * 0.03;
      orbit1Ref.current.rotation.y += delta * 0.015;
    }
    if (orbit2Ref.current) {
      orbit2Ref.current.rotation.x += delta * 0.025;
      orbit2Ref.current.rotation.z -= delta * 0.02;
    }
    if (orbit3Ref.current) {
      orbit3Ref.current.rotation.y -= delta * 0.02;
      orbit3Ref.current.rotation.x += delta * 0.015;
    }
  });

  return (
    <group>
      {/* Orbit 1: Inner Elliptical Architectural Ring */}
      <mesh ref={orbit1Ref} rotation={[0.2, 0.8, 0.1]}>
        <torusGeometry args={[1.5, 0.003, 16, 120]} />
        <meshBasicMaterial color="#8B5CF6" transparent opacity={0.18} />
      </mesh>

      {/* Orbit 2: Mid Inclined Ring with Violet Tone */}
      <mesh ref={orbit2Ref} rotation={[1.0, 0.3, -0.4]}>
        <torusGeometry args={[1.9, 0.003, 16, 120]} />
        <meshBasicMaterial color="#A855F7" transparent opacity={0.15} />
      </mesh>

      {/* Orbit 3: Outer Elliptical Trajectory */}
      <mesh ref={orbit3Ref} rotation={[0.5, 0.2, 0.8]}>
        <torusGeometry args={[2.3, 0.0025, 16, 120]} />
        <meshBasicMaterial color="#7C3AED" transparent opacity={0.12} />
      </mesh>
    </group>
  );
};

export default TechOrbit;
