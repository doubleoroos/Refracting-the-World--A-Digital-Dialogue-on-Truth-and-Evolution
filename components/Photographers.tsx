import React from 'react';
import { Section, Language } from '../types';
import { PHOTOGRAPHERS, CONTENT } from '../constants';

interface PhotographersProps {
  language: Language;
}

const Photographers: React.FC<PhotographersProps> = ({ language }) => {
  const content = CONTENT[language].team;
  const photographers = PHOTOGRAPHERS[language];

  return (
    <section id={Section.TEAM} className="py-24 px-6 bg-void border-t border-white/5 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-void to-black pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-orange-500 uppercase tracking-widest text-xs font-bold mb-4">{content.tag}</h2>
          <h3 className="text-3xl md:text-5xl font-serif text-white mb-6 drop-shadow-lg">{content.title}</h3>
          <p className="text-white/50 mt-4 max-w-2xl mx-auto text-lg leading-relaxed font-light">
            {content.desc}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {photographers.map((photographer, idx) => (
            <div key={idx} className="group relative overflow-hidden bg-white/5 rounded-2xl border border-white/10 hover:border-accent/40 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.7)]">
              {/* Image */}
              <div className="aspect-[3/4] overflow-hidden bg-black relative">
                <div className="absolute inset-0 bg-gradient-to-t from-void via-void/40 to-transparent z-10 opacity-60 transition-opacity duration-500 group-hover:opacity-90"></div>
                <img 
                  src={photographer.image} 
                  alt={`Portrait of ${photographer.name}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-60"
                />
              </div>
              
              {/* Info */}
              <div className="p-6 relative z-20 bg-transparent h-full -mt-24 group-hover:-mt-32 transition-all duration-500 flex flex-col justify-end">
                <h4 className="text-xl font-serif text-white mb-1 group-hover:text-accent transition-colors">{photographer.name}</h4>
                <p className="text-white/60 text-[10px] uppercase tracking-widest font-bold mb-4">{photographer.role}</p>
                <div className="h-0 group-hover:h-auto overflow-hidden transition-all duration-500">
                    <p className="text-white/80 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 transform translate-y-4 group-hover:translate-y-0">
                    {photographer.bio}
                    </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Photographers;