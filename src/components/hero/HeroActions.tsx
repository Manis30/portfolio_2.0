import React from 'react';
import { ArrowDown, FileDown, MapPin, Sparkles } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolio';

export const HeroActions: React.FC = () => {
  return (
    <div className="flex flex-col">
      {/* Primary & Secondary Action CTAs */}
      <div className="flex flex-wrap items-center gap-3.5 mb-6 sm:mb-7">
        <a
          href="#work"
          className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 rounded-xl bg-gradient-to-r from-[#8B5CF6] via-[#7C3AED] to-[#6D28D9] text-white text-xs sm:text-sm font-semibold tracking-wide shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] hover:-translate-y-0.5 hover:brightness-110 active:scale-[0.98] transition-all duration-200 cursor-pointer"
        >
          <span>VIEW MY WORK</span>
          <ArrowDown className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </a>
        <a
          href={PERSONAL_INFO.resumePath}
          target="_blank"
          rel="noopener noreferrer"
          download="Mani-S-Resume.pdf"
          className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 rounded-xl bg-[#0A0A10]/90 border border-white/15 hover:border-white/35 hover:bg-[#111118] hover:-translate-y-0.5 text-[#F5F5F5] hover:text-white text-xs sm:text-sm font-medium tracking-wide active:scale-[0.98] transition-all duration-200 cursor-pointer shadow-sm"
        >
          <span>DOWNLOAD RESUME</span>
          <FileDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#8B5CF6]" />
        </a>
      </div>

      {/* Location & Availability Note */}
      <div className="flex items-center gap-2.5 text-xs font-mono-tech text-[#8B8F98] pt-3.5 border-t border-white/[0.07]">
        <div className="flex items-center gap-1.5 text-[#A1A1AA]">
          <MapPin className="w-3.5 h-3.5 text-[#8B5CF6]" />
          <span>{PERSONAL_INFO.location}</span>
        </div>
        <span className="text-white/20">•</span>
        <div className="flex items-center gap-1.5 text-zinc-300">
          <Sparkles className="w-3.5 h-3.5 text-[#A855F7]" />
          <span>{PERSONAL_INFO.availabilityNote}</span>
        </div>
      </div>
    </div>
  );
};

export default HeroActions;
