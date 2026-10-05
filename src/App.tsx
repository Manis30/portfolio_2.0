import React from 'react';
import { ScrollProgress } from './components/ui/ScrollProgress';
import { CursorGlow } from './components/ui/CursorGlow';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MetricsStrip } from './components/MetricsStrip';
import { About } from './components/About';
import { Experience } from './components/Experience';
import { TechStack } from './components/TechStack';
import { Projects } from './components/Projects';
import { MoreBuilds } from './components/MoreBuilds';
import { BuildProcess } from './components/BuildProcess';
import { Education } from './components/Education';
import { Achievements } from './components/Achievements';
import { ResumeCTA } from './components/ResumeCTA';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#050505] text-[#F5F5F5] font-sans selection:bg-[#8B5CF6]/30 selection:text-white relative overflow-x-hidden">
      {/* Minimal top scroll progress bar */}
      <ScrollProgress />

      {/* Subtle desktop cursor-following violet glow */}
      <CursorGlow />

      {/* Sticky minimal editorial navigation */}
      <Navbar />

      {/* Main page content following exact required order */}
      <main>
        {/* 2. Hero */}
        <Hero />

        {/* 3. Metrics Strip */}
        <MetricsStrip />

        {/* 4. About */}
        <About />

        {/* 5. Experience */}
        <Experience />

        {/* 6. Tech Stack */}
        <TechStack />

        {/* 7. Selected Work */}
        <Projects />

        {/* 8. More Builds */}
        <MoreBuilds />

        {/* 9. Build Process */}
        <BuildProcess />

        {/* 10. Education */}
        <Education />

        {/* 11. Achievements */}
        <Achievements />

        {/* 12. Resume CTA */}
        <ResumeCTA />

        {/* 13. Contact */}
        <Contact />
      </main>

      {/* 14. Footer */}
      <Footer />
    </div>
  );
};

export default App;
