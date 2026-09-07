import React from 'react';
import { COMPARISON_ITEMS } from '../data/content';
import { Scale, Check, X, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

interface ComparisonTableProps {
  onOpenConsultation: (topic?: string) => void;
}

export const ComparisonTable: React.FC<ComparisonTableProps> = ({ onOpenConsultation }) => {
  return (
    <section id="comparatif" className="py-24 bg-slate-900/40 border-t border-slate-850 relative scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-xs font-semibold text-sky-400 mb-3">
            <Scale className="w-3.5 h-3.5" />
            <span>Différence d'Approche</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
            Pourquoi les dirigeants choisissent CLIXA ?
          </h2>

          <p className="text-base sm:text-lg text-slate-400">
            La plupart des projets SI échouent non pas à cause de la technologie, mais par manque de cadrage métier et d'adhésion terrain. Découvrez notre valeur ajoutée.
          </p>
        </div>

        {/* Comparison Table for Desktop */}
        <div className="hidden md:block rounded-3xl bg-slate-950 border border-slate-800 shadow-2xl overflow-hidden mb-12">
          
          {/* Table Header */}
          <div className="grid grid-cols-12 p-6 border-b border-slate-850 bg-slate-900/60 font-bold text-sm">
            <div className="col-span-4 text-slate-400 uppercase font-mono text-xs tracking-wider">
              Critère Stratégique
            </div>
            <div className="col-span-4 text-slate-400 pl-4">
              Intégrateur IT Classique
            </div>
            <div className="col-span-4 text-sky-400 pl-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-sky-400" />
              <span>Approche Hybride CLIXA</span>
            </div>
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-slate-850/80">
            {COMPARISON_ITEMS.map((item, idx) => (
              <div
                key={idx}
                className="grid grid-cols-12 p-6 items-center hover:bg-slate-900/40 transition-colors"
              >
                {/* Criterion */}
                <div className="col-span-4 font-bold text-white text-sm pr-4">
                  {item.critere}
                </div>

                {/* Classic Integrator */}
                <div className="col-span-4 text-xs sm:text-sm text-slate-400 pl-4 flex items-start gap-2.5 pr-4">
                  <div className="p-1 rounded bg-rose-500/10 text-rose-400 shrink-0 mt-0.5">
                    <X className="w-3.5 h-3.5" />
                  </div>
                  <span>{item.classique}</span>
                </div>

                {/* CLIXA Approach (Highlighted) */}
                <div className="col-span-4 text-xs sm:text-sm text-slate-200 pl-4 flex items-start gap-2.5 bg-sky-500/5 -my-6 py-6 border-l border-sky-500/20">
                  <div className="p-1 rounded bg-sky-500/20 text-sky-400 shrink-0 mt-0.5">
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
              className="p-5 rounded-2xl bg-slate-950 border border-slate-800 shadow-xl space-y-3"
            >
              <div className="font-bold text-white text-base pb-2 border-b border-slate-850">
                {item.critere}
              </div>

              <div className="p-3 rounded-xl bg-slate-900/40 border border-slate-850 text-xs text-slate-400 flex items-start gap-2">
                <X className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-300 block mb-0.5">Intégrateur classique :</strong>
                  <span>{item.classique}</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-sky-500/10 border border-sky-500/30 text-xs text-slate-200 flex items-start gap-2">
                <Check className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-sky-300 block mb-0.5">Avec CLIXA :</strong>
                  <span className="text-white font-medium">{item.clixa}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Bar */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl text-center sm:text-left">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white mb-1">
              Vous avez un projet de cadrage, d'ERP Odoo ou de transformation ?
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              Parlons directement de vos enjeux et validons l'alignement avec notre méthode lors d'un premier échange confidentiel.
            </p>
          </div>

          <button
            onClick={() => onOpenConsultation("Échange sur la méthode CLIXA")}
            className="w-full sm:w-auto shrink-0 inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 shadow-xl shadow-sky-500/20 transition-all cursor-pointer whitespace-nowrap"
          >
            <span>Planifier un échange dirigeant</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
