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
const Tooltip: React.FC<{ text: string; children: React.ReactNode }> = ({ text, children }) => (
  <div className="relative group flex items-center justify-center">
    {children}
    <div 
      role="tooltip"
      className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-4 py-2 bg-black/80 backdrop-blur-xl border border-white/20 text-white text-[10px] font-bold uppercase tracking-[0.2em] whitespace-nowrap rounded-lg opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 pointer-events-none z-50 shadow-[0_10px_40px_-10px_rgba(255,255,255,0.2)]"
    >
      {text}
      <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[1px] border-4 border-transparent border-t-black/80"></div>
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
          <div className="flex items-center justify-center gap-2 mb-4">
             <div className="w-8 h-px bg-accent"></div>
             <h2 className="text-xs font-bold tracking-[0.3em] uppercase text-accent">{content.tag}</h2>
             <div className="w-8 h-px bg-accent"></div>
          </div>
          <h3 className="text-4xl md:text-6xl font-serif mb-6 leading-tight text-void">
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
            <div key={idx} className="bg-white/60 backdrop-blur-xl p-8 rounded-2xl shadow-sm border border-white/60 hover:border-accent/50 transition-all hover:-translate-y-1 hover:shadow-lg">
              <div className="w-14 h-14 bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center rounded-full mb-6 border border-accent/10 shadow-inner">
                <item.icon className="text-accent" size={24} aria-hidden="true" />
              </div>
              <h4 className="text-sm font-bold uppercase tracking-wide mb-3 text-void">{item.data.title}</h4>
              <p className="text-base text-void/70 leading-relaxed font-serif">
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
               <span className="bg-paper px-4 text-xs uppercase tracking-widest text-void/40 font-medium">AI Strategic Synthesis</span>
             </div>
           </div>

          <div className="mt-8 text-center">
            {!summary ? (
              <button 
                onClick={handleSummarize}
                disabled={isSummarizing}
                className="group relative inline-flex items-center gap-3 bg-void text-white px-12 py-5 rounded-full hover:bg-accent transition-all duration-300 disabled:opacity-50 hover:shadow-2xl overflow-hidden focus:outline-none focus:ring-4 focus:ring-accent/20"
              >
                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                {isSummarizing ? <Loader2 size={20} className="animate-spin"/> : (
                  <Tooltip text="Strategic Synthesis">
                    <Sparkles size={20} className="text-accent group-hover:text-white transition-colors" />
                  </Tooltip>
                )}
                <span className="text-sm uppercase tracking-widest font-bold relative z-10 ml-2">
                  {isSummarizing ? content.summary.loading : content.summary.button}
                </span>
              </button>
            ) : (
              <div className="bg-white/80 backdrop-blur-xl p-12 rounded-2xl shadow-xl border border-white/60 animate-fadeIn text-left relative overflow-hidden ring-1 ring-black/5">
                <div className="absolute -right-10 -top-10 text-accent/5">
                   <Sparkles size={200} />
                </div>
                <div className="flex items-center gap-3 mb-8 border-b border-accent/10 pb-4">
                  <div className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center shadow-lg">
                      <Sparkles size={16} />
                  </div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-void/50">{content.summary.title}</h4>
                </div>
                <p className="text-2xl font-serif italic leading-relaxed text-void/80 relative z-10">
                  "{summary}"
                </p>
              </div>
            )}
          </div>
        </div>

        {/* THE DIGITAL ATELIER (Combined Gen AI Section) */}
        <div className="mb-32 bg-void text-white rounded-3xl overflow-hidden shadow-2xl relative border border-white/10">
            {/* Background Texture & Gradient */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/20 rounded-full blur-[120px] pointer-events-none mix-blend-screen animate-blob"></div>
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none mix-blend-screen animate-blob" style={{animationDelay: '5s'}}></div>

            <div className="relative z-10 p-8 md:p-16 bg-white/5 backdrop-blur-3xl">
                <div className="flex items-center gap-4 mb-12">
                   <Tooltip text="Generative Studio">
                      <div className="p-4 border border-white/20 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors shadow-lg cursor-help">
                          <Wand2 size={28} className="text-accent drop-shadow-md" aria-hidden="true" />
                      </div>
                   </Tooltip>
                   <div>
                      <h3 className="text-3xl font-serif italic text-white drop-shadow-sm">The Digital Atelier</h3>
                      <p className="text-xs uppercase tracking-widest text-white/50 font-bold mt-1">Prototyping Future Realities</p>
                   </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-12">
                    
                    {/* Image Gen Column */}
                    <div className="bg-black/30 backdrop-blur-md border border-white/10 rounded-2xl p-8 flex flex-col h-full hover:border-white/20 transition-colors shadow-inner">
                        <div className="flex items-center gap-3 mb-6">
                            <Tooltip text="Imagen 3 Model">
                               <div className="p-2 bg-white/5 rounded-lg border border-white/5 cursor-help">
                                 <ImageIcon size={20} className="text-accent" aria-hidden="true" />
                               </div>
                            </Tooltip>
                            <h4 className="text-sm font-bold uppercase tracking-wide text-white">{content.imageGen.title}</h4>
                        </div>
                        <p className="text-sm text-white/60 mb-6 flex-grow leading-relaxed">{content.imageGen.subtitle}</p>
                        
                        <div className="space-y-4">
                            <label htmlFor="image-prompt" className="sr-only">Enter description for image generation</label>
                            <input 
                                id="image-prompt"
                                type="text" 
                                value={imagePrompt}
                                onChange={(e) => setImagePrompt(e.target.value)}
                                placeholder={content.imageGen.placeholder}
                                disabled={isGeneratingImage}
                                className="w-full bg-black/40 border border-white/10 px-4 py-4 rounded-xl text-sm text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors placeholder:text-white/20"
                                onKeyDown={(e) => e.key === 'Enter' && handleGenerateImage()}
                            />
                            <button
                                onClick={handleGenerateImage}
                                disabled={isGeneratingImage || !imagePrompt}
                                className="w-full bg-white text-void px-6 py-4 rounded-xl hover:bg-accent hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 uppercase tracking-widest text-xs font-bold focus:outline-none focus:ring-2 focus:ring-white shadow-lg"
                            >
                                {isGeneratingImage ? <Loader2 size={16} className="animate-spin" /> : 'Generate Concept'}
                            </button>
                        </div>

                        {/* Image Output Area */}
                        {generatedManifestoImage ? (
                           <div className="mt-6 relative aspect-video bg-black rounded-xl overflow-hidden animate-fadeIn border border-white/20 group shadow-2xl">
                              <img src={generatedManifestoImage} alt="Generated Concept Art" className="w-full h-full object-cover" />
                              <button 
                                onClick={() => setGeneratedManifestoImage(null)} 
                                className="absolute top-2 right-2 bg-black/70 p-2 rounded-full text-white hover:bg-accent transition-colors focus:outline-none focus:ring-2 focus:ring-white"
                                aria-label="Close image"
                              >
                                <X size={16}/>
                              </button>
                           </div>
                        ) : (
                           <div className="mt-6 aspect-video bg-white/5 border border-white/5 rounded-xl flex items-center justify-center text-white/20 text-xs uppercase tracking-widest font-medium">
                               {isGeneratingImage ? 'Rendering...' : 'Output Display'}
                           </div>
                        )}
                        {imageError && <p role="alert" className="text-accent text-xs mt-2 text-center font-bold">Generation failed. Please try again.</p>}
                    </div>

                    {/* Video Gen Column */}
                    <div className="bg-black/30 backdrop-blur-md border border-white/10 rounded-2xl p-8 flex flex-col h-full hover:border-white/20 transition-colors shadow-inner">
                        <div className="flex items-center gap-3 mb-6">
                            <Tooltip text="Veo Video Model">
                               <div className="p-2 bg-white/5 rounded-lg border border-white/5 cursor-help">
                                 <Video size={20} className="text-accent" aria-hidden="true" />
                               </div>
                            </Tooltip>
                            <h4 className="text-sm font-bold uppercase tracking-wide text-white">{content.videoGen.title}</h4>
                        </div>
                        <p className="text-sm text-white/60 mb-6 flex-grow leading-relaxed">{content.videoGen.subtitle}</p>

                        <div className="space-y-4">
                            <div className="w-full bg-black/40 border border-white/10 px-4 py-4 rounded-xl text-sm text-white/50 italic flex items-center justify-between">
                               <span>Preset: Strategic Roadmap Cinematic Montage</span>
                               <Tooltip text="Preset: High Quality 720p"><div className="w-2 h-2 rounded-full bg-accent animate-pulse"></div></Tooltip>
                            </div>
                            <button
                                onClick={handleGenerateVideo}
                                disabled={isGeneratingVideo}
                                className="w-full bg-gradient-to-r from-accent to-orange-600 text-white px-6 py-4 rounded-xl hover:shadow-[0_0_20px_rgba(217,70,37,0.4)] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 uppercase tracking-widest text-xs font-bold focus:outline-none focus:ring-2 focus:ring-white shadow-lg"
                            >
                                {isGeneratingVideo ? <Loader2 size={16} className="animate-spin" /> : 'Generate Video'}
                            </button>
                        </div>

                         {/* Video Output Area */}
                         {generatedVideoUrl ? (
                           <div className="mt-6 relative aspect-video bg-black rounded-xl overflow-hidden animate-fadeIn border border-white/20 group shadow-2xl">
                              <video src={generatedVideoUrl} controls autoPlay loop className="w-full h-full object-cover" />
                              <button 
                                onClick={() => setGeneratedVideoUrl(null)} 
                                className="absolute top-2 right-2 bg-black/70 p-2 rounded-full text-white hover:bg-accent transition-colors focus:outline-none focus:ring-2 focus:ring-white"
                                aria-label="Close video"
                              >
                                <X size={16}/>
                              </button>
                           </div>
                        ) : (
                           <div className="mt-6 aspect-video bg-white/5 border border-white/5 rounded-xl flex items-center justify-center text-white/20 text-xs uppercase tracking-widest flex-col gap-2 font-medium">
                               {isGeneratingVideo ? (
                                 <>
                                  <Loader2 size={24} className="animate-spin text-accent"/>
                                  <span>Processing Frames...</span>
                                 </>
                               ) : 'Video Display'}
                           </div>
                        )}
                        {videoError && <p role="alert" className="text-accent text-xs mt-2 text-center font-bold">Video generation failed.</p>}
                    </div>

                </div>
            </div>
        </div>

        {/* Timeline & Budget Section */}
        <div className="grid lg:grid-cols-2 gap-20">
          
          {/* Operational Timeline */}
          <div>
             <div className="flex items-center gap-3 mb-8">
               <Calendar className="text-accent" size={28} aria-hidden="true" /> 
               <h4 className="text-2xl font-serif italic text-void">{content.timeline.title}</h4>
             </div>
            
            <div className="space-y-0 pl-4 border-l-2 border-black/5">
              {content.timeline.phases.map((item, i) => (
                <div key={i} className={`relative pl-8 py-6 group border-b border-black/5 last:border-0 hover:bg-white/60 transition-colors rounded-r-lg`}>
                   <div className={`absolute -left-[9px] top-8 w-4 h-4 rounded-full border-4 border-paper transition-all duration-300 ${item.current ? 'bg-accent scale-110 shadow-lg' : 'bg-void/10 group-hover:bg-accent'}`}></div>
                   <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                      <h5 className={`text-lg font-bold transition-colors ${item.current ? 'text-accent' : 'text-void'}`}>{item.title}</h5>
                      <span className="text-[10px] uppercase tracking-widest text-void/50 font-mono bg-black/5 px-3 py-1 rounded-full font-bold">{item.dates}</span>
                   </div>
                   <p className="text-base text-void/60 leading-relaxed max-w-lg">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Budgetary Framework */}
          <div>
            <div className="flex items-center gap-3 mb-8">
               <TrendingUp className="text-accent" size={28} aria-hidden="true" /> 
               <h4 className="text-2xl font-serif italic text-void">{content.budget.title}</h4>
             </div>
            
            <div className="bg-white/60 backdrop-blur-xl p-10 rounded-2xl border border-white/50 shadow-lg mb-8 ring-1 ring-black/5">
              <h5 className="text-xs font-bold uppercase tracking-widest mb-6 text-void/40 border-b border-black/5 pb-2">{content.budget.allocationTitle}</h5>
              <ul className="space-y-5">
                {content.budget.items.map((expense, i) => (
                  <li key={i} className="flex items-center justify-between text-sm font-medium text-void/70 group">
                    <span className="group-hover:text-accent transition-colors">{expense}</span>
                    <div className="w-16 h-1.5 bg-black/5 rounded-full overflow-hidden">
                       <div className="h-full bg-accent opacity-0 group-hover:opacity-100 transition-all w-[70%] shadow-[0_0_10px_#d94625]"></div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

             <div className="bg-void text-white p-10 rounded-2xl border border-white/10 relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-40 h-40 bg-accent/20 rounded-full blur-3xl animate-pulse"></div>
              <h5 className="text-xs font-bold uppercase tracking-widest mb-6 text-white/40 border-b border-white/10 pb-2">{content.budget.incomeTitle}</h5>
               <ul className="space-y-4 relative z-10">
                {content.budget.income.map((inc, i) => (
                  <li key={i} className="flex items-start gap-4 text-sm font-medium">
                    <Flag size={16} className="mt-0.5 text-accent" aria-hidden="true"/>
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