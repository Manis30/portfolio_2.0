import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const OrbitalPaths: React.FC = () => {
  const path1Ref = useRef<THREE.Group>(null);
  const path2Ref = useRef<THREE.Group>(null);
  const path3Ref = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    // Independent, slow 3D axial rotations
    if (path1Ref.current) {
      path1Ref.current.rotation.z += delta * 0.018;
      path1Ref.current.rotation.y += delta * 0.010;
    }
    if (path2Ref.current) {
      path2Ref.current.rotation.x += delta * 0.015;
      path2Ref.current.rotation.z -= delta * 0.012;
    }
    if (path3Ref.current) {
      path3Ref.current.rotation.y -= delta * 0.014;
      path3Ref.current.rotation.x += delta * 0.008;
    }
  });

  return (
    <group>
      {/* Pathway 1: Tilted Elliptical Network Path (Radius 1.85) */}
      <group ref={path1Ref} rotation={[0.45, 0.65, 0.2]}>
        <mesh>
          <torusGeometry args={[1.85, 0.0028, 16, 120]} />
          <meshBasicMaterial color="#8B5CF6" transparent opacity={0.16} />
        </mesh>
      </group>

      {/* Pathway 2: Inclined Elliptical Network Path (Radius 2.25) */}
      <group ref={path2Ref} rotation={[-0.5, 0.35, -0.45]}>
        <mesh>
          <torusGeometry args={[2.25, 0.0026, 16, 120]} />
          <meshBasicMaterial color="#A855F7" transparent opacity={0.13} />
        </mesh>
      </group>

      {/* Pathway 3: Outer Deep Network Path (Radius 2.65) */}
      <group ref={path3Ref} rotation={[0.65, -0.3, 0.5]}>
        <mesh>
          <torusGeometry args={[2.65, 0.0024, 16, 120]} />
          <meshBasicMaterial color="#7C3AED" transparent opacity={0.10} />
        </mesh>
      </group>
    </group>
  );
};

export default OrbitalPaths;
