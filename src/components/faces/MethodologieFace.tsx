import React, { useState } from 'react';
import { METHODE_STEPS, COMPARISON_ITEMS, FAQ_ITEMS } from '../../data/content';
import { 
  Compass, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowUpRight, 
  ArrowRight,
  Scale,
  Sparkles,
  Check,
  X,
  HelpCircle,
  ChevronDown
} from 'lucide-react';

interface MethodologieFaceProps {
  onOpenConsultation: (topic?: string) => void;
  onNavigateFace: (faceId: string) => void;
}

export const MethodologieFace: React.FC<MethodologieFaceProps> = ({ onOpenConsultation, onNavigateFace }) => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  return (
    <div className="w-full animate-in fade-in duration-300 font-sans pt-28 pb-20">
      
      {/* 1. FACE HEADER & BREADCRUMB */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-4">
          <button onClick={() => onNavigateFace('accueil')} className="hover:text-white transition-colors cursor-pointer">
            Accueil
          </button>
          <span>/</span>
          <span className="text-sky-400 font-bold">Méthodologie & Gouvernance</span>
        </div>

        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-sky-400 mb-3 shadow-sm">
            <Compass className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-heading uppercase tracking-wider text-[11px]">Rigueur d'Exécution Big 4</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight font-heading">
            Une Méthodologie en 4 Phases Éprouvées
          </h1>

          <p className="text-base sm:text-lg text-slate-300 font-sans leading-relaxed mt-4">
            Pas d'effet tunnel ni de dépassements de coûts. Nous appliquons un cycle de déploiement agile structuré par jalons contractuels comex validés à chaque étape.
          </p>
        </div>
      </div>

      {/* 2. 4 PHASES TIMELINE */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {METHODE_STEPS.map((step, idx) => {
            const isSelected = activeStep === idx;
            return (
              <div
                key={step.number}
                onClick={() => setActiveStep(idx)}
                className={`p-7 rounded-3xl border transition-all duration-300 flex flex-col justify-between cursor-pointer relative overflow-hidden ${
                  isSelected
                    ? 'bg-slate-900/90 border-sky-400/80 shadow-2xl shadow-sky-500/10 -translate-y-1'
                    : 'bg-slate-950/70 border-white/[0.08] hover:bg-slate-900/60 hover:border-white/[0.15]'
                }`}
              >
                <div className={`absolute top-0 left-0 right-0 h-[2px] transition-colors ${
                  isSelected ? 'bg-gradient-to-r from-sky-400 to-blue-500' : 'bg-transparent'
                }`} />

                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className={`font-mono text-2xl font-black ${isSelected ? 'text-sky-400' : 'text-slate-600'}`}>
                      {step.number}
                    </span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                      isSelected ? 'bg-sky-500/20 text-sky-300 font-bold' : 'bg-slate-900 text-slate-500'
                    }`}>
                      PHASE 0{idx + 1}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 font-heading">
                    {step.title}
                  </h3>

                  <p className="text-xs text-slate-300 mb-5 leading-relaxed font-sans">
                    {step.description}
                  </p>

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
      </div>

      {/* 3. BENCHMARK : CLIXA VS SSII CLASSIQUE */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-sky-400">
            Benchmark Différenciateur
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading mt-1">
            Pourquoi les Comités de Direction Choisissent CLIXA ?
          </h2>
        </div>

        <div className="rounded-3xl bg-slate-900/70 border border-white/[0.09] shadow-2xl overflow-hidden backdrop-blur-xl">
          <div className="grid grid-cols-12 p-6 border-b border-white/[0.08] bg-slate-950/80 font-bold text-xs sm:text-sm">
            <div className="col-span-4 text-slate-400 uppercase font-mono text-xs tracking-wider">
              Enjeu Stratégique
            </div>
            <div className="col-span-4 text-slate-400 pl-4">
              Intégrateur IT / SSII Classique
            </div>
            <div className="col-span-4 text-white pl-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span className="font-heading font-extrabold text-sky-300">Cabinet de Conseil CLIXA</span>
            </div>
          </div>

          <div className="divide-y divide-white/[0.06]">
            {COMPARISON_ITEMS.map((item, idx) => (
              <div key={idx} className="grid grid-cols-12 p-6 items-center hover:bg-slate-850/30 transition-colors">
                <div className="col-span-4 font-bold text-white text-xs sm:text-sm pr-4 font-heading">
                  {item.critere}
                </div>
                <div className="col-span-4 text-xs text-slate-400 pl-4 flex items-start gap-2 pr-4 font-sans">
                  <div className="p-1 rounded bg-rose-500/10 text-rose-400 shrink-0 mt-0.5">
                    <X className="w-3 h-3" />
                  </div>
                  <span>{item.classique}</span>
                </div>
                <div className="col-span-4 text-xs text-slate-200 pl-4 flex items-start gap-2 bg-sky-500/[0.03] -my-6 py-6 border-l border-sky-500/20">
                  <div className="p-1 rounded bg-emerald-500/20 text-emerald-400 shrink-0 mt-0.5">
                    <Check className="w-3 h-3" />
                  </div>
                  <span className="font-medium text-white">{item.clixa}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. FAQ STRATÉGIQUE */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="text-center mb-8">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-sky-400">
            Foire Aux Questions
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading mt-1">
            Questions Fréquentes des Directeurs Généraux & DAF
          </h2>
        </div>

        <div className="space-y-3">
          {FAQ_ITEMS.slice(0, 5).map((item, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-white/[0.08] bg-slate-900/60 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="text-sm font-bold text-white font-heading">{item.question}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180 text-sky-400' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-0 text-xs text-slate-300 leading-relaxed border-t border-white/[0.06] mt-1 font-sans">
                    <p className="pt-3">{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. TRANSITION TO NEXT FACE */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
        <button
          onClick={() => onNavigateFace('simulateur-roi')}
          className="text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          ← Retour à l'Executive Lab
        </button>

        <button
          onClick={() => onNavigateFace('contact')}
          className="link-cta-sqli text-sm font-bold cursor-pointer"
        >
          <span>Face Suivante : Contact & Cadrage Exécutif</span>
          <div className="icon-circle">
            <ArrowRight className="w-4 h-4" />
          </div>
        </button>
      </div>

    </div>
  );
};
