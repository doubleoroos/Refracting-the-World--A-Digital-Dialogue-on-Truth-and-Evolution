import React, { useState, useRef } from 'react';
import { Section, Language } from '../types';
import { CONTENT } from '../constants';
import { MoveHorizontal, Sparkles, Image as ImageIcon, X, Aperture, ScanEye } from 'lucide-react';
import { analyzeImageContext, generateThematicImage } from '../services/geminiService';

interface PerceptionSliderProps {
  language: Language;
}

const PerceptionSlider: React.FC<PerceptionSliderProps> = ({ language }) => {
  const [sliderValue, setSliderValue] = useState(50);
  const [aiCommentary, setAiCommentary] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  const content = CONTENT[language].pillarA;

  const handleGenerateInsight = async () => {
    if (aiCommentary) return;
    setIsLoading(true);
    const text = await analyzeImageContext(
      "An architectural structure shown in raw documentary reality versus a highly interpreted, artistic truth that alters the narrative.",
      language
    );
    setAiCommentary(text);
    setIsLoading(false);
  };

  const handleGenerateImage = async () => {
    if (generatedImage) {
      setGeneratedImage(null); // Toggle off if already present
      return;
    }
    
    setIsGeneratingImage(true);
    const prompt = "A split screen artistic composition. The left half is a gritty, black and white documentary photograph of an old concrete city street, hyper-realistic, representing objective truth. The right half smoothly transitions into a surreal, colorful, abstract oil painting interpretation of the same street, representing subjective emotional truth. High contrast, museum quality.";
    
    const result = await generateThematicImage(prompt);
    setGeneratedImage(result);
    setIsGeneratingImage(false);
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
    <section id={Section.PILLAR_1} className="py-24 px-6 md:px-12 bg-void relative border-t border-white/5">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
        
        {/* Text Content & HUD Controls */}
        <div className="order-2 lg:order-1">
          <div className="flex items-center gap-4 mb-8">
             <div className="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center font-serif text-2xl text-white/20">A</div>
            <h3 className="text-accent tracking-[0.2em] uppercase text-xs font-bold">{content.tag}</h3>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-serif italic mb-8 leading-tight">
            {content.title}
          </h2>
          
          <div className="mb-10 space-y-4 text-white/60 leading-relaxed text-sm md:text-base border-l border-white/10 pl-6">
            {content.description}
          </div>

          {/* AI HUD Control Panel */}
          <div className="relative bg-black/40 border border-white/10 rounded-sm p-1">
            {/* Technical Header */}
            <div className="flex justify-between items-center px-4 py-2 border-b border-white/5 bg-white/5">
               <div className="flex items-center gap-2">
                 <ScanEye size={14} className="text-accent" />
                 <span className="text-[10px] uppercase tracking-widest text-white/50">Analysis Module</span>
               </div>
               <div className="flex gap-1">
                 <div className="w-1 h-1 bg-white/20 rounded-full"></div>
                 <div className="w-1 h-1 bg-white/20 rounded-full"></div>
                 <div className="w-1 h-1 bg-accent rounded-full animate-pulse"></div>
               </div>
            </div>

            <div className="p-6">
               <p className="font-mono text-xs text-accent mb-4 opacity-70">
                 {`> AWAITING_INPUT...`}
               </p>
               <p className="font-serif text-lg italic text-white/90 animate-fadeIn mb-8 min-h-[3rem]">
                 {aiCommentary ? `"${aiCommentary}"` : <span className="text-white/30">{content.labels.aiPrompt}</span>}
               </p>

               <div className="grid grid-cols-2 gap-4">
                  <button 
                    onClick={handleGenerateInsight}
                    disabled={isLoading || !!aiCommentary}
                    className="flex items-center justify-center gap-2 px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-xs uppercase tracking-widest text-white transition-all disabled:opacity-50 group"
                  >
                    <Sparkles size={14} className={`text-accent ${isLoading ? 'animate-spin' : 'group-hover:scale-110 transition-transform'}`} />
                    <span>{isLoading ? 'Processing...' : content.labels.aiButton}</span>
                  </button>

                  <button 
                    onClick={handleGenerateImage}
                    disabled={isGeneratingImage}
                    className="flex items-center justify-center gap-2 px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-xs uppercase tracking-widest text-white transition-all disabled:opacity-50 group"
                  >
                    <ImageIcon size={14} className={`text-accent ${isGeneratingImage ? 'animate-pulse' : 'group-hover:scale-110 transition-transform'}`} />
                    <span>{isGeneratingImage ? content.labels.visualizeLoading : content.labels.visualizeButton}</span>
                  </button>
               </div>
            </div>
          </div>
        </div>

        {/* Interactive Slider / Image Result */}
        <div className="order-1 lg:order-2 relative h-[600px] w-full group select-none">
          
          {/* Generated Image Overlay */}
          {generatedImage && (
            <div className="absolute inset-0 z-40 bg-void animate-fadeIn flex flex-col items-center justify-center p-1 border border-white/10">
              <div className="relative w-full h-full overflow-hidden bg-black">
                <img src={generatedImage} alt="AI Generated Synthesis" className="w-full h-full object-cover" />
                <button 
                  onClick={() => setGeneratedImage(null)}
                  className="absolute top-4 right-4 w-10 h-10 bg-black/50 backdrop-blur flex items-center justify-center rounded-full text-white hover:bg-accent transition-colors border border-white/20"
                >
                  <X size={18} />
                </button>
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black/80 to-transparent text-white">
                  <span className="text-[10px] uppercase tracking-widest text-accent block mb-2 border-l-2 border-accent pl-2">AI Visual Synthesis</span>
                  <p className="font-serif italic text-sm text-white/80">"A computational dream of objective reality merging with subjective interpretation."</p>
                </div>
              </div>
            </div>
          )}

          {/* Main Slider Area */}
          <div 
             className="absolute inset-0 w-full h-full cursor-ew-resize rounded-sm overflow-hidden border border-white/10 shadow-2xl"
             ref={containerRef}
             onMouseMove={handleMouseMove}
             onTouchMove={handleTouchMove}
             onMouseEnter={() => setIsHovering(true)}
             onMouseLeave={() => setIsHovering(false)}
          >
             {/* Background: Processed/Artistic */}
             <div className="absolute inset-0">
               <img 
                 src="https://picsum.photos/id/249/800/1000" 
                 alt="Artistic Truth"
                 className="w-full h-full object-cover grayscale-[20%] contrast-125 brightness-110"
               />
               <div className="absolute inset-0 bg-accent/10 mix-blend-overlay"></div>
             </div>
              
             {/* Foreground: Raw/Reality - Clipped */}
             <div 
               className="absolute inset-0 w-full h-full bg-void overflow-hidden"
               style={{ clipPath: `polygon(0 0, ${sliderValue}% 0, ${sliderValue}% 100%, 0 100%)` }}
             >
                <img 
                 src="https://picsum.photos/id/249/800/1000" 
                 alt="Reference Reality"
                 className="absolute w-full h-full object-cover grayscale contrast-125 brightness-75 sepia-[.2]"
               />
               
               {/* Grid Overlay on Raw side only */}
               <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
             </div>

             {/* Draggable Line */}
             <div 
               className="absolute top-0 bottom-0 w-px bg-white z-20 shadow-[0_0_20px_rgba(255,255,255,0.5)]"
               style={{ left: `${sliderValue}%` }}
             >
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full border border-white/40 flex items-center justify-center shadow-2xl transition-transform duration-200 hover:scale-110">
                 <MoveHorizontal size={20} className="text-white drop-shadow-md" />
               </div>
             </div>

             {/* Labels */}
             <div className="absolute top-6 left-6 z-30 pointer-events-none">
                <span className="bg-black/80 backdrop-blur text-white text-[10px] uppercase tracking-widest px-3 py-1 border border-white/20 rounded-full flex items-center gap-2">
                   <div className="w-1.5 h-1.5 rounded-full bg-white/50"></div>
                   {content.labels.raw}
                </span>
             </div>

             <div className="absolute bottom-6 right-6 z-30 pointer-events-none">
                <span className="bg-accent/90 backdrop-blur text-white text-[10px] uppercase tracking-widest px-3 py-1 border border-white/20 rounded-full flex items-center gap-2">
                   <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                   {content.labels.processed}
                </span>
             </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default PerceptionSlider;