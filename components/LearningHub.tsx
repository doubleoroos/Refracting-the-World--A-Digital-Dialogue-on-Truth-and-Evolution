import React, { useState, useEffect } from 'react';
import { Section, Language } from '../types';
import { CONTENT } from '../constants';
import { explainTechnique } from '../services/geminiService';
import { BookOpen, ArrowRight, Loader2 } from 'lucide-react';

interface LearningHubProps {
  language: Language;
}

const LearningHub: React.FC<LearningHubProps> = ({ language }) => {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [explanation, setExplanation] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const content = CONTENT[language].pillarC;

  // Reset state when language changes to avoid mismatched content
  useEffect(() => {
    setSelectedTopic(null);
    setExplanation(null);
  }, [language]);

  const handleTopicClick = async (topic: string) => {
    setSelectedTopic(topic);
    setLoading(true);
    setExplanation(null);
    const text = await explainTechnique(topic, language);
    setExplanation(text);
    setLoading(false);
  };

  return (
    <section id={Section.LEARNING} className="py-24 px-6 md:px-12 bg-void text-paper border-t border-white/5 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-void via-void to-blue-900/10 pointer-events-none"></div>

      <div className="max-w-4xl mx-auto text-center mb-16 relative z-10">
        <div className="flex justify-center items-center gap-4 mb-6">
            <span className="text-6xl text-white/5 font-serif font-bold" aria-hidden="true">C</span>
            <h3 className="text-accent tracking-widest uppercase text-xs font-bold bg-accent/10 px-4 py-1.5 rounded-full border border-accent/20 shadow-[0_0_15px_rgba(217,70,37,0.1)]">{content.tag}</h3>
        </div>
        <h2 className="text-3xl md:text-4xl font-serif italic mb-6 text-white">{content.title}</h2>
        <p className="text-white/60 max-w-2xl mx-auto text-lg leading-relaxed font-light">
          {content.description}
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 relative z-10">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-xl">
          <h3 className="text-lg font-bold mb-8 flex items-center gap-3 text-white uppercase tracking-wider">
            <BookOpen className="text-accent" size={20} aria-hidden="true" />
            {content.curriculumTitle}
          </h3>
          <div className="space-y-4" role="list">
            {content.topics.map((topic) => (
              <button
                key={topic}
                onClick={() => handleTopicClick(topic)}
                aria-current={selectedTopic === topic ? 'true' : 'false'}
                className={`w-full text-left p-6 rounded-xl border transition-all flex justify-between items-center group focus:outline-none focus-visible:ring-2 focus-visible:ring-accent relative overflow-hidden
                  ${selectedTopic === topic 
                    ? 'bg-white text-void border-white shadow-[0_0_20px_rgba(255,255,255,0.1)] translate-x-2' 
                    : 'bg-white/5 border-white/5 hover:border-white/20 text-white/70 hover:bg-white/10 hover:translate-x-1'}`}
              >
                <span className="font-medium text-sm relative z-10">{topic}</span>
                <ArrowRight size={16} className={`relative z-10 transition-all duration-300 ${selectedTopic === topic ? 'translate-x-0 opacity-100 text-accent' : '-translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-50'}`} aria-hidden="true"/>
              </button>
            ))}
          </div>
          <div className="mt-8 pt-6 border-t border-white/10 text-[10px] uppercase tracking-wider text-white/40">
            {content.note}
          </div>
        </div>

        <div 
          className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl border border-white/10 p-12 rounded-2xl min-h-[400px] flex flex-col justify-center items-center text-center relative overflow-hidden shadow-2xl"
          aria-live="polite"
        >
           {!selectedTopic && (
             <p className="text-white/30 italic text-lg font-serif">{language === 'fr' ? 'Sélectionnez un module...' : 'Select a curriculum module to begin...'}</p>
           )}

           {loading && (
             <div className="flex flex-col items-center gap-4 text-accent">
               <Loader2 size={32} className="animate-spin" aria-hidden="true" />
               <span className="text-[10px] uppercase tracking-[0.2em] font-bold animate-pulse">{content.loading}</span>
             </div>
           )}

           {explanation && !loading && (
             <div className="text-left animate-fadeIn w-full relative z-10">
                <h4 className="text-accent uppercase tracking-widest text-[10px] font-bold mb-6 border-b border-white/10 pb-2 inline-block">{content.preview}</h4>
                <p className="text-xl leading-relaxed font-serif text-white/90 drop-shadow-sm">
                  {explanation}
                </p>
                <div className="mt-12 pt-6 border-t border-white/10 flex justify-between items-center">
                   <span className="text-[9px] text-white/30 uppercase tracking-widest font-mono">AI Model: Gemini 2.5 Flash</span>
                   <span className="text-[9px] text-white/30 uppercase tracking-widest font-mono">Foundation Earth Rising</span>
                </div>
             </div>
           )}
        </div>
      </div>
    </section>
  );
};

export default LearningHub;