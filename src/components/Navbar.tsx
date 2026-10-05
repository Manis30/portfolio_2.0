import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Menu, X, ArrowUpRight, Send, FileText } from 'lucide-react';
import { Github, Linkedin } from './ui/Icons';
import { PERSONAL_INFO } from '../data/portfolio';

const NAV_ITEMS = [
  { name: 'About', href: '#about', num: '01' },
  { name: 'Experience', href: '#experience', num: '02' },
  { name: 'Stack', href: '#stack', num: '03' },
  { name: 'Work', href: '#work', num: '04' },
  { name: 'Contact', href: '#contact', num: '05' },
];

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // If at or near top (in Hero section), no nav link should be active
      if (window.scrollY < 280) {
        setActiveSection('');
        return;
      }

      const sections = NAV_ITEMS.map((item) => item.href.slice(1));
      const scrollPosition = window.scrollY + 140;

      let current = '';
      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i]);
        if (element && element.offsetTop <= scrollPosition) {
          current = sections[i];
          break;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    document.body.style.overflow = '';
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      setTimeout(() => {
        const navHeight = 74;
        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
          top: elementPosition - navHeight,
          behavior: 'smooth',
        });
      }, 50);
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-[#050508]/85 backdrop-blur-xl border-b border-white/[0.08] shadow-[0_4px_24px_rgba(0,0,0,0.5)]'
            : 'bg-[#050508]/65 backdrop-blur-xl border-b border-white/[0.05]'
        }`}
      >
        <div className="max-w-[1400px] w-full mx-auto px-6 sm:px-10 lg:px-12">
          <div className="flex items-center justify-between h-[74px]">
            {/* Logo: <MANI/S> */}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setMobileMenuOpen(false);
                document.body.style.overflow = '';
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center group focus:outline-none"
              aria-label="Mani S Portfolio"
            >
              <span className="font-mono-tech font-bold text-lg tracking-wider text-white">
                <span className="text-[#8B5CF6] transition-transform duration-200 group-hover:-translate-x-0.5 inline-block">&lt;</span>
                <span className="text-white">MANI</span>
                <span className="text-[#A855F7]">/S</span>
                <span className="text-[#8B5CF6] transition-transform duration-200 group-hover:translate-x-0.5 inline-block">&gt;</span>
              </span>
            </a>

            {/* Desktop Navigation: 01. About ... */}
            <nav className="hidden md:flex items-center gap-7 lg:gap-8" aria-label="Main Navigation">
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.href.slice(1);
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.href);
                    }}
                    className={`text-xs font-mono-tech transition-colors duration-200 flex items-center gap-1.5 ${
                      isActive
                        ? 'text-[#C084FC] font-medium'
                        : 'text-[#9CA3AF] hover:text-white font-normal'
                    }`}
                  >
                    <span className={`text-[10px] ${isActive ? 'text-[#8B5CF6]' : 'text-zinc-500'}`}>
                      {item.num}.
                    </span>
                    <span>{item.name}</span>
                    {isActive && <span className="w-1 h-1 rounded-full bg-[#8B5CF6]" />}
                  </a>
                );
              })}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-4">
              <div className="flex items-center gap-2 pr-3 border-r border-white/[0.08]">
                <a
                  href={PERSONAL_INFO.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 text-[#9A9DA6] hover:text-white transition-colors"
                  aria-label="GitHub Profile"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href={PERSONAL_INFO.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 text-[#9A9DA6] hover:text-white transition-colors"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>

              <a
                href={PERSONAL_INFO.resumePath}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0E0C1A]/80 border border-white/15 hover:border-white/35 text-xs font-mono-tech text-white font-medium transition-colors"
              >
                <FileText className="w-3.5 h-3.5 text-[#C084FC]" />
                <span>Resume</span>
              </a>

              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('#contact');
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl text-white bg-gradient-to-r from-[#7C3AED] via-[#8B5CF6] to-[#6366F1] hover:brightness-110 shadow-[0_0_18px_rgba(139,92,246,0.4)] transition-all duration-200"
              >
                <span>Let's Talk</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-2.5 md:hidden">
              <a
                href={PERSONAL_INFO.resumePath}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-mono-tech text-[#D4D4D8] hover:text-white px-3 py-1.5 rounded-lg bg-[#0A0A12] border border-white/15"
              >
                <FileText className="w-3.5 h-3.5 text-[#C084FC]" />
                <span>Resume</span>
              </a>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl bg-[#0E0C18] border border-white/15 text-white focus:outline-none active:scale-95 transition-transform"
                aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              >
                {mobileMenuOpen ? <X className="w-5 h-5 text-[#C084FC]" /> : <Menu className="w-5 h-5 text-white" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu Mounted via Portal to document.body (Immune to backdrop-filter clipping) */}
      {mounted &&
        mobileMenuOpen &&
        createPortal(
          <div className="md:hidden fixed inset-0 top-[74px] z-[9999] bg-[#050508]/98 backdrop-blur-2xl flex flex-col justify-between p-6 overflow-y-auto">
            {/* Navigation links */}
            <div className="flex flex-col space-y-2 pt-2">
              <div className="text-[10px] font-mono-tech tracking-widest uppercase text-[#71717A] px-3 pb-1">
                Navigation
              </div>
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.href.slice(1);
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.href);
                    }}
                    className={`flex items-center justify-between py-3 px-4 text-base font-medium rounded-xl border transition-all ${
                      isActive
                        ? 'text-white bg-[#8B5CF6]/10 border-[#8B5CF6]/30 shadow-[0_0_15px_rgba(139,92,246,0.15)]'
                        : 'text-[#D4D4D8] hover:text-white hover:bg-white/[0.05] border-transparent'
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <span className={`text-xs font-mono-tech font-semibold ${isActive ? 'text-[#C084FC]' : 'text-[#8B5CF6]'}`}>
                        {item.num}
                      </span>
                      <span>{item.name}</span>
                    </span>
                    <ArrowUpRight className={`w-4 h-4 ${isActive ? 'text-[#C084FC]' : 'text-zinc-500'}`} />
                  </a>
                );
              })}
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-col gap-3.5 pt-6 border-t border-white/[0.10] mt-auto">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('#contact');
                }}
                className="flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-[#7C3AED] via-[#8B5CF6] to-[#6366F1] shadow-[0_0_20px_rgba(139,92,246,0.4)] hover:brightness-110 active:scale-[0.98] transition-all"
              >
                <Send className="w-4 h-4" />
                <span>Let's Talk / Connect</span>
              </a>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <a
                  href={PERSONAL_INFO.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#0D0F14] border border-white/10 text-xs font-mono-tech text-[#9A9DA6] hover:text-white transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                </a>
                <a
                  href={PERSONAL_INFO.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#0D0F14] border border-white/10 text-xs font-mono-tech text-[#9A9DA6] hover:text-white transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
};

export default Navbar;
