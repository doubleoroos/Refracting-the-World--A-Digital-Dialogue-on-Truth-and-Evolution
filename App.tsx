import React, { useState } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import PerceptionSlider from './components/PerceptionSlider';
import ProcessLayer from './components/ProcessLayer';
import LearningHub from './components/LearningHub';
import Manifesto from './components/Manifesto';
import Photographers from './components/Photographers';
import { Section } from './types';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<Section>(Section.HERO);

  const scrollToSection = (sectionId: Section) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  return (
    <div className="bg-void min-h-screen text-white font-sans selection:bg-accent selection:text-white">
      <Navigation activeSection={activeSection} onNavigate={scrollToSection} />
      
      <main>
        <Hero />
        <PerceptionSlider />
        <ProcessLayer />
        <LearningHub />
        <Photographers />
        <Manifesto />
      </main>

      <footer className="py-12 border-t border-white/10 text-center text-white/30 text-xs tracking-widest uppercase">
        <p className="mb-2">Commission #1 Submission</p>
        <p>Earth Rising Foundation © 2025</p>
      </footer>
    </div>
  );
};

export default App;