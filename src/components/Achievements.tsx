import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Trophy, Award, Eye, X, ExternalLink, Sparkles, CheckCircle } from 'lucide-react';
import { Container } from './ui/Container';
import { SectionLabel } from './ui/SectionLabel';
import { ACHIEVEMENTS_DATA } from '../data/education';

export const Achievements: React.FC = () => {
  const [activeCert, setActiveCert] = useState<{
    title: string;
    subtitle: string;
    image: string;
  } | null>(null);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveCert(null);
    };
    if (activeCert) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [activeCert]);

  const logicLeagueCert = ACHIEVEMENTS_DATA.find((item) => item.id === 'logic-league');

  return (
    <section id="achievements" className="py-24 sm:py-32 relative border-b border-white/[0.07] bg-[#050505]">
      <Container>
        {/* Section Header */}
        <div className="mb-14 sm:mb-16">
          <SectionLabel label="Recognition" className="mb-4" />
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-[#F5F5F5] max-w-3xl leading-[1.05]">
            RECOGNITION &amp;<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] via-[#A855F7] to-[#C084FC]">
              BENCHMARKS.
            </span>
          </h2>
          <p className="text-sm font-mono-tech text-[#9A9DA6] max-w-2xl mt-4">
            Verified competitive programming benchmarks, technical hackathon victories, and academic awards earned by <strong className="text-white font-medium">MANI S</strong>.
          </p>
        </div>

        {/* Featured Certificate Spotlight Card: IFET Logic League 1st Prize */}
        {logicLeagueCert && logicLeagueCert.certificateImage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-14 p-6 sm:p-8 lg:p-10 rounded-3xl bg-[#0A0A12] border border-white/[0.10] hover:border-[#8B5CF6]/40 transition-all duration-300 relative overflow-hidden shadow-2xl group"
          >
            {/* Background violet radial glow */}
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#8B5CF6]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              {/* Left Column: Context & Metadata */}
              <div className="lg:col-span-7 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2.5 mb-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8B5CF6]/15 border border-[#8B5CF6]/35 text-xs font-mono-tech font-semibold text-[#C084FC]">
                      <Trophy className="w-3.5 h-3.5 text-[#C084FC]" />
                      <span>OFFICIAL 1ST PRIZE CERTIFICATE</span>
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#11131A] border border-white/10 text-[11px] font-mono-tech text-[#9CA3AF]">
                      <CheckCircle className="w-3 h-3 text-emerald-400" />
                      <span>Verified Winner</span>
                    </span>
                  </div>

                  <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight mb-3">
                    IFET LOGIC LEAGUE — WINNER
                  </h3>

                  <p className="text-sm sm:text-base text-[#D4D4D8] leading-relaxed mb-6 font-normal font-sans">
                    Awarded <strong className="text-white font-semibold">1st Prize</strong> for outstanding performance during the <strong className="text-[#C084FC] font-medium">IFET Logic League</strong> technical and algorithmic problem-solving competition, conducted by the <strong className="text-zinc-200">Department of Computer Science and Engineering</strong> at IFET Autonomous College of Engineering.
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-white/[0.08] mb-6 text-xs font-mono-tech">
                    <div>
                      <span className="text-[#71717A] block text-[10.5px] uppercase">Awardee</span>
                      <span className="text-white font-medium">MANI S (III-Year)</span>
                    </div>
                    <div>
                      <span className="text-[#71717A] block text-[10.5px] uppercase">Accreditation</span>
                      <span className="text-white font-medium">NBA &amp; NAAC ‘A’</span>
                    </div>
                    <div>
                      <span className="text-[#71717A] block text-[10.5px] uppercase">Institution</span>
                      <span className="text-white font-medium">IFET Autonomous</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={() =>
                      setActiveCert({
                        title: 'IFET Logic League — 1st Prize Winner',
                        subtitle:
                          'Awarded to Mr. MANI S (III-Year) for outstanding performance during IFET Logic League conducted by the Department of Computer Science & Engineering, IFET Autonomous College of Engineering.',
                        image: logicLeagueCert.certificateImage!,
                      })
                    }
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#7C3AED] via-[#8B5CF6] to-[#6366F1] text-white text-xs font-mono-tech font-semibold hover:brightness-110 shadow-[0_0_20px_rgba(139,92,246,0.35)] transition-all cursor-pointer"
                  >
                    <Eye className="w-4 h-4" />
                    <span>View Certificate</span>
                  </button>

                  <a
                    href={logicLeagueCert.certificateImage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0D0F14] border border-white/10 hover:border-white/25 text-xs font-mono-tech text-[#9CA3AF] hover:text-white transition-colors"
                  >
                    <span>Open Full Image</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Right Column: Visual Certificate Preview Frame */}
              <div className="lg:col-span-5 flex items-center justify-center">
                <div
                  onClick={() =>
                    setActiveCert({
                      title: 'IFET Logic League — 1st Prize Winner',
                      subtitle:
                        'Awarded to Mr. MANI S (III-Year) for outstanding performance during IFET Logic League conducted by the Department of Computer Science & Engineering, IFET Autonomous College of Engineering.',
                      image: logicLeagueCert.certificateImage!,
                    })
                  }
                  className="relative w-full max-w-[480px] aspect-[4/3] rounded-2xl overflow-hidden border border-white/15 bg-[#050508] shadow-2xl cursor-pointer group/img transition-all duration-300 hover:border-[#8B5CF6]/60 hover:shadow-[0_0_30px_rgba(139,92,246,0.25)]"
                >
                  <img
                    src={logicLeagueCert.certificateImage}
                    alt="IFET Logic League 1st Prize Certificate awarded to MANI S"
                    loading="lazy"
                    className="w-full h-full object-cover object-center group-hover/img:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover/img:opacity-30 transition-opacity" />

                  {/* Floating Action Badge */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between p-2.5 rounded-xl bg-[#0A0A12]/90 backdrop-blur-md border border-white/10 text-xs font-mono-tech">
                    <span className="text-white font-medium flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5 text-[#C084FC]" />
                      <span>IFET Logic League 2K24</span>
                    </span>
                    <span className="text-[#C084FC] flex items-center gap-1 group-hover/img:translate-x-0.5 transition-transform">
                      <span>Click to Enlarge</span>
                      <Eye className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

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
                <div className="flex items-center gap-3">
                  {item.certificateImage && (
                    <button
                      onClick={() =>
                        setActiveCert({
                          title: item.title,
                          subtitle: item.subtitle || '',
                          image: item.certificateImage!,
                        })
                      }
                      className="w-10 h-7 rounded-md overflow-hidden border border-white/15 shrink-0 hover:border-[#8B5CF6] transition-colors cursor-pointer"
                      title="Click to view certificate"
                    >
                      <img
                        src={item.certificateImage}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  )}
                  <div className="font-display text-2xl sm:text-3xl font-extrabold text-[#F5F5F5] group-hover:text-white transition-colors tracking-tight">
                    {item.title}
                  </div>
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

              {/* Verification Link / Action */}
              <div className="md:col-span-2 flex justify-start md:justify-end">
                {item.certificateImage ? (
                  <button
                    onClick={() =>
                      setActiveCert({
                        title: item.title,
                        subtitle: item.subtitle || '',
                        image: item.certificateImage!,
                      })
                    }
                    className="inline-flex items-center gap-1.5 text-xs font-mono-tech text-[#C084FC] hover:text-white transition-colors cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#8B5CF6]" />
                    <span>View Certificate</span>
                  </button>
                ) : item.link ? (
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

      {/* Lightbox Modal for Certificate Preview */}
      <AnimatePresence>
        {activeCert &&
          createPortal(
            <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 lg:p-10 bg-black/90 backdrop-blur-xl">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-3xl bg-[#090910] border border-white/15 shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden"
              >
                {/* Modal Header */}
                <div className="p-5 sm:p-6 border-b border-white/10 flex items-center justify-between gap-4 bg-[#0D0F16]">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#8B5CF6]/20 border border-[#8B5CF6]/30 text-[10px] font-mono-tech font-semibold text-[#C084FC]">
                        VERIFIED CERTIFICATE
                      </span>
                      <span className="text-xs font-mono-tech text-[#71717A]">
                        Awarded to MANI S
                      </span>
                    </div>
                    <h4 className="font-display text-lg sm:text-xl font-bold text-white mt-1">
                      {activeCert.title}
                    </h4>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={activeCert.image}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-[#9A9DA6] hover:text-white transition-colors"
                      title="Open full size in new tab"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                    <button
                      onClick={() => setActiveCert(null)}
                      className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white transition-colors cursor-pointer"
                      aria-label="Close Certificate Preview"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Modal Body: Certificate Image */}
                <div className="flex-1 overflow-auto p-4 sm:p-6 flex items-center justify-center bg-black/60">
                  <img
                    src={activeCert.image}
                    alt={activeCert.title}
                    className="max-h-[68vh] w-auto object-contain rounded-xl border border-white/10 shadow-2xl"
                  />
                </div>

                {/* Modal Footer */}
                <div className="p-4 px-6 border-t border-white/10 bg-[#0D0F16] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono-tech text-[#9CA3AF]">
                  <span>{activeCert.subtitle}</span>
                  <button
                    onClick={() => setActiveCert(null)}
                    className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-white font-medium transition-colors cursor-pointer"
                  >
                    Close Preview
                  </button>
                </div>
              </motion.div>
            </div>,
            document.body
          )}
      </AnimatePresence>
    </section>
  );
};

export default Achievements;
