import React from 'react';
import { Container } from './ui/Container';
import { SectionLabel } from './ui/SectionLabel';
import { ExperienceCard } from './ExperienceItem';
import { EXPERIENCES } from '../data/experience';

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-24 sm:py-32 relative border-b border-white/[0.08] bg-[#050505]">
      <Container>
        {/* Section Header */}
        <div className="mb-14 sm:mb-20">
          <SectionLabel label="Experience" className="mb-4" />
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-[#F5F5F5] max-w-3xl leading-[1.05]">
            WHERE I'VE<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] via-[#A855F7] to-[#C084FC]">
              BEEN BUILDING.
            </span>
          </h2>
          <p className="text-sm font-mono-tech text-[#9CA3AF] max-w-2xl mt-4">
            Professional software engineering experience by <strong className="text-white font-medium">MANI S</strong> — Full Stack MERN Developer.
          </p>
        </div>

        {/* Timeline List */}
        <div className="max-w-4xl">
          {EXPERIENCES.map((exp, idx) => (
            <ExperienceCard key={exp.id} item={exp} index={idx} />
          ))}
        </div>
      </Container>
    </section>
  );
};
