import React, { useState } from 'react';
import { FAQ_ITEMS } from '../data/content';
import { HelpCircle, ChevronDown, MessageSquare, ArrowUpRight } from 'lucide-react';

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
    <section id="faq" className="py-24 bg-[#060913] border-b border-white/[0.08] relative scroll-mt-24 overflow-hidden">
      {/* Background ambient */}
      <div className="absolute top-1/2 left-10 w-96 h-96 bg-blue-600/[0.03] blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-sky-400 mb-3 shadow-sm">
            <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-heading uppercase tracking-wider text-[11px]">Éclairage Exécutif</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4 font-heading">
            Questions Fréquentes des Comités de Direction
          </h2>

          <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed">
            Budget, délais, sécurité, choix technologiques : toutes les réponses pour cadrer votre projet en toute sérénité.
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
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-sky-500 text-white shadow-md shadow-sky-500/25 ring-1 ring-sky-400 font-heading'
                  : 'bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-850 border border-white/[0.08]'
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
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'bg-slate-900/90 border-sky-500/50 shadow-xl'
                    : 'bg-slate-950/70 border-white/[0.07] hover:border-white/[0.15]'
                }`}
              >
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-mono font-semibold uppercase text-sky-400 bg-sky-500/10 px-2.5 py-1 rounded border border-sky-500/20 hidden sm:inline-block">
                      {item.category}
                    </span>
                    <span className="text-base sm:text-lg font-bold text-white font-heading">
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
                  <div className="px-5 pb-6 sm:px-6 pt-0 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/[0.06] mt-1 font-sans">
                    <p className="pt-4">{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="p-6 rounded-2xl bg-slate-900/70 border border-white/[0.08] text-center max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 backdrop-blur-md">
          <span className="text-xs text-slate-300 font-sans">
            Une question spécifique à votre secteur ou à votre architecture actuelle ?
          </span>
          <button
            onClick={() => onOpenConsultation("Question personnalisée")}
            className="shrink-0 text-xs font-bold text-sky-400 hover:text-sky-300 inline-flex items-center gap-1 cursor-pointer font-heading"
          >
            <span>Poser votre question à un associé</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
