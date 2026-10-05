import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Container } from './ui/Container';
import { SectionLabel } from './ui/SectionLabel';
import { TechnologyConstellation } from './TechnologyConstellation';
import { SKILL_CATEGORIES } from '../data/skills';

export const TechStack: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'CONSTELLATION' | 'DIRECTORY'>('CONSTELLATION');

  return (
    <section id="stack" className="py-24 sm:py-32 relative border-b border-white/[0.07] bg-[#08090C]/50 overflow-hidden">
      <Container>
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 sm:mb-16">
          <div>
            <SectionLabel label="Tech Stack" className="mb-4" />
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-[#F5F5F5] leading-[1.05]">
              TOOLS I USE<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] via-[#A855F7] to-[#C084FC]">
                TO BUILD.
              </span>
            </h2>
          </div>

          {/* View Mode Switcher */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#0D0F14] border border-white/[0.08] w-fit">
            <button
              onClick={() => setActiveTab('CONSTELLATION')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono-tech uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'CONSTELLATION'
                  ? 'bg-[#8B5CF6] text-white shadow-md'
                  : 'text-[#9A9DA6] hover:text-white'
              }`}
            >
              Constellation
            </button>
            <button
              onClick={() => setActiveTab('DIRECTORY')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono-tech uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'DIRECTORY'
                  ? 'bg-[#8B5CF6] text-white shadow-md'
                  : 'text-[#9A9DA6] hover:text-white'
              }`}
            >
              Full Directory
            </button>
          </div>
        </div>

        {/* View 1: Interactive Technology Constellation */}
        {activeTab === 'CONSTELLATION' && (
          <TechnologyConstellation />
        )}

        {/* View 2: Full Categorized Engineering Directory */}
        {activeTab === 'DIRECTORY' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SKILL_CATEGORIES.map((cat, idx) => (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="p-6 rounded-2xl bg-[#0D0F14] border border-white/[0.07] hover:border-[#8B5CF6]/30 transition-all group shadow-xl"
              >
                <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-white/[0.07]">
                  <span className="text-xs font-mono-tech tracking-wider uppercase text-[#8B5CF6] font-semibold">
                    // {cat.title}
                  </span>
                  <span className="text-[11px] font-mono-tech text-white/30">
                    {String(cat.skills.length).padStart(2, '0')}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 rounded-md bg-[#11131A] text-xs font-mono-tech text-[#F5F5F5] border border-white/5 hover:border-[#8B5CF6]/40 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
};

export default TechStack;
