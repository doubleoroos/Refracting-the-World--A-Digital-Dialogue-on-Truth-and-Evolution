import React, { useState, useEffect } from 'react';
import { Section, Language } from '../types';
import { CONTENT } from '../constants';
import { Menu, X, Globe } from 'lucide-react';

interface NavigationProps {
  activeSection: Section;
  onNavigate: (section: Section) => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeSection, onNavigate, language, onLanguageChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id: Section) => {
    onNavigate(id);
    setIsOpen(false);
  };

  const items = CONTENT[language].nav;

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b border-white/10 ${
        scrolled ? 'bg-void/90 backdrop-blur-md py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div 
          className="font-serif text-xl tracking-widest cursor-pointer z-50"
          onClick={() => handleNavClick(Section.HERO)}
        >
          REFRACTING <span className="text-white/50">THE WORLD</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`text-sm uppercase tracking-widest transition-colors hover:text-white ${
                activeSection === item.id ? 'text-white border-b border-accent' : 'text-white/60'
              }`}
            >
              {item.label}
            </button>
          ))}
          
          {/* Language Toggle */}
          <div className="flex items-center gap-1 ml-4 border-l border-white/20 pl-6">
            <div className="bg-white/10 rounded-full p-1 flex">
              <button 
                onClick={() => onLanguageChange('en')}
                className={`px-3 py-1 rounded-full text-xs font-bold tracking-widest transition-all ${
                  language === 'en' 
                    ? 'bg-accent text-white shadow-md' 
                    : 'text-white/40 hover:text-white hover:bg-white/5'
                }`}
              >
                EN
              </button>
               <button 
                onClick={() => onLanguageChange('fr')}
                className={`px-3 py-1 rounded-full text-xs font-bold tracking-widest transition-all ${
                  language === 'fr' 
                    ? 'bg-accent text-white shadow-md' 
                    : 'text-white/40 hover:text-white hover:bg-white/5'
                }`}
              >
                FR
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-4 md:hidden z-50">
           <button 
              onClick={() => onLanguageChange(language === 'en' ? 'fr' : 'en')}
              className="text-white/80 font-bold text-xs flex items-center gap-1 bg-white/10 px-3 py-1 rounded-full"
            >
              <Globe size={14}/> {language.toUpperCase()}
            </button>

          <button 
            className="text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav Overlay */}
        <div className={`fixed inset-0 bg-void flex flex-col justify-center items-center gap-8 transition-transform duration-500 md:hidden ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
           {items.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`text-2xl font-serif italic transition-colors ${
                activeSection === item.id ? 'text-accent' : 'text-white/80'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;