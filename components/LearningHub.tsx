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
    <section id={Section.LEARNING} className="py-24 px-6 md:px-12 bg-void text-paper border-t border-white/10">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <div className="flex justify-center items-center gap-4 mb-6">
            <span className="text-6xl text-white/10 font-serif font-bold">C</span>
            <h3 className="text-accent tracking-widest uppercase text-sm font-medium">{content.tag}</h3>
        </div>
        <h2 className="text-3xl md:text-4xl font-serif italic mb-4">{content.title}</h2>
        <p className="text-white/60">
          {content.description}
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
        <div className="bg-white/5 border border-white/10 p-8 rounded-sm">
          <h3 className="text-xl font-medium mb-6 flex items-center gap-2">
            <BookOpen className="text-accent" size={20} />
            {content.curriculumTitle}
          </h3>
          <div className="space-y-3">
            {content.topics.map((topic) => (
              <button
                key={topic}
                onClick={() => handleTopicClick(topic)}
                className={`w-full text-left p-4 rounded-sm border transition-all flex justify-between items-center group
                  ${selectedTopic === topic 
                    ? 'bg-accent border-accent text-white' 
                    : 'bg-transparent border-white/10 hover:border-white/40 text-white/80'}`}
              >
                <span>{topic}</span>
                <ArrowRight size={16} className={`transition-transform ${selectedTopic === topic ? 'translate-x-1' : 'opacity-0 group-hover:opacity-100'}`}/>
              </button>
            ))}
          </div>
          <div className="mt-8 pt-6 border-t border-white/10 text-xs text-white/40">
            {content.note}
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 p-8 rounded-sm min-h-[300px] flex flex-col justify-center items-center text-center relative overflow-hidden">
           {!selectedTopic && (
             <p className="text-white/30 italic">{language === 'fr' ? 'Sélectionnez un module...' : 'Select a curriculum module...'}</p>
           )}

           {loading && (
             <div className="flex flex-col items-center gap-4 text-accent">
               <Loader2 size={32} className="animate-spin" />
               <span className="text-xs uppercase tracking-widest">{content.loading}</span>
             </div>
           )}

           {explanation && !loading && (
             <div className="text-left animate-fadeIn">
                <h4 className="text-accent uppercase tracking-widest text-xs mb-4">{content.preview}</h4>
                <p className="text-lg leading-relaxed font-serif text-white/90">
                  {explanation}
                </p>
                <div className="mt-8 pt-4 border-t border-white/10 flex justify-between items-center">
                   <span className="text-xs text-white/40">Powered by Google Gemini</span>
                   <span className="text-xs text-white/40">Earth Rising Foundation</span>
                </div>
             </div>
           )}
        </div>
      </div>
    </section>
  );
};

export default LearningHub;