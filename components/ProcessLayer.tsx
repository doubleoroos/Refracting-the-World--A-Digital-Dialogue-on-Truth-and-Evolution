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
  
  const layers = {
    final: {
      ...content.layers.output,
      icon: Layers,
      imageClass: 'grayscale-0 blur-0'
    },
    digital: {
      ...content.layers.darkroom,
      icon: Cpu,
      imageClass: 'invert hue-rotate-180 contrast-150 opacity-80'
    },
    physics: {
      ...content.layers.physics,
      icon: Sun,
      imageClass: 'grayscale contrast-150 brightness-50 sepia-[.8]'
    }
  };

  return (
    <section id={Section.PILLAR_2} className="py-24 px-6 md:px-12 bg-paper relative overflow-hidden">
      {/* Decorative Gradient Orbs */}
      <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-accent/5 rounded-full blur-[120px] pointer-events-none mix-blend-multiply"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none mix-blend-multiply"></div>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24 items-center relative z-10">
        
        {/* Interactive Display */}
        <div className="order-1 relative group perspective-[1000px]">
           {/* Frame */}
           <div className="relative w-full aspect-[4/5] bg-white p-2 rounded-2xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] ring-1 ring-black/5 transform transition-transform duration-700 hover:rotate-y-2 hover:scale-[1.01]">
              <div className="relative w-full h-full overflow-hidden bg-void rounded-xl">
                  
                  {/* Base Image */}
                  <img 
                    src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1000&auto=format&fit=crop" 
                    alt="Subject for layer analysis"
                    className={`w-full h-full object-cover transition-all duration-1000 ease-in-out ${layers[activeLayer].imageClass}`}
                  />
                  
                  {/* Digital Overlay Layer */}
                  <div 
                    className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${activeLayer === 'digital' ? 'opacity-100' : 'opacity-0'}`}
                    aria-hidden="true"
                  >
                    <div className="absolute inset-0 p-6 font-mono text-[10px] text-green-400 font-bold overflow-hidden mix-blend-screen flex flex-col justify-between">
                       <div className="flex justify-between border-b border-green-500/50 pb-2 bg-black/40 backdrop-blur-sm p-2 rounded">
                          <span>// RAW_SENSOR_DATA</span>
                          <span>ISO_3200</span>
                       </div>
                       <div className="grid grid-cols-4 gap-1 opacity-40 my-auto">
                          {Array.from({ length: 16 }).map((_, i) => (
                             <div key={i} className="aspect-square border border-green-500/50"></div>
                          ))}
                       </div>
                    </div>
                  </div>

                  {/* Physics Overlay Layer */}
                  <div 
                    className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${activeLayer === 'physics' ? 'opacity-100' : 'opacity-0'}`}
                    aria-hidden="true"
                  >
                     <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/20 to-transparent"></div>
                     <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-32 h-32 border-2 border-white rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.3)]">
                           <div className="w-4 h-4 bg-white rounded-full animate-pulse shadow-[0_0_20px_white]"></div>
                        </div>
                     </div>
                  </div>

                  {/* Layer Toggle - Floating Glass Dock */}
                  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex bg-black/80 backdrop-blur-2xl border border-white/10 rounded-full p-2 gap-2 shadow-2xl z-20 ring-1 ring-white/10">
                    {(Object.keys(layers) as Array<keyof typeof layers>).reverse().map((layerKey) => {
                      const LayerIcon = layers[layerKey].icon;
                      return (
                        <button
                          key={layerKey}
                          onClick={() => setActiveLayer(layerKey)}
                          aria-pressed={activeLayer === layerKey}
                          className={`relative px-6 py-3 rounded-full flex items-center gap-2 text-[9px] uppercase tracking-widest font-bold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-accent
                            ${activeLayer === layerKey 
                              ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.4)] scale-105' 
                              : 'text-white/60 hover:text-white hover:bg-white/10'}`}
                        >
                          <LayerIcon size={14} aria-hidden="true" />
                          <span className="hidden sm:inline">{layers[layerKey].label}</span>
                        </button>
                      );
                    })}
                  </div>
              </div>
           </div>
        </div>

        {/* Text Content */}
        <div className="order-2 flex flex-col justify-center">
           <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 border border-void/10 bg-white/50 backdrop-blur rounded-full flex items-center justify-center font-serif text-2xl text-void/40 shadow-sm">B</div>
            <h3 className="text-accent tracking-[0.2em] uppercase text-xs font-bold">{content.tag}</h3>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-serif italic mb-8 text-void">{content.title}</h2>
          
          <p className="text-void/70 leading-relaxed mb-12 text-lg font-medium">
            {content.description}
          </p>

          {/* Dynamic Description Box - Frosted Glass on Light Background */}
          <div className="bg-white/40 backdrop-blur-xl border border-white/50 p-10 rounded-2xl shadow-[0_10px_40px_-10px_rgba(31,38,135,0.05)] transition-all duration-300 relative overflow-hidden min-h-[250px] ring-1 ring-white/60">
             <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-accent to-orange-400"></div>
             <div className="absolute top-[-50%] right-[-10%] w-[300px] h-[300px] bg-gradient-to-br from-white/80 to-transparent rounded-full blur-3xl pointer-events-none"></div>
             
             {Object.entries(layers).map(([key, data]) => (
                <div 
                  key={key} 
                  className={`transition-all duration-500 absolute inset-0 p-10 flex flex-col justify-center ${activeLayer === key ? 'opacity-100 translate-y-0 z-10' : 'opacity-0 translate-y-4 pointer-events-none'}`}
                  aria-hidden={activeLayer !== key}
                >
                   <div className="flex items-center gap-4 mb-4 relative z-10">
                      <div className="p-3 bg-white rounded-lg shadow-sm border border-black/5">
                        <data.icon size={20} className="text-accent" />
                      </div>
                      <h4 className="font-bold text-xl text-void tracking-tight">{data.label}</h4>
                   </div>
                   <p className="text-void/70 leading-relaxed text-lg relative z-10 font-serif">
                      {data.desc}
                   </p>
                </div>
             ))}
             
             {/* Invisible Spacer */}
             <div className="invisible" aria-hidden="true">
                <div className="flex items-center gap-4 mb-4">
                   <Layers size={28} />
                   <h4 className="font-bold text-2xl">Spacer</h4>
                </div>
                <p className="text-lg">Spacer content to keep the box height consistent regardless of absolute positioning.</p>
             </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default ProcessLayer;