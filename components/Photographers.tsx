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
    <section id={Section.TEAM} className="py-24 px-6 bg-void border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-accent uppercase tracking-widest text-xs font-bold mb-4">{content.tag}</h2>
          <h3 className="text-3xl md:text-4xl font-serif text-white">{content.title}</h3>
          <p className="text-white/40 mt-4 max-w-2xl mx-auto">
            {content.desc}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {photographers.map((photographer, idx) => (
            <div key={idx} className="group relative overflow-hidden bg-white/5 rounded-sm border border-white/5 hover:border-accent/50 transition-colors">
              {/* Image */}
              <div className="aspect-[3/4] overflow-hidden">
                <img 
                  src={photographer.image} 
                  alt={photographer.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
                />
              </div>
              
              {/* Info */}
              <div className="p-6 relative z-10 bg-void">
                <h4 className="text-lg font-serif text-white mb-1">{photographer.name}</h4>
                <p className="text-accent text-[10px] uppercase tracking-widest mb-3">{photographer.role}</p>
                <p className="text-white/60 text-xs leading-relaxed">
                  {photographer.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Photographers;