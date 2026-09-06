import React, { useState } from 'react';
import { METHODE_STEPS } from '../data/content';
import { Compass, CheckCircle2, ChevronRight, Activity, ArrowRight } from 'lucide-react';

interface MethodologieProps {
  onOpenConsultation: (topic?: string) => void;
}

export const Methodologie: React.FC<MethodologieProps> = ({ onOpenConsultation }) => {
  const [activeStep, setActiveStep] = useState<number>(0);

  return (
    <section id="methode" className="py-24 bg-slate-900/40 border-t border-slate-850 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-xs font-semibold text-sky-400 mb-3">
            <Compass className="w-3.5 h-3.5" />
            <span>Méthodologie Éprouvée</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
            Notre Méthode
          </h2>

          <p className="text-lg font-semibold text-sky-400 mb-2">
            De la stratégie à l’exécution
          </p>

          <p className="text-base text-slate-400">
            Une démarche progressive et rigoureuse pour garantir la viabilité, l'adhésion des équipes et le retour sur investissement.
          </p>
        </div>

        {/* 4 Steps Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {METHODE_STEPS.map((step, idx) => (
            <div
              key={step.number}
              onClick={() => setActiveStep(idx)}
              className={`p-6 sm:p-7 rounded-2xl border transition-all duration-300 flex flex-col justify-between cursor-pointer ${
                activeStep === idx
                  ? 'bg-slate-900 border-sky-500/60 shadow-xl shadow-sky-500/10 -translate-y-1'
                  : 'bg-slate-950/70 border-slate-800/80 hover:bg-slate-900/60 hover:border-slate-700'
              }`}
            >
              <div>
                {/* Step indicator */}
                <div className="flex items-center justify-between mb-5">
                  <span className={`font-mono text-2xl font-black ${
                    activeStep === idx ? 'text-sky-400' : 'text-slate-600'
                  }`}>
                    {step.number}
                  </span>
                  <div className={`w-2.5 h-2.5 rounded-full ${
                    activeStep === idx ? 'bg-sky-400 ring-4 ring-sky-400/20' : 'bg-slate-700'
                  }`} />
                </div>

                <h3 className="text-xl font-bold text-white mb-2">
                  {step.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 mb-5 leading-relaxed">
                  {step.description}
                </p>

                {/* Sub details */}
                <div className="space-y-2 pt-4 border-t border-slate-800/80">
                  {step.details.map((detail, dIdx) => (
                    <div key={dIdx} className="flex items-start gap-2 text-xs text-slate-400">
                      <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-3 border-t border-slate-800/60 text-right">
                <span className="text-[11px] font-mono text-slate-500 uppercase">
                  Phase 0{idx + 1}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Method Banner Action */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4 text-left">
            <div className="p-3 rounded-xl bg-sky-500/10 text-sky-400 shrink-0 hidden sm:block">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white">
                Besoin d'un cadrage méthodologique pour votre prochain projet ?
              </h4>
              <p className="text-xs sm:text-sm text-slate-400">
                Nos consultants évaluent votre situation actuelle et structurent une feuille de route adaptée à votre calendrier.
              </p>
            </div>
          </div>

          <button
            onClick={() => onOpenConsultation("Méthodologie & Cadrage")}
            className="w-full sm:w-auto shrink-0 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white bg-slate-800 hover:bg-slate-750 border border-slate-700 hover:border-sky-500/40 transition-all cursor-pointer"
          >
            <span>Demander un cadrage</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
