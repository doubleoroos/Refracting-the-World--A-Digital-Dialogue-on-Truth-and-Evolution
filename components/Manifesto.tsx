import React, { useState } from 'react';
import { Section, Language } from '../types';
import { CONTENT } from '../constants';
import { CheckCircle, Globe, Leaf, Users, Calendar, TrendingUp, Flag, Sparkles, Loader2, Image as ImageIcon, X, Video, Wand2 } from 'lucide-react';
import { summarizeManifesto, generateThematicImage, generateManifestoVideo } from '../services/geminiService';

// Local interface for casting to avoid global namespace pollution/conflicts
interface AIStudio {
  hasSelectedApiKey: () => Promise<boolean>;
  openSelectKey: () => Promise<void>;
}

interface ManifestoProps {
  language: Language;
}

// Internal Tooltip Component for Micro-interactions
const Tooltip: React.FC<{ text: string; children: React.ReactNode }> = ({ text, children }) => (
  <div className="relative group flex items-center justify-center cursor-help">
    {children}
    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-3 py-1.5 bg-black/90 backdrop-blur-md border border-white/20 text-white text-[9px] font-bold uppercase tracking-[0.2em] whitespace-nowrap rounded-sm opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 pointer-events-none z-50 shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
      {text}
      <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[1px] border-4 border-transparent border-t-white/20"></div>
    </div>
  </div>
);

