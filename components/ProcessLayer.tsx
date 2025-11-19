import React, { useState } from 'react';
import { Section, Language } from '../types';
import { CONTENT } from '../constants';
import { Layers, Cpu, Sun } from 'lucide-react';

interface ProcessLayerProps {
  language: Language;
}

const ProcessLayer: React.FC<ProcessLayerProps> = ({ language }) => {
  const [activeLayer, setActiveLayer] = useState<'final' | 'digital' | 'physics'>('final');

  const content = CONTENT[language].pillarB;
  
  // We construct the layers map inside the component to access localized strings
  const layers = {
    final: {
      ...content.layers.output,
      imageClass: 'grayscale-0 blur-0'
    },
    digital: {
      ...content.layers.darkroom,
      imageClass: 'invert hue-rotate-180 contrast-150 opacity-80'
    },
    physics: {
      ...content.layers.physics,
      imageClass: 'grayscale contrast-75 brightness-75 sepia-[.3]'
    }
  };

  return (
    <section id={Section.PILLAR_2} className="py-24 px-6 md:px-12 bg-paper text-void relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16">
        
        {/* Interactive Display */}
        <div className="order-1 relative group">
           <div className="relative w-full aspect-[4/5] overflow-hidden rounded-sm shadow-2xl bg-void">
              <img 
                src="https://picsum.photos/id/103/800/1000" 
                alt="Process Subject"
                className={`w-full h-full object-cover transition-all duration-700 ease-in-out ${layers[activeLayer].imageClass}`}
              />
              
              {/* Digital Overlay for Meta Layer */}
              {activeLayer === 'digital' && (
                <div className="absolute inset-0 p-8 font-mono text-xs text-green-500/70 overflow-hidden pointer-events-none mix-blend-hard-light">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <div key={i} className="whitespace-nowrap opacity-50">
                      {`0x${Math.random().toString(16).substr(2, 8)} :: PROCESSING_LAYER :: ADOBE_RGB_${Math.random().toFixed(2)}`}
                    </div>
                  ))}
                  <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 border border-green-500/20">
                    {Array.from({length: 36}).map((_, i) => (
                        <div key={i} className="border border-green-500/10"></div>
                    ))}
                  </div>
                </div>
              )}

              {/* Layer Controls */}
              <div className="absolute bottom-6 left-6 right-6 flex gap-2">
                {(Object.keys(layers) as Array<keyof typeof layers>).reverse().map((layerKey) => (
                  <button
                    key={layerKey}
                    onClick={() => setActiveLayer(layerKey)}
                    className={`flex-1 py-3 text-xs uppercase tracking-widest font-medium transition-all backdrop-blur-md border border-white/20
                      ${activeLayer === layerKey 
                        ? 'bg-accent text-white border-accent' 
                        : 'bg-white/20 text-white hover:bg-white/30'}`}
                  >
                    {layers[layerKey].label}
                  </button>
                ))}
              </div>
           </div>
        </div>

        {/* Text Content */}
        <div className="order-2 flex flex-col justify-center">
           <div className="flex items-center gap-4 mb-6">
            <span className="text-6xl text-void/10 font-serif font-bold">B</span>
            <h3 className="text-accent tracking-widest uppercase text-sm font-medium">{content.tag}</h3>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif italic mb-8">{content.title}</h2>
          
          <p className="text-void/80 leading-relaxed mb-6 text-lg">
            {content.description}
          </p>

          <div className="space-y-6">
            <div className={`transition-all duration-500 ${activeLayer === 'final' ? 'opacity-100 translate-x-0' : 'opacity-30 translate-x-4'}`}>
               <h4 className="font-bold text-xl mb-2 flex items-center gap-2"><Layers size={18}/> {content.layers.output.label}</h4>
               <p className="text-void/70 text-sm">{content.layers.output.desc}</p>
            </div>

            <div className={`transition-all duration-500 ${activeLayer === 'digital' ? 'opacity-100 translate-x-0' : 'opacity-30 translate-x-4'}`}>
               <h4 className="font-bold text-xl mb-2 flex items-center gap-2"><Cpu size={18}/> {content.layers.darkroom.label}</h4>
               <p className="text-void/70 text-sm">{content.layers.darkroom.desc}</p>
            </div>

            <div className={`transition-all duration-500 ${activeLayer === 'physics' ? 'opacity-100 translate-x-0' : 'opacity-30 translate-x-4'}`}>
               <h4 className="font-bold text-xl mb-2 flex items-center gap-2"><Sun size={18}/> {content.layers.physics.label}</h4>
               <p className="text-void/70 text-sm">{content.layers.physics.desc}</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ProcessLayer;