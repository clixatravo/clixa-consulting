import React from 'react';
import { COMPARISON_ITEMS } from '../data/content';
import { Scale, Check, X, ArrowRight, ShieldCheck, Sparkles, ArrowUpRight } from 'lucide-react';

interface ComparisonTableProps {
  onOpenConsultation: (topic?: string) => void;
}

export const ComparisonTable: React.FC<ComparisonTableProps> = ({ onOpenConsultation }) => {
  return (
    <section id="comparatif" className="py-24 bg-[#050811] border-b border-white/[0.08] relative scroll-mt-24 overflow-hidden">
      {/* Background ambient */}
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-sky-500/[0.03] blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-sky-400 mb-3 shadow-sm">
            <Scale className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-heading uppercase tracking-wider text-[11px]">Benchmark Exécutif & Différenciation</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4 font-heading">
            Pourquoi les Comités de Direction Choisissent CLIXA ?
          </h2>

          <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed">
            70% des échecs d'intégration ERP sont dus au manque de compréhension métier et aux dérives de budget. Comparez notre modèle hybride aux prestataires informatiques classiques.
          </p>
        </div>

        {/* Comparison Table for Desktop */}
        <div className="hidden md:block rounded-3xl bg-slate-900/70 border border-white/[0.09] shadow-2xl overflow-hidden mb-12 backdrop-blur-xl">
          
          {/* Table Header */}
          <div className="grid grid-cols-12 p-6 border-b border-white/[0.08] bg-slate-950/80 font-bold text-sm">
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

          {/* Table Rows */}
          <div className="divide-y divide-white/[0.06]">
            {COMPARISON_ITEMS.map((item, idx) => (
              <div
                key={idx}
                className="grid grid-cols-12 p-6 items-center hover:bg-slate-850/30 transition-colors"
              >
                {/* Criterion */}
                <div className="col-span-4 font-bold text-white text-sm pr-4 font-heading">
                  {item.critere}
                </div>

                {/* Classic Integrator */}
                <div className="col-span-4 text-xs sm:text-sm text-slate-400 pl-4 flex items-start gap-3 pr-4 font-sans">
                  <div className="p-1 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 shrink-0 mt-0.5">
                    <X className="w-3.5 h-3.5" />
                  </div>
                  <span>{item.classique}</span>
                </div>

                {/* CLIXA Approach (Highlighted) */}
                <div className="col-span-4 text-xs sm:text-sm text-slate-200 pl-4 flex items-start gap-3 bg-sky-500/[0.03] -my-6 py-6 border-l border-sky-500/20">
                  <div className="p-1 rounded-lg bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="font-medium text-white">{item.clixa}</span>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Mobile View: Cards per criterion */}
        <div className="md:hidden space-y-4 mb-10">
          {COMPARISON_ITEMS.map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-slate-900/80 border border-white/[0.08] shadow-xl space-y-3"
            >
              <div className="font-bold text-white text-base pb-2 border-b border-white/[0.06] font-heading">
                {item.critere}
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-white/[0.05] text-xs text-slate-400 flex items-start gap-2.5">
                <X className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-300 block mb-0.5">Intégrateur classique :</strong>
                  <span>{item.classique}</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-sky-500/10 border border-sky-500/30 text-xs text-slate-200 flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-sky-300 block mb-0.5">CLIXA Consulting :</strong>
                  <span className="text-white font-medium">{item.clixa}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="p-6 sm:p-7 rounded-2xl bg-slate-950 border border-white/[0.08] text-center max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs text-slate-300">
            Vous souhaitez un comparatif appliqué à votre cahier des charges ?
          </span>
          <button
            onClick={() => onOpenConsultation("Comparatif & Cadrage")}
            className="shrink-0 text-xs font-bold text-sky-400 hover:text-sky-300 inline-flex items-center gap-1 cursor-pointer"
          >
            <span>Échanger avec un associé</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
