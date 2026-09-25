import React, { useState } from 'react';
import { SECTEURS } from '../data/content';
import { 
  Building2, 
  HardHat, 
  Factory, 
  Boxes, 
  Briefcase, 
  Stethoscope, 
  Zap, 
  CheckCircle2, 
  ArrowUpRight,
  Layers
} from 'lucide-react';

interface SecteursProps {
  onOpenConsultation: (topic?: string) => void;
}

export const Secteurs: React.FC<SecteursProps> = ({ onOpenConsultation }) => {
  const [selectedSecteur, setSelectedSecteur] = useState<string>(SECTEURS[0].id);

  const getSecteurIcon = (iconName: string) => {
    switch (iconName) {
      case 'HardHat':
        return <HardHat className="w-5 h-5" />;
      case 'Factory':
        return <Factory className="w-5 h-5" />;
      case 'Boxes':
        return <Boxes className="w-5 h-5" />;
      case 'Briefcase':
        return <Briefcase className="w-5 h-5" />;
      case 'Stethoscope':
        return <Stethoscope className="w-5 h-5" />;
      case 'Zap':
        return <Zap className="w-5 h-5" />;
      default:
        return <Building2 className="w-5 h-5" />;
    }
  };

  const active = SECTEURS.find(s => s.id === selectedSecteur) || SECTEURS[0];

  return (
    <section id="secteurs" className="py-24 bg-[#050811] border-b border-white/[0.08] relative scroll-mt-24 overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-sky-500/[0.03] blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-sky-400 mb-3 shadow-sm">
            <Layers className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-heading uppercase tracking-wider text-[11px]">Spécialisations Sectorielles</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4 font-heading">
            Des Solutions Calibrées pour Votre Industrie
          </h2>

          <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed">
            Chaque secteur présente ses contraintes de marge, de conformité fiscale et de flux opérationnels. Nous configurons Odoo et vos processus selon les pratiques d'excellence de votre industrie.
          </p>
        </div>

        {/* Industry Pills Selector */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
          {SECTEURS.map((sec) => {
            const isSelected = sec.id === selectedSecteur;
            return (
              <button
                key={sec.id}
                onClick={() => setSelectedSecteur(sec.id)}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-3 ${
                  isSelected
                    ? 'bg-slate-900/90 border-sky-400/80 shadow-lg shadow-sky-500/15'
                    : 'bg-slate-950/70 border-white/[0.07] hover:border-white/[0.15] hover:bg-slate-900/50'
                }`}
              >
                <div className={`p-2 rounded-xl border w-fit ${isSelected ? 'bg-sky-500/20 text-sky-300 border-sky-500/30' : 'bg-slate-900 text-slate-400 border-white/[0.08]'}`}>
                  {getSecteurIcon(sec.icon)}
                </div>
                <div className="text-xs font-bold text-white line-clamp-2 font-heading">
                  {sec.title.split(',')[0]}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Industry Focus Display Card */}
        <div key={selectedSecteur} className="p-7 sm:p-10 rounded-3xl bg-slate-900/70 border border-white/[0.09] shadow-2xl relative overflow-hidden backdrop-blur-xl animate-in fade-in duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative">
            
            {/* Left Overview */}
            <div className="lg:col-span-7 space-y-5">
              <div className="flex items-center gap-3.5">
                <div className="p-3 rounded-2xl bg-sky-500/10 border border-sky-500/20 text-sky-400">
                  {getSecteurIcon(active.icon)}
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white font-heading">
                    {active.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-sky-300 font-medium">
                    {active.subtitle}
                  </p>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 block">
                  Défis critiques résolus par CLIXA :
                </span>
                {active.challenges.map((chal, cIdx) => (
                  <div key={cIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{chal}</span>
                  </div>
                ))}
              </div>

              {/* Feature Chips */}
              <div className="pt-2 flex flex-wrap gap-2">
                {active.features.map((feat, fIdx) => (
                  <span
                    key={fIdx}
                    className="text-xs font-mono font-medium px-3 py-1 rounded-lg bg-slate-950/80 border border-white/[0.07] text-slate-200"
                  >
                    ✓ {feat}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Action Callout */}
            <div className="lg:col-span-5 p-7 rounded-2xl bg-slate-950/90 border border-white/[0.08] flex flex-col justify-between gap-6 shadow-xl">
              <div>
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-sky-400 block mb-2">
                  Pratique Sectorielle Dédiée
                </span>
                <h4 className="text-base sm:text-lg font-bold text-white mb-2 font-heading">
                  Vous dirigez une organisation dans ce secteur ?
                </h4>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans">
                  Nos consultants possèdent une maîtrise directe de vos contraintes opérationnelles. Échangeons sur votre feuille de route et vos indicateurs clés.
                </p>
              </div>

              <button
                onClick={() => onOpenConsultation(`Spécialisation Sectorielle: ${active.title}`)}
                className="w-full inline-flex items-center justify-center gap-2 py-4 px-5 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 shadow-xl shadow-sky-500/20 transition-all cursor-pointer font-heading"
              >
                <span>Consulter un associé spécialiste</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
