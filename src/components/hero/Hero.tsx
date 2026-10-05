import React, { Suspense, lazy } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolio';
import { AvailabilityBadge } from './AvailabilityBadge';

// Lazy-load HeroScene for optimal Core Web Vitals / LCP
const HeroScene = lazy(() => import('./HeroScene'));

export const Hero: React.FC = () => {
  return (
    <section className="relative w-full min-h-[calc(100vh-68px)] flex items-center justify-center py-8 lg:py-6 overflow-hidden bg-[#050508]">
      {/* Subtle technical background grid (0.025 opacity) */}
      <div className="absolute inset-0 technical-grid opacity-[0.025] pointer-events-none" />

      {/* Connected Ambient Depth Radial Glow behind the 3D Developer Core */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 72% 50%, rgba(139, 92, 246, 0.12) 0%, transparent 45%)',
        }}
      />

      {/* Centered max-width container: 1440px, w-[calc(100%-64px)] */}
      <div className="relative z-10 w-[calc(100%-64px)] max-w-[1440px] mx-auto px-4 sm:px-8 lg:pl-16 lg:pr-8 xl:pl-20 xl:pr-12 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] items-center gap-8 lg:gap-4 xl:gap-8">
          {/* LEFT 55%: Editorial Content Hierarchy */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-center max-w-[620px]"
          >
            {/* Availability Badge */}
            <div className="mb-6 sm:mb-7">
              <AvailabilityBadge />
            </div>

            {/* Dominant Headline */}
            <h1 className="font-display font-black uppercase tracking-[-0.06em] leading-[0.91] mb-6 text-[clamp(64px,7vw,112px)] select-none">
              <div className="text-white">I BUILD</div>
              <div className="text-white">DIGITAL</div>
              <div className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] to-[#C084FC]">
                PRODUCTS.
              </div>
            </h1>

            {/* Supporting Description */}
            <p className="text-[17px] sm:text-[18px] text-[#9CA3AF] max-w-[560px] leading-[1.7] mb-8 font-normal font-sans">
              Full Stack MERN Developer focused on building modern web applications, scalable backend systems, and clean user experiences.
            </p>

            {/* Action Buttons: Identical Height (48px), High-end Transitions */}
            <div className="flex flex-wrap items-center gap-4 mb-7">
              <a
                href="#work"
                className="inline-flex items-center justify-center gap-2 h-[48px] px-6 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] text-white text-[13.5px] sm:text-[14px] font-semibold tracking-wide shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_28px_rgba(139,92,246,0.5)] hover:-translate-y-[2px] transition-all duration-250 cursor-pointer select-none"
              >
                <span>VIEW MY WORK</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href={PERSONAL_INFO.resumePath}
                target="_blank"
                rel="noopener noreferrer"
                download="Mani-S-Resume.pdf"
                className="inline-flex items-center justify-center gap-2 h-[48px] px-6 rounded-xl bg-transparent border border-white/20 hover:border-white/40 hover:bg-white/[0.04] hover:-translate-y-[2px] text-white text-[13.5px] sm:text-[14px] font-medium tracking-wide transition-all duration-250 cursor-pointer select-none"
              >
                <span>DOWNLOAD RESUME</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>

            {/* Subtle Metadata Row */}
            <div className="flex items-center gap-2.5 text-[12px] sm:text-[13px] font-mono-tech text-[#9CA3AF]">
              <span>Based in India</span>
              <span className="text-white/20">•</span>
              <span>Open to Software Engineering Opportunities</span>
            </div>
          </motion.div>

          {/* RIGHT 45%: Dedicated 3D Developer Core Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="w-full relative flex items-center justify-center"
          >
            <Suspense
              fallback={
                <div className="w-full h-[360px] sm:h-[440px] lg:h-[560px] xl:h-[600px] flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full border border-[#8B5CF6]/30 animate-pulse bg-[#0D0F14]/40" />
                </div>
              }
            >
              <HeroScene />
            </Suspense>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
