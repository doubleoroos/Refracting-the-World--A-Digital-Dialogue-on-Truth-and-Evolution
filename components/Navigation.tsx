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
      role="navigation"
      aria-label="Main Navigation"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 border-b ${
        scrolled 
          ? 'bg-void/60 backdrop-blur-xl py-4 border-white/5 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]' 
          : 'bg-transparent py-6 border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <button 
          onClick={() => handleNavClick(Section.HERO)}
          className="font-serif text-xl tracking-widest cursor-pointer z-50 group focus:outline-none"
          aria-label="Refracting the World - Home"
        >
          REFRACTING <span className="text-white/60 group-hover:text-white transition-colors">THE WORLD</span>
        </button>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-2">
          <ul className="flex items-center bg-white/5 backdrop-blur-md rounded-full p-1 border border-white/10 shadow-lg">
            {items.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleNavClick(item.id)}
                  aria-current={activeSection === item.id ? 'page' : undefined}
                  className={`text-[11px] uppercase tracking-widest px-5 py-2.5 rounded-full transition-all duration-500 font-medium focus:outline-none ${
                    activeSection === item.id 
                      ? 'bg-white text-void font-bold shadow-lg ring-1 ring-white/50' 
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.label.split(':')[0]} 
                </button>
              </li>
            ))}
          </ul>
          
          {/* Language Toggle */}
          <div className="flex items-center gap-1 ml-4 border-l border-white/10 pl-6">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-full p-1 flex shadow-lg" role="group" aria-label="Language Selection">
              <button 
                onClick={() => onLanguageChange('en')}
                aria-pressed={language === 'en'}
                className={`px-4 py-1.5 rounded-full text-[10px] font-bold tracking-widest transition-all focus:outline-none ${
                  language === 'en' 
                    ? 'bg-gradient-to-r from-accent to-orange-600 text-white shadow-md' 
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                EN
              </button>
               <button 
                onClick={() => onLanguageChange('fr')}
                aria-pressed={language === 'fr'}
                className={`px-4 py-1.5 rounded-full text-[10px] font-bold tracking-widest transition-all focus:outline-none ${
                  language === 'fr' 
                    ? 'bg-gradient-to-r from-accent to-orange-600 text-white shadow-md' 
                    : 'text-white/60 hover:text-white hover:bg-white/5'
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
              className="text-white font-bold text-xs flex items-center gap-2 bg-white/5 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 hover:bg-white/20 transition-colors"
              aria-label={`Switch language to ${language === 'en' ? 'French' : 'English'}`}
            >
              <Globe size={16}/> {language.toUpperCase()}
            </button>

          <button 
            className="text-white p-2 rounded-full hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-accent"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-label="Toggle Navigation Menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Nav Overlay */}
        <div 
          className={`fixed inset-0 bg-void/95 backdrop-blur-2xl flex flex-col justify-center items-center gap-8 transition-all duration-500 md:hidden ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}
          aria-hidden={!isOpen}
        >
           {items.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`text-2xl font-serif italic transition-all px-6 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent ${
                activeSection === item.id 
                  ? 'text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60 font-medium scale-110' 
                  : 'text-white/50 hover:text-white'
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