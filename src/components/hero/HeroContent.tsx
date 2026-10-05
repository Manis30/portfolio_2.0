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
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col justify-center max-w-[580px] z-10"
    >
      {/* Small Availability Badge */}
      <div className="mb-6 sm:mb-7">
        <AvailabilityBadge />
      </div>

      {/* Editorial Headline: Three Deliberate Lines */}
      <h1 className="font-display font-black uppercase tracking-[-0.065em] leading-[0.88] mb-6 text-[clamp(64px,6vw,104px)] select-none">
        <div className="text-[#F5F5F5]">I BUILD</div>
        <div className="text-[#F5F5F5]">DIGITAL</div>
        <div className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] to-[#C084FC]">
          PRODUCTS.
        </div>
      </h1>

      {/* Description: Max-width 560px, Muted Gray */}
      <p className="text-[17px] sm:text-[18px] text-[#9CA3AF] max-w-[560px] leading-[1.65] mb-8 font-normal font-sans">
        Full Stack MERN Developer focused on building modern web applications, scalable backend systems, and clean user experiences.
      </p>

      {/* Buttons: 52px height, 12px border radius */}
      <div className="flex flex-wrap items-center gap-4 mb-8">
        <a
          href="#work"
          className="group inline-flex items-center justify-center gap-2.5 h-[52px] px-6 sm:px-7 rounded-[12px] bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] text-white text-[14px] font-semibold tracking-wide shadow-[0_4px_20px_rgba(139,92,246,0.3)] hover:shadow-[0_6px_28px_rgba(139,92,246,0.5)] hover:-translate-y-[2px] transition-all duration-250 cursor-pointer select-none"
        >
          <span>VIEW MY WORK</span>
          <ArrowRight className="w-4 h-4 transition-transform duration-250 group-hover:translate-x-1" />
        </a>

        <a
          href={PERSONAL_INFO.resumePath}
          target="_blank"
          rel="noopener noreferrer"
          download="Mani-S-Resume.pdf"
          className="group inline-flex items-center justify-center gap-2.5 h-[52px] px-6 sm:px-7 rounded-[12px] bg-[#0A0A14]/80 border border-white/15 hover:border-white/35 hover:bg-[#12121E] hover:-translate-y-[2px] text-white text-[14px] font-medium tracking-wide transition-all duration-250 cursor-pointer select-none"
        >
          <span>DOWNLOAD RESUME</span>
          <ArrowUpRight className="w-4 h-4 text-white/80 transition-transform duration-250 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>

      {/* Bottom Metadata: Aligned with the content column */}
      <div className="flex items-center gap-3 text-[12px] sm:text-[13px] font-mono-tech text-[#9CA3AF] pt-5 border-t border-white/[0.08]">
        <span>Based in India</span>
        <span className="text-white/25">•</span>
        <span>Open to Software Engineering Opportunities</span>
      </div>
    </motion.div>
  );
};

export default HeroContent;
