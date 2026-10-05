import React, { Suspense, lazy } from 'react';
import { HeroContent } from './HeroContent';

// Lazy-load the new 3D Developer Core Scene for optimal performance
const HeroScene = lazy(() => import('./HeroScene'));

export const Hero: React.FC = () => {
  return (
    <section className="relative w-full min-h-[calc(100vh-74px)] flex items-center justify-center py-6 sm:py-8 lg:py-4 overflow-hidden bg-[#050505]">
      {/* Barely visible technical grid (0.025 opacity) */}
      <div className="absolute inset-0 technical-grid opacity-[0.025] pointer-events-none" />

      {/* Subtle radial purple glow behind the 3D core */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 70% 50%, rgba(124, 58, 237, 0.14) 0%, transparent 45%)',
        }}
      />

      {/* Centered max-width container: max-w-[1400px], padding-left/right: 48px on desktop (lg:px-12) */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-12 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] items-center gap-8 lg:gap-6">
          {/* LEFT SIDE (≈48%): Editorial Headline, Description, Buttons, Metadata */}
          <div className="flex flex-col justify-center">
            <HeroContent />
          </div>

          {/* RIGHT SIDE (≈52%): Strict 3D Bounding Area with Zero Clipping */}
          <div className="w-full relative overflow-hidden flex items-center justify-center">
            <Suspense
              fallback={
                <div className="w-full h-[380px] sm:h-[460px] lg:h-[600px] xl:h-[620px] flex items-center justify-center">
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
