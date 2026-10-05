import React from 'react';
import { motion } from 'motion/react';
import { GraduationCap, Calendar, Award } from 'lucide-react';
import { Container } from './ui/Container';
import { SectionLabel } from './ui/SectionLabel';
import { EDUCATION_DATA } from '../data/education';

export const Education: React.FC = () => {
  const primaryDegree = EDUCATION_DATA.find((e) => e.isPrimary);
  const secondarySchools = EDUCATION_DATA.filter((e) => !e.isPrimary);

  return (
    <section className="py-24 sm:py-32 relative border-b border-white/[0.07] bg-[#08090C]/40">
      <Container>
        {/* Section Header */}
        <div className="mb-14 sm:mb-20">
          <SectionLabel label="Education" className="mb-4" />
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-[#F5F5F5] max-w-3xl leading-[1.05]">
            ACADEMIC<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] via-[#A855F7] to-[#C084FC]">
              FOUNDATION.
            </span>
          </h2>
        </div>

        <div className="space-y-8">
          {/* Primary Engineering Degree Hero Card */}
          {primaryDegree && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="p-8 sm:p-10 lg:p-12 rounded-3xl bg-[#0D0F14] border border-white/[0.08] hover:border-[#8B5CF6]/35 transition-all duration-300 relative overflow-hidden group shadow-2xl"
            >
              <div className="absolute top-0 right-0 w-80 h-80 bg-[#8B5CF6]/5 rounded-full blur-3xl pointer-events-none" />

              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 relative z-10">
                <div className="flex-1">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#11131A] border border-white/[0.08] text-xs font-mono-tech text-[#8B5CF6] mb-3">
                    <GraduationCap className="w-3.5 h-3.5" />
                    <span>Bachelor of Engineering</span>
                  </div>

                  <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight mb-2">
                    {primaryDegree.title}
                  </h3>

                  <p className="text-base text-[#F5F5F5]/90 font-medium mb-4">
                    {primaryDegree.institution}
                  </p>

                  {primaryDegree.details && (
                    <p className="text-xs sm:text-sm text-[#9A9DA6] max-w-2xl leading-relaxed font-sans">
                      {primaryDegree.details}
                    </p>
                  )}
                </div>

                <div className="flex flex-col items-start md:items-end gap-3 shrink-0">
                  <div className="px-5 py-2.5 rounded-xl bg-[#11131A] border border-white/[0.08] text-right">
                    <div className="text-[11px] font-mono-tech uppercase text-[#9A9DA6]">Score</div>
                    <div className="font-display text-2xl sm:text-3xl font-extrabold text-[#8B5CF6]">
                      {primaryDegree.score}
                    </div>
                  </div>

                  {primaryDegree.period && (
                    <div className="flex items-center gap-1.5 text-xs font-mono-tech text-[#9A9DA6]">
                      <Calendar className="w-3.5 h-3.5 text-[#8B5CF6]" />
                      <span>{primaryDegree.period}</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* Compact Secondary Education Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {secondarySchools.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="p-6 rounded-2xl bg-[#0D0F14]/70 border border-white/[0.06] flex items-center justify-between gap-4 shadow-lg"
              >
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono-tech text-[#9A9DA6] mb-1">
                    <Award className="w-3.5 h-3.5 text-[#8B5CF6]" />
                    <span>{item.details}</span>
                  </div>
                  <h4 className="font-display text-base font-bold text-[#F5F5F5]">
                    {item.title}
                  </h4>
                  <p className="text-xs text-[#9A9DA6] mt-0.5 font-sans">
                    {item.institution}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <span className="font-display text-lg font-bold text-white font-mono-tech">
                    {item.score}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};
