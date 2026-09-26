import { useScrollReveal } from '../../hooks/useScrollReveal';
import React, { useState } from 'react';
import { METHODE_STEPS, COMPARISON_ITEMS, FAQ_ITEMS } from '../../data/content';
import { 
  Check, 
  X, 
  ChevronDown, 
  ArrowUpRight,
  ShieldCheck,
  Award,
  Clock
} from 'lucide-react';

interface MethodologieFaceProps {
  onOpenConsultation: (topic?: string) => void;
  onNavigateFace: (faceId: string) => void;
}

export const MethodologieFace: React.FC<MethodologieFaceProps> = ({ onOpenConsultation, onNavigateFace }) => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  return (
    <div className="w-full bg-[#FAF7F2] text-slate-900 font-sans min-h-screen pt-32 sm:pt-40 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* 1. GIANT EDITORIAL TITLE (SQLI Standard: "About") */}
        <div className="mb-10 sm:mb-14">
          <h1 className="text-6xl sm:text-7xl lg:text-[84px] font-bold text-[#0a0e1a] tracking-tight leading-none font-heading">
            About & Méthode
          </h1>
          <p className="text-base sm:text-lg text-slate-600 font-normal mt-4 max-w-2xl leading-relaxed">
            Une gouvernance inspirée des standards Big 4, un engagement contractuel au forfait et une exécution agile sans effet tunnel.
          </p>
        </div>

        {/* 2. 4 PHASES METHODOLOGY GRID */}
        <div className="mb-16">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-blue-600 mb-6">
            Cycle de Déploiement en 4 Jalons Clés
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {METHODE_STEPS.map((step, idx) => {
              const isSelected = activeStep === idx;
              return (
                <div
                  key={step.number}
                  onClick={() => setActiveStep(idx)}
                  className={`p-6 border transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected 
                      ? 'bg-white border-blue-600 shadow-md ring-1 ring-blue-600' 
                      : 'bg-white/80 border-[#e2dcd2] hover:border-slate-400'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-600">
                        PHASE {step.number}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 font-heading mb-2">
                      {step.title}
                    </h3>

                    <p className="text-xs text-slate-600 font-sans leading-relaxed mb-4">
                      {step.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100">
                    <span className="text-[11px] font-bold text-slate-800 uppercase tracking-wider block mb-1">
                      Livrables Clés :
                    </span>
                    <ul className="text-xs text-blue-700 font-medium space-y-1">
                      {step.details.slice(0, 2).map((d, i) => (
                        <li key={i}>• {d}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 2.5 EXECUTIVE GOVERNANCE BANNER WITH MAGNETIC PHOTO */}
        <div className="mb-16 bg-white border border-[#e2dcd2] p-6 sm:p-10 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Photo with light sweep and floating badges */}
            <div className="lg:col-span-6">
              <div className="photo-frame w-full aspect-[16/10] bg-slate-900 relative">
                <img
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80"
                  alt="Comité de Direction Clixa Consulting"
                  className="photo-zoom-img w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="photo-overlay-scrim" />
                <div className="absolute top-3.5 left-3.5 z-10 pointer-events-none">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-[#0a1628]/90 text-white px-3 py-1 backdrop-blur-md border border-white/20 shadow-sm">
                    Gouvernance C-Suite & AMOA
                  </span>
                </div>
                <div className="absolute bottom-3.5 right-3.5 z-10 pointer-events-none">
                  <span className="text-xs font-bold text-white bg-[#1f24e9] px-3 py-1 shadow-md">
                    Engagement 100% Forfait
                  </span>
                </div>
              </div>
            </div>

            {/* Right Content */}
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-200 text-xs font-semibold text-blue-700">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                <span className="font-heading uppercase tracking-wider text-[11px] font-bold">Sécurisation Contractuelle</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-heading leading-tight">
                Zéro Dérive Budgétaire, Jalons Validés en Comité Stratégique
              </h2>

              <p className="text-sm text-slate-600 font-sans leading-relaxed">
                Chaque étape d'intégration ou de réorganisation est supervisée par un Directeur de Mission senior. Aucun passage en production n'est validé sans tests d'acceptation utilisateurs (UAT) complets et rapprochement financier à l'euro ou au dirham près.
              </p>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 bg-[#FAF7F2] border border-[#e2dcd2]">
                  <div className="text-lg font-black text-blue-700 font-mono">100%</div>
                  <div className="text-[11px] text-slate-700 font-semibold">Projets livrés au forfait ferme</div>
                </div>
                <div className="p-3 bg-[#FAF7F2] border border-[#e2dcd2]">
                  <div className="text-lg font-black text-blue-700 font-mono">48H</div>
                  <div className="text-[11px] text-slate-700 font-semibold">Délai d'arbitrage COPIL</div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onOpenConsultation("Cadrage Stratégique & Comité de Pilotage")}
                  className="bg-[#1f24e9] hover:bg-[#151ad0] text-white px-7 py-3 rounded-none font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer inline-flex items-center gap-2"
                >
                  <span>Planifier un Comité de Cadrage</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 3. COMPARATIVE BENCHMARK: CLIXA VS SSII CLASSIQUES */}
        <div className="mb-16 bg-white border border-[#e2dcd2] p-8 sm:p-12 shadow-sm">
          <div className="mb-8">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-600 block mb-1">
              Audit Comparatif
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-heading">
              Pourquoi les DAF & DSI choisissent Clixa face aux SSII traditionnelles
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-xs font-bold uppercase tracking-wider text-slate-500">
                  <th className="py-3 px-4">Critère Stratégique</th>
                  <th className="py-3 px-4 text-slate-400">Intégrateurs & SSII Classiques</th>
                  <th className="py-3 px-4 text-blue-600 bg-blue-50/50">Engagement Clixa Consulting</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {COMPARISON_ITEMS.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 px-4 font-bold text-slate-900">
                      {item.critere}
                    </td>
                    <td className="py-4 px-4 text-slate-500 flex items-center gap-2">
                      <X className="w-4 h-4 text-red-500 shrink-0" />
                      <span>{item.classique}</span>
                    </td>
                    <td className="py-4 px-4 text-slate-900 font-semibold bg-blue-50/30">
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-blue-600 shrink-0" />
                        <span>{item.clixa}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 4. EXECUTIVE FAQ ACCORDION */}
        <div className="mb-16 bg-white border border-[#e2dcd2] p-8 sm:p-12">
          <div className="mb-8">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-600 block mb-1">
              Foire Aux Questions Exécutive
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-heading">
              Questions Fréquentes des Comités de Direction
            </h2>
          </div>

          <div className="space-y-3">
            {FAQ_ITEMS.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div 
                  key={index}
                  className="border border-slate-200 overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 bg-slate-50/50 hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    <span className="font-bold text-sm sm:text-base text-slate-900 font-heading">
                      {faq.question}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-slate-500 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isOpen && (
                    <div className="p-4 sm:p-5 bg-white border-t border-slate-200 text-sm text-slate-600 font-sans leading-relaxed">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="border border-[#e2dcd2] bg-white p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold text-slate-900 font-heading">
              Prêt à sécuriser votre prochain jalon de transformation ?
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Échangez directement avec un associé pour valider votre cahier des charges.
            </p>
          </div>
          <button
            onClick={() => onOpenConsultation("Audit Méthodologique")}
            className="bg-[#1f24e9] hover:bg-[#151ad0] text-white px-8 py-3.5 rounded-none font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer whitespace-nowrap flex items-center gap-2"
          >
            <span>Planifier un Débriefing Stratégique</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
