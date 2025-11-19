import React, { useState, useRef } from 'react';
import { Section } from '../types';
import { MoveHorizontal, Sparkles } from 'lucide-react';
import { analyzeImageContext } from '../services/geminiService';

const PerceptionSlider: React.FC = () => {
  const [sliderValue, setSliderValue] = useState(50);
  const [aiCommentary, setAiCommentary] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  const handleGenerateInsight = async () => {
    if (aiCommentary) return;
    setIsLoading(true);
    const text = await analyzeImageContext("An architectural structure shown in raw documentary reality versus a highly interpreted, artistic truth that alters the narrative.");
    setAiCommentary(text);
    setIsLoading(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const percentage = (x / rect.width) * 100;
    setSliderValue(percentage);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
     if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.touches[0].clientX - rect.left, rect.width));
    const percentage = (x / rect.width) * 100;
    setSliderValue(percentage);
  }

  return (
    <section id={Section.PILLAR_1} className="py-24 px-6 md:px-12 bg-void relative border-t border-white/10">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        
        {/* Text Content */}
        <div className="order-2 md:order-1">
          <div className="flex items-center gap-4 mb-6">
            <span className="text-6xl text-white/10 font-serif font-bold">A</span>
            <h3 className="text-accent tracking-widest uppercase text-sm font-medium">Pillar A: Perception Slider</h3>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif italic mb-8">Reality vs. Distortion</h2>
          
          <div className="mb-6 space-y-4 text-white/70 leading-relaxed">
            <p>
              As stated in the Bicentennial Manifesto, Niépce’s invention was born from a desire to "capture reality." 
              For two centuries, we believed the photograph was an objective record.
            </p>
            <p>
               <strong>The "Utopia of Accuracy" is fractured.</strong>
            </p>
            <p>
              This interactive feature juxtaposes the "Reference Reality" (documentary shot) with the "Artistic Truth" (interpretive work).
              Move the slider to see how framing, lens choice, and post-processing alter the narrative of a building or a face.
            </p>
          </div>

          {/* AI Insight Box */}
          <div className="p-6 border border-white/10 bg-white/5 rounded-sm backdrop-blur-sm min-h-[120px]">
            <div className="flex justify-between items-start mb-4">
              <span className="text-xs uppercase tracking-widest text-white/50 flex items-center gap-2">
                <Sparkles size={12} className="text-accent"/> Curatorial AI Companion
              </span>
              <button 
                onClick={handleGenerateInsight}
                disabled={isLoading || !!aiCommentary}
                className="text-xs text-accent hover:text-white transition-colors disabled:opacity-50"
              >
                {isLoading ? 'Analyzing...' : aiCommentary ? 'Analysis Complete' : 'Interrogate the Medium'}
              </button>
            </div>
            <p className="font-serif text-lg italic text-white/90">
              {aiCommentary ? `"${aiCommentary}"` : <span className="text-white/30">Ask AI: Does the lens capture reality, or create it?</span>}
            </p>
          </div>
        </div>

        {/* Interactive Slider */}
        <div className="order-1 md:order-2 relative h-[500px] w-full select-none cursor-ew-resize group"
             ref={containerRef}
             onMouseMove={handleMouseMove}
             onTouchMove={handleTouchMove}
             onMouseEnter={() => setIsHovering(true)}
             onMouseLeave={() => setIsHovering(false)}
        >
          {/* Image Container */}
          <div className="absolute inset-0 w-full h-full overflow-hidden rounded-sm border border-white/10">
            {/* Underlying Image (Artistic Truth) */}
            <img 
              src="https://picsum.photos/id/249/800/1000" 
              alt="Artistic Truth"
              className="absolute w-full h-full object-cover grayscale-[20%] contrast-125 brightness-110"
            />
            
            {/* Overlay Image (Reference Reality) - Clip Path */}
            <div 
              className="absolute inset-0 w-full h-full overflow-hidden bg-void"
              style={{ clipPath: `polygon(0 0, ${sliderValue}% 0, ${sliderValue}% 100%, 0 100%)` }}
            >
               <img 
                src="https://picsum.photos/id/249/800/1000" 
                alt="Reference Reality"
                className="absolute w-full h-full object-cover grayscale contrast-75 brightness-90 blur-[1px]"
              />
               {/* Label for Raw side */}
              <div className="absolute top-6 left-6 bg-black/50 backdrop-blur text-white text-xs px-3 py-1 tracking-widest border border-white/20">
                REFERENCE REALITY
              </div>
            </div>

            {/* Label for Processed side */}
            <div className="absolute top-6 right-6 bg-accent/80 backdrop-blur text-white text-xs px-3 py-1 tracking-widest border border-white/20">
              ARTISTIC TRUTH
            </div>

            {/* Slider Handle Line */}
            <div 
              className="absolute top-0 bottom-0 w-0.5 bg-accent cursor-ew-resize z-20 shadow-[0_0_15px_rgba(217,70,37,0.8)]"
              style={{ left: `${sliderValue}%` }}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-accent rounded-full flex items-center justify-center shadow-lg transition-transform duration-200 group-hover:scale-110">
                <MoveHorizontal size={20} color="white" />
              </div>
            </div>
          </div>
          
          <div className="absolute -bottom-8 left-0 w-full flex justify-between text-xs text-white/30 tracking-widest uppercase">
             <span>Raw Documentation</span>
             <span>Final Interpretation</span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default PerceptionSlider;