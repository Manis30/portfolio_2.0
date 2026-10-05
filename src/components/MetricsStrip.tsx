import React from 'react';
import { motion } from 'motion/react';
import { Briefcase, Code2, BarChart3, Trophy } from 'lucide-react';
import { Container } from './ui/Container';
import { PERSONAL_INFO } from '../data/portfolio';

const getMetricIcon = (iconName?: string) => {
  switch (iconName) {
    case 'briefcase':
      return <Briefcase className="w-3.5 h-3.5 text-[#8B5CF6]" />;
    case 'code':
      return <Code2 className="w-3.5 h-3.5 text-[#8B5CF6]" />;
    case 'chart':
      return <BarChart3 className="w-3.5 h-3.5 text-[#8B5CF6]" />;
    case 'trophy':
      return <Trophy className="w-3.5 h-3.5 text-[#8B5CF6]" />;
    default:
      return <Code2 className="w-3.5 h-3.5 text-[#8B5CF6]" />;
  }
};

export const MetricsStrip: React.FC = () => {
  return (
    <div className="relative border-y border-white/[0.08] bg-[#050508]/90 backdrop-blur-md py-6 sm:py-7">
      <Container>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 divide-y lg:divide-y-0 lg:divide-x divide-white/[0.08]">
          {PERSONAL_INFO.proofMetrics.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="flex items-center gap-3.5 lg:px-7 first:lg:pl-0 last:lg:pr-0 pt-4 lg:pt-0 group cursor-default"
            >
              {/* Circular icon container */}
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#0D0F14] border border-white/[0.08] flex items-center justify-center shrink-0 group-hover:border-[#8B5CF6]/50 group-hover:shadow-[0_0_12px_rgba(139,92,246,0.25)] transition-all duration-300">
                {getMetricIcon(item.icon)}
              </div>

              {/* Metric Text */}
              <div className="flex flex-col">
                <div className="font-display text-2xl sm:text-[28px] font-black text-[#F5F5F5] group-hover:text-white transition-colors tracking-tight leading-none">
                  {item.value}
                </div>
                {item.subtitle && (
                  <span className="text-[9px] font-mono-tech text-[#8B5CF6] tracking-wider uppercase font-semibold mt-1 leading-none">
                    {item.subtitle}
                  </span>
                )}
                <span className="text-[10px] sm:text-[11px] text-[#A1A1AA] uppercase font-mono-tech tracking-wider mt-1 font-medium leading-tight">
                  {item.label}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default MetricsStrip;
