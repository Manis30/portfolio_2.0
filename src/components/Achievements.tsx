import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { Container } from './ui/Container';
import { SectionLabel } from './ui/SectionLabel';
import { ACHIEVEMENTS_DATA } from '../data/education';

export const Achievements: React.FC = () => {
  return (
    <section className="py-24 sm:py-32 relative border-b border-white/[0.07] bg-[#050505]">
      <Container>
        {/* Section Header */}
        <div className="mb-14 sm:mb-20">
          <SectionLabel label="Recognition" className="mb-4" />
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-[#F5F5F5] max-w-3xl leading-[1.05]">
            RECOGNITION &amp;<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] via-[#A855F7] to-[#C084FC]">
              BENCHMARKS.
            </span>
          </h2>
        </div>

        {/* Editorial Numbered List */}
        <div className="divide-y divide-white/[0.07] border-y border-white/[0.07]">
          {ACHIEVEMENTS_DATA.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="py-8 sm:py-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-center group hover:bg-white/[0.015] px-4 -mx-4 rounded-xl transition-colors"
            >
              {/* Number Index */}
              <div className="md:col-span-2 flex items-center gap-3">
                <span className="font-mono-tech text-xs uppercase tracking-widest text-[#9A9DA6]">
                  INDEX
                </span>
                <span className="font-mono-tech text-lg font-bold text-[#8B5CF6]">
                  0{idx + 1}
                </span>
              </div>

              {/* Main Metric & Title */}
              <div className="md:col-span-6">
                <div className="font-display text-2xl sm:text-3xl font-extrabold text-[#F5F5F5] group-hover:text-white transition-colors tracking-tight">
                  {item.title}
                </div>
                {item.subtitle && (
                  <p className="text-xs sm:text-sm text-[#9A9DA6] mt-1 font-sans">
                    {item.subtitle}
                  </p>
                )}
              </div>

              {/* Verified Metric Badge */}
              <div className="md:col-span-2">
                <span className="inline-flex px-3 py-1 rounded-full bg-[#11131A] border border-white/[0.08] text-xs font-mono-tech text-[#C084FC] font-semibold">
                  {item.metric}
                </span>
              </div>

              {/* Verification Link */}
              <div className="md:col-span-2 flex justify-start md:justify-end">
                {item.link ? (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono-tech text-[#9A9DA6] group-hover:text-[#8B5CF6] transition-colors"
                  >
                    <span>{item.linkLabel || 'Verify'}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#8B5CF6] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                ) : (
                  <span className="text-xs font-mono-tech text-white/30">
                    Official Award
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Achievements;
