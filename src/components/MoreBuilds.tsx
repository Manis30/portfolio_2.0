import React from 'react';
import { motion } from 'motion/react';
import { ExternalLink, ArrowUpRight } from 'lucide-react';
import { Github } from './ui/Icons';
import { Container } from './ui/Container';
import { SectionLabel } from './ui/SectionLabel';
import { MORE_BUILDS } from '../data/projects';

export const MoreBuilds: React.FC = () => {
  return (
    <section className="py-24 sm:py-32 relative border-b border-white/[0.07] bg-[#08090C]/40">
      <Container>
        {/* Section Header */}
        <div className="mb-14 sm:mb-20">
          <SectionLabel label="More Builds" className="mb-4" />
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-[#F5F5F5] max-w-3xl leading-[1.05]">
            MORE<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] via-[#A855F7] to-[#C084FC]">
              BUILDS.
            </span>
          </h2>
        </div>

        {/* 3-Column Compact Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {MORE_BUILDS.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: idx * 0.08 }}
              className="rounded-2xl bg-[#0D0F14] border border-white/[0.07] hover:border-[#8B5CF6]/35 transition-all duration-300 overflow-hidden flex flex-col justify-between group shadow-xl"
            >
              <div>
                {/* Image Preview */}
                <div className="aspect-[16/10] overflow-hidden bg-[#050505] relative border-b border-white/[0.07]">
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D0F14] via-transparent to-transparent opacity-60" />
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono-tech uppercase text-[#8B5CF6] tracking-wider font-semibold">
                      // {project.category}
                    </span>
                  </div>

                  <h3 className="font-display text-xl font-bold text-[#F5F5F5] group-hover:text-white transition-colors mb-2 flex items-center justify-between">
                    <span>{project.title}</span>
                    <ArrowUpRight className="w-4 h-4 text-[#8B5CF6] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h3>

                  <p className="text-xs sm:text-sm text-[#9A9DA6] leading-relaxed mb-4 font-sans">
                    {project.description}
                  </p>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {project.technologies.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded bg-[#11131A] text-[11px] font-mono-tech text-[#9A9DA6] border border-white/5"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer Links */}
              <div className="p-6 pt-0 flex items-center gap-3">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono-tech text-[#F5F5F5] hover:text-[#8B5CF6] transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Live Preview</span>
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono-tech text-[#9A9DA6] hover:text-[#F5F5F5] transition-colors ml-auto"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>Source</span>
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};
