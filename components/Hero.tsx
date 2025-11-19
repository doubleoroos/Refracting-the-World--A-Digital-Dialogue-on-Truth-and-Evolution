import React from 'react';
import { Section, Language } from '../types';
import { CONTENT } from '../constants';

interface HeroProps {
  language: Language;
}

const Hero: React.FC<HeroProps> = ({ language }) => {
  const content = CONTENT[language].hero;

  return (
    <section 
      id={Section.HERO} 
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Video/Image simulation */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://picsum.photos/id/16/2500/1667" 
          alt="Abstract Horizon" 
          className="w-full h-full object-cover opacity-40 grayscale contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-void via-transparent to-void"></div>
      </div>

      <div className="relative z-10 text-center max-w-5xl px-6">
        <div className="mb-6 flex flex-col items-center gap-2">
            <span className="px-3 py-1 border border-accent/50 text-accent text-xs tracking-[0.2em] uppercase rounded-full bg-accent/10 backdrop-blur-md">
            {content.tag}
            </span>
            <span className="text-white/40 text-xs tracking-widest uppercase font-light">
            {content.dates}
            </span>
        </div>

        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl mb-6 leading-tight drop-shadow-lg">
          {content.title.split(' ').slice(0, 1)}<br/>
          <span className="italic text-white/80">{content.title.split(' ').slice(1).join(' ')}</span>
        </h1>
        
        <h2 className="text-xl md:text-2xl text-white font-light mb-8 tracking-wide">
            {content.subtitle}
        </h2>

        <p className="text-base md:text-lg text-white/60 font-light leading-relaxed max-w-3xl mx-auto border-l-2 border-accent pl-6 text-left">
          {content.intro}
        </p>
      </div>
      
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 text-xs uppercase tracking-widest animate-bounce">
        <span>{content.cta}</span>
        <div className="w-px h-12 bg-white/30"></div>
      </div>
    </section>
  );
};

export default Hero;