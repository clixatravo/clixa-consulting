import React, { useState } from 'react';
import { FAQ_ITEMS } from '../data/content';
import { HelpCircle, ChevronDown, MessageSquare } from 'lucide-react';

interface FAQSectionProps {
  onOpenConsultation: (topic?: string) => void;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ onOpenConsultation }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Toutes');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const categories = ['Toutes', ...Array.from(new Set(FAQ_ITEMS.map(i => i.category)))];

  const filteredItems = selectedCategory === 'Toutes'
    ? FAQ_ITEMS
    : FAQ_ITEMS.filter(i => i.category === selectedCategory);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-slate-900/30 border-t border-slate-850 relative scroll-mt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-xs font-semibold text-sky-400 mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Foire Aux Questions Stratégiques</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Questions Fréquentes des Dirigeants
          </h2>

          <p className="text-base text-slate-400">
            Toutes les réponses pour cadrer votre démarche de transformation en toute sérénité.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setOpenIndex(0);
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-sky-500 text-white shadow-md shadow-sky-500/25 ring-1 ring-sky-400'
                  : 'bg-slate-950/80 text-slate-400 hover:text-white hover:bg-slate-900 border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3.5 mb-12">
          {filteredItems.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'bg-slate-900 border-sky-500/50 shadow-lg'
                    : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                }`}
              >
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] font-mono font-semibold uppercase text-sky-400 bg-sky-500/10 px-2.5 py-1 rounded border border-sky-500/20 hidden sm:inline-block">
                      {item.category}
                    </span>
                    <span className="text-base sm:text-lg font-bold text-white">
                      {item.question}
                    </span>
                  </div>

                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-sky-400' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 pt-0 text-sm sm:text-base text-slate-300 leading-relaxed border-t border-slate-800/60 mt-1 animate-in fade-in duration-200">
                    <p className="pt-4">{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Extra Question CTA Box */}
        <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 text-center flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h4 className="text-base font-bold text-white">Vous avez une question spécifique sur votre entreprise ?</h4>
            <p className="text-xs text-slate-400">Nos associés répondent sous 24h avec une analyse préliminaire sans engagement.</p>
          </div>

          <button
            onClick={() => onOpenConsultation("Question spécifique FAQ")}
            className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-slate-800 hover:bg-sky-600 border border-slate-700 hover:border-sky-500 transition-colors cursor-pointer"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Poser votre question</span>
          </button>
        </div>

      </div>
    </section>
  );
};
