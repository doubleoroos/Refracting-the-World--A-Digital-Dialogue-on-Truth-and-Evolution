import React, { useState } from 'react';
import { Section, Language } from '../types';
import { CONTENT } from '../constants';
import { CheckCircle, Globe, Leaf, Users, Calendar, TrendingUp, Flag, ChevronLeft, ChevronRight, Sparkles, Loader2, Image as ImageIcon, X, AlertCircle, Video } from 'lucide-react';
import { summarizeManifesto, generateThematicImage, generateManifestoVideo } from '../services/geminiService';

// Local interface for casting to avoid global namespace pollution/conflicts
interface AIStudio {
  hasSelectedApiKey: () => Promise<boolean>;
  openSelectKey: () => Promise<void>;
}

interface ManifestoProps {
  language: Language;
}

const Manifesto: React.FC<ManifestoProps> = ({ language }) => {
  const content = CONTENT[language].manifesto;
  const [currentSlide, setCurrentSlide] = useState(0);
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

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % content.carousel.items.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + content.carousel.items.length) % content.carousel.items.length);
  };

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
    <section id={Section.MANIFESTO} className="py-24 px-6 bg-paper text-void">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="mb-20 text-center">
          <h2 className="text-xs font-bold tracking-widest uppercase text-accent mb-4">{content.tag}</h2>
          <h3 className="text-3xl md:text-5xl font-serif mb-8 leading-tight">
            {content.title}
          </h3>
        </div>

        {/* Strategic Alignment Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          <div className="bg-white p-6 rounded-sm shadow-sm border border-black/5 hover:border-accent/30 transition-colors">
            <div className="w-10 h-10 bg-accent/10 flex items-center justify-center rounded-full mb-4">
              <Users className="text-accent" size={20} />
            </div>
            <h4 className="text-base font-bold mb-2">{content.cards.pool.title}</h4>
            <p className="text-xs text-void/70 leading-relaxed">
              {content.cards.pool.desc}
            </p>
          </div>

          <div className="bg-white p-6 rounded-sm shadow-sm border border-black/5 hover:border-accent/30 transition-colors">
            <div className="w-10 h-10 bg-accent/10 flex items-center justify-center rounded-full mb-4">
              <Leaf className="text-accent" size={20} />
            </div>
            <h4 className="text-base font-bold mb-2">{content.cards.eco.title}</h4>
            <p className="text-xs text-void/70 leading-relaxed">
              {content.cards.eco.desc}
            </p>
          </div>

          <div className="bg-white p-6 rounded-sm shadow-sm border border-black/5 hover:border-accent/30 transition-colors">
            <div className="w-10 h-10 bg-accent/10 flex items-center justify-center rounded-full mb-4">
              <Globe className="text-accent" size={20} />
            </div>
            <h4 className="text-base font-bold mb-2">{content.cards.access.title}</h4>
            <p className="text-xs text-void/70 leading-relaxed">
              {content.cards.access.desc}
            </p>
          </div>

          <div className="bg-white p-6 rounded-sm shadow-sm border border-black/5 hover:border-accent/30 transition-colors">
            <div className="w-10 h-10 bg-accent/10 flex items-center justify-center rounded-full mb-4">
              <CheckCircle className="text-accent" size={20} />
            </div>
            <h4 className="text-base font-bold mb-2">{content.cards.fair.title}</h4>
            <p className="text-xs text-void/70 leading-relaxed">
              {content.cards.fair.desc}
            </p>
          </div>
        </div>

        {/* Executive Summary Section (AI) */}
        <div className="max-w-3xl mx-auto mb-24">
          <div className="text-center mb-8">
            {!summary ? (
              <button 
                onClick={handleSummarize}
                disabled={isSummarizing}
                className="group inline-flex items-center gap-3 bg-void text-white px-8 py-4 rounded-full hover:bg-accent transition-all duration-300 disabled:opacity-50 hover:scale-105 shadow-lg"
              >
                {isSummarizing ? <Loader2 size={18} className="animate-spin"/> : <Sparkles size={18} className="group-hover:animate-pulse"/>}
                <span className="text-xs uppercase tracking-widest font-bold">
                  {isSummarizing ? content.summary.loading : content.summary.button}
                </span>
              </button>
            ) : (
              <div className="bg-gradient-to-br from-white to-accent/5 p-10 rounded-sm shadow-md border border-accent/20 animate-fadeIn text-left relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                   <Sparkles size={120} className="text-accent"/>
                </div>
                <div className="flex items-center gap-3 mb-6 border-b border-accent/10 pb-4">
                  <Sparkles size={18} className="text-accent" />
                  <h4 className="text-xs font-bold uppercase tracking-widest text-void/40">{content.summary.title}</h4>
                </div>
                <p className="text-xl font-serif italic leading-relaxed text-void/90 relative z-10">
                  "{summary}"
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Image Generation Section */}
        <div className="max-w-3xl mx-auto mb-12 bg-white p-8 md:p-10 rounded-sm shadow-lg border border-black/5 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-accent"></div>
            
            <div className="text-center mb-8">
                <h4 className="text-2xl font-serif italic mb-3">{content.imageGen.title}</h4>
                <p className="text-xs text-void/60 uppercase tracking-widest">{content.imageGen.subtitle}</p>
            </div>

            <div className="flex flex-col gap-6 relative">
                <div className="flex flex-col md:flex-row gap-3">
                    <input 
                        type="text" 
                        value={imagePrompt}
                        onChange={(e) => setImagePrompt(e.target.value)}
                        placeholder={content.imageGen.placeholder}
                        disabled={isGeneratingImage}
                        className="flex-1 bg-paper border border-black/10 px-6 py-4 rounded-sm text-sm focus:outline-none focus:border-accent transition-colors disabled:opacity-50"
                        onKeyDown={(e) => e.key === 'Enter' && handleGenerateImage()}
                    />
                    <button
                        onClick={handleGenerateImage}
                        disabled={isGeneratingImage || !imagePrompt}
                        className="bg-void text-white px-8 py-4 rounded-sm hover:bg-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-w-[160px]"
                    >
                        {isGeneratingImage ? <Loader2 size={18} className="animate-spin" /> : <ImageIcon size={18} />}
                        <span className="text-xs font-bold uppercase tracking-widest">{content.imageGen.button}</span>
                    </button>
                </div>

                {imageError && (
                    <div className="flex items-center gap-2 text-accent text-xs animate-fadeIn justify-center bg-accent/5 p-3 rounded-sm">
                        <AlertCircle size={14} />
                        <span>Generation failed. Please try a different prompt.</span>
                    </div>
                )}

                {generatedManifestoImage && (
                    <div className="relative mt-4 aspect-video bg-black/5 rounded-sm overflow-hidden animate-fadeIn group shadow-inner border border-black/10">
                        <img src={generatedManifestoImage} alt="Generated Vision" className="w-full h-full object-cover" />
                        <button 
                            onClick={() => setGeneratedManifestoImage(null)}
                            className="absolute top-4 right-4 w-8 h-8 bg-black/50 backdrop-blur text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-accent hover:scale-110"
                        >
                            <X size={16} />
                        </button>
                         <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent text-white translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                            <span className="text-[10px] uppercase tracking-widest text-accent mb-1 block">Prompt</span>
                            <p className="text-sm font-serif italic opacity-90">"{imagePrompt}"</p>
                        </div>
                    </div>
                )}
            </div>
        </div>

        {/* Video Generation Section */}
        <div className="max-w-3xl mx-auto mb-24 bg-void text-white p-8 md:p-10 rounded-sm shadow-2xl border border-white/10 relative overflow-hidden">
             {/* Decorative background blur */}
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-accent/20 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="relative z-10 text-center mb-8">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/10 mb-4">
                   <Video size={24} className="text-accent" />
                </div>
                <h4 className="text-2xl font-serif italic mb-3">{content.videoGen.title}</h4>
                <p className="text-xs text-white/60 uppercase tracking-widest max-w-md mx-auto">{content.videoGen.subtitle}</p>
            </div>

            <div className="relative z-10 flex flex-col items-center gap-6">
                <button
                    onClick={handleGenerateVideo}
                    disabled={isGeneratingVideo}
                    className="bg-accent text-white px-10 py-4 rounded-sm hover:bg-white hover:text-void transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 min-w-[200px] shadow-[0_0_20px_rgba(217,70,37,0.4)] hover:shadow-none"
                >
                    {isGeneratingVideo ? <Loader2 size={18} className="animate-spin" /> : <Sparkles size={18} />}
                    <span className="text-xs font-bold uppercase tracking-widest">{content.videoGen.button}</span>
                </button>

                {isGeneratingVideo && (
                  <div className="text-xs text-white/50 animate-pulse">
                    {content.videoGen.loading}
                  </div>
                )}

                {videoError && (
                    <div className="flex items-center gap-2 text-accent text-xs animate-fadeIn justify-center bg-white/5 p-3 rounded-sm border border-accent/20">
                        <AlertCircle size={14} />
                        <span>Video generation failed. Please try again.</span>
                    </div>
                )}

                {generatedVideoUrl && (
                    <div className="relative w-full aspect-video bg-black rounded-sm overflow-hidden animate-fadeIn border border-white/10 shadow-2xl mt-4">
                        <video 
                          controls 
                          className="w-full h-full object-cover" 
                          src={generatedVideoUrl} 
                          autoPlay
                          loop
                        />
                        <button 
                            onClick={() => setGeneratedVideoUrl(null)}
                            className="absolute top-4 right-4 w-8 h-8 bg-white/10 backdrop-blur text-white rounded-full flex items-center justify-center hover:bg-accent transition-colors z-20"
                        >
                            <X size={16} />
                        </button>
                    </div>
                )}
            </div>
        </div>

        {/* Key Works Carousel */}
        <div className="mb-24">
          <h4 className="text-center font-serif text-2xl mb-10 italic text-void/80">{content.carousel.title}</h4>
          <div className="relative max-w-4xl mx-auto aspect-[16/9] bg-black rounded-sm overflow-hidden shadow-2xl group">
             
             {/* Slides */}
             {content.carousel.items.map((item, index) => (
               <div 
                  key={index} 
                  className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
               >
                  <img src={item.image} alt={item.altText} className="w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent text-white">
                    <h5 className="text-2xl font-serif italic mb-1">{item.caption}</h5>
                    <p className="text-xs uppercase tracking-widest text-accent">{item.artist}</p>
                  </div>
               </div>
             ))}

             {/* Controls */}
             <button 
               onClick={prevSlide}
               className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur hover:bg-accent text-white flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 hover:scale-110"
               aria-label="Previous slide"
             >
               <ChevronLeft size={24} />
             </button>
             <button 
               onClick={nextSlide}
               className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur hover:bg-accent text-white flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 hover:scale-110"
               aria-label="Next slide"
             >
               <ChevronRight size={24} />
             </button>

             {/* Indicators */}
             <div className="absolute top-6 right-6 flex gap-2">
               {content.carousel.items.map((_, idx) => (
                 <div 
                    key={idx} 
                    className={`h-1 rounded-full transition-all ${idx === currentSlide ? 'bg-accent w-8' : 'bg-white/50 w-2'}`}
                 ></div>
               ))}
             </div>

          </div>
        </div>

        {/* Timeline & Budget Section */}
        <div className="grid md:grid-cols-2 gap-16">
          
          {/* Operational Timeline */}
          <div>
            <h4 className="flex items-center gap-2 text-xl font-serif mb-8 text-void/90">
              <Calendar className="text-accent" size={24} /> {content.timeline.title}
            </h4>
            <div className="space-y-8 border-l-2 border-black/10 pl-8 relative">
              {content.timeline.phases.map((item, i) => (
                <div key={i} className="relative group">
                   <div className={`absolute -left-[41px] w-5 h-5 rounded-full border-4 border-paper transition-colors ${item.current ? 'bg-accent scale-125' : 'bg-void/20 group-hover:bg-void/40'}`}></div>
                   <span className="text-xs font-bold uppercase tracking-widest text-accent block mb-1">{item.phase}: {item.dates}</span>
                   <h5 className="text-lg font-bold mb-1">{item.title}</h5>
                   <p className="text-sm text-void/60">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Budgetary Framework */}
          <div>
            <h4 className="flex items-center gap-2 text-xl font-serif mb-8 text-void/90">
              <TrendingUp className="text-accent" size={24} /> {content.budget.title}
            </h4>
            
            <div className="bg-white p-8 rounded-sm border border-black/5 shadow-sm mb-8 hover:shadow-md transition-shadow">
              <h5 className="text-xs font-bold uppercase tracking-widest mb-6 text-void/40">{content.budget.allocationTitle}</h5>
              <ul className="space-y-4">
                {content.budget.items.map((expense, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    {expense}
                  </li>
                ))}
              </ul>
            </div>

             <div className="bg-void/5 p-8 rounded-sm border border-black/5 hover:bg-void/10 transition-colors">
              <h5 className="text-xs font-bold uppercase tracking-widest mb-6 text-void/40">{content.budget.incomeTitle}</h5>
               <ul className="space-y-4">
                {content.budget.income.map((inc, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    <Flag size={16} className="mt-0.5 opacity-50 min-w-[16px]"/>
                    <span>{inc}</span>
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