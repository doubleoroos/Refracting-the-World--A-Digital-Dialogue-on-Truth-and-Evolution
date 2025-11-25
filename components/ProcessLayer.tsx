import React, { useState } from 'react';
import { Section, Language } from '../types';
import { CONTENT } from '../constants';
import { Layers, Cpu, Sun, Check } from 'lucide-react';

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
    <section id={Section.PILLAR_2} className="py-24 px-6 md:px-12 bg-paper text-void relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24 items-center relative z-10">
        
        {/* Interactive Display */}
        <div className="order-1 relative group">
           {/* Frame */}
           <div className="relative w-full aspect-[4/5] bg-black p-2 rounded-sm shadow-2xl">
              <div className="relative w-full h-full overflow-hidden bg-void">
                  
                  {/* Base Image */}
                  <img 
                    src="https://picsum.photos/id/103/800/1000" 
                    alt="Process Subject"
                    className={`w-full h-full object-cover transition-all duration-700 ease-in-out ${layers[activeLayer].imageClass}`}
                  />
                  
                  {/* Digital Overlay Layer */}
                  <div className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${activeLayer === 'digital' ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="absolute inset-0 p-6 font-mono text-[10px] text-green-500/70 overflow-hidden mix-blend-screen flex flex-col justify-between">
                       <div className="flex justify-between border-b border-green-500/30 pb-2">
                          <span>// RAW_SENSOR_DATA</span>
                          <span>ISO_3200</span>
                       </div>
                       <div className="grid grid-cols-4 gap-1 opacity-20 my-auto">
                          {Array.from({ length: 16 }).map((_, i) => (
                             <div key={i} className="aspect-square border border-green-500"></div>
                          ))}
                       </div>
                       <div className="flex justify-between border-t border-green-500/30 pt-2">
                          <span>Algorithm: DEMOSAIC</span>
                          <span>{`ERROR_CORRECTION: ACTIVE`}</span>
                       </div>
                    </div>
                  </div>

                  {/* Physics Overlay Layer */}
                  <div className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${activeLayer === 'physics' ? 'opacity-100' : 'opacity-0'}`}>
                     <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 to-transparent"></div>
                     <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-32 h-32 border border-white/20 rounded-full flex items-center justify-center">
                           <div className="w-2 h-2 bg-white rounded-full animate-pulse shadow-[0_0_10px_white]"></div>
                        </div>
                     </div>
                     <div className="absolute bottom-4 left-4 text-[10px] text-white/50 font-mono tracking-widest">
                        PHOTON_IMPACT_VELOCITY: 299,792,458 m/s
                     </div>
                  </div>

                  {/* Layer Toggle - Bottom centered overlay */}
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex bg-black/80 backdrop-blur border border-white/10 rounded-full p-1 gap-1 shadow-2xl">
                    {(Object.keys(layers) as Array<keyof typeof layers>).reverse().map((layerKey) => {
                      const LayerIcon = layers[layerKey].icon;
                      return (
                        <button
                          key={layerKey}
                          onClick={() => setActiveLayer(layerKey)}
                          className={`relative px-4 py-2 rounded-full flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold transition-all
                            ${activeLayer === layerKey 
                              ? 'bg-white text-black shadow-lg' 
                              : 'text-white/50 hover:text-white hover:bg-white/10'}`}
                        >
                          <LayerIcon size={14} />
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
            <div className="w-12 h-12 border border-void/10 rounded-full flex items-center justify-center font-serif text-2xl text-void/20">B</div>
            <h3 className="text-accent tracking-[0.2em] uppercase text-xs font-bold">{content.tag}</h3>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-serif italic mb-8 text-void">{content.title}</h2>
          
          <p className="text-void/60 leading-relaxed mb-12 text-lg">
            {content.description}
          </p>

          {/* Dynamic Description Box */}
          <div className="bg-white border border-black/5 p-8 rounded-sm shadow-lg transition-all duration-300 relative overflow-hidden">
             <div className="absolute top-0 left-0 w-1 h-full bg-accent"></div>
             
             {Object.entries(layers).map(([key, data]) => (
                <div 
                  key={key} 
                  className={`transition-all duration-500 absolute inset-0 p-8 flex flex-col justify-center ${activeLayer === key ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
                >
                   <div className="flex items-center gap-3 mb-3">
                      <data.icon size={24} className="text-accent" />
                      <h4 className="font-bold text-xl">{data.label}</h4>
                   </div>
                   <p className="text-void/70 leading-relaxed">
                      {data.desc}
                   </p>
                </div>
             ))}
             
             {/* Spacer to maintain height */}
             <div className="invisible">
                <div className="flex items-center gap-3 mb-3">
                   <Layers size={24} />
                   <h4 className="font-bold text-xl">Spacer</h4>
                </div>
                <p>Spacer content to keep the box height consistent regardless of absolute positioning of children.</p>
             </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default ProcessLayer;