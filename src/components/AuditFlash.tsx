import React from 'react';
import { Clock, Zap, FileCheck, ArrowRight, CheckCircle2, ShieldCheck, Sparkles, ArrowUpRight } from 'lucide-react';

interface AuditFlashProps {
  onOpenConsultation: (topic?: string) => void;
}

export const AuditFlash: React.FC<AuditFlashProps> = ({ onOpenConsultation }) => {
  const deliverables = [
    "Cartographie synthétique des flux d'information et points de rupture",
    "Matrice des Quick Wins opérationnels à fort retour sur investissement",
    "Recommandation d'architecture SI (ERP Odoo, modules cibles ou connecteurs API)",
    "Budget d'intégration prévisionnel et calendrier réaliste de déploiement",
    "Restitution exécutive directe avec un associé senior (1h de débriefing stratégique)",
  ];

  return (
    <section id="audit-flash" className="py-24 bg-[#050811] border-b border-white/[0.08] relative overflow-hidden scroll-mt-24">
      {/* Ambient gold glow */}
      <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-amber-500/[0.04] blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Main Banner Box */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-slate-900/90 via-slate-900 to-slate-950 border border-amber-400/30 shadow-2xl relative overflow-hidden backdrop-blur-xl">
          {/* Top highlight ribbon */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-amber-400 via-amber-200 to-yellow-500" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Description */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/25 text-xs font-semibold text-amber-300">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span className="font-heading uppercase tracking-wider text-[11px]">Audit Exécutif Sans Engagement</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight font-heading">
                Le Pack <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400">Diagnostic Flash 48H</span> : <br />
                Une visibilité limpide avant tout engagement budgétaire.
              </h2>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
                Avant d'engager plusieurs dizaines de milliers d'euros dans un projet de transformation, bénéficiez d'une analyse indépendante de vos systèmes et de vos processus pour sécuriser vos arbitrages.
              </p>

              {/* Deliverables Checklist */}
              <div className="space-y-3 pt-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 block">
                  Livrables formels remis au comité de direction sous 48h :
                </span>
                <div className="space-y-2.5">
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
            <div className="lg:col-span-5 p-7 sm:p-8 rounded-2xl bg-slate-950/90 border border-white/[0.08] shadow-2xl flex flex-col justify-between gap-6 relative">
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
                    Formule C-Suite
                  </span>
                  <span className="text-xs text-slate-300 font-mono bg-slate-900 px-3 py-1 rounded-lg border border-white/[0.08]">
                    Délai : 48 Heures
                  </span>
                </div>

                <div className="text-xl sm:text-2xl font-bold text-white leading-snug font-heading">
                  Cadrage, Détection des Risques & Feuille de Route
                </div>

                <p className="text-xs text-slate-400 leading-relaxed font-sans">
                  Idéal pour valider la faisabilité technique, évaluer le périmètre Odoo exact et aligner vos directeurs métiers avant toute décision contractuelle.
                </p>

                <div className="p-4 rounded-xl bg-slate-900/80 border border-white/[0.06] text-xs text-slate-300 space-y-2.5">
                  <div className="flex items-center gap-2.5">
                    <Clock className="w-4 h-4 text-sky-400" />
                    <span>Mobilisation interne : <strong>1h30 seulement</strong></span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Garantie : <strong>100% indépendant sous accord de confidentialité (NDA)</strong></span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => onOpenConsultation("Pack Diagnostic Flash 48H")}
                className="w-full inline-flex items-center justify-center gap-2 py-4 px-6 rounded-xl text-xs sm:text-sm font-bold text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 shadow-xl shadow-amber-500/20 active:scale-[0.98] transition-all cursor-pointer font-heading"
              >
                <span>Demander votre Diagnostic Flash 48H</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
