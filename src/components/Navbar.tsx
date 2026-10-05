import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Send } from 'lucide-react';
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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = NAV_ITEMS.map((item) => item.href.slice(1));
      const scrollPosition = window.scrollY + 120;

      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i]);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
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

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-[#050508]/85 backdrop-blur-xl border-b border-white/[0.08] shadow-[0_4px_24px_rgba(0,0,0,0.5)]'
          : 'bg-[#050508]/65 backdrop-blur-xl border-b border-white/[0.05]'
      }`}
    >
      <div className="max-w-[1360px] w-full mx-auto px-6 sm:px-10 lg:px-12">
        <div className="flex items-center justify-between h-[68px]">
          {/* Logo: <MANI/S> */}
          <a
            href="#"
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
              className="text-xs font-mono-tech text-[#D4D4D8] hover:text-white font-medium transition-colors"
            >
              Resume
            </a>

            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg text-white bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] hover:brightness-110 shadow-[0_0_15px_rgba(139,92,246,0.3)] transition-all duration-200"
            >
              <span>Let's Talk</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <a
              href={PERSONAL_INFO.resumePath}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[#9A9DA6] hover:text-white px-2.5 py-1 rounded bg-[#0A0A10] border border-white/10"
            >
              Resume
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-lg bg-[#0A0A10] border border-white/10 text-white focus:outline-none"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[72px] bottom-0 bg-[#050505]/95 backdrop-blur-xl border-b border-white/[0.08] flex flex-col justify-between p-6 z-50 overflow-y-auto">
          <div className="flex flex-col space-y-3 pt-2">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-2.5 px-3 text-base font-medium text-white hover:bg-white/[0.05] rounded-lg"
              >
                <span className="flex items-center gap-2">
                  <span className="text-xs font-mono-tech text-[#8B5CF6]">{item.num}</span>
                  <span>{item.name}</span>
                </span>
                <ArrowUpRight className="w-4 h-4 text-[#71717A]" />
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-3 pt-6 border-t border-white/[0.08]">
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 py-3 rounded-xl font-medium text-sm text-white bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] shadow-[0_0_18px_rgba(139,92,246,0.3)]"
            >
              <Send className="w-4 h-4" />
              <span>Let's Talk</span>
            </a>

            <div className="flex items-center justify-center gap-4 pt-2">
              <a
                href={PERSONAL_INFO.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0D0F14] border border-white/10 text-xs text-[#9A9DA6] hover:text-white"
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
              </a>
              <a
                href={PERSONAL_INFO.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0D0F14] border border-white/10 text-xs text-[#9A9DA6] hover:text-white"
              >
                <Linkedin className="w-4 h-4" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
