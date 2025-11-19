import React, { useState } from 'react';
import { Section, Language } from '../types';
import { CONTENT } from '../constants';
import { CheckCircle, Globe, Leaf, Users, Calendar, TrendingUp, Flag, ChevronLeft, ChevronRight, Sparkles, Loader2, Image as ImageIcon, X } from 'lucide-react';
import { summarizeManifesto, generateThematicImage } from '../services/geminiService';

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
    const result = await generateThematicImage(imagePrompt);
    setGeneratedManifestoImage(result);
    setIsGeneratingImage(false);
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
          <div className="bg-white p-6 rounded-sm shadow-sm border border-black/5">
            <div className="w-10 h-10 bg-accent/10 flex items-center justify-center rounded-full mb-4">
              <Users className="text-accent" size={20} />
            </div>
            <h4 className="text-base font-bold mb-2">{content.cards.pool.title}</h4>
            <p className="text-xs text-void/70 leading-relaxed">
              {content.cards.pool.desc}
            </p>
          </div>

          <div className="bg-white p-6 rounded-sm shadow-sm border border-black/5">
            <div className="w-10 h-10 bg-accent/10 flex items-center justify-center rounded-full mb-4">
              <Leaf className="text-accent" size={20} />
            </div>
            <h4 className="text-base font-bold mb-2">{content.cards.eco.title}</h4>
            <p className="text-xs text-void/70 leading-relaxed">
              {content.cards.eco.desc}
            </p>
          </div>

          <div className="bg-white p-6 rounded-sm shadow-sm border border-black/5">
            <div className="w-10 h-10 bg-accent/10 flex items-center justify-center rounded-full mb-4">
              <Globe className="text-accent" size={20} />
            </div>
            <h4 className="text-base font-bold mb-2">{content.cards.access.title}</h4>
            <p className="text-xs text-void/70 leading-relaxed">
              {content.cards.access.desc}
            </p>
          </div>

          <div className="bg-white p-6 rounded-sm shadow-sm border border-black/5">
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
        <div className="max-w-3xl mx-auto mb-24 text-center">
          {!summary && (
            <button 
              onClick={handleSummarize}
              disabled={isSummarizing}
              className="inline-flex items-center gap-2 bg-void text-white px-8 py-3 rounded-full hover:bg-accent transition-colors disabled:opacity-50"
            >
              {isSummarizing ? <Loader2 size={16} className="animate-spin"/> : <Sparkles size={16} />}
              <span className="text-xs uppercase tracking-widest font-bold">
                {isSummarizing ? content.summary.loading : content.summary.button}
              </span>
            </button>
          )}

          {summary && (
            <div className="bg-white p-8 rounded-sm shadow-sm border border-black/5 animate-fadeIn text-left">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles size={16} className="text-accent" />
                <h4 className="text-xs font-bold uppercase tracking-widest text-void/40">{content.summary.title}</h4>
              </div>
              <p className="text-lg font-serif italic leading-relaxed text-void/80">
                "{summary}"
              </p>
            </div>
          )}
        </div>

        {/* NEW: Image Generation Section */}
        <div className="max-w-3xl mx-auto mb-24 bg-white p-8 rounded-sm shadow-sm border border-black/5">
            <div className="text-center mb-6">
                <h4 className="text-xl font-serif italic mb-2">{content.imageGen.title}</h4>
                <p className="text-xs text-void/60 uppercase tracking-widest">{content.imageGen.subtitle}</p>
            </div>

            <div className="flex flex-col gap-4 relative">
                <div className="flex gap-2">
                    <input 
                        type="text" 
                        value={imagePrompt}
                        onChange={(e) => setImagePrompt(e.target.value)}
                        placeholder={content.imageGen.placeholder}
                        className="flex-1 bg-paper border border-black/10 px-4 py-3 rounded-sm text-sm focus:outline-none focus:border-accent transition-colors"
                        onKeyDown={(e) => e.key === 'Enter' && handleGenerateImage()}
                    />
                    <button
                        onClick={handleGenerateImage}
                        disabled={isGeneratingImage || !imagePrompt}
                        className="bg-void text-white px-6 py-3 rounded-sm hover:bg-accent transition-colors disabled:opacity-50 flex items-center gap-2"
                    >
                        {isGeneratingImage ? <Loader2 size={16} className="animate-spin" /> : <ImageIcon size={16} />}
                        <span className="text-xs font-bold uppercase tracking-widest hidden md:inline">{content.imageGen.button}</span>
                    </button>
                </div>

                {generatedManifestoImage && (
                    <div className="relative mt-4 aspect-video bg-black/5 rounded-sm overflow-hidden animate-fadeIn group">
                        <img src={generatedManifestoImage} alt="Generated Vision" className="w-full h-full object-cover" />
                        <button 
                            onClick={() => setGeneratedManifestoImage(null)}
                            className="absolute top-4 right-4 w-8 h-8 bg-black/50 backdrop-blur text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-accent"
                        >
                            <X size={16} />
                        </button>
                         <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-white opacity-0 group-hover:opacity-100 transition-opacity">
                            <p className="text-xs font-serif italic">"{imagePrompt}"</p>
                        </div>
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
               className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 backdrop-blur hover:bg-accent text-white flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
               aria-label="Previous slide"
             >
               <ChevronLeft size={20} />
             </button>
             <button 
               onClick={nextSlide}
               className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 backdrop-blur hover:bg-accent text-white flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
               aria-label="Next slide"
             >
               <ChevronRight size={20} />
             </button>

             {/* Indicators */}
             <div className="absolute top-6 right-6 flex gap-2">
               {content.carousel.items.map((_, idx) => (
                 <div 
                    key={idx} 
                    className={`w-1.5 h-1.5 rounded-full transition-all ${idx === currentSlide ? 'bg-accent w-4' : 'bg-white/50'}`}
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
                <div key={i} className="relative">
                   <div className={`absolute -left-[41px] w-5 h-5 rounded-full border-4 border-paper ${item.current ? 'bg-accent' : 'bg-void/20'}`}></div>
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
            
            <div className="bg-white p-8 rounded-sm border border-black/5 shadow-sm mb-8">
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

             <div className="bg-void/5 p-8 rounded-sm border border-black/5">
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