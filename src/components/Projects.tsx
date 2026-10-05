import React, { useState } from 'react';
import { Container } from './ui/Container';
import { SectionLabel } from './ui/SectionLabel';
import { ProjectCard } from './ProjectCard';
import { ProjectCaseStudy } from './ProjectCaseStudy';
import { FEATURED_PROJECTS } from '../data/projects';
import { Project } from '../types';

export const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="work" className="py-24 sm:py-32 relative border-b border-white/[0.08] bg-[#050505]">
      <Container>
        {/* Section Header */}
        <div className="mb-14 sm:mb-20">
          <SectionLabel label="Selected Work" className="mb-4" />
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-[#F5F5F5] max-w-3xl leading-[1.05]">
            THINGS I'VE<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] via-[#A855F7] to-[#C084FC]">
              BUILT.
            </span>
          </h2>
          <p className="text-sm font-mono-tech text-[#9CA3AF] max-w-2xl mt-4">
            Production full-stack web applications, scalable APIs, and system architectures built by <strong className="text-white font-medium">MANI S</strong>.
          </p>
        </div>

        {/* Featured Projects Vertical Stack */}
        <div className="space-y-12 sm:space-y-16">
          {FEATURED_PROJECTS.map((project, idx) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={idx}
              onOpenCaseStudy={(proj) => setSelectedProject(proj)}
            />
          ))}
        </div>

        {/* Interactive Case Study Modal */}
        <ProjectCaseStudy
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      </Container>
    </section>
  );
};

export default Projects;
