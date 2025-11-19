import React, { useState } from 'react';
import { Section } from '../types';
import { Layers, Cpu, Sun, Camera } from 'lucide-react';

const ProcessLayer: React.FC = () => {
  const [activeLayer, setActiveLayer] = useState<'final' | 'digital' | 'physics'>('final');

  const layers = {
    final: {
      label: 'Output',
      desc: 'The final work. A subjective interpretation of the world.',
      imageClass: 'grayscale-0 blur-0'
    },
    digital: {
      label: 'Digital Darkroom',
      desc: 'Chemistry & Software. Where the "act of seeing" becomes the "act of creating".',
      imageClass: 'invert hue-rotate-180 contrast-150 opacity-80'
    },
    physics: {
      label: 'Physics / Light',
      desc: 'The raw sensor data. Light hitting the silicon. The only "objective" moment.',
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
            <h3 className="text-accent tracking-widest uppercase text-sm font-medium">Pillar B: The Process Layer</h3>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif italic mb-8">Ongoing Invention</h2>
          
          <p className="text-void/80 leading-relaxed mb-6 text-lg">
            Demystifying the "black box" of modern photography. Click to "explode" the image into its constituent layers, tracing the journey from Niépce to AI.
          </p>

          <div className="space-y-6">
            <div className={`transition-all duration-500 ${activeLayer === 'final' ? 'opacity-100 translate-x-0' : 'opacity-30 translate-x-4'}`}>
               <h4 className="font-bold text-xl mb-2 flex items-center gap-2"><Layers size={18}/> Final Output</h4>
               <p className="text-void/70 text-sm">The polished result presented to the viewer. This is the "Artistic Truth" – a curated reality.</p>
            </div>

            <div className={`transition-all duration-500 ${activeLayer === 'digital' ? 'opacity-100 translate-x-0' : 'opacity-30 translate-x-4'}`}>
               <h4 className="font-bold text-xl mb-2 flex items-center gap-2"><Cpu size={18}/> Digital Darkroom (Chemistry/Software)</h4>
               <p className="text-void/70 text-sm">Where the technological evolution happens. From chemical baths to algorithmic adjustments and generative AI fills.</p>
            </div>

            <div className={`transition-all duration-500 ${activeLayer === 'physics' ? 'opacity-100 translate-x-0' : 'opacity-30 translate-x-4'}`}>
               <h4 className="font-bold text-xl mb-2 flex items-center gap-2"><Sun size={18}/> Physics (Light & Sensor)</h4>
               <p className="text-void/70 text-sm">The moment photons hit the sensor. The raw, linear data before human bias or software interpretation intervenes.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ProcessLayer;