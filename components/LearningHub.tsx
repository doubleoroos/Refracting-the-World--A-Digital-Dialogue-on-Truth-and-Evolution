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
            <h3 className="text-accent tracking-widest uppercase text-sm font-bold bg-accent/10 px-4 py-1 rounded-full border border-accent/20">{content.tag}</h3>
        </div>
        <h2 className="text-3xl md:text-4xl font-serif italic mb-6 text-white">{content.title}</h2>
        <p className="text-white/60 max-w-2xl mx-auto text-lg leading-relaxed">
          {content.description}
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 relative z-10">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-xl">
          <h3 className="text-xl font-bold mb-8 flex items-center gap-3 text-white">
            <BookOpen className="text-accent" size={24} aria-hidden="true" />
            {content.curriculumTitle}
          </h3>
          <div className="space-y-4" role="list">
            {content.topics.map((topic) => (
              <button
                key={topic}
                onClick={() => handleTopicClick(topic)}
                aria-current={selectedTopic === topic ? 'true' : 'false'}
                className={`w-full text-left p-5 rounded-xl border transition-all flex justify-between items-center group focus:outline-none focus:ring-2 focus:ring-accent relative overflow-hidden
                  ${selectedTopic === topic 
                    ? 'bg-gradient-to-r from-accent to-orange-600 border-transparent text-white shadow-lg scale-[1.02]' 
                    : 'bg-white/5 border-white/5 hover:border-white/20 text-white/70 hover:bg-white/10'}`}
              >
                <span className="font-medium text-sm relative z-10">{topic}</span>
                <ArrowRight size={18} className={`relative z-10 transition-transform duration-300 ${selectedTopic === topic ? 'translate-x-1' : 'opacity-0 group-hover:opacity-100'}`} aria-hidden="true"/>
              </button>
            ))}
          </div>
          <div className="mt-8 pt-6 border-t border-white/10 text-xs text-white/40 italic">
            {content.note}
          </div>
        </div>

        <div 
          className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl border border-white/10 p-10 rounded-2xl min-h-[350px] flex flex-col justify-center items-center text-center relative overflow-hidden shadow-2xl"
          aria-live="polite"
        >
           {!selectedTopic && (
             <p className="text-white/30 italic text-lg">{language === 'fr' ? 'Sélectionnez un module...' : 'Select a curriculum module to begin...'}</p>
           )}

           {loading && (
             <div className="flex flex-col items-center gap-4 text-accent">
               <Loader2 size={40} className="animate-spin" aria-hidden="true" />
               <span className="text-sm uppercase tracking-widest font-bold">{content.loading}</span>
             </div>
           )}

           {explanation && !loading && (
             <div className="text-left animate-fadeIn w-full relative z-10">
                <h4 className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-orange-500 uppercase tracking-widest text-xs font-bold mb-6 border-b border-white/10 pb-2 inline-block">{content.preview}</h4>
                <p className="text-xl leading-relaxed font-serif text-white/90 drop-shadow-sm">
                  {explanation}
                </p>
                <div className="mt-12 pt-6 border-t border-white/10 flex justify-between items-center">
                   <span className="text-[10px] text-white/30 uppercase tracking-wider">Powered by Gemini 2.5</span>
                   <span className="text-[10px] text-white/30 uppercase tracking-wider">Foundation Earth Rising</span>
                </div>
             </div>
           )}
        </div>
      </div>
    </section>
  );
};

export default LearningHub;