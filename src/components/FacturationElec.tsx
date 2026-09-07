import React, { useState } from 'react';
import { FACTURATION_ELECTRONIQUE_STEPS } from '../data/content';
import { FileCheck, ShieldAlert, ArrowRight, CheckCircle, Sparkles, HelpCircle } from 'lucide-react';

interface FacturationElecProps {
  onOpenConsultation: (topic?: string) => void;
}

export const FacturationElec: React.FC<FacturationElecProps> = ({ onOpenConsultation }) => {
  const [selectedStep, setSelectedStep] = useState<number>(0);

  return (
    <section id="facturation" className="py-24 bg-slate-900/50 border-t border-slate-850 relative overflow-hidden scroll-mt-24">
      {/* Subtle glow decoration: lightweight on mobile, rich on desktop */}
      <div className="hidden sm:block absolute top-1/2 left-0 w-72 h-72 bg-sky-500/10 blur-[100px] rounded-full pointer-events-none transform-gpu" />
      <div className="sm:hidden absolute top-1/2 left-0 w-40 h-40 bg-sky-500/10 blur-xl rounded-full pointer-events-none transform-gpu" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-semibold text-cyan-400 mb-4">
            <FileCheck className="w-3.5 h-3.5" />
            <span>Conformité & Transition Digitale</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-5">
            Facturation Électronique & <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-sky-400">
              Digitalisation des Flux
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            CLIXA accompagne les entreprises dans la préparation, la mise en conformité et la transformation globale de leurs processus de facturation entrants et sortants.
          </p>
        </div>

        {/* 7-Step Trajectory Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          
          {/* Left Column: Interactive Step Selector */}
          <div className="lg:col-span-7 space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 font-mono mb-4">
              Feuille de route en 7 étapes clés
            </h3>

            {FACTURATION_ELECTRONIQUE_STEPS.map((item, idx) => (
              <div
                key={item.step}
                onClick={() => setSelectedStep(idx)}
                className={`p-4 sm:p-5 rounded-xl border transition-all cursor-pointer flex items-start gap-4 ${
                  selectedStep === idx
                    ? 'bg-slate-900 border-cyan-500/60 shadow-lg shadow-cyan-500/10 -translate-y-0.5'
                    : 'bg-slate-950/60 border-slate-800/80 hover:bg-slate-900/60 hover:border-slate-700'
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center font-mono font-bold text-sm shrink-0 transition-colors ${
                    selectedStep === idx
                      ? 'bg-cyan-500 text-slate-950 shadow-md'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {item.step}
                </div>
                <div className="flex-1">
                  <h4 className={`text-base font-bold transition-colors ${
                    selectedStep === idx ? 'text-white' : 'text-slate-200'
                  }`}>
                    {item.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Strategic Insight Card */}
          <div className="lg:col-span-5 sticky top-28">
            <div className="p-7 sm:p-8 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 shadow-2xl relative">
              <div className="absolute top-0 right-0 w-28 h-28 bg-cyan-500/10 rounded-full blur-xl pointer-events-none" />

              <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-3">
                <Sparkles className="w-4 h-4" />
                <span>Pourquoi anticiper avec CLIXA ?</span>
              </div>

              <h4 className="text-xl font-bold text-white mb-4">
                Ne subissez pas la réforme : transformez-la en levier de performance.
              </h4>

              <p className="text-sm text-slate-300 leading-relaxed mb-6">
                La facturation électronique n'est pas qu'une contrainte fiscale ou technique. C'est l'opportunité de fiabiliser votre comptabilité, raccourcir vos délais de paiement et digitaliser vos échanges avec clients et fournisseurs.
              </p>

              <div className="space-y-3 mb-8">
                <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-200">
                  <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>Sécurisation juridique & zéro risque de blocage des flux</span>
                </div>
                <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-200">
                  <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>Interopérabilité totale ERP (Odoo, SAP, etc.) et plateformes (PDP/PPF)</span>
                </div>
                <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-200">
                  <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>Réduction drastique des coûts de traitement documentaire</span>
                </div>
              </div>

              <button
                onClick={() => onOpenConsultation("Facturation Électronique & Flux")}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-sky-400 hover:from-cyan-300 hover:to-sky-300 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/35 transition-all cursor-pointer"
              >
                <span>Diagnostiquer votre maturité facturation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
