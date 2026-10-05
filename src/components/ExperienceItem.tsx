import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Calendar, FileText, CheckCircle2 } from 'lucide-react';
import { ExperienceItem as ExperienceType } from '../types';

interface ExperienceItemProps {
  item: ExperienceType;
  index: number;
}

export const ExperienceCard: React.FC<ExperienceItemProps> = ({ item, index }) => {
  const [isExpanded, setIsExpanded] = useState(index === 0);

  return (
    <div className="relative pl-6 sm:pl-10 pb-12 last:pb-0 border-l border-white/[0.09] group">
      {/* Active Timeline Node */}
      <div className="absolute -left-[7px] top-2 w-3.5 h-3.5 rounded-full bg-[#050505] border-2 border-[#8B5CF6] group-hover:shadow-[0_0_12px_#8B5CF6] transition-all" />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.15 }}
        className="rounded-2xl border border-white/[0.07] bg-[#0D0F14] hover:border-[#8B5CF6]/35 transition-all duration-300 p-6 sm:p-8 shadow-xl"
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <span className="text-xs font-mono-tech uppercase tracking-widest text-[#8B5CF6] font-semibold">
              {item.company}
            </span>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-[#F5F5F5] tracking-tight mt-0.5">
              {item.role}
            </h3>
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#11131A] border border-white/[0.08] text-xs font-mono-tech text-[#9A9DA6] w-fit">
            <Calendar className="w-3.5 h-3.5 text-[#8B5CF6]" />
            <span>{item.period}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm sm:text-base text-[#9A9DA6] leading-relaxed mb-5 font-sans">
          {item.description}
        </p>

        {/* Certificate (if available) */}
        {item.certificateUrl && (
          <div className="mb-5">
            <a
              href={item.certificateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-mono-tech text-[#8B5CF6] hover:text-[#A855F7] transition-colors"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>View Internship Completion Certificate (PDF) ↗</span>
            </a>
          </div>
        )}

        {/* Technical Breakdown Expansion Trigger */}
        {(item.trainingAreas || item.highlights) && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="inline-flex items-center gap-2 text-xs font-mono-tech tracking-wider uppercase text-[#9A9DA6] hover:text-white transition-colors cursor-pointer py-1"
          >
            <span>
              {isExpanded
                ? 'HIDE TECHNICAL BREAKDOWN ↑'
                : 'VIEW TECHNICAL BREAKDOWN ↓'}
            </span>
            <ChevronDown
              className={`w-3.5 h-3.5 transition-transform duration-300 ${
                isExpanded ? 'rotate-180 text-[#8B5CF6]' : ''
              }`}
            />
          </button>
        )}

        {/* Expandable Technical Modules */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              {item.trainingAreas && (
                <div className="mt-6 pt-6 border-t border-white/[0.07] grid grid-cols-1 md:grid-cols-2 gap-4">
                  {item.trainingAreas.map((area, i) => (
                    <motion.div
                      key={area.category}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25, delay: i * 0.05 }}
                      className="p-4 rounded-xl bg-[#11131A] border border-white/[0.06]"
                    >
                      <h4 className="text-xs font-mono-tech text-[#8B5CF6] uppercase font-semibold mb-1.5">
                        {area.category}
                      </h4>
                      <p className="text-xs text-[#9A9DA6] leading-relaxed font-sans">
                        {area.skills}
                      </p>
                    </motion.div>
                  ))}
                </div>
              )}

              {item.highlights && (
                <div className="mt-6 pt-6 border-t border-white/[0.07] space-y-3">
                  {item.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#9A9DA6] font-sans">
                      <CheckCircle2 className="w-4 h-4 text-[#8B5CF6] shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
