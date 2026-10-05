import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ArrowDown, ArrowLeft } from 'lucide-react';
import { Container } from './ui/Container';
import { SectionLabel } from './ui/SectionLabel';
import { PERSONAL_INFO } from '../data/portfolio';

export const BuildProcess: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps = PERSONAL_INFO.howIBuildSteps;
  // Row 1: 01, 02, 03
  const row1 = steps.slice(0, 3);
  // Row 2: 06, 05, 04 (rendered in reverse order for desktop 06 ← 05 ← 04 loop)
  const row2 = [steps[5], steps[4], steps[3]];

  return (
    <section className="py-24 sm:py-32 relative border-b border-white/[0.07] bg-[#050505] overflow-hidden">
      <Container>
        {/* Section Header */}
        <div className="mb-14 sm:mb-20">
          <SectionLabel label="Engineering Workflow" className="mb-4" />
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-[#F5F5F5] max-w-3xl leading-[1.05]">
            HOW I<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] via-[#A855F7] to-[#C084FC]">
              BUILD.
            </span>
          </h2>
        </div>

        {/* Desktop Connected 2-Row Snake Flow (01 → 02 → 03 ↓, 06 ← 05 ← 04) */}
        <div className="hidden lg:block space-y-8 relative">
          {/* Row 1: 01 → 02 → 03 */}
          <div className="grid grid-cols-3 gap-6 relative">
            {row1.map((step, idx) => {
              const isActive = activeStep === idx;
              return (
                <div
                  key={step.step}
                  onMouseEnter={() => setActiveStep(idx)}
                  className={`p-7 rounded-2xl bg-[#0D0F14] border transition-all duration-300 relative group cursor-pointer ${
                    isActive
                      ? 'border-[#8B5CF6] shadow-[0_0_25px_rgba(139,92,246,0.18)] scale-[1.02]'
                      : 'border-white/[0.07] hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono-tech text-3xl font-black text-[#8B5CF6]">
                      {step.step}
                    </span>
                    {idx < 2 ? (
                      <ArrowRight className="w-5 h-5 text-white/30 group-hover:text-[#8B5CF6] transition-colors" />
                    ) : (
                      <div className="flex items-center gap-1 text-xs font-mono-tech text-[#8B5CF6]">
                        <span>FLOW</span>
                        <ArrowDown className="w-4 h-4 animate-bounce" />
                      </div>
                    )}
                  </div>
                  <h3 className="font-display text-xl font-bold text-white mb-2 tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#9A9DA6] leading-relaxed font-sans">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Row 2: 06 ← 05 ← 04 */}
          <div className="grid grid-cols-3 gap-6 relative">
            {row2.map((step, idx) => {
              const actualIdx = 5 - idx; // maps to step index 5, 4, 3
              const isActive = activeStep === actualIdx;
              return (
                <div
                  key={step.step}
                  onMouseEnter={() => setActiveStep(actualIdx)}
                  className={`p-7 rounded-2xl bg-[#0D0F14] border transition-all duration-300 relative group cursor-pointer ${
                    isActive
                      ? 'border-[#8B5CF6] shadow-[0_0_25px_rgba(139,92,246,0.18)] scale-[1.02]'
                      : 'border-white/[0.07] hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono-tech text-3xl font-black text-[#8B5CF6]">
                      {step.step}
                    </span>
                    {idx < 2 ? (
                      <ArrowLeft className="w-5 h-5 text-white/30 group-hover:text-[#8B5CF6] transition-colors" />
                    ) : (
                      <span className="w-2 h-2 rounded-full bg-[#10B981] shadow-[0_0_8px_#10B981]" />
                    )}
                  </div>
                  <h3 className="font-display text-xl font-bold text-white mb-2 tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#9A9DA6] leading-relaxed font-sans">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile / Tablet Sequential Flow */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:hidden gap-6">
          {steps.map((step, idx) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.06 }}
              className="p-6 rounded-2xl bg-[#0D0F14] border border-white/[0.07] hover:border-[#8B5CF6]/35 transition-all"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono-tech text-2xl font-black text-[#8B5CF6]">
                  {step.step}
                </span>
                <span className="text-xs font-mono-tech text-[#9A9DA6]">
                  PHASE 0{idx + 1}
                </span>
              </div>
              <h3 className="font-display text-lg font-bold text-white mb-2">
                {step.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#9A9DA6] leading-relaxed font-sans">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default BuildProcess;
