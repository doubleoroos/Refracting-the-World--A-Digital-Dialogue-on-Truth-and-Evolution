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
      aria-label="Hero Section"
    >
      {/* Background Video/Image simulation with Ken Burns Effect */}
      <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
        <div className="absolute inset-0 bg-void/30 z-10"></div>
        {/* Cinematic Vignette Gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0a0a0a_90%)] z-20"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-void/40 z-20"></div>
        <img 
          src="https://picsum.photos/id/16/2500/1667" 
          alt="" 
          className="w-full h-full object-cover opacity-60 grayscale contrast-125 animate-subtle-zoom"
        />
      </div>

      <div className="relative z-30 text-center max-w-5xl px-6 flex flex-col items-center">
        
        {/* Top Tag */}
        <div className="mb-8 flex flex-col items-center gap-3 animate-fade-in opacity-0" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center gap-3">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-accent"></div>
              <span className="text-accent text-sm tracking-[0.3em] uppercase font-bold px-4 py-1.5 bg-black/40 backdrop-blur-md rounded-full border border-white/5 shadow-lg">
                {content.tag}
              </span>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-accent"></div>
            </div>
            <span className="text-white/60 text-xs tracking-widest uppercase font-mono border border-white/10 px-3 py-1.5 rounded-sm bg-white/5 backdrop-blur-sm">
              {content.dates}
            </span>
        </div>

        {/* Main Title - with subtle gradient text */}
        <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl mb-8 leading-[0.95] tracking-tight drop-shadow-2xl animate-fade-in opacity-0" style={{ animationDelay: '0.4s' }}>
          <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white to-white/80 font-medium">{content.title.split(' ').slice(0, 1)}</span>
          <span className="italic text-white/90 font-light">{content.title.split(' ').slice(1).join(' ')}</span>
        </h1>
        
        {/* Subtitle */}
        <h2 className="text-xl md:text-3xl text-white/80 font-light mb-12 tracking-wide max-w-3xl animate-fade-in opacity-0 drop-shadow-md" style={{ animationDelay: '0.6s' }}>
            {content.subtitle}
        </h2>

        {/* Intro Text - Frosted Glass Box */}
        <div className="relative max-w-2xl mx-auto animate-fade-in opacity-0 bg-white/5 backdrop-blur-xl p-8 rounded-2xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]" style={{ animationDelay: '0.8s' }}>
           <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-accent to-transparent rounded-l-2xl"></div>
           <p className="text-lg text-white/90 font-light leading-relaxed text-left">
             {content.intro}
           </p>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <button 
        onClick={() => {
          document.getElementById(Section.PILLAR_1)?.scrollIntoView({ behavior: 'smooth' });
        }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-white/50 hover:text-white transition-colors text-xs uppercase tracking-widest animate-bounce z-30 p-4 rounded-full focus:outline-none focus:ring-2 focus:ring-accent"
        aria-label="Scroll to next section"
      >
        <span>{content.cta}</span>
        <ArrowDown size={20} className="drop-shadow-lg" />
      </button>
    </section>
  );
};

export default Hero;