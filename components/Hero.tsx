import React from 'react';
import { Section, Language } from '../types';
import { CONTENT } from '../constants';
import { ArrowDown } from 'lucide-react';

interface HeroProps {
  language: Language;
}

const Hero: React.FC<HeroProps> = ({ language }) => {
  const content = CONTENT[language].hero;

  return (
    <section 
      id={Section.HERO} 
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-void py-12 md:py-20"
      aria-label="Hero Section"
    >
      {/* Background Video/Image simulation with Ken Burns Effect */}
      <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
        <div className="absolute inset-0 bg-void/30 z-10"></div>
        {/* Cinematic Vignette Gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0a0a0a_90%)] z-20"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-void/20 z-20"></div>
        <img 
          src="https://images.unsplash.com/photo-1504333638930-c8787321eee0?q=80&w=2500&auto=format&fit=crop" 
          alt="Abstract light refraction" 
          className="w-full h-full object-cover opacity-60 grayscale contrast-125 animate-subtle-zoom"
        />
      </div>

      <div className="relative z-30 text-center max-w-5xl px-6 flex flex-col items-center justify-center flex-grow">
        
        {/* Top Tag */}
        <div className="mb-6 flex flex-col items-center gap-3 animate-fade-in opacity-0" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center gap-3">
              <div className="h-px w-8 md:w-12 bg-gradient-to-r from-transparent to-accent"></div>
              <span className="text-accent text-[10px] md:text-xs tracking-[0.3em] uppercase font-bold px-4 py-1.5 bg-black/60 backdrop-blur-md rounded-full border border-white/5 shadow-lg">
                {content.tag}
              </span>
              <div className="h-px w-8 md:w-12 bg-gradient-to-l from-transparent to-accent"></div>
            </div>
            <span className="text-white/60 text-[9px] md:text-[10px] tracking-[0.2em] uppercase font-mono border border-white/10 px-3 py-1 rounded-full bg-white/5 backdrop-blur-sm">
              {content.dates}
            </span>
        </div>

        {/* Main Title - with subtle gradient text */}
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl mb-6 leading-[0.95] tracking-tight drop-shadow-2xl animate-fade-in opacity-0" style={{ animationDelay: '0.4s' }}>
          <span className="block text-white font-medium drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]">{content.title.split(' ').slice(0, 1)}</span>
          <span className="italic text-white/80 font-light drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]">{content.title.split(' ').slice(1).join(' ')}</span>
        </h1>
        
        {/* Subtitle */}
        <h2 className="text-lg md:text-2xl text-white/90 font-light mb-8 tracking-wide max-w-3xl animate-fade-in opacity-0 drop-shadow-md" style={{ animationDelay: '0.6s' }}>
            {content.subtitle}
        </h2>

        {/* Intro Text - Frosted Glass Box */}
        <div className="relative max-w-xl mx-auto animate-fade-in opacity-0 bg-white/5 backdrop-blur-xl p-6 md:p-8 rounded-2xl border border-white/10 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)] ring-1 ring-white/5" style={{ animationDelay: '0.8s' }}>
           <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-accent to-transparent rounded-l-2xl opacity-80"></div>
           <p className="text-base md:text-lg text-white/90 font-light leading-relaxed text-left">
             {content.intro}
           </p>
        </div>

        {/* Scroll Indicator - Flow Layout */}
        <div className="mt-8 animate-fade-in opacity-0" style={{ animationDelay: '1.2s' }}>
          <button 
            onClick={() => {
              document.getElementById(Section.PILLAR_1)?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="flex flex-col items-center gap-2 text-white/50 hover:text-white transition-all duration-300 text-[9px] uppercase tracking-[0.3em] font-bold animate-bounce p-2 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-accent group"
            aria-label="Scroll to next section"
          >
            <span className="group-hover:text-accent transition-colors">{content.cta}</span>
            <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center bg-white/5 backdrop-blur-sm group-hover:border-accent group-hover:bg-accent/10 transition-colors">
              <ArrowDown size={14} className="text-white group-hover:text-accent transition-colors" />
            </div>
          </button>
        </div>

      </div>
      
    </section>
  );
};

export default Hero;