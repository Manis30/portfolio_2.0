import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { DeveloperCore } from './DeveloperCore';
import { OrbitalCurves } from './OrbitalCurves';
import { FloatingTech } from './FloatingTech';

// 20 Sparse Ambient Micro-Particles
function AmbientDust() {
  const count = 22;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 5.4;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 4.6;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 3.2;
    }
    return pos;
  }, []);

  const ref = useRef<THREE.Points>(null);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.006;
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
        opacity={0.18}
        sizeAttenuation
      />
    </points>
  );
}

// Interactive Parallax Scene Root
interface SceneContentProps {
  isReducedMotion: boolean;
  isMobile: boolean;
}

function SceneContent({ isReducedMotion, isMobile }: SceneContentProps) {
  const sceneRef = useRef<THREE.Group>(null);

  useFrame(({ pointer }) => {
    if (sceneRef.current && !isReducedMotion) {
      // Subtle, calm parallax deflection
      const targetRotX = -pointer.y * 0.038;
      const targetRotY = pointer.x * 0.052;
      sceneRef.current.rotation.x = THREE.MathUtils.lerp(
        sceneRef.current.rotation.x,
        targetRotX,
        0.035
      );
      sceneRef.current.rotation.y = THREE.MathUtils.lerp(
        sceneRef.current.rotation.y,
        targetRotY,
        0.035
      );
    }
  });

  return (
    <group ref={sceneRef} scale={isMobile ? 0.85 : 1.0}>
      {/* Cinematic Studio Lighting: Depth and Facet Clarity */}
      <ambientLight intensity={0.65} />
      <directionalLight position={[5, 6, 4]} intensity={1.25} color="#FFFFFF" />
      <pointLight position={[-4, -2, -2]} intensity={0.85} color="#8B5CF6" />
      <pointLight position={[3, -4, 2]} intensity={0.45} color="#38BDF8" />

      {/* Central 3D Developer Core (55-65% visual area) */}
      <DeveloperCore />

      {/* 2-3 Subtle Thin 3D Orbital Curves */}
      <OrbitalCurves />

      {/* Exactly 4 Floating Technology Indicators */}
      <FloatingTech />

      {/* Ambient micro particles */}
      <AmbientDust />
    </group>
  );
}

export const HeroScene: React.FC = () => {
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mobileQuery = window.matchMedia('(max-width: 768px)');

    setIsReducedMotion(motionQuery.matches);
    setIsMobile(mobileQuery.matches);

    const handleMotion = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    const handleMobile = (e: MediaQueryListEvent) => setIsMobile(e.matches);

    motionQuery.addEventListener('change', handleMotion);
    mobileQuery.addEventListener('change', handleMobile);

    return () => {
      motionQuery.removeEventListener('change', handleMotion);
      mobileQuery.removeEventListener('change', handleMobile);
    };
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-[360px] sm:h-[440px] lg:h-[560px] xl:h-[600px] flex items-center justify-center">
        <div className="w-16 h-16 rounded-full border border-[#8B5CF6]/30 animate-pulse bg-[#0D0F14]/40" />
      </div>
    );
  }

  return (
    <div className="relative w-full h-[360px] sm:h-[440px] lg:h-[560px] xl:h-[600px] flex items-center justify-center overflow-visible select-none">
      <Canvas
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        camera={{ position: [0, 0, 7.5], fov: 38 }}
        style={{ pointerEvents: 'auto', width: '100%', height: '100%' }}
      >
        <SceneContent isReducedMotion={isReducedMotion} isMobile={isMobile} />
      </Canvas>
    </div>
  );
};

export default HeroScene;
