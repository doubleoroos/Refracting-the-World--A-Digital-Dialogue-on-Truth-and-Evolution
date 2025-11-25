import React, { useState } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import PerceptionSlider from './components/PerceptionSlider';
import ProcessLayer from './components/ProcessLayer';
import LearningHub from './components/LearningHub';
import Manifesto from './components/Manifesto';
import Photographers from './components/Photographers';
import { Section, Language } from './types';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<Section>(Section.HERO);
  const [language, setLanguage] = useState<Language>('en');

  const scrollToSection = (sectionId: Section) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  return (
    <div className="bg-void min-h-screen text-white font-sans selection:bg-accent selection:text-white">
      <Navigation 
        activeSection={activeSection} 
        onNavigate={scrollToSection} 
        language={language}
        onLanguageChange={setLanguage}
      />
      
      <main>
        <Hero language={language} />
        <PerceptionSlider language={language} />
        <ProcessLayer language={language} />
        <LearningHub language={language} />
        <Photographers language={language} />
        <Manifesto language={language} />
      </main>

      <footer className="py-12 border-t border-white/10 text-center text-white/30 text-xs tracking-widest uppercase">
        <p className="mb-2">{language === 'en' ? 'Commission #1 Submission' : 'Soumission Commission n°1'}</p>
        <p>Foundation Earth Rising © 2025</p>
      </footer>
    </div>
  );
};

export default App;