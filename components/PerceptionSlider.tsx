import React, { useState, useRef } from 'react';
import { Section, Language } from '../types';
import { CONTENT } from '../constants';
import { MoveHorizontal, Sparkles, Image as ImageIcon, X } from 'lucide-react';
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
    <section id={Section.PILLAR_1} className="py-24 px-6 md:px-12 bg-void relative border-t border-white/10">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        
        {/* Text Content */}
        <div className="order-2 md:order-1">
          <div className="flex items-center gap-4 mb-6">
            <span className="text-6xl text-white/10 font-serif font-bold">A</span>
            <h3 className="text-accent tracking-widest uppercase text-sm font-medium">{content.tag}</h3>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif italic mb-8">{content.title}</h2>
          
          <div className="mb-6 space-y-4 text-white/70 leading-relaxed">
            {content.description}
          </div>

          {/* AI Controls */}
          <div className="p-6 border border-white/10 bg-white/5 rounded-sm backdrop-blur-sm min-h-[140px]">
            <div className="flex flex-wrap gap-4 mb-4 border-b border-white/10 pb-4">
              
              {/* Text Analysis Button */}
              <button 
                onClick={handleGenerateInsight}
                disabled={isLoading || !!aiCommentary}
                className="flex items-center gap-2 text-xs uppercase tracking-widest text-accent hover:text-white transition-colors disabled:opacity-50"
              >
                 <Sparkles size={14} />
                 {isLoading ? 'Analyzing...' : aiCommentary ? content.labels.aiButtonActive : content.labels.aiButton}
              </button>

              <div className="w-px h-4 bg-white/20 hidden md:block"></div>

              {/* Image Generation Button */}
              <button 
                onClick={handleGenerateImage}
                disabled={isGeneratingImage}
                className="flex items-center gap-2 text-xs uppercase tracking-widest text-white/60 hover:text-white transition-colors disabled:opacity-50"
              >
                <ImageIcon size={14} />
                {isGeneratingImage ? content.labels.visualizeLoading : content.labels.visualizeButton}
              </button>

            </div>
            
            <p className="font-serif text-lg italic text-white/90 animate-fadeIn">
              {aiCommentary ? `"${aiCommentary}"` : <span className="text-white/30">{content.labels.aiPrompt}</span>}
            </p>
          </div>
        </div>

        {/* Interactive Slider / Image Result */}
        <div className="order-1 md:order-2 relative h-[500px] w-full group">
          
          {/* Generated Image Modal/Overlay */}
          {generatedImage && (
            <div className="absolute inset-0 z-30 bg-void animate-fadeIn flex flex-col items-center justify-center p-2 border border-white/10 rounded-sm">
              <div className="relative w-full h-full overflow-hidden rounded-sm">
                <img src={generatedImage} alt="AI Generated Synthesis" className="w-full h-full object-cover" />
                <button 
                  onClick={() => setGeneratedImage(null)}
                  className="absolute top-4 right-4 w-8 h-8 bg-black/50 backdrop-blur flex items-center justify-center rounded-full text-white hover:bg-accent transition-colors"
                >
                  <X size={16} />
                </button>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent text-white">
                  <span className="text-[10px] uppercase tracking-widest text-accent block mb-1">AI Synthesis</span>
                  <p className="font-serif italic text-sm">The tension between objective data and subjective experience.</p>
                </div>
              </div>
            </div>
          )}

          {/* Standard Slider (Hidden if image is generated, or visible underneath) */}
          <div 
             className="absolute inset-0 w-full h-full select-none cursor-ew-resize"
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
                  {content.labels.raw}
                </div>
              </div>

              {/* Label for Processed side */}
              <div className="absolute top-6 right-6 bg-accent/80 backdrop-blur text-white text-xs px-3 py-1 tracking-widest border border-white/20">
                {content.labels.processed}
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
               <span>{content.labels.raw}</span>
               <span>{content.labels.processed}</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default PerceptionSlider;