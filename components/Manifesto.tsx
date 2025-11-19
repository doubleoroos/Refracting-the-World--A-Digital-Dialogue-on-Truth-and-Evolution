import React from 'react';
import { Section } from '../types';
import { CheckCircle, Globe, Leaf, Users, Calendar, TrendingUp, Flag } from 'lucide-react';

const Manifesto: React.FC = () => {
  return (
    <section id={Section.MANIFESTO} className="py-24 px-6 bg-paper text-void">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="mb-20 text-center">
          <h2 className="text-xs font-bold tracking-widest uppercase text-accent mb-4">Strategic Alignment & Roadmap</h2>
          <h3 className="text-3xl md:text-5xl font-serif mb-8 leading-tight">
            A framework for <span className="italic text-accent">impact & viability</span>.
          </h3>
        </div>

        {/* Strategic Alignment Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          <div className="bg-white p-6 rounded-sm shadow-sm border border-black/5">
            <div className="w-10 h-10 bg-accent/10 flex items-center justify-center rounded-full mb-4">
              <Users className="text-accent" size={20} />
            </div>
            <h4 className="text-base font-bold mb-2">Resource Pooling</h4>
            <p className="text-xs text-void/70 leading-relaxed">
              Consolidating efforts of independent artists into one high-impact platform to minimize administrative overhead for the Ministry.
            </p>
          </div>

          <div className="bg-white p-6 rounded-sm shadow-sm border border-black/5">
            <div className="w-10 h-10 bg-accent/10 flex items-center justify-center rounded-full mb-4">
              <Leaf className="text-accent" size={20} />
            </div>
            <h4 className="text-base font-bold mb-2">Eco-Responsibility</h4>
            <p className="text-xs text-void/70 leading-relaxed">
              "Zero Waste" by design. Green hosting on renewable energy servers. A carbon-neutral alternative to physical festivals.
            </p>
          </div>

          <div className="bg-white p-6 rounded-sm shadow-sm border border-black/5">
            <div className="w-10 h-10 bg-accent/10 flex items-center justify-center rounded-full mb-4">
              <Globe className="text-accent" size={20} />
            </div>
            <h4 className="text-base font-bold mb-2">Accessibility (WCAG 2.1)</h4>
            <p className="text-xs text-void/70 leading-relaxed">
              Audited for high-contrast modes and screen readers. Free global access to remove financial barriers to culture.
            </p>
          </div>

          <div className="bg-white p-6 rounded-sm shadow-sm border border-black/5">
            <div className="w-10 h-10 bg-accent/10 flex items-center justify-center rounded-full mb-4">
              <CheckCircle className="text-accent" size={20} />
            </div>
            <h4 className="text-base font-bold mb-2">Fair Remuneration</h4>
            <p className="text-xs text-void/70 leading-relaxed">
              Adhering to the "Fair Practice Code". Budgeted fees for artist copyright, curation, and educational contributions.
            </p>
          </div>
        </div>

        {/* Timeline & Budget Section */}
        <div className="grid md:grid-cols-2 gap-16">
          
          {/* Operational Timeline */}
          <div>
            <h4 className="flex items-center gap-2 text-xl font-serif mb-8 text-void/90">
              <Calendar className="text-accent" size={24} /> Operational Timeline
            </h4>
            <div className="space-y-8 border-l-2 border-black/10 pl-8 relative">
              {[
                { phase: "Phase 1", dates: "Jan 2026 – March 2026", title: "Curation & Agreements", desc: "Selection of final 20 'Key Works' & Partner agreements." },
                { phase: "Phase 2", dates: "April 2026 – July 2026", title: "Development & Design", desc: "UX/UI design, WCAG audit, Educational copy (FR/EN)." },
                { phase: "Phase 3", dates: "August 2026", title: "Testing & Pre-launch", desc: "Beta testing with educators & Green Hosting setup." },
                { phase: "Phase 4", dates: "September 2026", title: "Official Launch", desc: "Go-live to coincide with Bicentennial start.", current: true },
                { phase: "Phase 5", dates: "Sept 2026 – Sept 2027", title: "Dissemination", desc: "Monthly artist features & social media campaign." },
              ].map((item, i) => (
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
              <TrendingUp className="text-accent" size={24} /> Budgetary Framework
            </h4>
            
            <div className="bg-white p-8 rounded-sm border border-black/5 shadow-sm mb-8">
              <h5 className="text-xs font-bold uppercase tracking-widest mb-6 text-void/40">Allocation of Resources</h5>
              <ul className="space-y-4">
                {[
                  "Artistic Production (Fees & Copyright)",
                  "Technical Development (Web Arch & Accessibility)",
                  "Editorial & Education (Translation & PDF Kits)",
                  "Project Management (Earth Rising)",
                  "Marketing (Digital Promotion)"
                ].map((expense, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    {expense}
                  </li>
                ))}
              </ul>
            </div>

             <div className="bg-void/5 p-8 rounded-sm border border-black/5">
              <h5 className="text-xs font-bold uppercase tracking-widest mb-6 text-void/40">Income Sources</h5>
               <ul className="space-y-4">
                <li className="flex items-start gap-3 text-sm">
                  <Flag size={16} className="mt-0.5 opacity-50"/>
                  <span><strong>Own Contributions:</strong> Earth Rising Foundation (Management & Overhead)</span>
                </li>
                 <li className="flex items-start gap-3 text-sm">
                  <Flag size={16} className="mt-0.5 opacity-50"/>
                  <span><strong>Grants:</strong> Dutch Cultural Funds</span>
                </li>
                 <li className="flex items-start gap-3 text-sm">
                  <Flag size={16} className="mt-0.5 opacity-50"/>
                  <span><strong>In-Kind:</strong> Technical partnerships</span>
                </li>
               </ul>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Manifesto;