import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, ArrowUpRight, Copy, Check, Award } from 'lucide-react';
import { Github, Linkedin } from './ui/Icons';
import { Container } from './ui/Container';
import { SectionLabel } from './ui/SectionLabel';
import { Button } from './ui/Button';
import { PERSONAL_INFO } from '../data/portfolio';

export const Contact: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(PERSONAL_INFO.email);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = PERSONAL_INFO.email;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      try {
        const textArea = document.createElement('textarea');
        textArea.value = PERSONAL_INFO.email;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
      } catch {
        // Fallback prompt if security denies
        window.prompt('Copy email to clipboard:', PERSONAL_INFO.email);
      }
    }
  };

  const handleMailtoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Proactively invoke window.location to ensure mail client opens in restrictive environments
    e.currentTarget.href = PERSONAL_INFO.socialLinks.emailMailto;
  };

  return (
    <section id="contact" className="py-24 sm:py-32 relative border-b border-white/[0.07] bg-[#050505] overflow-hidden">
      {/* Background subtle violet glow */}
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-[#8B5CF6]/5 rounded-full blur-[160px] pointer-events-none" />

      <Container className="relative z-10">
        {/* Final Big CTA Header */}
        <div className="max-w-4xl mb-16 sm:mb-20">
          <SectionLabel label="Let's Talk" className="mb-4" />
          <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-[#F5F5F5] leading-[0.95] mb-6">
            LET'S BUILD<br />
            SOMETHING<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] via-[#A855F7] to-[#C084FC]">
              USEFUL.
            </span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-[#9A9DA6] max-w-2xl leading-relaxed font-normal font-sans">
            I'm open to software engineering opportunities, full-stack development roles and interesting products worth building.
          </p>
        </div>

        {/* Action Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Direct Email Card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 p-8 sm:p-12 rounded-3xl bg-[#0D0F14] border border-white/[0.08] shadow-2xl relative overflow-hidden"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-[#11131A] border border-white/[0.08] text-[#8B5CF6]">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-mono-tech uppercase tracking-wider text-[#9A9DA6]">
                  Direct Email
                </span>
                <div className="font-mono-tech text-base sm:text-lg font-semibold text-white">
                  {PERSONAL_INFO.email}
                </div>
              </div>
            </div>

            <p className="text-sm text-[#9A9DA6] leading-relaxed mb-8 font-sans">
              Send an inquiry or interview schedule directly to my inbox. I typically respond within 24 hours.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href={PERSONAL_INFO.socialLinks.emailMailto}
                onClick={handleMailtoClick}
                className="relative inline-flex items-center justify-center font-medium transition-all duration-300 rounded-lg group overflow-hidden cursor-pointer select-none text-sm px-5 py-2.5 gap-2 tracking-wide bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] text-white shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] hover:brightness-110 active:scale-[0.98]"
              >
                <span>LET'S CONNECT ↗</span>
              </a>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="relative inline-flex items-center justify-center font-medium transition-all duration-300 rounded-lg group overflow-hidden cursor-pointer select-none text-sm px-5 py-2.5 gap-2 tracking-wide bg-[#0D0F14] text-[#F5F5F5] border border-white/10 hover:border-[#8B5CF6]/50 hover:bg-[#11131A] active:scale-[0.98]"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400 font-semibold">COPIED ✓</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-[#9A9DA6] group-hover:text-white transition-colors" />
                    <span>COPY EMAIL</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>

          {/* Social and Professional Profiles Column */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="lg:col-span-5 flex flex-col gap-3.5"
          >
            {/* LinkedIn */}
            <a
              href={PERSONAL_INFO.socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 rounded-2xl bg-[#0D0F14] border border-white/[0.07] hover:border-[#8B5CF6]/40 transition-all flex items-center justify-between group shadow-lg"
            >
              <div className="flex items-center gap-4">
                <div className="p-2.5 rounded-xl bg-[#11131A] text-[#9A9DA6] group-hover:text-white transition-colors">
                  <Linkedin className="w-4 h-4 text-[#8B5CF6]" />
                </div>
                <div>
                  <h3 className="font-display text-sm font-bold text-white group-hover:text-[#8B5CF6] transition-colors">
                    LinkedIn
                  </h3>
                  <p className="text-[11px] font-mono-tech text-[#9A9DA6]">
                    Professional network &amp; recommendations
                  </p>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-[#9A9DA6] group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </a>

            {/* GitHub */}
            <a
              href={PERSONAL_INFO.socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 rounded-2xl bg-[#0D0F14] border border-white/[0.07] hover:border-[#8B5CF6]/40 transition-all flex items-center justify-between group shadow-lg"
            >
              <div className="flex items-center gap-4">
                <div className="p-2.5 rounded-xl bg-[#11131A] text-[#9A9DA6] group-hover:text-white transition-colors">
                  <Github className="w-4 h-4 text-[#8B5CF6]" />
                </div>
                <div>
                  <h3 className="font-display text-sm font-bold text-white group-hover:text-[#8B5CF6] transition-colors">
                    GitHub
                  </h3>
                  <p className="text-[11px] font-mono-tech text-[#9A9DA6]">
                    Repositories, commits &amp; architecture
                  </p>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-[#9A9DA6] group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </a>

            {/* LeetCode */}
            <a
              href={PERSONAL_INFO.socialLinks.leetcode}
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 rounded-2xl bg-[#0D0F14] border border-white/[0.07] hover:border-[#8B5CF6]/40 transition-all flex items-center justify-between group shadow-lg"
            >
              <div className="flex items-center gap-4">
                <div className="p-2.5 rounded-xl bg-[#11131A] text-[#9A9DA6] group-hover:text-white transition-colors">
                  <span className="font-mono-tech text-xs font-bold text-[#8B5CF6]">&lt;/&gt;</span>
                </div>
                <div>
                  <h3 className="font-display text-sm font-bold text-white group-hover:text-[#8B5CF6] transition-colors">
                    LeetCode
                  </h3>
                  <p className="text-[11px] font-mono-tech text-[#9A9DA6]">
                    130+ Solved algorithmic problems
                  </p>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-[#9A9DA6] group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </a>

            {/* HackerRank */}
            <a
              href={PERSONAL_INFO.socialLinks.hackerrank}
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 rounded-2xl bg-[#0D0F14] border border-white/[0.07] hover:border-[#8B5CF6]/40 transition-all flex items-center justify-between group shadow-lg"
            >
              <div className="flex items-center gap-4">
                <div className="p-2.5 rounded-xl bg-[#11131A] text-[#9A9DA6] group-hover:text-white transition-colors">
                  <Award className="w-4 h-4 text-[#8B5CF6]" />
                </div>
                <div>
                  <h3 className="font-display text-sm font-bold text-white group-hover:text-[#8B5CF6] transition-colors">
                    HackerRank
                  </h3>
                  <p className="text-[11px] font-mono-tech text-[#9A9DA6]">
                    Verified Java Certification
                  </p>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-[#9A9DA6] group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </a>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};
