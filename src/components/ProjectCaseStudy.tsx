import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, CheckCircle2, ShieldAlert } from 'lucide-react';
import { Github } from './ui/Icons';
import { Project } from '../types';
import { Button } from './ui/Button';

interface ProjectCaseStudyProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectCaseStudy: React.FC<ProjectCaseStudyProps> = ({ project, onClose }) => {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [project]);

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-10 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-3xl bg-[#08090C] border border-white/[0.08] shadow-2xl p-6 sm:p-10 lg:p-12 z-10 custom-scrollbar text-[#F5F5F5]"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-xl bg-[#11131A] border border-white/[0.08] text-[#8B8F98] hover:text-white hover:border-[#8B5CF6]/50 transition-colors cursor-pointer"
            aria-label="Close Case Study"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="mb-8">
            <span className="text-xs font-mono-tech uppercase tracking-widest text-[#8B5CF6] font-semibold">
              // CASE STUDY — {project.category}
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mt-1 mb-3">
              {project.title}
            </h2>
            <p className="text-base sm:text-lg text-[#8B8F98] leading-relaxed">
              {project.longDescription || project.description}
            </p>
          </div>

          {/* Hero Visual Preview */}
          <div className="rounded-xl overflow-hidden border border-white/10 mb-8 bg-[#050505]">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-auto object-cover max-h-[460px]"
            />
          </div>

          {/* Quick Action Links Bar */}
          <div className="flex flex-wrap items-center gap-3 p-4 rounded-xl bg-[#11131A] border border-white/5 mb-10">
            {project.liveUrl && (
              <Button
                variant="primary"
                size="sm"
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                icon={<ExternalLink className="w-3.5 h-3.5" />}
              >
                VIEW LIVE DEMO
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
                VIEW SOURCE
              </Button>
            )}
            {project.isDomoRequestOnly && (
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#050505] border border-white/10 text-xs font-mono-tech text-[#8B8F98]">
                <ShieldAlert className="w-3.5 h-3.5 text-[#8B5CF6]" />
                <span>DOMO DEMO — ACCESS REQUIRED</span>
              </div>
            )}
          </div>

          {/* 7-Part Case Study Structure */}
          <div className="space-y-8 divide-y divide-white/[0.08]">
            {/* 01 Overview */}
            <div className="pt-6 first:pt-0">
              <h3 className="text-xs font-mono-tech uppercase tracking-widest text-[#8B5CF6] mb-2">
                01 / Overview
              </h3>
              <p className="text-sm sm:text-base text-[#8B8F98] leading-relaxed">
                {project.longDescription || project.description}
              </p>
            </div>

            {/* 02 Problem / Purpose */}
            {project.problem && (
              <div className="pt-6">
                <h3 className="text-xs font-mono-tech uppercase tracking-widest text-[#8B5CF6] mb-2">
                  02 / Problem &amp; Purpose
                </h3>
                <p className="text-sm sm:text-base text-[#8B8F98] leading-relaxed">
                  {project.problem}
                </p>
              </div>
            )}

            {/* 03 Solution */}
            {project.solution && (
              <div className="pt-6">
                <h3 className="text-xs font-mono-tech uppercase tracking-widest text-[#8B5CF6] mb-2">
                  03 / Engineering Solution
                </h3>
                <p className="text-sm sm:text-base text-[#8B8F98] leading-relaxed">
                  {project.solution}
                </p>
              </div>
            )}

            {/* 04 Technology Stack */}
            <div className="pt-6">
              <h3 className="text-xs font-mono-tech uppercase tracking-widest text-[#8B5CF6] mb-3">
                04 / Technology Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-md bg-[#11131A] border border-white/10 text-xs font-mono-tech text-white"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Architecture Flow (if specified) */}
            {project.architecture && (
              <div className="pt-6">
                <h3 className="text-xs font-mono-tech uppercase tracking-widest text-[#8B5CF6] mb-3">
                  05 / System Architecture &amp; Data Pipeline
                </h3>
                <div className="p-4 rounded-xl bg-[#050505] border border-white/[0.08] font-mono-tech text-xs text-[#C084FC] leading-relaxed">
                  {project.architecture}
                </div>
              </div>
            )}

            {/* Modular Subsystems (if specified) */}
            {project.modules && (
              <div className="pt-6">
                <h3 className="text-xs font-mono-tech uppercase tracking-widest text-[#8B5CF6] mb-3">
                  {project.architecture ? '06' : '05'} / Core Application Modules
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {project.modules.map((mod) => (
                    <div
                      key={mod.name}
                      className="p-4 rounded-xl bg-[#0D0F14] border border-white/[0.06] hover:border-[#8B5CF6]/30 transition-colors"
                    >
                      <h4 className="text-xs font-mono-tech font-bold text-white mb-1.5 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6]" />
                        <span>{mod.name}</span>
                      </h4>
                      <p className="text-xs text-[#8B8F98] leading-relaxed font-sans">
                        {mod.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Verified System Capabilities */}
            {project.features && (
              <div className="pt-6">
                <h3 className="text-xs font-mono-tech uppercase tracking-widest text-[#8B5CF6] mb-3">
                  {project.modules ? '07' : '05'} / Verified System Capabilities
                </h3>
                <div className="space-y-2.5">
                  {project.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-sm text-[#8B8F98]">
                      <CheckCircle2 className="w-4 h-4 text-[#8B5CF6] shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Workflow steps diagram (State Machine Architecture) */}
            {project.workflowSteps && (
              <div className="pt-6">
                <div className="flex items-center justify-between mb-3.5">
                  <h3 className="text-xs font-mono-tech uppercase tracking-widest text-[#8B5CF6]">
                    {project.modules ? '08' : '06'} / Execution Workflow &amp; State Machine
                  </h3>
                  <span className="text-[11px] font-mono-tech text-[#8B8F98]">
                    Deterministic Flow
                  </span>
                </div>
                <div className="p-4 sm:p-5 rounded-2xl bg-[#050505] border border-white/[0.08]">
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                    {project.workflowSteps.map((step, idx) => (
                      <div
                        key={step}
                        className="p-3 rounded-xl bg-[#0D0F14] border border-white/[0.07] hover:border-[#8B5CF6]/50 transition-colors flex flex-col justify-between"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-mono-tech text-[10px] text-[#8B5CF6] font-bold">
                            {String(idx + 1).padStart(2, '0')}
                          </span>
                          {idx < (project.workflowSteps?.length ?? 0) - 1 ? (
                            <span className="text-[#8B8F98] text-[10px] font-mono-tech">↓</span>
                          ) : (
                            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] shadow-[0_0_6px_#10B981]" />
                          )}
                        </div>
                        <span className="font-mono-tech text-xs font-semibold text-white/90">
                          {step}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
