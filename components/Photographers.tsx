
import React, { useState } from 'react';
import { Section, Language } from '../types';
import { PHOTOGRAPHERS, CONTENT } from '../constants';
import { Plus, Minus } from 'lucide-react';

interface PhotographersProps {
  language: Language;
}

const Photographers: React.FC<PhotographersProps> = ({ language }) => {
  const content = CONTENT[language].team;
  const photographers = PHOTOGRAPHERS[language];
  const [activePhotographer, setActivePhotographer] = useState<number | null>(null);

  const togglePhotographer = (idx: number) => {
    setActivePhotographer(activePhotographer === idx ? null : idx);
  };

  return (
    <section id={Section.TEAM} className="py-24 px-6 bg-void border-t border-white/5 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-void to-black pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-orange-500 uppercase tracking-widest text-xs font-bold mb-4">{content.tag}</h2>
          <h3 className="text-3xl md:text-5xl font-serif text-white mb-6 drop-shadow-lg">{content.title}</h3>
          
          <div className="max-w-3xl mx-auto">
            <p className="text-white/50 text-lg leading-relaxed font-light mb-8">
              {content.desc}
            </p>
            {/* Added names back to the header section */}
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-2">
              {photographers.map((p, i) => (
                <span key={i} className="text-white/80 font-serif italic text-sm md:text-base border-b border-accent/30 pb-0.5">
                  {p.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {photographers.map((photographer, idx) => {
            const isActive = activePhotographer === idx;
            const isInactive = activePhotographer !== null && !isActive;

            return (
              <button 
                key={idx} 
                onClick={() => togglePhotographer(idx)}
                className={`group relative overflow-hidden bg-white/5 rounded-2xl border transition-all duration-700 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-accent w-full h-[500px]
                  ${isActive 
                    ? 'border-accent/50 shadow-[0_0_30px_-5px_rgba(217,70,37,0.3)] scale-[1.02] z-10' 
                    : 'border-white/10 hover:border-white/30 hover:-translate-y-2'
                  }
                  ${isInactive ? 'opacity-40 grayscale blur-[1px]' : 'opacity-100'}
                `}
                aria-expanded={isActive}
              >
                {/* Image */}
                <div className="absolute inset-0 bg-black">
                  <div className={`absolute inset-0 bg-gradient-to-t from-void via-void/40 to-transparent z-10 transition-opacity duration-700 ${isActive ? 'opacity-80' : 'opacity-60 group-hover:opacity-40'}`}></div>
                  <img 
                    src={photographer.image} 
                    alt={`Portrait of ${photographer.name}`}
                    className={`w-full h-full object-cover transition-all duration-1000 
                      ${isActive ? 'grayscale-0 scale-105' : 'grayscale group-hover:grayscale-[50%] scale-100'}
                    `}
                  />
                </div>
                
                {/* Interaction Indicator */}
                <div className={`absolute top-4 right-4 z-20 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md border border-white/20 transition-all duration-300 ${isActive ? 'bg-accent text-white rotate-0' : 'bg-black/30 text-white/50 group-hover:bg-white/10 group-hover:text-white'}`}>
                    {isActive ? <Minus size={14} /> : <Plus size={14} />}
                </div>

                {/* Info Container */}
                <div className="absolute bottom-0 left-0 right-0 p-6 z-20 flex flex-col justify-end h-full">
                  <div className={`transition-all duration-500 transform ${isActive ? 'translate-y-0' : 'translate-y-[calc(100%-80px)]'}`}>
                    
                    {/* Header Info */}
                    <div className="mb-4">
                       <h4 className={`text-xl font-serif mb-1 transition-colors duration-300 ${isActive ? 'text-accent' : 'text-white'}`}>
                         {photographer.name}
                       </h4>
                       <p className="text-white/60 text-[10px] uppercase tracking-widest font-bold">
                         {photographer.role}
                       </p>
                    </div>

                    {/* Bio Description - Revealed on Click */}
                    <div className={`overflow-hidden transition-all duration-700 ease-in-out ${isActive ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'}`}>
                        <div className="w-8 h-0.5 bg-accent/50 mb-4"></div>
                        <p className="text-white/90 text-sm leading-relaxed font-light drop-shadow-md">
                        {photographer.bio}
                        </p>
                    </div>

                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Photographers;
