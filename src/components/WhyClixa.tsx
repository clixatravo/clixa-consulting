import React from 'react';
import { WHY_CLIXA_CHAIN } from '../data/content';
import { ShieldCheck, AlertTriangle, CheckCircle2, ArrowRight, Target } from 'lucide-react';

interface WhyClixaProps {
  onOpenConsultation: (topic?: string) => void;
}

export const WhyClixa: React.FC<WhyClixaProps> = ({ onOpenConsultation }) => {
  return (
    <section id="pourquoi" className="py-24 bg-slate-950 relative overflow-hidden scroll-mt-24">
      {/* Background glow: lightweight on mobile, rich on desktop */}
      <div className="hidden sm:block absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full pointer-events-none transform-gpu" />
      <div className="sm:hidden absolute bottom-0 right-1/4 w-48 h-48 bg-blue-500/10 blur-xl rounded-full pointer-events-none transform-gpu" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-xs font-semibold text-sky-400 mb-3">
            <Target className="w-3.5 h-3.5" />
            <span>Différenciation & Valeur Ajoutée</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
            Pourquoi CLIXA ?
          </h2>

          <p className="text-lg sm:text-xl font-semibold text-sky-400 mb-4">
            Une approche hybride : métier + finance + technologie
          </p>

          <p className="text-base text-slate-300 leading-relaxed">
            Les projets de transformation échouent rarement à cause d’un manque d’outils. Ils échouent lorsque les <strong className="text-white font-semibold">processus, les métiers et la technologie ne sont pas alignés</strong>.
          </p>
        </div>

        {/* Transverse Chain Display: Stratégie → Processus → Finance → SI → Exécution */}
        <div className="mb-20">
          <div className="text-center mb-6">
            <span className="text-xs font-mono uppercase tracking-widest text-slate-400 font-semibold">
              Notre chaîne de valeur continue
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {WHY_CLIXA_CHAIN.map((item, idx) => (
              <div
                key={item.step}
                className="relative p-5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-sky-500/40 transition-all flex flex-col justify-between group shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono font-bold text-sky-400">
                      0{idx + 1}
                    </span>
                    {idx < WHY_CLIXA_CHAIN.length - 1 && (
                      <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-sky-400 hidden lg:block transition-colors" />
                    )}
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2 group-hover:text-sky-300 transition-colors">
                    {item.step}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 text-center">
            <span className="text-xs sm:text-sm font-medium text-slate-400">
              Pour construire des solutions <span className="text-white font-semibold">pragmatiques</span>, <span className="text-white font-semibold">mesurables</span> et <span className="text-white font-semibold">durables</span>.
            </span>
          </div>
        </div>

        {/* Side-by-side comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
          
          {/* Traditional Failure Pattern */}
          <div className="p-7 sm:p-8 rounded-2xl bg-red-950/10 border border-red-900/30">
            <div className="flex items-center gap-2.5 mb-5 text-red-400 font-semibold text-sm">
              <AlertTriangle className="w-5 h-5" />
              <span>Pourquoi 70% des projets échouent</span>
            </div>
            
            <ul className="space-y-3.5 text-xs sm:text-sm text-slate-300">
              <li className="flex items-start gap-2.5">
                <span className="text-red-400 font-bold shrink-0">✕</span>
                <span>Outils déployés en silo sans adéquation avec la réalité terrain des équipes.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-red-400 font-bold shrink-0">✕</span>
                <span>Absence de modélisation financière et de pilotage rigoureux du ROI.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-red-400 font-bold shrink-0">✕</span>
                <span>Fossé d'incompréhension persistant entre la DSI et les directions métiers.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-red-400 font-bold shrink-0">✕</span>
                <span>Abandon de l'accompagnement post-déploiement provoquant le rejet de la solution.</span>
              </li>
            </ul>
          </div>

          {/* CLIXA Approach */}
          <div className="p-7 sm:p-8 rounded-2xl bg-sky-950/20 border border-sky-500/30 shadow-xl relative">
            <div className="flex items-center gap-2.5 mb-5 text-sky-400 font-semibold text-sm">
              <ShieldCheck className="w-5 h-5" />
              <span>L'engagement CLIXA CONSULTING</span>
            </div>

            <ul className="space-y-3.5 text-xs sm:text-sm text-slate-200">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <span>Alignement préalable strict des processus et de la culture d'entreprise.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <span>Mesure objective des retours financiers et gains de productivité.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <span>Double casquette experte : maîtrise technique pointue et vision business dirigeant.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <span>Sécurisation jusqu'à l'adoption opérationnelle complète et autonome par vos équipes.</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="text-center">
          <button
            onClick={() => onOpenConsultation("Diagnostic d'alignement hybride")}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-sky-400 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-sky-500/40 transition-all cursor-pointer"
          >
            <span>Auditer l'alignement de vos projets actuels</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
