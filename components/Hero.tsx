import React from 'react';
import { Section } from '../types';

const Hero: React.FC = () => {
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
            Project Proposal · Bicentennial of Photography
            </span>
            <span className="text-white/40 text-xs tracking-widest uppercase font-light">
            Sept 1, 2026 – Sept 1, 2027
            </span>
        </div>

        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl mb-6 leading-tight mix-blend-screen">
          Refracting<br/>
          <span className="italic text-white/80">the World</span>
        </h1>
        
        <h2 className="text-xl md:text-2xl text-white font-light mb-8 tracking-wide">
            A Digital Dialogue on Truth and Evolution
        </h2>

        <p className="text-base md:text-lg text-white/60 font-light leading-relaxed max-w-3xl mx-auto border-l-2 border-accent pl-6 text-left">
          Submitted by <strong>Earth Rising Foundation</strong>.<br/><br/>
          In the age of AI and deep-fakes, the "Utopia of Accuracy" is fractured. 
          We invite you to deconstruct 200 years of seeing.
        </p>
      </div>
      
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 text-xs uppercase tracking-widest animate-bounce">
        <span>Start the Dialogue</span>
        <div className="w-px h-12 bg-white/30"></div>
      </div>
    </section>
  );
};

export default Hero;