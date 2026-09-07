import React from 'react';
import { Clock, Zap, FileCheck, ArrowRight, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

interface AuditFlashProps {
  onOpenConsultation: (topic?: string) => void;
}

export const AuditFlash: React.FC<AuditFlashProps> = ({ onOpenConsultation }) => {
  const deliverables = [
    "Cartographie synthétique des flux d'information et blocages actuels",
    "Matrice des priorités à fort ROI (Quick Wins opérationnels)",
    "Recommandation d'architecture SI (Odoo, modules sur-mesure ou connecteurs)",
    "Budget d'intégration prévisionnel et planning réaliste de déploiement",
    "Restitution exécutive directe avec un consultant senior (1h de débriefing)",
  ];

  return (
    <section id="audit-flash" className="py-24 bg-slate-950 border-t border-slate-850 relative overflow-hidden">
      {/* Glow */}
      <div className="hidden sm:block absolute top-1/2 left-1/3 w-80 h-80 bg-amber-500/10 blur-[130px] rounded-full pointer-events-none transform-gpu" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Main Banner Box */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-amber-500/40 shadow-2xl relative overflow-hidden">
          {/* Top highlight ribbon */}
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-amber-400 via-yellow-300 to-orange-400" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Description */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-semibold text-amber-400">
                <Zap className="w-3.5 h-3.5" />
                <span>Offre de Cadrage Rapide • Engagement Réduit</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Le Pack <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-300">Diagnostic Flash 48H</span> : <br />
                Une vision limpide avant tout investissement
              </h2>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Vous hésitez à lancer un grand projet de 6 mois sans visibilité exacte sur les coûts et les bénéfices ? En 48 heures, nous auditons vos processus critiques et vous remettons une feuille de route claire, chiffrée et sans engagement.
              </p>

              {/* Deliverables Checklist */}
              <div className="space-y-2.5 pt-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 block">
                  Livrables concrets remis à la direction sous 48h :
                </span>
                <div className="space-y-2">
                  {deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Commitment & Action Card */}
            <div className="lg:col-span-5 p-7 sm:p-8 rounded-2xl bg-slate-950 border border-slate-800 shadow-xl flex flex-col justify-between gap-6 relative">
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
                    Formule Dirigeant
                  </span>
                  <span className="text-xs text-slate-400 font-mono bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800">
                    Délai : 48 Heures
                  </span>
                </div>

                <div className="text-2xl sm:text-3xl font-bold text-white leading-snug">
                  Cadrage, Détection des Risques & Plan d'Action
                </div>

                <p className="text-xs text-slate-400 leading-relaxed">
                  Idéal pour valider la faisabilité technique, évaluer le périmètre Odoo exact et aligner vos directeurs métiers avant toute signature de devis.
                </p>

                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 space-y-2">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-sky-400" />
                    <span>Temps mobilisé de votre côté : <strong>1h30 seulement</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Garantie : <strong>100% indépendant & sans obligation</strong></span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => onOpenConsultation("Pack Diagnostic Flash 48H")}
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl text-sm font-bold text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 shadow-xl shadow-amber-500/20 active:scale-[0.98] transition-all cursor-pointer font-sans"
              >
                <span>Demander mon Diagnostic Flash 48H</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
