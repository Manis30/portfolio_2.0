import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolio';
import { AvailabilityBadge } from './AvailabilityBadge';

export const HeroContent: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col justify-center max-w-[620px] z-10"
    >
      {/* 1. Availability Badge */}
      <div className="mb-6 sm:mb-7">
        <AvailabilityBadge />
      </div>

      {/* 2. Dominant Editorial Headline */}
      <h1 className="font-display font-black uppercase tracking-[-0.065em] leading-[0.88] mb-6 text-[clamp(72px,7vw,112px)] select-none">
        <div className="text-[#F5F5F5]">I BUILD</div>
        <div className="text-[#F5F5F5]">DIGITAL</div>
        <div className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] to-[#C084FC]">
          PRODUCTS.
        </div>
      </h1>

      {/* 3. Supporting Description */}
      <p className="text-[17px] sm:text-[18px] text-[#9297A3] max-w-[560px] leading-[1.65] mb-8 font-normal font-sans">
        Full Stack MERN Developer focused on building modern web applications, scalable backend systems, and clean user experiences.
      </p>

      {/* 4. CTA Buttons with 52px height, 11px radius, animated arrow on hover */}
      <div className="flex flex-wrap items-center gap-4 mb-8">
        <a
          href="#work"
          className="group inline-flex items-center justify-center gap-2.5 h-[52px] px-6 sm:px-7 rounded-[11px] bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] text-white text-[14px] font-semibold tracking-wide shadow-[0_4px_20px_rgba(139,92,246,0.28)] hover:shadow-[0_6px_28px_rgba(139,92,246,0.45)] hover:-translate-y-[2px] transition-all duration-250 cursor-pointer select-none"
        >
          <span>VIEW MY WORK</span>
          <ArrowRight className="w-4 h-4 transition-transform duration-250 group-hover:translate-x-1" />
        </a>

        <a
          href={PERSONAL_INFO.resumePath}
          target="_blank"
          rel="noopener noreferrer"
          download="Mani-S-Resume.pdf"
          className="group inline-flex items-center justify-center gap-2.5 h-[52px] px-6 sm:px-7 rounded-[11px] bg-transparent border border-white/15 hover:border-white/35 hover:bg-white/[0.04] hover:-translate-y-[2px] text-white text-[14px] font-medium tracking-wide transition-all duration-250 cursor-pointer select-none"
        >
          <span>DOWNLOAD RESUME</span>
          <ArrowUpRight className="w-4 h-4 text-white/80 transition-transform duration-250 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>

      {/* 5. Subtle Metadata Row with subtle top border */}
      <div className="flex items-center gap-3 text-[12px] sm:text-[13px] font-mono-tech text-[#9297A3] pt-5 border-t border-white/[0.08]">
        <span>Based in India</span>
        <span className="text-white/20">•</span>
        <span>Open to Software Engineering Opportunities</span>
      </div>
    </motion.div>
  );
};

export default HeroContent;