const Manifesto: React.FC<ManifestoProps> = ({ language }) => {
  const content = CONTENT[language].manifesto;
  const [summary, setSummary] = useState<string | null>(null);
  const [isSummarizing, setIsSummarizing] = useState(false);
  
  // Image Gen State
  const [imagePrompt, setImagePrompt] = useState('');
  const [generatedManifestoImage, setGeneratedManifestoImage] = useState<string | null>(null);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Video Gen State
  const [isGeneratingVideo, setIsGeneratingVideo] = useState(false);
  const [generatedVideoUrl, setGeneratedVideoUrl] = useState<string | null>(null);
  const [videoError, setVideoError] = useState(false);

  const handleSummarize = async () => {
    setIsSummarizing(true);
    const points = [
      `${content.cards.pool.title}: ${content.cards.pool.desc}`,
      `${content.cards.eco.title}: ${content.cards.eco.desc}`,
      `${content.cards.access.title}: ${content.cards.access.desc}`,
      `${content.cards.fair.title}: ${content.cards.fair.desc}`
    ];
    const result = await summarizeManifesto(points, language);
    setSummary(result);
    setIsSummarizing(false);
  };

  const handleGenerateImage = async () => {
    if (!imagePrompt) return;
    setIsGeneratingImage(true);
    setImageError(false);
    setGeneratedManifestoImage(null);
    
    const result = await generateThematicImage(imagePrompt);
    
    if (result) {
        setGeneratedManifestoImage(result);
    } else {
        setImageError(true);
    }
    setIsGeneratingImage(false);
  };

  const handleGenerateVideo = async () => {
    // Check if AI Studio environment has selected key
    const aiStudio = (window as unknown as { aistudio?: AIStudio }).aistudio;

    if (aiStudio && aiStudio.hasSelectedApiKey && aiStudio.openSelectKey) {
      try {
        const hasKey = await aiStudio.hasSelectedApiKey();
        if (!hasKey) {
          await aiStudio.openSelectKey();
          // We proceed assuming user selected a key or closed dialog
        }
      } catch (e) {
        console.error("Error checking API key status", e);
      }
    }

    setIsGeneratingVideo(true);
    setVideoError(false);
    setGeneratedVideoUrl(null);
    
    const prompt = `Cinematic video montage representing a strategic roadmap: ${content.cards.pool.title}, ${content.cards.eco.title}, ${content.cards.access.title}. Abstract, futuristic, high quality, smooth motion.`;
    
    const result = await generateManifestoVideo(prompt);
    
    if (result) {
        setGeneratedVideoUrl(result);
    } else {
        setVideoError(true);
    }
    setIsGeneratingVideo(false);
  };

  return (
    <section id={Section.MANIFESTO} className="py-24 px-6 bg-paper text-void relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-20 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
             <div className="w-8 h-px bg-accent"></div>
             <h2 className="text-xs font-bold tracking-[0.3em] uppercase text-accent">{content.tag}</h2>
             <div className="w-8 h-px bg-accent"></div>
          </div>
          <h3 className="text-4xl md:text-6xl font-serif mb-6 leading-tight">
            {content.title}
          </h3>
        </div>

        {/* Strategic Alignment Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {[
            { icon: Users, data: content.cards.pool },
            { icon: Leaf, data: content.cards.eco },
            { icon: Globe, data: content.cards.access },
            { icon: CheckCircle, data: content.cards.fair }
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-8 rounded-sm shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-black/5 hover:border-accent/30 transition-all hover:-translate-y-1">
              <div className="w-12 h-12 bg-accent/5 flex items-center justify-center rounded-full mb-6 border border-accent/10">
                <item.icon className="text-accent" size={20} />
              </div>
              <h4 className="text-sm font-bold uppercase tracking-wide mb-3">{item.data.title}</h4>
              <p className="text-sm text-void/60 leading-relaxed font-serif">
                {item.data.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Executive Summary Section (AI) */}
        <div className="max-w-4xl mx-auto mb-32">
          <div className="relative">
             <div className="absolute inset-0 flex items-center" aria-hidden="true">
               <div className="w-full border-t border-black/5"></div>
             </div>
             <div className="relative flex justify-center">
               <span className="bg-paper px-4 text-xs uppercase tracking-widest text-void/40">AI Strategic Synthesis</span>
             </div>
           </div>

          <div className="mt-8 text-center">
            {!summary ? (
              <button 
                onClick={handleSummarize}
                disabled={isSummarizing}
                className="group relative inline-flex items-center gap-3 bg-void text-white px-10 py-5 rounded-sm hover:bg-accent transition-all duration-300 disabled:opacity-50 hover:shadow-xl overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                {isSummarizing ? <Loader2 size={18} className="animate-spin"/> : <Sparkles size={18} />}
                <span className="text-xs uppercase tracking-widest font-bold relative z-10">
                  {isSummarizing ? content.summary.loading : content.summary.button}
                </span>
              </button>
            ) : (
              <div className="bg-gradient-to-br from-white to-white/50 p-12 rounded-sm shadow-xl border border-black/5 animate-fadeIn text-left relative overflow-hidden">
                <div className="absolute -right-10 -top-10 text-accent/5">
                   <Sparkles size={200} />
                </div>
                <div className="flex items-center gap-3 mb-8 border-b border-accent/10 pb-4">
                  <Tooltip text="Gemini Pro Analysis">
                    <div className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center">
                      <Sparkles size={14} />
                    </div>
                  </Tooltip>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-void/40">{content.summary.title}</h4>
                </div>
                <p className="text-2xl font-serif italic leading-relaxed text-void/80 relative z-10">
                  "{summary}"
                </p>
              </div>
            )}
          </div>
        </div>

        {/* THE DIGITAL ATELIER (Combined Gen AI Section) */}
        <div className="mb-32 bg-void text-white rounded-sm overflow-hidden shadow-2xl relative border border-white/10">
            {/* Background Texture */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="relative z-10 p-10 md:p-16">
                <div className="flex items-center gap-4 mb-12">
                   <Tooltip text="Generative Suite">
                    <div className="p-3 border border-white/20 rounded-md bg-white/5">
                        <Wand2 size={24} className="text-accent" />
                    </div>
                   </Tooltip>
                   <div>
                      <h3 className="text-2xl font-serif italic">The Digital Atelier</h3>
                      <p className="text-xs uppercase tracking-widest text-white/40">Prototyping Future Realities</p>
                   </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-12">
                    
                    {/* Image Gen Column */}
                    <div className="bg-white/5 border border-white/10 rounded-sm p-8 flex flex-col h-full hover:border-white/20 transition-colors">
                        <div className="flex items-center gap-3 mb-6">
                            <Tooltip text="Imagen 3 Model">
                                <div className="cursor-help">
                                    <ImageIcon size={18} className="text-accent" />
                                </div>
                            </Tooltip>
                            <h4 className="text-sm font-bold uppercase tracking-wide">{content.imageGen.title}</h4>
                        </div>
                        <p className="text-sm text-white/50 mb-6 flex-grow">{content.imageGen.subtitle}</p>
                        
                        <div className="space-y-4">
                            <input 
                                type="text" 
                                value={imagePrompt}
                                onChange={(e) => setImagePrompt(e.target.value)}
                                placeholder={content.imageGen.placeholder}
                                disabled={isGeneratingImage}
                                className="w-full bg-black/50 border border-white/10 px-4 py-3 rounded-sm text-sm focus:outline-none focus:border-accent transition-colors placeholder:text-white/20"
                                onKeyDown={(e) => e.key === 'Enter' && handleGenerateImage()}
                            />
                            <button
                                onClick={handleGenerateImage}
                                disabled={isGeneratingImage || !imagePrompt}
                                className="w-full bg-white text-void px-6 py-3 rounded-sm hover:bg-accent hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 uppercase tracking-widest text-xs font-bold"
                            >
                                {isGeneratingImage ? <Loader2 size={14} className="animate-spin" /> : 'Generate Concept'}
                            </button>
                        </div>

                        {/* Image Output Area */}
                        {generatedManifestoImage ? (
                           <div className="mt-6 relative aspect-video bg-black rounded-sm overflow-hidden animate-fadeIn border border-white/20 group">
                              <img src={generatedManifestoImage} alt="Generated" className="w-full h-full object-cover" />
                              <button onClick={() => setGeneratedManifestoImage(null)} className="absolute top-2 right-2 bg-black/50 p-1 rounded-full text-white hover:bg-accent opacity-0 group-hover:opacity-100 transition-opacity"><X size={14}/></button>
                           </div>
                        ) : (
                           <div className="mt-6 aspect-video bg-black/20 border border-white/5 rounded-sm flex items-center justify-center text-white/10 text-xs uppercase tracking-widest">
                               {isGeneratingImage ? 'Rendering...' : 'Output Display'}
                           </div>
                        )}
                        {imageError && <p className="text-accent text-xs mt-2 text-center">Generation failed.</p>}
                    </div>

                    {/* Video Gen Column */}
                    <div className="bg-white/5 border border-white/10 rounded-sm p-8 flex flex-col h-full hover:border-white/20 transition-colors">
                        <div className="flex items-center gap-3 mb-6">
                            <Tooltip text="Veo Video Model">
                                <div className="cursor-help">
                                    <Video size={18} className="text-accent" />
                                </div>
                            </Tooltip>
                            <h4 className="text-sm font-bold uppercase tracking-wide">{content.videoGen.title}</h4>
                        </div>
                        <p className="text-sm text-white/50 mb-6 flex-grow">{content.videoGen.subtitle}</p>

                        <div className="space-y-4">
                            <div className="w-full bg-black/50 border border-white/10 px-4 py-3 rounded-sm text-sm text-white/40 cursor-not-allowed italic">
                               Preset: Strategic Roadmap Cinematic Montage
                            </div>
                            <button
                                onClick={handleGenerateVideo}
                                disabled={isGeneratingVideo}
                                className="w-full bg-accent text-white px-6 py-3 rounded-sm hover:bg-white hover:text-void transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 uppercase tracking-widest text-xs font-bold"
                            >
                                {isGeneratingVideo ? <Loader2 size={14} className="animate-spin" /> : 'Generate Video'}
                            </button>
                        </div>

                         {/* Video Output Area */}
                         {generatedVideoUrl ? (
                           <div className="mt-6 relative aspect-video bg-black rounded-sm overflow-hidden animate-fadeIn border border-white/20 group">
                              <video src={generatedVideoUrl} controls autoPlay loop className="w-full h-full object-cover" />
                              <button onClick={() => setGeneratedVideoUrl(null)} className="absolute top-2 right-2 bg-black/50 p-1 rounded-full text-white hover:bg-accent opacity-0 group-hover:opacity-100 transition-opacity"><X size={14}/></button>
                           </div>
                        ) : (
                           <div className="mt-6 aspect-video bg-black/20 border border-white/5 rounded-sm flex items-center justify-center text-white/10 text-xs uppercase tracking-widest flex-col gap-2">
                               {isGeneratingVideo ? (
                                 <>
                                  <Loader2 size={20} className="animate-spin text-accent"/>
                                  <span>Processing Frames...</span>
                                 </>
                               ) : 'Video Display'}
                           </div>
                        )}
                        {videoError && <p className="text-accent text-xs mt-2 text-center">Video generation failed.</p>}
                    </div>

                </div>
            </div>
        </div>

        {/* Timeline & Budget Section */}
        <div className="grid lg:grid-cols-2 gap-20">
          
          {/* Operational Timeline */}
          <div>
             <div className="flex items-center gap-3 mb-8">
               <Calendar className="text-accent" size={24} /> 
               <h4 className="text-xl font-serif italic">{content.timeline.title}</h4>
             </div>
            
            <div className="space-y-0 pl-4 border-l border-black/10">
              {content.timeline.phases.map((item, i) => (
                <div key={i} className={`relative pl-8 py-6 group border-b border-black/5 last:border-0 hover:bg-white/40 transition-colors rounded-r-md`}>
                   <div className={`absolute -left-[5px] top-8 w-2.5 h-2.5 rounded-full border-2 border-paper transition-all duration-300 ${item.current ? 'bg-accent scale-150' : 'bg-void/20 group-hover:bg-accent'}`}></div>
                   <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1">
                      <h5 className={`text-base font-bold transition-colors ${item.current ? 'text-accent' : 'text-void'}`}>{item.title}</h5>
                      <span className="text-[10px] uppercase tracking-widest text-void/40 font-mono bg-black/5 px-2 py-1 rounded-sm">{item.dates}</span>
                   </div>
                   <p className="text-sm text-void/60 leading-relaxed max-w-md">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Budgetary Framework */}
          <div>
            <div className="flex items-center gap-3 mb-8">
               <TrendingUp className="text-accent" size={24} /> 
               <h4 className="text-xl font-serif italic">{content.budget.title}</h4>
             </div>
            
            <div className="bg-white p-10 rounded-sm border border-black/5 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] mb-8">
              <h5 className="text-[10px] font-bold uppercase tracking-widest mb-6 text-void/30 border-b border-black/5 pb-2">{content.budget.allocationTitle}</h5>
              <ul className="space-y-5">
                {content.budget.items.map((expense, i) => (
                  <li key={i} className="flex items-center justify-between text-sm group">
                    <span className="text-void/80 group-hover:text-accent transition-colors">{expense}</span>
                    <div className="w-16 h-1 bg-black/5 rounded-full overflow-hidden">
                       <div className="h-full bg-accent opacity-0 group-hover:opacity-100 transition-all w-[70%]"></div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

             <div className="bg-void text-white p-10 rounded-sm border border-black/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 rounded-full blur-3xl"></div>
              <h5 className="text-[10px] font-bold uppercase tracking-widest mb-6 text-white/30 border-b border-white/10 pb-2">{content.budget.incomeTitle}</h5>
               <ul className="space-y-4 relative z-10">
                {content.budget.income.map((inc, i) => (
                  <li key={i} className="flex items-start gap-4 text-sm">
                    <Flag size={14} className="mt-1 text-accent"/>
                    <span className="text-white/70">{inc}</span>
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