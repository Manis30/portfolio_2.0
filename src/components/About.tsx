import React from 'react';
import { motion } from 'motion/react';
import { Container } from './ui/Container';
import { SectionLabel } from './ui/SectionLabel';
import { PERSONAL_INFO } from '../data/portfolio';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-20 sm:py-28 relative border-b border-white/[0.07] bg-[#050505]">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Large Editorial Statement, Narrative & Technical Pillars */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 flex flex-col justify-between h-full"
          >
            <div>
              <SectionLabel label="About Me" className="mb-4 sm:mb-5 w-fit" />

              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-[#F5F5F5] leading-[1.06] mb-5">
                I'M A FULL STACK<br />
                DEVELOPER WHO<br />
                LIKES BUILDING<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] via-[#A855F7] to-[#D946EF]">
                  THINGS THAT WORK.
                </span>
              </h2>

              <div className="space-y-3.5 text-[#9A9DA6] font-normal font-sans">
                <p className="text-[#F5F5F5] text-base sm:text-lg leading-relaxed">
                  Hi, I'm <strong className="text-white font-semibold">MANI S</strong>, a <strong className="text-[#C084FC] font-semibold">Full Stack MERN Developer</strong> focused on building modern web applications, scalable backend systems, and clean user experiences.
                </p>
                <p className="text-[#9A9DA6] text-sm sm:text-base leading-relaxed">
                  I engineer responsive frontends and resilient backend architectures using <span className="text-zinc-200">React</span>, <span className="text-zinc-200">JavaScript</span>, <span className="text-zinc-200">TypeScript</span>, <span className="text-zinc-200">Node.js</span>, <span className="text-zinc-200">Express.js</span>, and <span className="text-zinc-200">MongoDB</span>. My production solutions incorporate secure <span className="text-zinc-200">REST APIs</span>, real-time <span className="text-zinc-200">WebSockets</span>, utility-first styling with <span className="text-zinc-200">Tailwind CSS</span>, version control with <span className="text-zinc-200">Git</span>, and containerized deployment with <span className="text-zinc-200">Docker</span>.
                </p>
              </div>
            </div>

            {/* Technical Focus Points (3 Equal Pillars) */}
            <div className="mt-8 pt-6 border-t border-white/[0.08] grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              <div className="p-3.5 rounded-xl bg-[#0A0A10]/90 border border-white/[0.07] hover:border-[#8B5CF6]/35 transition-colors">
                <span className="font-mono-tech text-[11px] uppercase text-[#8B5CF6] font-semibold tracking-wider block">
                  01 / ARCHITECTURE
                </span>
                <p className="text-xs sm:text-[13px] text-white/90 mt-1.5 font-sans leading-snug">
                  MERN Stack &amp; RESTful APIs
                </p>
              </div>
              <div className="p-3.5 rounded-xl bg-[#0A0A10]/90 border border-white/[0.07] hover:border-[#8B5CF6]/35 transition-colors">
                <span className="font-mono-tech text-[11px] uppercase text-[#8B5CF6] font-semibold tracking-wider block">
                  02 / SECURITY
                </span>
                <p className="text-xs sm:text-[13px] text-white/90 mt-1.5 font-sans leading-snug">
                  JWT, RBAC &amp; HTTP-only Cookies
                </p>
              </div>
              <div className="p-3.5 rounded-xl bg-[#0A0A10]/90 border border-white/[0.07] hover:border-[#8B5CF6]/35 transition-colors">
                <span className="font-mono-tech text-[11px] uppercase text-[#8B5CF6] font-semibold tracking-wider block">
                  03 / STATE &amp; OPT
                </span>
                <p className="text-xs sm:text-[13px] text-white/90 mt-1.5 font-sans leading-snug">
                  Zustand &amp; Redux Toolkit
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Balanced Editorial Portrait with metadata */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-5 flex items-center justify-center lg:justify-end"
          >
            <div className="w-full max-w-[420px] relative rounded-2xl overflow-hidden border border-white/[0.08] bg-[#0A0A10] group shadow-2xl">
              {/* Subtle ambient violet glow */}
              <div className="absolute -top-12 -right-12 w-44 h-44 bg-[#8B5CF6]/15 rounded-full blur-3xl pointer-events-none" />

              <div className="h-[380px] sm:h-[410px] w-full overflow-hidden relative">
                <img
                  src={PERSONAL_INFO.portraitPath}
                  alt="Mani S — Full Stack MERN Developer"
                  loading="lazy"
                  className="w-full h-full object-cover object-top filter brightness-[0.97] contrast-[1.02] group-hover:scale-[1.03] transition-all duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#08090C] via-transparent to-transparent opacity-80" />
              </div>

              {/* Minimal Editorial Metadata Tag */}
              <div className="p-5 relative z-10 bg-[#08090C]/95 backdrop-blur-md border-t border-white/[0.07]">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-display text-base sm:text-lg font-bold text-white tracking-tight leading-none">
                      MANI S
                    </h3>
                    <p className="text-xs font-mono-tech text-[#8B5CF6] mt-1.5 font-medium">
                      Full Stack MERN Developer
                    </p>
                  </div>
                  <span className="text-[11px] font-mono-tech text-[#A1A1AA] px-2.5 py-1 rounded-lg bg-[#11131A] border border-white/[0.08]">
                    B.E. CSE • 2026
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default About;
