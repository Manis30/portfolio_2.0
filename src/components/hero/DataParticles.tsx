import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// 3D Data Pathways representing: Frontend (React) -> API -> Backend (Node.js) -> Database (MongoDB)
export const DataParticles: React.FC = () => {
  // Define 3D CatmullRom splines for the full-stack architecture data pipelines
  const { pathways, particles } = useMemo(() => {
    // 1. Client Request Route: React -> API Gateway -> Core
    const route1 = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-1.85, 0.45, 0.4),
      new THREE.Vector3(-1.1, 0.35, 0.25),
      new THREE.Vector3(-0.45, 0.15, 0.1),
      new THREE.Vector3(0, 0, 0),
    ]);

    // 2. Type Contract Route: TypeScript -> Core
    const route2 = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 1.80, -0.25),
      new THREE.Vector3(0.15, 1.0, -0.1),
      new THREE.Vector3(0, 0.4, 0),
      new THREE.Vector3(0, 0, 0),
    ]);

    // 3. Backend Processing Route: Core -> Node.js
    const route3 = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0.55, 0.2, 0.15),
      new THREE.Vector3(1.2, 0.35, 0.25),
      new THREE.Vector3(1.85, 0.45, 0.4),
    ]);

    // 4. Persistence Query Route: Node.js / Core -> MongoDB Database Tier
    const route4 = new THREE.CatmullRomCurve3([
      new THREE.Vector3(1.85, 0.45, 0.4),
      new THREE.Vector3(1.0, -0.4, 0.15),
      new THREE.Vector3(0.4, -1.1, 0.0),
      new THREE.Vector3(0, -1.80, -0.25),
      new THREE.Vector3(-0.5, -1.0, 0.1),
      new THREE.Vector3(-1.85, 0.45, 0.4),
    ]);

    const routes = [route1, route2, route3, route4];

    // Exactly 12 elegant data packets with staggered offsets & speeds
    const packetList = [
      { routeIdx: 0, speed: 0.18, offset: 0.05, color: '#FFFFFF' },
      { routeIdx: 0, speed: 0.18, offset: 0.55, color: '#C084FC' },
      { routeIdx: 1, speed: 0.15, offset: 0.20, color: '#38BDF8' },
      { routeIdx: 1, speed: 0.15, offset: 0.70, color: '#FFFFFF' },
      { routeIdx: 2, speed: 0.20, offset: 0.15, color: '#4ADE80' },
      { routeIdx: 2, speed: 0.20, offset: 0.65, color: '#FFFFFF' },
      { routeIdx: 3, speed: 0.12, offset: 0.10, color: '#22C55E' },
      { routeIdx: 3, speed: 0.12, offset: 0.35, color: '#C084FC' },
      { routeIdx: 3, speed: 0.12, offset: 0.60, color: '#FFFFFF' },
      { routeIdx: 3, speed: 0.12, offset: 0.85, color: '#8B5CF6' },
      { routeIdx: 2, speed: 0.22, offset: 0.40, color: '#C084FC' },
      { routeIdx: 0, speed: 0.16, offset: 0.80, color: '#8B5CF6' },
    ];

    return { pathways: routes, particles: packetList };
  }, []);

  // Pre-generate path line objects
  const lineObjects = useMemo(() => {
    const mat = new THREE.LineBasicMaterial({
      color: 0x8B5CF6,
      transparent: true,
      opacity: 0.14,
    });
    return pathways.map((path) => {
      const points = path.getPoints(40);
      const geo = new THREE.BufferGeometry().setFromPoints(points);
      return new THREE.Line(geo, mat);
    });
  }, [pathways]);

  // Mesh references for each data particle
  const particleRefs = useRef<(THREE.Mesh | null)[]>([]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    particles.forEach((packet, i) => {
      const mesh = particleRefs.current[i];
      if (mesh) {
        const path = pathways[packet.routeIdx];
        // Calculate progress along the curve (loops 0 to 1)
        const progress = (t * packet.speed + packet.offset) % 1;
        const pos = path.getPointAt(progress);
        mesh.position.copy(pos);
      }
    });
  });

  return (
    <group>
      {/* Subtle architectural data route lines */}
      {lineObjects.map((lineObj, idx) => (
        <primitive key={`route-line-${idx}`} object={lineObj} />
      ))}

      {/* 12 Animated Data Packets traveling through the system */}
      {particles.map((packet, idx) => (
        <mesh
          key={`packet-${idx}`}
          ref={(el) => {
            particleRefs.current[idx] = el;
          }}
        >
          <sphereGeometry args={[0.026, 12, 12]} />
          <meshStandardMaterial
            color={packet.color}
            emissive={packet.color}
            emissiveIntensity={1.4}
            roughness={0.1}
            metalness={0.8}
          />
        </mesh>
      ))}
    </group>
  );
};

export default DataParticles;
