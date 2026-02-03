import React, { useState } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import PerceptionSlider from './components/PerceptionSlider';
import ProcessLayer from './components/ProcessLayer';
import LearningHub from './components/LearningHub';
import Manifesto from './components/Manifesto';
import Photographers from './components/Photographers';
import { Section, Language } from './types';
import { Download } from 'lucide-react';

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

      <footer className="py-12 border-t border-white/10 text-center text-white/30 text-xs tracking-widest uppercase relative z-10 bg-void">
        <div className="flex flex-col items-center gap-8 mb-8 print-hidden">
          <button 
            onClick={() => window.print()}
            className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all group focus:outline-none focus:ring-2 focus:ring-accent hover:border-white/20 hover:shadow-lg hover:-translate-y-1"
            aria-label={language === 'fr' ? 'Imprimer / Enregistrer en PDF' : 'Print / Save as PDF'}
          >
            <Download size={16} className="text-accent group-hover:scale-110 transition-transform"/>
            <span className="font-bold text-white/70 group-hover:text-white">
              {language === 'fr' ? 'Télécharger le Dossier PDF' : 'Download PDF Dossier'}
            </span>
          </button>
        </div>

        <div>
          <p className="mb-2">{language === 'en' ? 'Commission #1 Submission' : 'Soumission Commission n°1'}</p>
          <p>Foundation Earth Rising © 2025</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
