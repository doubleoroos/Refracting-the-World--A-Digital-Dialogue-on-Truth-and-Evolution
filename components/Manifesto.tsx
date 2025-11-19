import React from 'react';
import { Section, Language } from '../types';
import { CONTENT } from '../constants';
import { CheckCircle, Globe, Leaf, Users, Calendar, TrendingUp, Flag } from 'lucide-react';

interface ManifestoProps {
  language: Language;
}

const Manifesto: React.FC<ManifestoProps> = ({ language }) => {
  const content = CONTENT[language].manifesto;

  return (
    <section id={Section.MANIFESTO} className="py-24 px-6 bg-paper text-void">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="mb-20 text-center">
          <h2 className="text-xs font-bold tracking-widest uppercase text-accent mb-4">{content.tag}</h2>
          <h3 className="text-3xl md:text-5xl font-serif mb-8 leading-tight">
            {content.title}
          </h3>
        </div>

        {/* Strategic Alignment Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          <div className="bg-white p-6 rounded-sm shadow-sm border border-black/5">
            <div className="w-10 h-10 bg-accent/10 flex items-center justify-center rounded-full mb-4">
              <Users className="text-accent" size={20} />
            </div>
            <h4 className="text-base font-bold mb-2">{content.cards.pool.title}</h4>
            <p className="text-xs text-void/70 leading-relaxed">
              {content.cards.pool.desc}
            </p>
          </div>

          <div className="bg-white p-6 rounded-sm shadow-sm border border-black/5">
            <div className="w-10 h-10 bg-accent/10 flex items-center justify-center rounded-full mb-4">
              <Leaf className="text-accent" size={20} />
            </div>
            <h4 className="text-base font-bold mb-2">{content.cards.eco.title}</h4>
            <p className="text-xs text-void/70 leading-relaxed">
              {content.cards.eco.desc}
            </p>
          </div>

          <div className="bg-white p-6 rounded-sm shadow-sm border border-black/5">
            <div className="w-10 h-10 bg-accent/10 flex items-center justify-center rounded-full mb-4">
              <Globe className="text-accent" size={20} />
            </div>
            <h4 className="text-base font-bold mb-2">{content.cards.access.title}</h4>
            <p className="text-xs text-void/70 leading-relaxed">
              {content.cards.access.desc}
            </p>
          </div>

          <div className="bg-white p-6 rounded-sm shadow-sm border border-black/5">
            <div className="w-10 h-10 bg-accent/10 flex items-center justify-center rounded-full mb-4">
              <CheckCircle className="text-accent" size={20} />
            </div>
            <h4 className="text-base font-bold mb-2">{content.cards.fair.title}</h4>
            <p className="text-xs text-void/70 leading-relaxed">
              {content.cards.fair.desc}
            </p>
          </div>
        </div>

        {/* Timeline & Budget Section */}
        <div className="grid md:grid-cols-2 gap-16">
          
          {/* Operational Timeline */}
          <div>
            <h4 className="flex items-center gap-2 text-xl font-serif mb-8 text-void/90">
              <Calendar className="text-accent" size={24} /> {content.timeline.title}
            </h4>
            <div className="space-y-8 border-l-2 border-black/10 pl-8 relative">
              {content.timeline.phases.map((item, i) => (
                <div key={i} className="relative">
                   <div className={`absolute -left-[41px] w-5 h-5 rounded-full border-4 border-paper ${item.current ? 'bg-accent' : 'bg-void/20'}`}></div>
                   <span className="text-xs font-bold uppercase tracking-widest text-accent block mb-1">{item.phase}: {item.dates}</span>
                   <h5 className="text-lg font-bold mb-1">{item.title}</h5>
                   <p className="text-sm text-void/60">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Budgetary Framework */}
          <div>
            <h4 className="flex items-center gap-2 text-xl font-serif mb-8 text-void/90">
              <TrendingUp className="text-accent" size={24} /> {content.budget.title}
            </h4>
            
            <div className="bg-white p-8 rounded-sm border border-black/5 shadow-sm mb-8">
              <h5 className="text-xs font-bold uppercase tracking-widest mb-6 text-void/40">{content.budget.allocationTitle}</h5>
              <ul className="space-y-4">
                {content.budget.items.map((expense, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    {expense}
                  </li>
                ))}
              </ul>
            </div>

             <div className="bg-void/5 p-8 rounded-sm border border-black/5">
              <h5 className="text-xs font-bold uppercase tracking-widest mb-6 text-void/40">{content.budget.incomeTitle}</h5>
               <ul className="space-y-4">
                {content.budget.income.map((inc, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    <Flag size={16} className="mt-0.5 opacity-50 min-w-[16px]"/>
                    <span>{inc}</span>
                  </li>
                ))}
               </ul>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Manifesto;