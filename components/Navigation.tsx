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
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-void/70 backdrop-blur-xl py-4 border-b border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.5)]' 
          : 'bg-transparent py-6 border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <button 
          onClick={() => handleNavClick(Section.HERO)}
          className="font-serif text-lg md:text-xl tracking-[0.2em] cursor-pointer z-50 group focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded px-2"
          aria-label="Refracting the World - Home"
        >
          REFRACTING <span className="text-white/50 group-hover:text-white transition-colors duration-300">THE WORLD</span>
        </button>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          <ul className="flex items-center bg-white/5 backdrop-blur-2xl rounded-full p-1 border border-white/10 shadow-lg">
            {items.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleNavClick(item.id)}
                  aria-current={activeSection === item.id ? 'page' : undefined}
                  className={`relative text-[10px] uppercase tracking-widest px-5 py-2.5 rounded-full transition-all duration-300 font-bold focus:outline-none focus-visible:ring-2 focus-visible:ring-accent overflow-hidden group ${
                    activeSection === item.id 
                      ? 'bg-white text-void shadow-lg' 
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                   <span className="relative z-10">{item.label.split(':')[0]}</span>
                </button>
              </li>
            ))}
          </ul>
          
          {/* Language Toggle */}
          <div className="flex items-center gap-1 border-l border-white/10 pl-6 h-8">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-full p-1 flex shadow-lg" role="group" aria-label="Language Selection">
              <button 
                onClick={() => onLanguageChange('en')}
                aria-pressed={language === 'en'}
                className={`px-3 py-1 rounded-full text-[9px] font-bold tracking-widest transition-all focus:outline-none focus-visible:ring-1 focus-visible:ring-white ${
                  language === 'en' 
                    ? 'bg-accent text-white shadow-md' 
                    : 'text-white/50 hover:text-white hover:bg-white/5'
                }`}
              >
                EN
              </button>
               <button 
                onClick={() => onLanguageChange('fr')}
                aria-pressed={language === 'fr'}
                className={`px-3 py-1 rounded-full text-[9px] font-bold tracking-widest transition-all focus:outline-none focus-visible:ring-1 focus-visible:ring-white ${
                  language === 'fr' 
                    ? 'bg-accent text-white shadow-md' 
                    : 'text-white/50 hover:text-white hover:bg-white/5'
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
              className="text-white font-bold text-[10px] flex items-center gap-2 bg-white/5 backdrop-blur-md px-3 py-2 rounded-full border border-white/10 hover:bg-white/20 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              aria-label={`Switch language to ${language === 'en' ? 'French' : 'English'}`}
            >
              <Globe size={14}/> {language.toUpperCase()}
            </button>

          <button 
            className="text-white p-2 rounded-full hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent active:scale-95 duration-200"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-label="Toggle Navigation Menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav Overlay */}
        <div 
          className={`fixed inset-0 bg-void/95 backdrop-blur-2xl flex flex-col justify-center items-center gap-8 transition-all duration-500 md:hidden ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}
          aria-hidden={!isOpen}
        >
           {items.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              style={{ transitionDelay: `${idx * 50}ms` }}
              className={`text-2xl font-serif italic transition-all px-6 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transform ${
                isOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              } ${
                activeSection === item.id 
                  ? 'text-white font-medium scale-110' 
                  : 'text-white/40 hover:text-white'
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