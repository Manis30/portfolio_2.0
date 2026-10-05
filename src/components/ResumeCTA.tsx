import React from 'react';
import { motion } from 'motion/react';
import { Download, FileText, CheckCircle2 } from 'lucide-react';
import { Container } from './ui/Container';
import { Button } from './ui/Button';
import { PERSONAL_INFO } from '../data/portfolio';

export const ResumeCTA: React.FC = () => {
  return (
    <section className="py-20 sm:py-28 relative border-b border-white/[0.07] bg-[#08090C]/60 overflow-hidden">
      {/* Background subtle radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#8B5CF6]/5 rounded-full blur-[140px] pointer-events-none" />

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="p-8 sm:p-12 lg:p-16 rounded-3xl bg-[#0D0F14] border border-white/[0.08] relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl"
        >
          <div className="max-w-xl">
            <span className="text-xs font-mono-tech uppercase tracking-widest text-[#8B5CF6] font-semibold">
              // VERIFIED CREDENTIALS
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-white tracking-tight mt-2 mb-4 leading-[1.05]">
              WANT THE<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] via-[#A855F7] to-[#C084FC]">
                FULL STORY?
              </span>
            </h2>
            <p className="text-sm sm:text-base text-[#9A9DA6] leading-relaxed mb-6 font-normal font-sans">
              Review my experience, technical skills, projects and educational background in the detailed resume.
            </p>

            <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs font-mono-tech text-[#9A9DA6]">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#8B5CF6]" />
                <span>Verified PDF Format</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#8B5CF6]" />
                <span>Updated for 2026 Roles</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0 w-full md:w-auto">
            <Button
              variant="primary"
              size="lg"
              href={PERSONAL_INFO.resumePath}
              download="Mani-S-Resume.pdf"
              icon={<Download className="w-4 h-4" />}
              className="w-full sm:w-auto"
            >
              DOWNLOAD RESUME
            </Button>
            <Button
              variant="secondary"
              size="lg"
              href={PERSONAL_INFO.resumePath}
              target="_blank"
              rel="noopener noreferrer"
              icon={<FileText className="w-4 h-4 text-[#8B5CF6]" />}
              className="w-full sm:w-auto"
            >
              VIEW IN BROWSER
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};
