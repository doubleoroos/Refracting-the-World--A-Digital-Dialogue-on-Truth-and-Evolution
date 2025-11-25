import React, { useState, useRef } from 'react';
import { Section, Language } from '../types';
import { CONTENT } from '../constants';
import { MoveHorizontal, Sparkles, Image as ImageIcon, X, ScanEye } from 'lucide-react';
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

  // Keyboard and Input Range Handler
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderValue(Number(e.target.value));
  };

  return (
    <section id={Section.PILLAR_1} className="py-24 px-6 md:px-12 relative border-t border-white/5">
      {/* Background Gradient Mesh */}
      <div className="absolute inset-0 bg-gradient-to-b from-void via-void to-accent/5 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center relative z-10">
        
        {/* Text Content & HUD Controls */}
        <div className="order-2 lg:order-1">
          <div className="flex items-center gap-4 mb-8">
             <div className="w-12 h-12 border border-white/10 bg-white/5 rounded-full flex items-center justify-center font-serif text-2xl text-white/60 shadow-inner" aria-hidden="true">A</div>
            <h3 className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-orange-500 tracking-[0.2em] uppercase text-xs font-bold">{content.tag}</h3>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-serif italic mb-8 leading-tight text-white drop-shadow-xl">
            {content.title}
          </h2>
          
          <div className="mb-10 space-y-4 text-white/70 leading-relaxed text-base border-l-2 border-white/10 pl-6">
            {content.description}
          </div>

          {/* AI HUD Control Panel - Glassmorphism */}
          <div className="relative bg-void/40 backdrop-blur-2xl border border-white/10 rounded-xl overflow-hidden shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] ring-1 ring-white/5">
            {/* Technical Header */}
            <div className="flex justify-between items-center px-6 py-3 border-b border-white/5 bg-white/5">
               <div className="flex items-center gap-2">
                 <ScanEye size={16} className="text-accent" />
                 <span className="text-[10px] uppercase tracking-widest text-white/50 font-bold">Analysis Module // Ver. 2.5</span>
               </div>
               <div className="flex gap-1.5" aria-hidden="true">
                 <div className="w-1.5 h-1.5 bg-white/20 rounded-full"></div>
                 <div className="w-1.5 h-1.5 bg-white/20 rounded-full"></div>
                 <div className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse shadow-[0_0_8px_#d94625]"></div>
               </div>
            </div>

            <div className="p-8">
               <p className="font-mono text-[10px] text-accent mb-4 opacity-70" aria-hidden="true">
                 {`> AWAITING_INPUT...`}
               </p>
               <div role="status" aria-live="polite">
                 <p className="font-serif text-lg italic text-white/90 mb-8 min-h-[3rem] leading-relaxed">
                   {aiCommentary ? `"${aiCommentary}"` : <span className="text-white/30">{content.labels.aiPrompt}</span>}
                 </p>
               </div>

               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button 
                    onClick={handleGenerateInsight}
                    disabled={isLoading || !!aiCommentary}
                    className="flex items-center justify-center gap-3 px-6 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs uppercase tracking-widest text-white font-bold transition-all disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-accent group hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] relative overflow-hidden"
                    aria-label={isLoading ? "Analyzing..." : content.labels.aiButton}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                    <Sparkles size={16} className={`text-accent ${isLoading ? 'animate-spin' : 'group-hover:scale-110 transition-transform'}`} aria-hidden="true" />
                    <span>{isLoading ? 'Processing...' : content.labels.aiButton}</span>
                  </button>

                  <button 
                    onClick={handleGenerateImage}
                    disabled={isGeneratingImage}
                    className="flex items-center justify-center gap-3 px-6 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs uppercase tracking-widest text-white font-bold transition-all disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-accent group hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] relative overflow-hidden"
                    aria-label={isGeneratingImage ? content.labels.visualizeLoading : content.labels.visualizeButton}
                  >
                     <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                    <ImageIcon size={16} className={`text-accent ${isGeneratingImage ? 'animate-pulse' : 'group-hover:scale-110 transition-transform'}`} aria-hidden="true" />
                    <span>{isGeneratingImage ? content.labels.visualizeLoading : content.labels.visualizeButton}</span>
                  </button>
               </div>
            </div>
          </div>
        </div>

        {/* Interactive Slider / Image Result */}
        <div className="order-1 lg:order-2 relative h-[500px] md:h-[600px] w-full group select-none rounded-xl overflow-hidden shadow-2xl border border-white/10 ring-1 ring-white/5">
          
          {/* Generated Image Overlay */}
          {generatedImage && (
            <div className="absolute inset-0 z-40 bg-void/90 backdrop-blur-sm animate-fadeIn flex flex-col items-center justify-center p-2">
              <div className="relative w-full h-full overflow-hidden bg-black rounded-lg shadow-2xl">
                <img src={generatedImage} alt="AI Generated Synthesis" className="w-full h-full object-cover" />
                <button 
                  onClick={() => setGeneratedImage(null)}
                  className="absolute top-4 right-4 w-12 h-12 bg-black/60 backdrop-blur-md flex items-center justify-center rounded-full text-white hover:bg-accent transition-colors border border-white/10 focus:outline-none focus:ring-2 focus:ring-white"
                  aria-label="Close generated image"
                >
                  <X size={24} />
                </button>
                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black via-black/80 to-transparent text-white backdrop-blur-sm">
                  <span className="text-[10px] uppercase tracking-widest text-accent block mb-2 font-bold flex items-center gap-2">
                     <Sparkles size={12} /> AI Visual Synthesis
                  </span>
                  <p className="font-serif italic text-lg text-white/90">"A computational dream of objective reality merging with subjective interpretation."</p>
                </div>
              </div>
            </div>
          )}

          {/* Main Slider Area */}
          <div 
             className="absolute inset-0 w-full h-full"
             ref={containerRef}
             onMouseEnter={() => setIsHovering(true)}
             onMouseLeave={() => setIsHovering(false)}
          >
             <label htmlFor="comparison-slider" className="sr-only">Compare Reference Reality and Artistic Truth</label>
             <input
               id="comparison-slider"
               type="range"
               min="0"
               max="100"
               value={sliderValue}
               onChange={handleSliderChange}
               className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-50"
             />

             {/* Background: Processed/Artistic */}
             <div className="absolute inset-0">
               <img 
                 src="https://picsum.photos/id/249/800/1000" 
                 alt="Artistic Truth: High contrast, slightly desaturated interpretation"
                 className="w-full h-full object-cover grayscale-[20%] contrast-125 brightness-110"
               />
               <div className="absolute inset-0 bg-accent/20 mix-blend-overlay"></div>
             </div>
              
             {/* Foreground: Raw/Reality - Clipped */}
             <div 
               className="absolute inset-0 w-full h-full bg-void overflow-hidden transition-all duration-75 ease-linear border-r border-white/50"
               style={{ clipPath: `polygon(0 0, ${sliderValue}% 0, ${sliderValue}% 100%, 0 100%)` }}
             >
                <img 
                 src="https://picsum.photos/id/249/800/1000" 
                 alt="Reference Reality: Grayscale, raw documentary style"
                 className="absolute w-full h-full object-cover grayscale contrast-125 brightness-75 sepia-[.2]"
               />
               <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
             </div>

             {/* Draggable Line Visual */}
             <div 
               className="absolute top-0 bottom-0 w-0.5 bg-white/80 z-20 shadow-[0_0_20px_rgba(255,255,255,0.5)] pointer-events-none transition-all duration-75 ease-linear"
               style={{ left: `${sliderValue}%` }}
             >
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 backdrop-blur-xl rounded-full border border-white/50 flex items-center justify-center shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                 <MoveHorizontal size={24} className="text-white drop-shadow-md" />
               </div>
             </div>

             {/* Labels with Glass Morphism */}
             <div className="absolute top-8 left-8 z-30 pointer-events-none">
                <span className="bg-black/60 backdrop-blur-md text-white text-[10px] uppercase tracking-widest px-4 py-2 border border-white/10 rounded-full flex items-center gap-2 shadow-lg font-bold">
                   <div className="w-1.5 h-1.5 rounded-full bg-white/50"></div>
                   {content.labels.raw}
                </span>
             </div>

             <div className="absolute bottom-8 right-8 z-30 pointer-events-none">
                <span className="bg-accent/90 backdrop-blur-md shadow-lg text-white text-[10px] uppercase tracking-widest px-4 py-2 border border-white/10 rounded-full flex items-center gap-2 font-bold">
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