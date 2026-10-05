import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ArrowUpRight, MapPin, Sparkles, ArrowDown } from 'lucide-react';
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
      {/* Availability Badge & Identity Tag */}
      <div className="flex flex-wrap items-center gap-3 mb-6 sm:mb-7">
        <AvailabilityBadge />
        <div className="inline-flex items-center gap-2 h-[34px] px-3.5 rounded-full bg-[#0E0C18] border border-white/10 text-[11px] font-mono-tech tracking-wider text-[#A1A1AA]">
          <span className="font-semibold text-white">MANI S</span>
          <span className="text-[#8B5CF6]">•</span>
          <span className="text-[#C084FC]">Full Stack MERN Developer</span>
        </div>
      </div>

      {/* Editorial Headline: Three Deliberate Lines */}
      <h1 className="font-display font-black uppercase tracking-[-0.065em] leading-[0.88] mb-6 text-[clamp(64px,6vw,104px)]">
        <span className="sr-only">MANI S — Full Stack MERN Developer | Software Developer. </span>
        <div className="text-white">I BUILD</div>
        <div className="text-white">DIGITAL</div>
        <div className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] via-[#A855F7] to-[#C084FC]">
          PRODUCTS.
        </div>
      </h1>

      {/* Description: Muted Technical Typography */}
      <p className="text-[17px] sm:text-[18px] text-[#9CA3AF] max-w-[540px] leading-[1.65] mb-8 font-normal font-sans">
        Full Stack MERN Developer focused on building modern web applications, scalable backend systems, and clean user experiences.
      </p>

      {/* CTA Buttons: Matching Reference Style */}
      <div className="flex flex-wrap items-center gap-4 mb-8">
        <a
          href="#work"
          className="group inline-flex items-center justify-center gap-2.5 h-[52px] px-7 rounded-[14px] bg-gradient-to-r from-[#7C3AED] via-[#8B5CF6] to-[#6366F1] text-white text-[14px] font-semibold tracking-wide shadow-[0_0_25px_rgba(124,58,237,0.45)] hover:shadow-[0_0_35px_rgba(139,92,246,0.6)] hover:-translate-y-[2px] transition-all duration-250 cursor-pointer select-none"
        >
          <span>VIEW MY WORK</span>
          <ArrowRight className="w-4 h-4 transition-transform duration-250 group-hover:translate-x-1" />
        </a>

        <a
          href={PERSONAL_INFO.resumePath}
          target="_blank"
          rel="noopener noreferrer"
          download="Mani-S-Resume.pdf"
          className="group inline-flex items-center justify-center gap-2.5 h-[52px] px-7 rounded-[14px] bg-[#0A0A14]/80 border border-white/15 hover:border-white/35 hover:bg-[#12121E] hover:-translate-y-[2px] text-white text-[14px] font-medium tracking-wide transition-all duration-250 cursor-pointer select-none"
        >
          <span>DOWNLOAD RESUME</span>
          <ArrowUpRight className="w-4 h-4 text-white/80 transition-transform duration-250 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>

      {/* Bottom Metadata: Location & Status */}
      <div className="flex items-center gap-3 text-[12px] sm:text-[13px] font-mono-tech text-[#9CA3AF] mb-10">
        <div className="flex items-center gap-1.5 text-[#D4D4D8]">
          <MapPin className="w-3.5 h-3.5 text-[#8B5CF6]" />
          <span>Based in India</span>
        </div>
        <span className="text-white/20">•</span>
        <div className="flex items-center gap-1.5 text-zinc-300">
          <Sparkles className="w-3.5 h-3.5 text-[#A855F7]" />
          <span>Open to Software Engineering Opportunities</span>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <a
        href="#about"
        className="flex items-center gap-2.5 text-[10.5px] font-mono-tech tracking-[0.25em] text-[#6B7280] hover:text-[#A855F7] transition-colors duration-200 uppercase w-fit"
      >
        <span className="text-zinc-600">|</span>
        <ArrowDown className="w-3.5 h-3.5 text-[#8B5CF6] animate-bounce" />
        <span>SCROLL DOWN</span>
      </a>
    </motion.div>
  );
};

export default HeroContent;
