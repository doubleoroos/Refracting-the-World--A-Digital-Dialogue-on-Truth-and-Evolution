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

// Enhanced Premium Tooltip
const Tooltip: React.FC<{ text: string; children: React.ReactNode; className?: string }> = ({ text, children, className = "" }) => (
  <div className={`relative group flex items-center justify-center ${className}`}>
    {children}
    <div 
      role="tooltip"
      className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-4 py-2 bg-black/90 backdrop-blur-xl border border-white/10 text-white text-[9px] font-bold uppercase tracking-[0.2em] whitespace-nowrap rounded-lg opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 pointer-events-none z-50 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]"
    >
      {text}
      <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[1px] border-4 border-transparent border-t-black/90"></div>
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
    <section id={Section.MANIFESTO} className="py-24 px-6 bg-paper text-void relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-paper via-paper to-white/50 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="mb-20 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
             <div className="w-12 h-px bg-accent/40"></div>
             <h2 className="text-[10px] font-bold tracking-[0.4em] uppercase text-accent">{content.tag}</h2>
             <div className="w-12 h-px bg-accent/40"></div>
          </div>
          <h3 className="text-4xl md:text-6xl font-serif mb-6 leading-tight text-void drop-shadow-sm">
            {content.title}
          </h3>
        </div>

        {/* Strategic Alignment Grid - Glass Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {[
            { icon: Users, data: content.cards.pool },
            { icon: Leaf, data: content.cards.eco },
            { icon: Globe, data: content.cards.access },
            { icon: CheckCircle, data: content.cards.fair }
          ].map((item, idx) => (
            <div key={idx} className="group bg-white/60 backdrop-blur-xl p-8 rounded-2xl shadow-sm border border-white/60 hover:border-accent/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="w-14 h-14 bg-white flex items-center justify-center rounded-2xl mb-6 border border-black/5 shadow-md group-hover:scale-110 transition-transform duration-500">
                  <item.icon className="text-accent" size={24} aria-hidden="true" />
                </div>
                <h4 className="text-xs font-bold uppercase tracking-widest mb-4 text-void/90">{item.data.title}</h4>
                <p className="text-sm text-void/60 leading-relaxed font-serif">
                  {item.data.desc}
                </p>
              </div>
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
               <span className="bg-paper px-4 text-[10px] uppercase tracking-[0.2em] text-void/30 font-bold">AI Strategic Synthesis</span>
             </div>
           </div>

          <div className="mt-12 text-center">
            {!summary ? (
              <button 
                onClick={handleSummarize}
                disabled={isSummarizing}
                className="group relative inline-flex items-center gap-4 bg-void text-white px-10 py-5 rounded-full hover:bg-accent transition-all duration-300 disabled:opacity-50 hover:shadow-2xl overflow-hidden focus:outline-none focus-visible:ring-4 focus-visible:ring-accent/20"
              >
                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
                {isSummarizing ? <Loader2 size={18} className="animate-spin"/> : (
                  <Tooltip text="Strategic Synthesis">
                    <Sparkles size={18} className="text-accent group-hover:text-white transition-colors" />
                  </Tooltip>
                )}
                <span className="text-xs uppercase tracking-[0.2em] font-bold relative z-10">
                  {isSummarizing ? content.summary.loading : content.summary.button}
                </span>
              </button>
            ) : (
              <div className="bg-white/80 backdrop-blur-xl p-12 rounded-2xl shadow-xl border border-white/60 animate-fadeIn text-left relative overflow-hidden ring-1 ring-black/5">
                <div className="absolute -right-10 -top-10 text-accent/5 pointer-events-none">
                   <Sparkles size={200} />
                </div>
                <div className="flex items-center gap-3 mb-8 border-b border-accent/10 pb-4">
                  <div className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center shadow-lg">
                      <Sparkles size={14} />
                  </div>
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-void/40">{content.summary.title}</h4>
                </div>
                <p className="text-xl md:text-2xl font-serif italic leading-relaxed text-void/80 relative z-10">
                  "{summary}"
                </p>
              </div>
            )}
          </div>
        </div>

        {/* THE DIGITAL ATELIER (Combined Gen AI Section) */}
        <div className="mb-32 bg-void text-white rounded-3xl overflow-hidden shadow-2xl relative border border-white/10 ring-1 ring-white/5">
            {/* Background Texture & Gradient */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/20 rounded-full blur-[120px] pointer-events-none mix-blend-screen animate-blob"></div>
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none mix-blend-screen animate-blob" style={{animationDelay: '5s'}}></div>

            <div className="relative z-10 p-8 md:p-16 bg-white/5 backdrop-blur-3xl">
                <div className="flex items-center gap-6 mb-12 pb-8 border-b border-white/5">
                   <Tooltip text="Generative Studio">
                      <div className="p-4 border border-white/20 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors shadow-lg cursor-help">
                          <Wand2 size={28} className="text-accent drop-shadow-md" aria-hidden="true" />
                      </div>
                   </Tooltip>
                   <div>
                      <h3 className="text-3xl font-serif italic text-white drop-shadow-sm">The Digital Atelier</h3>
                      <p className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-bold mt-2">Prototyping Future Realities</p>
                   </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-12">
                    
                    {/* Image Gen Column */}
                    <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-8 flex flex-col h-full hover:border-white/20 transition-all duration-300 shadow-inner group">
                        <div className="flex items-center gap-3 mb-6">
                            <Tooltip text="Imagen 3 Model">
                               <div className="p-2 bg-white/5 rounded-lg border border-white/5 cursor-help group-hover:border-accent/30 transition-colors">
                                 <ImageIcon size={18} className="text-accent" aria-hidden="true" />
                               </div>
                            </Tooltip>
                            <h4 className="text-xs font-bold uppercase tracking-widest text-white">{content.imageGen.title}</h4>
                        </div>
                        <p className="text-sm text-white/50 mb-8 flex-grow leading-relaxed font-light">{content.imageGen.subtitle}</p>
                        
                        <div className="space-y-4">
                            <label htmlFor="image-prompt" className="sr-only">Enter description for image generation</label>
                            <div className="relative">
                                <input 
                                    id="image-prompt"
                                    type="text" 
                                    value={imagePrompt}
                                    onChange={(e) => setImagePrompt(e.target.value)}
                                    placeholder={content.imageGen.placeholder}
                                    disabled={isGeneratingImage}
                                    className="w-full bg-black/60 border border-white/10 px-4 py-4 rounded-xl text-sm text-white focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all placeholder:text-white/20 font-mono shadow-inner"
                                    onKeyDown={(e) => e.key === 'Enter' && handleGenerateImage()}
                                />
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[10px] text-white/20 font-mono">PROMPT ></div>
                            </div>
                            <Tooltip text="Requires API Key" className="w-full">
                                <button
                                    onClick={handleGenerateImage}
                                    disabled={isGeneratingImage || !imagePrompt}
                                    className="w-full bg-white text-void px-6 py-4 rounded-xl hover:bg-accent hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 uppercase tracking-widest text-[10px] font-bold focus:outline-none focus-visible:ring-2 focus-visible:ring-white shadow-lg active:scale-[0.99] duration-150"
                                >
                                    {isGeneratingImage ? <Loader2 size={14} className="animate-spin" /> : 'Generate Concept'}
                                </button>
                            </Tooltip>
                        </div>

                        {/* Image Output Area */}
                        {generatedManifestoImage ? (
                           <div className="mt-8 relative aspect-video bg-black rounded-xl overflow-hidden animate-fadeIn border border-white/20 group/image shadow-2xl">
                              <img src={generatedManifestoImage} alt="Generated Concept Art" className="w-full h-full object-cover transition-transform duration-1000 group-hover/image:scale-105" />
                              <button 
                                onClick={() => setGeneratedManifestoImage(null)} 
                                className="absolute top-3 right-3 bg-black/50 backdrop-blur-md p-2 rounded-full text-white hover:bg-accent transition-colors focus:outline-none focus:ring-2 focus:ring-white border border-white/10"
                                aria-label="Close image"
                              >
                                <X size={14}/>
                              </button>
                           </div>
                        ) : (
                           <div className="mt-8 aspect-video bg-white/[0.02] border border-white/5 rounded-xl flex items-center justify-center relative overflow-hidden">
                               {isGeneratingImage ? (
                                   <div className="flex flex-col items-center gap-3">
                                       <div className="w-1 h-1 bg-accent rounded-full animate-ping"></div>
                                       <span className="text-[9px] uppercase tracking-widest text-accent animate-pulse">Rendering Pixel Data...</span>
                                   </div>
                               ) : (
                                   <div className="text-white/10 text-[9px] uppercase tracking-widest font-medium border border-white/5 px-4 py-2 rounded-full">Output Display</div>
                               )}
                           </div>
                        )}
                        {imageError && <p role="alert" className="text-accent text-[10px] mt-2 text-center font-bold uppercase tracking-wide">Generation failed. Try again.</p>}
                    </div>

                    {/* Video Gen Column */}
                    <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-8 flex flex-col h-full hover:border-white/20 transition-all duration-300 shadow-inner group">
                        <div className="flex items-center gap-3 mb-6">
                            <Tooltip text="Veo Video Model">
                               <div className="p-2 bg-white/5 rounded-lg border border-white/5 cursor-help group-hover:border-accent/30 transition-colors">
                                 <Video size={18} className="text-accent" aria-hidden="true" />
                               </div>
                            </Tooltip>
                            <h4 className="text-xs font-bold uppercase tracking-widest text-white">{content.videoGen.title}</h4>
                        </div>
                        <p className="text-sm text-white/50 mb-8 flex-grow leading-relaxed font-light">{content.videoGen.subtitle}</p>

                        <div className="space-y-4">
                            <div className="w-full bg-black/60 border border-white/10 px-4 py-4 rounded-xl text-xs text-white/40 italic flex items-center justify-between font-mono">
                               <span>Preset: Strategic_Montage_V2</span>
                               <Tooltip text="Preset: High Quality 720p"><div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.5)]"></div></Tooltip>
                            </div>
                            <Tooltip text="Requires API Key and may take time" className="w-full">
                                <button
                                    onClick={handleGenerateVideo}
                                    disabled={isGeneratingVideo}
                                    className="w-full bg-gradient-to-r from-accent to-orange-700 text-white px-6 py-4 rounded-xl hover:shadow-[0_0_25px_rgba(217,70,37,0.3)] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 uppercase tracking-widest text-[10px] font-bold focus:outline-none focus-visible:ring-2 focus-visible:ring-white shadow-lg border border-accent/20 active:scale-[0.99] duration-150"
                                >
                                    {isGeneratingVideo ? <Loader2 size={14} className="animate-spin" /> : 'Generate Video'}
                                </button>
                            </Tooltip>
                        </div>

                         {/* Video Output Area */}
                         {generatedVideoUrl ? (
                           <div className="mt-8 relative aspect-video bg-black rounded-xl overflow-hidden animate-fadeIn border border-white/20 group/video shadow-2xl">
                              <video src={generatedVideoUrl} controls autoPlay loop className="w-full h-full object-cover" />
                              <button 
                                onClick={() => setGeneratedVideoUrl(null)} 
                                className="absolute top-3 right-3 bg-black/50 backdrop-blur-md p-2 rounded-full text-white hover:bg-accent transition-colors focus:outline-none focus:ring-2 focus:ring-white border border-white/10"
                                aria-label="Close video"
                              >
                                <X size={14}/>
                              </button>
                           </div>
                        ) : (
                           <div className="mt-8 aspect-video bg-white/[0.02] border border-white/5 rounded-xl flex items-center justify-center relative overflow-hidden">
                               {isGeneratingVideo ? (
                                 <div className="flex flex-col items-center gap-3">
                                  <Loader2 size={20} className="animate-spin text-accent"/>
                                  <span className="text-[9px] uppercase tracking-widest text-white/40">Processing Frames...</span>
                                 </div>
                               ) : (
                                   <div className="text-white/10 text-[9px] uppercase tracking-widest font-medium border border-white/5 px-4 py-2 rounded-full">Video Display</div>
                               )}
                           </div>
                        )}
                        {videoError && <p role="alert" className="text-accent text-[10px] mt-2 text-center font-bold uppercase tracking-wide">Video generation failed.</p>}
                    </div>

                </div>
            </div>
        </div>

        {/* Timeline & Budget Section */}
        <div className="grid lg:grid-cols-2 gap-20">
          
          {/* Operational Timeline */}
          <div>
             <div className="flex items-center gap-4 mb-10">
               <div className="p-3 bg-white/60 rounded-xl shadow-sm border border-black/5">
                 <Calendar className="text-accent" size={20} aria-hidden="true" /> 
               </div>
               <h4 className="text-2xl font-serif italic text-void">{content.timeline.title}</h4>
             </div>
            
            <div className="space-y-0 pl-6 border-l-2 border-black/5 relative">
              {content.timeline.phases.map((item, i) => (
                <div key={i} className={`relative pl-8 py-8 group hover:bg-gradient-to-r hover:from-white/40 hover:to-transparent transition-all duration-300 rounded-r-2xl border-b border-black/5 last:border-0`}>
                   {/* Timeline Node */}
                   <div className={`absolute -left-[9px] top-10 w-4 h-4 rounded-full border-4 border-paper transition-all duration-500 z-10 ${item.current ? 'bg-accent scale-125 shadow-[0_0_0_4px_rgba(217,70,37,0.2)]' : 'bg-void/20 group-hover:bg-accent'}`}></div>
                   {item.current && <div className="absolute -left-[29px] top-[18px] w-14 h-14 bg-accent/10 rounded-full blur-xl animate-pulse pointer-events-none"></div>}
                   
                   <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                      <h5 className={`text-lg font-bold transition-colors ${item.current ? 'text-accent' : 'text-void group-hover:text-void/80'}`}>{item.title}</h5>
                      <span className={`text-[10px] uppercase tracking-widest font-mono px-3 py-1 rounded-full font-bold transition-colors ${item.current ? 'bg-accent/10 text-accent' : 'bg-black/5 text-void/40'}`}>{item.dates}</span>
                   </div>
                   <p className="text-sm text-void/60 leading-relaxed max-w-lg font-medium">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Budgetary Framework */}
          <div>
            <div className="flex items-center gap-4 mb-10">
               <div className="p-3 bg-white/60 rounded-xl shadow-sm border border-black/5">
                 <TrendingUp className="text-accent" size={20} aria-hidden="true" /> 
               </div>
               <h4 className="text-2xl font-serif italic text-void">{content.budget.title}</h4>
             </div>
            
            <div className="bg-white/60 backdrop-blur-xl p-10 rounded-3xl border border-white/50 shadow-lg mb-8 ring-1 ring-black/5 hover:shadow-xl transition-shadow duration-500">
              <h5 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-8 text-void/40 border-b border-black/5 pb-2">{content.budget.allocationTitle}</h5>
              <ul className="space-y-6">
                {content.budget.items.map((expense, i) => (
                  <li key={i} className="flex flex-col gap-2 group">
                    <span className="text-sm font-bold text-void/70 group-hover:text-accent transition-colors">{expense}</span>
                    <div className="w-full h-1 bg-black/5 rounded-full overflow-hidden">
                       <div className="h-full bg-accent opacity-30 group-hover:opacity-100 transition-all duration-700 w-0 group-hover:w-full ease-out"></div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

             <div className="bg-void text-white p-10 rounded-3xl border border-white/10 relative overflow-hidden shadow-2xl group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-[80px] animate-pulse group-hover:bg-accent/30 transition-colors duration-1000"></div>
              <h5 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-8 text-white/40 border-b border-white/10 pb-2 relative z-10">{content.budget.incomeTitle}</h5>
               <ul className="space-y-5 relative z-10">
                {content.budget.income.map((inc, i) => (
                  <li key={i} className="flex items-center gap-4 text-sm font-medium">
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-accent/50 transition-colors">
                        <Flag size={12} className="text-accent" aria-hidden="true"/>
                    </div>
                    <span className="text-white/80">{inc}</span>
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