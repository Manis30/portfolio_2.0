import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, ExternalLink, ShieldAlert, Sparkles, Layers } from 'lucide-react';
import { Github } from './ui/Icons';
import { Project } from '../types';
import { Button } from './ui/Button';

interface ProjectCardProps {
  project: Project;
  index: number;
  onOpenCaseStudy: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, onOpenCaseStudy }) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 4; // -2 to 2 deg
    const y = -((e.clientY - rect.top) / rect.height - 0.5) * 4; // -2 to 2 deg
    setTilt({ x: y, y: x });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const layoutMode = index % 4;

  // Common action buttons snippet
  const renderActionButtons = () => (
    <div className="flex flex-wrap items-center gap-3 pt-5 border-t border-white/[0.07]">
      <Button
        variant="primary"
        size="sm"
        onClick={() => onOpenCaseStudy(project)}
        icon={<Layers className="w-3.5 h-3.5" />}
      >
        CASE STUDY
      </Button>

      {project.liveUrl && (
        <Button
          variant="secondary"
          size="sm"
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          icon={<ExternalLink className="w-3.5 h-3.5" />}
        >
          LIVE DEMO
        </Button>
      )}

      {project.githubUrl && (
        <Button
          variant="secondary"
          size="sm"
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          icon={<Github className="w-3.5 h-3.5" />}
        >
          SOURCE
        </Button>
      )}

      {project.isDomoRequestOnly && (
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#08090C] border border-white/[0.08] text-xs font-mono-tech text-[#9A9DA6]">
          <ShieldAlert className="w-3.5 h-3.5 text-[#8B5CF6]" />
          <span>DOMO DEMO — ACCESS REQUIRED</span>
        </span>
      )}
    </div>
  );

  // Common screenshot image container snippet
  const renderScreenshot = (aspectClass: string = "aspect-[16/10]") => (
    <div
      onClick={() => onOpenCaseStudy(project)}
      className={`cursor-pointer overflow-hidden rounded-2xl border border-white/[0.08] bg-[#050505] relative group/img ${aspectClass}`}
    >
      <img
        src={project.image}
        alt={project.title}
        loading="lazy"
        className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover/img:scale-[1.03]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#08090C]/80 via-transparent to-transparent opacity-50 group-hover/img:opacity-20 transition-opacity duration-300" />
      <div className="absolute bottom-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#08090C]/90 border border-white/10 text-xs font-mono-tech text-white opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 backdrop-blur-md">
        <span>Inspect Case Study</span>
        <ArrowUpRight className="w-3.5 h-3.5 text-[#8B5CF6]" />
      </div>
    </div>
  );

  // Mode 2: Project 03 (SupplierIQ) — Large Visual with floating information composition
  if (layoutMode === 2) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, delay: 0.1 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: 'transform 0.2s ease-out',
        }}
        className="group relative rounded-3xl bg-[#0D0F14] border border-white/[0.07] hover:border-[#8B5CF6]/35 transition-all duration-500 overflow-hidden shadow-2xl p-6 sm:p-10 lg:p-12"
      >
        <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#8B5CF6]/0 to-transparent group-hover:via-[#8B5CF6]/80 transition-all duration-700" />

        {/* Top Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <span className="text-xs font-mono-tech uppercase tracking-widest text-[#8B5CF6] font-semibold">
              // {project.category}
            </span>
            <h3
              onClick={() => onOpenCaseStudy(project)}
              className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#F5F5F5] group-hover:text-white transition-all tracking-tight cursor-pointer flex items-center gap-2 mt-1"
            >
              <span>{project.title}</span>
              <ArrowUpRight className="w-5 h-5 text-[#8B5CF6] opacity-0 group-hover:opacity-100 transition-opacity" />
            </h3>
          </div>
          <span className="text-sm font-mono-tech text-white/30 font-bold self-start sm:self-auto">
            0{index + 1}
          </span>
        </div>

        {/* Large Visual with Floating Info Card Overlay */}
        <div className="relative rounded-2xl overflow-hidden mb-6">
          {renderScreenshot("aspect-[16/9] sm:aspect-[21/9]")}

          {/* Floating metadata card on desktop */}
          <div className="hidden md:block absolute bottom-6 left-6 max-w-md p-5 rounded-2xl bg-[#08090C]/90 backdrop-blur-xl border border-white/10 shadow-2xl z-20">
            <p className="text-xs sm:text-sm text-[#D4D4D8] leading-relaxed mb-3">
              {project.description}
            </p>
            {project.highlights && project.highlights.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {project.highlights.map((hl) => (
                  <span
                    key={hl}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#11131A] text-[11px] font-mono-tech text-[#C084FC] border border-[#8B5CF6]/20"
                  >
                    <Sparkles className="w-3 h-3 text-[#8B5CF6]" />
                    <span>{hl}</span>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Mobile description fallback */}
        <p className="md:hidden text-sm text-[#9A9DA6] leading-relaxed mb-5 font-sans">
          {project.description}
        </p>

        {/* Tech tags and action buttons */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded bg-[#11131A] text-xs font-mono-tech text-[#F5F5F5] border border-white/5"
              >
                {tech}
              </span>
            ))}
          </div>
          {renderActionButtons()}
        </div>
      </motion.div>
    );
  }

  // Mode 3: Project 04 (CareFlow Intelligence) — Split Editorial Layout
  if (layoutMode === 3) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, delay: 0.1 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: 'transform 0.2s ease-out',
        }}
        className="group relative rounded-3xl bg-[#0D0F14] border border-white/[0.07] hover:border-[#8B5CF6]/35 transition-all duration-500 overflow-hidden shadow-2xl p-6 sm:p-10 lg:p-12"
      >
        <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#8B5CF6]/0 to-transparent group-hover:via-[#8B5CF6]/80 transition-all duration-700" />

        {/* Split Editorial Top Section */}
        <div className="border-b border-white/[0.07] pb-6 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xs font-mono-tech uppercase tracking-widest text-[#8B5CF6] font-semibold">
                // {project.category}
              </span>
              <span className="text-xs font-mono-tech text-white/30 font-bold">
                0{index + 1}
              </span>
            </div>
            <h3
              onClick={() => onOpenCaseStudy(project)}
              className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#F5F5F5] group-hover:text-white transition-all tracking-tight cursor-pointer flex items-center gap-2"
            >
              <span>{project.title}</span>
              <ArrowUpRight className="w-5 h-5 text-[#8B5CF6] opacity-0 group-hover:opacity-100 transition-opacity" />
            </h3>
          </div>

          {project.highlights && project.highlights.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {project.highlights.map((hl) => (
                <span
                  key={hl}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#11131A] text-xs font-mono-tech text-[#C084FC] border border-[#8B5CF6]/30 shadow-sm"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#8B5CF6]" />
                  <span>{hl}</span>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* 50/50 Split Editorial Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          <div className="lg:col-span-6">
            {renderScreenshot("aspect-[16/10]")}
          </div>

          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <p className="text-sm sm:text-base text-[#9A9DA6] leading-relaxed mb-6 font-normal font-sans">
                {project.description}
              </p>

              {/* Technologies */}
              <div className="flex flex-wrap gap-1.5 mb-8">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded bg-[#11131A] text-xs font-mono-tech text-[#F5F5F5] border border-white/5"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {renderActionButtons()}
          </div>
        </div>
      </motion.div>
    );
  }

  // Mode 0: Project 01 (CareFlow) — Image Left / Content Right
  // Mode 1: Project 02 (CodeSphere) — Content Left / Image Right
  const isImageLeft = layoutMode === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: 'transform 0.2s ease-out',
      }}
      className="group relative rounded-3xl bg-[#0D0F14] border border-white/[0.07] hover:border-[#8B5CF6]/35 transition-all duration-500 overflow-hidden shadow-2xl"
    >
      {/* Subtle top violet accent line */}
      <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#8B5CF6]/0 to-transparent group-hover:via-[#8B5CF6]/80 transition-all duration-700" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center p-6 sm:p-10 lg:p-12">
        {/* Project Screenshot Visual Column */}
        <div
          className={`lg:col-span-7 ${
            isImageLeft ? 'lg:order-1' : 'lg:order-2'
          }`}
        >
          {renderScreenshot()}
        </div>

        {/* Project Details Text Column */}
        <div
          className={`lg:col-span-5 flex flex-col justify-between ${
            isImageLeft ? 'lg:order-2' : 'lg:order-1'
          }`}
        >
          <div>
            {/* Number and Category */}
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="text-xs font-mono-tech uppercase tracking-widest text-[#8B5CF6] font-semibold">
                // {project.category}
              </span>
              <span className="text-xs font-mono-tech text-white/30 font-bold">
                0{index + 1}
              </span>
            </div>

            {/* Project Title */}
            <h3
              onClick={() => onOpenCaseStudy(project)}
              className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#F5F5F5] group-hover:text-white transition-all tracking-tight cursor-pointer flex items-center gap-2 mb-3"
            >
              <span>{project.title}</span>
              <ArrowUpRight className="w-5 h-5 text-[#8B5CF6] opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300" />
            </h3>

            {/* Description */}
            <p className="text-sm sm:text-base text-[#9A9DA6] leading-relaxed mb-6 font-normal font-sans">
              {project.description}
            </p>

            {/* Highlights (if any) */}
            {project.highlights && project.highlights.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {project.highlights.map((hl) => (
                  <span
                    key={hl}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#11131A] text-[11px] font-mono-tech text-[#C084FC] border border-[#8B5CF6]/20"
                  >
                    <Sparkles className="w-3 h-3 text-[#8B5CF6]" />
                    <span>{hl}</span>
                  </span>
                ))}
              </div>
            )}

            {/* Tech Stack Tags */}
            <div className="flex flex-wrap gap-1.5 mb-8">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded bg-[#11131A] text-xs font-mono-tech text-[#F5F5F5] border border-white/5"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {renderActionButtons()}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
