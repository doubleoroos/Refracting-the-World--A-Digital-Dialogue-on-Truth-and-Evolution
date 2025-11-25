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
      setScrolled(window.scrollY > 20);
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
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b ${
        scrolled 
          ? 'bg-void/80 backdrop-blur-md py-4 border-white/10 shadow-2xl' 
          : 'bg-transparent py-6 border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div 
          className="font-serif text-xl tracking-widest cursor-pointer z-50 group"
          onClick={() => handleNavClick(Section.HERO)}
        >
          REFRACTING <span className="text-white/40 group-hover:text-white transition-colors">THE WORLD</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          <div className="flex items-center bg-black/20 backdrop-blur-sm rounded-full p-1 border border-white/5">
            {items.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-[11px] uppercase tracking-widest px-4 py-2 rounded-full transition-all duration-300 ${
                  activeSection === item.id 
                    ? 'bg-white text-void font-bold shadow-lg' 
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label.split(':')[0]} {/* Simplified label for cleaner UI */}
              </button>
            ))}
          </div>
          
          {/* Language Toggle */}
          <div className="flex items-center gap-1 ml-4 border-l border-white/10 pl-6">
            <div className="bg-white/5 border border-white/10 rounded-full p-1 flex">
              <button 
                onClick={() => onLanguageChange('en')}
                className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-widest transition-all ${
                  language === 'en' 
                    ? 'bg-accent text-white shadow-md' 
                    : 'text-white/40 hover:text-white hover:bg-white/5'
                }`}
              >
                EN
              </button>
               <button 
                onClick={() => onLanguageChange('fr')}
                className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-widest transition-all ${
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
              className="text-white/80 font-bold text-xs flex items-center gap-1 bg-white/10 px-3 py-1 rounded-full border border-white/10"
            >
              <Globe size={14}/> {language.toUpperCase()}
            </button>

          <button 
            className="text-white p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav Overlay */}
        <div className={`fixed inset-0 bg-void/95 backdrop-blur-xl flex flex-col justify-center items-center gap-8 transition-transform duration-500 md:hidden ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
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