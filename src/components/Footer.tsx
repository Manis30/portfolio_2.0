import React from 'react';
import { ArrowUp } from 'lucide-react';
import { Container } from './ui/Container';
import { PERSONAL_INFO } from '../data/portfolio';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 bg-[#050505] text-[#9A9DA6] text-xs font-mono-tech border-t border-white/[0.06]">
      <Container>
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand & Role */}
          <div className="flex items-center gap-3">
            <span className="font-bold text-white tracking-wider text-sm">
              <span className="text-[#8B5CF6]">&lt;</span>MANI<span className="text-[#A855F7]">/S</span><span className="text-[#8B5CF6]">&gt;</span>
            </span>
            <span className="text-white/20">|</span>
            <span className="text-xs text-[#9A9DA6] font-normal">
              {PERSONAL_INFO.role}
            </span>
          </div>

          {/* Social Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs">
            <a
              href={PERSONAL_INFO.socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              GitHub
            </a>
            <a
              href={PERSONAL_INFO.socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              LinkedIn
            </a>
            <a
              href={PERSONAL_INFO.socialLinks.leetcode}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              LeetCode
            </a>
            <a
              href={PERSONAL_INFO.socialLinks.hackerrank}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              HackerRank
            </a>
            <a
              href={PERSONAL_INFO.socialLinks.emailMailto}
              className="hover:text-white transition-colors"
            >
              Email
            </a>
          </div>

          {/* Copyright & Back to Top */}
          <div className="flex items-center gap-4">
            <span>&copy; 2026 {PERSONAL_INFO.name}. All rights reserved.</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-[#0D0F14] border border-white/10 hover:border-[#8B5CF6]/50 text-[#9A9DA6] hover:text-white transition-colors"
              aria-label="Back to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </Container>
    </footer>
  );
};
