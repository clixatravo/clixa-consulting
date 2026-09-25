import React, { useState } from 'react';
import { METHODE_STEPS } from '../data/content';
import { Compass, CheckCircle2, ChevronRight, Activity, ArrowRight, ShieldCheck, ArrowUpRight } from 'lucide-react';

interface MethodologieProps {
  onOpenConsultation: (topic?: string) => void;
}

export const Methodologie: React.FC<MethodologieProps> = ({ onOpenConsultation }) => {
  const [activeStep, setActiveStep] = useState<number>(0);

  return (
    <section id="methode" className="py-24 bg-[#060913] border-b border-white/[0.08] relative scroll-mt-24 overflow-hidden">
      {/* Background ambient */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-blue-600/[0.03] blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-sky-400 mb-3 shadow-sm">
            <Compass className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-heading uppercase tracking-wider text-[11px]">Gouvernance & Rigueur d'Exécution</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4 font-heading">
            Une Méthodologie en 4 Phases Éprouvées
          </h2>

          <p className="text-base font-semibold text-sky-300/90 mb-2">
            De la stratégie de cadrage jusqu'à l'adoption opérationnelle sur le terrain
          </p>

          <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed">
            Pas de tunnel de développement sans visibilité. Nous appliquons un découpage par jalons contractuels garantissant la maîtrise des coûts et des plannings.
          </p>
        </div>

        {/* 4 Steps Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {METHODE_STEPS.map((step, idx) => {
            const isSelected = activeStep === idx;
            return (
              <div
                key={step.number}
                onClick={() => setActiveStep(idx)}
                className={`p-7 rounded-3xl border transition-all duration-300 flex flex-col justify-between cursor-pointer relative overflow-hidden group ${
                  isSelected
                    ? 'bg-slate-900/90 border-sky-400/80 shadow-2xl shadow-sky-500/10 -translate-y-1'
                    : 'bg-slate-950/70 border-white/[0.08] hover:bg-slate-900/60 hover:border-white/[0.15]'
                }`}
              >
                {/* Top indicator stripe */}
                <div className={`absolute top-0 left-0 right-0 h-[2px] transition-colors ${
                  isSelected ? 'bg-gradient-to-r from-sky-400 to-blue-500' : 'bg-transparent'
                }`} />

                <div>
                  {/* Step header */}
                  <div className="flex items-center justify-between mb-5">
                    <span className={`font-mono text-2xl font-black ${
                      isSelected ? 'text-sky-400' : 'text-slate-600'
                    }`}>
                      {step.number}
                    </span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                      isSelected ? 'bg-sky-500/20 text-sky-300 font-bold' : 'bg-slate-900 text-slate-500'
                    }`}>
                      PHASE 0{idx + 1}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2 font-heading">
                    {step.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 mb-5 leading-relaxed font-sans">
                    {step.description}
                  </p>

                  {/* Sub details */}
                  <div className="space-y-2 pt-4 border-t border-white/[0.06]">
                    {step.details.map((detail, dIdx) => (
                      <div key={dIdx} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                        <span className="leading-snug">{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-slate-400">
                  <span className="font-mono">Jalon Contractuel</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Method Banner Action */}
        <div className="p-7 sm:p-8 rounded-3xl bg-slate-900/80 border border-white/[0.09] flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl backdrop-blur-md">
          <div className="flex items-center gap-4 text-left">
            <div className="p-3 rounded-2xl bg-sky-500/10 border border-sky-500/20 text-sky-400 shrink-0 hidden sm:block">
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white font-heading">
                Vous avez un calendrier serré ou un projet critique à sécuriser ?
              </h4>
              <p className="text-xs sm:text-sm text-slate-400 font-sans mt-0.5">
                Nous nous engageons contractuellement sur le périmètre, les dates de livraison et la gouvernance.
              </p>
            </div>
          </div>

          <button
            onClick={() => onOpenConsultation("Cadrage Méthodologique")}
            className="shrink-0 w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 transition-all shadow-lg shadow-sky-500/20 cursor-pointer"
          >
            <span>Planifier une revue de projet</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
