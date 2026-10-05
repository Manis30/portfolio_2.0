import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const ParticleField: React.FC = () => {
  const count = 28; // Exactly between 20-35 particles maximum

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 6.5;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 5.2;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 3.5;
    }
    return pos;
  }, [count]);

  const ref = useRef<THREE.Points>(null);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.004;
      ref.current.rotation.x += delta * 0.002;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.018}
        color="#C084FC"
        transparent
        opacity={0.20}
        sizeAttenuation
      />
    </points>
  );
};

export default ParticleField;
