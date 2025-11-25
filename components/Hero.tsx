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
      className="relative h-screen flex items-center justify-center overflow-hidden bg-void"
    >
      {/* Background Video/Image simulation with Ken Burns Effect */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-void/40 z-10 mix-blend-multiply"></div>
        <img 
          src="https://picsum.photos/id/16/2500/1667" 
          alt="Abstract Horizon" 
          className="w-full h-full object-cover opacity-60 grayscale contrast-125 animate-subtle-zoom"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-void z-20"></div>
      </div>

      <div className="relative z-30 text-center max-w-5xl px-6 flex flex-col items-center">
        
        {/* Top Tag */}
        <div className="mb-8 flex flex-col items-center gap-3 animate-fade-in opacity-0" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center gap-3">
              <div className="h-px w-8 bg-accent/50"></div>
              <span className="text-accent text-xs tracking-[0.3em] uppercase font-bold">
                {content.tag}
              </span>
              <div className="h-px w-8 bg-accent/50"></div>
            </div>
            <span className="text-white/40 text-[10px] tracking-widest uppercase font-mono border border-white/10 px-2 py-1 rounded-sm">
              {content.dates}
            </span>
        </div>

        {/* Main Title */}
        <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl mb-6 leading-[0.9] tracking-tight drop-shadow-2xl animate-fade-in opacity-0" style={{ animationDelay: '0.4s' }}>
          <span className="block text-white mix-blend-overlay">{content.title.split(' ').slice(0, 1)}</span>
          <span className="italic text-white/90 font-light">{content.title.split(' ').slice(1).join(' ')}</span>
        </h1>
        
        {/* Subtitle */}
        <h2 className="text-lg md:text-2xl text-white/80 font-light mb-10 tracking-wide max-w-2xl animate-fade-in opacity-0" style={{ animationDelay: '0.6s' }}>
            {content.subtitle}
        </h2>

        {/* Intro Text */}
        <div className="relative max-w-2xl mx-auto animate-fade-in opacity-0" style={{ animationDelay: '0.8s' }}>
           <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent to-transparent"></div>
           <p className="text-base text-white/60 font-light leading-relaxed pl-8 text-left">
             {content.intro}
           </p>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-white/30 text-[10px] uppercase tracking-widest animate-pulse z-30">
        <span>{content.cta}</span>
        <ArrowDown size={16} />
      </div>
    </section>
  );
};

export default Hero;