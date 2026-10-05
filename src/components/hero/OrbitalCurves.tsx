import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const OrbitalCurves: React.FC = () => {
  const curve1Ref = useRef<THREE.Group>(null);
  const curve2Ref = useRef<THREE.Group>(null);
  const curve3Ref = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    // Independent, slow 3D axial rotations (approx 30–50s period)
    if (curve1Ref.current) {
      curve1Ref.current.rotation.z += delta * 0.02;
      curve1Ref.current.rotation.y += delta * 0.01;
    }
    if (curve2Ref.current) {
      curve2Ref.current.rotation.x += delta * 0.016;
      curve2Ref.current.rotation.z -= delta * 0.012;
    }
    if (curve3Ref.current) {
      curve3Ref.current.rotation.y -= delta * 0.014;
      curve3Ref.current.rotation.x += delta * 0.008;
    }
  });

  return (
    <group>
      {/* Orbital Curve 1: Tilted Ellipse X/Y (Radius 1.80) */}
      <group ref={curve1Ref} rotation={[0.45, 0.6, 0.2]}>
        <mesh>
          <torusGeometry args={[1.80, 0.003, 16, 120]} />
          <meshBasicMaterial color="#8B5CF6" transparent opacity={0.16} />
        </mesh>
      </group>

      {/* Orbital Curve 2: Inclined Ellipse Y/Z (Radius 2.25) */}
      <group ref={curve2Ref} rotation={[-0.5, 0.35, -0.45]}>
        <mesh>
          <torusGeometry args={[2.25, 0.0028, 16, 120]} />
          <meshBasicMaterial color="#A855F7" transparent opacity={0.13} />
        </mesh>
      </group>

      {/* Orbital Curve 3: Outer Deep Ellipse (Radius 2.65) */}
      <group ref={curve3Ref} rotation={[0.65, -0.3, 0.5]}>
        <mesh>
          <torusGeometry args={[2.65, 0.0025, 16, 120]} />
          <meshBasicMaterial color="#7C3AED" transparent opacity={0.10} />
        </mesh>
      </group>
    </group>
  );
};

export default OrbitalCurves;
