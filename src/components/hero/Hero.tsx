import React, { Suspense, lazy } from 'react';
import { HeroContent } from './HeroContent';

// Lazy-load the advanced 3D Architectural Scene for optimal LCP / performance
const HeroScene = lazy(() => import('./HeroScene'));

export const Hero: React.FC = () => {
  return (
    <section className="relative w-full min-h-[calc(100vh-80px)] flex items-center justify-center py-6 sm:py-8 lg:py-4 overflow-hidden bg-[#050505]">
      {/* Barely visible technical grid (0.025 opacity) */}
      <div className="absolute inset-0 technical-grid opacity-[0.025] pointer-events-none" />

      {/* Subtle depth radial violet glow centered behind the 3D architectural core */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 72% 48%, rgba(124, 58, 237, 0.14) 0%, transparent 42%)',
        }}
      />

      {/* 12-Column Balanced Container: max-w-[1440px], px-6 sm:px-10 lg:px-16 (64px) */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[54%_46%] items-center gap-6 lg:gap-0">
          {/* LEFT COLUMN (approx 54%): Editorial Headline, Description, CTAs, Metadata */}
          <div className="flex flex-col justify-center">
            <HeroContent />
          </div>

          {/* RIGHT COLUMN (approx 46%): 3D Software Architecture System */}
          {/* Begins at the center and extends to the right edge with zero clipping */}
          <div className="w-full relative flex items-center justify-center -ml-0 lg:-ml-4 xl:-ml-8">
            <Suspense
              fallback={
                <div className="w-full h-[360px] sm:h-[440px] lg:h-[600px] xl:h-[640px] flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full border border-[#8B5CF6]/30 animate-pulse bg-[#0D0F14]/40" />
                </div>
              }
            >
              <HeroScene />
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
